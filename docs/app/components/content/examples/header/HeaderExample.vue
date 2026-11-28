<script setup lang="ts">
import type { NavigationMenuItem } from '@bxshefby/b24ui-nuxt'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Документация',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs/getting-started')
  },
  {
    label: 'Компоненты',
    to: '/docs/components',
    active: route.path.startsWith('/docs/components')
  },
  {
    label: 'REST API',
    to: 'https://apidocs.bitrix24.com',
    target: '_blank'
  },
  {
    label: 'Релизы',
    to: 'https://github.com/bitrix24/b24ui/releases',
    target: '_blank'
  }
])
</script>

<template>
  <B24Header>
    <template #title>
      <Logo class="h-6 w-auto" />
    </template>

    <B24NavigationMenu :items="items" />

    <template #right>
      <B24ColorModeButton />

      <B24Tooltip text="Открыть на GitHub" :kbds="['meta', 'G']">
        <B24Button
          to="https://github.com/bitrix24/b24ui"
          target="_blank"
          :icon="GitHubIcon"
          aria-label="GitHub"
        />
      </B24Tooltip>
    </template>
  </B24Header>
</template>
