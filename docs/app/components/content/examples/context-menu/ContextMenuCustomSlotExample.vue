<script setup lang="ts">
import type { ContextMenuItem } from '@bitrix24/b24ui-nuxt'
import SpinnerIcon from '@bitrix24/b24icons-vue/specialized/SpinnerIcon'

const loading = ref(true)

const items = [
  {
    label: 'Обновить страницу',
    slot: 'refresh' as const
  },
  {
    label: 'Очистить cookie и обновить'
  },
  {
    label: 'Очистить кэш и обновить'
  }
] satisfies ContextMenuItem[]
</script>

<template>
  <B24ContextMenu :items="items">
    <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-legend text-(length:--ui-font-size-sm) bg-default aspect-video w-72">
      Нажмите правой кнопкой мыши
    </div>

    <template #refresh-label>
      {{ loading ? 'Обновление...' : 'Обновить страницу' }}
    </template>

    <template #refresh-trailing>
      <SpinnerIcon v-if="loading" class="shrink-0 size-5 text-(--ui-color-accent-main-primary) animate-spin" />
    </template>
  </B24ContextMenu>
</template>
