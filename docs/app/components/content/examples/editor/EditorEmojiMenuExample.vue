<script setup lang="ts">
import type { EditorEmojiMenuItem } from '@bitrix24/b24ui-nuxt'
import { Emoji, gitHubEmojis } from '@tiptap/extension-emoji'

const value = ref(`# Меню эмодзи

Введите :, чтобы вставить эмодзи, и выберите нужный из списка.`)

const items: EditorEmojiMenuItem[] = gitHubEmojis.filter(emoji => !emoji.name.startsWith('regional_indicator_'))

// Безопасная для SSR функция, добавляющая меню в body (чтобы не было проблем с z-index в документации)
const appendToBody = import.meta.client ? () => document.body : undefined
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    :extensions="[Emoji]"
    content-type="markdown"
    placeholder="Введите : для добавления эмодзи..."
    class="w-full min-h-21"
  >
    <B24EditorEmojiMenu :editor="editor" :items="items" :append-to="appendToBody" />
  </B24Editor>
</template>
