<script setup lang="ts">
import type { NavigationMenuItem } from '@bxshefby/b24ui-nuxt'
import InfoCircleIcon from '@bitrix24/b24icons-vue/outline/InfoCircleIcon'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import UserGroupIcon from '@bitrix24/b24icons-vue/common-b24/UserGroupIcon'
import Bell1Icon from '@bitrix24/b24icons-vue/main/Bell1Icon'
import OpenBookIcon from '@bitrix24/b24icons-vue/main/OpenBookIcon'

const items: NavigationMenuItem[][] = [
  [
    {
      label: 'Общие',
      icon: UserIcon,
      active: true
    },
    {
      label: 'Участники',
      icon: UserGroupIcon
    },
    {
      label: 'Уведомления',
      icon: Bell1Icon
    }
  ],
  [
    {
      label: 'Документация',
      icon: OpenBookIcon,
      to: 'https://bitrix24.github.io/b24ui/',
      target: '_blank'
    },
    {
      label: 'Помощь и обратная связь',
      icon: InfoCircleIcon,
      to: 'https://github.com/bitrix24/b24ui',
      target: '_blank'
    }
  ]
]
</script>

<template>
  <B24DashboardToolbar>
    <B24NavigationMenu :items="items" highlight class="flex-1" />
  </B24DashboardToolbar>
</template>
