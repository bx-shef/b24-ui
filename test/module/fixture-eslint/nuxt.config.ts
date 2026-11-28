import { defineNuxtModule } from '@nuxt/kit'

// `test/module/module-setup.spec.ts`, the `eslint` option. Like `../fixture`, only ever loaded; the stylesheet comes from the spec, per case.
//
// `@nuxt/eslint` is not a dependency of this repository. The option asks one
// thing of it, that `hasNuxtModule('@nuxt/eslint')` is true, and `hasNuxtModule`
// sees only the modules installed *before* the one asking — so the stand-in is
// listed first, which is also the order an app that follows the docs has.
export default defineNuxtConfig({
  modules: [
    defineNuxtModule({ meta: { name: '@nuxt/eslint' }, setup() {} }),
    '../../../src/module'
  ],
  devtools: { enabled: false },
  compatibilityDate: '2024-07-09'
})
