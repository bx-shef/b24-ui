<script setup lang="ts">
import type { DropdownMenuItem } from '@bxshefby/b24ui-nuxt'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'
import OpenedEyeIcon from '@bitrix24/b24icons-vue/main/OpenedEyeIcon'
import TrashBinIcon from '@bitrix24/b24icons-vue/main/TrashBinIcon'
import CopyPlatesIcon from '@bitrix24/b24icons-vue/actions/CopyPlatesIcon'
import PencilDrawIcon from '@bitrix24/b24icons-vue/actions/PencilDrawIcon'

const items: DropdownMenuItem[][] = [
  [
    {
      label: 'Просмотр',
      icon: OpenedEyeIcon
    },
    {
      label: 'Копировать',
      icon: CopyPlatesIcon
    },
    {
      label: 'Изменить',
      icon: PencilDrawIcon
    }
  ],
  [
    {
      label: 'Удалить',
      color: 'air-primary-alert' as const,
      icon: TrashBinIcon
    }
  ]
]
</script>

<template>
  <B24DropdownMenu :items="items" :b24ui="{ content: 'w-(--reka-dropdown-menu-trigger-width)', viewport: 'min-w-(--reka-dropdown-menu-trigger-width) w-(--reka-dropdown-menu-trigger-width)' }">
    <B24Button
      label="Открыть"
      class="w-46"
      block
      :icon="HamburgerMenuIcon"
    />
  </B24DropdownMenu>
</template>
