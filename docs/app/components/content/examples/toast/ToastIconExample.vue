<script setup lang="ts">
import CopilotAiIcon from '@bitrix24/b24icons-vue/main/CopilotAiIcon'

const toast = useToast()

function showToast() {
  toast.add({
    title: 'Ой! Что-то пошло не так.',
    description: 'Возникла проблема с вашим запросом.',
    icon: CopilotAiIcon
  })
}
</script>

<template>
  <B24Button label="Показать уведомление" @click="showToast" />
</template>
