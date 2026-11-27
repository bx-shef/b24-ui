# Bitrix24 UI

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Bitrix24 UI][b24ui-src]][b24ui-href]

Bitrix24 UI Kit — библиотека для создания веб-приложений на REST API с помощью Nuxt и Vue.

Подробности — в [документации](https://bitrix24.github.io/b24ui/).

## Документация

Документация доступна на https://bitrix24.github.io/b24ui/.

## Установка

```bash [pnpm]
pnpm add @bxshefby/b24ui-nuxt @bitrix24/b24icons-vue tailwindcss
```

```bash [yarn]
yarn add @bxshefby/b24ui-nuxt @bitrix24/b24icons-vue tailwindcss
```

```bash [npm]
npm install @bxshefby/b24ui-nuxt @bitrix24/b24icons-vue tailwindcss
```

```bash [bun]
bun add @bxshefby/b24ui-nuxt @bitrix24/b24icons-vue tailwindcss
```

### Nuxt

1. Добавьте модуль Bitrix24 UI в `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@bxshefby/b24ui-nuxt'],
  css: ['~/assets/css/main.css']
})
```

2. Подключите Tailwind CSS и Bitrix24 UI в своём CSS:

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@bxshefby/b24ui-nuxt";
```

Подробнее — в [руководстве по установке](https://bitrix24.github.io/b24ui/docs/getting-started/installation/nuxt/).

### Vue

1. Добавьте Vite-плагин Bitrix24 UI в `vite.config.ts`:

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import bitrix24UIPluginVite from '@bxshefby/b24ui-nuxt/vite'

export default defineConfig({
  plugins: [
    vue(),
    bitrix24UIPluginVite()
  ]
})
```

2. Подключите Vue-плагин Bitrix24 UI в `main.ts`:

```ts [src/main.ts]
import './assets/css/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import b24UiPlugin from '@bxshefby/b24ui-nuxt/vue-plugin'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
  routes: [],
  history: createWebHistory()
})

app.use(router)
app.use(b24UiPlugin)

app.mount('#app')
```

3. Подключите Tailwind CSS и Bitrix24 UI в своём CSS:

```css [src/assets/css/main.css]
@import "tailwindcss";
@import "@bxshefby/b24ui-nuxt";
```

Подробнее — в [руководстве по установке](https://bitrix24.github.io/b24ui/docs/getting-started/installation/vue/).

## Участие в разработке

Спасибо, что хотите помочь Bitrix24 UI. Вот несколько способов принять участие:

- **Безопасность**: нашли уязвимость? [Сообщите о ней приватно](https://github.com/bitrix24/b24ui/security/advisories/new), а не через формы ниже. Что считается уязвимостью, сказано в [SECURITY.md](https://github.com/bitrix24/b24ui/blob/main/SECURITY.md).
- **Сообщения об ошибках**: [создайте отчёт об ошибке](https://github.com/bitrix24/b24ui/issues/new?template=bug-report.yml). В форме просят воспроизведение — от этого поля зависит, можно ли что-то сделать по отчёту; см. [как сообщить об ошибке](https://github.com/bitrix24/b24ui/blob/main/CONTRIBUTING.md#reporting-a-bug).
- **Предложения**: [создайте запрос на новую возможность](https://github.com/bitrix24/b24ui/issues/new?template=feature-request.yml). Есть идеи, как улучшить Bitrix24 UI? Мы будем рады их услышать.
- **Код**: [CONTRIBUTING.md](https://github.com/bitrix24/b24ui/blob/main/CONTRIBUTING.md) — путеводитель: настройка окружения, подробные руководства и то, чего CI ждёт от pull request. Как запустить репозиторий, описано в [руководстве по участию](https://bitrix24.github.io/b24ui/docs/getting-started/contribution/) на сайте документации.

> [!TIP]
> Правила участия для AI-ассистентов лежат в [`AGENTS.md`](https://github.com/bitrix24/b24ui/blob/main/AGENTS.md). Файл подхватывают все AI-агенты для программирования, и он подсказывает им устройство компонентов, приёмы темизации, соглашения о тестах и правила документации.

## Благодарности

- [nuxt/nuxt](https://github.com/nuxt/nuxt)
- [nuxt/ui](https://github.com/nuxt/ui)
- [unovue/reka-ui](https://github.com/unovue/reka-ui)
- [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- [vueuse/vueuse](https://github.com/vueuse/vueuse)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@bxshefby/b24ui-nuxt.svg?style=flat&colorA=020420&colorB=2fc6f6
[npm-version-href]: https://www.npmjs.com/package/@bxshefby/b24ui-nuxt

[npm-downloads-src]: https://img.shields.io/npm/dm/@bxshefby/b24ui-nuxt.svg?style=flat&colorA=020420&colorB=2fc6f6
[npm-downloads-href]: https://npm.chart.dev/@bxshefby/b24ui-nuxt

[license-src]: https://img.shields.io/github/license/bitrix24/b24ui.svg?style=flat&colorA=020420&colorB=2fc6f6
[license-href]: https://github.com/bitrix24/b24ui/blob/main/LICENSE

[b24ui-src]: https://img.shields.io/badge/Bitrix24%20-UI%20Kit-2fc6f6?labelColor=020420
[b24ui-href]: https://apidocs.bitrix24.com/
