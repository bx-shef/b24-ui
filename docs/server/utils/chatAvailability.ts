import type { H3Event } from 'h3'
import { resolveChatConfig } from './chatConfig'

/**
 * Чат сайта включён, только если на сервере задан ключ DeepSeek (`NUXT_DEEPSEEK_API_KEY`).
 * Ключ читается в рантайме из приватного `runtimeConfig`, поэтому его можно задать при запуске контейнера;
 * клиенту он не отдаётся — страницы узнают о доступности чата через `GET /api/ai/status`.
 */
export function chatConfig(event: H3Event) {
  return resolveChatConfig(useRuntimeConfig(event))
}
