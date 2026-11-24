<script setup lang="ts">
import type { TabsItem } from '@bitrix24/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Shield2ContourIcon from '@bitrix24/b24icons-vue/main/Shield2ContourIcon'

const items: TabsItem[] = [
  {
    label: 'Аккаунт',
    icon: UserIcon
  },
  {
    label: 'Пароль',
    icon: Shield2ContourIcon
  }
]

const active = ref('0')

// Примечание: только для демонстрации, в реальном проекте так делать не стоит.
onMounted(() => {
  setInterval(() => {
    active.value = String((Number(active.value) + 1) % items.length)
  }, 2000)
})
</script>

<template>
  <B24Tabs v-model="active" :content="false" :items="items" class="w-full" />
</template>
