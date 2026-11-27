<script setup lang="ts">
import type { EditorSuggestionMenuItem } from '@bxshefby/b24ui-nuxt'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import QuoteIcon from '@bitrix24/b24icons-vue/outline/QuoteIcon'
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'
import DragLIcon from '@bitrix24/b24icons-vue/outline/DragLIcon'

const value = ref(`Нажмите кнопку «плюс», чтобы открыть меню подсказок и добавить новые блоки.

Кнопка появляется при наведении на блоки.`)

const suggestionItems: EditorSuggestionMenuItem[][] = [
  [
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
      kind: 'bulletList',
      label: 'Маркированный список',
      icon: BulletedListIcon
    },
    {
      kind: 'blockquote',
      label: 'Цитата',
      icon: QuoteIcon
    }
  ]
]
</script>

<template>
  <B24Editor
    v-slot="{ editor, handlers }"
    v-model="value"
    content-type="markdown"
    class="w-full min-h-35"
    :b24ui="{ base: 'p-8 sm:px-16' }"
  >
    <B24EditorSuggestionMenu :editor="editor" :items="suggestionItems" />

    <B24EditorDragHandle v-slot="{ b24ui, onClick }" :editor="editor">
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

      <B24Button
        color="air-tertiary"
        size="sm"
        :icon="DragLIcon"
        :class="b24ui.handle()"
      />
    </B24EditorDragHandle>
  </B24Editor>
</template>
