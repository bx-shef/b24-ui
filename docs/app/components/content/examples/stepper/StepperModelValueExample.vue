<script setup lang="ts">
import type { StepperItem } from '@bitrix24/b24ui-nuxt'
import { onMounted, ref } from 'vue'
import LocationIcon from '@bitrix24/b24icons-vue/outline/LocationIcon'
import DeliveryIcon from '@bitrix24/b24icons-vue/outline/DeliveryIcon'

const items: StepperItem[] = [
  {
    title: 'Адрес',
    description: 'Укажите свой адрес',
    icon: LocationIcon
  }, {
    title: 'Доставка',
    description: 'Выберите предпочтительный способ доставки',
    icon: DeliveryIcon
  }, {
    title: 'Оформление заказа',
    description: 'Подтвердите заказ'
  }
]

const active = ref(0)

// Примечание: только для демонстрации, в реальном проекте так делать не стоит.
onMounted(() => {
  setInterval(() => {
    active.value = (active.value + 1) % items.length
  }, 2000)
})
</script>

<template>
  <B24Stepper v-model="active" :items="items" class="w-full">
    <template #content="{ item }">
      <Placeholder class="h-[200px]">
        Это шаг «{{ item?.title }}».
      </Placeholder>
    </template>
  </B24Stepper>
</template>
