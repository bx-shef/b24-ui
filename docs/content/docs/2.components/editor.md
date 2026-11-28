---
title: Editor
description: 'Редактор форматированного текста на базе TipTap с поддержкой Markdown, HTML и JSON.'
category: editor
keywords:
  - текстовый редактор
  - редактор форматированного текста
  - WYSIWYG
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Editor.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/editor
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/editor
  - label: TipTap
    avatar:
      src: https://github.com/ueberdosis.png
      loading: lazy
    to: https://tiptap.dev/
---

## Использование {#usage}

Компонент Editor — мощный редактор форматированного текста на базе [TipTap](https://tiptap.dev/). Он поддерживает несколько форматов содержимого (JSON, HTML, Markdown), настраиваемые панели инструментов, перетаскивание блоков, слэш-команды, упоминания, выбор эмодзи и расширяемую архитектуру для своих возможностей.

::component-example
---
source: false
elevated: true
name: 'editor-example'
class: 'relative h-176 !p-0 rounded-b-md'
---
::

::callout{icon-name="GitHubIcon" to="https://github.com/bitrix24/b24ui/blob/main/docs/app/components/content/examples/editor/EditorExample.vue" aria-label="Посмотреть исходный код"}
В этом примере показан Editor, готовый к использованию в продакшене. Исходный код — на GitHub.
::

::warning
Если при работе с Editor или его расширениями возникают ошибки prosemirror вроде `Adding different instances of a keyed plugin`, добавьте пакеты prosemirror в список `vite.optimizeDeps.include` в файле `nuxt.config.ts`. Тогда Vite предварительно собирает эти зависимости и не загружает несколько экземпляров.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  vite: {
    optimizeDeps: {
      include: [
        '@bxshefby/b24ui-nuxt > prosemirror-state',
        '@bxshefby/b24ui-nuxt > prosemirror-transform',
        '@bxshefby/b24ui-nuxt > prosemirror-model',
        '@bxshefby/b24ui-nuxt > prosemirror-view',
        '@bxshefby/b24ui-nuxt > prosemirror-gapcursor'
      ]
    }
  }
})
```
::


### Содержимое {#content}

Директива `v-model` управляет значением Editor.

::component-code
---
elevated: true
prettier: true
collapse: true
ignore:
  - modelValue.type
  - modelValue.content
  - class
external:
  - modelValue
class: 'p-8'
props:
  modelValue:
    type: 'doc'
    content:
      - type: 'heading'
        attrs:
          level: 1
        content:
          - type: 'text'
            text: 'Привет, мир'
      - type: 'paragraph'
        content:
          - type: 'text'
            text: 'Это редактор '
          - type: 'text'
            marks:
              - type: 'bold'
            text: 'форматированного текста'
          - type: 'text'
            text: '.'
  class: 'w-full min-h-21'
---
::

### Тип содержимого {#content-type}

Editor сам определяет формат содержимого по типу `v-model`: строки считаются `html`{lang="ts-type"}, объекты — `json`{lang="ts-type"}.

Формат можно задать явно пропсом `content-type`: `json`{lang="ts-type"}, `html`{lang="ts-type"} или `markdown`{lang="ts-type"}.

::component-code
---
elevated: true
prettier: true
ignore:
  - modelValue
  - contentType
  - class
external:
  - modelValue
class: 'p-8'
props:
  modelValue: |
    <h1>Привет, мир</h1>
    <p>Это редактор <strong>форматированного текста</strong>.</p>
  contentType: 'html'
  class: 'w-full min-h-21'
---
::

### Расширения {#extensions}

В Editor по умолчанию включены расширения:

- [**StarterKit**](#starter-kit) — базовые возможности редактирования (жирный, курсив, заголовки, списки и другое);
- [**Placeholder**](#placeholder) — текст плейсхолдера (если задан пропс placeholder);
- **Image** — вставка и показ изображений;
- **Mention** — поддержка упоминаний через @;
- **Markdown** — разбор и сериализация Markdown (если тип содержимого — markdown).

::note
Каждое встроенное расширение настраивается своим пропсом (`starter-kit`, `placeholder`, `image`, `mention`, `markdown`) через параметры TipTap.
::

Пропс `extensions` добавляет дополнительные расширения TipTap и расширяет возможности Editor:

```vue
<script setup lang="ts">
import { Emoji } from '@tiptap/extension-emoji'
import { TextAlign } from '@tiptap/extension-text-align'

