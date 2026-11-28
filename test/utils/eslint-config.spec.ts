import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect, beforeAll } from 'vitest'
import { ESLint } from 'eslint'
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import b24ui from '../../src/eslint'
import type { Bitrix24UIESLintOptions } from '../../src/eslint'

/**
 * `@bxshefby/b24ui-nuxt/eslint` (nuxt/ui@200b0bf, #25).
 *
 * Upstream's rules are written against Nuxt UI's palette (`primary` / `neutral`,
 * `neutral-*` → `text-default`). Here the suggestions are b24ui's own tokens, and
 * the spec pins both halves: the rules fire on what they should, and every token
 * a message suggests exists in the stylesheet — an invented token would send
 * users to a class that generates nothing.
 */
const root = process.cwd()
const entryPoint = join(root, 'playgrounds/nuxt/app/assets/css/main.css')

const themeCss = readFileSync(join(root, 'src/runtime/index.css'), 'utf-8')
const colorsCss = readFileSync(join(root, 'src/runtime/air-design-tokens/tw-style/colors.css'), 'utf-8')

/** The `@theme` namespaces `index.css` fills, by the utility that reads them. */
const NAMESPACES: Record<string, string> = {
  text: 'text-color',
  bg: 'background-color',
  border: 'border-color',
  divide: 'divide-color',
  ring: 'ring-color'
}

function themeTokens(namespace: string) {
  return new Set([...themeCss.matchAll(new RegExp(`--${namespace}-([a-z-]+):`, 'g'))].map(m => m[1]!))
}
const brandColors = new Set([...colorsCss.matchAll(/^\s*--color-([a-z-]+):/gm)].map(m => m[1]!))

async function lint(code: string, filename: string, options: Partial<Bitrix24UIESLintOptions> = {}) {
  const config = await createConfigForNuxt({ features: { tooling: false, stylistic: false } })
    .append(b24ui({ entryPoint, ...options }))
    .toConfigs()
  const eslint = new ESLint({ cwd: root, overrideConfigFile: true, overrideConfig: config as any })
  const [result] = await eslint.lintText(code, { filePath: join(root, filename) })
  // Only this config's rules: the Nuxt base config brings its own, like `vue/multi-word-component-names`
  return result!.messages.filter(m => m.ruleId?.startsWith('better-tailwindcss/'))
}

const vue = (template: string) => `<script setup lang="ts"></script>\n<template>\n  ${template}\n</template>\n`
const restricted = (messages: { ruleId: string | null, message: string }[]) => messages.filter(m => m.ruleId === 'better-tailwindcss/no-restricted-classes').map(m => m.message)

