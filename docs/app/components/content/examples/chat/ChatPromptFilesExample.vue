<script setup lang="ts">
import AttachIcon from '@bitrix24/b24icons-vue/outline/AttachIcon'

const input = ref('')
const files = ref<File[]>([])

function onSubmit() {
  // Send `input.value` and `files.value` to your own endpoint here.

  input.value = ''
  files.value = []
}
</script>

<template>
  <B24ChatPrompt
    v-model="input"
    v-model:files="files"
    accept="image/*,application/pdf"
    placeholder="Paste or drop files here..."
    :autofocus="false"
    class="w-full"
    @submit="onSubmit"
  >
    <template #footer="{ open }">
      <B24Button
        :icon="AttachIcon"
        color="air-tertiary-no-accent"
        size="sm"
        class="me-auto"
        aria-label="Attach files"
        @click="open"
      />
    </template>

    <B24ChatPromptSubmit size="sm" />
  </B24ChatPrompt>
</template>
