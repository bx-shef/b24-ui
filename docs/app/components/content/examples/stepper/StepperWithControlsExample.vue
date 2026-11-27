<script setup lang="ts">
import type { StepperItem } from '@bxshefby/b24ui-nuxt'
import ArrowLeftLIcon from '@bitrix24/b24icons-vue/outline/ArrowLeftLIcon'
import ArrowRightLIcon from '@bitrix24/b24icons-vue/outline/ArrowRightLIcon'
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

const stepper = useTemplateRef('stepper')
</script>

<template>
  <div class="w-full">
    <B24Stepper ref="stepper" :items="items">
      <template #content="{ item }">
        <Placeholder class="h-[200px]">
          {{ item.title }}
        </Placeholder>
      </template>
    </B24Stepper>

    <div class="flex gap-2 justify-between mt-4">
      <B24Button
        :disabled="!stepper?.hasPrev"
        label="Назад"
        @click="stepper?.prev()"
      >
        <template #leading>
          <ArrowLeftLIcon class="text-(--ui-btn-color) size-(--ui-btn-icon-size)" />
        </template>
      </B24Button>

      <B24Button
        :disabled="!stepper?.hasNext"
        label="Далее"
        @click="stepper?.next()"
      >
        <template #trailing>
          <ArrowRightLIcon class="text-(--ui-btn-color) size-(--ui-btn-icon-size)" />
        </template>
      </B24Button>
    </div>
  </div>
</template>
