<script setup lang="ts">
import type { SelectItem } from '@bitrix24/b24ui-nuxt'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import MyPlanIcon from '@bitrix24/b24icons-vue/main/MyPlanIcon'
import Shield2DefendedIcon from '@bitrix24/b24icons-vue/main/Shield2DefendedIcon'

const items = ref([
  {
    label: 'Настройки CRM',
    value: 'settings',
    color: 'air-primary',
    icon: SettingsIcon
  },
  {
    label: 'Реквизиты моей компании',
    value: 'my_company_details',
    color: 'air-primary-success',
    icon: MyPlanIcon
  },
  {
    label: 'В работе',
    value: 'in_progress'
  },
  {
    label: 'Права доступа',
    value: 'access_permissions',
    color: 'air-primary-alert',
    icon: Shield2DefendedIcon
  }
] satisfies SelectItem[])

const value = ref(items.value[0]?.value)

const icon = computed(() => items.value.find(item => item.value === value.value)?.icon)
</script>

<template>
  <B24Select v-model="value" :icon="icon" :items="items" value-key="value" class="w-48" />
</template>
