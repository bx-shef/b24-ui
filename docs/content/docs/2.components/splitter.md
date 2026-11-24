---
title: Splitter
description: 'Панели, которые делят одну область и меняют размер перетаскиванием разделителя между ними.'
category: layout
keywords:
  - resizable
  - panel group
  - split view
  - pane
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Splitter.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/splitter
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/splitter
  - label: Splitter
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/splitter
---

## Использование {#usage}

Splitter показывает список панелей с изменяемым размером, разделённых перетаскиваемыми ручками.

::component-example
---
collapse: true
name: 'splitter-example'
---
::

::note
Splitter занимает всю высоту контейнера, поэтому высота должна быть задана у родительского элемента.
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- `defaultSize?: number`{lang="ts-type"}
- `minSize?: number`{lang="ts-type"}
- `maxSize?: number`{lang="ts-type"}
- `collapsible?: boolean`{lang="ts-type"}
- `collapsedSize?: number`{lang="ts-type"}
- `sizeUnit?: '%' | 'px'`{lang="ts-type"}
- `order?: number`{lang="ts-type"}
- `id?: string`{lang="ts-type"}
- `slot?: string`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { panel?: ClassNameValue }`{lang="ts-type"}

Ключ `slot` задаёт содержимое панели, ключ `class` — её стиль. Элементы без ключа `slot` используют слот `panel-{index}`. По умолчанию размеры заданы в процентах; чтобы задать пиксели, укажите у элемента `sizeUnit: 'px'`.

::caution
При отрисовке на сервере задайте пропс `id` и укажите `defaultSize` либо у всех элементов, либо ни у одного. Иначе идентификаторы генерируются автоматически, сервер и клиент могут разойтись, и при гидратации раскладка сломается. Элемент без `defaultSize` получает на сервере равную долю, поэтому смешивать оба подхода нельзя: после гидратации панели «прыгнут». Размеры в пикселях измеряются на клиенте и всегда немного смещаются.
::

::component-code
---
collapse: true
class: 'h-96'
prettier: true
ignore:
  - items
  - id
external:
  - items
externalTypes:
  - SplitterItem[]
props:
  id: 'splitter-items'
  items:
    - slot: 'sidebar'
      minSize: 15
      maxSize: 40
      defaultSize: 25
      class: 'bg-(--ui-color-bg-content-secondary) border border-(--ui-color-divider-default) rounded-(--ui-border-radius-md) items-center justify-center text-description font-(--ui-font-weight-medium)'
    - slot: 'main'
      defaultSize: 75
      class: 'bg-(--ui-color-bg-content-secondary) border border-(--ui-color-divider-default) rounded-(--ui-border-radius-md) items-center justify-center text-description font-(--ui-font-weight-medium)'
slots:
  sidebar: Боковое меню
  main: Основная часть
---

#sidebar
Боковое меню

#main
Основная часть
::

### Ориентация {#orientation}

Пропс `orientation` меняет направление Splitter. По умолчанию `horizontal`.

::component-code
---
collapse: true
class: 'h-96'
prettier: true
ignore:
  - items
  - id
external:
  - items
externalTypes:
  - SplitterItem[]
props:
  id: 'splitter-orientation'
  orientation: 'vertical'
  items:
    - slot: 'first'
      class: 'bg-(--ui-color-bg-content-secondary) border border-(--ui-color-divider-default) rounded-(--ui-border-radius-md) items-center justify-center text-description font-(--ui-font-weight-medium)'
    - slot: 'second'
      class: 'bg-(--ui-color-bg-content-secondary) border border-(--ui-color-divider-default) rounded-(--ui-border-radius-md) items-center justify-center text-description font-(--ui-font-weight-medium)'
slots:
  first: Первая
  second: Вторая
---

#first
Первая

#second
Вторая
::

## Примеры {#examples}

### Со сворачиваемой панелью {#with-collapsible-panel}

Параметр `collapsible: true` у элемента позволяет панели свернуться за пределы `minSize`, а `collapsedSize` оставляет часть свёрнутой панели видимой. Слот панели даёт `collapsed`, `collapse` и `expand`, чтобы управлять ею программно, а события `collapse`, `expand` и `resize` приходят с индексом панели.

::component-example
---
collapse: true
name: 'splitter-collapsible-example'
---
::

### С вложенными Splitter {#with-nested-splitters}

Вложите `Splitter` в панель, чтобы получить двумерные раскладки в стиле IDE.

::component-example
---
collapse: true
name: 'splitter-nested-example'
---
::

### С собственной ручкой {#with-custom-handle}

По умолчанию ручка невидима. Пропс `b24ui` меняет её стиль, например делает видимым разделителем для сплошных раскладок, а слот `resize-handle` отрисовывает внутри неё содержимое, например рукоять.

::component-example
---
collapse: true
name: 'splitter-custom-handle-example'
---
::

### С сохранением раскладки {#with-persistence}

Пропс `auto-save-id` сохраняет раскладку в `localStorage` и восстанавливает её после перезагрузки.

```vue
<template>
  <B24Splitter id="my-layout" auto-save-id="my-layout" :items="items">
    <!-- ... -->
  </B24Splitter>
</template>
```

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme

## История изменений {#changelog}

:component-changelog
