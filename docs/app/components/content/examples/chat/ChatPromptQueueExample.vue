<script setup lang="ts">
import type { ChatPromptQueueItem } from '@bitrix24/b24ui-nuxt'

const input = ref('')
const queue = ref<ChatPromptQueueItem[]>([
  { text: 'Can you also add a dark mode toggle?' },
  { text: 'And write the tests for it' }
])
</script>

<template>
  <B24ChatPrompt
    v-model="input"
    v-model:queue="queue"
    status="streaming"
    placeholder="Send a message while it answers..."
    :autofocus="false"
    class="w-full"
  >
    <B24ChatPromptSubmit status="streaming" />
  </B24ChatPrompt>
</template>
