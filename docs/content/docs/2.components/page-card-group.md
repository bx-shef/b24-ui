---
title: PageCardGroup
description: 'Выбираемая группа элементов PageCard. Одиночный или множественный выбор, с группировкой по категориям.'
category: page
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageCardGroup.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/page-card-group
---

## Использование {#usage}

`PageCardGroup` отрисовывает адаптивную сетку выбираемых элементов [PageCard](/docs/components/page-card/). У выбранной карточки подсвечивается кольцо и появляется значок в углу. Элементы можно группировать по разделам-категориям.

::component-example
---
name: 'page-card-group-example'
class: 'p-8'
---
::

::tip
`PageCardGroup` подходит для выбора одного или нескольких вариантов из небольшого набора. Для обычных списков чекбоксов и переключателей лучше использовать [CheckboxGroup](/docs/components/checkbox-group/) или [RadioGroup](/docs/components/radio-group/).
::

### Элементы {#items}

Передайте массив объектов через пропс `items`. У каждого элемента можно задать `label`, `description`, `icon`, `value`, `disabled` и необязательную `category` для группировки. Имена полей настраиваются пропсами `value-key`, `label-key`, `description-key`, `icon-key`, `category-key`.

### Множественный выбор {#multiple}

Пропс `multiple` включает режим множественного выбора. `v-model` привязывается к массиву значений.

```vue
<B24PageCardGroup v-model="picks" :items="items" multiple />
```

### Колонки {#columns}

Пропс `columns` (`'1'`, `'2'`, `'3'`, `'4'`) задаёт максимальное число колонок на десктопе. Сетка всегда адаптивная: 1 колонка на мобильных, 2 на планшете, затем до `columns` начиная с `lg`.

### Размер {#size}

Пропс `size` (`'sm'`, `'md'`, `'lg'`) масштабирует круг с иконкой, саму иконку, внутренний отступ и размеры шрифта заголовка и описания. По умолчанию `'md'`. Размер значка в углу берётся из `size`, если явно не задан `badge-size`.

### Вариант {#variant}

Пропс `variant` передаётся каждому вложенному [PageCard](/docs/components/page-card/) и определяет его базовый стиль. Полный список вариантов — на странице PageCard.

### Цвет {#color}

Пропс `color` — общий акцент: он определяет и цвет рамки выбранной карточки, и цвет значка в углу. По умолчанию `air-primary-success`.

```vue
<B24PageCardGroup v-model="value" :items="items" color="air-primary" />
```

### Цвет выделения {#highlight-color}

Пропс `highlight-color` переопределяет общий `color` только для рамки карточки. Если не задан, берётся `color`.

### Цвет значка {#badge-color}

Пропс `badge-color` переопределяет общий `color` только для значка [Badge](/docs/components/badge/) в углу. Если не задан, берётся `color`.

### Размер значка {#badge-size}

Пропс `badge-size` переопределяет размер значка, который выводится из `size`.

### Иконка и аватар {#icon-vs-avatar}

Каждый элемент выбирает один из двух вариантов ведущего изображения:

- Поле `icon` — обычная иконка без круга. Размер задаёт тема через `leadingIcon`. Подходит для компактных списков без украшений.
- Поле `avatar` — [B24Avatar](/docs/components/avatar/) с полным управлением цветом (`color`, `src`, `chip`, `icon`). Размер аватара выводится из `size` группы (`sm` → `lg`, `md` → `xl`, `lg` → `2xl`), а `alt` аватара по умолчанию берётся из `label` элемента.

Если у одного элемента заданы оба поля, побеждает `icon`: отрисовывается обычная иконка, а `avatar` игнорируется. Выбирайте одно на элемент:

```ts
// shows the icon via B24Avatar (color circle around the icon)
{ avatar: { color: 'air-primary-warning', icon: FeedbackIcon }, label: 'Feedback' }

// shows the plain icon only — `icon` at the top level takes precedence
{ icon: FeedbackIcon, avatar: { color: 'air-primary-warning' }, label: 'Feedback' }
```

