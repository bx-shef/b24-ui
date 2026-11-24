<script setup lang="ts">
const data = [
  { month: 'Январь', revenue: 18600 },
  { month: 'Февраль', revenue: 30500 },
  { month: 'Март', revenue: 23700 },
  { month: 'Апрель', revenue: 27300 },
  { month: 'Май', revenue: 20900 },
  { month: 'Июнь', revenue: 31400 }
]

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' })
</script>

<template>
  <B24Chart
    type="bar"
    :data="data"
    index="month"
    :categories="[{ key: 'revenue', label: 'Выручка' }]"
    :format="value => currency.format(value)"
    aria-label="Выручка по месяцам"
  />
</template>
