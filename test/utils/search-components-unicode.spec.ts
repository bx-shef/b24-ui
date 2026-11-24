import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { scoreComponent, tokenize } from '../../docs/server/utils/searchComponents'

/**
 * Russian queries for the MCP component search. `tokenize()` used to split on
 * `[^a-z0-9]+`, so a Cyrillic query produced no tokens and Russian keywords in
 * frontmatter could never match. Tokens are now Unicode letters and digits, and
 * they are escaped before they go into a RegExp.
 */

const modal = {
  name: 'modal',
  title: 'Modal',
  description: 'A dialog window to display content.',
  keywords: ['dialog', 'popup', 'модальное окно', 'диалог', 'всплывающее окно']
}
const button = {
  name: 'button',
  title: 'Button',
  description: 'A button element.',
  keywords: ['cta', 'кнопка', 'призыв к действию']
}

describe('tokenize', () => {
  it('keeps Cyrillic words', () => {
    expect(tokenize('Модальное окно')).toEqual(['модальное', 'окно'])
  })

  it('folds ё to е and keeps й', () => {
    expect(tokenize('Всё')).toEqual(['все'])
    expect(tokenize('тройной')).toEqual(['тройной'])
  })

  it('splits mixed Latin and Cyrillic queries', () => {
    expect(tokenize('modal, окно-диалог 2')).toEqual(['modal', 'окно', 'диалог'])
  })

  it('still strips Latin diacritics', () => {
    expect(tokenize('café')).toEqual(['cafe'])
  })
})

describe('scoreComponent with Russian text', () => {
  it('finds a component by a Russian keyword', () => {
    expect(scoreComponent(modal, 'диалог')).toBeGreaterThan(0)
    expect(scoreComponent(button, 'диалог')).toBe(0)
  })

  it('matches a Russian keyword by its words', () => {
    expect(scoreComponent(modal, 'окно')).toBeGreaterThan(0)
    expect(scoreComponent(modal, 'открыть модальное окно')).toBeGreaterThan(scoreComponent(button, 'открыть модальное окно'))
  })

  it('is case- and ё-insensitive', () => {
    expect(scoreComponent(modal, 'ДИАЛОГ')).toBe(scoreComponent(modal, 'диалог'))
    expect(scoreComponent({ name: 'x', keywords: ['всё сразу'] }, 'ВСЁ СРАЗУ')).toBeGreaterThan(0)
    expect(scoreComponent({ name: 'x', keywords: ['всё сразу'] }, 'все сразу')).toBeGreaterThan(0)
  })

  it('does not fire inside a longer Cyrillic word', () => {
    // `\b` is ASCII-only, so a plain `\b` boundary would not guard this at all.
    expect(scoreComponent({ name: 'x', keywords: ['подкнопка'] }, 'кнопка')).toBe(0)
    expect(scoreComponent({ name: 'x', keywords: ['кнопка'] }, 'кноп')).toBeGreaterThan(0) // prefix of the whole keyword
  })

  it('ranks a mixed query across both languages', () => {
    expect(scoreComponent(button, 'button кнопка')).toBeGreaterThan(scoreComponent(modal, 'button кнопка'))
    expect(scoreComponent(modal, 'modal диалог')).toBeGreaterThan(scoreComponent(button, 'modal диалог'))
  })

  it('keeps English matching unchanged', () => {
    expect(scoreComponent(modal, 'modal')).toBeGreaterThanOrEqual(100)
    expect(scoreComponent(modal, 'popup')).toBeGreaterThan(0)
    expect(scoreComponent(modal, 'popu')).toBeGreaterThan(0)
    expect(scoreComponent({ name: 'x', keywords: ['pop'] }, 'popup')).toBe(0)
  })
})

describe('regular-expression safety', () => {
  const hostile = [
    '(', ')', '[', ']', '{', '}', '*', '+', '?', '.', '\\', '^', '$', '|',
    '(((', '[a-', 'a{1,', '\\p{L', '.*.*.*', '(?<=', 'кнопка(', '[диалог]', 'modal\\', '$&'
  ]

  it.each(hostile)('does not throw for the query %j', (query) => {
    expect(() => scoreComponent(modal, query)).not.toThrow()
    expect(() => scoreComponent(modal, `modal ${query} диалог`)).not.toThrow()
  })

  it('does not treat query characters as regex syntax', () => {
    expect(scoreComponent(modal, '.*.*.*')).toBe(0)
    expect(scoreComponent(modal, '(dialog|popup)')).toBeGreaterThanOrEqual(0)
    expect(tokenize('(dialog|popup) [a-z]+ .*')).toEqual(['dialog', 'popup'])
  })

  it('produces only letter and digit tokens', () => {
    for (const query of hostile) {
      for (const token of tokenize(`кнопка ${query} modal`)) {
        expect(token).toMatch(/^[\p{L}\p{N}]+$/u)
      }
    }
  })
})

describe('Russian keywords in the docs', () => {
  const read = (file: string) => readFileSync(resolve(process.cwd(), 'docs/content/docs/2.components', file), 'utf-8')

  it.each([
    ['button.md', 'кнопка'],
    ['modal.md', 'диалог'],
    ['table.md', 'таблица'],
    ['toast.md', 'уведомление']
  ])('%s carries the Russian keyword %s next to the English ones', (file, keyword) => {
    const source = read(file)
    expect(source).toMatch(new RegExp(`^ {2}- ${keyword}$`, 'm'))
    expect(source).toMatch(/^keywords:\n(?: {2}- .+\n)* {2}- [a-z]/m)
  })
})
