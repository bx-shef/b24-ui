<script lang="ts" setup>
import { createReusableTemplate } from '@vueuse/core'

const { screen } = useDevice()

const [DefineFormTemplate, ReuseFormTemplate] = createReusableTemplate()
const open = ref(false)

const state = reactive({
  email: undefined
})

const title = 'Изменить профиль'
const description = 'Здесь можно изменить данные профиля. Нажмите «Сохранить», когда закончите.'
</script>

<template>
  <DefineFormTemplate>
    <B24Form :state="state" class="space-y-4">
      <B24FormField label="Email" name="email" required>
        <B24Input v-model="state.email" placeholder="you@example.com" required />
      </B24FormField>

      <B24Button label="Сохранить изменения" color="air-primary-success" type="submit" />
    </B24Form>
  </DefineFormTemplate>

  <B24Modal v-if="!screen.isMobile" v-model:open="open" :title="title" :description="description">
    <B24Button label="Изменить профиль" />

    <template #body>
      <ReuseFormTemplate />
    </template>
  </B24Modal>

  <B24Drawer v-else v-model:open="open" :title="title" :description="description">
    <B24Button label="Изменить профиль" />

    <template #body>
      <ReuseFormTemplate />
    </template>
  </B24Drawer>
</template>
