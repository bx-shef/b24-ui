<script setup lang="ts">
import type { FormSubmitEvent } from '@bxshefby/b24ui-nuxt'
import * as z from 'zod'
import ImageIcon from '@bitrix24/b24icons-vue/outline/ImageIcon'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const MIN_DIMENSIONS = { width: 200, height: 200 }
const MAX_DIMENSIONS = { width: 4096, height: 4096 }
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ', 'ЭБ', 'ЗБ', 'ЙБ']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const schema = z.object({
  avatar: z
    .instanceof(File, {
      message: 'Выберите файл изображения.'
    })
    .refine(file => file.size <= MAX_FILE_SIZE, {
      message: `Изображение слишком большое. Выберите изображение меньше ${formatBytes(MAX_FILE_SIZE)}.`
    })
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Загрузите корректный файл изображения (JPEG, PNG или WebP).'
    })
    .refine(
      file =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const img = new Image()
            img.onload = () => {
              const meetsDimensions
                = img.width >= MIN_DIMENSIONS.width
                  && img.height >= MIN_DIMENSIONS.height
                  && img.width <= MAX_DIMENSIONS.width
                  && img.height <= MAX_DIMENSIONS.height
              resolve(meetsDimensions)
            }
            img.src = e.target?.result as string
          }
          reader.readAsDataURL(file)
        }),
      {
        message: `Недопустимые размеры изображения. Загрузите изображение от ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} до ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} пикселей.`
      }
    )
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  avatar: undefined
})

function createObjectUrl(file: File): string {
  return URL.createObjectURL(file)
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
}
</script>

<template>
  <B24Form :schema="schema" :state="state" class="space-y-4 w-64" @submit="onSubmit">
    <B24FormField name="avatar" label="Аватар" description="JPG, GIF или PNG. Не более 1 МБ.">
      <B24FileUpload v-slot="{ open, removeFile }" v-model="state.avatar" accept="image/*">
        <div class="flex flex-wrap items-center gap-3">
          <B24Avatar size="lg" :src="state.avatar ? createObjectUrl(state.avatar) : undefined" :icon="ImageIcon" />

          <B24Button :label="state.avatar ? 'Изменить изображение' : 'Загрузить изображение'" color="air-selection" @click="open()" />
        </div>

        <p v-if="state.avatar" class="text-(length:--ui-font-size-xs) text-description mt-1.5">
          {{ state.avatar.name }}

          <B24Button
            label="Удалить"
            color="air-primary-alert"
            size="xs"
            class="p-0"
            @click="removeFile()"
          />
        </p>
      </B24FileUpload>
    </B24FormField>

    <B24Button type="submit" label="Отправить" />
  </B24Form>
</template>
