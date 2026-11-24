<script setup lang="ts">
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'

const email = ref('')
</script>

<template>
  <B24FormField
    label="Email"
    help="Мы не передаём ваш email третьим лицам."
    required
  >
    <B24Input
      v-model="email"
      placeholder="Введите ваш email"
      :icon="Bitrix24Icon"
    />
  </B24FormField>
</template>
