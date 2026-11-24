<script setup lang="ts">
import type { EditorCustomHandlers, EditorToolbarItem, EditorSuggestionMenuItem, EditorMentionMenuItem, EditorEmojiMenuItem, DropdownMenuItem } from '@bitrix24/b24ui-nuxt'
import type { Editor, JSONContent } from '@tiptap/vue-3'
import { upperFirst } from 'scule'
import { mapEditorItems } from '@bitrix24/b24ui-nuxt/utils/editor'
import { Emoji, gitHubEmojis } from '@tiptap/extension-emoji'
import { TextAlign } from '@tiptap/extension-text-align'
import { CodeBlockShiki } from 'tiptap-extension-code-block-shiki'
import { ImageUpload } from './EditorImageUploadExtension'
import EditorLinkPopover from './EditorLinkPopover.vue'
import UndoIcon from '@bitrix24/b24icons-vue/outline/UndoIcon'
import RedoIcon from '@bitrix24/b24icons-vue/outline/RedoIcon'
import HeaderIcon from '@bitrix24/b24icons-vue/editor/HeaderIcon'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import NumberedListIcon from '@bitrix24/b24icons-vue/outline/NumberedListIcon'
import QuoteIcon from '@bitrix24/b24icons-vue/outline/QuoteIcon'
import CodeIcon from '@bitrix24/b24icons-vue/common-service/CodeIcon'
import BoldIcon from '@bitrix24/b24icons-vue/outline/BoldIcon'
import ItalicIcon from '@bitrix24/b24icons-vue/outline/ItalicIcon'
import UnderlineIcon from '@bitrix24/b24icons-vue/outline/UnderlineIcon'
import StrikethroughIcon from '@bitrix24/b24icons-vue/outline/StrikethroughIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import ImageIcon from '@bitrix24/b24icons-vue/outline/ImageIcon'
import AlignLeftIcon from '@bitrix24/b24icons-vue/outline/AlignLeftIcon'
import AlignCenterIcon from '@bitrix24/b24icons-vue/outline/AlignCenterIcon'
import AlignRightIcon from '@bitrix24/b24icons-vue/outline/AlignRightIcon'
import AlignJustifyIcon from '@bitrix24/b24icons-vue/outline/AlignJustifyIcon'
import TextIcon from '@bitrix24/b24icons-vue/outline/TextIcon'
import DownloadIcon from '@bitrix24/b24icons-vue/outline/DownloadIcon'
import RefreshIcon from '@bitrix24/b24icons-vue/outline/RefreshIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'
import RepeatIcon from '@bitrix24/b24icons-vue/outline/RepeatIcon'
import ResumeIcon from '@bitrix24/b24icons-vue/outline/ResumeIcon'
import CopyIcon from '@bitrix24/b24icons-vue/outline/CopyIcon'
import CopyFileIcon from '@bitrix24/b24icons-vue/crm/CopyFileIcon'
import ArrowTopLIcon from '@bitrix24/b24icons-vue/outline/ArrowTopLIcon'
import ArrowDownLIcon from '@bitrix24/b24icons-vue/outline/ArrowDownLIcon'
import MentionIcon from '@bitrix24/b24icons-vue/outline/MentionIcon'
import SmileIcon from '@bitrix24/b24icons-vue/outline/SmileIcon'
import HrIcon from '@bitrix24/b24icons-vue/editor/HrIcon'
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'
import DragLIcon from '@bitrix24/b24icons-vue/outline/DragLIcon'

