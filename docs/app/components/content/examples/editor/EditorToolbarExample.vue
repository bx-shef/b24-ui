<script setup lang="ts">
import type { EditorToolbarItem } from '@bitrix24/b24ui-nuxt'
import HeaderIcon from '@bitrix24/b24icons-vue/editor/HeaderIcon'
import BoldIcon from '@bitrix24/b24icons-vue/outline/BoldIcon'
import ItalicIcon from '@bitrix24/b24icons-vue/outline/ItalicIcon'
import UnderlineIcon from '@bitrix24/b24icons-vue/outline/UnderlineIcon'
import StrikethroughIcon from '@bitrix24/b24icons-vue/outline/StrikethroughIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'

const value = ref(`# Панель инструментов

Выделите текст, чтобы над выделением появилась панель форматирования.`)

const items: EditorToolbarItem[][] = [
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
  ]
]
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    class="w-full min-h-21"
  >
    <B24EditorToolbar :editor="editor" :items="items" layout="bubble" />
  </B24Editor>
</template>
