import { tool } from 'ai'
import { z } from 'zod'
import { DEV_REQUEST_KINDS, DEV_REQUEST_SUMMARY_MAX, DEV_REQUEST_URL } from '../../shared/devRequest'

export const devRequestInputSchema = z.object({
  summary: z.string().trim().min(1).max(DEV_REQUEST_SUMMARY_MAX).describe('Кратко: что нужно и зачем, до 1500 знаков. Без личных данных пользователя.'),
  kind: z.enum(DEV_REQUEST_KINDS).describe('feature — нужна возможность или компонент, bug — ошибка в библиотеке, question — вопрос без ответа в документации.')
})

/** Результат инструмента: адрес формы — всегда константа, из ввода модели в него ничего не попадает. */
export function devRequestResult(input: z.infer<typeof devRequestInputSchema>) {
  return { url: DEV_REQUEST_URL, summary: input.summary, kind: input.kind }
}

/**
 * Инструмент «запрос на разработку». Ничего никуда не отправляет: окно показывает карточку с текстом
 * и кнопкой «Открыть форму», отправляет запрос сам пользователь.
 */
export const requestDevelopmentTool = tool({
  description: 'Предложить пользователю запрос на разработку владельцу библиотеки: нужного компонента или возможности нет, найдена ошибка или нужна доработка. Ничего не отправляет: окно покажет карточку с текстом запроса и кнопкой, которая открывает форму. Вызывай только при реальном пробеле, не при каждом ответе.',
  inputSchema: devRequestInputSchema,
  execute: async input => devRequestResult(input)
})
