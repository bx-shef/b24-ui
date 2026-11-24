<script setup lang="ts">
import type { EditorMentionMenuItem } from '@bitrix24/b24ui-nuxt'

const value = ref(`Введите @, чтобы упомянуть пользователя.

Элементы можно настроить: добавить аватары, иконки и описания.`)

const items: EditorMentionMenuItem[] = [
  {
    label: 'bitrix24',
    avatar: { src: 'https://github.com/bitrix24.png', loading: 'lazy' as const },
    description: 'Профиль Bitrix24'
  },
  {
    label: 'Сотрудник',
    avatar: { src: '/b24ui/avatar/employee.png', loading: 'lazy' as const }
  },
  {
    label: 'Ассистент',
    avatar: { src: '/b24ui/avatar/assistant.png', loading: 'lazy' as const },
    disabled: true
  }
]
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    placeholder="Введите @ для упоминания..."
    class="w-full min-h-19"
  >
    <B24EditorMentionMenu :editor="editor" :items="items" />
  </B24Editor>
</template>
