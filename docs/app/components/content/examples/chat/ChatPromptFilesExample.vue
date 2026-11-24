<script setup lang="ts">
import AttachIcon from '@bitrix24/b24icons-vue/outline/AttachIcon'

const input = ref('')
const files = ref<File[]>([])

function onSubmit() {
  // Отправьте `input.value` и `files.value` на свой эндпоинт.

  input.value = ''
  files.value = []
}
</script>

<template>
  <B24ChatPrompt
    v-model="input"
    v-model:files="files"
    accept="image/*,application/pdf"
    placeholder="Вставьте или перетащите файлы сюда..."
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
        aria-label="Прикрепить файлы"
        @click="open"
      />
    </template>

    <B24ChatPromptSubmit size="sm" />
  </B24ChatPrompt>
</template>
