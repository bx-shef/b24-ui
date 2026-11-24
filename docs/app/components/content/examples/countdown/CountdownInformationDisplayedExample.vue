<script setup lang="ts">
import { ref } from 'vue'

const value = ref(2 * 24 * 60 * 60)
</script>

<template>
  <B24Countdown
    v-slot="{ days, hours, minutes, seconds }"
    :seconds="value"
  >
    Осталось：{{ days }} дн., {{ hours }} ч, {{ minutes }} мин, {{ seconds }} с.
  </B24Countdown>
</template>
