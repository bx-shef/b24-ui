import { test } from 'vitest'
import { tv } from '../../src/runtime/utils/tv'
import buttonTheme from '#build/b24ui/button'
import navigationMenuTheme from '#build/b24ui/navigation-menu'
import tableTheme from '#build/b24ui/table'

// Representative invocation props for each component (mirrors the objects the
// components pass to `tv(...)(...)` at runtime — see Button.vue / Table.vue).
const buttonProps = {
  color: 'air-primary',
  depth: 'normal',
  size: 'md',
  noSplit: false,
  loading: false,
  useLabel: true,
  block: false,
  normalCase: false,
  rounded: false,
  useDropdown: false,
  useWait: false,
  useClock: false,
  leading: false,
  isAir: true
} as const
const tableProps = {
  sticky: false,
  loading: false,
  loadingColor: 'air-primary',
  loadingAnimation: 'carousel',
  virtualize: false,
  externalScroll: false
} as const

// A single `tv()` call is too short to time reliably (and cached ones nearly free),
// so each body repeats it; the ratios between the groups are what is compared.
const ITERATIONS = 100

// Bound once: reading an imported binding inside a hot loop goes through the
// module's export getter, which Vitest flags as benchmark overhead.
const build = tv
const button = buttonTheme
const table = tableTheme
const navigationMenu = navigationMenuTheme

// Building the factory is the expensive step (deep-merges the whole variant
// matrix, joins every slot, flattens compound variants). `tv` memoizes it per
// theme and config, so only the cold build below skips the cache.
test('factory build', async ({ bench }) => {
  await bench('button', () => {
    for (let i = 0; i < ITERATIONS; i++) {
      build({ extend: button })
    }
  }).run()

  await bench('table', () => {
    for (let i = 0; i < ITERATIONS; i++) {
      build({ extend: table })
    }
  }).run()

  await bench('navigation-menu', () => {
    for (let i = 0; i < ITERATIONS; i++) {
      build({ extend: navigationMenu })
    }
  }).run()

  let cold = 0
  await bench('button (~6 slots, cold build)', () => {
    for (let i = 0; i < ITERATIONS; i++) {
      build({ extend: button, base: `cold-${cold++}` })
    }
  }).run()
})

// Invoking a prebuilt factory is the cheap step — this is all a variant-prop
// change should cost once the build is hoisted out of the invocation computed.
test('invocation (prebuilt factory)', async ({ bench }) => {
  const buttonFactory = tv({ extend: buttonTheme })
  const tableFactory = tv({ extend: tableTheme })

  await bench('button', () => {
    buttonFactory(buttonProps)
  }).run()

  await bench('table', () => {
    tableFactory(tableProps)
  }).run()
})

// Build and invoke fused in one call, as every component does today. The gap
// between this and "invocation (prebuilt factory)" is the overhead saved by
// hoisting factory construction out of the per-variant-prop recomputation.
test('build + invoke (current fused pattern)', async ({ bench }) => {
  await bench('button', () => {
    tv({ extend: buttonTheme })(buttonProps)
  }).run()

  await bench('table', () => {
    tv({ extend: tableTheme })(tableProps)
  }).run()
})

// Table renders call `b24ui.td(...)` once per cell through the `wrapSlots` proxy.
// This models a 100-cell render, exercising the per-access wrapper-closure
// allocation and the replacer scan on every slot call.
test('slot invocation', async ({ bench }) => {
  const tableUi = tv({ extend: tableTheme })(tableProps)

  await bench('td x100 (string class)', () => {
    for (let i = 0; i < 100; i++) {
      tableUi.td({ class: 'p-2', pinned: false })
    }
  }).run()

  await bench('td x100 (array class)', () => {
    for (let i = 0; i < 100; i++) {
      tableUi.td({ class: [undefined, 'p-2'], pinned: false })
    }
  }).run()
})
