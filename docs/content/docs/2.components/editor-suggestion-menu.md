---
title: EditorSuggestionMenu
description: 'Меню слэш-команд, которое показывает подсказки по форматированию и действиям при вводе /.'
category: editor
keywords:
  - слэш-команды
  - меню подсказок
  - вставка блоков
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/EditorSuggestionMenu.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/editor
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/editor-suggestion-menu
---

## Использование {#usage}

Компонент EditorSuggestionMenu показывает меню подсказок по форматированию и действиям, когда в редакторе вводят символ-триггер, и при выборе элемента выполняет соответствующий [обработчик](/docs/components/editor/#handlers).

::note
Он использует композабл `useEditorMenu` на основе утилиты [Suggestion](https://tiptap.dev/docs/editor/api/utilities/suggestion) из TipTap: элементы фильтруются по мере ввода, а по меню можно перемещаться с клавиатуры (стрелки, Enter для выбора, Escape для закрытия).
::

::caution
Компонент нужно использовать в слоте по умолчанию компонента [Editor](/docs/components/editor/), чтобы получить доступ к экземпляру редактора.
::

::component-example
---
elevated: true
collapse: true
name: 'editor-suggestion-menu-example'
class: 'p-8'
---
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- [`kind?: "textAlign" | "heading" | "link" | "image" | "blockquote" | "bulletList" | "orderedList" | "taskList" | "codeBlock" | "horizontalRule" | "paragraph" | "clearFormatting" | "duplicate" | "delete" | "moveUp" | "moveDown" | "suggestion" | "mention" | "emoji"`{lang="ts-type"}](/docs/components/editor/#handlers)
- `label?: string`{lang="ts-type"}
- `description?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `type?: "label" | "separator"`{lang="ts-type"}
- `disabled?: boolean`{lang="ts-type"}

::component-example
---
elevated: true
collapse: true
name: 'editor-suggestion-menu-items-example'
class: 'p-8'
---
::

::note
Чтобы получить отдельные группы элементов, передайте в `items` массив массивов.
::

::tip
`type: 'label'` задаёт заголовки разделов, а `type: 'separator'` — визуальные разделители: так команды удобнее собрать в логические группы.
::

### Символ {#char}

Пропс `char` меняет символ-триггер. По умолчанию `/`{lang="ts-type"}.

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorSuggestionMenu :editor="editor" :items="items" char=">" />
  </B24Editor>
</template>
```

### Подсказка {#suggestion}

Пропс `suggestion` настраивает [поведение сопоставления Suggestion](https://tiptap.dev/docs/editor/api/utilities/suggestion#settings) из TipTap.

Это нужно, если меню должно открываться сразу после других символов, а не только после пробела, как по умолчанию.

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorSuggestionMenu
      :editor="editor"
      :items="items"
      char=":"
      :suggestion="{
        allowedPrefixes: null
      }"
    />
  </B24Editor>
</template>
```

### Параметры {#options}

Пропс `options` настраивает позиционирование с помощью [параметров Floating UI](https://floating-ui.com/docs/computeposition#options).

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorSuggestionMenu
      :editor="editor"
      :items="items"
      :options="{
        placement: 'bottom-start',
        offset: 4
      }"
    />
  </B24Editor>
</template>
```

## API

### Пропсы {#props}

:component-props

## Тема {#theme}

:component-theme
