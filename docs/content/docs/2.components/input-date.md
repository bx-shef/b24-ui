---
title: InputDate
description: 'Поле ввода для выбора даты.'
category: form
keywords:
  - date picker
  - datepicker
  - calendar input
  - ввод даты
  - поле даты
  - дата по маске
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/InputDate.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/input-date
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/input-date
  - label: DateField
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/date-field
---

## Использование {#usage}

Директива `v-model` управляет выбранной датой.

::component-code
---
cast:
  modelValue: DateValue
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: [2022, 2, 3]
---
::

Пропс `default-value` задаёт начальное значение, когда управлять состоянием не нужно.

::component-code
---
cast:
  defaultValue: DateValue
ignore:
  - defaultValue
external:
  - defaultValue
props:
  defaultValue: [2022, 2, 6]
---
::

::framework-only
#nuxt
:::note{to="/docs/getting-started/integrations/i18n/nuxt/#locale"}
Компонент использует пакет `@internationalized/date` для форматирования с учётом локали. Формат даты определяется пропсом `locale` компонента App.
:::

#vue
:::note{to="/docs/getting-started/integrations/i18n/vue/#locale"}
Компонент использует пакет `@internationalized/date` для форматирования с учётом локали. Формат даты определяется пропсом `locale` компонента App.
:::
::

### Диапазон {#range}

Пропс `range` позволяет выбрать диапазон дат.

::component-code
---
prettier: true
cast:
  modelValue: DateRange
ignore:
  - range
  - modelValue.start
  - modelValue.end
external:
  - modelValue
props:
  range: true
  modelValue:
    start: [2022, 2, 3]
    end: [2022, 2, 20]
---
::

### Цвет {#color}

Пропс `color` меняет цвет InputDate.

::component-code
---
props:
  color: air-primary
  highlight: true
---
::

### Тег {#tag}

Свойство `tag` показывает [Badge](/docs/components/badge/) поверх InputDate.

::component-code
---
prettier: true
props:
  tag: заметка
  color: 'air-primary'
  highlight: true
---
::

Свойство `tagColor` задаёт цвет Badge.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
items:
  tagColor:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-primary-warning
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-tertiary
    - air-selection
props:
  tag: заметка
  tagColor: air-secondary-alert
  color: 'air-primary'
  highlight: true
---
::

### Размер {#size}

Пропс `size` меняет размер InputDate.

::component-code
---
props:
  size: xl
---
::

### Иконка {#icon}

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) внутри InputDate.

::component-code
---
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
---
::

### Иконка разделителя {#separator-icon}

Пропс `separator-icon` меняет [иконку](https://bitrix24.github.io/b24icons/icons/) разделителя диапазона.

::component-code
---
ignore:
  - range
  - separatorIcon
cast:
  separatorIcon: 'RocketIcon'
props:
  range: true
  separatorIcon: 'RocketIcon'
---
::

### Аватар {#avatar}

Пропс `avatar` показывает [Avatar](/docs/components/avatar/) внутри InputDate.

::component-code
---
prettier: true
ignore:
  - avatar.src
  - avatar.loading
props:
  avatar:
    src: '/b24ui/avatar/employee.png'
    loading: lazy
  size: md
---
::

### Загрузка {#loading}

Пропс `loading` показывает иконку загрузки в InputDate.

::component-code
---
prettier: true
props:
  loading: true
---
::

### Отключение {#disabled}

Пропс `disabled` отключает InputDate.

::component-code
---
props:
  disabled: true
---
::

### Без отступов {#no-padding}

Пропс `noPadding` убирает отступы у InputDate.

::component-code
---
prettier: true
props:
  noPadding: true
  highlight: true
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

### Без границы {#no-border}

Пропс `noBorder` убирает у InputDate все границы (кольца).

::component-code
---
prettier: true
props:
  noBorder: true
  highlight: true
---
::

::note
Пропс `highlight` здесь показывает, что состояния фокуса нет.
::

### Подчёркивание {#underline}

Пропс `underline` убирает у InputDate все границы (кольца), кроме нижней.

::component-code
---
prettier: true
props:
  underline: true
  highlight: true
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

### Скругление {#rounded}

Пропс `rounded` скругляет InputDate.

::component-code
---
prettier: true
props:
  rounded: true
  highlight: true
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

## Примеры {#examples}

### С недоступными датами {#with-unavailable-dates}

Пропс `is-date-unavailable` принимает функцию, которая помечает отдельные даты как недоступные.

::component-example
---
name: 'input-date-unavailable-dates-example'
---
::

### С минимальной и максимальной датой {#with-minmax-dates}

Пропсы `min-value` и `max-value` ограничивают выбор дат.

::component-example
---
name: 'input-date-min-max-dates-example'
---
::

### Как выбор даты {#as-a-date-picker}

Компоненты [Calendar](/docs/components/calendar/) и [Popover](/docs/components/popover/) позволяют собрать выбор даты.

::component-example
---
name: 'input-date-date-picker-example'
---
::

### Как выбор диапазона дат {#as-a-date-range-picker}

Компоненты [Calendar](/docs/components/calendar/) и [Popover](/docs/components/popover/) позволяют собрать выбор диапазона дат.

::component-example
---
name: 'input-date-date-range-picker-example'
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
