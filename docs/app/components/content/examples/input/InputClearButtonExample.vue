<script setup lang="ts">
import CircleCrossIcon from '@bitrix24/b24icons-vue/outline/CircleCrossIcon'

const value = ref('Нажмите, чтобы очистить')
</script>

<template>
  <B24Input
    v-model="value"
    placeholder="Введите что-нибудь..."
    :b24ui="{ trailing: 'pe-1' }"
  >
    <template v-if="value?.length" #trailing>
      <B24Button
        size="sm"
        color="air-tertiary-no-accent"
        :icon="CircleCrossIcon"
        aria-label="Очистить поле"
        @click="value = ''"
      />
    </template>
  </B24Input>
</template>
