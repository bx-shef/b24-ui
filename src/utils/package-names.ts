/**
 * The specifiers this package can be reached under in a consumer's project.
 *
 * The first entry is the published name. The second is the name the package
 * was published under before the fork: an app that installs this package
 * through an npm alias (`"@bitrix24/b24ui-nuxt": "npm:@bxshefby/b24ui-nuxt@^2.16.0"`)
 * keeps importing the old specifier, while the files on disk sit under the new
 * one (pnpm stores the alias target under its real name). Build-side code that
 * matches the package by name must accept both, or an aliased install loses
 * component overrides, the `vue-plugin` entry and the Vite pre-bundling opt-out.
 */
export const PACKAGE_NAMES = ['@bxshefby/b24ui-nuxt', '@bitrix24/b24ui-nuxt'] as const
