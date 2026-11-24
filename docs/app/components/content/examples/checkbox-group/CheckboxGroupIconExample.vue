<script setup lang="ts">
import type { CheckboxGroupItem } from '@bitrix24/b24ui-nuxt'
import ThemeIcon from '@bitrix24/b24icons-vue/outline/ThemeIcon'
import SunIcon from '@bitrix24/b24icons-vue/outline/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/outline/MoonIcon'

const items: CheckboxGroupItem[] = [
  { label: 'Системная', value: 'system', icon: ThemeIcon, class: 'w-24' },
  { label: 'Светлая', value: 'light', icon: SunIcon, class: 'w-24' },
  { label: 'Тёмная', value: 'dark', icon: MoonIcon, class: 'w-24' }
]
</script>

<template>
  <B24CheckboxGroup
    :items="items"
    :default-value="['system']"
    indicator="hidden"
    orientation="horizontal"
    variant="table"
  />
</template>
