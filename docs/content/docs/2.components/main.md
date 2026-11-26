---
title: Main
description: 'Основной элемент содержимого, который растягивается на всю высоту окна просмотра.'
category: layout
keywords:
  - основное содержимое
  - область контента
  - тело страницы
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Main.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/main
---

## Использование {#usage}

Компонент Main отрисовывает элемент `<main>`, который вместе с компонентом [Header](/docs/components/header/) образует раскладку на всю доступную высоту окна просмотра.

::tip{to="/docs/getting-started/theme/css-variables/#header"}
Компонент Main использует CSS-переменную `--b24ui-header-height`, чтобы расположиться точно под `Header`.
::

## Примеры {#examples}

### В `app.vue` {#within-appvue}

Используйте Main в `app.vue` или в раскладке:

```vue [app.vue]{5-9}
<template>
  <B24App>
    <B24Header />

    <B24Main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </B24Main>

    <B24Footer />
  </B24App>
</template>
```

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
