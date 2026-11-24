---
title: InputTime
description: 'Поле ввода для выбора времени.'
category: form
keywords:
  - time picker
  - clock
  - hour
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/InputTime.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/input-time
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/input-time
  - label: TimeField
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/time-field
  - label: TimeRangeField
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/time-range-field
---

## Использование {#usage}

Директива `v-model` управляет выбранным временем.

::component-code
---
cast:
  modelValue: TimeValue
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: [12, 30, 0]
---
::

Пропс `default-value` задаёт начальное значение, когда управлять состоянием не нужно.

::component-code
---
cast:
  defaultValue: TimeValue
ignore:
  - defaultValue
external:
  - defaultValue
props:
  defaultValue: [9, 45, 0]
---
::

::framework-only
#nuxt
:::note{to="/docs/getting-started/integrations/i18n/nuxt/#locale"}
Компонент использует пакет `@internationalized/date` для форматирования с учётом локали. Формат времени определяется пропсом `locale` компонента App.
:::

#vue
:::note{to="/docs/getting-started/integrations/i18n/vue/#locale"}
Компонент использует пакет `@internationalized/date` для форматирования с учётом локали. Формат времени определяется пропсом `locale` компонента App.
:::
::

### Диапазон {#range}

Пропс `range` включает выбор диапазона времени с началом и концом.

::component-code
---
prettier: true
cast:
  modelValue: TimeRangeValue
ignore:
  - range
  - modelValue.start
  - modelValue.end
external:
  - modelValue
props:
  range: true
  modelValue:
    start: [9, 0, 0]
    end: [17, 30, 0]
---
::


### Формат часов {#hour-cycle}

Пропс `hour-cycle` меняет формат часов InputTime. По умолчанию `12`.

::component-code
---
cast:
  defaultValue: TimeValue
ignore:
  - hourCycle
  - defaultValue
external:
  - defaultValue
props:
  hourCycle: 24
  defaultValue: [16, 30, 0]
---
::

### Цвет {#color}

Пропс `color` меняет цвет InputTime.

::component-code
---
props:
  color: air-primary
  highlight: true
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса. Внутри компонента он включается при ошибке валидации.
::

### Тег {#tag}

Свойство `tag` показывает [Badge](/docs/components/badge/) поверх InputTime.

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

Пропс `size` меняет размер InputTime.

::component-code
---
props:
  size: xl
---
::

### Иконка {#icon}

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) внутри InputTime.

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

Пропс `avatar` показывает [Avatar](/docs/components/avatar/) внутри InputTime.

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

Пропс `loading` показывает иконку загрузки в InputTime.

::component-code
---
prettier: true
props:
  loading: true
---
::

### Отключение {#disabled}

Пропс `disabled` отключает InputTime.

::component-code
---
props:
  disabled: true
---
::

### Без отступов {#no-padding}

Пропс `noPadding` убирает отступы у InputTime.

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

Пропс `noBorder` убирает у InputTime все границы (кольца).

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

Пропс `underline` убирает у InputTime все границы (кольца), кроме нижней.

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

Пропс `rounded` скругляет InputTime.

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

### Внутри FormField {#within-a-formfield}

InputTime можно использовать внутри компонента [FormField](/docs/components/form-field/), чтобы показывать подпись, справочный текст, признак обязательности и так далее.

::component-example
---
name: 'input-time-form-field-example'
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
