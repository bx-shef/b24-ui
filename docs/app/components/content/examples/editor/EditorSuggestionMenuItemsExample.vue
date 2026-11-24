<script setup lang="ts">
import type { EditorSuggestionMenuItem } from '@bitrix24/b24ui-nuxt'
import TextIcon from '@bitrix24/b24icons-vue/outline/TextIcon'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import NumberedListIcon from '@bitrix24/b24icons-vue/outline/NumberedListIcon'
import QuoteIcon from '@bitrix24/b24icons-vue/outline/QuoteIcon'
import CodeIcon from '@bitrix24/b24icons-vue/common-service/CodeIcon'
import HrIcon from '@bitrix24/b24icons-vue/editor/HrIcon'

const value = ref(`Введите /, чтобы увидеть список команд.

Элементы можно настроить: добавить иконки, подписи и описания.`)

const items: EditorSuggestionMenuItem[][] = [
  [
    {
      type: 'label',
      label: 'Стили текста'
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
    }
  ],
  [
    {
      type: 'label',
      label: 'Списки'
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
    }
  ],
  [
    {
      type: 'label',
      label: 'Блоки'
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
    },
    {
      kind: 'horizontalRule',
      label: 'Разделитель',
      icon: HrIcon
    }
  ]
]
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    placeholder="Введите / для команд..."
    class="w-full min-h-19"
  >
    <B24EditorSuggestionMenu :editor="editor" :items="items" />
  </B24Editor>
</template>
