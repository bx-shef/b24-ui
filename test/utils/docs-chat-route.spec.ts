import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Readable } from 'node:stream'
import ts from 'typescript'
import { beforeEach, describe, it, expect, vi } from 'vitest'

/**
 * Сам маршрут чата, а не только его кирпичи: ловит «лимит в маршруте выключен», «чат включён без ключа»,
 * «ключ в ответе status» и «ключ в public runtimeConfig». h3, runtime и AI SDK подменены, провайдер не вызывается.
 */

const state = vi.hoisted(() => ({ config: {} as Record<string, unknown>, provider: vi.fn(), responses: [] as unknown[] }))

vi.mock('../../docs/server/utils/chatTools', () => ({ chatTools: {} }))
vi.mock('../../docs/server/utils/chatModel', () => ({
  createChatModel: (options: unknown) => {
    state.provider(options)
    return {}
  }
}))
vi.mock('../../docs/server/utils/chatAvailability', async () => {
  const { resolveChatConfig } = await import('../../docs/server/utils/chatConfig')
  return { chatConfig: () => resolveChatConfig(state.config) }
})
vi.mock('ai', () => ({
  ToolLoopAgent: vi.fn(),
  createAgentUIStreamResponse: (options: unknown) => {
    state.responses.push(options)
    return 'STREAM'
  },
  dynamicTool: (tool: unknown) => tool,
  jsonSchema: (schema: unknown) => schema,
  smoothStream: () => undefined,
  isStepCount: () => undefined,
  consumeStream: () => undefined,
  APICallError: { isInstance: () => false }
}))
// Нитро подставляет эти функции сам (автоимпорт h3 и рантайма), поэтому в маршрутах их нет в import
vi.stubGlobal('defineEventHandler', (handler: unknown) => handler)
vi.stubGlobal('createError', (input: { statusCode: number, message?: string }) => Object.assign(new Error(input.message), input))
vi.stubGlobal('getRequestHeader', (event: any, name: string) => event.headers[name.toLowerCase()])
vi.stubGlobal('setResponseHeader', (event: any, name: string, value: unknown) => {
  event.responseHeaders[name] = value
})

import { resolveChatConfig } from '../../docs/server/utils/chatConfig'

const { default: handler } = await import('../../docs/server/api/ai.post')
const { default: statusHandler } = await import('../../docs/server/api/ai/status.get')

let counter = 0
function makeEvent(body: string | AsyncIterable<Buffer>, headers: Record<string, string> = {}) {
  counter++
  const req = Object.assign(Readable.from(typeof body === 'string' ? [Buffer.from(body)] : body), { socket: { remoteAddress: `10.0.0.${counter}`, on: vi.fn() } })
  const res = { on: vi.fn(), writableFinished: false }
  return { headers, responseHeaders: {} as Record<string, unknown>, node: { req, res } } as any
}

const ok = JSON.stringify({ messages: [{ id: '1', role: 'user', parts: [{ type: 'text', text: 'hi' }] }] })

async function status(event: unknown) {
  try {
    await (handler as any)(event)
    return 200
  } catch (error: any) {
    return error.statusCode as number
  }
}

beforeEach(() => {
  state.config = { deepseekApiKey: 'sk-test-key', deepseekModel: '', deepseekBaseUrl: '', public: {} }
  state.provider.mockClear()
  state.responses.length = 0
})

