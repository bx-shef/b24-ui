# Формы

## Базовый шаблон

Формы Bitrix24 UI строятся из `B24Form`, `B24FormField` и валидации по Standard Schema (Zod, Valibot, Yup или Joi).

```vue
<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters')
})

type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({ email: '', password: '' })

function onSubmit(event: FormSubmitEvent<Schema>) {
  // B24Form проверяет данные до события @submit — проверенные данные в event.data
}
</script>

<template>
  <B24Form :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <B24FormField name="email" label="Email" required>
      <B24Input v-model="state.email" type="email" placeholder="you@example.com" />
    </B24FormField>

    <B24FormField name="password" label="Password" required>
      <B24Input v-model="state.password" type="password" placeholder="Min 8 characters" />
    </B24FormField>

    <B24Button type="submit" label="Sign in" />
  </B24Form>
</template>
```

## Ключевые правила

- Всегда оборачивайте поля в `B24FormField` — он связывает ошибки валидации через пропс `name`.
- Пропс `name` у `B24FormField` должен точно совпадать с именем поля в схеме.
- Состояние создавайте как `reactive<Partial<Schema>>({})` — `Partial` допускает пустые начальные значения.
- `@submit` срабатывает только при успешной валидации.
- Для вложенных объектов используйте точку: `name="address.city"`.

## Пропсы B24FormField

| Пропс | Назначение |
|---|---|
| `name` | Связывает с полем схемы для ошибок валидации |
| `label` | Видимый текст подписи |
| `description` | Пояснение под подписью, над полем |
| `hint` | Подсказка справа от подписи — **нужна `label`**, см. ниже |
| `help` | Текст под полем; скрыт, пока показана ошибка |
| `error` | Текст ошибки под полем; `false` полностью отключает блок |
| `required` | Показывает индикатор обязательности |
| `size` | Передаётся вложенному полю ввода |

## Расширенные подписи

У каждого из пяти пропсов — `label`, `description`, `hint`, `help` и `error` — есть одноимённый слот на случай, когда строки мало. `#label` заменяет содержимое внутри элемента `<label>`, остальные четыре — содержимое своего блока.

Всё, что лежит в `#label`, входит в доступное имя поля: декоративное содержимое помечайте `aria-hidden="true"`, а ссылки и кнопки туда не кладите — `<label>` при нажатии переключает своё поле. Ссылка внутри `#description` допустима: этот блок находится вне `<label>`.

```vue
<B24FormField label="Email" name="email">
  <template #label="{ label }">
    {{ label }}
    <B24Badge label="Work" size="xs" aria-hidden="true" />
  </template>

  <B24Input placeholder="Enter your email" />
</B24FormField>
```

Каждый слот получает пропс, который заменяет, поэтому обёртка украшает значение, а не повторяет его — это важно, когда текст приходит из схемы или перевода.

## Озвучивается то, что нарисовано

Каждый блок отрисовывается по условию `props.x || !!slots.x`, и `aria-describedby` подчиняется тому же правилу: в нём названы блоки, которые попали в документ, и только они.

| что передано | блок на экране | назван в `aria-describedby` |
|---|---|---|
| пропс `description` | да | да |
| слот `#description`, без пропса | да | да |
| пропс `hint`, без `label` | нет | нет |
| `error` и `help` вместе | только ошибка | только ошибка |

Передавать пропс вместе со слотом по-прежнему хорошая привычка — слот получает его, и обёртка украшает значение, а не повторяет, — но блок озвучивается уже не поэтому.

Блок, который вы запросили, скрывают два условия. `hint` рисуется внутри строки подписи, а она есть только при наличии подписи, поэтому `hint` у поля без `label` не отрисуется вовсе. А `help` — это `v-else-if` ветки ошибки, поэтому отрисованная ошибка занимает его место. В обоих случаях ничего не рисуется и ничего не озвучивается.

`#error` требует осторожности по другой причине. Блок ошибки рисуется всякий раз, когда есть слот `#error`, с ошибкой или без, поэтому слот `#error` полностью скрывает `help`, а у поля остаётся `aria-invalid="false"`: этот атрибут отражает состояние ошибки поля, а её нет.

