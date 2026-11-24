<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <B24Modal v-model:open="open" title="Модальное окно с подвалом" description="Пригодится, когда в модальном окне нужна форма." :b24ui="{ footer: 'justify-end' }">
    <B24Button label="Открыть" />

    <template #body>
      <Placeholder class="h-48" />
    </template>

    <template #footer="{ close }">
      <B24Button label="Отправить" color="air-primary-success" />
      <B24Button label="Отмена" @click="close" />
    </template>
  </B24Modal>
</template>
