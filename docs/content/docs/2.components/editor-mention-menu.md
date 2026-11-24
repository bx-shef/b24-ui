---
title: EditorMentionMenu
description: 'Меню упоминаний, которое показывает подсказки пользователей, когда в редакторе вводят символ-триггер.'
category: editor
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/EditorMentionMenu.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/editor
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/editor-mention-menu
---

## Использование {#usage}

Компонент EditorMentionMenu показывает меню подсказок пользователей, когда в редакторе вводят символ-триггер (по умолчанию `@`), и вставляет выбранное упоминание через пакет `@tiptap/extension-mention`. Символ-триггер также служит префиксом вставленного упоминания.

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
name: 'editor-mention-menu-example'
class: 'p-8'
---
::

::callout{to="https://tiptap.dev/docs/editor/extensions/nodes/mention" target="_blank"}
Подробнее о расширении Mention — в документации TipTap.
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- `label: string`{lang="ts-type"}
- `avatar?: AvatarProps`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `description?: string`{lang="ts-type"}
- `disabled?: boolean`{lang="ts-type"}

::component-example
---
elevated: true
collapse: true
name: 'editor-mention-menu-items-example'
class: 'p-8'
---
::

::note
Чтобы получить отдельные группы элементов, передайте в `items` массив массивов.
::

### Символ {#char}

Пропс `char` меняет символ-триггер. По умолчанию `@`{lang="ts-type"}. Символ-триггер также служит префиксом вставленного упоминания (например, `#channel` вместо `@channel`).

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorMentionMenu :editor="editor" :items="channels" char="#" />
  </B24Editor>
</template>
```

::note
В одном редакторе можно использовать несколько компонентов `EditorMentionMenu` с разными пропсами `char` и `plugin-key`, чтобы поддержать разные типы упоминаний.

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorMentionMenu :editor="editor" :items="users" plugin-key="mentionMenu" />
    <B24EditorMentionMenu :editor="editor" :items="tags" char="#" plugin-key="tagMenu" />
  </B24Editor>
</template>
```
::

### Подсказка {#suggestion}

Пропс `suggestion` настраивает [поведение сопоставления Suggestion](https://tiptap.dev/docs/editor/api/utilities/suggestion#settings) из TipTap.

Это нужно, если меню должно открываться сразу после других символов, а не только после пробела, как по умолчанию.

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorMentionMenu
      :editor="editor"
      :items="items"
      char="#"
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
    <B24EditorMentionMenu
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

## Примеры {#examples}

### Игнорирование фильтра {#with-ignore-filter}

Пропс `ignore-filter` со значением `true` отключает встроенный поиск, и вы используете свою логику поиска. Директива `v-model:search-term` даёт доступ к текущему запросу, по которому можно получать элементы из API.

::component-example
---
elevated: true
collapse: true
name: 'editor-mention-menu-ignore-filter-example'
class: 'p-8'
---
::

::note
В этом примере [`refDebounced`](https://vueuse.org/shared/refDebounced/) откладывает вызовы API.
::

## API

### Пропсы {#props}

:component-props

## Тема {#theme}

:component-theme
