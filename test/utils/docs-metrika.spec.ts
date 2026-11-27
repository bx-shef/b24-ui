import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect, vi } from 'vitest'
import {
  METRIKA_INIT_OPTIONS,
  createTracker,
  parseMetrikaId,
  shouldLoadMetrika
} from '../../docs/app/utils/yandex-metrika'

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf-8')

describe('docs metrika: counter id', () => {
  it.each([undefined, null, '', '   ', 'abc', '123abc', '<script>', '1;alert(1)', '12 34', '-5', '1.5', '0', '٣٣', '1e3', '0x1F', '0b11', '12345678abc', 'abc12345678', 1e21, {}, []])(
    'rejects %j (no counter)',
    (raw) => {
      expect(parseMetrikaId(raw)).toBeNull()
    }
  )

  it('accepts digits only', () => {
    expect(parseMetrikaId('12345678')).toBe(12345678)
    expect(parseMetrikaId(' 12345678 ')).toBe(12345678)
  })

  it('keeps the webvisor off', () => {
    expect(METRIKA_INIT_OPTIONS.webvisor).toBe(false)
    expect(METRIKA_INIT_OPTIONS.defer).toBe(true)
  })
})

describe('docs metrika: consent', () => {
  it('loads tag.js only with an id and granted consent', () => {
    expect(shouldLoadMetrika(12345, true)).toBe(true)
    expect(shouldLoadMetrika(12345, false)).toBe(false)
    expect(shouldLoadMetrika(null, true)).toBe(false)
    expect(shouldLoadMetrika(null, false)).toBe(false)
  })
})

describe('docs metrika: track', () => {
  it('calls nothing without a counter', () => {
    const ym = vi.fn()
    createTracker(null, () => ym, () => true)('Theme Reset')
    expect(ym).not.toHaveBeenCalled()
  })

  it('calls nothing without consent (no queue)', () => {
    const ym = vi.fn()
    let granted = false
    const track = createTracker(12345, () => ym, () => granted)
    track('Theme Changed', { setting: 'radius' })
    expect(ym).not.toHaveBeenCalled()
    granted = true
    track('Theme Reset')
    expect(ym).toHaveBeenCalledTimes(1)
    expect(ym).toHaveBeenCalledWith(12345, 'reachGoal', 'Theme Reset')
  })

  it('does not call ym by default (consent unknown)', () => {
    const ym = vi.fn()
    createTracker(1, () => ym)('Theme Reset')
    expect(ym).not.toHaveBeenCalled()
  })

  it('does not fail while ym is not loaded', () => {
    expect(() => createTracker(1, () => undefined, () => true)('Theme Reset')).not.toThrow()
  })

  it('sends reachGoal with params', () => {
    const ym = vi.fn()
    createTracker(12345678, () => ym, () => true)('Theme Changed', { setting: 'radius', value: 2 })
    expect(ym).toHaveBeenCalledWith(12345678, 'reachGoal', 'Theme Changed', { setting: 'radius', value: 2 })
  })

  it('sends a goal without params as is', () => {
    const ym = vi.fn()
    createTracker(1, () => ym, () => true)('AI Chat Message Sent')
    expect(ym).toHaveBeenCalledWith(1, 'reachGoal', 'AI Chat Message Sent')
  })

  it('search sends only the length, not the text', () => {
    const search = read('docs/app/components/search/Search.vue')
    expect(search).toContain(`track('Search Performed', { length:`)
    expect(search).not.toMatch(/track\('Search Performed', \{ term/)
    expect(read('docs/app/utils/yandex-metrika.ts')).not.toContain('term')
  })
})

describe('docs metrika: wiring', () => {
  it('passes the id through runtimeConfig and the deploy files', () => {
    expect(read('docs/nuxt.config.ts')).toMatch(/yandexMetrikaId: ''/)
    expect(read('deploy/docs/docker-compose.prod.yml')).toContain('NUXT_PUBLIC_YANDEX_METRIKA_ID: ${NUXT_PUBLIC_YANDEX_METRIKA_ID:-}')
    expect(read('deploy/docs/.env.example')).toMatch(/^NUXT_PUBLIC_YANDEX_METRIKA_ID=$/m)
    expect(read('deploy/docs/Dockerfile')).toContain('NUXT_PUBLIC_YANDEX_METRIKA_ID=${YANDEX_METRIKA_ID}')
    expect(read('.github/workflows/docs-image.yml')).toContain('YANDEX_METRIKA_ID=${{ env.YANDEX_METRIKA_ID }}')
  })

  it('plugin validates the id and keeps the webvisor off', () => {
    const plugin = read('docs/app/plugins/yandex-metrika.client.ts')
    expect(plugin).toContain('parseMetrikaId(')
    expect(plugin).toContain(`'init'`)
    expect(read('docs/app/utils/yandex-metrika.ts')).toContain('webvisor: false')
  })

  it('plugin starts the counter only through the consent banner', () => {
    const plugin = read('docs/app/plugins/yandex-metrika.client.ts')
    expect(plugin).toContain('shouldLoadMetrika(')
    expect(plugin).toContain('onAnalytics(start)')
    expect(plugin).toContain('cookie-consent.js')
    expect(read('docs/public/cookie-consent.js')).toContain('BxConsent')
  })
})
