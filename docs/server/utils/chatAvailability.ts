import type { H3Event } from 'h3'
import { useRuntimeConfig } from 'nitropack/runtime'

/**
 * Чат сайта включён, только если на сервере задан ключ DeepSeek (`NUXT_DEEPSEEK_API_KEY`).
 * Ключ читается в рантайме из приватного `runtimeConfig`, поэтому его можно задать при запуске контейнера;
 * клиенту он не отдаётся — страницы узнают о доступности чата через `GET /api/ai/status`.
 */
export function chatConfig(event: H3Event) {
  const config = useRuntimeConfig(event)
  const apiKey = String(config.deepseekApiKey || '').trim()

  return {
    enabled: apiKey.length > 0,
    apiKey,
    model: String(config.deepseekModel || '').trim() || 'deepseek-chat',
    baseURL: String(config.deepseekBaseUrl || '').trim() || 'https://api.deepseek.com'
  }
}