const value = ref('<h1>Hello World</h1>\n')
</script>

<template>
  <B24Editor
    v-model="value"
    :extensions="[
      Emoji,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      })
    ]"
  />
</template>
```

::tip{to="#with-image-upload"}
Пример загрузки изображений показывает, как создавать собственные расширения TipTap.
::

### Плейсхолдер {#placeholder}

Пропс `placeholder` задаёт текст плейсхолдера, который показывается в пустых абзацах.

::component-code
---
elevated: true
prettier: true
ignore:
  - modelValue
  - contentType
  - placeholder
  - class
external:
  - modelValue
class: 'p-8'
props:
  modelValue: ''
  placeholder: 'Начните писать...'
  class: 'w-full min-h-7'
---
::

::note
Пропс `placeholder` принимает строку или объект с [PlaceholderOptions](https://tiptap.dev/docs/editor/extensions/functionality/placeholder) и дополнительным свойством `mode`:
- `everyLine` — плейсхолдер в каждой пустой строке при фокусе (по умолчанию);
- `firstLine` — плейсхолдер только в первой строке, когда редактор пуст.

```vue
<template>
  <B24Editor :placeholder="{ placeholder: 'Start writing...', mode: 'firstLine' }" />
</template>
```
::

::tip
По умолчанию плейсхолдеры показываются только в пустых узлах верхнего уровня. Чтобы показывать их во вложенных элементах, например в пунктах списка, задайте `includeChildren: true`:

```vue
<template>
  <B24Editor :placeholder="{ placeholder: 'Start writing...', includeChildren: true }" />
</template>
```
::

::callout{to="https://tiptap.dev/docs/editor/extensions/functionality/placeholder" target="_blank"}
Подробнее о расширении Placeholder — в документации TipTap.
::

### Starter Kit {#starter-kit}

Пропс `starter-kit` настраивает встроенное расширение TipTap StarterKit, в которое входят типичные возможности редактора: жирный текст, курсив, заголовки, списки, цитаты, блоки кода и другое.

```vue
<script setup lang="ts">
const value = ref('<h1>Hello World</h1>\n')
</script>

<template>
  <B24Editor
    v-model="value"
    :starter-kit="{
      blockquote: false,
      headings: {
        levels: [1, 2, 3, 4]
      },
      dropcursor: {
        color: 'var(--ui-color-accent-main-primary)',
        width: 2
      },
      link: {
        openOnClick: false
      }
    }"
  />
