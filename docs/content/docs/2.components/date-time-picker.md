---
title: DateTimePicker
description: 'Выбор даты и времени: календарь, после которого открывается сетка часов и минут, с готовыми значениями рядом.'
category: form
keywords:
  - date picker
  - datetime picker
  - time picker
  - schedule
  - дата и время
  - выбор даты и времени
  - календарь со временем
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DateTimePicker.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/date-time-picker
---

## Использование {#usage}

Значение привязывается через `v-model`. Это `CalendarDateTime` или `ZonedDateTime` из [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/index.html) — те же типы, что используют [Calendar](/docs/components/calendar/) и [InputDate](/docs/components/input-date/).

Выбор даты переходит к выбору времени, выбор минуты закрывает окно.

::component-example
---
name: 'date-time-picker-basic-example'
---
::

### Только дата {#date-only}

Пропс `date-only` нужен, когда время не требуется. Шаг выбора времени пропускается, а значение остаётся `CalendarDate`, то есть времени в нём нет вовсе — это не полночь.

::component-example
---
name: 'date-time-picker-date-only-example'
---
::

### Готовые значения {#presets}

Рядом с календарём стоит столбец готовых значений: сегодня, завтра, конец недели, через неделю и конец месяца. Пропс `presets` заменяет список, а `hide-presets` убирает столбец.

Значение `value` готового варианта может быть функцией, которая вычисляется при отрисовке списка, поэтому относительные варианты остаются верными, сколько бы страница ни была открыта.

::component-example
---
name: 'date-time-picker-custom-presets-example'
---
::

### Шаг минут {#minute-step}

Пропс `minute-step` меняет шаг сетки минут. Значение ограничивается диапазоном 1…30, а если это не конечное число, берётся `5`.

::component-code
---
prettier: true
items:
  minuteStep:
    - 5
    - 10
    - 15
    - 30
props:
  minuteStep: 15
  placeholder: 'Выберите дату и время'
---
::

### 12- и 24-часовой формат {#clock}

Сетка часов всегда идёт от `00` до `23`, поэтому при локали с 12-часовым форматом
триггер показал бы `2:30 PM` рядом с ячейкой `14`. Пропс `hour12` это согласует.
Если пропс не задан, формат берётся из локали.

::component-code
---
prettier: true
cast:
  modelValue: DateTimeValue
ignore:
  - modelValue
external:
  - modelValue
items:
  hour12:
    - true
    - false
props:
  hour12: false
  modelValue: [2024, 10, 6, 14, 30]
  placeholder: 'Выберите дату и время'
---
::

### Свой триггер {#custom-trigger}

Слот `#default` заменяет триггер. Он получает состояние открытия, значение и отформатированное значение.

::component-example
---
name: 'date-time-picker-custom-trigger-example'
---
::

### Внутри FormField {#inside-a-formfield}

::component-example
---
name: 'date-time-picker-form-field-example'
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
