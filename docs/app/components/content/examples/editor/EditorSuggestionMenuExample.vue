<script setup lang="ts">
import type { EditorSuggestionMenuItem } from '@bitrix24/b24ui-nuxt'
import TextIcon from '@bitrix24/b24icons-vue/outline/TextIcon'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import NumberedListIcon from '@bitrix24/b24icons-vue/outline/NumberedListIcon'
import QuoteIcon from '@bitrix24/b24icons-vue/outline/QuoteIcon'
import CodeIcon from '@bitrix24/b24icons-vue/common-service/CodeIcon'
import HrIcon from '@bitrix24/b24icons-vue/editor/HrIcon'

const value = ref(`# Меню подсказок

Введите /, чтобы открыть меню подсказок и посмотреть доступные команды форматирования.`)

const items: EditorSuggestionMenuItem[][] = [
  [
    {
      type: 'label',
      label: 'Текст'
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
      label: 'Вставка'
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

// Безопасная для SSR функция, добавляющая меню в body (чтобы не было проблем с z-index в документации)
const appendToBody = import.meta.client ? () => document.body : undefined
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    placeholder="Введите / для команд..."
    class="w-full min-h-21"
  >
    <B24EditorSuggestionMenu :editor="editor" :items="items" :append-to="appendToBody" />
  </B24Editor>
</template>
