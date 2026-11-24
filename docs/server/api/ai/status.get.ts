import { defineEventHandler, setResponseHeader } from 'h3'
import { chatConfig } from '../../utils/chatAvailability'

/**
 * Включён ли чат «Спросить AI». Ответ — только флаг, без ключа и модели.
 * Маршрут не пререндерится: ответ зависит от переменных окружения запущенного сервера.
 */
export default defineEventHandler((event) => {
  setResponseHeader(event, 'cache-control', 'no-store')

  return { enabled: chatConfig(event).enabled }
})
