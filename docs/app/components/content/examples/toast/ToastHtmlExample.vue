<script setup lang="ts">
import TrashcanIcon from '@bitrix24/b24icons-vue/solid/TrashcanIcon'

const toast = useToast()

function showToast() {
  toast.add({
    title: h('span', {}, [
      'Элемент ',
      h('span', { class: 'text-(--ui-color-accent-main-primary) font-bold' }, '#15'),
      ' удалён'
    ]),
    description: h('span', {}, [
      'Вы успешно удалили элемент из своего ',
      h('span', { class: 'font-bold' }, 'аккаунта'),
      '.'
    ]),
    icon: TrashcanIcon
  })
}
</script>

<template>
  <B24Button label="Показать уведомление" @click="showToast" />
</template>
