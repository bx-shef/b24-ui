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
  <B24DropdownMenu :items="items" :b24ui="{ content: 'w-48', viewport: 'w-48' }">
    <B24Button label="Открыть" :icon="HamburgerMenuIcon" />
  </B24DropdownMenu>
</template>
