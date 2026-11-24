<script setup lang="ts">
import CheckLIcon from '@bitrix24/b24icons-vue/outline/CheckLIcon'
import CrossMIcon from '@bitrix24/b24icons-vue/outline/CrossMIcon'

const toast = useToast()

function upload() {
  return new Promise<string>(resolve => setTimeout(() => resolve('report.pdf'), 2000))
}

function showToast() {
  toast.promise(upload(), {
    loading: { title: 'Uploading file...', description: 'Your file is being uploaded.' },
    success: name => ({
      title: 'File uploaded!',
      description: `${name} has been successfully uploaded.`,
      icon: CheckLIcon,
      color: 'air-primary-success'
    }),
    error: {
      title: 'Upload failed',
      description: 'Something went wrong, please try again.',
      icon: CrossMIcon,
      color: 'air-primary-alert'
    }
  })
}
</script>

<template>
  <B24Button label="Show toast" @click="showToast" />
</template>
