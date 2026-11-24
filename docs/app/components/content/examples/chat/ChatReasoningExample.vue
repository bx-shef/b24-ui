<script setup lang="ts">
const streaming = ref(false)
const text = ref('')

async function simulateStreaming() {
  streaming.value = true
  text.value = ''

  const content = 'Пользователь спрашивает про Vue-компоненты. Нужно объяснить паттерн Composition API и как он связан с вопросом о реактивном управлении состоянием. Подумаю, как лучше выстроить ответ.\n\nСначала нужно учесть ключевые отличия Options API от Composition API. Composition API появился во Vue 3, чтобы снять ограничения Options API при создании крупных приложений.\n\nДля реактивного управления состоянием Composition API предлагает ref() для примитивных значений и reactive() для объектов.'

  for (const char of content) {
    text.value += char
    await new Promise(resolve => setTimeout(resolve, 10))
  }

  streaming.value = false
}

onMounted(simulateStreaming)
</script>

<template>
  <B24ChatReasoning
    :text="text"
    :streaming="streaming"
    class="w-60"
  />
</template>
