---
title: EditorToolbar
description: 'Настраиваемая панель инструментов редактора с несколькими режимами показа: фиксированная, всплывающая над выделением или плавающая.'
category: editor
keywords:
  - панель форматирования
  - панель инструментов редактора
  - жирный и курсив
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/EditorToolbar.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/editor
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/editor-toolbar
---

## Использование {#usage}

Компонент EditorToolbar показывает панель кнопок форматирования, состояние которых автоматически синхронизируется с содержимым редактора. Он поддерживает три режима раскладки через пакет `@tiptap/vue-3/menus`:
- `fixed`{lang="ts-type"} — всегда на виду;
- `bubble`{lang="ts-type"} — появляется при выделении текста;
- `floating`{lang="ts-type"} — появляется на пустых строках.

::caution
Компонент нужно использовать в слоте по умолчанию компонента [Editor](/docs/components/editor/), чтобы получить доступ к экземпляру редактора.
::

::component-example
---
elevated: true
collapse: true
name: 'editor-toolbar-example'
class: 'p-8'
---
::

::note
Раскладки bubble и floating используют расширения TipTap [`BubbleMenu`](https://tiptap.dev/docs/editor/extensions/functionality/bubble-menu) и [`FloatingMenu`](https://tiptap.dev/docs/editor/extensions/functionality/floatingmenu).
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- `label?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `color?: ButtonProps['color']`{lang="ts-type"}
- `activeColor?: ButtonProps['color']`{lang="ts-type"}
- `size?: ButtonProps['size']`{lang="ts-type"}
- [`kind?: "mark" | "textAlign" | "heading" | "link" | "image" | "blockquote" | "bulletList" | "orderedList" | "taskList" | "codeBlock" | "horizontalRule" | "paragraph" | "undo" | "redo" | "clearFormatting" | "duplicate" | "delete" | "moveUp" | "moveDown" | "suggestion" | "mention" | "emoji"`{lang="ts-type"}](/docs/components/editor/#handlers)
- `disabled?: boolean`{lang="ts-type"}
- `loading?: boolean`{lang="ts-type"}
- `active?: boolean`{lang="ts-type"}
- `tooltip?: TooltipProps`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-link-popover)
- `onClick?: (e: MouseEvent) => void`{lang="ts-type"}
- `items?: EditorToolbarItem[] | EditorToolbarItem[][]`{lang="ts-type"}
- `class?: any`{lang="ts-type"}

Можно передать любое свойство компонента [Button](/docs/components/button/#props): `color`, `size` и другие.

::component-example
---
elevated: true
collapse: true
name: 'editor-toolbar-items-example'
class: 'p-8'
---
::

::note
Чтобы получить отдельные группы элементов, передайте в `items` массив массивов.
::

::tip
Чтобы создать [DropdownMenu](/docs/components/dropdown-menu/), элемент может содержать массив `items` с такими же свойствами, как у пропса `items`.
::

### Раскладка {#layout}

Пропс `layout` меняет способ показа панели. По умолчанию `fixed`{lang="ts-type"}.

::component-example
---
elevated: true
collapse: true
name: 'editor-toolbar-layout-example'
class: 'p-8'
options:
  - name: layout
    label: Раскладка
    default: bubble
    items:
      - fixed
      - bubble
      - floating
---
::

### Параметры {#options}

В раскладках `bubble`{lang="ts-type"} и `floating`{lang="ts-type"} пропс `options` настраивает позиционирование с помощью [параметров Floating UI](https://floating-ui.com/docs/computeposition#options).

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorToolbar
      :editor="editor"
      :items="items"
      layout="bubble"
      :options="{
        placement: 'top',
        offset: 8,
        flip: { padding: 8 },
        shift: { padding: 8 }
      }"
    />
  </B24Editor>
</template>
```

### Условие показа {#should-show}

В раскладках `bubble`{lang="ts-type"} и `floating`{lang="ts-type"} пропс `should-show` определяет, когда появляется панель. Функция получает контекст состояния редактора и возвращает булево значение.

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorToolbar
      :editor="editor"
      :items="items"
      layout="bubble"
      :should-show="({ view, state }) => {
        const { selection } = state
        const { from, to } = selection
        const text = state.doc.textBetween(from, to)
        return view.hasFocus() && !selection.empty && text.length > 10
      }"
    />
  </B24Editor>
</template>
```

## Примеры {#examples}

### С панелью для изображений {#with-image-toolbar}

Пропс `should-show` позволяет сделать панели, которые появляются только для определённых типов узлов. В этом примере панель `bubble` с действиями «скачать» и «удалить» появляется только при выборе изображения.

::component-example
---
elevated: true
collapse: true
name: 'editor-toolbar-image-example'
class: 'p-8'
---
::

### С выпадающим окном для ссылки {#with-link-popover}

Этот пример показывает, как собрать своё выпадающее окно для ссылки через свойство `slot` у элементов панели и компонент [Popover](/docs/components/popover/).

1. Создайте Vue-компонент, который оборачивает [Popover](/docs/components/popover/) и позволяет редактировать ссылку:

::component-example
---
preview: false
collapse: true
name: 'editor-link-popover'
---
::

2. Используйте этот компонент в панели через именованный слот:

::component-example
---
elevated: true
collapse: true
name: 'editor-toolbar-custom-slot-example'
class: 'p-8'
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
