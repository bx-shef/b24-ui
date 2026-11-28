<script setup lang="ts">
import type { EditorEmojiMenuItem } from '@bxshefby/b24ui-nuxt'
import { Emoji } from '@tiptap/extension-emoji'

const value = ref(`Введите :, чтобы увидеть собственный набор эмодзи.

Можно также установить расширение \`@tiptap/extension-emoji\` и пользоваться полным набором из более чем 1800 эмодзи.`)

const items: EditorEmojiMenuItem[] = [
  {
    name: 'smile',
    emoji: '😄',
    shortcodes: ['smile'],
    tags: ['happy', 'joy', 'pleased']
  },
  {
    name: 'heart',
    emoji: '❤️',
    shortcodes: ['heart'],
    tags: ['love', 'like']
  },
  {
    name: 'thumbsup',
    emoji: '👍',
    shortcodes: ['thumbsup', '+1'],
    tags: ['approve', 'ok']
  },
  {
    name: 'fire',
    emoji: '🔥',
    shortcodes: ['fire'],
    tags: ['hot', 'burn']
  },
  {
    name: 'rocket',
    emoji: '🚀',
    shortcodes: ['rocket'],
    tags: ['ship', 'launch']
  },
  {
    name: 'eyes',
    emoji: '👀',
    shortcodes: ['eyes'],
    tags: ['look', 'watch']
  },
  {
    name: 'tada',
    emoji: '🎉',
    shortcodes: ['tada'],
    tags: ['party', 'celebration']
  },
  {
    name: 'thinking',
    emoji: '🤔',
    shortcodes: ['thinking'],
    tags: ['hmm', 'think', 'consider']
  }
]
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    :extensions="[Emoji]"
    content-type="markdown"
    placeholder="Введите : для добавления эмодзи..."
    class="w-full min-h-26"
  >
    <B24EditorEmojiMenu :editor="editor" :items="items" />
  </B24Editor>
</template>
