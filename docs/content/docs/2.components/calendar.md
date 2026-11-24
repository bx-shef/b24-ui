---
title: Calendar
description: 'Календарь для выбора одной даты, нескольких дат или диапазона.'
category: element
keywords:
  - date picker
  - datepicker
  - schedule
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Calendar.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/calendar
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/calendar
  - label: Calendar
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/calendar
---

## Использование {#usage}

Выбранной датой управляет директива `v-model`.

::component-code
---
prettier: true
cast:
  modelValue: DateValue
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: [2012, 4, 12]
---
::

Пропс `default-value` задаёт начальное значение, если управлять состоянием не нужно.

::component-code
---
prettier: true
cast:
  defaultValue: DateValue
ignore:
  - defaultValue
external:
  - defaultValue
props:
  defaultValue: [2012, 4, 12]
---
::

::framework-only
#nuxt
:::note{to="/docs/getting-started/integrations/i18n/nuxt/#locale"}
Для форматирования с учётом локали компонент использует пакет `@internationalized/date`. Формат даты определяет пропс `locale` компонента App.
:::

#vue
:::note{to="/docs/getting-started/integrations/i18n/vue/#locale"}
Для форматирования с учётом локали компонент использует пакет `@internationalized/date`. Формат даты определяет пропс `locale` компонента App.
:::
::

### Тип :badge{label="2.14+" class="align-text-top"} {#type}

Пропс `type` меняет то, что выбирается в календаре. По умолчанию — `date`.

При `date` щелчок по заголовку переключает вид дней на вид месяцев, а затем лет — так удобно быстро перейти к нужному периоду; потом вы возвращаетесь к выбору дня.

::component-code
---
cast:
  modelValue: DateValue
ignore:
  - type
  - modelValue
external:
  - modelValue
props:
  type: month
  modelValue: [2012, 4, 12]
---
::

`type="year"` отрисовывает отдельный выбор года.

::component-code
---
cast:
  modelValue: DateValue
ignore:
  - type
  - modelValue
external:
  - modelValue
props:
  type: year
  modelValue: [2012, 4, 12]
---
::

### Множественный выбор {#multiple}

Пропс `multiple` разрешает выбрать несколько дат.

::component-code
---
prettier: true
cast:
  modelValue: DateValue[]
ignore:
  - multiple
  - modelValue
external:
  - modelValue
props:
  multiple: true
  modelValue: [[2012, 4, 4], [2012, 4, 12], [2012, 4, 20]]
---
::

### Локаль {#locale}

Пропс `locale` меняет локаль календаря.

::component-code
---
prettier: true
cast:
  modelValue: DateValue
ignore:
  - modelValue
external:
  - modelValue
items:
  locale:
    - en
    - de
    - es
    - pt-BR
    - fr
    - it
    - pl
    - ru
    - uk
    - tr
    - zh-CN
    - zh-TW
    - ja
    - vi
    - id
    - ms
    - th
    - ar
    - kk
props:
  modelValue: [2012, 4, 12]
  locale: 'zh-CN'
---
::

### Диапазон {#range}

Пропс `range` включает выбор диапазона дат.

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
    start: [2012, 4, 3]
    end: [2012, 4, 20]
---
::

Пропс `range` работает и с `type="month"` и `type="year"` — можно выбрать диапазон месяцев или лет.

::component-code
---
prettier: true
cast:
  modelValue: DateRange
ignore:
  - type
  - range
  - modelValue.start
  - modelValue.end
external:
  - modelValue
props:
  type: month
  range: true
  modelValue:
    start: [2012, 4, 3]
    end: [2012, 4, 20]
---
::

### Число месяцев {#number-of-months}

Пропс `numberOfMonths` меняет число месяцев в календаре.

::component-code
---
prettier: true
props:
  numberOfMonths: 3
---
::

### Управление месяцами {#month-controls}

Пропс `month-controls` показывает кнопки переключения месяцев. По умолчанию — `true`.

::component-code
---
prettier: true
props:
  monthControls: false
---
::

Пропсы `prev-month` и `next-month` переопределяют кнопки месяцев.

::component-code
---
prettier: true
ignore:
  - prevMonth.color
  - prevMonth.variant
  - nextMonth.color
  - nextMonth.variant
props:
  prevMonth:
    color: 'air-primary'
  nextMonth:
    color: 'air-primary-alert'
---
::

### Управление годами {#year-controls}

Пропс `year-controls` показывает кнопки переключения годов. По умолчанию — `true`.

