<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'

const schema = v.object({
  email: v.pipe(v.string(), v.email('Некорректный email')),
  password: v.pipe(v.string(), v.minLength(8, 'Минимум 8 символов'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: '',
  password: ''
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

    <B24FormField label="Пароль" name="password">
      <B24Input v-model="state.password" type="password" />
    </B24FormField>

    <B24Button color="air-primary" type="submit">
      Отправить
    </B24Button>
  </B24Form>
</template>
