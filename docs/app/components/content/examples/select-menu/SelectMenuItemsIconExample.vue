<script setup lang="ts">
import type { SelectMenuItem } from '@bitrix24/b24ui-nuxt'
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
] satisfies SelectMenuItem[])

const value = ref(items.value[0])
</script>

<template>
  <B24SelectMenu v-model="value" :icon="value?.icon" :items="items" class="w-48" />
</template>
