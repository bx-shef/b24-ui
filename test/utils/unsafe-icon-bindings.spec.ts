import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { describe, it, expect, beforeAll } from 'vitest'
import { glob } from 'tinyglobby'

/**
 * b24ui has no `Icon` component where an untrusted icon (`{ template }`, `__v_raw`, a forged VNode,
 * a string like `img src=x onerror=…`) could be stopped, so the guard lives in two places:
 * `useComponentProps` for props, and `safeIcon()` for icons read from items. The first is
 * covered by render tests; the second is a convention, and a convention is forgotten the day
 * someone ports a new `<Component :is="item.icon">`. No render test notices that either, because
 * it takes a hostile value to turn it into an XSS. This is the check that does.
 *
 * - an `:is` / `h()` whose source is an item field (`item.icon`, `link.trailingIcon`, `labelIcon(item)`)
 *   has to go through `safeIcon(`;
 * - so does a `v-if` / `v-else-if` that tests such a field, or the branch falls back on a value
 *   that was dropped: the slot renders empty instead of the number, the avatar, the chip;
 * - in a component that does not read its props through `useComponentProps`, an icon prop in
 *   `:is` is unguarded too and has to be listed below, with the reason.
 */
const runtimeDir = join(process.cwd(), 'src', 'runtime')

const ITEM_ICON = /\b(?:item|link|childItem|group|option|entry)\??\.\w*[iI]con\b|\blabelIcon\(/

/** Icons read in a component that has no props proxy, and why they are fine as they are. */
const UNPROXIED_ALLOWED: Record<string, string[]> = {
  // Internal computed: a dictionary icon or a `safeIcon` of the prop
  'components/prose/CodeIcon.vue': ['icon'],
  // Fixed by the component, not read from data
  'components/ContextMenuContent.vue': ['childrenIcon']
}

const stripSafe = (expression: string) => {
  let previous
  let result = expression
  do {
    previous = result
    result = result.replace(/safeIcon\((?:[^()]|\([^()]*\))*\)/g, '')
  } while (result !== previous)

  return result
}

interface Binding { file: string, kind: string, expression: string, proxied: boolean }

async function collect() {
  const files = await glob('**/*.vue', { cwd: runtimeDir })
  const found: Binding[] = []

  for (const file of files.sort()) {
    const source = await readFile(join(runtimeDir, file), 'utf8')
    const proxied = /\buseComponentProps\b/.test(source)
    const add = (kind: string, regexp: RegExp) => {
      for (const match of source.matchAll(regexp)) {
        found.push({ file, kind, expression: (match[1] ?? '').trim().replace(/\s+/g, ' '), proxied })
      }
    }
    add(':is', /(?::|v-bind:)is\s*=\s*"([^"]*)"/g)
    add('v-if', /v-(?:else-)?if\s*=\s*"([^"]*)"/g)
    add('h()', /\bh\(\s*([^,)]*)/g)
  }

  return found
}

describe('icon bindings in the runtime', () => {
  let bindings: Binding[]

  beforeAll(async () => {
    bindings = await collect()
    // Every assertion below passes vacuously on an empty scan
    expect(bindings.filter(binding => binding.kind === ':is').length).toBeGreaterThan(50)
    expect(bindings.filter(binding => /safeIcon\(/.test(binding.expression)).length).toBeGreaterThan(20)
  })

  it('read item icons through safeIcon', () => {
    const bad = bindings
      .filter(binding => binding.kind !== 'v-if' && ITEM_ICON.test(stripSafe(binding.expression)))
      .map(binding => `${binding.file} ${binding.kind}="${binding.expression}"`)
    expect(bad).toEqual([])
  })

  it('test item icons in v-if through safeIcon', () => {
    const bad = bindings
      .filter(binding => binding.kind === 'v-if' && ITEM_ICON.test(stripSafe(binding.expression)))
      .map(binding => `${binding.file} v-if="${binding.expression}"`)
    expect(bad).toEqual([])
  })

  it('guard icon props in components that do not read props through useComponentProps', () => {
    const bad = bindings
      .filter(binding => binding.kind === ':is' && !binding.proxied)
      .filter(binding => !/safeIcon\(/.test(binding.expression) && /[iI]con/.test(binding.expression.replace(/\bicons\.\w+/g, '')))
      .filter(binding => !(UNPROXIED_ALLOWED[binding.file] ?? []).some(name => binding.expression === name))
      .map(binding => `${binding.file} :is="${binding.expression}"`)
    expect(bad).toEqual([])
  })

  it('recognises an unguarded binding', () => {
    expect(ITEM_ICON.test(stripSafe('item.icon'))).toBe(true)
    expect(ITEM_ICON.test(stripSafe('safeIcon(item.icon)'))).toBe(false)
    expect(ITEM_ICON.test(stripSafe('safeIcon(item.trailingIcon) || props.trailingIcon'))).toBe(false)
    expect(ITEM_ICON.test(stripSafe('isSelectItem(item) && item.icon'))).toBe(true)
    expect(ITEM_ICON.test(stripSafe('labelIcon(item)'))).toBe(true)
  })
})
