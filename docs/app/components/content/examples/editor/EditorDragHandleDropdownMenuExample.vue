<script setup lang="ts">
import { upperFirst } from 'scule'
import type { DropdownMenuItem } from '@bxshefby/b24ui-nuxt'
import { mapEditorItems } from '@bxshefby/b24ui-nuxt/utils/editor'
import type { Editor, JSONContent } from '@tiptap/vue-3'
import DragLIcon from '@bitrix24/b24icons-vue/outline/DragLIcon'
import RepeatIcon from '@bitrix24/b24icons-vue/outline/RepeatIcon'
import ResumeIcon from '@bitrix24/b24icons-vue/outline/ResumeIcon'
import TextIcon from '@bitrix24/b24icons-vue/outline/TextIcon'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import NumberedListIcon from '@bitrix24/b24icons-vue/outline/NumberedListIcon'
import QuoteIcon from '@bitrix24/b24icons-vue/outline/QuoteIcon'
import CodeIcon from '@bitrix24/b24icons-vue/common-service/CodeIcon'
import CopyIcon from '@bitrix24/b24icons-vue/outline/CopyIcon'
import CopyFileIcon from '@bitrix24/b24icons-vue/crm/CopyFileIcon'
import ArrowTopLIcon from '@bitrix24/b24icons-vue/outline/ArrowTopLIcon'
import ArrowDownLIcon from '@bitrix24/b24icons-vue/outline/ArrowDownLIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'

const value = ref(`Наведите курсор на левую сторону, чтобы увидеть ручку перетаскивания и кнопку меню.

Нажмите на меню, чтобы увидеть действия с блоком. Попробуйте продублировать или удалить блок.`)

const selectedNode = ref<{ node: JSONContent, pos: number }>()

const items = (editor: Editor): DropdownMenuItem[][] => {
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
  ]) as DropdownMenuItem[][]
}
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    class="w-full min-h-19"
  >
    <B24EditorDragHandle v-slot="{ b24ui }" :editor="editor" @node-change="selectedNode = $event">
      <B24DropdownMenu
        v-slot="{ open }"
        :modal="false"
        :items="items(editor)"
        :content="{ side: 'left' }"
        :b24ui="{ content: 'w-48', label: 'text-xs' }"
        @update:open="editor.chain().setMeta('lockDragHandle', $event).run()"
      >
        <B24Button
          :icon="DragLIcon"
          color="air-tertiary"
          active-color="air-secondary"
          size="sm"
          :active="open"
          :class="b24ui.handle()"
        />
      </B24DropdownMenu>
    </B24EditorDragHandle>
  </B24Editor>
</template>
