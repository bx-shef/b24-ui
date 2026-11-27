---
title: ProseSteps
description: 'Заголовки превращаются в понятную пошаговую инструкцию.'
category: components
navigation.title: Steps
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/Steps.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/steps
---

## Использование {#usage}

Компонент Steps оборачивает заголовки и показывает их списком шагов.

Пропс `level` определяет, какой уровень заголовков используется для шагов.

:::code-preview{class="[&>div]:*:w-full"}
::steps{level="4"}

#### Добавьте модуль Bitrix24 UI в `nuxt.config.ts`

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@bxshefby/b24ui-nuxt']
})
```

#### Подключите Tailwind CSS в стилях

```css [app/assets/css/main.css]
@import "tailwindcss";
```

#### Запустите сервер разработки

```bash
npm run dev
```

::

#code

````mdc
::steps{level="4"}

#### Добавьте модуль Bitrix24 UI в `nuxt.config.ts`

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@bxshefby/b24ui-nuxt']
})
```

#### Подключите Tailwind CSS в стилях

```css [app/assets/css/main.css]
@import "tailwindcss";
```

#### Запустите сервер разработки

```bash
npm run dev
```

::
````

:::

## API

### Пропсы {#props}

:component-props{prose}

### Слоты {#slots}

:component-slots{prose}

## Тема {#theme}

:component-theme{prose}
