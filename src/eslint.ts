import { resolve } from 'pathe'
import type { Linter } from 'eslint'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import { getDefaultSelectors } from 'eslint-plugin-better-tailwindcss/defaults'
import type { Bitrix24UIESLintOptions } from './utils/eslint'

export type { Bitrix24UIESLintOptions }

// Tailwind's neutral palettes. Bitrix24 UI has no alias over `--color-neutral-*`, so `neutral` is one of them
const GRAYS = ['slate', 'gray', 'zinc', 'stone', 'neutral', 'taupe', 'mauve', 'mist', 'olive']
const HUES = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']

const COLOR_UTILITY = '(?:bg|text|border(?:-[xytrblse]|-bs|-be)?|ring(?:-offset)?|outline|divide|fill|stroke|from|via|to|shadow|inset-shadow|inset-ring|decoration|accent|caret|placeholder)'
// A class with its variants, `md:hover:bg-red-500/50`
const CLASS = (utility: string, color: string) => `^(?:\\S*:)?!?-?(${utility})-(${color})(?:-\\d{2,3})?(?:\\/\\S+)?!?$`

type Shades = Record<number, string | string[]>

// The semantic token each neutral shade stands for, by how light the token is in the light context
// (`air-design-tokens/003_b24_context_light.css`) and under `dark:` (`004_b24_context_dark.css`).
// The tokens themselves are declared in the `@theme` of `runtime/index.css`.
// A shade between two tokens suggests both, a shade no token is close to falls back to the full list.
const TEXT_SHADES: Record<'light' | 'dark', Shades> = {
  light: { 50: 'dimmed', 100: 'dimmed', 200: 'dimmed', 300: 'dimmed', 400: 'muted', 500: 'description', 600: 'description', 700: 'label', 800: 'label', 900: 'label', 950: 'label' },
  dark: { 50: 'label', 100: 'label', 200: 'label', 300: 'label', 400: 'description', 500: 'description', 600: 'muted', 700: 'dimmed', 800: 'dimmed', 900: 'dimmed', 950: 'dimmed' }
}
const BG_SHADES: Record<'light' | 'dark', Shades> = {
  light: { 50: 'elevated', 100: 'muted', 200: 'muted' },
  dark: { 700: 'muted', 800: 'default', 900: 'elevated', 950: 'elevated' }
}
// `border-accented` is the blue accent of the design system, so no gray maps to it
const BORDER_SHADES: Record<'light' | 'dark', Shades> = {
  light: { 50: 'default', 100: 'default', 200: ['default', 'muted'], 300: 'muted' },
  dark: { 600: 'muted', 700: 'muted', 800: 'default', 900: 'default', 950: 'default' }
}
const RING_SHADES: Record<'light' | 'dark', Shades> = {
  light: { 50: 'muted', 100: 'muted', 200: 'default', 300: 'accented', 400: 'accented' },
  dark: { 600: 'accented', 700: 'default', 800: 'default', 900: 'default', 950: 'default' }
}
const SHADE_TOKENS: [string, Record<'light' | 'dark', Shades>][] = [
  ['text', TEXT_SHADES],
  ['bg', BG_SHADES],
  ['border(?:-[xytrblse]|-bs|-be)?', BORDER_SHADES],
  ['divide', RING_SHADES],
  ['ring(?:-offset)?', RING_SHADES]
]

const GRAY_TOKENS: Record<string, string> = {
  text: '`text-dimmed`, `text-muted`, `text-description`, `text-legend` or `text-label`',
  bg: '`bg-default`, `bg-muted`, `bg-elevated` or `bg-accented`',
  border: '`border-default`, `border-muted` or `border-accented`',
  divide: '`divide-default`, `divide-muted` or `divide-accented`',
  ring: '`ring-default`, `ring-muted` or `ring-accented`'
}

// The brand color of the design system each Tailwind hue stands closest to (`--color-*` in `air-design-tokens/tw-style/colors.css`).
// A hue with no brand color is left out and falls back to the generic message.
const HUE_TOKENS: Record<string, string> = {
  red: 'alert',
  rose: 'alert',
  orange: 'warning',
  amber: 'warning',
  yellow: 'warning',
  lime: 'success',
  green: 'success',
  emerald: 'success',
  sky: 'primary',
  blue: 'primary',
  indigo: 'ai',
  violet: 'ai',
  purple: 'ai',
  fuchsia: 'ai'
}

const GENERIC_HINT = 'a semantic token (`text-description`, `bg-elevated`, `border-default`, …), a brand color (`primary`, `success`, `warning`, `alert`, `ai`) or the `color` prop of the component'

