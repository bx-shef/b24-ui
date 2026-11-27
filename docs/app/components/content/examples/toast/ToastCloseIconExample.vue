<script setup lang="ts">
import ArrowToTheRightIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheRightIcon'

const toast = useToast()

function showToast() {
  toast.add({
    title: 'Ой! Что-то пошло не так.',
    description: 'Возникла проблема с вашим запросом.',
    closeIcon: ArrowToTheRightIcon
  })
}
</script>

<template>
  <B24Button label="Показать уведомление" @click="showToast" />
</template>
