<script setup lang="ts">
defineProps<{
  count: number
}>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <B24Slideover
    :close="{ onClick: () => emit('close', false) }"
    :description="`Эта боковая панель открыта программно столько раз: ${count}`"
  >
    <template #body>
      <Placeholder class="h-full" />
    </template>

    <template #footer>
      <B24Button size="lg" color="air-primary" label="Сохранить" @click="emit('close', true)" />
      <B24Button size="sm" color="air-tertiary" label="Отмена" :normal-case="false" @click="emit('close', false)" />
    </template>
  </B24Slideover>
</template>
