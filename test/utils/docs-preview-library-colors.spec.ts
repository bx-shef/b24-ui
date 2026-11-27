import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'

/**
 * Превью примеров на сайте документации показываются в цветах библиотеки, а «Василёк»
 * (docs/app/assets/css/vasilek.css) — только каркас сайта (bx-shef/b24-ui#57).
 *
 * Переопределения токенов висят на классах темы (.light/.edge-light/.dark), а сайт кладёт тот же класс
 * на <html> и на карточку страницы, поэтому токены наследуются в превью. Производные токены библиотеки
 * (design-filled-*, design-outline-a2-* …) разрешаются на объявившем элементе и тоже приносят цвет
 * «Василька». Вернуть библиотечные значения можно только объявив их на обёртке — это и делает класс
 * `base-mode`: библиотека объявляет на нём весь контекст (светлый — 003, тёмный `.dark .base-mode` — 004).
 *
 * Тест CSS-ный: happy-dom не вычисляет токены. Что значения действительно библиотечные в обеих темах,
 * проверено по вычисленному стилю в браузере (отчёт PR).
 */

const root = join(import.meta.dirname, '../..')
const read = (p: string) => readFileSync(join(root, p), 'utf8')

const WRAPPERS = [
  'docs/app/components/content/ComponentExample.vue',
  'docs/app/components/content/ComponentCode.vue',
  'docs/app/pages/examples/[...slug]/index.vue'
]

/** Токены, которые «Василёк» переопределяет в слое base (ключи --ui-color-*). */
export function overriddenTokens(css: string): string[] {
  const layer = css.slice(css.indexOf('@layer base {'))
  const out = new Set<string>()
  for (const block of layer.matchAll(/(^|\n)\s{2}(\.light|\.edge-light|\.dark)[^{]*\{([^}]*)\}/g)) {
    for (const t of block[3]!.matchAll(/(--ui-color-[a-z0-9-]+):/g)) {
      out.add(t[1]!)
    }
  }
  return [...out]
}

/** Объявлен ли токен в блоке библиотеки, чей список селекторов содержит `selector`. */
export function declaredOn(tokensCss: string, selector: string, token: string): boolean {
  for (const block of tokensCss.matchAll(/\n {2}([^{}]+)\{([^}]*)\}/g)) {
    const selectors = block[1]!.split(',').map(s => s.trim())
    if (selectors.includes(selector) && new RegExp(`${token}:`).test(block[2]!)) {
      return true
    }
  }
  return false
}

/** Обёртка превью: есть `vsk-preview` и `base-mode`. */
export function hasPreviewClasses(source: string): boolean {
  return [...source.matchAll(/class="([^"]*)"/g)].some((m) => {
    const names = m[1]!.split(/\s+/)
    return names.includes('vsk-preview') && names.includes('base-mode')
  })
}

describe('docs: превью примеров — в цветах библиотеки', () => {
  const css = read('docs/app/assets/css/vasilek.css')
  const light = read('src/runtime/air-design-tokens/003_b24_context_light.css')
  const dark = read('src/runtime/air-design-tokens/004_b24_context_dark.css')

  it('переопределения «Василька» не снимаются: токены переопределены', () => {
    expect(overriddenTokens(css)).toContain('--ui-color-accent-main-primary')
  })

  it('каждый переопределённый токен библиотека объявляет на .base-mode (светлая и тёмная темы)', () => {
    for (const token of overriddenTokens(css)) {
      expect(declaredOn(light, '.base-mode', token), `light: ${token}`).toBe(true)
      expect(declaredOn(dark, '.dark .base-mode', token), `dark: ${token}`).toBe(true)
    }
  })

  it.each(WRAPPERS)('обёртка превью %s несёт vsk-preview и base-mode', (file) => {
    expect(hasPreviewClasses(read(file))).toBe(true)
  })

  it('переопределения не заведены на .base-mode / .vsk-preview (иначе превью снова в цветах сайта)', () => {
    const layer = css.slice(css.indexOf('@layer base {'))
    expect(layer).not.toMatch(/\.base-mode[^{]*\{[^}]*--ui-color-accent/)
    expect(layer).not.toMatch(/\.vsk-preview[^{]*\{[^}]*--ui-color-accent/)
  })

  it('тема примера (?theme=) не пишет общий выбор посетителя', () => {
    const page = read('docs/app/pages/examples/[...slug]/index.vue')
    expect(page).not.toMatch(/\.preference\s*=/)
    expect(page).not.toMatch(/useColorMode\(/)
  })

  // Мутации: копия входных данных с одной правкой краснеет, исходные — нет.
  it('мутации краснеют', () => {
    const noBase = read(WRAPPERS[0]!).replace(' base-mode', '')
    expect(hasPreviewClasses(noBase)).toBe(false)
    const missing = light.replace(/--ui-color-accent-main-primary:/g, '--x:')
    expect(declaredOn(missing, '.base-mode', '--ui-color-accent-main-primary')).toBe(false)
    const withLeak = `${css}\n@layer base {\n  .vsk-preview {\n    --ui-color-accent-main-primary: #4b3cd0;\n  }\n}`
    expect(/\.vsk-preview[^{]*\{[^}]*--ui-color-accent/.test(withLeak.slice(withLeak.lastIndexOf('@layer base {')))).toBe(true)
  })
})
