import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'

/**
 * Copyright notices are a fork-only invariant (bx-shef/b24-ui#84,
 * `.sync/PORTING.md` §2 «Copyright notices: three holders, author and footer
 * stay»).
 *
 * `LICENSE` and `package.json` are rewritten by ports of nuxt/ui commits and
 * `Footer.vue` by ports of site changes, so a faithful port could drop a holder
 * line, the `author` field or the footer credit and still look correct. MIT
 * requires the Nuxt notice to stay — the code grew out of nuxt/ui.
 */
// Same derivation as `peer-dependencies.spec.ts`: under vitest `import.meta.url`
// resolves to an `http:` URL, so the root comes from the vitest cwd.
const repoRoot = process.cwd()
const RULE = '.sync/PORTING.md §2 «Copyright notices: three holders, author and footer stay»'

const HOLDERS = [
  'Copyright (c) 2023 Nuxt',
  'Copyright (c) 2024 Bitrix24',
  'Copyright (c) 2026 ООО «БэИксШефБай»'
]

describe('copyright notices (bx-shef/b24-ui#84)', () => {
  it('LICENSE keeps the three holder lines, in order, and no others', async () => {
    const license = await readFile(join(repoRoot, 'LICENSE'), 'utf8')
    const holders = license.split(/\r?\n/).map(line => line.trim()).filter(line => /^Copyright\b/i.test(line))
    expect(holders, `LICENSE holder lines changed — see ${RULE}`).toEqual(HOLDERS)
    expect(license.startsWith('MIT License'), `LICENSE is no longer MIT — see ${RULE}`).toBe(true)
  })

  it('package.json keeps the author', async () => {
    const pkg = JSON.parse(await readFile(join(repoRoot, 'package.json'), 'utf8'))
    expect(pkg.author, `package.json author changed — see ${RULE}`).toBe('ООО «БэИксШефБай»')
    expect(pkg.license, `package.json license changed — see ${RULE}`).toBe('MIT')
  })

  it('the site footer keeps the copyright and the credit line', async () => {
    const footer = await readFile(join(repoRoot, 'docs/app/components/Footer.vue'), 'utf8')
    expect(footer, `footer copyright removed — see ${RULE}`).toContain('© 2026 ООО «БэИксШефБай»')
    expect(footer, `footer credit removed — see ${RULE}`).toContain('Основано на Bitrix24 UI и Nuxt UI')
  })
})