describe('@bxshefby/b24ui-nuxt/eslint', { timeout: 120_000 }, () => {
  describe('no-palette-colors', () => {
    it('suggests the b24ui token for a neutral palette class', async () => {
      const messages = restricted(await lint(vue('<div class="text-gray-500 bg-gray-100 border-gray-200 divide-slate-200 ring-zinc-200" />'), 'a.vue'))

      expect(messages).toEqual([
        expect.stringContaining('Use `text-description` instead'),
        expect.stringContaining('Use `bg-muted` instead'),
        expect.stringContaining('Use `border-default` or `border-muted` instead'),
        expect.stringContaining('Use `divide-default` instead'),
        expect.stringContaining('Use `ring-default` instead')
      ])
    })

    it('treats `neutral` as a Tailwind gray, there is no alias over it', async () => {
      const messages = restricted(await lint(vue('<div class="text-neutral-900" />'), 'a.vue'))

      expect(messages).toEqual([expect.stringContaining('Use `text-label` instead')])
    })

    it('keeps the variants and the opacity modifier in the suggestion', async () => {
      const messages = restricted(await lint(vue('<div class="md:hover:text-gray-500/50" />'), 'a.vue'))

      expect(messages).toEqual([expect.stringContaining('`md:hover:text-description/50`')])
    })

    it('points a `dark:` class at the token that follows the color mode', async () => {
      const messages = restricted(await lint(vue('<div class="dark:text-gray-300" />'), 'a.vue'))

      expect(messages).toEqual([expect.stringContaining('In dark mode it\'s `text-label`')])
    })

    it('suggests the brand color closest to a hue and drops the shade', async () => {
      const messages = restricted(await lint(vue('<div class="bg-red-500/20 text-green-600 border-orange-400 from-blue-500 text-violet-500" />'), 'a.vue'))

      expect(messages).toEqual([
        expect.stringContaining('use `bg-alert/20` instead'),
        expect.stringContaining('use `text-success` instead'),
        expect.stringContaining('use `border-warning` instead'),
        expect.stringContaining('use `from-primary` instead'),
        expect.stringContaining('use `text-ai` instead')
      ])
    })

    it('falls back to the full list for a hue without a brand color and for a shade without a token', async () => {
      const messages = restricted(await lint(vue('<div class="text-pink-500 bg-gray-700" />'), 'a.vue'))

      expect(messages).toEqual([
        expect.stringContaining('the `color` prop of the component'),
        expect.stringContaining('Use a semantic token instead: `bg-default`, `bg-muted`, `bg-elevated` or `bg-accented`')
      ])
    })

    it('flags hardcoded colors', async () => {
      const messages = restricted(await lint(vue('<div class="bg-[#fff] text-[rgb(1,2,3)]" />'), 'a.vue'))

      expect(messages).toHaveLength(2)
      expect(messages[0]).toContain('hardcodes a color')
    })

    it('leaves the tokens of the design system alone', async () => {
      const messages = restricted(await lint(vue('<div class="text-description text-legend text-label text-muted text-dimmed bg-default bg-muted bg-elevated bg-accented border-default border-muted ring-accented divide-default text-primary bg-alert text-white bg-black bg-transparent" />'), 'a.vue'))

      expect(messages).toEqual([])
    })

    it('checks the `b24ui` prop, `<B24Theme>` and the app config, not the `size` slots', async () => {
      const themed = restricted(await lint(vue('<B24Card :b24ui="{ body: \'text-gray-500\' }" /><B24Theme :b24ui="{ card: { body: \'bg-gray-100\' } }" :props="{ card: { b24ui: { root: \'text-gray-900\' } } }" />'), 'a.vue'))
      expect(themed).toEqual([
        expect.stringContaining('`text-description`'),
        expect.stringContaining('`bg-muted`'),
        expect.stringContaining('`text-label`')
      ])

      const appConfig = restricted(await lint('export default defineAppConfig({ b24ui: { button: { slots: { base: \'text-gray-500\', leadingAvatarSize: \'text-gray-500\' } } } })', 'app.config.ts'))
      expect(appConfig).toEqual([expect.stringContaining('`text-description`')])

      const plugin = restricted(await lint('bitrix24UIPluginVite({ b24ui: { prose: { p: { slots: { base: \'text-gray-500\' } } } } })', 'vite.config.ts'))
      expect(plugin).toEqual([expect.stringContaining('`text-description`')])
    })

    it('can be turned off or made an error', async () => {
      const code = vue('<div class="text-gray-500" />')

      const off = await lint(code, 'a.vue', { rules: { 'no-palette-colors': 'off' } })
      expect(restricted(off)).toEqual([])

      const error = await lint(code, 'a.vue', { rules: { 'no-palette-colors': 'error' } })
      expect(error.find(m => m.ruleId === 'better-tailwindcss/no-restricted-classes')?.severity).toBe(2)
    })
  })

  describe('other rules', () => {
    it('warns about conflicting classes', async () => {
      const messages = await lint(vue('<div class="p-2 p-4" />'), 'a.vue')

      expect(messages.map(m => m.ruleId)).toContain('better-tailwindcss/no-conflicting-classes')
    })

    it('does not report unknown classes unless asked, and honours `ignore`', async () => {
      const code = vue('<div class="my-hook" />')

      expect(await lint(code, 'a.vue')).toEqual([])
      expect((await lint(code, 'a.vue', { rules: { 'no-unknown-classes': 'warn' } })).map(m => m.ruleId)).toContain('better-tailwindcss/no-unknown-classes')
      expect(await lint(code, 'a.vue', { rules: { 'no-unknown-classes': 'warn' }, ignore: ['^my-hook$'] })).toEqual([])
    })

    it('leaves the physical inline axis alone until `enforce-logical-properties` is on', async () => {
      const code = vue('<div class="ml-2" />')

      expect(await lint(code, 'a.vue')).toEqual([])
      expect((await lint(code, 'a.vue', { rules: { 'enforce-logical-properties': 'warn' } })).map(m => m.ruleId)).toContain('better-tailwindcss/enforce-logical-properties')
    })
  })

  describe('suggested tokens exist', () => {
    const GRAYS = ['slate', 'gray', 'zinc', 'stone', 'neutral', 'taupe', 'mauve', 'mist', 'olive']
    const HUES = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
    const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
    const UTILITIES = ['text', 'bg', 'border', 'border-t', 'divide', 'ring']

    let suggested: { utility: string, name: string, message: string }[]
    let generic: string[]

    beforeAll(async () => {
      const classes = UTILITIES.flatMap(utility => [
        ...GRAYS.slice(0, 2).flatMap(gray => [`${utility}-${gray}`, ...SHADES.flatMap(shade => [`${utility}-${gray}-${shade}`, `dark:${utility}-${gray}-${shade}`])]),
        ...HUES.map(hue => `${utility}-${hue}-500`)
      ])
      const messages = restricted(await lint(vue(`<div class="${classes.join(' ')}" />`), 'a.vue'))

      suggested = []
      generic = []
      for (const message of messages) {
        for (const [, token] of message.matchAll(/`((?:[a-z]+:)*(?:text|bg|border(?:-[a-z]+)?|divide|ring|from)-[a-z-]+(?:\/\d+)?)`/g)) {
          const [, utility, name] = token!.replace(/^(?:[a-z]+:)*/, '').replace(/\/\d+$/, '').match(/^(text|bg|border(?:-[a-z]+)?|divide|ring|from)-([a-z-]+)$/)!
          suggested.push({ utility: utility!, name: name!, message })
        }
        for (const [, list] of message.matchAll(/brand color \(([^)]*)\)/g)) {
          generic.push(...[...list!.matchAll(/`([a-z-]+)`/g)].map(m => m[1]!).filter(name => !name.includes('-') && !/^(?:text|bg|border)$/.test(name)))
        }
      }
    })

    it('collects something to check', () => {
      expect(suggested.length).toBeGreaterThan(100)
      expect(new Set(suggested.map(s => s.name))).toEqual(new Set(['dimmed', 'muted', 'description', 'legend', 'label', 'default', 'elevated', 'accented', 'alert', 'warning', 'success', 'primary', 'ai']))
    })

    it('every semantic token is declared in the `@theme` of `index.css`', () => {
      const semantic = suggested.filter(s => !brandColors.has(s.name) || s.name in { default: 1, muted: 1, accented: 1 })
      expect(semantic.length).toBeGreaterThan(50)

      for (const { utility, name } of semantic) {
        const namespace = NAMESPACES[utility.replace(/^(border)-.*/, '$1')]
        expect(namespace, `${utility}-${name}`).toBeDefined()
        expect(themeTokens(namespace!), `\`${utility}-${name}\` is not in the @theme of src/runtime/index.css`).toContain(name)
      }
    })

    it('every brand color is declared in `colors.css`', () => {
      for (const name of ['alert', 'warning', 'success', 'primary', 'ai', ...generic]) {
        expect(brandColors, `--color-${name}`).toContain(name)
      }
    })
  })
})
