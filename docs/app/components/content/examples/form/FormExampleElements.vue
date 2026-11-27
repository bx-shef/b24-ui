<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@bxshefby/b24ui-nuxt'

const schema = z.object({
  input: z.string({ message: 'Введите ваш email' }).min(10, 'Не меньше 10 символов'),
  inputNumber: z.number({ message: 'Введите число' }).min(10, 'Не меньше 10'),
  inputMenu: z.any().refine(option => option?.value === 'option-2', {
    message: 'Выберите вариант 2'
  }),
  inputMenuMultiple: z.any().refine(values => !!values?.find((option: any) => option.value === 'option-2'), {
    message: 'Вариант 2 должен быть выбран'
  }),
  textarea: z.string({ message: 'Введите сообщение' }).min(10, 'Не меньше 10 символов'),
  select: z.string({ message: 'Выберите вариант' }).refine(value => value === 'option-2', {
    message: 'Выберите вариант 2'
  }),
  selectMultiple: z.array(z.string(), { message: 'Выберите хотя бы один вариант' }).refine(values => values.includes('option-2'), {
    message: 'Вариант 2 должен быть выбран'
  }),
  selectMenu: z.any().refine(option => option?.value === 'option-2', {
    message: 'Выберите вариант 2'
  }),
  selectMenuMultiple: z.any().refine(values => !!values?.find((option: any) => option.value === 'option-2'), {
    message: 'Вариант 2 должен быть выбран'
  }),
  switch: z.boolean().refine(value => value === true, {
    message: 'Нужно включить'
  }),
  checkbox: z.boolean().refine(value => value === true, {
    message: 'Нужно отметить'
  }),
  radioGroup: z.string({ message: 'Выберите вариант' }).refine(value => value === 'option-2', {
    message: 'Выберите вариант 2'
  }),
  checkboxGroup: z.any().refine(values => !!values?.find((option: any) => option === 'option-2'), {
    message: 'Вариант 2 должен быть выбран'
  }),
  listbox: z.any().refine(option => option?.value === 'option-2', {
    message: 'Выберите вариант 2'
  }),
  listboxMultiple: z.any().refine(values => !!values?.find((option: any) => option.value === 'option-2'), {
    message: 'Вариант 2 должен быть выбран'
  }),
  inputTags: z.array(z.string(), { message: 'Добавьте хотя бы один тег' }).min(1, 'Добавьте хотя бы один тег'),
  inputDate: z.any().refine(value => !!value, {
    message: 'Выберите дату'
  }),
  inputTime: z.any().refine(value => !!value, {
    message: 'Выберите время'
  }),
  range: z.number().min(1, 'Должно быть больше 0').max(20, 'Должно быть меньше 20'),
  rating: z.number().min(1, 'Выберите оценку'),
  pin: z.string().regex(/^\d$/, 'Должно быть цифрой').array().length(5, 'Нужно ввести все 5 цифр'),
  file: z.file({ message: 'Загрузите файл' }).min(1, 'Загрузите файл').max(1024 * 1024, 'Файл должен быть меньше 1 МБ').mime('image/png', 'Допускаются только изображения PNG')
})

type Schema = z.input<typeof schema>

const state = reactive<Partial<Schema>>({
  switch: false,
  checkbox: false,
  range: 0,
  rating: 0,
  pin: []
})

const form = useTemplateRef('form')

const items = [
  { label: 'Вариант 1', value: 'option-1' },
  { label: 'Вариант 2', value: 'option-2' },
  { label: 'Вариант 3', value: 'option-3' }
]

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Успешно', description: 'Форма отправлена.', color: 'air-primary-success' })
  console.log(event.data)
}

function resetState() {
  state.input = undefined
  state.inputNumber = undefined
  state.inputMenu = undefined
  state.inputMenuMultiple = undefined
  state.textarea = undefined
  state.select = undefined
  state.selectMenu = undefined
  state.selectMultiple = undefined
  state.selectMenuMultiple = undefined
  state.switch = undefined
  state.checkbox = undefined
  state.radioGroup = undefined
  state.checkboxGroup = undefined
  state.listbox = undefined
  state.listboxMultiple = undefined
  state.inputTags = undefined
  state.inputDate = undefined
  state.inputTime = undefined
  state.range = undefined
  state.pin = []
  state.file = undefined
}
</script>