Это намеренное отличие от `nuxt/ui`, который по-прежнему строит атрибут только из пропсов; исправлено в b24ui#497.

Привяжите `error` к сообщению — или к `false`, когда его нет, — а слот пусть отвечает только за разметку:

```vue
<B24FormField
  label="Email"
  name="email"
  :error="message"
  help="Используем только для входа."
>
  <template #error="{ error }">
    <WarningIcon class="size-4" aria-hidden="true" /> {{ error }}
  </template>

  <B24Input v-model="value" placeholder="Enter your email" />
</B24FormField>
```

Внутри `B24Form` ошибка приходит из схемы и бывает строкой или `undefined`, а `undefined` — это не `false`, поэтому слот `#error` там всё равно отрисовывается постоянно. В полях, которыми управляет форма, используйте пропс `error` и оформляйте блок через `b24ui.error`.

## Раскладка полей

### Вертикальный стек (по умолчанию)

```vue
<B24Form :schema="schema" :state="state" class="space-y-4">
  <B24FormField name="name" label="Name">
    <B24Input v-model="state.name" />
  </B24FormField>
  <B24FormField name="email" label="Email">
    <B24Input v-model="state.email" />
  </B24FormField>
</B24Form>
```

### Поля в строке через B24FieldGroup

```vue
<B24FieldGroup>
  <B24FormField name="firstName" label="First name">
    <B24Input v-model="state.firstName" />
  </B24FormField>
  <B24FormField name="lastName" label="Last name">
    <B24Input v-model="state.lastName" />
  </B24FormField>
</B24FieldGroup>
```

### Сетка

```vue
<B24Form :schema="schema" :state="state" class="grid grid-cols-2 gap-4">
  <B24FormField name="firstName" label="First name">
    <B24Input v-model="state.firstName" />
  </B24FormField>
  <B24FormField name="lastName" label="Last name">
    <B24Input v-model="state.lastName" />
  </B24FormField>
  <B24FormField name="email" label="Email" class="col-span-2">
    <B24Input v-model="state.email" type="email" />
  </B24FormField>
</B24Form>
```

## Типовые поля

### Select

```vue
<B24FormField name="role" label="Role">
  <B24Select v-model="state.role" :items="['Admin', 'Editor', 'Viewer']" placeholder="Choose role" />
</B24FormField>
```

### Checkbox

```vue
<B24FormField name="terms">
  <B24Checkbox v-model="state.terms" label="I agree to the terms and conditions" />
</B24FormField>
```

### Группа переключателей

```vue
<B24FormField name="plan" label="Plan">
  <B24RadioGroup
    v-model="state.plan"
    :items="[
      { label: 'Free', value: 'free', description: 'For personal projects' },
      { label: 'Pro', value: 'pro', description: 'For teams' }
    ]"
  />
</B24FormField>
```

### Switch

```vue
<B24FormField name="notifications" label="Email notifications">
  <B24Switch v-model="state.notifications" />
</B24FormField>
```

### Textarea

```vue
<B24FormField name="bio" label="Bio" description="Brief description for your profile.">
  <B24Textarea v-model="state.bio" :rows="3" autoresize :maxrows="6" />
</B24FormField>
```

### Загрузка файла

```vue
<B24FormField name="avatar" label="Avatar">
  <B24FileUpload v-model="state.avatar" accept="image/*" />
</B24FormField>

<!-- Или как область для перетаскивания -->
<B24FormField name="documents" label="Documents">
  <B24FileUpload v-model="state.documents" multiple variant="area" />
</B24FormField>
```

### Дата

```vue
<B24FormField name="date" label="Date">
  <B24InputDate v-model="state.date" />
</B24FormField>

<!-- Диапазон дат -->
<B24FormField name="dateRange" label="Date range">
  <B24InputDate v-model="state.dateRange" range />
</B24FormField>
```

## Программная валидация

```vue
<script setup lang="ts">
const form = useTemplateRef('form')

async function validateAndSubmit() {
  const result = await form.value?.validate({ silent: true })
  if (result) {
    // данные верны — отправляем
  }
}

async function validateEmail() {
  await form.value?.validate({ name: 'email', silent: true })
}

function setServerError() {
  form.value?.setErrors([
    { name: 'email', message: 'Email already taken' }
  ])
}

function resetErrors() {
  form.value?.clear()
}
</script>

<template>
  <B24Form ref="form" :schema="schema" :state="state" @submit="onSubmit">
    <!-- поля -->
  </B24Form>
</template>
```

