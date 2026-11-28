<script setup lang="ts">
const toast = useToast()

function showToast() {
  toast.add({
    title: 'Расчёт показателей завершён',
    description: 'Нужна ли вам ещё какая-нибудь помощь?',
    avatar: { src: '/b24ui/avatar/assistant.png' }
  })
}
</script>

<template>
  <B24Button label="Показать уведомление" @click="showToast" />
</template>
