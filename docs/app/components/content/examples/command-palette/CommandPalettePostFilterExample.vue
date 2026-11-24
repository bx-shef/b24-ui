<script setup lang="ts">
const items = [
  {
    id: '/',
    label: 'Введение',
    level: 1
  },
  {
    id: '/docs/getting-started/#whats-new-in-v3',
    label: 'Что нового в v3?',
    level: 2
  },
  {
    id: '/docs/getting-started/#reka-ui',
    label: 'Reka UI',
    level: 3
  },
  {
    id: '/docs/getting-started/',
    label: 'Tailwind CSS',
    level: 3
  },
  {
    id: '/docs/getting-started/#tailwind-variants',
    label: 'Tailwind Variants',
    level: 3
  },
  {
    id: '/docs/getting-started/installation/',
    label: 'Установка',
    level: 1
  }
]

function postFilter(searchTerm: string, items: any[]) {
  // Без searchTerm фильтруем только элементы первого уровня
  if (!searchTerm) {
    return items?.filter(item => item.level === 1)
  }

  return items
}
</script>

<template>
  <B24CommandPalette :groups="[{ id: 'files', items, postFilter }]" class="flex-1" />
</template>
