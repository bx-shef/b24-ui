---
title: EditorEmojiMenu
description: 'Меню подсказок эмодзи, которое автоматически появляется при вводе двоеточия в редакторе.'
category: editor
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/EditorEmojiMenu.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/editor
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/editor-emoji-menu
---

## Использование {#usage}

Компонент EditorEmojiMenu показывает меню подсказок эмодзи, когда в редакторе вводят символ `:`, и вставляет выбранное эмодзи. Для поддержки эмодзи он работает вместе с пакетом `@tiptap/extension-emoji`.

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
name: 'editor-emoji-menu-example'
class: 'p-8'
---
::

::warning
Пакет `@tiptap/extension-emoji` по умолчанию не установлен, его нужно установить отдельно.
::

::callout{to="https://tiptap.dev/docs/editor/extensions/nodes/emoji" target="_blank"}
Подробнее о расширении Emoji — в документации TipTap.
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- `name: string`{lang="ts-type"}
- `emoji: string`{lang="ts-type"}
- `shortcodes?: string[]`{lang="ts-type"}
- `tags?: string[]`{lang="ts-type"}
- `group?: string`{lang="ts-type"}
- `fallbackImage?: string`{lang="ts-type"}

::component-example
---
elevated: true
collapse: true
name: 'editor-emoji-menu-items-example'
class: 'p-8'
---
::

::note
Чтобы получить отдельные группы элементов, передайте в `items` массив массивов.
::

### Символ {#char}

Пропс `char` меняет символ-триггер. По умолчанию `:`{lang="ts-type"}.

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorEmojiMenu :editor="editor" :items="items" char=";" />
  </B24Editor>
</template>
```

### Подсказка {#suggestion}

Пропс `suggestion` настраивает [поведение сопоставления Suggestion](https://tiptap.dev/docs/editor/api/utilities/suggestion#settings) из TipTap.

Это нужно, если меню должно открываться сразу после других символов, а не только после пробела, как по умолчанию.

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorEmojiMenu
      :editor="editor"
      :items="items"
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
    <B24EditorEmojiMenu
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
