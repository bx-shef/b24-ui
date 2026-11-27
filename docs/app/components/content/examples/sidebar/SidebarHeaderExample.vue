<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import MailIcon from '@bitrix24/b24icons-vue/outline/MailIcon'
import ContactIcon from '@bitrix24/b24icons-vue/outline/ContactIcon'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'

const open = ref(true)

const items: NavigationMenuItem[] = [
  {
    label: 'Главная',
    icon: HomeIcon,
    active: true
  },
  {
    label: 'Входящие',
    icon: MailIcon,
    badge: '4'
  },
  {
    label: 'Контакты',
    icon: ContactIcon
  }
]
</script>

<template>
  <div class="flex flex-col flex-1">
    <B24Header title="Заголовок" toggle-side="left" :b24ui="{ container: 'px-4!' }">
      <template #toggle>
        <B24Button
          :icon="HamburgerMenuIcon"
          color="air-tertiary"
          aria-label="Переключить боковое меню"
          @click="open = !open"
        />
      </template>
    </B24Header>

    <div class="flex flex-1 min-h-0">
      <B24Sidebar
        v-model:open="open"
        collapsible="icon"
        :b24ui="{
          gap: 'h-[calc(100%-var(--b24ui-header-height))]',
          container: 'absolute top-(--b24ui-header-height) bottom-0 h-[calc(100%-var(--b24ui-header-height))]'
        }"
      >
        <B24NavigationMenu
          :items="items"
          orientation="vertical"
          :b24ui="{ link: 'p-1.5 overflow-hidden' }"
        />
      </B24Sidebar>

      <div class="flex-1 p-4">
        <Placeholder class="size-full" />
      </div>
    </div>
  </div>
</template>
