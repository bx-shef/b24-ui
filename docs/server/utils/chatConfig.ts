/**
 * Настройки чата из `runtimeConfig` — чистая функция без Nitro, чтобы её проверял `test/utils/docs-chat-route.spec.ts`.
 * Чат включён, только если ключ DeepSeek непустой (пробелы не в счёт); модель и адрес API — с запасными значениями.
 */
export function resolveChatConfig(config: Record<string, unknown>) {
  const apiKey = String(config.deepseekApiKey ?? '').trim()

  return {
    enabled: apiKey.length > 0,
    apiKey,
    model: String(config.deepseekModel ?? '').trim() || 'deepseek-chat',
    baseURL: String(config.deepseekBaseUrl ?? '').trim() || 'https://api.deepseek.com'
  }
}
