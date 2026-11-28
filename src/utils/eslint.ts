// The options of `@bxshefby/b24ui-nuxt/eslint`, apart from it so the module's types don't import `eslint`

export type Severity = 'off' | 'warn' | 'error'

export interface Bitrix24UIESLintOptions {
  /**
   * The stylesheet that imports `tailwindcss` and `@bxshefby/b24ui-nuxt`, so the classes
   * it adds (semantic tokens, air design tokens, your own `@theme`) are known.
   */
  entryPoint: string
  /**
   * The files to lint.
   * @defaultValue ['**\/*.vue', '**\/*.{js,mjs,ts,mts,jsx,tsx}']
   */
  files?: string[]
  /**
   * Classes `no-unknown-classes` leaves alone, as regular expressions.
   */
  ignore?: string[]
  rules?: {
    /**
     * Classes the stylesheet doesn't generate. Off by default: classes styled in
     * `<style>` blocks or your own CSS are unknown too, list them in `ignore`.
     * @defaultValue 'off'
     */
    'no-unknown-classes'?: Severity
    /** Raw palette colors (`text-gray-500`) and hardcoded colors (`bg-[#000]`). */
    'no-palette-colors'?: Severity
    /** Classes that set the same property in the same list (`p-2 p-4`), where the stylesheet order decides which wins. */
    'no-conflicting-classes'?: Severity
    /**
     * Physical classes on the inline axis (`ml-2`, `left-0`, `text-left`), for apps that support RTL.
     * @defaultValue 'off'
     */
    'enforce-logical-properties'?: Severity
  }
}