function paletteRestrictions() {
  const restrict: { pattern: string, message: string }[] = []

  const grays = GRAYS.join('|')
  // The token keeps the class's other variants and modifiers, `md:hover:text-gray-500/50` is `md:hover:text-description/50`
  for (const [utility, modes] of SHADE_TOKENS) {
    for (const [shade, tokens] of Object.entries(modes.dark)) {
      restrict.push({
        pattern: `^((?:\\S*:)?)dark:((?:\\S*:)?)(!?)(${utility})-(?:${grays})-${shade}((?:\\/\\S+)?!?)$`,
        message: `"$0" uses a raw palette color. In dark mode it's ${[tokens].flat().map(token => `\`$1$2$3$4-${token}$5\``).join(' or ')}. When its light mode class maps to the same token, use the token for both, it follows the color mode.`
      })
    }
    for (const [shade, tokens] of Object.entries(modes.light)) {
      restrict.push({
        pattern: `^(?!(?:\\S*:)?dark:)((?:\\S*:)?)(!?)(${utility})-(?:${grays})-${shade}((?:\\/\\S+)?!?)$`,
        message: `"$0" uses a raw palette color. Use ${[tokens].flat().map(token => `\`$1$2$3-${token}$4\``).join(' or ')} instead.`
      })
    }
  }
  for (const [utility, tokens] of Object.entries(GRAY_TOKENS)) {
    restrict.push({
      pattern: CLASS(utility === 'border' ? 'border(?:-[xytrblse]|-bs|-be)?' : utility, grays),
      message: `"$0" uses a raw palette color. Use a semantic token instead: ${tokens}.`
    })
  }
  restrict.push({
    pattern: CLASS(COLOR_UTILITY, grays),
    message: `"$0" uses a raw palette color. Use ${GENERIC_HINT} instead.`
  })

  for (const hue of HUES) {
    const token = HUE_TOKENS[hue]
    restrict.push({
      pattern: `^((?:\\S*:)?!?-?)(${COLOR_UTILITY})-${hue}(?:-\\d{2,3})?((?:\\/\\S+)?!?)$`,
      message: token
        ? `"$0" uses a raw palette color. \`${token}\` is the closest brand color, use \`$1$2-${token}$3\` instead.`
        : `"$0" uses a raw palette color. Use ${GENERIC_HINT} instead.`
    })
  }

  restrict.push({
    pattern: `^(?:\\S*:)?!?-?(${COLOR_UTILITY})-\\[(?:color:)?(?:#|rgba?\\(|hsla?\\(|oklch\\(|oklab\\().*$`,
    message: `"$0" hardcodes a color. Use ${GENERIC_HINT} instead.`
  })
  return restrict
}

// Only the inline axis: Tailwind's rule also maps `mt-*`, `top-*`, `w-*` and `size-*` to their block and inline names
const BLOCK_AXIS = [
  '(?:^|:)!?-?(?:min-|max-)?[wh]-',
  '(?:^|:)!?-?size-',
  '(?:^|:)!?-?(?:scroll-)?[mp][tb]-',
  '(?:^|:)!?-?(?:top|bottom)-',
  '(?:^|:)!?(?:border|rounded)-[tb](?:-|$)',
  // `left-1/2 -translate-x-1/2` centers: as `inset-s-1/2` it drifts off center in RTL
  '(?:^|:)!?-?(?:left|right)-1/2$'
]

// The `b24ui` of `app.config.ts` and of the Vite plugin. Only the paths that hold classes,
// minus the `*Size` slots which hold a size prop for a nested component.
const APP_CONFIG_MATCHERS = [
  { type: 'objectValues', path: '^b24ui\\.(?:prose\\.)?[\\w-]+\\.slots(?!.*Size$).*$' },
  { type: 'objectValues', path: '^b24ui\\.(?:prose\\.)?[\\w-]+\\.variants(?!.*Size$).*$' },
  { type: 'objectValues', path: '^b24ui\\.(?:prose\\.)?[\\w-]+\\.compoundVariants\\[\\d+\\]\\.class.*$' }
]

const SELECTORS = [
  ...getDefaultSelectors(),
  // `:b24ui` on any component, `:b24ui` on `<B24Theme>`
  { kind: 'attribute', name: '^(?:v-bind:|:)b24ui$', match: [{ type: 'objectValues' }] },
  // `:props` on `<B24Theme>`, `{ button: { b24ui: { base } } }`
  { kind: 'attribute', name: '^(?:v-bind:|:)props$', match: [{ type: 'objectValues', path: '^[\\w-]+\\.b24ui\\..*$' }] },
  // `defineAppConfig({ b24ui })` and the default import of `@bxshefby/b24ui-nuxt/vite`, named as in the docs
  { kind: 'callee', name: '^(?:defineAppConfig|bitrix24UIPluginVite)$', match: APP_CONFIG_MATCHERS }
]

/**
 * Lints the Tailwind CSS classes of an app that uses Bitrix24 UI, in templates,
 * `:b24ui` objects, `<B24Theme>` and the `b24ui` of `app.config.ts`.
 *
 * ```ts
 * // eslint.config.mjs
 * import b24ui from '@bxshefby/b24ui-nuxt/eslint'
 *
 * export default [
 *   ...b24ui({ entryPoint: 'app/assets/css/main.css' })
 * ]
 * ```
 */
export default function b24ui(options: Bitrix24UIESLintOptions): Linter.Config[] {
  const entryPoint = resolve(options.entryPoint)
  const rules = {
    'no-unknown-classes': 'off',
    'no-palette-colors': 'warn',
    'no-conflicting-classes': 'warn',
    'enforce-logical-properties': 'off',
    ...options.rules
  } satisfies Bitrix24UIESLintOptions['rules']

  return [{
    name: 'b24ui/tailwindcss',
    files: options.files ?? ['**/*.vue', '**/*.{js,mjs,ts,mts,jsx,tsx}'],
    plugins: {
      'better-tailwindcss': betterTailwindcss as any
    },
    settings: {
      'better-tailwindcss': {
        entryPoint,
        selectors: SELECTORS
      }
    },
    rules: {
      'better-tailwindcss/no-unknown-classes': [rules['no-unknown-classes'], { ignore: options.ignore ?? [] }],
      'better-tailwindcss/no-restricted-classes': [rules['no-palette-colors'], { restrict: paletteRestrictions() }],
      'better-tailwindcss/no-conflicting-classes': rules['no-conflicting-classes'],
      'better-tailwindcss/enforce-logical-properties': [rules['enforce-logical-properties'], { ignore: BLOCK_AXIS }]
    }
  }]
}
