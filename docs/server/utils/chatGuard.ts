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

/** Суточный потолок запросов ко всему чату (окно 24 часа). Предел расхода, даже если адреса меняют. */
export const CHAT_LIMIT_DAILY = 2000
const DAY_MS = 24 * 60 * 60 * 1000
/** Результат инструмента режем до стольких знаков: страница документации в контексте — это деньги. */
export const CHAT_MAX_TOOL_RESULT = 14000

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
  /** Что именно сработало: адрес, общий потолок окна или суточный потолок. */
  scope?: 'ip' | 'global' | 'daily'
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

export function createRateLimiter(options: { windowMs?: number, perKey?: number, global?: number, daily?: number } = {}): RateLimiter {
  const windowMs = options.windowMs ?? CHAT_LIMIT_WINDOW_MS
  const perKey = options.perKey ?? CHAT_LIMIT_PER_IP
  const globalMax = options.global ?? CHAT_LIMIT_GLOBAL
  const dailyMax = options.daily ?? CHAT_LIMIT_DAILY

  const buckets = new Map<string, Bucket>()
  let globalBucket: Bucket = { count: 0, resetAt: 0 }
  let dailyBucket: Bucket = { count: 0, resetAt: 0 }

  function sweep(now: number) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key)
    }
  }

  const wait = (bucket: Bucket, now: number) => Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))

  return {
    hit(key, now = Date.now()) {
      if (globalBucket.resetAt <= now) globalBucket = { count: 0, resetAt: now + windowMs }
      if (dailyBucket.resetAt <= now) dailyBucket = { count: 0, resetAt: now + DAY_MS }
      if (buckets.size >= MAX_TRACKED) sweep(now)

      let bucket = buckets.get(key)
      if (bucket && bucket.resetAt <= now) bucket = undefined

      // Отказанный запрос счётчик не увеличивает: иначе тот, кто упёрся в лимит, никогда бы из него не вышел.
      if (bucket && bucket.count >= perKey) {
        return { ok: false, retryAfter: wait(bucket, now), scope: 'ip' }
      }
      // Общие потолки проверяются ДО создания ячейки адреса: иначе десяток адресов, пришедших при сработавшем
      // потолке, раздували бы карту, не получив ни одного ответа.
      if (globalBucket.count >= globalMax) {
        return { ok: false, retryAfter: wait(globalBucket, now), scope: 'global' }
      }
      if (dailyBucket.count >= dailyMax) {
        return { ok: false, retryAfter: wait(dailyBucket, now), scope: 'daily' }
      }

      if (!bucket) {
        bucket = { count: 0, resetAt: now + windowMs }
        buckets.set(key, bucket)
      }

      bucket.count++
      globalBucket.count++
      dailyBucket.count++
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
  // Ключ в карте — не более 64 знаков, чтобы заголовок не раздувал память.
  return addressKey(last || socketAddress || 'unknown').slice(0, 64)
}

/**
 * Ключ счётчика по адресу. IPv6 считаем по сети /64 (первые четыре группы): у одного абонента их 2^64,
 * и по полному адресу лимит обходился бы перебором. IPv4-в-IPv6 (`::ffff:1.2.3.4`) сводим к IPv4.
 */
export function addressKey(raw: string): string {
  const value = raw.trim().replace(/^\[|\]$/g, '').split('%')[0]!.toLowerCase()

  const mapped = /^(?:::ffff:|0:0:0:0:0:ffff:)(\d{1,3}(?:\.\d{1,3}){3})$/.exec(value)
  if (mapped) return mapped[1]!

  if (!value.includes(':')) return value

  const [head = '', tail] = value.split('::')
  const headGroups = head ? head.split(':') : []
  const tailGroups = tail === undefined ? [] : (tail ? tail.split(':') : [])
  const missing = 8 - headGroups.length - tailGroups.length
  if (tail === undefined ? headGroups.length !== 8 : missing < 0) return value

  const groups = [...headGroups, ...Array.from({ length: tail === undefined ? 0 : missing }, () => '0'), ...tailGroups]
  if (groups.length !== 8 || groups.some(group => !/^[0-9a-f]{1,4}$/.test(group))) return value

  return `v6:${groups.slice(0, 4).map(group => group.padStart(4, '0')).join(':')}`
}

/**
 * Читает тело запроса с ограничением на САМО чтение: `Content-Length` клиент может не прислать (chunked)
 * или солгать, поэтому байты считаются по мере прихода и чтение обрывается на пределе.
 */
export async function readJsonLimited(stream: AsyncIterable<Uint8Array | string>, maxBytes: number): Promise<{ ok: true, body: unknown } | { ok: false, status: 400 | 413 }> {
  const chunks: Buffer[] = []
  let size = 0

  try {
    for await (const chunk of stream) {
      const buffer = typeof chunk === 'string' ? Buffer.from(chunk) : Buffer.from(chunk)
      size += buffer.length
      if (size > maxBytes) {
        return { ok: false, status: 413 }
      }
      chunks.push(buffer)
    }
  } catch {
    return { ok: false, status: 400 }
  }

  if (size === 0) {
    return { ok: false, status: 400 }
  }

  try {
    return { ok: true, body: JSON.parse(Buffer.concat(chunks).toString('utf-8')) }
  } catch {
    return { ok: false, status: 400 }
  }
}

/** Результат инструмента для модели: длиннее предела — обрезается с пометкой. Короткий возвращается как есть. */
export function truncateToolResult<T>(value: T, max = CHAT_MAX_TOOL_RESULT): T | string {
  const text = typeof value === 'string' ? value : JSON.stringify(value)
  if (typeof text !== 'string' || text.length <= max) {
    return value
  }

  return `${text.slice(0, max)}\n\n[Результат обрезан: показано ${max} из ${text.length} знаков. Если нужна другая часть, уточните запрос к инструменту.]`
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

    if (message.parts.length === 0) {
      return { ok: false, message: 'Пустое сообщение.' }
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
        if (message.role === 'user' && !part.text.trim()) {
          return { ok: false, message: 'Пустое сообщение.' }
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

    // Вопрос без текста (например, из одних служебных частей) модели отдавать нельзя
    if (message.role === 'user' && !parts.length) {
      return { ok: false, message: 'Пустое сообщение.' }
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
