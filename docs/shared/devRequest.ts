/**
 * Запрос на разработку из чата «Спросить AI»: адрес формы и допустимые виды запроса.
 * Адрес — константа: ни модель, ни ответ сервера его не задают. Сервер (инструмент `request_development`)
 * и окно чата берут его отсюда.
 */
export const DEV_REQUEST_URL = 'https://cowork.bx-shef.by/?type=dev&product=b24-ui#start'

export const DEV_REQUEST_KINDS = ['feature', 'bug', 'question'] as const
export type DevRequestKind = typeof DEV_REQUEST_KINDS[number]

/** Предел краткого описания запроса, знаков. */
export const DEV_REQUEST_SUMMARY_MAX = 500

export function isDevRequestKind(value: unknown): value is DevRequestKind {
  return typeof value === 'string' && (DEV_REQUEST_KINDS as readonly string[]).includes(value)
}

/**
 * Данные карточки из части сообщения с инструментом: только готовый результат `request_development`
 * с непустым `summary`; иначе `null` (вызов идёт, ошибка, другой инструмент). Адрес формы не берётся.
 */
export function devRequestFromPart(toolName: string, part: { state?: string, output?: unknown }): { summary: string, kind: string } | null {
  if (toolName !== 'request_development' || part.state !== 'output-available') {
    return null
  }
  const output = part.output as { summary?: unknown, kind?: unknown } | undefined
  if (typeof output?.summary !== 'string' || !output.summary.trim()) {
    return null
  }

  return { summary: output.summary, kind: isDevRequestKind(output.kind) ? output.kind : 'question' }
}