<template>
  <B24Form ref="form" :state="state" :schema="schema" class="w-full" @submit="onSubmit">
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      <B24FormField label="Input" name="input">
        <B24Input v-model="state.input" placeholder="you@example.com" class="w-full" />
      </B24FormField>

      <B24FormField name="inputNumber" label="InputNumber">
        <B24InputNumber v-model="state.inputNumber" placeholder="Введите число" class="w-full" />
      </B24FormField>

      <B24FormField name="pin" label="PinInput" :error-pattern="/(pin)\..*/">
        <B24PinInput v-model="state.pin" placeholder="○" />
      </B24FormField>

      <B24FormField name="inputDate" label="InputDate">
        <B24InputDate v-model="state.inputDate" class="w-full" />
      </B24FormField>

      <B24FormField name="inputTime" label="InputTime">
        <B24InputTime v-model="state.inputTime" class="w-full" />
      </B24FormField>

      <B24FormField name="inputTags" label="InputTags">
        <B24InputTags v-model="state.inputTags" placeholder="Добавьте тег..." class="w-full" />
      </B24FormField>

      <B24FormField name="inputMenu" label="InputMenu">
        <B24InputMenu v-model="state.inputMenu" :items="items" placeholder="Найдите вариант..." class="w-full" />
      </B24FormField>

      <B24FormField name="inputMenuMultiple" label="InputMenu (Multiple)">
        <B24InputMenu v-model="state.inputMenuMultiple" multiple :items="items" placeholder="Найдите варианты..." class="w-full" />
      </B24FormField>

      <B24FormField label="Textarea" name="textarea">
        <B24Textarea v-model="state.textarea" placeholder="Напишите сообщение..." class="w-full" autoresize :maxrows="6" />
      </B24FormField>

      <B24FormField name="select" label="Выбрать">
        <B24Select v-model="state.select" :items="items" placeholder="Выберите вариант" class="w-full" :b24ui="{ root: 'w-full' }" />
      </B24FormField>

      <B24FormField name="selectMultiple" label="Select (Multiple)">
        <B24Select
          v-model="state.selectMultiple"
          multiple
          :items="items"
          placeholder="Выберите варианты"
          class="w-full"
          :b24ui="{ root: 'w-full' }"
        />
      </B24FormField>

      <div class="hidden md:block" />

      <B24FormField name="selectMenu" label="SelectMenu">
        <B24SelectMenu v-model="state.selectMenu" :items="items" placeholder="Найдите вариант..." class="w-full" :b24ui="{ root: 'w-full' }" />
      </B24FormField>

      <B24FormField name="selectMenuMultiple" label="SelectMenu (Multiple)">
        <B24SelectMenu
          v-model="state.selectMenuMultiple"
          multiple
          :items="items"
          placeholder="Найдите варианты..."
          class="w-full"
          :b24ui="{ root: 'w-full' }"
        />
      </B24FormField>

      <div class="hidden md:block" />

      <B24FormField name="listbox" label="Listbox">
        <B24Listbox v-model="state.listbox" :items="items" class="w-full" />
      </B24FormField>

      <B24FormField name="listboxMultiple" label="Listbox (Multiple)">
        <B24Listbox v-model="state.listboxMultiple" :items="items" multiple class="w-full" />
      </B24FormField>

      <B24FormField name="file" label="FileUpload">
        <B24FileUpload
          v-model="state.file"
          label="Перетащите изображение сюда"
          description="PNG (не более 1 МБ)"
          class="w-full"
        />
      </B24FormField>

      <B24FormField name="checkbox" label="Чекбокс">
        <B24Checkbox v-model="state.checkbox" label="Отметьте меня" />
      </B24FormField>

      <B24FormField name="switch" label="Переключатель">
        <B24Switch v-model="state.switch" label="Переключи меня" />
      </B24FormField>

      <B24FormField name="range" label="Диапазон">
        <B24Range v-model="state.range" class="mt-2.5" />
      </B24FormField>

      <B24FormField name="rating" label="InputRating">
        <B24InputRating v-model="state.rating" />
      </B24FormField>

      <B24FormField name="checkboxGroup">
        <B24CheckboxGroup v-model="state.checkboxGroup" legend="CheckboxGroup" :items="items" />
      </B24FormField>

      <B24FormField name="radioGroup">
        <B24RadioGroup v-model="state.radioGroup" legend="RadioGroup" :items="items" />
      </B24FormField>
    </div>

    <div class="flex gap-2 mt-8">
      <B24Button color="air-primary" type="submit">
        Отправить
      </B24Button>

      <B24Button @click="form?.clear(); resetState()">
        Очистить
      </B24Button>
    </div>
  </B24Form>
</template>