describe('docs chat route', () => {
  it.each(['', '   ', undefined])('is off without a key (%j): 404 and the provider is never built', async (key) => {
    state.config.deepseekApiKey = key

    expect(await status(makeEvent(ok))).toBe(404)
    expect(state.provider).not.toHaveBeenCalled()
  })

  it('answers with the stream when the key is set, defaulting the model and the address', async () => {
    expect(await status(makeEvent(ok))).toBe(200)
    expect(state.provider).toHaveBeenCalledWith({ enabled: true, apiKey: 'sk-test-key', model: 'deepseek-chat', baseURL: 'https://api.deepseek.com' })
  })

  it('calls the rate limiter: the 21st request from one address is a 429 with Retry-After', async () => {
    const headers = { 'x-forwarded-for': '203.0.113.50' }
    const codes: number[] = []
    for (let i = 0; i < 21; i++) codes.push(await status(makeEvent(ok, headers)))

    expect(codes.slice(0, 20).every(code => code === 200)).toBe(true)
    expect(codes[20]).toBe(429)

    const refused = makeEvent(ok, headers)
    await expect((handler as any)(refused)).rejects.toMatchObject({ statusCode: 429, data: { retryAfter: expect.any(Number) } })
    expect(refused.responseHeaders['retry-after']).toBeGreaterThan(0)
  })

  it('refuses a body over the limit without Content-Length (chunked) with 413', async () => {
    async function* endless() {
      for (let i = 0; i < 4; i++) {
        yield Buffer.alloc(1024 * 1024)
      }
    }

    expect(await status(makeEvent(endless(), { 'x-forwarded-for': '203.0.113.60' }))).toBe(413)
  })

  it('refuses an announced oversize body, an empty body, empty parts and empty text with 4xx, never 500', async () => {
    expect(await status(makeEvent(ok, { 'x-forwarded-for': '203.0.113.61', 'content-length': String(10 * 1024 * 1024) }))).toBe(413)
    expect(await status(makeEvent('', { 'x-forwarded-for': '203.0.113.62' }))).toBe(400)
    expect(await status(makeEvent(JSON.stringify({ messages: [{ id: '1', role: 'user', parts: [] }] }), { 'x-forwarded-for': '203.0.113.63' }))).toBe(400)
    expect(await status(makeEvent(JSON.stringify({ messages: [{ id: '1', role: 'user', parts: [{ type: 'text', text: '  ' }] }] }), { 'x-forwarded-for': '203.0.113.64' }))).toBe(400)
  })

  it('aborts the provider call when the response closes before it finished', async () => {
    const event = makeEvent(ok, { 'x-forwarded-for': '203.0.113.70' })
    await (handler as any)(event)

    const signal = (state.responses[0] as { abortSignal: AbortSignal }).abortSignal
    expect(signal.aborted).toBe(false)

    const close = event.node.res.on.mock.calls.find(([name]: [string]) => name === 'close')![1]
    event.node.res.writableFinished = true
    close()
    expect(signal.aborted).toBe(false)

    event.node.res.writableFinished = false
    close()
    expect(signal.aborted).toBe(true)
  })
})

describe('chat config', () => {
  it.each([undefined, null, '', '   ', '\n\t'])('is disabled for the key %j', (key) => {
    expect(resolveChatConfig({ deepseekApiKey: key }).enabled).toBe(false)
  })

  it('is enabled by a real key, trims it, and falls back to the default model and address', () => {
    expect(resolveChatConfig({ deepseekApiKey: '  sk-1  ', deepseekModel: '  ', deepseekBaseUrl: '' }))
      .toEqual({ enabled: true, apiKey: 'sk-1', model: 'deepseek-chat', baseURL: 'https://api.deepseek.com' })
    expect(resolveChatConfig({ deepseekApiKey: 'k', deepseekModel: 'deepseek-reasoner', deepseekBaseUrl: 'http://stub' }))
      .toMatchObject({ model: 'deepseek-reasoner', baseURL: 'http://stub' })
  })
})

describe('GET /api/ai/status', () => {
  it('says exactly {enabled} and nothing else, with a key', () => {
    const result = (statusHandler as any)({ responseHeaders: {}, headers: {} })

    expect(result).toEqual({ enabled: true })
    expect(Object.keys(result)).toEqual(['enabled'])
    expect(JSON.stringify(result)).not.toContain('sk-test-key')
  })

  it.each(['', '  ', undefined])('says {enabled:false} without a key (%j)', (key) => {
    state.config.deepseekApiKey = key

    expect((statusHandler as any)({ responseHeaders: {}, headers: {} })).toEqual({ enabled: false })
  })
})

