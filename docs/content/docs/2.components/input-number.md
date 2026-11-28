---
title: InputNumber
description: 'Числовое поле ввода с гибкой настройкой диапазона.'
category: form
keywords:
  - number field
  - spinbutton
  - counter
  - числовое поле
  - ввод числа
  - счётчик со стрелками
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/InputNumber.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/input-number
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/input-number
  - label: NumberField
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/number-field
---

## Использование {#usage}

Директива `v-model` управляет значением InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
---
::

Пропс `default-value` задаёт начальное значение, когда управлять состоянием не нужно.

::component-code
---
ignore:
  - defaultValue
props:
  defaultValue: 5
---
::

::note
Компонент использует пакет [`@internationalized/number`](https://react-spectrum.adobe.com/internationalized/number/index.html), который предоставляет утилиты форматирования и разбора чисел для разных локалей и систем счисления.
::

### Минимум и максимум {#min-max}

Пропсы `min` и `max` задают минимальное и максимальное значение InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  min: 0
  max: 10
---
::

### Шаг {#step}

Пропс `step` задаёт шаг изменения значения InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  step: 2
---
::

### Начальное значение :badge{label="2.15+" class="align-text-top"} {#starting-value}

Пропс `starting-value` задаёт значение первого увеличения или уменьшения, когда InputNumber пуст. Оно ограничивается `min` и `max`, но не выравнивается по `step`. По умолчанию равно `min`, а если `min` не задан — `0`.

::component-code
---
props:
  startingValue: 18
  placeholder: 'Возраст'
---
::

### Недопустимые значения :badge{label="2.15+" class="align-text-top"} {#allow-invalid}

Пропс `allow-invalid` сохраняет введённое значение, даже если оно вне диапазона `min` / `max` или не попадает в сетку `step`. Изменение значения в сторону диапазона по-прежнему возвращает его в диапазон и на сетку `step`.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  min: 0
  max: 10
  allowInvalid: true
---
::

::note
InputNumber не помечает такое значение как недопустимое: проверять его нужно самостоятельно.
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  orientation: vertical
---
::

### Плейсхолдер {#placeholder}

Пропс `placeholder` задаёт текст плейсхолдера.

::component-code
---
props:
  placeholder: 'Введите число'
---
::

### Цвет {#color}

Пропс `color` меняет цвет кольца, когда InputNumber в фокусе.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  color: 'air-primary'
  highlight: true
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса. Внутри компонента он включается при ошибке валидации.
::

### Тег {#tag}

Свойство `tag` показывает [Badge](/docs/components/badge/) поверх InputNumber.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
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
  modelValue: 5
  tag: заметка
  tagColor: air-secondary-alert
  color: 'air-primary'
  highlight: true
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса. Внутри компонента он включается при ошибке валидации.
::

### Размер {#size}

Пропс `size` меняет размер InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  size: xl
---
::

### Отключение {#disabled}

Пропс `disabled` отключает InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  disabled: true
---
::

### Увеличение и уменьшение {#increment-decrement}

Пропсы `increment` и `decrement` настраивают кнопки увеличения и уменьшения любыми пропсами [Button](/docs/components/button/).

::component-code
---
prettier: true
ignore:
  - modelValue
  - increment.size
  - increment.color
  - decrement.size
  - decrement.color
external:
  - modelValue
props:
  modelValue: 5
  increment:
    color: 'air-primary'
    size: xs
  decrement:
    color: 'air-primary-alert'
    size: xs
---
::

### Иконки увеличения и уменьшения {#increment-decrement-icons}

Пропсы `increment-icon` и `decrement-icon` меняют [иконки](https://bitrix24.github.io/b24icons/icons/) кнопок.

::component-code
---
prettier: true
ignore:
  - modelValue
  - incrementIcon
  - decrementIcon
cast:
  incrementIcon: 'RocketIcon'
  decrementIcon: 'RocketIcon'
external:
  - modelValue
props:
  modelValue: 5
  incrementIcon: 'RocketIcon'
  decrementIcon: 'RocketIcon'
---
::

### Без границы {#no-border}

Пропс `noBorder` убирает у InputNumber все границы (кольца).

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  noBorder: true
  highlight: true
  modelValue: 5
---
::

::note
Пропс `highlight` здесь показывает, что состояния фокуса нет.
::

### Подчёркивание {#underline}

Пропс `underline` убирает у InputNumber все границы (кольца), кроме нижней.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  underline: true
  highlight: true
  modelValue: 5
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

### Скругление {#rounded}

Пропс `rounded` скругляет InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  rounded: true
  highlight: true
  modelValue: 5
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

## Примеры {#examples}

### С десятичным форматом {#with-decimal-format}

Пропс `format-options` настраивает формат значения.

::component-example
---
name: 'input-number-decimal-example'
---
::

### С процентным форматом {#with-percentage-format}

Пропс `format-options` со значением `style: 'percent'` настраивает формат значения как процентный.

::component-example
---
name: 'input-number-percentage-example'
---
::

### С денежным форматом {#with-currency-format}

Пропс `format-options` со значением `style: 'currency'` настраивает формат значения как денежный.

::component-example
---
name: 'input-number-currency-example'
---
::

### Без кнопок {#without-buttons}

Пропсы `increment` и `decrement` управляют видимостью кнопок.

::component-example
---
name: 'input-number-without-buttons-example'
---
::

### Внутри FormField {#within-a-formfield}

InputNumber можно использовать внутри компонента [FormField](/docs/components/form-field/), чтобы показывать подпись, справочный текст, признак обязательности и так далее.

::component-example
---
name: 'input-number-form-field-example'
---
::

### Со слотами {#with-slots}

Слоты `#increment` и `#decrement` позволяют настроить кнопки.

::component-example
---
name: 'input-number-slots-example'
---
::

## API

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<input>`.
::

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

### Доступ через ref {#expose}

При обращении к компоненту через ref в шаблоне доступно:

| Имя | Тип |
| ---- | ---- |
| `inputRef`{lang="ts-type"} | `Ref<HTMLInputElement \| null>`{lang="ts-type"} |

## Тема {#theme}

:component-theme
