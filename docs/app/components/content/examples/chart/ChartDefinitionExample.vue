<script setup lang="ts">
import { defineChart, lineY, ruleY } from '@tanstack/charts'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { scalePoint } from '@tanstack/charts/scales/point'

const data = [
  { month: 'Январь', revenue: 186 },
  { month: 'Февраль', revenue: 305 },
  { month: 'Март', revenue: 237 },
  { month: 'Апрель', revenue: 273 },
  { month: 'Май', revenue: 209 },
  { month: 'Июнь', revenue: 314 }
]

const definition = defineChart({
  marks: [
    ruleY([250], { stroke: 'var(--ui-color-accent-main-alert)', strokeDasharray: '4 4' }),
    lineY(data, { x: 'month', y: 'revenue', stroke: 'var(--ui-color-accent-main-primary)', strokeWidth: 2, points: true })
  ],
  scales: {
    x: { scale: () => scalePoint<string>().padding(0.2) },
    y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Выручка' } }
  }
})
</script>

<template>
  <B24Chart :definition="definition" aria-label="Выручка и целевой показатель" />
</template>
