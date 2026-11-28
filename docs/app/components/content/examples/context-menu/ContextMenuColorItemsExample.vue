<script setup lang="ts">
import type { ContextMenuItem } from '@bxshefby/b24ui-nuxt'
import OpenedEyeIcon from '@bitrix24/b24icons-vue/main/OpenedEyeIcon'
import TrashBinIcon from '@bitrix24/b24icons-vue/main/TrashBinIcon'
import CopyPlatesIcon from '@bitrix24/b24icons-vue/actions/CopyPlatesIcon'
import PencilDrawIcon from '@bitrix24/b24icons-vue/actions/PencilDrawIcon'

const items: ContextMenuItem[][] = [
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
  <B24ContextMenu :items="items">
    <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-legend text-(length:--ui-font-size-sm) bg-default aspect-video w-72">
      Нажмите правой кнопкой мыши
    </div>
  </B24ContextMenu>
</template>
