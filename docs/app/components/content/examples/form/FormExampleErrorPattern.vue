<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@bxshefby/b24ui-nuxt'

const schema = z.object({
  email: z.email('Некорректный email'),
  tags: z.array(z.string().regex(/^[a-z-]+$/, 'Только строчные буквы и дефисы')).min(1, 'Добавьте хотя бы один тег')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  tags: []
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Успешно', description: 'Форма отправлена.', color: 'air-primary-success' })
  console.log(event.data)
}
</script>

<template>
  <B24Form :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <B24FormField label="Email" name="email">
      <B24Input v-model="state.email" />
    </B24FormField>

    <B24FormField label="Теги" name="tags" :error-pattern="/^tags\..+/">
      <B24InputTags v-model="state.tags" />
    </B24FormField>

    <B24Button color="air-primary" type="submit">
      Отправить
    </B24Button>
  </B24Form>
</template>
