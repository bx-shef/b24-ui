<script setup lang="ts">
import { Time } from '@internationalized/date'

const time = shallowRef(new Time(12, 30, 0))
</script>

<template>
  <B24FormField label="Время" help="Укажите время" required>
    <B24InputTime v-model="time" />
  </B24FormField>
</template>
