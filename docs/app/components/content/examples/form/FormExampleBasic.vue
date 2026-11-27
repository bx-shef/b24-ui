<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@bxshefby/b24ui-nuxt'

const state = reactive({
  email: undefined,
  password: undefined
})

type Schema = typeof state

function validate(state: Partial<Schema>): FormError[] {
  const errors = []
  if (!state.email) errors.push({ name: 'email', message: 'Обязательное поле' })
  if (!state.password) errors.push({ name: 'password', message: 'Обязательное поле' })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Успешно', description: 'Форма отправлена.', color: 'air-primary-success' })
  console.log(event.data)
}
</script>

<template>
  <B24Form :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
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
