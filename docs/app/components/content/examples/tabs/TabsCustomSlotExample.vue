<script setup lang="ts">
import type { TabsItem } from '@bxshefby/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Shield2ContourIcon from '@bitrix24/b24icons-vue/main/Shield2ContourIcon'

const items = [
  {
    label: 'Аккаунт',
    description: 'Здесь можно изменить данные аккаунта. Нажмите «Сохранить», когда закончите.',
    icon: UserIcon,
    slot: 'account' as const
  },
  {
    label: 'Пароль',
    description: 'Здесь можно сменить пароль. После сохранения вы выйдете из системы.',
    icon: Shield2ContourIcon,
    slot: 'password' as const
  }
] satisfies TabsItem[]

const state = reactive({
  name: 'System User',
  username: 'system-user',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
</script>

<template>
  <B24Tabs :items="items" variant="link" :b24ui="{ trigger: 'grow' }" class="gap-4 w-full">
    <template #account="{ item }">
      <ProseP accent="less" class="mb-4">
        {{ item.description }}
      </ProseP>

      <B24Form :state="state" class="flex flex-col gap-4">
        <B24FormField label="Имя" name="name">
          <B24Input v-model="state.name" class="w-full" />
        </B24FormField>
        <B24FormField label="Имя пользователя" name="username">
          <B24Input v-model="state.username" class="w-full" />
        </B24FormField>

        <B24Button label="Сохранить изменения" type="submit" color="air-primary-success" class="self-end" />
      </B24Form>
    </template>

    <template #password="{ item }">
      <ProseP accent="less" class="mb-4">
        {{ item.description }}
      </ProseP>

      <B24Form :state="state" class="flex flex-col gap-4">
        <B24FormField label="Текущий пароль" name="current" required>
          <B24Input v-model="state.currentPassword" type="password" required class="w-full" />
        </B24FormField>
        <B24FormField label="Новый пароль" name="new" required>
          <B24Input v-model="state.newPassword" type="password" required class="w-full" />
        </B24FormField>
        <B24FormField label="Подтверждение пароля" name="confirm" required>
          <B24Input v-model="state.confirmPassword" type="password" required class="w-full" />
        </B24FormField>

        <B24Button label="Сменить пароль" type="submit" color="air-primary-success" class="self-end" />
      </B24Form>
    </template>
  </B24Tabs>
</template>
