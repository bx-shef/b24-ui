---
title: ContentSearch
description: 'Готовая командная палитра для вашей документации.'
category: content
framework: nuxt
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/content/ContentSearch.vue
  - label: CommandPalette
    iconName: Bitrix24Icon
    to: /docs/components/command-palette/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/content-search
---

::warning{to="/docs/getting-started/integrations/content/"}
Компонент доступен, только если установлен модуль `@nuxt/content`.
::

## Использование {#usage}

Компонент ContentSearch расширяет [CommandPalette](/docs/components/command-palette/): к нему добавлены поиск `@nuxt/content`, группировка навигации и команды переключения цветовой схемы. Он поддерживает фильтрацию на клиенте через [Fuse.js](https://www.fusejs.io/) и серверный [полнотекстовый поиск FTS5](https://www.sqlite.org/fts5.html). Можно передать любое свойство CommandPalette: `icon`, `placeholder` и другие.

::component-example
---
iframe:
  height: 500px;
iframeMobile: true
overflowHidden: true
source: false
name: 'content-search-example'
---
::

::note
Открыть палитру можно сочетанием :kbd{value="meta"} :kbd{value="K" class="ms-px"}, компонентом [ContentSearchButton](/docs/components/content-search-button/) или композаблом `useContentSearch`: `const { open } = useContentSearch()`{lang="ts"}.
::

::tip
Рекомендуем обернуть `ContentSearch` в компонент [ClientOnly](https://nuxt.com/docs/api/components/client-only), чтобы он не отрисовывался на сервере.
::

### Навигация {#navigation}

Пропс `navigation` вместе с [`queryCollectionNavigation`](https://content.nuxt.com/docs/utils/query-collection-navigation) группирует результаты поиска по разделам:

```vue [app.vue] {2, 9}
<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content'))
</script>

<template>
  <B24App>
    <ClientOnly>
      <LazyB24ContentSearch
        :navigation="navigation"
      />
    </ClientOnly>
  </B24App>
</template>
```

### Файлы {#files}

Пропс `files` вместе с [`queryCollectionSearchSections`](https://content.nuxt.com/docs/utils/query-collection-search-sections) сразу загружает все разделы для поиска и включает фильтрацию на клиенте через [Fuse.js](https://www.fusejs.io/):

```vue [app.vue] {4-8, 16}
<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content'))

const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs', {
  ignoredTags: ['style']
}), {
  server: false
})
</script>

<template>
  <B24App>
    <ClientOnly>
      <LazyB24ContentSearch
        :navigation="navigation"
        :files="files"
        :fuse="{ resultLimit: 20, fuseOptions: { threshold: 0.2 } }"
      />
    </ClientOnly>
  </B24App>
</template>
```

::tip
Пропс `fuse` задаёт параметры [useFuse](https://vueuse.org/integrations/useFuse), которые уходят в базовый [CommandPalette](/docs/components/command-palette/): например, `resultLimit` (по умолчанию `12`) и `fuseOptions.threshold` (по умолчанию `0.1`).
::

### Поиск {#search}

Пропс `search` вместе с [`useSearchCollection`](https://content.nuxt.com/docs/utils/use-search-collection) вместо фильтрации на клиенте включает серверный [полнотекстовый поиск FTS5](https://www.sqlite.org/fts5.html) с подсвеченными фрагментами:

::warning
Нужен `@nuxt/content` версии 3.14 или выше.
::

```vue [app.vue] {4-7, 24-25}
<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content'))

const { search, status, init } = useSearchCollection('content', {
  immediate: false,
  ignoredTags: ['style']
})

const { open } = useContentSearch()

// Откладываем инициализацию индекса до открытия палитры при `immediate: false`
watch(open, (value) => {
  if (value && status.value === 'idle') {
    init()
  }
})
</script>

<template>
  <B24App>
    <ClientOnly>
      <LazyB24ContentSearch
        :navigation="navigation"
        :search="search"
        :search-status="status"
      />
    </ClientOnly>
  </B24App>
</template>
```

::tip
Передайте `search-status`, чтобы компонент сам повторял поиск, когда индекс будет готов. Пропс `search-delay` (по умолчанию `100ms`) задаёт, сколько ждать после паузы в наборе, прежде чем запустить поиск. Параметр `fuse.resultLimit` ограничивает общее число результатов по всем группам (результаты поиска, ссылки, тема и т. д.).
::

::note
С пропсом `search` передавать `files` не нужно. Вместо Fuse.js компонент вызывает асинхронную функцию поиска при каждом нажатии клавиши. Результаты автоматически сопоставляются и группируются по навигации, фрагменты подсвечиваются. В отличие от подхода с `files`, который сразу загружает все разделы и позволяет просматривать навигацию до ввода, `search` возвращает результаты только после ввода запроса.
::

### Сочетание клавиш {#shortcut}

Пропс `shortcut` меняет сочетание клавиш, которое [defineShortcuts](/docs/composables/define-shortcuts/) использует для открытия ContentSearch. По умолчанию `meta_k` (:kbd{value="meta"} :kbd{value="K"}).

```vue [app.vue]{5}
<template>
  <B24App>
    <ClientOnly>
      <LazyB24ContentSearch
        shortcut="meta_k"
      />
    </ClientOnly>
  </B24App>
</template>
```

### Ссылки {#links}

Пропс `links` добавляет вверху палитры группу быстрых ссылок:

```vue [app.vue] {18}
<script setup lang="ts">
const links = [{
  label: 'Документация',
  to: '/docs/getting-started'
}, {
  label: 'Компоненты',
  to: '/docs/components'
}, {
  label: 'Примеры',
  to: '/showcase'
}]
</script>

<template>
  <B24App>
    <ClientOnly>
      <LazyB24ContentSearch
        :links="links"
      />
    </ClientOnly>
  </B24App>
</template>
```

### Цветовая схема {#color-mode}

По умолчанию в палитру добавляется группа команд для переключения между светлой и тёмной темой. Это работает, только если `colorMode` не зафиксирован на конкретной странице через `definePageMeta`:

```vue [pages/index.vue]
<script setup lang="ts">
definePageMeta({
  colorMode: 'dark'
})
</script>
```

Отключить эту группу можно пропсом `color-mode` со значением `false`:

```vue [app.vue]{5}
<template>
  <B24App>
    <ClientOnly>
      <LazyB24ContentSearch
        :color-mode="false"
      />
    </ClientOnly>
  </B24App>
</template>
```

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

### Доступ через ref {#expose}

Через ref шаблона доступно:

| Name | Type |
| ---- | ---- |
| `commandPaletteRef`{lang="ts-type"} | `Ref<InstanceType<typeof B24CommandPalette> \| null>`{lang="ts-type"} |

## Тема {#theme}

:component-theme
