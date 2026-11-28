<script setup lang="ts">
import ImageIcon from '@bitrix24/b24icons-vue/outline/ImageIcon'
import UploadIcon from '@bitrix24/b24icons-vue/outline/UploadIcon'

const value = ref<File[]>([])
</script>

<template>
  <B24FileUpload
    v-model="value"
    :icon="ImageIcon"
    label="Перетащите изображения сюда"
    description="SVG, PNG, JPG или GIF (не более 2 МБ)"
    layout="grid"
    multiple
    :interactive="false"
    class="w-96 min-h-48"
  >
    <template #actions="{ open }">
      <B24Button
        label="Выберите изображения"
        :icon="UploadIcon"
        color="air-selection"
        @click="open()"
      />
    </template>

    <template #files-top="{ open, files }">
      <div v-if="files?.length" class="mb-2 flex items-center justify-between">
        <p class="font-(--ui-font-weight-bold)">
          Files ({{ files?.length }})
        </p>

        <B24Button
          label="Добавить ещё"
          color="air-selection"
          class="-my-2"
          @click="open()"
        />
      </div>
    </template>
  </B24FileUpload>
</template>
