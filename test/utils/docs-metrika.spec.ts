import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect, vi } from 'vitest'
import {
  METRIKA_INIT_OPTIONS,
  TERM_MAX_LENGTH,
  buildGoalParams,
  createTracker,
  parseMetrikaId
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

describe('docs metrika: track', () => {
  it('calls nothing without a counter', () => {
    const ym = vi.fn()
    createTracker(null, () => ym)('Search Performed', { term: 'x' })
    expect(ym).not.toHaveBeenCalled()
  })

  it('does not fail while ym is not loaded', () => {
    expect(() => createTracker(1, () => undefined)('Theme Reset')).not.toThrow()
  })

  it('sends reachGoal with params', () => {
    const ym = vi.fn()
    createTracker(12345678, () => ym)('Theme Changed', { setting: 'radius', value: 2 })
    expect(ym).toHaveBeenCalledWith(12345678, 'reachGoal', 'Theme Changed', { setting: 'radius', value: 2 })
  })

  it('sends a goal without params as is', () => {
    const ym = vi.fn()
    createTracker(1, () => ym)('AI Chat Message Sent')
    expect(ym).toHaveBeenCalledWith(1, 'reachGoal', 'AI Chat Message Sent')
  })

  it('cuts the search term to 100 characters, by code points', () => {
    expect((buildGoalParams({ term: 'a'.repeat(500) })!.term as string).length).toBe(TERM_MAX_LENGTH)
    const emoji = '😀'.repeat(150)
    expect(Array.from(buildGoalParams({ term: emoji })!.term as string)).toHaveLength(TERM_MAX_LENGTH)
    expect(buildGoalParams({ term: 'кнопка' })).toEqual({ term: 'кнопка' })
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
})
