import { fileURLToPath } from 'node:url'
import { camelCase, kebabCase } from 'scule'
import { genExport } from 'knitwork'
// import colors from 'tailwindcss/colors'
import { addTemplate, addTypeTemplate, hasNuxtModule, logger, getLayerDirectories } from '@nuxt/kit'
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from '@nuxt/schema'
import type { Resolver } from '@nuxt/kit'
import type { ModuleOptions } from './module'
import { applyDefaultVariants, applyPrefixToObject, applyUnstyled } from './utils/theme'
import { COMPONENT_DETECTION_EXTENSIONS, detectUsedComponents } from './utils/components'
import * as theme from './theme'
import * as themeProse from './theme/prose'
import * as themeContent from './theme/content'

// The classes components pass to `usePrefix`, which only adds the prefix at
// runtime, so Tailwind never sees them prefixed
export const prefixedClasses = ['absolute', 'dark:block', 'dark:hidden', 'dark:inline-block', 'focus:outline-none', 'hidden', 'in-[.ui-macos]:hidden', 'in-[.ui-macos]:inline', 'inset-0', 'lg:block', 'lg:flex', 'lg:hidden', 'peer', 'sm:block']

/**
 * Name of the generated CSS template. The registration site and the tests read
 * it from here: upstream nuxt/ui's `ui.css` is not ours, and a second literal
 * spelling of the name is how the two halves of a feature drifted apart before.
 */
export const CSS_TEMPLATE_FILENAME = 'b24ui.css'

/** Source files whose contents can change which components are detected as used. */
export const COMPONENT_DETECTION_WATCH_RE = new RegExp(`\\.(?:${COMPONENT_DETECTION_EXTENSIONS.join('|')})$`)

/**
 * Builds every template this module registers — per-component themes, the
 * generated CSS, and the app-config type declarations.
 *
 * Used to take a `uiConfig` argument that nothing in the body ever read, passed
 * from both call sites. It was not a wiring gap: `app.config.b24ui` reaches the
 * runtime through `#build/app.config` (see plugins/app-config.ts) and is applied
 * by the `tv` wrapper, not by template generation. Dropped rather than wired up,
 * so the signature stops implying an override path that isn't there.
 */
