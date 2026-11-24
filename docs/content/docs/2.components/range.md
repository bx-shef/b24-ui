---
title: Range
description: 'Элемент управления для выбора числового значения в заданном диапазоне.'
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Range.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/range
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/slider
  - label: Slider
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/slider
---

## Использование {#usage}

Директива `v-model` управляет значением Range.

::component-code
---
external:
  - modelValue
props:
  modelValue: 50
---
::

Пропс `default-value` задаёт начальное значение, когда управлять состоянием не нужно.

::component-code
---
ignore:
  - defaultValue
props:
  defaultValue: 50
---
::

::tip
Чтобы назвать Range с одним бегунком, используйте `aria-label` или `aria-labelledby`: они передаются бегунку — элементу с ролью `slider`.

У Range с несколькими бегунками бегунки получают названия по положению, чтобы их можно было различать: `Minimum` / `Maximum` для двух и `Value n of m` для трёх и более. Эти названия сохраняются, а `aria-label` называет Range целиком через роль `group` на корне и не повторяется на каждом бегунке.
::

### Минимум и максимум {#min-max}

Пропсы `min` и `max` задают минимальное и максимальное значения Range. По умолчанию `0` и `100`.

::component-code
---
ignore:
  - defaultValue
props:
  min: 0
  max: 50
  defaultValue: 50
---
::

### Шаг {#step}

Пропс `step` задаёт шаг изменения значения Range. По умолчанию `1`.

::component-code
---
ignore:
  - defaultValue
props:
  step: 10
  defaultValue: 50
---
::

### Несколько бегунков {#multiple}

Директива `v-model` или пропс `default-value` с массивом значений создают Range-диапазон.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: [25, 75]
---
::

Пропс `min-steps-between-thumbs` ограничивает минимальное расстояние между бегунками.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: [25, 50, 75]
  minStepsBetweenThumbs: 10
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию Range. По умолчанию `horizontal`.

::component-code
---
ignore:
  - defaultValue
  - class
props:
  orientation: vertical
  defaultValue: 50
  class: 'h-48'
---
::

### Цвет {#color}

Пропс `color` меняет цвет Range.

::component-code
---
ignore:
  - defaultValue
props:
  color: air-primary-copilot
  defaultValue: 50
---
::

### Размер {#size}

Пропс `size` меняет размер Range.

::component-code
---
ignore:
  - defaultValue
props:
  size: lg
  defaultValue: 50
---
::

### Подсказка {#tooltip}

Пропс `tooltip` показывает вокруг бегунков Range [Tooltip](/docs/components/tooltip/) с текущим значением. Значение `true` включает поведение по умолчанию, а объект настраивает подсказку любыми свойствами компонента [Tooltip](/docs/components/tooltip/#props).

::component-code
---
ignore:
  - defaultValue
  - tooltip
props:
  defaultValue: 50
  tooltip: true
---
::

### Отключение {#disabled}

Пропс `disabled` отключает Range.

::component-code
---
ignore:
  - defaultValue
props:
  disabled: true
  defaultValue: 50
---
::

### Инверсия {#inverted}

Пропс `inverted` визуально инвертирует Range.

::component-code
---
ignore:
  - defaultValue
props:
  inverted: true
  defaultValue: 25
---
::

## API {#api}

### Пропсы {#props}

:component-props

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
