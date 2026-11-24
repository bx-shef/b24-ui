# Port: perf(module): load `tailwindcss/colors` lazily when hydrating

**Upstream:** `bab1c62950cdacb9c7af41b74cde1574da1b0cfe` (nuxt/ui, #7311)
**Decision:** no-op

Апстрим выносит `tailwindcss/colors` в шаблон `ui-colors.ts` и грузит палитру лениво при гидрации, чтобы плагин `colors` мог заново сгенерировать оттенки `--ui-color-*`.

В b24ui этой работы нет: импорт `tailwindcss/colors` закомментирован в `src/runtime/plugins/colors.ts`, `src/templates.ts` и `src/unplugin.ts`, а плагин отдаёт `@layer theme` с пустыми списками (палитра — токены `air-*`, а не оттенки Tailwind). Лениво грузить нечего, шаблон `b24ui-colors.ts` не нужен; из-за `await loadColors()` в апстриме же появляется `useHead(…, { head })` — у нас плагин синхронный, контекст `injectHead()` не теряется. `src/` не менялся.
