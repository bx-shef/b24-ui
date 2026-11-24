# Выбор из карточек и галереи элементов

Приёмы для сценария «показать набор вариантов или разделов сеткой карточек с иконкой, заголовком и описанием». Пользователь выбирает один вариант (или несколько) нажатием на карточку. Применяйте, когда обычные `B24RadioGroup` / `B24CheckboxGroup` слишком скупы для такого выбора — когда каждому варианту нужны пояснение, иконка или заголовок категории.

Для этого служит компонент **`B24PageCardGroup`**.

## Когда применять

- **Выбор настройки из набора вариантов** — «какой шаблон формы?», «какая раскладка дашборда?», «какая AI-модель?». Выбран один вариант, и пользователю нужно прочитать, что делает каждый, прежде чем выбрать.
- **Переключатели возможностей с множественным выбором** — «какие данные должна собирать форма?», «какие интеграции использует сценарий?». Включены могут быть сразу несколько.
- **Навигация по разделам** — список разделов в духе лендинга: действия БП, главы документации, категории инструментов. Нажатие на карточку переходит, а не выбирает.
- **Шаг мастера «что вы хотите создать?»** — первый шаг многошагового процесса, где пользователь называет цель, а остальные шаги подстраиваются.

Если выбор бинарный или варианты понятны по одним подписям, берите `B24RadioGroup` / `B24CheckboxGroup` / `B24Switch`. `B24PageCardGroup` хорош, когда каждому варианту нужно своё предложение.

Для более насыщенных карточек с картинкой предпросмотра и ссылкой «Подробнее» (один вариант в строке, а не сетка) используйте `B24RadioGroup` / `B24CheckboxGroup` с `variant="card"` и своим слотом `#label` — см. [настройки](./settings.md).

## Выбор одной настройки

```vue
<script setup lang="ts">
import TableIcon from '@bitrix24/b24icons-vue/main/TableIcon'
import ListIcon from '@bitrix24/b24icons-vue/main/ListIcon'
import KanbanIcon from '@bitrix24/b24icons-vue/outline/KanbanIcon'

const layout = ref('table')

const items = [
  { value: 'table',   icon: TableIcon,   label: 'Table',   description: 'Compact rows with the key metrics in columns' },
  { value: 'list',    icon: ListIcon,    label: 'List',    description: 'Dense rows, best for scanning many records' },
  { value: 'kanban',  icon: KanbanIcon,  label: 'Kanban',  description: 'Columns by stage, drag-and-drop between them' }
]
</script>

<template>
  <B24PageCardGroup
    v-model="layout"
    :items="items"
    legend="Default view"
    color="air-primary"
    :columns="3"
  />
</template>
```

## Включение нескольких возможностей

```vue
<script setup lang="ts">
import PhoneUpIcon from '@bitrix24/b24icons-vue/outline/PhoneUpIcon'
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import CardIcon from '@bitrix24/b24icons-vue/outline/CardIcon'

const enabled = ref<string[]>(['callback', 'feedback'])

const items = [
  { value: 'callback', category: 'Customer communications', icon: PhoneUpIcon, label: 'Callback',        description: 'Capture the phone number and start a callback' },
  { value: 'contacts', category: 'Customer communications', icon: MailIcon,    label: 'Contact details', description: 'Collect phone, email and client name' },
  { value: 'feedback', category: 'Customer communications', icon: AiStarsIcon, label: 'Feedback',        description: 'Gather customer reviews' },
  { value: 'pay',      category: 'Sales',                   icon: CardIcon,    label: 'Payment',         description: 'Take payment right from the form' }
]
</script>

<template>
  <B24PageCardGroup
    v-model="enabled"
    :items="items"
    multiple
    color="air-primary-success"
  />
</template>
```

Поле `category` у элемента делит сетку на разделы с заголовком над каждым. Если элементы однородны, отключите группировку: `category-key=""`.

## Галерея карточек как навигация

Если нажатие на карточку должно переходить, а не выбирать, уберите `v-model` и слушайте `change` (или используйте поле `value` как ключ маршрута). Но чище отрисовать обычные `B24PageCard` в собственной сетке: «состояние выбора» для навигации бессмысленно. `B24PageCardGroup` нужен, только когда есть настоящее выбранное значение для привязки.

## Использование в форме

`B24PageCardGroup` учитывает `useFormField`, поэтому встраивается в `B24Form` / `B24FormField` как любое другое поле. Оберните его, чтобы показать подпись и ошибку:

```vue
<B24FormField label="Default view" name="layout" required>
  <B24PageCardGroup v-model="state.layout" :items="items" />
</B24FormField>
```

Оборачивающий `<B24FormField>` приоритетнее значений по умолчанию из `<B24Theme :props>` — см. заметки о `useComponentProps` в [соглашениях](../guidelines/conventions.md).

## Размер, цвет и тень при наведении

- `size` (`sm` | `md` | `lg`) масштабирует аватар внутри, внутренний отступ и размер шрифта заголовка и описания. По умолчанию `md`.
- `color` — общий акцент, который задаёт и рамку выделенной карточки, и бейдж в углу; чтобы они совпадали, задавайте `color`, а не `highlight-color` и `badge-color` по отдельности.
- У каждого элемента одно ведущее изображение: поле `icon` верхнего уровня (простая иконка, без круга) или поле `avatar` (полноценный `B24Avatar` — цвет, src, чип). Если заданы оба, побеждает `icon`, поэтому для цветного круга перенесите иконку в `avatar.icon`. Общие значения для группы — пропс `avatar`, для отдельного варианта — поле `avatar` элемента; оба принимают весь API Avatar.
- При наведении карточка слегка приподнимается тенью, если сам элемент или вся группа не `disabled`.

```vue
<B24PageCardGroup
  v-model="value"
  :items="items"
  size="lg"
  color="air-primary-copilot"
  :avatar="{ color: 'air-secondary' }"
  :columns="2"
/>
```

```ts
import TableIcon from '@bitrix24/b24icons-vue/main/TableIcon'
import ListIcon from '@bitrix24/b24icons-vue/main/ListIcon'

// Режим аватара (цветной круг вокруг иконки) — иконка внутри `avatar.icon`
const items = [
  { value: 'table', avatar: { color: 'air-primary-success', icon: TableIcon }, label: 'Table', description: '...' },
  { value: 'list',  avatar: { color: 'air-primary-warning', icon: ListIcon },  label: 'List',  description: '...' }
]

// Режим простой иконки (без круга) — побеждает `icon` верхнего уровня, `avatar` (если есть) игнорируется
const compact = [
  { value: 'table', icon: TableIcon, label: 'Table', description: '...' },
  { value: 'list',  icon: ListIcon,  label: 'List',  description: '...' }
]
```

## Собственные слоты

`B24PageCardGroup` позволяет переопределить части, когда значения по умолчанию слишком жёсткие:

- `#leading="{ item, selected }"` — запасной выход для ведущего изображения. По умолчанию уже рисуется `B24Avatar`; слот нужен, только если встроенной настройки аватара (пропс `avatar` / поле `avatar` элемента) не хватает.
- `#badge="{ item, selected }"` — заменяет бейдж-галочку в углу (например, показывает цену выбранного тарифа).
- `#categoryLabel="{ category, items }"` — свой заголовок раздела (счётчики, второстепенный текст).
- `#legend` — заголовок над всей группой.

Переопределения слотов темы (`:b24ui="{ card: '...', cardWrapper: '...', avatar: '...' }"`) накладываются поверх вариантов размера и колонок и автоматически сливаются в глубину — см. заметки о прокси в [соглашениях](../guidelines/conventions.md).
