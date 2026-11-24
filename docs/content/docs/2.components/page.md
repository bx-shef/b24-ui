---
title: Page
description: 'Сетка страницы из трёх колонок: левая боковая панель, область основного содержимого и правая боковая панель.'
category: page
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Page.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page
---

## Использование {#usage}

Компонент Page помогает создавать раскладки с необязательными левой и правой колонками. Он подходит для сайтов документации и других страниц, ориентированных на содержимое.

```vue {2,6}
<template>
  <B24Page>
    <template #left />

    <template #right />
  </B24Page>
</template>
```

::tip
Если слоты не заданы, страница отображается как центрированная одноколоночная раскладка.
::

## Примеры {#examples}

::note
В примерах используется [Nuxt Content](https://content.nuxt.com), но компоненты можно подключить к любой системе управления контентом.
::

### В раскладке {#within-a-layout}

Используйте Page в раскладке со слотом `left`, чтобы показать навигацию:

```vue [layouts/docs.vue] {9-17}
<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'

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

### На странице {#within-a-page}

Используйте Page на странице со слотом `right`, чтобы показать оглавление:

```vue [pages/\[...slug\\].vue]{29-31}
<script setup lang="ts">
const route = useRoute()

definePageMeta({
  layout: 'docs'
})

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('content', route.path)
})
</script>

<template>
  <B24Page>
    <B24PageHeader :title="page.title" :description="page.description" />

    <B24PageBody>
      <ContentRenderer :value="page" />

      <B24Separator />

      <B24ContentSurround :surround="surround" />
    </B24PageBody>

    <template #right>
      <B24ContentToc :links="page.body.toc.links" />
    </template>
  </B24Page>
</template>
```

::note
В этом примере оглавление показывает компонент `ContentToc`.
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
