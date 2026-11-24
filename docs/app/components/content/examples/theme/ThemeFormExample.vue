<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'

const schema = z.object({
  name: z.string().min(2, 'Слишком короткое значение'),
  email: z.email('Некорректный email'),
  bio: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: 'Иван Иванов',
  email: 'john@example.com',
  bio: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Сохранено', description: 'Профиль обновлён.', color: 'air-primary-success' })
  console.log(event.data)
}
</script>

<template>
  <B24Theme
    :props="{
      input: { size: 'lg' },
      textarea: { color: 'air-primary-success' }
    }"
    :b24ui="{
      formField: {
        root: 'flex max-sm:flex-col justify-between gap-4',
        wrapper: 'w-full sm:max-w-80'
      }
    }"
  >
    <B24Form :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
      <B24FormField label="Имя" name="name" description="Ваше отображаемое имя.">
        <B24Input v-model="state.name" />
      </B24FormField>

      <B24FormField label="Email" name="email" description="Используется для уведомлений.">
        <B24Input v-model="state.email" type="email" />
      </B24FormField>

      <B24FormField label="О себе" name="bio" description="Коротко о себе.">
        <B24Textarea v-model="state.bio" placeholder="Расскажите о себе" />
      </B24FormField>

      <div class="flex justify-end">
        <B24Button type="submit">
          Сохранить изменения
        </B24Button>
      </div>
    </B24Form>
  </B24Theme>
</template>
