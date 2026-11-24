<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <B24Drawer
    v-model:open="open"
    title="Drawer с подвалом"
    description="Пригодится, когда в Drawer нужна форма."
    :b24ui="{ container: 'max-w-xl mx-auto' }"
  >
    <B24Button label="Открыть" use-dropdown :b24ui="{ trailingIcon: 'rotate-180' }" />

    <template #body>
      <Placeholder class="h-48" />
    </template>

    <template #footer>
      <B24Button label="Отправить" color="air-primary-success" />
      <B24Button label="Отмена" @click="open = false" />
    </template>
  </B24Drawer>
</template>
