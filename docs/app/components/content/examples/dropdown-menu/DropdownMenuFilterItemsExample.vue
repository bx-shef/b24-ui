<script setup lang="ts">
import type { DropdownMenuItem } from '@bxshefby/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import PaymentIcon from '@bitrix24/b24icons-vue/outline/PaymentIcon'
import Settings3Icon from '@bitrix24/b24icons-vue/actions/Settings3Icon'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'

const items: DropdownMenuItem[][] = [
  [
    {
      label: 'Профиль',
      icon: UserIcon
    }, {
      label: 'Оплата',
      icon: PaymentIcon
    }, {
      label: 'Настройки',
      icon: Settings3Icon
    }
  ],
  [
    {
      label: 'Команда',
      filter: {
        placeholder: 'Найдите участников...'
      },
      children: [
        {
          label: 'Bitrix24',
          avatar: { src: 'https://github.com/bitrix24.png', loading: 'lazy' as const }
        },
        {
          label: 'Bitrix',
          avatar: { src: 'https://github.com/bitrix-tools.png', loading: 'lazy' as const }
        }
      ]
    },
    {
      label: 'Пригласить пользователей',
      children: [
        {
          label: 'Пригласить по email'
        },
        {
          label: 'Пригласить по ссылке'
        },
        {
          label: 'Пригласить по SMS'
        },
        {
          label: 'Пригласить через WhatsApp'
        }
      ]
    },
    {
      label: 'Новая команда'
    }
  ]
]
</script>

<template>
  <B24DropdownMenu :items="items" :content="{ align: 'start' }" :b24ui="{ content: 'w-48', viewport: 'w-48' }">
    <B24Button label="Открыть" :icon="HamburgerMenuIcon" />
  </B24DropdownMenu>
</template>
