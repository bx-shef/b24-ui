import { createDeepSeek } from '@ai-sdk/deepseek'

/** Модель DeepSeek для агента чата. Отдельный модуль, чтобы тесты маршрута подменяли провайдера целиком. */
export function createChatModel(config: { apiKey: string, model: string, baseURL: string }) {
  return createDeepSeek({ apiKey: config.apiKey, baseURL: config.baseURL })(config.model)
}
