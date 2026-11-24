import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf-8')

/**
 * Чат сайта документации включается только ключом на сервере. Ключ не должен жить в репозитории,
 * а развёртывание обязано его пробрасывать: потерянная строка в compose тихо выключит чат на проде.
 */
describe('docs chat: deploy and secrets', () => {
  it('passes the key and the model to the container, with the key empty by default', () => {
    const compose = read('deploy/docs/docker-compose.prod.yml')

    expect(compose).toContain('NUXT_DEEPSEEK_API_KEY: ${NUXT_DEEPSEEK_API_KEY:-}')
    expect(compose).toContain('NUXT_DEEPSEEK_MODEL: ${NUXT_DEEPSEEK_MODEL:-deepseek-chat}')
  })

  it.each(['deploy/docs/.env.example', 'docs/.env.example'])('%s documents both variables and ships no key', (path) => {
    const env = read(path)

    expect(env).toMatch(/^NUXT_DEEPSEEK_API_KEY=$/m)
    expect(env).toMatch(/^NUXT_DEEPSEEK_MODEL=deepseek-chat$/m)
  })

  it('keeps the key out of the client: private runtimeConfig, no key in public config', () => {
    const config = read('docs/nuxt.config.ts')
    const publicBlock = config.slice(config.indexOf('public: {'), config.indexOf('gitUrl\n    }'))

    expect(config).toMatch(/^\s+deepseekApiKey: '',$/m)
    expect(publicBlock).not.toContain('deepseekApiKey')
    expect(publicBlock).toContain('aiChat: Boolean(')
  })

  it('does not call the provider before the key check', () => {
    const route = read('docs/server/api/ai.post.ts')

    expect(route.indexOf('if (!config.enabled)')).toBeGreaterThan(-1)
    expect(route.indexOf('if (!config.enabled)')).toBeLessThan(route.indexOf('createDeepSeek('))
    expect(route.indexOf('if (!config.enabled)')).toBeLessThan(route.indexOf('readBody('))
  })

  it('has no API key written into the chat files', () => {
    const files = [
      'docs/server/api/ai.post.ts',
      'docs/server/api/ai/status.get.ts',
      'docs/server/utils/chatAvailability.ts',
      'docs/server/utils/chatGuard.ts',
      'docs/app/components/chat/Chat.vue',
      'docs/app/composables/useChat.ts',
      'deploy/docs/.env.example',
      'docs/.env.example'
    ]

    for (const file of files) {
      expect(read(file), file).not.toMatch(/sk-[A-Za-z0-9]{16,}/)
    }
  })
})
