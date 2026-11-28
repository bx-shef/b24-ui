<script setup lang="ts">
import type { DropdownMenuItem } from '@bxshefby/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import PaymentIcon from '@bitrix24/b24icons-vue/outline/PaymentIcon'
import Settings3Icon from '@bitrix24/b24icons-vue/actions/Settings3Icon'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})

const items: DropdownMenuItem[] = [
  {
    label: 'Профиль',
    icon: UserIcon,
    slot: 'profile' as const
  }, {
    label: 'Оплата',
    icon: PaymentIcon
  }, {
    label: 'Настройки',
    icon: Settings3Icon
  }
]
</script>

<template>
  <B24DropdownMenu v-model:open="open" :items="items" :b24ui="{ content: 'w-50', viewport: 'w-50' }">
    <B24Button label="Открыть" :icon="HamburgerMenuIcon" />
  </B24DropdownMenu>
</template>
