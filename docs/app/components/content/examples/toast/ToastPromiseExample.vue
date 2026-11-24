<script setup lang="ts">
import CheckLIcon from '@bitrix24/b24icons-vue/outline/CheckLIcon'
import CrossMIcon from '@bitrix24/b24icons-vue/outline/CrossMIcon'

const toast = useToast()

function upload() {
  return new Promise<string>(resolve => setTimeout(() => resolve('report.pdf'), 2000))
}

function showToast() {
  toast.promise(upload(), {
    loading: { title: 'Загрузка файла...', description: 'Файл загружается.' },
    success: name => ({
      title: 'Файл загружен!',
      description: `Файл ${name} успешно загружен.`,
      icon: CheckLIcon,
      color: 'air-primary-success'
    }),
    error: {
      title: 'Не удалось загрузить',
      description: 'Что-то пошло не так, попробуйте ещё раз.',
      icon: CrossMIcon,
      color: 'air-primary-alert'
    }
  })
}
</script>

<template>
  <B24Button label="Показать уведомление" @click="showToast" />
</template>
