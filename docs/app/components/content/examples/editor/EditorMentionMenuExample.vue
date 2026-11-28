<script setup lang="ts">
import type { EditorMentionMenuItem } from '@bxshefby/b24ui-nuxt'

const value = ref(`# Меню упоминаний

Введите @, чтобы упомянуть пользователя, и выберите его из списка.`)

const items: EditorMentionMenuItem[] = [
  {
    label: 'bitrix24',
    avatar: {
      src: 'https://github.com/bitrix24.png',
      loading: 'lazy' as const
    }
  },
  {
    label: 'Сотрудник',
    avatar: {
      src: '/b24ui/avatar/employee.png',
      loading: 'lazy' as const
    }
  },
  {
    label: 'Ассистент',
    avatar: {
      src: '/b24ui/avatar/assistant.png',
      loading: 'lazy' as const
    }
  }
]

// Безопасная для SSR функция, добавляющая меню в body (чтобы не было проблем с z-index в документации)
const appendToBody = import.meta.client ? () => document.body : undefined
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    placeholder="Введите @, чтобы упомянуть пользователя..."
    class="w-full min-h-21"
  >
    <B24EditorMentionMenu :editor="editor" :items="items" :append-to="appendToBody" />
  </B24Editor>
</template>