</template>
```

::tip
Значение `false` у `starter-kit` превращает Editor в редактор простого текста. Остаются только базовые узлы (абзац, текст, история), а все возможности форматирования отключаются: жирный текст, курсив, заголовки, списки, код, цитаты, ссылки и горизонтальные линии.
::

::callout{to="https://tiptap.dev/docs/editor/extensions/functionality/starterkit" target="_blank"}
Подробнее о расширении StarterKit — в документации TipTap.
::

### Обработчики {#handlers}

Обработчики оборачивают встроенные команды TipTap и дают единый интерфейс для действий редактора. Если элементу [EditorToolbar](/docs/components/editor-toolbar/) или [EditorSuggestionMenu](/docs/components/editor-suggestion-menu/) задать свойство `kind`, соответствующий обработчик выполнит команду TipTap и будет следить за её состоянием (активна, отключена и так далее).

#### Обработчики по умолчанию {#default-handlers}

В Editor есть такие обработчики по умолчанию. Их можно указывать в элементах панели инструментов или меню подсказок через свойство `kind`:

| Обработчик | Описание | Использование |
|---------|-------------|-------|
| `mark`{lang="ts-type"} | Переключает текстовые выделения (жирный, курсив, зачёркнутый, код, подчёркнутый) | Нужно свойство `mark` в элементе |
| `textAlign`{lang="ts-type"} | Задаёт выравнивание текста (слева, по центру, справа, по ширине) | Нужно свойство `align` в элементе |
| `heading`{lang="ts-type"} | Переключает уровни заголовков (1–6) | Нужно свойство `level` в элементе |
| `link`{lang="ts-type"} | Добавляет, редактирует или удаляет ссылки | Если URL не задан, запрашивает его |
| `image`{lang="ts-type"} | Вставляет изображения | Если URL не задан, запрашивает его |
| `blockquote`{lang="ts-type"} | Переключает цитаты | |
| `bulletList`{lang="ts-type"} | Переключает маркированные списки | Преобразует списки |
| `orderedList`{lang="ts-type"} | Переключает нумерованные списки | Преобразует списки |
| `taskList`{lang="ts-type"} | Переключает списки задач | Преобразует списки |
| `codeBlock`{lang="ts-type"} | Переключает блоки кода | |
| `horizontalRule`{lang="ts-type"} | Вставляет горизонтальные линии | |
| `paragraph`{lang="ts-type"} | Задаёт формат абзаца | |
| `undo`{lang="ts-type"} | Отменяет последнее изменение | |
| `redo`{lang="ts-type"} | Возвращает отменённое изменение | |
| `clearFormatting`{lang="ts-type"} | Убирает всё форматирование | Работает с выделением или позицией |
| `duplicate`{lang="ts-type"} | Дублирует узел | Нужно свойство `pos` в элементе |
| `delete`{lang="ts-type"} | Удаляет узел | Нужно свойство `pos` в элементе |
| `moveUp`{lang="ts-type"} | Перемещает узел вверх | Нужно свойство `pos` в элементе |
| `moveDown`{lang="ts-type"} | Перемещает узел вниз | Нужно свойство `pos` в элементе |
| `suggestion`{lang="ts-type"} | Вызывает меню подсказок | Вставляет символ `/` |
| `mention`{lang="ts-type"} | Вызывает меню упоминаний | Вставляет символ `@` |
| `emoji`{lang="ts-type"} | Вызывает выбор эмодзи | Вставляет символ `:` |

::warning
Обработчики `taskList` и `textAlign` работают, только если установлены соответствующие расширения: в Editor их по умолчанию нет.
::

Так обработчики по умолчанию используются в элементах панели инструментов или меню подсказок:

```vue
<script setup lang="ts">
import type { EditorToolbarItem } from '@bxshefby/b24ui-nuxt'
import BoldIcon from '@bitrix24/b24icons-vue/outline/BoldIcon'
import ItalicIcon from '@bitrix24/b24icons-vue/outline/ItalicIcon'
import AlignLeftIcon from '@bitrix24/b24icons-vue/outline/AlignLeftIcon'
import AlignCenterIcon from '@bitrix24/b24icons-vue/outline/AlignCenterIcon'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import NumberedListIcon from '@bitrix24/b24icons-vue/outline/NumberedListIcon'
import QuoteIcon from '@bitrix24/b24icons-vue/outline/QuoteIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'

const value = ref('<h1>Hello World</h1>\n')

const items: EditorToolbarItem[] = [
  { kind: 'mark', mark: 'bold', icon: BoldIcon },
  { kind: 'mark', mark: 'italic', icon: ItalicIcon },
  { kind: 'heading', level: 1 },
  { kind: 'heading', level: 2 },
  { kind: 'textAlign', align: 'left', icon: AlignLeftIcon },
  { kind: 'textAlign', align: 'center', icon: AlignCenterIcon },
  { kind: 'bulletList', icon: BulletedListIcon },
  { kind: 'orderedList', icon: NumberedListIcon },
  { kind: 'blockquote', icon: QuoteIcon },
  { kind: 'link', icon: LinkIcon }
]
</script>

<template>
  <B24Editor v-slot="{ editor }" v-model="value">
    <B24EditorToolbar :editor="editor" :items="items" />
  </B24Editor>
</template>
```

#### Свои обработчики {#custom-handlers}

Пропс `handlers` расширяет или переопределяет обработчики по умолчанию. Свои обработчики объединяются со стандартными, поэтому можно добавлять новые действия и менять поведение существующих.

Каждый обработчик реализует интерфейс `EditorHandler`{lang="ts-type"}:

```ts
interface EditorHandler {
  /* Проверяет, можно ли выполнить команду в текущем состоянии редактора */
  canExecute: (editor: Editor, item?: any) => boolean
  /* Выполняет команду и возвращает цепочку Tiptap */
  execute: (editor: Editor, item?: any) => any
  /* Определяет, выглядит ли элемент активным (для переключателей) */
  isActive: (editor: Editor, item?: any) => boolean
  /* Дополнительная проверка для отключения элемента (объединяется с `canExecute`) */
  isDisabled?: (editor: Editor, item?: any) => boolean
}
```

Пример собственных обработчиков:

```vue
<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import type { EditorCustomHandlers, EditorToolbarItem } from '@bxshefby/b24ui-nuxt'
import BoldIcon from '@bitrix24/b24icons-vue/outline/BoldIcon'
import TextColorIcon from '@bitrix24/b24icons-vue/editor/TextColorIcon'

