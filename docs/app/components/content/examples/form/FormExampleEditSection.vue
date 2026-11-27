<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@bxshefby/b24ui-nuxt'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'
import CalendarIcon from '@bitrix24/b24icons-vue/outline/CalendarIcon'
import CirclePlusIcon from '@bitrix24/b24icons-vue/main/CirclePlusIcon'
import UserCompanyIcon from '@bitrix24/b24icons-vue/common-b24/UserCompanyIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'

const stages = [
  'Проверка контактных данных',
  'Проектирование решения',
  'Ожидание комплектующих',
  'Запланировано',
  'Завершено'
]

const currencies = ['USD', 'EUR', 'RUB'] as const

const salutations = ['Г-н', 'Г-жа', 'Д-р', 'Не выбрано']

const serviceTypes = [
  'Монтаж на месте',
  'Удалённая настройка',
  'Консультация',
  'Договор обслуживания'
]

const schema = z.object({
  stage: z.string().min(1, 'Выберите стадию'),
  amount: z.number().nonnegative('Сумма должна быть не меньше 0'),
  currency: z.enum(currencies),
  company: z.string().optional(),
  contact: z.string().optional(),
  salutation: z.string().optional(),
  lastName: z.string().min(1, 'Укажите фамилию'),
  firstName: z.string().min(1, 'Укажите имя'),
  serviceType: z.string().min(1, 'Выберите тип услуги'),
  // B24InputDate работает с DateValue из @internationalized/date, а не с нативной датой Date,
  // поэтому поле здесь типизировано свободно, а не через z.date().
  scheduledAt: z.any().optional()
})

type Schema = z.output<typeof schema>

function defaultState(): Partial<Schema> {
  return {
    stage: 'Проверка контактных данных',
    amount: 0,
    currency: 'USD',
    company: undefined,
    contact: undefined,
    salutation: 'Не выбрано',
    lastName: 'Сидоров',
    firstName: 'Иван',
    serviceType: undefined,
    scheduledAt: undefined
  }
}

const state = reactive<Partial<Schema>>(defaultState())

const clientGroupId = useId()
const scheduledAtInput = useTemplateRef('scheduledAtInput')

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Заказ сохранён', description: 'Данные заказа отправлены.', color: 'air-primary-success' })
  console.log(event.data)
}

function onCancel() {
  Object.assign(state, defaultState())
}
</script>

<template>
  <B24Form :schema="schema" :state="state" class="space-y-4 w-full max-w-lg" @submit="onSubmit">
    <div class="flex items-center justify-between gap-2 pb-2 border-b border-(--ui-color-divider-vibrant-default)">
      <h3 class="min-w-0 truncate text-(length:--ui-font-size-lg) font-(--ui-font-weight-semi-bold) uppercase tracking-wide">
        Детали заказа
      </h3>
      <B24Button color="air-tertiary-no-accent" size="sm" :icon="SettingsIcon" aria-label="Изменить раздел" class="shrink-0" />
    </div>

    <B24FormField label="Стадия" name="stage">
      <!-- У Select `class` относится к триггеру, а `b24ui.root` — к внешней обёртке, поэтому для элемента на всю ширину нужны оба. -->
      <B24Select v-model="state.stage" :items="stages" class="w-full" :b24ui="{ root: 'w-full' }" />
    </B24FormField>

    <B24FormField label="Сумма и валюта" name="amount">
      <div class="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
        <B24InputNumber v-model="state.amount" :min="0" class="w-full" />
        <!-- Строка проверяется в рамках поля `amount`; валюта — фиксированный enum со значением по умолчанию, отдельный слот ошибки ей не нужен. -->
        <B24Select v-model="state.currency" :items="[...currencies]" class="w-full sm:w-32" :b24ui="{ root: 'w-full sm:w-32' }" />
      </div>
    </B24FormField>

    <!-- Внутренний раздел «Клиент»: группа с подписью и рамкой из обычных элементов
         (в b24ui нет отдельного примитива fieldset). role/aria-labelledby связывают
         heading to the group for screen readers. -->
    <div class="space-y-1.5">
      <span :id="clientGroupId" class="block text-(length:--ui-font-size-sm) text-(--ui-color-typography-secondary)">
        Клиент
      </span>
      <div
        role="group"
        :aria-labelledby="clientGroupId"
        class="rounded-md border border-(--ui-color-design-outline-stroke) p-3 sm:p-4 space-y-4"
      >
        <B24FormField label="Компания" name="company">
          <B24Input
            v-model="state.company"
            :icon="UserCompanyIcon"
            placeholder="Название компании, телефон или email"
            class="w-full"
          />
        </B24FormField>

        <B24FormField label="Контакт" name="contact">
          <B24Input
            v-model="state.contact"
            :icon="PersonIcon"
            placeholder="Имя контакта, телефон или email"
            class="w-full"
          />
        </B24FormField>

        <B24Button color="air-tertiary-no-accent" size="sm" :icon="CirclePlusIcon" label="Добавить участника" />
      </div>
    </div>

    <B24FormField label="Обращение" name="salutation">
      <B24Select v-model="state.salutation" :items="salutations" class="w-full" :b24ui="{ root: 'w-full' }" />
    </B24FormField>

    <B24FormField label="Фамилия" name="lastName">
      <B24Input v-model="state.lastName" class="w-full" />
    </B24FormField>

    <B24FormField label="Имя" name="firstName">
      <B24Input v-model="state.firstName" class="w-full" />
    </B24FormField>

    <B24FormField label="Тип услуги" name="serviceType">
      <B24Select v-model="state.serviceType" :items="serviceTypes" placeholder="Выберите услугу" class="w-full" :b24ui="{ root: 'w-full' }" />
    </B24FormField>

    <B24FormField label="Запланированная дата" name="scheduledAt">
      <!-- Ввод даты текстом с выпадающим B24Calendar в слоте trailing; у обоих общий v-model. -->
      <B24InputDate ref="scheduledAtInput" v-model="state.scheduledAt" class="w-full">
        <template #trailing>
          <B24Popover :reference="scheduledAtInput?.inputsRef[3]?.$el">
            <B24Button
              color="air-tertiary-no-accent"
              size="sm"
              :icon="CalendarIcon"
              aria-label="Выберите дату"
              class="px-0"
            />

            <template #content>
              <B24Calendar v-model="state.scheduledAt" class="p-2" />
            </template>
          </B24Popover>
        </template>
      </B24InputDate>
    </B24FormField>

    <div class="flex flex-wrap justify-end gap-2 pt-2">
      <B24Button color="air-tertiary" label="Отмена" @click="onCancel" />
      <B24Button color="air-primary" type="submit" label="Сохранить" />
    </div>
  </B24Form>
</template>
