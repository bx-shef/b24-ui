<script setup lang="ts">
import type { EditorToolbarItem } from '@bxshefby/b24ui-nuxt'
import BoldIcon from '@bitrix24/b24icons-vue/outline/BoldIcon'
import ItalicIcon from '@bitrix24/b24icons-vue/outline/ItalicIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'

defineProps<{
  layout: 'fixed' | 'bubble' | 'floating'
}>()

const value = ref(`Переключайте раскладки, чтобы увидеть разные режимы панели инструментов.

Раскладка **fixed** показывает панель инструментов над редактором. Раскладка **bubble** показывает панель при выделении текста. Раскладка **floating** появляется на пустых строках.`)

const items: EditorToolbarItem[][] = [
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
      kind: 'mark',
      mark: 'code',
      icon: DeveloperResourcesIcon
    }
  ]
]
</script>

<template>
  <B24Editor v-slot="{ editor }" v-model="value" content-type="markdown" class="w-full min-h-26 flex flex-col gap-4">
    <B24EditorToolbar
      :key="layout"
      :editor="editor"
      :items="items"
      :layout="layout"
      :data-layout="layout"
      class="data-[layout=fixed]:sm:px-8"
    />
  </B24Editor>
</template>