const value = ref(`# Создание современных интерфейсов с Bitrix24 UI

Добро пожаловать в **Bitrix24 UI Editor** — мощный редактор форматированного текста на основе [TipTap](https://tiptap.dev). Он сочетает *гибкость* и простоту использования, поэтому создавать контент легко.

![Placeholder](https://bitrix24.github.io/b24ui/assets/demo/b24rich_new.png)

## Богатые возможности форматирования

Редактор поддерживает всё привычное форматирование текста: **жирный**, *курсив*, <u>подчёркнутый</u>, ~~зачёркнутый~~ и \`строчный код\`. Их можно сочетать, например **_жирный курсив_**.

### Интерактивные возможности

Попробуйте эти возможности:

- **Всплывающее меню** — выделите текст, чтобы появились параметры форматирования
- **Слэш-команды** — введите \`/\` для быстрого доступа к блокам и форматированию
- **Упоминания** — используйте \`@\`, чтобы отметить людей или сущности
- **Выбор эмодзи** — введите \`:\` и название эмодзи, например :smile:
- **Перетаскивание** — наведите курсор на блок, чтобы увидеть ручку перетаскивания

> **Совет:** используйте сочетания клавиш, например Cmd/Ctrl + B для жирного, Cmd/Ctrl + I для курсива и другие!

### Расширенные возможности

1. **Собственные расширения** — добавляйте свои расширения TipTap без лишних усилий
2. **Разные типы содержимого** — поддержка JSON, HTML и Markdown
3. **Настраиваемые панели инструментов** — раскладки fixed, bubble и floating
4. **Интеграция с темами** — полностью оформлен системой тем Bitrix24 UI

#### Блоки кода

Подходит для технической документации:

\`\`\`vue
<template>
  <B24Editor v-model="value" content-type="markdown" />
</template>
\`\`\`

---

Строите ли вы блог, сайт документации или систему управления контентом, Bitrix24 UI Editor даёт всё необходимое для профессиональной работы с текстом. Загляните на [bitrix24.github.io/b24ui](https://bitrix24.github.io/b24ui/), чтобы познакомиться с другими компонентами.`)

const customHandlers = {
  imageUpload: {
    canExecute: (editor: Editor) => editor.can().insertContent({ type: 'imageUpload' }),
    execute: (editor: Editor) => editor.chain().focus().insertContent({ type: 'imageUpload' }),
    isActive: (editor: Editor) => editor.isActive('imageUpload'),
    isDisabled: undefined
  }
} satisfies EditorCustomHandlers

const fixedToolbarItems = [
  [
    {
      kind: 'undo',
      icon: UndoIcon,
      tooltip: { text: 'Отменить' }
    },
    {
      kind: 'redo',
      icon: RedoIcon,
      tooltip: { text: 'Повторить' }
    }
  ],
  [
    {
      icon: HeaderIcon,
      tooltip: { text: 'Заголовки' },
      content: { align: 'start' },
      items: [
        {
          kind: 'heading',
          level: 1,
          label: 'Заголовок 1'
        },
        {
          kind: 'heading',
          level: 2,
          label: 'Заголовок 2'
        }, {
          kind: 'heading',
          level: 3,
          label: 'Заголовок 3'
        }, {
          kind: 'heading',
          level: 4,
          label: 'Заголовок 4'
        }
      ]
    },
    {
      icon: BulletedListIcon,
      tooltip: { text: 'Списки' },
      content: { align: 'start' },
      items: [
        {
          kind: 'bulletList',
          icon: BulletedListIcon,
          label: 'Маркированный список'
        },
        {
          kind: 'orderedList',
          icon: NumberedListIcon,
          label: 'Нумерованный список'
        }
      ]
    },
    {
      kind: 'blockquote',
      icon: QuoteIcon,
      tooltip: { text: 'Цитата' }
    },
    {
      kind: 'codeBlock',
      icon: CodeIcon,
      tooltip: { text: 'Блок кода' }
    }
  ],
  [
    {
      kind: 'mark',
      mark: 'bold',
      icon: BoldIcon,
      tooltip: { text: 'Жирный' }
    },
    {
      kind: 'mark',
      mark: 'italic',
      icon: ItalicIcon,
      tooltip: { text: 'Курсив' }
    },
    {
      kind: 'mark',
      mark: 'underline',
      icon: UnderlineIcon,
      tooltip: { text: 'Подчёркнутый' }
    },
    {
      kind: 'mark',
      mark: 'strike',
      icon: StrikethroughIcon,
      tooltip: { text: 'Зачёркнутый' }
    },
    {
      kind: 'mark',
      mark: 'code',
      icon: DeveloperResourcesIcon,
      tooltip: { text: 'Код' }
    }
  ],
  [
    {
      slot: 'link' as const,
      icon: LinkIcon
    },
    {
      kind: 'imageUpload',
      icon: ImageIcon,
      tooltip: { text: 'Изображение' }
    }
  ],
  [
    {
      icon: AlignJustifyIcon,
      tooltip: { text: 'Выравнивание текста' },
      content: { align: 'end' },
      items: [
        {
          kind: 'textAlign',
          align: 'left',
          icon: AlignLeftIcon,
          label: 'По левому краю'
        },
        {
          kind: 'textAlign',
          align: 'center',
          icon: AlignCenterIcon,
          label: 'По центру'
        },
        {
          kind: 'textAlign',
          align: 'right',
          icon: AlignRightIcon,
          label: 'По правому краю'
        },
        {
          kind: 'textAlign',
          align: 'justify',
          icon: AlignJustifyIcon,
          label: 'По ширине'
        }
      ]
    }
  ]
] satisfies EditorToolbarItem<typeof customHandlers>[][]

