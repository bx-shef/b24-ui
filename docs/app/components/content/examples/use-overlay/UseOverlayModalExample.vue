<script setup lang="ts">
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <B24Modal
    title="Добро пожаловать 👋"
    description="Это модальное окно открыто программно через useOverlay."
    :close="{ onClick: () => emit('close') }"
    :b24ui="{ footer: 'justify-end' }"
  >
    <template #footer>
      <B24Button label="Закрыть" @click="emit('close')" />
    </template>
  </B24Modal>
</template>
