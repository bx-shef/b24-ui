---
title: PageBody
description: 'Контейнер для основного содержимого страницы.'
category: page
keywords:
  - основное содержимое страницы
  - обёртка контента
  - контент страницы
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageBody.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-body
---

## Использование {#usage}

Компонент PageBody оборачивает основное содержимое и добавляет отступы для единообразного ритма.

Используйте его в слоте по умолчанию компонента [Page](/docs/components/page/) после компонента [PageHeader](/docs/components/page-header/):

```vue {5}
<template>
  <B24Page>
    <B24PageHeader />

    <B24PageBody />
  </B24Page>
</template>
```

## Примеры {#examples}

::note
В примерах используется [Nuxt Content](https://content.nuxt.com), но компоненты можно подключить к любой системе управления контентом.
::

### На странице {#within-a-page}

Используйте PageBody на странице, чтобы показать её содержимое:

```vue [pages/\[...slug\\].vue]{21-27}
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
В этом примере содержимое страницы отрисовывает компонент [`ContentRenderer`](https://content.nuxt.com/docs/components/content-renderer) из `@nuxt/content`.
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