const bubbleToolbarItems = computed(() => [
  [
    {
      label: 'Преобразовать в',
      useDropdown: true,
      activeColor: 'air-secondary-no-accent',
      tooltip: { text: 'Преобразовать в' },
      content: { align: 'start' },
      b24ui: { label: 'text-xs' },
      items: [
        {
          type: 'label',
          label: 'Преобразовать в'
        },
        {
          kind: 'paragraph',
          label: 'Абзац',
          icon: TextIcon
        },
        {
          kind: 'heading',
          level: 1,
          label: 'Заголовок 1'
        },
        {
          kind: 'heading',
          level: 2,
          label: 'Заголовок 2'
        },
        {
          kind: 'heading',
          level: 3,
          label: 'Заголовок 3'
        },
        {
          kind: 'heading',
          level: 4,
          label: 'Заголовок 4'
        },
        {
          kind: 'bulletList',
          icon: BulletedListIcon,
          label: 'Маркированный список'
        },
        {
          kind: 'orderedList',
          icon: NumberedListIcon,
          label: 'Нумерованный список'
        },
        {
          kind: 'blockquote',
          icon: QuoteIcon,
          label: 'Цитата'
        },
        {
          kind: 'codeBlock',
          icon: CodeIcon,
          label: 'Блок кода'
        }
      ]
    }
  ],
  [
    {
      kind: 'mark',
      mark: 'bold',
      icon: BoldIcon,
      tooltip: { text: 'Жирный' }
    }, {
      kind: 'mark',
      mark: 'italic',
      icon: ItalicIcon,
      tooltip: { text: 'Курсив' }
    }, {
      kind: 'mark',
      mark: 'underline',
      icon: UnderlineIcon,
      tooltip: { text: 'Подчёркнутый' }
    }, {
      kind: 'mark',
      mark: 'strike',
      icon: StrikethroughIcon,
      tooltip: { text: 'Зачёркнутый' }
    },
    {
      kind: 'mark',
      mark: 'code',
      icon: DeveloperResourcesIcon,
      tooltip: { text: 'Код' }
    }
  ],
  [
    {
      slot: 'link' as const,
      icon: LinkIcon
    },
    {
      kind: 'imageUpload',
      icon: ImageIcon,
      tooltip: { text: 'Изображение' }
    }
  ],
  [
    {
      icon: AlignJustifyIcon,
      tooltip: { text: 'Выравнивание текста' },
      content: {
        align: 'end'
      },
      items: [
        {
          kind: 'textAlign',
          align: 'left',
          icon: AlignLeftIcon,
          label: 'По левому краю'
        },
        {
          kind: 'textAlign',
          align: 'center',
          icon: AlignCenterIcon,
          label: 'По центру'
        },
        {
          kind: 'textAlign',
          align: 'right',
          icon: AlignRightIcon,
          label: 'По правому краю'
        },
        {
          kind: 'textAlign',
          align: 'justify',
          icon: AlignJustifyIcon,
          label: 'По ширине'
        }
      ]
    }
  ]
] satisfies EditorToolbarItem<typeof customHandlers>[][])

