/**
 * Защита публичного маршрута чата `/api/ai`: ограничение частоты и проверка тела запроса.
 * Чистый код без зависимостей от h3 и Nitro — его проверяет `test/utils/docs-chat-guard.spec.ts`.
 *
 * Состояние живёт в памяти процесса: после перезапуска контейнера счётчики обнуляются, а при нескольких
 * экземплярах сервера у каждого свой счёт. Для одного контейнера за nginx-proxy (deploy/docs) этого достаточно.
 */

/** Окно подсчёта: 10 минут. */
export const CHAT_LIMIT_WINDOW_MS = 10 * 60 * 1000
/** Запросов к чату с одного адреса за окно. */
export const CHAT_LIMIT_PER_IP = 20
/** Запросов ко всему чату за окно. Потолок расхода, если адреса меняют (в первую очередь через заголовки). */
export const CHAT_LIMIT_GLOBAL = 400

/** Тело запроса: не больше 2 МБ (история с ответами инструментов бывает объёмной). */
export const CHAT_MAX_BODY_BYTES = 2 * 1024 * 1024
/** Сообщений в истории, которые принимает маршрут. */
export const CHAT_MAX_MESSAGES = 40
/** Длина текста одного сообщения пользователя. */
export const CHAT_MAX_USER_TEXT = 2000
/** Длина текста одного ответа ассистента в присланной истории. */
export const CHAT_MAX_ASSISTANT_TEXT = 20000
/** Суммарная длина всего текста истории после очистки. */
export const CHAT_MAX_TOTAL_TEXT = 60000
/** Не больше стольких карт-счётчиков держим в памяти, прежде чем вычистить истёкшие. */
const MAX_TRACKED = 5000

export interface RateLimitResult {
  ok: boolean
  /** Через сколько секунд можно повторить запрос (только при `ok: false`). */
  retryAfter: number
  /** Что именно сработало: адрес или общий потолок. */
  scope?: 'ip' | 'global'
}

interface Bucket {
  count: number
  resetAt: number
}

export interface RateLimiter {
  hit: (key: string, now?: number) => RateLimitResult
  /** Только для тестов: сколько ключей сейчас в памяти. */
  size: () => number
}

export function createRateLimiter(options: { windowMs?: number, perKey?: number, global?: number } = {}): RateLimiter {
  const windowMs = options.windowMs ?? CHAT_LIMIT_WINDOW_MS
  const perKey = options.perKey ?? CHAT_LIMIT_PER_IP
  const globalMax = options.global ?? CHAT_LIMIT_GLOBAL

  const buckets = new Map<string, Bucket>()
  let globalBucket: Bucket = { count: 0, resetAt: 0 }

  function sweep(now: number) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key)
    }
  }

  return {
    hit(key, now = Date.now()) {
      if (globalBucket.resetAt <= now) globalBucket = { count: 0, resetAt: now + windowMs }
      if (buckets.size >= MAX_TRACKED) sweep(now)

      let bucket = buckets.get(key)
      if (!bucket || bucket.resetAt <= now) {
        bucket = { count: 0, resetAt: now + windowMs }
        buckets.set(key, bucket)
      }

      // Отказанный запрос счётчик не увеличивает: иначе тот, кто упёрся в лимит, никогда бы из него не вышел.
      if (bucket.count >= perKey) {
        return { ok: false, retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)), scope: 'ip' }
      }
      if (globalBucket.count >= globalMax) {
        return { ok: false, retryAfter: Math.max(1, Math.ceil((globalBucket.resetAt - now) / 1000)), scope: 'global' }
      }

      bucket.count++
      globalBucket.count++
      return { ok: true, retryAfter: 0 }
    },
    size: () => buckets.size
  }
}

/**
 * Адрес клиента. Сайт стоит за nginx-proxy, который дописывает адрес клиента в КОНЕЦ `X-Forwarded-For`;
 * всё левее — то, что прислал сам клиент, этому верить нельзя. Берём последнюю запись, а без заголовка —
 * адрес сокета.
 */
export function clientAddress(forwardedFor: string | string[] | undefined, socketAddress: string | undefined): string {
  const header = Array.isArray(forwardedFor) ? forwardedFor.join(',') : forwardedFor
  const last = header?.split(',').map(part => part.trim()).filter(Boolean).pop()
  const value = last || socketAddress || 'unknown'
  // Ключ в карте — не более 64 знаков, чтобы заголовок не раздувал память.
  return value.slice(0, 64)
}

