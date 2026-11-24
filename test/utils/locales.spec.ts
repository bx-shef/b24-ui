import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { generateI18nPlugin, getLocaleTags, resolveLocaleKey } from '../../src/utils/locales'

const tags = getLocaleTags(resolve(process.cwd(), 'src/runtime/locale'))

describe('i18n plugin', () => {
  it('reads the declared tag of every locale file', () => {
    expect(tags).toMatchObject({ br: 'pt-BR', en: 'en', kz: 'kk', la: 'es', sc: 'zh-CN', tc: 'zh-TW', ua: 'uk', vn: 'vi' })
  })

  it.each([
    ['fr', 'fr'],
    ['pt-BR', 'br'],
    ['pt', 'br'],
    ['en-US', 'en'],
    ['es-MX', 'la'],
    ['uk', 'ua'],
    ['kk', 'kz'],
    ['vi', 'vn'],
    ['hi', 'in'],
    [{ code: 'en', language: 'en-GB' }, 'en'],
    [{ code: 'zh-Hant', language: 'zh-TW' }, 'tc'],
    [{ code: 'cn', language: 'zh-CN' }, 'sc'],
    ['zh-Hant-TW', 'tc'],
    ['zh-Hans-CN', 'sc'],
    [{ code: 'pt', language: 'pt-Latn-BR' }, 'br'],
    [{ code: 'pt-BR', language: 'pt-Latn' }, 'br'],
    // b24ui's short codes are not language tags: `la` is Latin, `in` is not Hindi
    ['la', undefined],
    ['zh', undefined],
    ['zh-Hant', undefined],
    ['xx', undefined]
  ])('resolves %j to %s', (locale, key) => {
    expect(resolveLocaleKey(locale, tags)).toBe(key)
  })

  it('lazy loads only the configured locales', () => {
    const contents = generateI18nPlugin(['en', { code: 'fr' }, { code: 'pt-BR', language: 'pt-BR' }, 'en-US', 'xx'], tags, '/runtime')

    expect(contents).toMatchInlineSnapshot(`
      "import { computed, shallowReactive, unref, watch } from "vue";
      import { defineNuxtPlugin } from "#app/nuxt";
      import { localeContextInjectionKey } from "/runtime/composables/useLocale";
      import en from "/runtime/locale/en";
      const locales = {
        en: "en",
        fr: "fr",
        "pt-BR": "br",
        "en-US": "en"
      }
      const loaders = {
        fr: () => import("/runtime/locale/fr"),
        br: () => import("/runtime/locale/br")
      }
      export default defineNuxtPlugin(async (nuxtApp) => {
        const loaded = shallowReactive({ en })
        const load = async (code) => {
          const key = locales[code]
          if (key && !loaded[key]) {
            loaded[key] = await loaders[key]().then(r => r.default).catch(() => undefined)
          }
        }
        // Load the next locale before \`@nuxtjs/i18n\` switches to it
        nuxtApp.hook('i18n:beforeLocaleSwitch', ({ newLocale }) => load(newLocale))
        // A later \`i18n:beforeLocaleSwitch\` hook can still redirect to another locale
        nuxtApp.hook('i18n:localeSwitched', ({ newLocale }) => load(newLocale))
        if (import.meta.client) {
          // A locale set without the hook, or changed by a later one
          nuxtApp.hook('app:created', () => watch(() => unref(nuxtApp.$i18n?.locale), load, { immediate: true }))
        }
        nuxtApp.vueApp.provide(localeContextInjectionKey, computed(() => loaded[locales[unref(nuxtApp.$i18n?.locale)]]))
        await load(unref(nuxtApp.$i18n?.locale))
      })"
    `)
  })
})
