<script setup lang="ts">
import ObserverIcon from '@bitrix24/b24icons-vue/outline/ObserverIcon'
import CrossedEyeIcon from '@bitrix24/b24icons-vue/outline/CrossedEyeIcon'

const show = ref(false)
const password = ref('')
</script>

<template>
  <B24Input
    v-model="password"
    placeholder="Пароль"
    :type="show ? 'text' : 'password'"
    :b24ui="{ trailing: 'pe-1' }"
  >
    <template #trailing>
      <B24Button
        size="sm"
        color="air-tertiary-no-accent"
        :icon="show ? CrossedEyeIcon : ObserverIcon"
        :aria-label="show ? 'Скрыть пароль' : 'Показать пароль'"
        :aria-pressed="show"
        aria-controls="password"
        @click="show = !show"
      />
    </template>
  </B24Input>
</template>

<style>
/* Скрываем кнопку показа пароля в Edge */
::-ms-reveal {
    display: none;
}
</style>
