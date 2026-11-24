<script setup lang="ts">
import type { ContextMenuItem } from '@bitrix24/b24ui-nuxt'

const showSidebar = ref(true)
const showToolbar = ref(false)

const items = computed<ContextMenuItem[]>(() => [
  {
    label: 'Просмотр',
    type: 'label' as const
  },
  {
    label: 'Показывать боковое меню',
    type: 'checkbox' as const,
    checked: showSidebar.value,
    onUpdateChecked(checked: boolean) {
      showSidebar.value = checked
    },
    onSelect(e: Event) {
      e.preventDefault()
    }
  },
  {
    label: 'Показывать панель инструментов',
    type: 'checkbox' as const,
    checked: showToolbar.value,
    onUpdateChecked(checked: boolean) {
      showToolbar.value = checked
    }
  },
  {
    type: 'separator' as const
  },
  {
    label: 'Свернуть закреплённые вкладки',
    type: 'checkbox' as const,
    disabled: true
  }
])
</script>

<template>
  <B24ContextMenu :items="items">
    <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-legend text-(length:--ui-font-size-sm) bg-default aspect-video w-72">
      Нажмите правой кнопкой мыши
    </div>
  </B24ContextMenu>
</template>
