---
title: ContentToc
description: 'Закреплённое оглавление с динамической подсветкой активного раздела.'
category: content
framework: nuxt
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/content/ContentToc.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/content-toc
---

::warning{to="/docs/getting-started/integrations/content/"}
Компонент доступен, только если установлен модуль `@nuxt/content`.
::

## Использование {#usage}

Пропс `links` принимает `page?.body?.toc?.links`{lang="ts-type"}, которое возвращается при получении страницы.

::note
Подсветка текущей позиции читателя работает сама. Лежащий в её основе композабл `useScrollspy` экспортируется отдельно, если вы собираете своё оглавление: `const { activeHeadings, updateHeadings } = useScrollspy()`{lang="ts"}. После изменения контента вызывайте `updateHeadings()`{lang="ts"} с элементами заголовков, за которыми нужно следить. Используйте `activeHeadings`, а не `visibleHeadings`: он оставляет подсвеченным последний заголовок, пока читатель находится между двумя, а `visibleHeadings` в этот момент пустеет, и подсветка мигает.
::

::component-example
---
name: 'content-toc-example'
props:
  class: 'w-full'
---
::

### Заголовок {#title}

Пропс `title` меняет заголовок оглавления.

::component-code{prefix="content"}
---
prettier: true
collapse: true
hide:
  - class
ignore:
  - links
external:
  - links
externalTypes:
  - ContentTocLink[]
props:
  title: 'На этой странице'
  class: 'w-full'
  links:
  - id: usage
    depth: 2
    text: Использование
    children:
    - id: title
      depth: 3
      text: Заголовок
  - id: api
    depth: 2
    text: API
    children:
    - id: props
      depth: 3
      text: Пропсы
    - id: slots
      depth: 3
      text: Слоты
  - id: theme
    depth: 2
    text: Тема
---
::

## Примеры {#examples}

### На странице {#within-a-page}

Компонент ContentToc на странице показывает оглавление:

```vue [pages/\[...slug\\].vue]{14-16}
<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())
if (!page.value) {
  throw createError({ status: 404, statusText: 'Page not found', fatal: true })
}
</script>

<template>
  <template v-if="page">
    <ProseH1>{{ page.title }}</ProseH1>

    <template v-if="page?.body?.toc?.links?.length">
      <B24ContentToc :links="page.body.toc.links" />
    </template>

    <div>
      <ContentRenderer v-if="page.body" :value="page" />

      <B24Separator v-if="surround?.filter(Boolean).length" class="my-4" />

      <B24ContentSurround :surround="(surround as any)" />
    </div>
  </template>
</template>
```

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
