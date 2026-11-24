<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'

const items = [
  {
    label: 'Воронка продаж',
    icon: ConnectionIcon
  },
  {
    label: 'Аналитика продаж',
    badge: '+3'
  },
  {
    label: 'Ресурсы'
  },
  {
    label: 'Поддержка',
    icon: Info1Icon,
    slot: 'support' as const
  }
] satisfies NavigationMenuItem[]
</script>

<template>
  <B24NavigationMenu :items="items" class="w-full justify-center">
    <template #support-trailing>
      <B24Badge label="44" size="sm" />
    </template>
  </B24NavigationMenu>
</template>
