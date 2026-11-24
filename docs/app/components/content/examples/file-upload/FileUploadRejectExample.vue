<script setup lang="ts">
import ImageIcon from '@bitrix24/b24icons-vue/outline/ImageIcon'

const value = ref<File[]>([])

const toast = useToast()

function onReject(files: File[]) {
  toast.add({
    title: 'Допускаются только изображения',
    description: files.map(file => file.name).join(', '),
    color: 'air-primary-alert'
  })
}
</script>

<template>
  <B24FileUpload
    v-model="value"
    accept="image/*"
    :icon="ImageIcon"
    label="Перетащите изображения сюда"
    description="SVG, PNG, JPG или GIF"
    multiple
    class="w-96 min-h-48"
    @reject="onReject"
  />
</template>
