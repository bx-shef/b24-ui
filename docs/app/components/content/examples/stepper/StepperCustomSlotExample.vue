<script setup lang="ts">
import type { StepperItem } from '@bxshefby/b24ui-nuxt'
import LocationIcon from '@bitrix24/b24icons-vue/outline/LocationIcon'
import DeliveryIcon from '@bitrix24/b24icons-vue/outline/DeliveryIcon'

const items: StepperItem[] = [
  {
    title: 'Адрес',
    description: 'Укажите свой адрес',
    icon: LocationIcon,
    slot: 'address'
  }, {
    title: 'Доставка',
    description: 'Выберите предпочтительный способ доставки',
    icon: DeliveryIcon,
    slot: 'shipping'
  }, {
    title: 'Оформление заказа',
    description: 'Подтвердите заказ',
    slot: 'checkout'
  }
]
</script>

<template>
  <B24Stepper :items="items" class="w-full">
    <template #address>
      <Placeholder class="h-[200px]">
        Адрес
      </Placeholder>
    </template>

    <template #shipping>
      <Placeholder class="h-[200px]">
        Доставка
      </Placeholder>
    </template>

    <template #checkout>
      <Placeholder class="h-[200px]">
        Оформление заказа
      </Placeholder>
    </template>
  </B24Stepper>
</template>
