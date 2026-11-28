import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { globSync } from 'tinyglobby'
import { describe, it, expect } from 'vitest'
import { createHooks } from 'hookable'
import { nuxtCtx, runWithNuxtContext } from '@nuxt/kit'
import type { Nuxt, NuxtTemplate } from '@nuxt/schema'
import type { ModuleOptions } from '../../src/module'
import { CSS_TEMPLATE_FILENAME, addTemplates, getTemplates, prefixedClasses } from '../../src/templates'
import { COMPONENT_DETECTION_EXTENSIONS } from '../../src/utils/components'

describe('getTemplates', () => {
  const options = {} as ModuleOptions

  it('registers the css template under the shared filename constant', () => {
    const filenames = getTemplates(options).map(template => template.filename)

    expect(filenames).toContain(CSS_TEMPLATE_FILENAME)
  })

  it('writes that template to disk, which is what makes it importable as `#build/b24ui.css`', () => {
    const cssTemplate = getTemplates(options).find(template => template.filename === CSS_TEMPLATE_FILENAME)

    expect(cssTemplate?.write).toBe(true)
  })

  it('skips prose themes with `prose: false`', () => {
    const hasProse = (overrides: Partial<ModuleOptions>) => {
      return getTemplates({ ...overrides } as ModuleOptions).some(template => template.filename === 'b24ui/prose/index.ts')
    }

    expect(hasProse({ content: true })).toBe(true)
    expect(hasProse({ content: true, prose: false })).toBe(false)
  })
})

function createNuxt(): Nuxt {
  const hooks = createHooks()
  return {
    hooks,
    hook: hooks.hook,
    callHook: hooks.callHook,
    options: {
      dev: true,
      rootDir: '/app',
      srcDir: '/app/app',
      buildDir: '/app/.nuxt',
      alias: {},
      appConfig: {},
      app: {},
      modules: [],
      _installedModules: [],
      _layers: [{ cwd: '/app', config: { rootDir: '/app', srcDir: '/app/app' } }],
      build: { templates: [] },
      vite: {}
    }
  } as unknown as Nuxt
}

// The templates Nuxt recompiles when an existing file is saved, following the `dependsOn`
// contract: a template that declares nothing is always recompiled.
function recompiledOn(templates: NuxtTemplate[], nuxt: Nuxt, path: string) {
  return templates.filter(({ dependsOn, options }) => {
    if (typeof dependsOn === 'function') {
      return dependsOn({ event: 'change', path }, { nuxt, app: {} as any, options: options ?? {} })
    }
    return !dependsOn || dependsOn.length > 0
  }).map(template => template.filename)
}

/**
 * The `experimental.componentDetection` CSS template used to be refreshed by a
 * `builder:watch` hook filtering `updateTemplates` on a filename — spelled
 * `b24ui.css` where the template was registered and `ui.css` in the watcher, so
 * the refresh silently matched nothing. Nuxt now asks each template whether a
 * change concerns it (`dependsOn`), so the filename is declared once, on the
 * template itself. The cases below run the predicate Nuxt really calls against
 * the templates the module really registers.
 */
describe('regeneration on file changes', () => {
  it('recompiles no template without component detection', () => {
    const nuxt = createNuxt()
    const templates = runWithNuxtContext(nuxt, () => getTemplates({} as ModuleOptions, nuxt, () => '/b24ui/runtime/components'))

    expect(recompiledOn(templates, nuxt, '/app/app/pages/index.vue')).toEqual([])
  })

  it(`recompiles only \`${CSS_TEMPLATE_FILENAME}\` when a scanned file changes with component detection`, () => {
    const nuxt = createNuxt()
    const templates = runWithNuxtContext(nuxt, () => getTemplates({ experimental: { componentDetection: true } } as ModuleOptions, nuxt, () => '/b24ui/runtime/components'))

    expect(recompiledOn(templates, nuxt, '/app/app/pages/index.vue')).toEqual([CSS_TEMPLATE_FILENAME])
    expect(recompiledOn(templates, nuxt, '/app/app/composables/useThing.ts')).toEqual([CSS_TEMPLATE_FILENAME])
    expect(recompiledOn(templates, nuxt, '/app/server/api/thing.ts')).toEqual([])
    expect(recompiledOn(templates, nuxt, '/app/app/assets/main.css')).toEqual([])
  })

  it('reacts to every source extension component detection scans', () => {
    const nuxt = createNuxt()
    const templates = runWithNuxtContext(nuxt, () => getTemplates({ experimental: { componentDetection: true } } as ModuleOptions, nuxt, () => '/b24ui/runtime/components'))

    // Driven off the shared list rather than a literal: the dependency and the
    // scan glob are two halves of one decision, and an extension added to one
    // and not the other means a file that changes the answer never triggers a
    // refresh — no error, no signal.
    expect(COMPONENT_DETECTION_EXTENSIONS.length).toBeGreaterThan(4)

    for (const extension of COMPONENT_DETECTION_EXTENSIONS) {
      expect(recompiledOn(templates, nuxt, `/app/app/a.${extension}`)).toEqual([CSS_TEMPLATE_FILENAME])
    }
  })

  it('leaves regeneration to Nuxt when a file changes', async () => {
    const nuxt = createNuxt()
    const requests: unknown[] = []
    nuxt.hook('builder:generateApp', options => void requests.push(options))
    nuxtCtx.set(nuxt)
    try {
      addTemplates({ experimental: { componentDetection: true } } as ModuleOptions, nuxt, () => '/b24ui/runtime/components')
      await nuxt.callHook('builder:watch', 'change', 'pages/index.vue')
    } finally {
      nuxtCtx.unset()
    }

    expect(requests).toEqual([])
  })

  it('shares that list with the scan glob instead of repeating it', () => {
    // If the glob went back to a literal the two could drift apart again with
    // every test above still green.
    const source = readFileSync(resolve(process.cwd(), 'src/utils/components.ts'), 'utf-8')

    expect(source).toMatch(/globSync\(\[`\*\*\/\*\.\{\$\{COMPONENT_DETECTION_EXTENSIONS\.join\(','\)\}\}`\]/)
  })
})

describe('prefixedClasses', () => {
  it('lists every class components pass to `usePrefix`', () => {
    const componentDir = join(process.cwd(), 'src/runtime/components')
    const classes = new Set<string>()
    for (const file of globSync('**/*.vue', { cwd: componentDir })) {
      for (const [, value] of readFileSync(join(componentDir, file), 'utf8').matchAll(/\bprefix\(\s*'([^']+)'\s*\)/g)) {
        value!.split(/\s+/).filter(Boolean).forEach(cls => classes.add(cls))
      }
    }

    expect([...classes].sort()).toEqual(prefixedClasses)
  })

  it(`adds them to \`${CSS_TEMPLATE_FILENAME}\` with \`theme.prefix\``, async () => {
    const cssTemplate = getTemplates({ theme: { prefix: 'tw' } } as ModuleOptions).find(template => template.filename === CSS_TEMPLATE_FILENAME)

    expect(await cssTemplate!.getContents!({} as any)).toContain(`@source inline("${prefixedClasses.map(cls => `tw:${cls}`).join(' ')}");`)
  })

  it('adds nothing without `theme.prefix`', async () => {
    const cssTemplate = getTemplates({} as ModuleOptions).find(template => template.filename === CSS_TEMPLATE_FILENAME)

    expect(await cssTemplate!.getContents!({} as any)).not.toContain(':peer')
  })
})
