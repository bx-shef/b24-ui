import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { devRequestInputSchema, devRequestResult, requestDevelopmentTool } from '../../docs/server/utils/chatDevRequest'
import { DEV_REQUEST_URL, DEV_REQUEST_SUMMARY_MAX } from '../../docs/shared/devRequest'

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf-8')

describe('docs chat: запрос на разработку', () => {
  it('адрес формы — зафиксированная константа', () => {
    expect(DEV_REQUEST_URL).toBe('https://cowork.bx-shef.by/?type=dev&product=b24-ui#start')
  })

  it('возвращает константный адрес независимо от ввода', async () => {
    const evil = 'https://evil.example/phish?x=1'
    for (const summary of [evil, `Нужен компонент. url: ${evil}`, 'обычный текст']) {
      const result = await (requestDevelopmentTool as any).execute({ summary, kind: 'feature' }, {})
      expect(result.url).toBe(DEV_REQUEST_URL)
      expect(result.summary).toBe(summary)
      expect(result.kind).toBe('feature')
    }
  })

  it('лишние поля ввода (url) в результат не попадают', () => {
    const parsed = devRequestInputSchema.parse({ summary: 'x', kind: 'bug', url: 'https://evil.example' })
    expect(devRequestResult(parsed)).toEqual({ url: DEV_REQUEST_URL, summary: 'x', kind: 'bug' })
  })

  it('схема: пределы и виды', () => {
    const ok = { summary: 'a'.repeat(DEV_REQUEST_SUMMARY_MAX), kind: 'question' }
    expect(devRequestInputSchema.safeParse(ok).success).toBe(true)
    expect(devRequestInputSchema.safeParse({ ...ok, summary: ok.summary + 'a' }).success).toBe(false)
    expect(devRequestInputSchema.safeParse({ ...ok, summary: '   ' }).success).toBe(false)
    expect(devRequestInputSchema.safeParse({ ...ok, kind: 'other' }).success).toBe(false)
    expect(devRequestInputSchema.safeParse({ summary: 'x' }).success).toBe(false)
    for (const kind of ['feature', 'bug', 'question']) {
      expect(devRequestInputSchema.safeParse({ summary: 'x', kind }).success).toBe(true)
    }
  })

  it('инструмент подключён к чату', () => {
    expect(read('docs/server/utils/chatTools.ts')).toMatch(/request_development:\s*requestDevelopmentTool/)
  })

  it('инструкции обеих версий содержат правило', () => {
    const route = read('docs/server/api/ai.post.ts')
    // общий шаблон buildInstructions('nuxt' | 'vue') — одно правило на обе версии
    expect(route).toMatch(/ЗАПРОС НА РАЗРАБОТКУ:[\s\S]*request_development[\s\S]*Без личных данных[\s\S]*Не предлагай запрос в каждом ответе/)
    expect(route).toMatch(/nuxt: buildInstructions\('nuxt'\)/)
    expect(route).toMatch(/vue: buildInstructions\('vue'\)/)
  })

  it('карточка: адрес — константа окна, текст не разметкой, события без текста', () => {
    const card = read('docs/app/components/chat/ChatDevRequest.vue')
    const chat = read('docs/app/components/chat/Chat.vue')

    expect(card).toMatch(/import \{[^}]*DEV_REQUEST_URL[^}]*\} from '~~\/shared\/devRequest'/)
    expect(card).toMatch(/:to="DEV_REQUEST_URL"/)
    expect(card).toMatch(/target="_blank"/)
    expect(card).toMatch(/rel="noopener"/)
    expect(card).not.toMatch(/v-html|innerHTML/)
    expect(card).toMatch(/track\('Dev Request Suggested', \{ kind: kind\.value \}\)/)
    expect(card).toMatch(/track\('Dev Request Form Opened', \{ kind: kind\.value \}\)/)
    expect(card).toMatch(/Скопировать текст/)
    expect(card).toMatch(/Открыть форму/)
    expect(card).toMatch(/\{\{ summary \}\}/)

    // адрес из ответа сервера в карточку не передаётся
    expect(chat).toMatch(/<ChatDevRequest/)
    expect(chat).not.toMatch(/output\.url|:url=/)
  })
})