describe('nuxt.config runtimeConfig', () => {
  const source = ts.createSourceFile('nuxt.config.ts', readFileSync(resolve(process.cwd(), 'docs/nuxt.config.ts'), 'utf-8'), ts.ScriptTarget.Latest, true)

  function objectProperty(node: ts.ObjectLiteralExpression, name: string) {
    return node.properties.find((property): property is ts.PropertyAssignment =>
      ts.isPropertyAssignment(property) && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) && property.name.text === name)
  }

  function findRuntimeConfig(): ts.ObjectLiteralExpression {
    let found: ts.ObjectLiteralExpression | undefined
    const visit = (node: ts.Node) => {
      if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === 'runtimeConfig' && ts.isObjectLiteralExpression(node.initializer)) found = node.initializer
      ts.forEachChild(node, visit)
    }
    visit(source)
    return found!
  }

  it('keeps every private key out of runtimeConfig.public, names and initialisers alike', () => {
    const runtimeConfig = findRuntimeConfig()
    const publicBlock = objectProperty(runtimeConfig, 'public')!.initializer as ts.ObjectLiteralExpression

    const privateKeys = runtimeConfig.properties.map(property => (property.name as ts.Identifier).text).filter(name => name !== 'public')
    const publicKeys = publicBlock.properties.map(property => (property.name as ts.Identifier).text)

    expect(privateKeys).toEqual(expect.arrayContaining(['deepseekApiKey', 'deepseekModel']))
    expect(publicKeys.filter(key => privateKeys.includes(key))).toEqual([])
    expect(publicKeys).toContain('aiChat')

    const words: string[] = []
    const collect = (node: ts.Node) => {
      if (ts.isIdentifier(node)) words.push(node.text)
      if (ts.isStringLiteralLike(node)) words.push(node.text)
      ts.forEachChild(node, collect)
    }
    for (const property of publicBlock.properties) {
      // `baseUrl,` без значения — тоже ссылка на переменную
      if (ts.isShorthandPropertyAssignment(property)) words.push(property.name.text)
      else collect((property as ts.PropertyAssignment).initializer)
    }

    // aiChat смотрит на env-переменную ключа, но значение — булево; сам ключ и приватные имена в public не попадают
    expect(words.filter(word => privateKeys.includes(word))).toEqual([])
    const aiChat = objectProperty(publicBlock, 'aiChat')!.initializer
    expect(ts.isCallExpression(aiChat) && ts.isIdentifier(aiChat.expression) && aiChat.expression.text === 'Boolean').toBe(true)

    // Ни одно другое значение public не читает переменные DeepSeek — ключ под чужим именем тоже не уйдёт в клиент
    const leaks: string[] = []
    for (const property of publicBlock.properties) {
      if (ts.isPropertyAssignment(property) && (property.name as ts.Identifier).text === 'aiChat') continue
      const seen: string[] = []
      const grab = (node: ts.Node) => {
        if (ts.isIdentifier(node) || ts.isStringLiteralLike(node)) seen.push(node.text)
        ts.forEachChild(node, grab)
      }
      grab(ts.isShorthandPropertyAssignment(property) ? property.name : (property as ts.PropertyAssignment).initializer)
      leaks.push(...seen.filter(word => /deepseek/i.test(word)))
    }
    expect(leaks).toEqual([])
  })

  it('ships no key value', () => {
    const runtimeConfig = findRuntimeConfig()
    const key = objectProperty(runtimeConfig, 'deepseekApiKey')!.initializer

    expect(ts.isStringLiteral(key) && key.text).toBe('')
  })
})

describe('docs chat tools', () => {
  it('cuts every MCP tool result before the model sees it', () => {
    const source = readFileSync(resolve(process.cwd(), 'docs/server/utils/chatTools.ts'), 'utf-8')

    expect(source).toMatch(/return truncateToolResult\(await def\.handler\(args, \{\}\)\)/)
  })
})
