---
title: PageLinks
description: 'Список ссылок для показа на странице.'
category: page
keywords:
  - ссылки страницы
  - блок ссылок
  - полезные ссылки
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageLinks.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/page-links
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-links
---

## Использование {#usage}

### Ссылки {#links}

Пропс `links` — массив объектов со свойствами:

- `label: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, link?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkLeadingIcon?: ClassNameValue }`{lang="ts-type"}

Можно передать любое свойство компонента [Link](/docs/components/link/#props), например `to`, `target` и другие.

::component-code
---
prettier: true
ignore:
  - links
external:
  - links
externalTypes:
  - PageLink[]
props:
  links:
    - label: 'Редактировать страницу'
      to: https://github.com/bitrix24/b24ui/blob/main/docs/content/docs/2.components/page-links.md
    - label: 'Поставить звезду на GitHub'
      to: https://github.com/bitrix24/b24ui
    - label: 'Релизы'
      to: https://github.com/bitrix24/b24ui/releases
---
::

### Заголовок {#title}

Пропс `title` показывает заголовок над ссылками.

::component-code
---
prettier: true
ignore:
  - links
external:
  - links
externalTypes:
  - PageLink[]
props:
  title: 'Сообщество'
  links:
    - label: 'Редактировать страницу'
      to: https://github.com/bitrix24/b24ui/blob/main/docs/content/docs/2.components/page-links.md
    - label: 'Поставить звезду на GitHub'
      to: https://github.com/bitrix24/b24ui
    - label: 'Релизы'
      to: https://github.com/bitrix24/b24ui/releases
---
::

## Примеры {#examples}

::note
В примерах используется [Nuxt Content](https://content.nuxt.com), но компоненты можно подключить к любой системе управления контентом.
::

### На странице {#within-a-page}

Используйте PageLinks в слоте `bottom` компонента ContentToc, чтобы показать список ссылок под оглавлением.

```vue [pages/\[...slug\\].vue]{50-54}
<script setup lang="ts">
import type { PageLink } from '@bitrix24/b24ui-nuxt'
import DocumentSignIcon from '@bitrix24/b24icons-vue/main/DocumentSignIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

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

const links = computed<PageLink[]>(() => [{
  label: 'Edit this page',
  icon: DocumentSignIcon,
  to: `https://github.com/bitrix24/b24ui/blob/main/docs/content/docs/2.components/${page?.value?.stem}.md`,
  target: '_blank'
}, {
  label: 'Star on GitHub',
  icon: AiStarsIcon,
  to: 'https://github.com/bitrix24/b24ui',
  target: '_blank'
}, {
  label: 'Releases',
  icon: RocketIcon,
  to: 'https://github.com/bitrix24/b24ui/releases'
}])
</script>

<template>
  <div>
    <div>
      <ContentRenderer :value="page" />

      <B24Separator />

      <B24ContentSurround :surround="surround" />
    </div>

    <div>
      <B24ContentToc :links="page.body.toc.links">
        <template #bottom>
          <B24Separator type="dashed" />

          <B24PageLinks title="Community" :links="links" />
        </template>
      </B24ContentToc>
    </div>
  </div>
</template>
```

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
