---
title: ContentSurround
description: 'Пара кнопок «Назад» и «Вперёд» для последовательной навигации по страницам.'
category: content
framework: nuxt
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/content/ContentSurround.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/content-surround
---

::warning{to="/docs/getting-started/integrations/content/"}
Компонент доступен, только если установлен модуль `@nuxt/content`.
::

## Использование {#usage}

Пропс `surround` принимает значение `surround`{lang="ts-type"}, которое возвращается при получении соседних страниц.

::component-example
---
name: 'content-surround-example'
props:
  class: 'w-full'
---
::

### Назад / Вперёд {#prev-next}

Пропсы `prev-icon` и `next-icon` задают [иконки](https://bitrix24.github.io/b24icons/icons/) кнопок.

::component-code{prefix="content"}
---
prettier: true
collapse: true
ignore:
  - surround
  - prevIcon
  - nextIcon
cast:
  prevIcon: 'RocketIcon'
  nextIcon: 'RocketIcon'
external:
  - surround
externalTypes:
  - ContentSurroundLink[]
props:
  prevIcon: 'RocketIcon'
  nextIcon: 'RocketIcon'
  surround:
  - title: ContentSearchButton
    path: /docs/components/content-search-button/
    stem: 3.components/content-search-button
    description: Готовая кнопка Button, которая открывает модальное окно ContentSearch.
  - title: ContentToc
    path: /docs/components/content-toc/
    stem: 3.components/content-toc
    description: Закреплённое оглавление с настраиваемыми слотами.
---
::

## Примеры {#examples}

### На странице {#within-a-page}

Компонент ContentSurround на странице показывает ссылки на предыдущую и следующую страницы:

```vue [pages/\[...slug\\].vue]{23}
<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
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

## Тема {#theme}

:component-theme
