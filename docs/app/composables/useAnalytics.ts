import { createTracker, parseMetrikaId } from '../utils/yandex-metrika'

type AllowedPropertyValues = string | number | boolean | null | undefined
type PlainFlags = Record<string, unknown>
type FlagsDataInput = (string | PlainFlags)[] | PlainFlags

/**
 * Цели Яндекс Метрики (`reachGoal`). Без номера счётчика (runtimeConfig.public.yandexMetrikaId) — ничего не делает.
 * Тексты сообщений не отправляем; поисковый запрос `term` обрезается до 100 знаков.
 */
export function useAnalytics() {
  const id = parseMetrikaId(useRuntimeConfig().public.yandexMetrikaId)
  const send = createTracker(id, () => (import.meta.client ? window.ym : undefined))

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