По умолчанию `validate()` при неудачной проверке бросает `FormValidationException`: `Form.vue` возвращает `false` только при `silent`, иначе бросает исключение. Поэтому `const result = await validate(); if (result)` при ошибке до своей ветки не дойдёт: передайте `{ silent: true }`, если нужен булев результат вместо исключения. Ошибки валидации убирает `clear()`.

## Форма редактирования записи

Для интерфейсов редактирования записей (UF-встройки, панели редактирования в слайдере, карточки в стиле CRM) обычная композиция такая: полоса заголовка раздела, поля с подписью сверху, при необходимости двухколоночные строки и вложенные подразделы, группирующие связанные поля в собственной рамке. **Новый компонент не нужен** — хватает `B24Form`, `B24FormField` и небольшого `<div>` для внутреннего раздела.

Ключевые правила структуры:

- Одна внешняя `B24Form` с `:schema` на всю запись.
- Полоса заголовка — `<div class="flex items-center justify-between gap-2">`: слева заголовок (с `min-w-0 truncate`), справа единственное действие в виде иконки. У `B24Button` **нет пропса `variant`** — выбирайте `color`; для ненавязчивого действия в шапке берите `color="air-tertiary-no-accent"` и всегда задавайте `aria-label`. Пару «Отмена»/«Сохранить» держите только в подвале (второй «Отмены» в шапке не нужно — получится дублирующееся доступное имя).
- Внутренний подраздел (например, «Клиент») — `<span>` с подписью сверху и контейнер с рамкой `<div role="group" aria-labelledby="...">` (`rounded-md border border-(--ui-color-design-outline-stroke) p-3 sm:p-4 space-y-4`) с вложенными `B24FormField`. `role` и `aria-labelledby` связывают подпись с группой (отдельного компонента fieldset нет).
- Двухколоночные строки (например, сумма и валюта) — `<div class="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">`: на узком экране второе поле уходит вниз.
- `B24InputDate` работает со значением `@internationalized/date`, **а не** с нативным `Date`: поле схемы типизируйте свободно (`z.any().optional()`), никогда `z.date()`. Для выбора из календаря поместите `B24Calendar` в `B24Popover` в слоте `#trailing` поля (привязка к `inputsRef`) и свяжите оба с одним `v-model`.
- У `B24Select` `class` относится к триггеру, а `b24ui.root` — к обёртке, поэтому select на всю ширину требует обоих; у `B24Input` и `B24InputNumber` `class` уже относится к корню, и одного `class="w-full"` достаточно.
- Действия подвала («Отмена» / «Сохранить») идут внизу в `<div class="flex flex-wrap justify-end gap-2 pt-2">`.

Каркас:

