<script setup lang="ts">
import type { InputMenuItem } from '@bxshefby/b24ui-nuxt'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import MyPlanIcon from '@bitrix24/b24icons-vue/main/MyPlanIcon'
import Shield2DefendedIcon from '@bitrix24/b24icons-vue/main/Shield2DefendedIcon'

const items = ref([
  {
    label: 'Настройки CRM',
    value: 'settings',
    icon: SettingsIcon
  },
  {
    label: 'Реквизиты моей компании',
    value: 'my_company_details',
    icon: MyPlanIcon
  },
  {
    label: 'В работе',
    value: 'in_progress'
  },
  {
    label: 'Права доступа',
    value: 'access_permissions',
    icon: Shield2DefendedIcon
  }
] satisfies InputMenuItem[])

const value = ref(items.value[0])
</script>

<template>
  <B24InputMenu v-model="value" :icon="value?.icon" :items="items" />
</template>
