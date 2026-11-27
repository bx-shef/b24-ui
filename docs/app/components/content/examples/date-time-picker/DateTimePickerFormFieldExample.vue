<script setup lang="ts">
import { shallowRef } from 'vue'
import type { DateValue } from '@internationalized/date'

const value = shallowRef<DateValue | undefined>()
</script>

<template>
  <B24FormField label="Срок" hint="Видно всем, кто работает со сделкой" class="w-full">
    <B24DateTimePicker v-model="value" placeholder="Не задано" />
  </B24FormField>
</template>
