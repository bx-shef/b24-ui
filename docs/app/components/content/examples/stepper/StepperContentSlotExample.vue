<script setup lang="ts">
import type { StepperItem } from '@bxshefby/b24ui-nuxt'
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
</script>

<template>
  <B24Stepper ref="stepper" :items="items" class="w-full">
    <template #content="{ item }">
      <Placeholder class="h-[200px]">
        Это шаг «{{ item?.title }}».
      </Placeholder>
    </template>
  </B24Stepper>
</template>
