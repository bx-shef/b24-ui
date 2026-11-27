<script setup lang="ts">
import type { ChatPromptQueueItem } from '@bitrix24/b24ui-nuxt'

const input = ref('')
const queue = ref<ChatPromptQueueItem[]>([
  { text: 'Можешь ещё добавить переключатель тёмной темы?' },
  { text: 'И напиши для него тесты' }
])
</script>

<template>
  <B24ChatPrompt
    v-model="input"
    v-model:queue="queue"
    status="streaming"
    placeholder="Отправьте сообщение, пока идёт ответ..."
    :autofocus="false"
    class="w-full"
  >
    <B24ChatPromptSubmit status="streaming" />
  </B24ChatPrompt>
</template>
