<script setup lang="ts">
import type { EditorToolbarItem } from '@bitrix24/b24ui-nuxt'
import { TextAlign } from '@tiptap/extension-text-align'
import UndoIcon from '@bitrix24/b24icons-vue/outline/UndoIcon'
import RedoIcon from '@bitrix24/b24icons-vue/outline/RedoIcon'
import HeaderIcon from '@bitrix24/b24icons-vue/editor/HeaderIcon'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import NumberedListIcon from '@bitrix24/b24icons-vue/outline/NumberedListIcon'
import QuoteIcon from '@bitrix24/b24icons-vue/outline/QuoteIcon'
import CodeIcon from '@bitrix24/b24icons-vue/common-service/CodeIcon'
import HrIcon from '@bitrix24/b24icons-vue/editor/HrIcon'
import BoldIcon from '@bitrix24/b24icons-vue/outline/BoldIcon'
import ItalicIcon from '@bitrix24/b24icons-vue/outline/ItalicIcon'
import UnderlineIcon from '@bitrix24/b24icons-vue/outline/UnderlineIcon'
import StrikethroughIcon from '@bitrix24/b24icons-vue/outline/StrikethroughIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import AlignLeftIcon from '@bitrix24/b24icons-vue/outline/AlignLeftIcon'
import AlignCenterIcon from '@bitrix24/b24icons-vue/outline/AlignCenterIcon'
import AlignRightIcon from '@bitrix24/b24icons-vue/outline/AlignRightIcon'
import AlignJustifyIcon from '@bitrix24/b24icons-vue/outline/AlignJustifyIcon'

const value = ref(`Эта панель инструментов показывает **все доступные параметры форматирования** со встроенными обработчиками. Попробуйте разные элементы управления в действии!

К тексту можно применить **жирный**, *курсив*, <u>подчёркнутый</u>, ~~зачёркнутый~~ и \`строчный код\`.
`)

const items: EditorToolbarItem[][] = [
  // Управление историей
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
  // Типы блоков
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
        }
      ]
    },
    {
      icon: BulletedListIcon,
      tooltip: { text: 'Списки' },
      content: {
        align: 'start'
      },
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
    },
    {
      kind: 'horizontalRule',
      icon: HrIcon,
      tooltip: { text: 'Горизонтальная линия' }
    }
  ],
  // Форматирование текста
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
  // Ссылка
  [
    {
      kind: 'link',
      icon: LinkIcon,
      tooltip: { text: 'Ссылка' }
    }
  ],
  // Выравнивание текста
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
        }, {
          kind: 'textAlign',
          align: 'center',
          icon: AlignCenterIcon,
          label: 'По центру'
        }, {
          kind: 'textAlign',
          align: 'right',
          icon: AlignRightIcon,
          label: 'По правому краю'
        }, {
          kind: 'textAlign',
          align: 'justify',
          icon: AlignJustifyIcon,
          label: 'По ширине'
        }
      ]
    }
  ]
]
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    :extensions="[TextAlign.configure({ types: ['heading', 'paragraph'] })]"
    class="w-full min-h-37 flex flex-col gap-4"
  >
    <B24EditorToolbar :editor="editor" :items="items" class="sm:px-8 overflow-x-auto bg-default" />
  </B24Editor>
</template>
