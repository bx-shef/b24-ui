<script setup lang="ts">
import type { DropdownMenuItem } from '@bxshefby/b24ui-nuxt'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import CreditDebitCardIcon from '@bitrix24/b24icons-vue/main/CreditDebitCardIcon'
import Settings2Icon from '@bitrix24/b24icons-vue/actions/Settings2Icon'
import CirclePlusIcon from '@bitrix24/b24icons-vue/main/CirclePlusIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'

const items: DropdownMenuItem[] = [
  {
    label: 'Мой аккаунт',
    avatar: { src: '/b24ui/avatar/employee.png', loading: 'lazy' as const }
  },
  {
    label: 'Профиль',
    icon: PersonIcon,
    children: [
      {
        label: 'Оплата',
        icon: CreditDebitCardIcon
      },
      {
        label: 'Настройки',
        icon: Settings2Icon
      }
    ]
  },
  {
    label: 'Новая команда',
    icon: CirclePlusIcon
  }
]
</script>

<template>
  <B24FieldGroup>
    <B24Button label="Настройки" />

    <B24DropdownMenu :items="items" :content="{ align: 'end' }">
      <B24Button
        :icon="MoreMIcon"
      />
    </B24DropdownMenu>
  </B24FieldGroup>
</template>
