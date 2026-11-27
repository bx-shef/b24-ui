<script setup lang="ts">
import type { SplitterItem } from '@bxshefby/b24ui-nuxt'

const card = 'bg-(--ui-color-bg-content-secondary) border border-(--ui-color-divider-default) rounded-(--ui-border-radius-md) items-center justify-center text-description font-(--ui-font-weight-medium)'

const items: SplitterItem[] = [
  { slot: 'left', minSize: 15, defaultSize: 25, class: card },
  { slot: 'main', minSize: 30, defaultSize: 50, class: card },
  { slot: 'right', minSize: 15, defaultSize: 25, class: card }
]
</script>

<template>
  <div class="w-full h-96">
    <B24Splitter id="splitter-example" :items="items">
      <template #left>
        Слева
      </template>

      <template #main>
        Основная часть
      </template>

      <template #right>
        Справа
      </template>
    </B24Splitter>
  </div>
</template>
