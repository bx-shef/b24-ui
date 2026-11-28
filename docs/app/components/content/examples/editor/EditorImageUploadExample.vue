<script setup lang="ts">
import type { EditorCustomHandlers, EditorToolbarItem } from '@bxshefby/b24ui-nuxt'
import type { Editor } from '@tiptap/vue-3'
import { ImageUpload } from './EditorImageUploadExtension'
import HeaderIcon from '@bitrix24/b24icons-vue/editor/HeaderIcon'
import BoldIcon from '@bitrix24/b24icons-vue/outline/BoldIcon'
import ItalicIcon from '@bitrix24/b24icons-vue/outline/ItalicIcon'
import UnderlineIcon from '@bitrix24/b24icons-vue/outline/UnderlineIcon'
import StrikethroughIcon from '@bitrix24/b24icons-vue/outline/StrikethroughIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'
import ImageIcon from '@bitrix24/b24icons-vue/outline/ImageIcon'

const value = ref(`# Загрузка изображений

Этот редактор показывает, как создать собственное расширение TipTap с обработчиками. Нажмите кнопку изображения на панели инструментов, чтобы загрузить файл: перед вставкой изображения откроется собственный интерфейс [FileUpload](/docs/components/file-upload).

Попробуйте загрузить изображение ниже:

`)

const customHandlers = {
  imageUpload: {
    canExecute: (editor: Editor) => editor.can().insertContent({ type: 'imageUpload' }),
    execute: (editor: Editor) => editor.chain().focus().insertContent({ type: 'imageUpload' }),
    isActive: (editor: Editor) => editor.isActive('imageUpload'),
    isDisabled: undefined
  }
} satisfies EditorCustomHandlers

const items = [
  [
    {
      kind: 'imageUpload',
      icon: ImageIcon,
      label: 'Добавить изображение'
    }
  ],
  [
    {
      icon: HeaderIcon,
      content: { align: 'start' },
      items: [{
        kind: 'heading',
        level: 1,
        label: 'Заголовок 1'
      }, {
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
      }]
    }
  ],
  [
    {
      kind: 'mark',
      mark: 'bold',
      icon: BoldIcon
    }, {
      kind: 'mark',
      mark: 'italic',
      icon: ItalicIcon
    }, {
      kind: 'mark',
      mark: 'underline',
      icon: UnderlineIcon
    }, {
      kind: 'mark',
      mark: 'strike',
      icon: StrikethroughIcon
    }, {
      kind: 'mark',
      mark: 'code',
      icon: DeveloperResourcesIcon
    }
  ]
] satisfies EditorToolbarItem<typeof customHandlers>[][]
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    :extensions="[ImageUpload]"
    :handlers="customHandlers"
    content-type="markdown"
    :b24ui="{ base: 'p-8 sm:px-16' }"
    class="w-full min-h-74"
  >
    <B24EditorToolbar :editor="editor" :items="items" class="border-b border-muted bg-default py-2 px-8 sm:px-16 overflow-x-auto" />
  </B24Editor>
</template>
