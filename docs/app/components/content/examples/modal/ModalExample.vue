<script setup lang="ts">
defineProps<{
  count: number
}>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <B24Modal :close="{ onClick: () => emit('close', false) }" :title="`Это модальное окно открыто программно столько раз: ${count}`">
    <template #footer>
      <div class="flex gap-2">
        <B24Button label="Закрыть" @click="emit('close', false)" />
        <B24Button color="air-primary-success" label="Успешно" @click="emit('close', true)" />
      </div>
    </template>
  </B24Modal>
</template>