const imageToolbarItems = (editor: Editor): EditorToolbarItem[][] => {
  const node = editor.state.doc.nodeAt(editor.state.selection.from)

  return [
    [
      {
        icon: DownloadIcon,
        to: node?.attrs?.src,
        download: true,
        tooltip: { text: 'Скачать' }
      },
      {
        icon: RefreshIcon,
        tooltip: { text: 'Заменить' },
        onClick: () => {
          const { state } = editor
          const { selection } = state

          const pos = selection.from
          const node = state.doc.nodeAt(pos)

          if (node && node.type.name === 'image') {
            editor.chain().focus().deleteRange({ from: pos, to: pos + node.nodeSize }).insertContentAt(pos, { type: 'imageUpload' }).run()
          }
        }
      }
    ],
    [
      {
        icon: TrashcanIcon,
        tooltip: { text: 'Удалить' },
        onClick: () => {
          const { state } = editor
          const { selection } = state

          const pos = selection.from
          const node = state.doc.nodeAt(pos)

          if (node && node.type.name === 'image') {
            editor.chain().focus().deleteRange({ from: pos, to: pos + node.nodeSize }).run()
          }
        }
      }
    ]
  ]
}

const selectedNode = ref<{ node: JSONContent, pos: number }>()

const handleItems = (editor: Editor): DropdownMenuItem[][] => {
  if (!selectedNode.value?.node?.type) {
    return []
  }

  return mapEditorItems(editor, [
    [
      {
        type: 'label',
        label: upperFirst(selectedNode.value.node.type)
      },
      {
        label: 'Преобразовать в',
        icon: RepeatIcon,
        children: [
          { kind: 'paragraph', label: 'Абзац', icon: TextIcon },
          { kind: 'heading', level: 1, label: 'Заголовок 1' },
          { kind: 'heading', level: 2, label: 'Заголовок 2' },
          { kind: 'heading', level: 3, label: 'Заголовок 3' },
          { kind: 'heading', level: 4, label: 'Заголовок 4' },
          { kind: 'bulletList', label: 'Маркированный список', icon: BulletedListIcon },
          { kind: 'orderedList', label: 'Нумерованный список', icon: NumberedListIcon },
          { kind: 'blockquote', label: 'Цитата', icon: QuoteIcon },
          { kind: 'codeBlock', label: 'Блок кода', icon: CodeIcon }
        ]
      },
      {
        kind: 'clearFormatting',
        pos: selectedNode.value?.pos,
        label: 'Сбросить форматирование',
        icon: ResumeIcon
      }
    ],
    [
      {
        kind: 'duplicate',
        pos: selectedNode.value?.pos,
        label: 'Дублировать',
        icon: CopyIcon
      },
      {
        label: 'Копировать в буфер обмена',
        icon: CopyFileIcon,
        onSelect: async () => {
          if (!selectedNode.value) return

          const pos = selectedNode.value.pos
          const node = editor.state.doc.nodeAt(pos)
          if (node) {
            await navigator.clipboard.writeText(node.textContent)
          }
        }
      }
    ],
    [
      {
        kind: 'moveUp',
        pos: selectedNode.value?.pos,
        label: 'Переместить вверх',
        icon: ArrowTopLIcon
      },
      {
        kind: 'moveDown',
        pos: selectedNode.value?.pos,
        label: 'Переместить вниз',
        icon: ArrowDownLIcon
      }
    ],
    [
      {
        kind: 'delete',
        pos: selectedNode.value?.pos,
        label: 'Удалить',
        icon: TrashcanIcon
      }
    ]
  ], customHandlers) as DropdownMenuItem[][]
}

const suggestionItems = [
  [
    {
      type: 'label',
      label: 'Стиль'
    },
    {
      kind: 'paragraph',
      label: 'Абзац',
      icon: TextIcon
    },
    {
      kind: 'heading',
      level: 1,
      label: 'Заголовок 1'
    },
    {
      kind: 'heading',
      level: 2,
      label: 'Заголовок 2'
    },
    {
      kind: 'heading',
      level: 3,
      label: 'Заголовок 3'
    },
    {
      kind: 'bulletList',
      label: 'Маркированный список',
      icon: BulletedListIcon
    },
    {
      kind: 'orderedList',
      label: 'Нумерованный список',
      icon: NumberedListIcon
    },
    {
      kind: 'blockquote',
      label: 'Цитата',
      icon: QuoteIcon
    },
    {
      kind: 'codeBlock',
      label: 'Блок кода',
      icon: CodeIcon
    }
  ],
  [
    {
      type: 'label',
      label: 'Вставка'
    },
    {
      kind: 'mention',
      label: 'Упоминание',
      icon: MentionIcon
    },
    {
      kind: 'emoji',
      label: 'Эмодзи',
      icon: SmileIcon
    },
    {
      kind: 'imageUpload',
      label: 'Изображение',
      icon: ImageIcon
    },
    {
      kind: 'horizontalRule',
      label: 'Горизонтальная линия',
      icon: HrIcon
    }
  ]
] satisfies EditorSuggestionMenuItem<typeof customHandlers>[][]