::component-code
---
props:
  yearControls: false
---
::

Пропсы `prev-year` и `next-year` переопределяют кнопки годов.

::component-code
---
prettier: true
ignore:
  - prevYear.color
  - prevYear.variant
  - nextYear.color
  - nextYear.variant
props:
  prevYear:
    color: 'air-primary'
  nextYear:
    color: 'air-primary'
---
::

### Переключение вида :badge{label="2.14+" class="align-text-top"} {#view-control}

Пропс `view-control` превращает заголовок в кнопку, которая переключает виды дней, месяцев и лет. По умолчанию — `true`.

::component-code
---
items:
  viewControl:
    - true
    - false
props:
  viewControl: false
---
::

Если передать в `view-control` объект, он переопределит кнопку заголовка.

::component-code
---
prettier: true
ignore:
  - viewControl.color
  - viewControl.variant
props:
  viewControl:
    color: air-primary
---
::

### Годов на странице :badge{label="2.15+" class="align-text-top"} {#years-per-page}

Пропс `years-per-page` меняет число лет в виде годов. По умолчанию — `12`.

::component-code
---
ignore:
  - type
props:
  type: year
  yearsPerPage: 20
---
::

### Фиксированные недели {#fixed-weeks}

Пропс `fixed-weeks` показывает календарь с фиксированным числом недель.

::component-code
---
prettier: true
props:
  fixedWeeks: false
---
::

### Номера недель {#week-numbers}

Пропс `week-numbers` показывает номера недель.

::component-code
---
props:
  weekNumbers: true
  fixedWeeks: true
---
::

### Цвет {#color}

Пропс `color` меняет цвет календаря.

::component-code
---
prettier: true
cast:
  defaultValue: DateRange
hide:
  - range
  - defaultValue
  - defaultValue.start
  - defaultValue.end
props:
  color: 'air-primary-alert'
  range: true
  defaultValue:
    start: [2012, 4, 3]
    end: [2012, 4, 20]
---
::

### Размер {#size}

Пропс `size` меняет размер календаря.

::component-code
---
prettier: true
props:
  size: lg
---
::

### Отключение {#disabled}

Пропс `disabled` отключает календарь.

::component-code
---
prettier: true
props:
  disabled: true
---
::

## Примеры {#examples}

### С событиями в чипах {#with-chip-events}

Компонент [Chip](/docs/components/chip/) добавляет события к отдельным дням.

::component-example
---
name: 'calendar-events-example'
---
::

### С отключёнными датами {#with-disabled-dates}

Пропс `is-date-disabled` с функцией помечает отдельные даты как отключённые. При `type="month"` или `type="year"` используйте `is-month-disabled` или `is-year-disabled`.

::component-example
---
name: 'calendar-disabled-dates-example'
---
::

### С недоступными датами {#with-unavailable-dates}

Пропс `is-date-unavailable` с функцией помечает отдельные даты как недоступные. При `type="month"` или `type="year"` используйте `is-month-unavailable` или `is-year-unavailable`.

::component-example
---
name: 'calendar-unavailable-dates-example'
---
::

### С минимальной и максимальной датой {#with-minmax-dates}

Пропсы `min-value` и `max-value` ограничивают диапазон дат.

::component-example
---
name: 'calendar-min-max-dates-example'
---
::

### С другими календарными системами {#with-other-calendar-systems}

Другие календари из `@internationalized/date` дают другую календарную систему.

::component-example
---
name: 'calendar-other-system-example'
---
::

::note{to="https://react-spectrum.adobe.com/internationalized/date/Calendar.html#implementations"}
Все доступные календари перечислены в документации `@internationalized/date`.
::

### С внешним управлением {#with-external-controls}

Календарём можно управлять извне, меняя дату в `v-model`.

::component-example
---
name: 'calendar-external-controls-example'
---
::

### С сегодняшней датой {#with-todays-date}

Функция `today` из `@internationalized/date` вместе с `getLocalTimeZone` задаёт текущую дату.

::component-example
---
name: 'calendar-today-example'
---
::

### Как выбор даты {#as-a-date-picker}

Из [Button](/docs/components/button/) и [Popover](/docs/components/popover/) собирается выбор даты.

::component-example
---
name: 'calendar-date-picker-example'
---
::

### Как выбор диапазона дат {#as-a-date-range-picker}

Из [Button](/docs/components/button/) и [Popover](/docs/components/popover/) собирается выбор диапазона дат с готовыми диапазонами.

::component-example
---
name: 'calendar-date-range-picker-example'
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
