<script setup lang="ts">
import { ref } from 'vue'

const value = ref(5)
const counting = ref(false)

const startCountdown = () => {
  counting.value = true
}

const onCountdownEnd = () => {
  counting.value = false
}
</script>

<template>
  <B24Button
    color="air-primary"
    size="xl"
    :disabled="counting"
    @click="startCountdown"
  >
    <B24Countdown
      v-if="counting"
      v-slot="{ totalSeconds }"
      :seconds="value"
      class="text-white dark:text-white text-xl leading-none"
      @end="onCountdownEnd"
    >
      Повторный запрос через {{ totalSeconds }} с
    </B24Countdown>
    <span v-else>
      Получить код подтверждения
    </span>
  </B24Button>
</template>