Аватар по умолчанию на уровне группы наследуют все элементы в режиме аватара:

```vue
<B24PageCardGroup v-model="value" :items="items" :avatar="{ color: 'air-secondary' }" />
```

Настройки `avatar` у отдельного элемента накладываются поверх значения группы:

:component-example{name="page-card-group-avatar-example"}

Поле `avatar` принимает весь API [B24Avatar](/docs/components/avatar/): тот же приём задаёт `src` (фото), `chip` или другую `icon` у каждого элемента.

### Группировка по категориям {#category-grouping}

Если у элементов есть поле `category` (или другое поле, заданное через `category-key`), группа отрисовывает по разделу на категорию с заголовком над каждой сеткой. Чтобы отключить группировку, передайте `category-key=""`.

## Промпт {#prompt}

::prompt
---
description: Отрисовать выбор способов оплаты на странице настроек.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
На странице настроек отрисуйте список способов оплаты как сетку карточек. На каждой карточке иконка и короткое описание. Пользователь может включить сразу несколько способов.

Требования:
- Используйте `B24PageCardGroup` с `multiple` и привяжите `v-model` к `ref<string[]>`
- У каждого элемента есть `value`, `label`, `description` и `icon` (компонент иконки, импортированный из `@bitrix24/b24icons-vue`)
- Держите общий акцент согласованным: задайте `color` на группе, а не `highlight-color` и `badge-color` по отдельности
- Оберните группу в `B24FormField` с подписью, чтобы она встроилась в окружающую форму настроек
- Подберите подходящие `size` (по умолчанию `md`) и `columns` (`2` или `3`) для раскладки
::

## Примеры {#examples}

### Обработчик щелчка и изменения {#click-change-handler}

Подпишитесь на событие `change`, чтобы реагировать на выбор пользователя. Событие срабатывает после обновления `v-model` и получает нативное событие `change`.

```vue
<script setup lang="ts">
const value = ref('callback')
function onChange(event: Event) {
  console.log('selected', value.value, event)
}
</script>

<template>
  <B24PageCardGroup v-model="value" :items="items" @change="onChange" />
</template>
```

### Отключение элемента {#disable-an-item}

Свойство `disabled: true` у отдельного элемента блокирует его, не убирая из сетки.

```ts
const items = [
  { value: 'callback', label: 'Callback', icon: PhoneIcon },
  { value: 'pay', label: 'Payment', icon: CardIcon, disabled: true }
]
```

### Свой значок {#custom-badge}

Значок в углу переопределяется слотом `badge`. Слот получает `{ item, selected }`.

```vue
<B24PageCardGroup v-model="value" :items="items">
  <template #badge="{ selected }">
    <B24Badge v-if="selected" label="Picked" color="air-primary-success" size="sm" />
  </template>
</B24PageCardGroup>
```

### Своя ведущая иконка {#custom-leading-icon}

Ведущий слот — запасной выход для случаев, когда встроенного [B24Avatar](/docs/components/avatar/) (управляется пропсом `avatar` и полем `avatar` элемента) недостаточно. Круг с иконкой переопределяется слотом `leading`, который получает `{ item, selected }`.

```vue
<B24PageCardGroup v-model="value" :items="items">
  <template #leading="{ item, selected }">
    <B24Avatar
      :alt="item.label"
      :icon="item.icon"
      :color="selected ? 'air-primary' : 'air-secondary-no-accent'"
    />
  </template>
</B24PageCardGroup>
```

### Своя подпись категории {#custom-category-label}

Заголовки категорий переопределяются слотом `categoryLabel`. Слот получает `{ category, items }`.

```vue
<B24PageCardGroup v-model="value" :items="items">
  <template #categoryLabel="{ category, items }">
    <h3 class="text-(length:--ui-font-size-lg) font-(--ui-font-weight-semi-bold)">
      {{ category }} <span class="text-(--ui-color-design-outline-content-secondary)">({{ items.length }})</span>
    </h3>
  </template>
</B24PageCardGroup>
```

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