```vue
<script setup lang="ts">
// ...schema, реактивный `state`, `onSubmit` и `onCancel` — как в полном примере
const clientGroupId = useId() // уникальный id, связывающий подпись группы «Client» с её контейнером
const scheduledAtInput = useTemplateRef('scheduledAtInput') // привязка поповера даты
</script>

<template>
<B24Form :schema="schema" :state="state" class="space-y-4 w-full max-w-lg" @submit="onSubmit">
  <div class="flex items-center justify-between gap-2 pb-2 border-b border-(--ui-color-divider-vibrant-default)">
    <h3 class="min-w-0 truncate text-(length:--ui-font-size-lg) font-(--ui-font-weight-semi-bold) uppercase tracking-wide">Order details</h3>
    <B24Button color="air-tertiary-no-accent" size="sm" :icon="SettingsIcon" aria-label="Edit section" class="shrink-0" />
  </div>

  <B24FormField label="Stage" name="stage">
    <B24Select v-model="state.stage" :items="stages" class="w-full" :b24ui="{ root: 'w-full' }" />
  </B24FormField>

  <B24FormField label="Amount and currency" name="amount">
    <div class="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
      <B24InputNumber v-model="state.amount" :min="0" class="w-full" />
      <!-- currencies объявлен `as const` для z.enum, поэтому для пропса items раскрываем его в изменяемый массив -->
      <B24Select v-model="state.currency" :items="[...currencies]" class="w-full sm:w-32" :b24ui="{ root: 'w-full sm:w-32' }" />
    </div>
  </B24FormField>

  <!-- Вложенный подраздел: подпись снаружи и контейнер с рамкой. clientGroupId = useId(), чтобы связь подписи и группы оставалась уникальной, если форма отрисована несколько раз. -->
  <div class="space-y-1.5">
    <span :id="clientGroupId" class="block text-(length:--ui-font-size-sm) text-legend">Client</span>
    <div role="group" :aria-labelledby="clientGroupId" class="rounded-md border border-(--ui-color-design-outline-stroke) p-3 sm:p-4 space-y-4">
      <B24FormField label="Company" name="company">
        <B24Input v-model="state.company" :icon="UserCompanyIcon" placeholder="Company name, phone or email" class="w-full" />
      </B24FormField>
      <B24FormField label="Contact" name="contact">
        <B24Input v-model="state.contact" :icon="PersonIcon" placeholder="Contact name, phone or email" class="w-full" />
      </B24FormField>
      <B24Button color="air-tertiary-no-accent" size="sm" :icon="CirclePlusIcon" label="Add participant" />
    </div>
  </div>

  <!-- Остальные поля под группой Client -->
  <B24FormField label="Salutation" name="salutation">
    <B24Select v-model="state.salutation" :items="salutations" class="w-full" :b24ui="{ root: 'w-full' }" />
  </B24FormField>
  <B24FormField label="Last name" name="lastName">
    <B24Input v-model="state.lastName" class="w-full" />
  </B24FormField>
  <B24FormField label="First name" name="firstName">
    <B24Input v-model="state.firstName" class="w-full" />
  </B24FormField>
  <B24FormField label="Service type" name="serviceType">
    <B24Select v-model="state.serviceType" :items="serviceTypes" placeholder="Choose a service" class="w-full" :b24ui="{ root: 'w-full' }" />
  </B24FormField>
  <B24FormField label="Scheduled date" name="scheduledAt">
    <!-- v-model — значение @internationalized/date, а не нативный Date -->
    <B24InputDate ref="scheduledAtInput" v-model="state.scheduledAt" class="w-full">
      <template #trailing>
        <B24Popover :reference="scheduledAtInput?.inputsRef[3]?.$el">
          <B24Button color="air-tertiary-no-accent" size="sm" :icon="CalendarIcon" aria-label="Select a date" class="px-0" />
          <template #content>
            <B24Calendar v-model="state.scheduledAt" class="p-2" />
          </template>
        </B24Popover>
      </template>
    </B24InputDate>
  </B24FormField>

  <div class="flex flex-wrap justify-end gap-2 pt-2">
    <B24Button color="air-tertiary" label="Cancel" @click="onCancel" />
    <B24Button color="air-primary" type="submit" label="Save" />
  </div>
</B24Form>
</template>
```

Полный рабочий пример: [docs/components/form#record-edit-section](https://bitrix24.github.io/b24ui/docs/components/form#record-edit-section).

## Форма в модальном окне

Для кнопок отмены и отправки используйте слот `#footer="{ close }"`. Оберните тело модального окна в `B24Form`, а в подвале разместите кнопку `type="submit"`, чтобы валидация запускалась при отправке.

```vue
<B24Modal v-model:open="isOpen" title="Edit profile" description="Update your information." :b24ui="{ footer: 'justify-end' }">
  <template #body>
    <B24Form id="profile-form" :schema="schema" :state="state" class="space-y-4" @submit="onSave">
      <B24FormField name="name" label="Name">
        <B24Input v-model="state.name" />
      </B24FormField>
      <B24FormField name="email" label="Email">
        <B24Input v-model="state.email" type="email" />
      </B24FormField>
    </B24Form>
  </template>
  <template #footer="{ close }">
    <B24Button type="submit" form="profile-form" label="Save" />
    <B24Button label="Cancel" color="air-tertiary" @click="close" />
  </template>
</B24Modal>
```
