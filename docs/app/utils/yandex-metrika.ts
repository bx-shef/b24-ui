/**
 * Яндекс Метрика: чистые функции без Nuxt-рантайма (плагин и `useAnalytics` лишь вызывают их).
 */

export const METRIKA_TAG_URL = 'https://mc.yandex.ru/metrika/tag.js'

/** Предел длины поискового запроса в событии, знаков. */
export const TERM_MAX_LENGTH = 100

/** Вебвизор выключен: он записывает ввод в поля (поиск, чат). */
export const METRIKA_INIT_OPTIONS = {
  ssr: true,
  defer: true,
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: false
} as const

type Ym = (id: number, method: string, ...args: unknown[]) => void
type TrackProps = Record<string, string | number | boolean | null | undefined>

/**
 * Номер счётчика: только цифры, иначе `null` (счётчик не подключается). Номер попадает в URL и в код,
 * поэтому всё, что не `^\d+$`, отбрасывается.
 */
export function parseMetrikaId(raw: unknown): number | null {
  if (typeof raw !== 'string' && typeof raw !== 'number') {
    return null
  }
  const value = String(raw).trim()
  if (!/^\d+$/.test(value)) {
    return null
  }
  const id = Number(value)
  return Number.isSafeInteger(id) && id > 0 ? id : null
}

/** Параметры цели: поисковый запрос обрезается до {@link TERM_MAX_LENGTH} знаков (по символам, не по байтам). */
export function buildGoalParams(props?: TrackProps): TrackProps | undefined {
  if (!props) {
    return undefined
  }
  const params: TrackProps = { ...props }
  if (typeof params.term === 'string') {
    params.term = Array.from(params.term).slice(0, TERM_MAX_LENGTH).join('')
  }
  return params
}

/** `track(name, props)` → `ym(id, 'reachGoal', name, params)`; без счётчика или без `ym` — ничего. */
export function createTracker(id: number | null, getYm: () => Ym | undefined) {
  return function track(name: string, props?: TrackProps): void {
    if (id === null) {
      return
    }
    const ym = getYm()
    if (typeof ym !== 'function') {
      return
    }
    const params = buildGoalParams(props)
    if (params) {
      ym(id, 'reachGoal', name, params)
    } else {
      ym(id, 'reachGoal', name)
    }
  }
}
