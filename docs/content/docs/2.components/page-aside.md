---
title: PageAside
description: 'Липкая боковая навигация.'
category: page
keywords:
  - боковая навигация страницы
  - липкое боковое меню
  - правая колонка
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Header.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-aside
---

## Использование {#usage}

Компонент PageAside — липкий элемент `<aside>`, который отображается только начиная с [контрольной точки `lg`](https://tailwindcss.com/docs/breakpoints).

::tip{to="/docs/getting-started/theme/css-variables/#header"}
Компонент PageAside использует CSS-переменную `--b24ui-header-height`, чтобы расположиться точно под `Header`.
::

Используйте его в слоте `left` или `right` компонента [Page](/docs/components/page/):

```vue {4}
<template>
  <B24Page>
    <template #left>
      <B24PageAside />
    </template>
  </B24Page>
</template>
```

## Примеры {#examples}

### В раскладке {#within-a-layout}

Используйте PageAside в раскладке, чтобы показать навигацию:

```vue [layouts/docs.vue]{10-16}
<script setup lang="ts">
import type { NavigationMenuItem } from '@bxshefby/b24ui-nuxt'

const navigation = inject<Ref<NavigationMenuItem[]>>('navigation')
</script>

<template>
  <B24Page>
    <template #left>
      <B24PageAside>
        <B24NavigationMenu
          :key="navigationKey"
          :items="navigation"
          orientation="vertical"
        />
      </B24PageAside>
    </template>

    <slot />
  </B24Page>
</template>

```

::note
В этом примере навигацию, переданную в `app.vue`, показывает компонент [`NavigationMenu`](/docs/components/navigation-menu/).
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
