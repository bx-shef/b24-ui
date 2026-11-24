<script setup lang="ts">
import ProductIcon from '@bitrix24/b24icons-vue/outline/ProductIcon'
import AddProductIcon from '@bitrix24/b24icons-vue/outline/AddProductIcon'
import RefreshIcon from '@bitrix24/b24icons-vue/outline/RefreshIcon'
</script>

<template>
  <B24Empty
    :icon="ProductIcon"
    title="Проекты не найдены"
    description="Похоже, вы ещё не добавили ни одного проекта. Создайте первый, чтобы начать."
    :actions="[
      {
        label: 'Создать',
        icon: AddProductIcon,
        color: 'air-primary'
      },
      {
        label: 'Обновить',
        icon: RefreshIcon
      }
    ]"
  />
</template>
