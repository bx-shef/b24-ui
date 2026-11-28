<script setup lang="ts">
import type { FormSubmitEvent } from '@bxshefby/b24ui-nuxt'
import { useRegle, type InferInput } from '@regle/core'
import { required, email, minLength, withMessage } from '@regle/rules'

const { r$ } = useRegle({ email: '', password: '' }, {
  email: { required, email: withMessage(email, 'Некорректный email') },
  password: { required, minLength: withMessage(minLength(8), 'Минимум 8 символов') }
})

type Schema = InferInput<typeof r$>

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Успешно', description: 'Форма отправлена.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <B24Form :schema="r$" :state="r$.$value" class="space-y-4" @submit="onSubmit">
    <B24FormField label="Email" name="email">
      <B24Input v-model="r$.$value.email" />
    </B24FormField>

    <B24FormField label="Пароль" name="password">
      <B24Input v-model="r$.$value.password" type="password" />
    </B24FormField>

    <B24Button type="submit">
      Отправить
    </B24Button>
  </B24Form>
</template>
