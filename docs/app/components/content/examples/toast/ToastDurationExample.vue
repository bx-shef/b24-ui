<script setup lang="ts">
const toast = useToast()

const props = defineProps<{
  duration: number
}>()

function showToast() {
  toast.add({
    title: 'Ой! Что-то пошло не так.',
    description: 'Возникла проблема с вашим запросом.',
    duration: props.duration
  })
}
</script>

<template>
  <B24Button label="Показать уведомление" @click="showToast" />
</template>