const value = ref('<h1>Hello World</h1>\n')

const customHandlers = {
  highlight: {
    canExecute: (editor: Editor) => editor.can().toggleHighlight(),
    execute: (editor: Editor) => editor.chain().focus().toggleHighlight(),
    isActive: (editor: Editor) => editor.isActive('highlight'),
    isDisabled: (editor: Editor) => !editor.isEditable
  }
} satisfies EditorCustomHandlers

const items = [
  // Встроенный обработчик
  { kind: 'mark', mark: 'bold', icon: BoldIcon },
  // Свой обработчик
  { kind: 'highlight', icon: TextColorIcon }
] satisfies EditorToolbarItem<typeof customHandlers>[]
</script>

<template>
  <B24Editor v-slot="{ editor }" v-model="value" :handlers="customHandlers">
    <B24EditorToolbar :editor="editor" :items="items" />
  </B24Editor>
</template>
```

::tip{to="#with-image-upload"}
Полный пример с собственными обработчиками показывает загрузка изображений.
::

## Примеры {#examples}

### С панелью инструментов {#with-toolbar}

Компонент [EditorToolbar](/docs/components/editor-toolbar/) добавляет в Editor панель инструментов `fixed`, `bubble` или `floating` с типичными действиями форматирования.

::component-example
---
elevated: true
collapse: true
prettier: true
name: 'editor-toolbar-example'
class: 'p-8'
---
::

### С ручкой перетаскивания {#with-drag-handle}

Компонент [EditorDragHandle](/docs/components/editor-drag-handle/) добавляет ручку для перетаскивания блоков.

::component-example
---
elevated: true
collapse: true
prettier: true
name: 'editor-drag-handle-example'
class: 'p-8'
---
::

### С меню подсказок {#with-suggestion-menu}

Компонент [EditorSuggestionMenu](/docs/components/editor-suggestion-menu/) добавляет слэш-команды для быстрого форматирования и вставки.

::component-example
---
elevated: true
collapse: true
prettier: true
name: 'editor-suggestion-menu-example'
class: 'p-8'
---
::

### С меню упоминаний {#with-mention-menu}

Компонент [EditorMentionMenu](/docs/components/editor-mention-menu/) добавляет упоминания через @ для тегов пользователей и других сущностей.

::component-example
---
elevated: true
collapse: true
prettier: true
name: 'editor-mention-menu-example'
class: 'p-8'
---
::

### С меню эмодзи {#with-emoji-menu}

Компонент [EditorEmojiMenu](/docs/components/editor-emoji-menu/) добавляет выбор эмодзи.

::component-example
---
elevated: true
collapse: true
prettier: true
name: 'editor-emoji-menu-example'
class: 'p-8'
---
::

### С загрузкой изображений {#with-image-upload}

В этом примере загрузка изображений собрана так: пропс `extensions` регистрирует свой узел TipTap, а пропс `handlers` определяет, как кнопка панели запускает загрузку.

1. Создайте Vue-компонент на основе [FileUpload](/docs/components/file-upload/):

::component-example
---
preview: false
collapse: true
name: 'editor-image-upload-node'
---
::

2. Создайте своё расширение TipTap, которое регистрирует узел:

::component-example
---
preview: false
collapse: true
lang: 'ts'
name: 'editor-image-upload-extension'
---
::

3. Подключите своё расширение в Editor:

::component-example
---
elevated: true
collapse: true
prettier: true
name: 'editor-image-upload-example'
class: '!p-0'
---
::

::callout{to="https://tiptap.dev/docs/editor/extensions/custom-extensions" target="_blank"}
Подробнее о создании своих расширений — в документации TipTap.
::

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
| `editor`{lang="ts-type"} | `Ref<Editor \| undefined>`{lang="ts-type"} |

::callout{to="https://tiptap.dev/docs/editor/api/editor" target="_blank"}
Доступный через ref экземпляр — это API редактора TipTap. Все методы и свойства описаны в документации TipTap.
::

## Тема {#theme}

:component-theme
