<script setup lang="ts">
import CircleCrossIcon from '@bitrix24/b24icons-vue/outline/CircleCrossIcon'

const toast = useToast()

function showToast() {
  toast.add({
    id: 'copy',
    title: 'Скопировано в буфер обмена',
    icon: CircleCrossIcon,
    duration: 0
  })
}
</script>

<template>
  <B24Button label="Показать уведомление" @click="showToast" />
</template>
