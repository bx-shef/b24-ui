/**
 * Яндекс Метрика: чистые функции без Nuxt-рантайма (плагин и `useAnalytics` лишь вызывают их).
 */

export const METRIKA_TAG_URL = 'https://mc.yandex.ru/metrika/tag.js'

/** Адрес политики и подпись сервиса для баннера согласия (`cookie-consent.js`). */
export const CONSENT_POLICY_URL = 'https://offer.bx-shef.by/privacy'
export const CONSENT_SERVICES = 'Яндекс Метрику (статистика посещений)'

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

/**
 * Грузить ли `tag.js` и инициализировать Метрику: есть корректный номер счётчика и дано согласие на аналитику.
 * Без согласия (не выбрано или отказ) — нет.
 */
export function shouldLoadMetrika(id: number | null, consentGranted: boolean): boolean {
  return id !== null && consentGranted === true
}

/**
 * `track(name, props)` → `ym(id, 'reachGoal', name, props)`; без счётчика, без согласия или без `ym` — ничего
 * (очереди нет: события до согласия не копятся).
 */
export function createTracker(id: number | null, getYm: () => Ym | undefined, isGranted: () => boolean = () => false) {
  return function track(name: string, props?: TrackProps): void {
    if (id === null || !isGranted()) {
      return
    }
    const ym = getYm()
    if (typeof ym !== 'function') {
      return
    }
    if (props) {
      ym(id, 'reachGoal', name, { ...props })
    } else {
      ym(id, 'reachGoal', name)
    }
  }
}
