<script setup lang="ts">
import { object, string, nonempty, refine } from 'superstruct'
import type { Infer } from 'superstruct'
import type { FormSubmitEvent } from '@bxshefby/b24ui-nuxt'

const schema = object({
  email: nonempty(string()),
  password: refine(string(), 'Password', (value) => {
    if (value.length >= 8) return true
    return 'Минимум 8 символов'
  })
})

const state = reactive({
  email: '',
  password: ''
})

type Schema = Infer<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
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
