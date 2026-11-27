---
title: ProseCodeGroup
description: 'Несколько фрагментов кода во вкладках для наглядности.'
category: components
navigation.title: CodeGroup
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/CodeGroup.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/code-group
---

## Использование {#usage}

Компонент `code-group` объединяет блоки кода во вкладки.

::code-preview{class="[&>div]:*:my-0 [&>div]:*:w-full"}

:::code-group

```bash [pnpm]
pnpm add @bitrix24/b24ui-nuxt
```

```bash [yarn]
yarn add @bitrix24/b24ui-nuxt
```

```bash [npm]
npm install @bitrix24/b24ui-nuxt
```

```bash [bun]
bun add @bitrix24/b24ui-nuxt
```

:::

#code

````mdc
::code-group

```bash [pnpm]
pnpm add @bitrix24/b24ui-nuxt
```

```bash [yarn]
yarn add @bitrix24/b24ui-nuxt
```

```bash [npm]
npm install @bitrix24/b24ui-nuxt
```

```bash [bun]
bun add @bitrix24/b24ui-nuxt
```

::
````

::

::note{to="/docs/typography/code/#code-blocks"}
Как и компонент `ProsePre`, `CodeGroup` показывает имена файлов, иконки и кнопку копирования.
::

## API

### Пропсы {#props}

:component-props{prose}

### Слоты {#slots}

:component-slots{prose}

## Тема {#theme}

:component-theme{prose}
