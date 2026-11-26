---
title: PageHeader
description: 'Адаптивная шапка страницы.'
category: page
keywords:
  - заголовок страницы
  - шапка страницы
  - заголовок раздела
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageHeader.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/page-header
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-header
---

## Использование {#usage}

Компонент PageHeader показывает шапку страницы.

Используйте его в слоте по умолчанию компонента [Page](/docs/components/page/) перед компонентом [PageBody](/docs/components/page-body/):

```vue {3}
<template>
  <B24Page>
    <B24PageHeader />

    <B24PageBody />
  </B24Page>
</template>
```

### Заголовок {#title}

Пропс `title` показывает заголовок в шапке.

::component-code
---
hide:
  - class
props:
  title: 'PageHeader'
  class: 'w-full'
---
::

::tip
Заголовок по умолчанию отрисовывается как `h1`. Чтобы изменить тег, передайте в пропс `as` объект, например `:as="{ title: 'h2' }"`{lang="ts-type"}. Корневой элемент задаётся так же: `:as="{ root: 'section', title: 'h2' }"`{lang="ts-type"}.
::

### Описание {#description}

Пропс `description` показывает описание в шапке.

::component-code
---
prettier: true
ignore:
  - title
hide:
  - class
props:
  title: 'PageHeader'
  description: 'Адаптивная шапка страницы с заголовком, описанием и действиями.'
  class: 'w-full'
---
::

### Надзаголовок {#headline}

Пропс `headline` показывает надзаголовок в шапке.

::component-code
---
prettier: true
ignore:
  - title
  - description
hide:
  - class
props:
  title: 'PageHeader'
  description: 'Адаптивная шапка страницы с заголовком, описанием и действиями.'
  headline: 'Компоненты'
  class: 'w-full'
---
::

### Ссылки {#links}

Пропс `links` показывает в шапке список кнопок [Button](/docs/components/button/).

::component-code
---
prettier: true
external:
  - links
externalTypes:
  - ButtonProps[]
ignore:
  - title
  - description
  - headline
  - links
hide:
  - class
props:
  title: 'PageHeader'
  description: 'Адаптивная шапка страницы с заголовком, описанием и действиями.'
  headline: 'Компоненты'
  links:
    - label: 'GitHub'
      to: 'https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageHeader.vue'
      target: '_blank'
  class: 'w-full'
---
::

## Примеры {#examples}

::note
В примерах используется [Nuxt Content](https://content.nuxt.com), но компоненты можно подключить к любой системе управления контентом.
::

### На странице {#within-a-page}

Используйте PageHeader на странице, чтобы показать её шапку:

```vue [pages/\[...slug\\].vue]{19-24}
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
    <B24PageHeader
      :title="page.title"
      :description="page.description"
      :headline="page.headline"
      :links="page.links"
    />

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

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
