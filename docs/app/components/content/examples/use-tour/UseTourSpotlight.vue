<script setup lang="ts">
import type { UseTourReturn } from '@bxshefby/b24ui-nuxt/composables'
import { useElementBounding, useWindowSize } from '@vueuse/core'

const props = withDefaults(defineProps<{
  tour: UseTourReturn
  padding?: number
}>(), {
  padding: 8
})

// Измерять можно только настоящие элементы: шаг по центру привязывается к виртуальному элементу,
// который `ResizeObserver` и `MutationObserver` отвергают.
const target = computed(() => {
  const el = props.tour.reference.value
  return el && el instanceof Element ? el as HTMLElement : null
})

const { top, left, width: targetWidth, height: targetHeight } = useElementBounding(target)
const { width, height } = useWindowSize()

// Собственный радиус скругления цели, чтобы радиус темы сохранялся. Читается раз за шаг, а не на каждый кадр.
const targetRadius = computed(() => target.value ? Number.parseFloat(getComputedStyle(target.value).borderTopLeftRadius) || 0 : 0)

// Рамка физическая даже в RTL, поэтому ниже у кольца `left: 0` и `translate`.
const hole = computed(() => {
  // Цель, удалённая из DOM, измерялась бы как пустая рамка в начале координат.
  if (!target.value?.isConnected) {
    return null
  }

  const p = props.padding
  const w = targetWidth.value + p * 2
  const h = targetHeight.value + p * 2
  // Концентрические углы: у скруглённой цели радиус плюс отступ, у квадратной — прямые углы.
  const r = targetRadius.value > 0 ? targetRadius.value + p : 0
  return { x: left.value - p, y: top.value - p, w, h, r: Math.min(r, w / 2, h / 2) }
})

// Подложка на весь экран со скруглённым вырезом. `clip-path` обрезает и проверку попаданий,
// поэтому цель остаётся кликабельной, пока остальная страница заблокирована.
const clipPath = computed(() => {
  if (!hole.value) {
    return undefined
  }

  const { x, y, w, h, r } = hole.value
  return `path(evenodd, "M0 0H${width.value}V${height.value}H0Z M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${2 * r - w}a${r} ${r} 0 0 1 ${-r} ${-r}v${2 * r - h}a${r} ${r} 0 0 1 ${r} ${-r}Z")`
})
</script>

<template>
  <Teleport to="body">
    <template v-if="tour.open.value">
      <div aria-hidden="true" class="fixed inset-0 z-40 bg-[#003366]/20" :style="{ clipPath }" />
      <div
        v-if="hole"
        aria-hidden="true"
        class="fixed top-0 z-40 pointer-events-none ring-2 ring-(--ui-color-design-selection-stroke)"
        :style="{ left: 0, width: `${hole.w}px`, height: `${hole.h}px`, borderRadius: `${hole.r}px`, transform: `translate(${hole.x}px, ${hole.y}px)` }"
      />
    </template>
  </Teleport>
</template>
