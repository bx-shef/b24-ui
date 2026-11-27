<script setup lang="ts">
import { shallowRef } from 'vue'
import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone, today } from '@internationalized/date'
import type { DateTimePickerPreset } from '@bitrix24/b24ui-nuxt'

const value = shallowRef<DateValue | undefined>()

// Функция вычисляется при отрисовке списка, поэтому «через три дня» остаётся
// верным, сколько бы страница ни была открыта.
const presets: DateTimePickerPreset[] = [
  { label: 'Через три дня', value: () => today(getLocalTimeZone()).add({ days: 3 }) },
  { label: 'Через две недели', value: () => today(getLocalTimeZone()).add({ weeks: 2 }) },
  { label: 'Следующий квартал', value: () => today(getLocalTimeZone()).add({ months: 3 }) }
]
</script>

<template>
  <B24DateTimePicker v-model="value" :presets="presets" placeholder="Выберите крайний срок" />
</template>