export interface ChatMessagePart {
  type: string
  text?: string
  [key: string]: unknown
}

export interface ChatMessageInput {
  id?: string
  role: 'user' | 'assistant'
  parts: ChatMessagePart[]
  metadata?: { currentPage?: unknown }
  [key: string]: unknown
}

export type ChatValidation = { ok: true, messages: ChatMessageInput[], framework: 'nuxt' | 'vue' } | { ok: false, message: string }

/**
 * Проверка и очистка присланной истории. Принимаем только сообщения пользователя и ассистента;
 * у прошлых ходов ассистента отбрасываем части с ответами инструментов (модель видит собственный текст,
 * а страницы документации, которые она читала, заново не отправляем — это деньги и размер запроса).
 */
export function validateChatBody(body: unknown): ChatValidation {
  const input = (body && typeof body === 'object' ? body : {}) as { messages?: unknown, framework?: unknown }

  if (!Array.isArray(input.messages) || input.messages.length === 0) {
    return { ok: false, message: 'Не передан список сообщений.' }
  }
  if (input.messages.length > CHAT_MAX_MESSAGES) {
    return { ok: false, message: `Слишком длинная беседа: не больше ${CHAT_MAX_MESSAGES} сообщений. Начните новую.` }
  }

  const last = input.messages.at(-1) as ChatMessageInput | undefined
  if (last?.role !== 'user') {
    return { ok: false, message: 'Последнее сообщение должно быть от пользователя.' }
  }

  let total = 0
  const messages: ChatMessageInput[] = []

  for (const raw of input.messages as unknown[]) {
    const message = raw as ChatMessageInput
    if (!message || typeof message !== 'object' || (message.role !== 'user' && message.role !== 'assistant') || !Array.isArray(message.parts)) {
      return { ok: false, message: 'Некорректное сообщение в истории.' }
    }

    const parts: ChatMessagePart[] = []

    for (const part of message.parts) {
      if (!part || typeof part !== 'object' || typeof part.type !== 'string') {
        return { ok: false, message: 'Некорректная часть сообщения.' }
      }

      if (part.type === 'text') {
        if (typeof part.text !== 'string') {
          return { ok: false, message: 'Некорректный текст сообщения.' }
        }
        const limit = message.role === 'user' ? CHAT_MAX_USER_TEXT : CHAT_MAX_ASSISTANT_TEXT
        if (part.text.length > limit) {
          return {
            ok: false,
            message: message.role === 'user'
              ? `Сообщение слишком длинное: не больше ${CHAT_MAX_USER_TEXT} знаков.`
              : 'Слишком длинная история беседы. Начните новую.'
          }
        }
        total += part.text.length
        parts.push({ type: 'text', text: part.text })
      } else if (part.type === 'reasoning' || part.type === 'step-start') {
        // Рассуждения прошлых ходов модели не нужны.
        continue
      } else if (message.role === 'assistant' && (part.type.startsWith('tool-') || part.type === 'dynamic-tool')) {
        // Ответы инструментов прошлых ходов не пересылаем (см. описание функции).
        continue
      } else {
        // Файлы, источники, данные и прочее чат не принимает.
        return { ok: false, message: 'Неподдерживаемая часть сообщения.' }
      }
    }

    // Пустой ход ассистента (был только вызов инструмента) модели не нужен и ломает порядок ролей.
    if (message.role === 'assistant' && !parts.some(part => part.type === 'text' && part.text)) {
      continue
    }

    messages.push({ id: typeof message.id === 'string' && message.id ? message.id.slice(0, 64) : crypto.randomUUID(), role: message.role, parts, metadata: message.metadata })
  }

  if (total > CHAT_MAX_TOTAL_TEXT) {
    return { ok: false, message: 'Слишком длинная история беседы. Начните новую.' }
  }

  return { ok: true, messages, framework: input.framework === 'vue' ? 'vue' : 'nuxt' }
}

/** Путь страницы попадает в запрос к модели, поэтому пускаем только обычный путь сайта без управляющих знаков. */
export function safePagePath(path: unknown): string | null {
  return typeof path === 'string'
    && path.length <= 128
    && !/[\r\n]/.test(path)
    && /^\/[\w/.-]*$/.test(path)
    ? path
    : null
}
