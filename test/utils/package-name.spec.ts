import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { glob } from 'tinyglobby'

/**
 * This fork publishes as `@bxshefby/b24ui-nuxt`; `@bitrix24/b24ui-nuxt` belongs
 * to the bitrix24 organisation on npm and is the parent's package. Every place
 * a reader copies an install command or an import from has to carry the
 * published name, or the reader installs the parent's package and gets the
 * parent's behaviour.
 *
 * The old name comes back through ports: upstream docs, examples and skill
 * texts name the package in their own spelling, and `.sync/PORTING.md` asks the
 * porter to rewrite it. This scan is what holds that rule.
 *
 * Allowed on purpose:
 *  - the migration chapter, which is about the old name;
 *  - `CHANGELOG.md` and `.sync/` — history, not instructions;
 *  - `src/`, where the old name is accepted as an alias spelling
 *    (`src/utils/package-names.ts`) and is not shown to readers.
 */

const root = process.cwd()
const OLD_NAME = '@bitrix24/b24ui-nuxt'

const ALLOWED = new Set([
  'docs/content/docs/1.getting-started/3.package.md'
])

const SCANNED = [
  'README.md',
  'SECURITY.md',
  'docs/content/**/*',
  'docs/app/**/*',
  'docs/server/**/*',
  'docs/nuxt.config.ts',
  'docs/package.json',
  'skills/**/*',
  'playgrounds/*/package.json',
  'playgrounds/*/app/**/*',
  'playgrounds/*/src/**/*',
  'playgrounds/*/*.config.ts',
  'cli/**/*',
  'test/smoke/fixture/**/*'
]

const files = await glob(SCANNED, {
  cwd: root,
  ignore: ['**/node_modules/**', '**/.nuxt/**', '**/.output/**', '**/dist/**']
})

describe('package name', () => {
  it('scans a non-trivial set of files', () => {
    // A glob that silently matches nothing would make the check below vacuous.
    expect(files.length).toBeGreaterThan(300)
    expect(files).toContain('README.md')
    expect(files.some(f => f.startsWith('skills/'))).toBe(true)
  })

  it('is the published one wherever a reader installs or imports it', () => {
    const offenders = files
      .filter(f => !ALLOWED.has(f))
      .flatMap((f) => {
        const text = readFileSync(resolve(root, f), 'utf8')
        return text.split('\n')
          .map((line, i) => line.includes(OLD_NAME) ? `${f}:${i + 1}` : null)
          .filter((x): x is string => x !== null)
      })

    expect(offenders, `use @bxshefby/b24ui-nuxt instead of ${OLD_NAME}`).toEqual([])
  })

  it('names the published package in package.json', () => {
    const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))

    expect(pkg.name).toBe('@bxshefby/b24ui-nuxt')
    // npm provenance checks `repository.url` against the repository the
    // publishing workflow runs in; the parent's URL fails the publish.
    expect(pkg.repository.url).toBe('git+https://github.com/bx-shef/b24-ui.git')
  })

  it('keeps the migration chapter on the old name', () => {
    for (const f of ALLOWED) {
      expect(readFileSync(resolve(root, f), 'utf8')).toContain(OLD_NAME)
    }
  })
})
