<script setup lang="ts">
const data = [
  { browser: 'Chrome', visitors: 275 },
  { browser: 'Safari', visitors: 200 },
  { browser: 'Firefox', visitors: 187 },
  { browser: 'Edge', visitors: 173 }
]
</script>

<template>
  <B24Chart
    type="donut"
    :data="data"
    index="browser"
    :categories="['visitors']"
    legend
    aria-label="Посетители по браузерам"
  >
    <template #center>
      <span class="text-(length:--ui-font-size-4xl) font-(--ui-font-weight-semi-bold) text-legend">835</span>
      <span class="text-(length:--ui-font-size-xs) text-description">Посетителей</span>
    </template>
  </B24Chart>
</template>