const mentionItems: EditorMentionMenuItem[] = [
  {
    label: 'bitrix24',
    avatar: { src: 'https://github.com/bitrix24.png', loading: 'lazy' as const }
  },
  {
    label: 'Сотрудник',
    avatar: { src: '/b24ui/avatar/employee.png', loading: 'lazy' as const }
  },
  {
    label: 'Ассистент',
    avatar: { src: '/b24ui/avatar/assistant.png', loading: 'lazy' as const }
  }
]

const emojiItems: EditorEmojiMenuItem[] = gitHubEmojis.filter(emoji => !emoji.name.startsWith('regional_indicator_'))
</script>

<template>
  <B24Editor
    v-slot="{ editor, handlers }"
    v-model="value"
    content-type="markdown"
    :extensions="[
      Emoji,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ImageUpload,
      CodeBlockShiki.configure({
        defaultTheme: 'material-theme',
        themes: {
          light: 'material-theme-lighter',
          dark: 'material-theme-palenight'
        }
      })
    ]"
    :handlers="customHandlers"
    placeholder="Пишите, введите «/» для команд..."
    :b24ui="{ base: 'p-8 sm:px-16 py-24' }"
    class="w-full h-176 overflow-y-auto scrollbar-thin"
  >
    <B24EditorToolbar
      :editor="editor"
      :items="fixedToolbarItems"
      class="border-b border-(--ui-color-design-tinted-na-stroke) absolute top-0 inset-x-0 px-8 me-2 sm:px-16 py-2 z-20 bg-default overflow-x-auto rounded-t-md"
    >
      <template #link>
        <EditorLinkPopover :editor="editor" auto-open />
      </template>
    </B24EditorToolbar>

    <B24EditorToolbar
      :editor="editor"
      :items="bubbleToolbarItems"
      layout="bubble"
      :should-show="({ editor, view, state }) => {
        if (editor.isActive('imageUpload') || editor.isActive('image')) {
          return false
        }
        const { selection } = state
        return view.hasFocus() && !selection.empty
      }"
    >
      <template #link>
        <EditorLinkPopover :editor="editor" />
      </template>
    </B24EditorToolbar>

    <B24EditorToolbar
      :editor="editor"
      :items="imageToolbarItems(editor)"
      layout="bubble"
      :should-show="({ editor, view }) => {
        return editor.isActive('image') && view.hasFocus()
      }"
    />

    <B24EditorSuggestionMenu :editor="editor" :items="suggestionItems" />

    <B24EditorMentionMenu :editor="editor" :items="mentionItems" />

    <B24EditorEmojiMenu :editor="editor" :items="emojiItems" />

    <B24EditorDragHandle v-slot="{ b24ui, onClick }" :editor="editor" @node-change="selectedNode = $event">
      <B24Button
        :icon="PlusLIcon"
        color="air-tertiary"
        size="sm"
        :class="b24ui.handle()"
        @click="(e) => {
          e.stopPropagation()

          const selected = onClick()
          handlers.suggestion?.execute(editor, { pos: selected?.pos }).run()
        }"
      />

      <B24DropdownMenu
        v-slot="{ open }"
        :modal="false"
        :items="handleItems(editor)"
        :content="{ side: 'left' }"
        :b24ui="{ content: 'w-48', label: 'text-xs' }"
        @update:open="editor.chain().setMeta('lockDragHandle', $event).run()"
      >
        <B24Button
          color="air-tertiary"
          size="sm"
          :icon="DragLIcon"
          :active="open"
          :class="b24ui.handle()"
        />
      </B24DropdownMenu>
    </B24EditorDragHandle>
  </B24Editor>
</template>

<style>
html.dark .tiptap .shiki,
html.dark .tiptap .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--ui-color-g-plastic-bluish-bg) !important;
}
</style>
