<script setup lang="ts">
import { refDebounced } from '@vueuse/core'

const value = ref(`# Асинхронное меню упоминаний

Введите @, чтобы упомянуть пользователя. Результаты загружаются из API по мере набора.`)

const searchTerm = ref('')
const searchTermDebounced = refDebounced(searchTerm, 200)

const { data: items } = useLazyFetch('https://dummyjson.com/users/search?limit=10', {
  key: 'editor-mention-users-search',
  query: { q: searchTermDebounced },
  transform: (data: { users: { id: number, firstName: string, lastName: string, image: string }[] }) => {
    return data.users?.map(user => ({ id: user.id, label: `${user.firstName} ${user.lastName}`, avatar: { src: user.image, loading: 'lazy' as const } })) || []
  },
  server: false
})

// Безопасная для SSR функция, добавляющая меню в body (чтобы не было проблем с z-index в документации)
const appendToBody = import.meta.client ? () => document.body : undefined
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    placeholder="Введите @ для упоминания..."
    class="w-full min-h-21"
  >
    <B24EditorMentionMenu
      v-model:search-term="searchTerm"
      :editor="editor"
      :items="items"
      :append-to="appendToBody"
      ignore-filter
    />
  </B24Editor>
</template>
