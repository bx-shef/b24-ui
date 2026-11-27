---
title: EditorDragHandle
description: 'Ручка для перетаскивания, с помощью которой блоки редактора переупорядочивают и выделяют.'
category: editor
keywords:
  - ручка блока
  - перетаскивание блоков
  - перенос блока редактора
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/EditorDragHandle.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/editor
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/editor-drag-handle
---

## Использование {#usage}

Компонент EditorDragHandle добавляет перетаскивание для изменения порядка блоков редактора. Он использует пакет `@tiptap/extension-drag-handle-vue-3`.

::caution
Компонент нужно использовать в слоте по умолчанию компонента [Editor](/docs/components/editor/), чтобы получить доступ к экземпляру редактора.
::

Компонент расширяет [Button](/docs/components/button/), поэтому ему можно передать любое свойство: `color`, `size` и другие.

::component-example
---
collapse: true
elevated: true
name: 'editor-drag-handle-example'
class: 'p-8'
---
::

::callout{to="https://tiptap.dev/docs/editor/extensions/functionality/drag-handle-vue" target="_blank"}
Подробнее о расширении Drag Handle — в документации TipTap.
::

### Иконка {#icon}

Пропс `icon` задаёт иконку ручки.

```vue
<script setup lang="ts">
import DragLIcon from '@bitrix24/b24icons-vue/outline/DragLIcon'
</script>

<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorDragHandle :editor="editor" :icon="DragLIcon" />
  </B24Editor>
</template>
```

### Параметры {#options}

Пропс `options` настраивает позиционирование с помощью [параметров Floating UI](https://floating-ui.com/docs/computeposition#options).

::note
Смещение вычисляется автоматически: у небольших блоков ручка центрируется, у высоких — выравнивается по верхнему краю.
::

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorDragHandle
      :editor="editor"
      :options="{
        placement: 'left'
      }"
    />
  </B24Editor>
</template>
```

## Примеры {#examples}

### С выпадающим меню {#with-dropdown-menu}

В слот по умолчанию можно добавить [DropdownMenu](/docs/components/dropdown-menu/) с действиями над блоком: дублировать, удалить, переместить вверх или вниз, преобразовать в другой тип.

Событие `@node-change` отслеживает блок под курсором и его позицию, а `editor.chain().setMeta('lockDragHandle', open).run()`{lang="ts-type"} фиксирует положение ручки, пока меню открыто.

::component-example
---
elevated: true
collapse: true
name: 'editor-drag-handle-dropdown-menu-example'
class: 'p-8'
---
::

::note
В этом примере утилита `mapEditorItems` из `@bitrix24/b24ui-nuxt/utils/editor` сопоставляет виды обработчиков (`duplicate`, `delete`, `moveUp` и другие) с командами редактора и сама управляет состоянием.
::

### С меню подсказок {#with-suggestion-menu}

В слот по умолчанию можно добавить рядом с ручкой кнопку [Button](/docs/components/button/), которая открывает [EditorSuggestionMenu](/docs/components/editor-suggestion-menu/).

Функция слота `onClick` возвращает позицию текущего блока, а `handlers.suggestion?.execute(editor, { pos: node?.pos }).run()`{lang="ts-type"} вставляет новые блоки в эту позицию.

::component-example
---
elevated: true
collapse: true
name: 'editor-drag-handle-suggestion-menu-example'
class: '!p-0'
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
