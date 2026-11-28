<script setup lang="ts">
const testimonial = ref({
  user: {
    name: 'Evan You',
    description: 'Автор Vue.js и Vite',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/499550?v=4',
      alt: 'Evan You',
      loading: 'lazy' as const
    }
  },
  quote: '«Nuxt на инфраструктуре Cloudflare с минимальными усилиями — это огромный шаг!»'
})
</script>

<template>
  <B24PageCard :description="testimonial.quote" class="w-60">
    <template #footer>
      <B24User v-bind="testimonial.user" />
    </template>
  </B24PageCard>
</template>
