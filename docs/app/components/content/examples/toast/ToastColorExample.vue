<script setup lang="ts">
import type { ToastProps } from '@bitrix24/b24ui-nuxt'
import CopilotAiIcon from '@bitrix24/b24icons-vue/main/CopilotAiIcon'

const props = defineProps<{
  color: ToastProps['color']
}>()

const toast = useToast()

function showToast() {
  toast.add({
    title: 'Ой! Что-то пошло не так.',
    description: 'Возникла проблема с вашим запросом.',
    icon: CopilotAiIcon,
    color: props.color
  })
}
</script>

<template>
  <B24Button label="Показать уведомление" @click="showToast" />
</template>
