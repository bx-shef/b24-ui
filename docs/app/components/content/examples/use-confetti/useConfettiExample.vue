<script setup lang="ts">
const confetti = useConfetti()

function fireConfetti(): void {
  confetti.fire()
}
</script>

<template>
  <B24Button label="простой" color="air-primary" @click.stop="fireConfetti" />
</template>