export function getTemplates(options: ModuleOptions, nuxt?: Nuxt, resolve?: Resolver['resolve'], vue?: { detectedComponents?: Set<string> }) {
  const templates: NuxtTemplate[] = []

  let hasProse = false
  let hasContent = false
  let previousDetectedComponents: Set<string> | undefined

  const isDev = process.argv.includes('--uiDev')

  function writeThemeTemplate(theme: Record<string, any>, path?: string) {
    for (const component in theme) {
      templates.push({
        filename: `b24ui/${path ? path + '/' : ''}${kebabCase(component)}.ts`,
        write: true,
        // Built from the module options alone, so Nuxt can skip it when a file is edited
        dependsOn: [],
        getContents: async () => {
          const template = (theme as any)[component]
          let result = typeof template === 'function' ? template(options) : template

          // With `experimental.componentDetection` (Vue integration), a component
          // detection didn't find keeps its theme file — the `#build/b24ui` aliases
          // and type imports rely on it existing — but with every class blanked
          // (like `theme.unstyled`), so the `@source "./b24ui";` scan yields no CSS
          // for it. Prose has no detection and stays styled.
          const unused = path !== 'prose' && !!vue?.detectedComponents?.size
            && !Array.from(vue.detectedComponents).some(detected => camelCase(detected) === component)

          // Override default variants from nuxt.config.ts
          result = applyDefaultVariants(result, options.theme?.defaultVariants)
          // Strip default theme classes if `unstyled` is enabled
          result = applyUnstyled(result, options.theme?.unstyled || unused)
          // Apply Tailwind prefix if configured
          result = applyPrefixToObject(result, options.theme?.prefix)

          const variants = Object.entries(result.variants || {})
            .filter(([_, values]) => {
              const keys = Object.keys(values as Record<string, unknown>)
              return keys.some(key => key !== 'true' && key !== 'false')
            })
            .map(([key]) => key)

          let json = JSON.stringify(result, null, 2)

          for (const variant of variants) {
            json = json.replace(new RegExp(`("${variant}": "[^"]+")`, 'g'), `$1 as typeof ${variant}[number]`)
            json = json.replace(new RegExp(`("${variant}": \\[\\s*)((?:"[^"]+",?\\s*)+)(\\])`, 'g'), (_, before, match, after) => {
              const replaced = match.replace(/("[^"]+")/g, `$1 as typeof ${variant}[number]`)
              return `${before}${replaced}${after}`
            })
          }

          function generateVariantDeclarations(variants: string[]) {
            return variants.filter(variant => json.includes(`as typeof ${variant}`)).map((variant) => {
              const keys = Object.keys(result.variants[variant])
              return `const ${variant} = ${JSON.stringify(keys, null, 2)} as const`
            })
          }

          // For local development, import directly from theme
          if (isDev) {
            const templatePath = fileURLToPath(new URL(`./theme/${path ? `${path}/` : ''}${kebabCase(component)}`, import.meta.url))
            const themeUtilsPath = fileURLToPath(new URL('./utils/theme', import.meta.url))
            const defaultVariantsJson = JSON.stringify(options.theme?.defaultVariants) ?? 'undefined'
            const prefixJson = 'undefined'
            const unstyledJson = JSON.stringify(options.theme?.unstyled || unused) ?? 'undefined'

            return [
              `import template from ${JSON.stringify(templatePath)}`,
              `import { applyDefaultVariants, applyPrefixToObject, applyUnstyled } from ${JSON.stringify(themeUtilsPath)}`,
              ...generateVariantDeclarations(variants),
              `const options = ${JSON.stringify(options, null, 2)}`,
              `let result = typeof template === 'function' ? (template as Function)(options) : template`,
              `result = applyDefaultVariants(result, ${defaultVariantsJson})`,
              `result = applyUnstyled(result, ${unstyledJson})`,
              `result = applyPrefixToObject(result, ${prefixJson})`,
              `const theme = ${json}`,
              `export default result as typeof theme`
            ].join('\n\n')
          }

          // For production build
          return [
            ...generateVariantDeclarations(variants),
            `export default ${json}`
          ].join('\n\n')
        }
      })
    }
  }

  if (options.prose !== false && (options.prose || options.mdc || options.content || (!!nuxt && (hasNuxtModule('@nuxtjs/mdc') || hasNuxtModule('@nuxt/content'))))) {
    hasProse = true

    const path = 'prose'

    writeThemeTemplate(themeProse, path)

    templates.push({
      filename: `b24ui/${path}/index.ts`,
      write: true,
      dependsOn: [],
      getContents: () => Object.keys(themeProse).map(component => `export { default as ${component} } from './${kebabCase(component)}'`).join('\n')
    })
  }

  if (options.content || (!!nuxt && hasNuxtModule('@nuxt/content'))) {
    hasContent = true

    writeThemeTemplate(themeContent, 'content')
  }

  writeThemeTemplate(theme)

  async function generateSources() {
    const sources: string[] = []

    // Layer + inline sources are Nuxt-only; the Vue integration relies on the
    // user's own Vite/Tailwind setup to scan their source.
    const layers = nuxt ? getLayerDirectories(nuxt).map(layer => layer.app) : []

    if (nuxt) {
      // Add layer sources
      for (const layer of layers) {
        sources.push(`@source "${layer}**/*";`)
      }

      // Add inline sources from Nuxt config (classes defined in config)
      const inlineConfigs = [
        nuxt.options.app?.rootAttrs?.class,
        nuxt.options.app?.head?.htmlAttrs?.class,
        nuxt.options.app?.head?.bodyAttrs?.class
      ]

      for (const value of inlineConfigs) {
        if (value && typeof value === 'string') {
          sources.push(`@source inline(${JSON.stringify(value)});`)
        }
      }
    }

    const prefix = options.theme?.prefix
    if (prefix) {
      sources.push(`@source inline(${JSON.stringify(prefixedClasses.map(cls => `${prefix}:${cls}`).join(' '))});`)
    }

    // Add theme sources. With `experimental.componentDetection`, Nuxt narrows
    // these to the detected components' files. The Vue plugin can't: its
    // templates live inside `node_modules`, where Tailwind widens a file
    // `@source` to a scan of its whole parent directory, so a narrowed list
    // wouldn't narrow the CSS. It sources the whole directory instead and
    // blanks the theme of unused components at write time (see
    // `writeThemeTemplate`), which needs no extra directive.
    const componentDir = resolve ? resolve('./runtime/components') : undefined

    if (options.experimental?.componentDetection && nuxt && componentDir && layers.length) {
      const detectedComponents = await detectUsedComponents(
        layers,
        'B24',
        componentDir,
        Array.isArray(options.experimental.componentDetection) ? options.experimental.componentDetection : undefined
      )

      if (detectedComponents && detectedComponents.size > 0) {
        if (previousDetectedComponents) {
          const newComponents = Array.from(detectedComponents).filter(
            component => !previousDetectedComponents!.has(component)
          )
          if (newComponents.length > 0) {
            logger.success(`Bitrix24 UI detected new components: ${newComponents.join(', ')}`)
          }
        } else {
          logger.success(`Bitrix24 UI detected ${detectedComponents.size} components in use (including dependencies)`)
        }

        previousDetectedComponents = detectedComponents

        if (hasProse) {
          sources.push('@source "./b24ui/prose";')
        }

        for (const component of detectedComponents) {
          const kebabComponent = kebabCase(component)
          const camelComponent = camelCase(component)

          if (hasContent && (themeContent as any)[camelComponent]) {
            sources.push(`@source "./b24ui/content/${kebabComponent}.ts";`)
          } else if ((theme as any)[camelComponent]) {
            sources.push(`@source "./b24ui/${kebabComponent}.ts";`)
          }
        }
      } else {
        if (!previousDetectedComponents || previousDetectedComponents.size > 0) {
          logger.info('Bitrix24 UI detected no components in use, including all components')
        }
        previousDetectedComponents = new Set()

        sources.push('@source "./b24ui";')
      }
    } else {
      sources.push('@source "./b24ui";')
    }

    return sources.join('\n')
  }

  const themeBlocks = `@theme static {}

@theme default inline {}
`

  /**
   * use to generate tw colors
   * in `index.css` add `@import '#build/b24ui.css';`
   * @memo This for compatibility only
   */
  templates.push({
    filename: CSS_TEMPLATE_FILENAME,
    write: true,
    // With component detection, the sources depend on the contents of the layer files
    // `detectUsedComponents` scans. Otherwise only on options and which layers exist.
    dependsOn: options.experimental?.componentDetection && nuxt
      ? ({ path }) => COMPONENT_DETECTION_WATCH_RE.test(path) && getLayerDirectories(nuxt).some(layer => path.startsWith(layer.app))
      : [],
    getContents: async () => {
      const sources = await generateSources()
      const prefix = options.theme?.prefix ? `${options.theme.prefix}:` : ''

      /**
       * @memo we remove `${prefix}text-legend`
       */
      return `${sources}

@layer base {
  body {
    scrollbar-gutter: stable;
    background: var(--air-theme-background);
    @apply ${prefix}antialiased ${prefix}font-(family-name:--ui-font-family-system) ${prefix}scheme-light ${prefix}dark:scheme-dark ${prefix}edge-light:scheme-light ${prefix}edge-dark:scheme-light;
  }

  /* @deprecate This rule is deprecated and will be removed in version 3.0.0 */
  .sidebar-layout.--inner,
  .air-custom-bg {
    background: var(--air-theme-background);
  }
}

${themeBlocks}`
    }
  })

  // Static fallback shipped in the published npm package and exposed via
  // `package.json` `imports` so tooling that resolves `#build/b24ui.css` through
  // Node module resolution (Prettier, Tailwind IntelliSense) has something to
  // read. Strips `@source` directives (paths don't exist on consumer machines)
  // and the body rule (the runtime template handles it with the user's prefix,
  // avoiding an unprefixed `@apply` that breaks tooling when `theme.prefix` is set).
  templates.push({
    filename: 'b24ui.static.css',
    write: true,
    dependsOn: [],
    getContents: () => themeBlocks
  })

  templates.push({
    filename: 'b24ui/index.ts',
    write: true,
    dependsOn: [],
    getContents: () => [
      ...Object.keys(theme).map(component => `export { default as ${component} } from './${kebabCase(component)}'`),
      ...(hasContent ? Object.keys(themeContent).map(component => `export { default as ${component} } from './content/${kebabCase(component)}'`) : []),
      ...(hasProse ? [`export * as prose from './prose'`] : [])
    ].join('\n')
  })

  // FIXME: `typeof colors[number]` should include all colors from the theme
  templates.push({
    filename: 'types/b24ui.d.ts',
    dependsOn: [],
    getContents: () => {
      return `import * as b24ui from '#build/b24ui'
import type { TVConfig, DeepRequired } from '#b24ui/types'
import type { defaultConfig } from 'tailwind-variants'

type AppConfigUI = {
  prefix?: string
  tv?: typeof defaultConfig
} & TVConfig<typeof b24ui>

type AppConfigRuntimeUI = DeepRequired<Pick<AppConfigUI, 'tv'>> & Pick<AppConfigUI, 'prefix'> & typeof b24ui

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /**
     * Bitrix24 UI theme configuration
     * @see https://bitrix24.github.io/b24ui/docs/getting-started/theme/components/
     */
    b24ui?: AppConfigUI
  }
  interface CustomAppConfig {
    b24ui: AppConfigRuntimeUI
  }
}

export {}
`
    }
  })

  templates.push({
    filename: 'b24ui-image-component.ts',
    write: true,
    // `app.components` only changes when a file is added or removed
    dependsOn: [],
    getContents: ({ app }) => {
      const image = app?.components?.find(c => c.pascalName === 'NuxtImg' && !/nuxt(?:-nightly)?\/dist\/app/.test(c.filePath))

      return [
        image ? genExport(image.filePath, [{ name: image.export, as: 'default' }]) : 'export default "img"',
        // an import, not a re-export: the imports plugin only rewrites `import ... from '#imports'`,
        // a re-export would bundle every side-effectful module behind `#imports`
        !!nuxt && hasNuxtModule('@nuxt/image', nuxt) ? `import { useImage } from '#imports'\nexport { useImage }` : 'export const useImage = undefined as undefined | (() => { options: { provider?: string } })'
      ].join('\n')
    }
  })

  return templates
}

export function addTemplates(options: ModuleOptions, nuxt: Nuxt, resolve: Resolver['resolve']) {
  const templates = getTemplates(options, nuxt, resolve)
  for (const template of templates) {
    if (template.filename!.endsWith('.d.ts')) {
      addTypeTemplate(template as NuxtTypeTemplate)
    } else {
      addTemplate(template)
    }
  }

  nuxt.hook('prepare:types', ({ references }) => {
    references.push({ path: resolve('./runtime/types/app.config.d.ts') })
  })
}
