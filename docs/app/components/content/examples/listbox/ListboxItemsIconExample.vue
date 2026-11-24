<script setup lang="ts">
import type { ListboxItem } from '@bitrix24/b24ui-nuxt'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
import CirclePlusIcon from '@bitrix24/b24icons-vue/outline/CirclePlusIcon'
import InfoCircleIcon from '@bitrix24/b24icons-vue/outline/InfoCircleIcon'
import SyncCircleIcon from '@bitrix24/b24icons-vue/main/SyncCircleIcon'

const items = ref<ListboxItem[]>([
  {
    label: 'Бэклог',
    icon: InfoCircleIcon,
    value: 'backlog'
  },
  {
    label: 'К выполнению',
    icon: CirclePlusIcon,
    value: 'todo'
  },
  {
    label: 'В работе',
    icon: SyncCircleIcon,
    value: 'in_progress'
  },
  {
    label: 'Готово',
    icon: CircleCheckIcon,
    value: 'done'
  }
])
</script>

<template>
  <B24Listbox :items="items" class="w-full" />
</template>
