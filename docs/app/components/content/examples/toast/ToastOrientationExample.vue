<script setup lang="ts">
import Refresh9Icon from '@bitrix24/b24icons-vue/crm/Refresh9Icon'

const toast = useToast()

const props = defineProps<{
  orientation: 'horizontal' | 'vertical'
}>()

function showToast() {
  toast.add({
    title: 'Ой! Что-то пошло не так.',
    orientation: props.orientation,
    actions: [{
      icon: Refresh9Icon,
      label: 'Повторить',
      color: 'air-secondary-accent-2',
      onClick: (e) => {
        e?.stopPropagation()
      }
    }]
  })
}
</script>

<template>
  <B24Button label="Показать уведомление" @click="showToast" />
</template>
