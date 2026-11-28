import { readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { join } from 'pathe'
import type { HookResult, ModuleDependencies } from '@nuxt/schema'
import type { ColorModeType, ColorModeTypeLight } from './runtime/types'
import { defu } from 'defu'
import { createResolver, defineNuxtModule, addComponentsDir, addImports, addImportsDir, addPlugin, addPluginTemplate, findPath, hasNuxtModule, logger, resolvePath, tryResolveModule, directoryToURL } from '@nuxt/kit'
import type { Bitrix24UIESLintOptions } from './utils/eslint'
import { addTemplates } from './templates'
import { publicComposables } from './imports'
// @memo skep:  resolveColors
import { defaultOptions, getDefaultConfig } from './utils/defaults'
import { generateI18nPlugin, getLocaleTags } from './utils/locales'
import type { I18nLocale } from './utils/locales'
import { name, version } from '../package.json'

export type * from './runtime/types'

type Color = 'air-primary' | 'air-secondary' | 'air-tertiary' | 'air-primary-success' | 'air-primary-warning' | 'air-primary-alert' | 'air-primary-copilot' | 'air-secondary-accent' | 'air-secondary-accent-1' | (string & {})
type Size = 'xss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {})

export interface ModuleOptions {
  /**
   * Enable or disable `@vueuse/core` color-mode module
   * @memo We not use `@nuxtjs/color-mode`
   * @defaultValue `true`
   * @link https://bitrix24.github.io/b24ui/docs/getting-started/installation/nuxt/#colormode
   */
  colorMode?: boolean
  colorModeInitialValue?: ColorModeType
  colorModeTypeLight?: ColorModeTypeLight
  /**
   * Key to persist the data into localStorage/sessionStorage.
   * Pass `null` to disable persistence
   * @defaultValue 'vueuse-color-scheme'
   */
  colorModeStorageKey?: string | null
  /**
   * Version reported through `appConfig.version` and rendered into the
   * `<meta name="b24ui">` tag.
   * @defaultValue the installed `@bxshefby/b24ui-nuxt` version
   */
  version?: string
  /**
   * Customize how the theme is generated
   * @see https://bitrix24.github.io/b24ui/docs/getting-started/theme/design-system/
   */
  theme?: {
    /**
     * Remove all default theme classes from components, keeping only their
     * structure and the classes you supply via `class`, `b24ui` or `app.config.b24ui`.
     * @defaultValue `false`
     * @see https://bitrix24.github.io/b24ui/docs/getting-started/installation/nuxt/#themeunstyled
     */
    unstyled?: boolean

    /**
     * The default variants to use for components
     * @see https://bitrix24.github.io/b24ui/docs/getting-started/installation/nuxt/#themedefaultvariants
     */
    defaultVariants?: {
      /**
       * The default color variant to use for components
       * @defaultValue `'primary'`
       */
      color?: Color

      /**
       * The default size variant to use for components
       * @defaultValue `'md'`
       */
      size?: Size
    }

    /**
     * Prefix for Tailwind CSS utility classes
     * @see https://bitrix24.github.io/b24ui/docs/getting-started/installation/nuxt/#themeprefix
     * @example 'tw'
     */
    prefix?: string
  }

  /**
   * Force the import of prose components even if `@nuxtjs/mdc` or `@nuxt/content` are not installed
   * Set to `false` to skip them even when one of these modules is installed
   * @defaultValue true
   * @see https://bitrix24.github.io/b24ui/docs/getting-started/installation/nuxt/#prose
   */
  prose?: boolean

  /**
   * @deprecated Use `prose` instead
   * @see https://bitrix24.github.io/b24ui/docs/getting-started/installation/nuxt/#mdc
   */
  mdc?: boolean

  /**
   * Force the import of content & prose components (unless `prose` is `false`) even if `@nuxt/content` is not installed
   * @defaultValue false
   * @see https://bitrix24.github.io/b24ui/docs/getting-started/installation/nuxt/#content
   */
  content?: boolean

  /**
   * Add the `@bxshefby/b24ui-nuxt/eslint` config to the one `@nuxt/eslint` generates, with
   * your stylesheet as its entry point. Needs `@nuxt/eslint` and `eslint-plugin-better-tailwindcss`.
   * @defaultValue false
   * @see https://bitrix24.github.io/b24ui/docs/getting-started/integrations/eslint/nuxt/
   */
  eslint?: boolean | Partial<Bitrix24UIESLintOptions>

  /**
   * Experimental features
   */
  experimental?: {
    /**
     * Enable automatic component detection for tree-shaking
     * Only generates theme files for components actually used in your app
     * - `true`: Enable automatic detection
     * - `string[]`: Enable detection and include additional components (useful for dynamic components)
     * @defaultValue false
     * @example true
     * @example ['Modal', 'DropdownMenu']
     */
    componentDetection?: boolean | string[]
  }
}

/**
 * Whether the nearest `eslint.config` in these directories, the one ESLint uses, already registers `eslint-plugin-better-tailwindcss`.
 */
async function hasOwnESLintSetup(dirs: string[]) {
  for (const dir of new Set(dirs)) {
    const path = await findPath(join(dir, 'eslint.config'), { extensions: ['.js', '.mjs', '.cjs', '.ts', '.mts', '.cts'] })
    if (path) {
      // An import of the plugin or one of its entries, left out when commented
      const code = (await readFile(path, 'utf-8')).replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, '')
      return /["']eslint-plugin-better-tailwindcss(?:\/[^"']*)?["']/.test(code)
    }
  }
  return false
}

