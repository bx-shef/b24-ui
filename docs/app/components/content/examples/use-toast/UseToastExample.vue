<script setup lang="ts">
import ReplyIcon from '@bitrix24/b24icons-vue/actions/ReplyIcon'

const toast = useToast()

function showToast() {
  toast.add({
    title: 'Новое сообщение',
    description: 'У вас новое сообщение от Бенджамина.',
    actions: [{
      icon: ReplyIcon,
      label: 'Ответить',
      color: 'air-secondary-accent-2',
      onClick: () => {
        toast.add({ title: 'Ответ отправлен', color: 'air-primary-success' })
      }
    }]
  })
}
</script>

<template>
  <B24Button label="Показать уведомление" @click="showToast" />
</template>
