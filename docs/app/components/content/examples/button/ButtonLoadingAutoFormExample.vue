<script setup lang="ts">
const state = reactive({ fullName: '' })

async function onSubmit() {
  return new Promise<void>(res => setTimeout(res, 1000))
}

async function validate(data: Partial<typeof state>) {
  if (!data.fullName?.length) return [{ name: 'fullName', message: 'Обязательное поле' }]
  return []
}
</script>

<template>
  <B24Form :state="state" :validate="validate" @submit="onSubmit">
    <B24FormField name="fullName" label="Полное имя">
      <B24Input v-model="state.fullName" />
    </B24FormField>
    <B24Button type="submit" class="mt-2" color="air-primary-success" loading-auto>
      Отправить
    </B24Button>
  </B24Form>
</template>
