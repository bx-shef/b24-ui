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
