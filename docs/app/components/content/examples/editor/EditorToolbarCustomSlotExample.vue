<script setup lang="ts">
import type { EditorToolbarItem } from '@bitrix24/b24ui-nuxt'
import EditorLinkPopover from './EditorLinkPopover.vue'
import BoldIcon from '@bitrix24/b24icons-vue/outline/BoldIcon'
import ItalicIcon from '@bitrix24/b24icons-vue/outline/ItalicIcon'

const value = ref(`Выделите текст и нажмите кнопку ссылки, чтобы добавить ссылку через собственный поповер.

Можно также изменять существующие ссылки, например [эту](https://bitrix24.github.io/b24ui/).`)

const toolbarItems = [
  [
    {
      kind: 'mark',
      mark: 'bold',
      icon: BoldIcon
    },
    {
      kind: 'mark',
      mark: 'italic',
      icon: ItalicIcon
    },
    {
      slot: 'link' as const
    }
  ]
] satisfies EditorToolbarItem[][]
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    class="w-full min-h-30 flex flex-col gap-4"
  >
    <B24EditorToolbar :editor="editor" :items="toolbarItems" class="sm:px-8">
      <template #link>
        <EditorLinkPopover :editor="editor" auto-open />
      </template>
    </B24EditorToolbar>
  </B24Editor>
</template>
