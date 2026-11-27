import type { AppConfigInput } from '@nuxt/schema'

/**
 * Type-level guard (checked by `vue-tsc`, see `pnpm run typecheck`) for the generated
 * `types/b24ui.d.ts` template: it must resolve `TVConfig`, otherwise `b24ui` in
 * `app.config` silently degrades to `any` and invalid slot classes are accepted.
 */
export const valid: AppConfigInput = {
  b24ui: {
    button: {
      slots: { base: 'rounded-full' }
    }
  }
}

export const invalid: AppConfigInput = {
  b24ui: {
    button: {
      slots: {
        // @ts-expect-error a slot class must be a ClassValue or a replacer, not a number
        base: 123
      }
    }
  }
}
