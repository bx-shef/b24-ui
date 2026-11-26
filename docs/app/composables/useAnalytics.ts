import { createTracker, parseMetrikaId } from '../utils/yandex-metrika'

type AllowedPropertyValues = string | number | boolean | null | undefined
type PlainFlags = Record<string, unknown>
type FlagsDataInput = (string | PlainFlags)[] | PlainFlags

/**
 * Цели Яндекс Метрики (`reachGoal`). Без номера счётчика (runtimeConfig.public.yandexMetrikaId) и без согласия на аналитику — ничего не делает.
 * Тексты сообщений и поисковых запросов не отправляем (у поиска — только длина).
 */
export function useAnalytics() {
  const id = parseMetrikaId(useRuntimeConfig().public.yandexMetrikaId)
  const send = createTracker(id, () => (import.meta.client ? window.ym : undefined),
    () => import.meta.client && window.BxConsent?.granted() === true)

  function track(
    name: string,
    properties?: Record<string, AllowedPropertyValues>,
    _options?: { flags?: FlagsDataInput }
  ): void {
    send(name, properties)
  }

  return {
    track
  }
}