declare module '#app' {
  interface RuntimeNuxtHooks {
    'dashboard:search:toggle': () => HookResult
    'dashboard:sidebar:toggle': () => HookResult
    'dashboard:sidebar:collapse': (value: boolean) => HookResult
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    docs: 'https://bitrix24.github.io/b24ui/docs/getting-started/installation/nuxt/',
    configKey: 'b24ui',
    compatibility: {
      nuxt: '>=4.1.0'
    }
  },
  defaults: defaultOptions,
  moduleDependencies(nuxt): ModuleDependencies {
    const userUiOptions = nuxt.options.b24ui || {}
    return {
      '@bitrix24/b24icons-nuxt': {
        defaults: {}
      },
      '@nuxtjs/mdc': {
        optional: !userUiOptions.mdc,
        defaults: {
          highlight: {
            theme: {
              light: 'material-theme-lighter',
              default: 'material-theme',
              dark: 'material-theme-palenight'
            }
          },
          ...userUiOptions.prose !== false && {
            components: {
              map: {
                'accordion': 'ProseAccordion',
                'accordion-item': 'ProseAccordionItem',
                'badge': 'ProseBadge',
                'callout': 'ProseCallout',
                'card': 'ProseCard',
                'card-group': 'ProseCardGroup',
                'caution': 'ProseCaution',
                'code-collapse': 'ProseCodeCollapse',
                'code-group': 'ProseCodeGroup',
                'code-icon': 'ProseCodeIcon',
                'code-preview': 'ProseCodePreview',
                // @todo add
                // 'code-tree': 'ProseCodeTree',
                'collapsible': 'ProseCollapsible',
                'field': 'ProseField',
                'field-group': 'ProseFieldGroup',
                // 'icon': 'ProseIcon',
                'kbd': 'ProseKbd',
                'note': 'ProseNote',
                'prompt': 'ProsePrompt',
                'steps': 'ProseSteps',
                'tabs': 'ProseTabs',
                'tabs-item': 'ProseTabsItem',
                'tip': 'ProseTip',
                'warning': 'ProseWarning'
              }
            }
          }
        }
      }
    }
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    options.theme = options.theme || {}
    // options.theme.colors = resolveColors(options.theme.colors)

    nuxt.options.b24ui = options

    nuxt.options.alias['#b24ui'] = resolve('./runtime')

    // `defaults` already carries `version`, so defu guarantees this at runtime —
    // but `ModuleOptions.version` is optional, so the fallback is what keeps
    // `appConfig.version` typed as `string` rather than `string | undefined`.
    nuxt.options.appConfig.version = options.version ?? version
    nuxt.options.appConfig.b24ui = defu(nuxt.options.appConfig.b24ui || {}, getDefaultConfig(options.theme)) as typeof nuxt.options.appConfig.b24ui

    nuxt.options.build.transpile.push('reka-ui')

    // Isolate root node from portaled components
    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {}
    nuxt.options.app.rootAttrs.class = [nuxt.options.app.rootAttrs.class, `${options.theme?.prefix ? options.theme.prefix + ':' : ''}isolate`].filter(Boolean).join(' ')

    nuxt.hook('vite:extend', async ({ config }) => {
      const plugin = await import('@tailwindcss/vite').then(r => r.default)
      config.plugins ||= []
      config.plugins.push(plugin())
    })
    if (nuxt.options.builder !== '@nuxt/vite-builder') {
      nuxt.options.postcss.plugins['@tailwindcss/postcss'] = {}
    }

    addPlugin({ src: resolve('./runtime/plugins/colors') })
    addPlugin({ src: resolve('./runtime/plugins/ui-version') })
    addPlugin({ src: resolve('./runtime/plugins/platform') })

    if (hasNuxtModule('@nuxtjs/i18n')) {
      addPluginTemplate({
        filename: 'b24ui-i18n.mjs',
        dependsOn: [],
        getContents: () => {
          // Resolved by `@nuxtjs/i18n`, including layers
          const { locales } = (nuxt.options.runtimeConfig.public.i18n || {}) as { locales?: I18nLocale[] }

          return generateI18nPlugin(Array.isArray(locales) ? locales : [], getLocaleTags(resolve('./runtime/locale')), resolve('./runtime'))
        }
      })
    }

    if (options.prose !== false && (options.prose || options.mdc || options.content || hasNuxtModule('@nuxtjs/mdc') || hasNuxtModule('@nuxt/content'))) {
      addComponentsDir({
        path: resolve('./runtime/components/prose'),
        pathPrefix: false,
        prefix: 'Prose',
        // Skip the `index` barrel
        extensions: ['vue'],
        global: true
      })
    }

    if (options.content || hasNuxtModule('@nuxt/content')) {
      addComponentsDir({
        path: resolve('./runtime/components/content'),
        pathPrefix: false,
        prefix: 'B24'
      })
    }

    if (options.colorMode || hasNuxtModule('@nuxtjs/color-mode')) {
      addComponentsDir({
        path: resolve('./runtime/components/color-mode'),
        pathPrefix: false,
        prefix: 'B24'
      })
    }
    // @memo: import all time
    // Stub `useColorMode` composable used in `DashboardSearch` and `ContentSearch` components
    addImportsDir(resolve('./runtime/composables/color-mode'))

    addComponentsDir({
      path: resolve('./runtime/components'),
      pathPrefix: false,
      prefix: 'B24',
      ignore: ['color-mode/**', 'content/**', 'prose/**']
    })

    addImports(
      Object.entries(publicComposables).flatMap(([file, exports]) =>
        exports.map(name => ({ name, from: resolve(`./runtime/composables/${file}`) }))
      )
    )

    if (options.eslint) {
      const eslintOptions = typeof options.eslint === 'object' ? options.eslint : {}
      if (!hasNuxtModule('@nuxt/eslint') || !await tryResolveModule('eslint-plugin-better-tailwindcss', directoryToURL(nuxt.options.rootDir))) {
        logger.warn('Bitrix24 UI `eslint` needs the `@nuxt/eslint` module and `eslint-plugin-better-tailwindcss`.')
      } else if (await hasOwnESLintSetup([nuxt.options.rootDir, nuxt.options.workspaceDir])) {
        // A second instance of the plugin makes ESLint fail, so leave the app's config alone
        logger.warn('Bitrix24 UI `eslint` is skipped: your `eslint.config` already registers `eslint-plugin-better-tailwindcss`, remove it to use this config.')
      } else {
        // The stylesheet listed in `css` that imports Tailwind CSS, not the one it may delegate to
        let entryPoint = eslintOptions.entryPoint && await resolvePath(eslintOptions.entryPoint)
        for (const entry of entryPoint ? [] : nuxt.options.css) {
          const path = typeof entry === 'string' && await resolvePath(entry)
          if (path && /@import\s+["']tailwindcss["']/.test(await readFile(path, 'utf-8').catch(() => ''))) {
            entryPoint = path
            break
          }
        }
        if (!entryPoint) {
          logger.warn('Bitrix24 UI `eslint` needs a stylesheet in `css` that imports Tailwind CSS.')
        } else {
          // Through the package export, `./eslint.mjs` next to `src/module.ts` doesn't exist when the module is stubbed
          const config = await tryResolveModule(`${name}/eslint`, import.meta.url) ?? resolve('./eslint.mjs')
          // Node ESM requires a file URL for Windows drive paths. The generator uses single-quoted imports.
          const from = pathToFileURL(config).href.replaceAll('\'', '%27')
          // Declared by `@nuxt/eslint`, called again on `builder:generateApp` so the order of the modules doesn't matter
          nuxt.hook('eslint:config:addons' as any, (addons: { name: string, getConfigs: () => unknown }[]) => {
            addons.push({
              name: 'b24ui',
              getConfigs: () => ({
                imports: [{ from, name: 'default', as: 'b24ui' }],
                configs: [`...b24ui(${JSON.stringify({ ...eslintOptions, entryPoint })})`]
              })
            })
          })
        }
      }
    }

    addTemplates(options, nuxt, resolve)
  }
})
