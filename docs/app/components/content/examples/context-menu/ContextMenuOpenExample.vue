<script setup lang="ts">
import type { ContextMenuItem } from '@bxshefby/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import PaymentIcon from '@bitrix24/b24icons-vue/outline/PaymentIcon'
import Settings3Icon from '@bitrix24/b24icons-vue/actions/Settings3Icon'

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})

const items: ContextMenuItem[] = [
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
]
</script>

<template>
  <B24ContextMenu v-model:open="open" :items="items" :b24ui="{ content: 'w-50' }">
    <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-legend text-(length:--ui-font-size-sm) bg-default aspect-video w-72">
      Нажмите правой кнопкой мыши
    </div>
  </B24ContextMenu>
</template>
