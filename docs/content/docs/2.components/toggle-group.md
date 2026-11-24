---
title: ToggleGroup
description: 'Набор кнопок, каждую из которых можно нажать и отжать.'
category: element
keywords:
  - segmented control
  - button group
  - toggle buttons
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ToggleGroup.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/toggle-group
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/toggle-group
  - label: ToggleGroup
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/toggle-group
navigation.badge: Soon
---

## Использование {#usage}

Директива `v-model` управляет нажатыми элементами ToggleGroup.

::component-code
---
ignore:
  - modelValue
  - items
external:
  - items
  - modelValue
externalTypes:
  - ToggleGroupItem[]
props:
  modelValue: 'day'
  items:
    - label: 'День'
      value: 'day'
    - label: 'Неделя'
      value: 'week'
    - label: 'Месяц'
      value: 'month'
---
::

Пропс `default-value` задаёт начальное значение, когда состоянием не нужно управлять.

::component-code
---
ignore:
  - defaultValue
  - items
external:
  - items
externalTypes:
  - ToggleGroupItem[]
props:
  defaultValue: 'week'
  items:
    - label: 'День'
      value: 'day'
    - label: 'Неделя'
      value: 'week'
    - label: 'Месяц'
      value: 'month'
---
::

### Элементы {#items}

Пропс `items` — массив объектов. Они принимают пропсы [Button](/docs/components/button/), кроме пропсов ссылки, и поле `value`: по умолчанию это индекс элемента строкой, поэтому модель тоже хранит строки.

- `value?: AcceptableValue`{lang="ts-type"}
- `label?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `disabled?: boolean`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: ButtonProps['b24ui']`{lang="ts-type"}

::component-code
---
ignore:
  - items
  - defaultValue
external:
  - items
externalTypes:
  - ToggleGroupItem[]
props:
  defaultValue: 'week'
  items:
    - label: 'День'
      value: 'day'
    - label: 'Неделя'
      value: 'week'
    - label: 'Месяц'
      value: 'month'
---
::

### Иконки {#icons}

Элементы с `icon` и без подписи требуют `aria-label`: по нему кнопку находят скринридеры.

::component-code
---
ignore:
  - items
  - defaultValue
external:
  - items
externalTypes:
  - ToggleGroupItem[]
cast:
  items: 'ComponentWithIcon'
props:
  defaultValue: 'day'
  items:
    - value: 'day'
      icon: 'RocketIcon'
      aria-label: 'День'
    - value: 'week'
      icon: 'RocketIcon'
      aria-label: 'Неделя'
    - value: 'month'
      icon: 'RocketIcon'
      aria-label: 'Месяц'
---
::

### Несколько значений {#multiple}

Значение `multiple` в пропсе `type` разрешает нажимать сразу несколько элементов. Модель тогда — массив.

::component-code
---
prettier: true
items:
  type:
    - single
    - multiple
ignore:
  - items
  - defaultValue
external:
  - items
externalTypes:
  - ToggleGroupItem[]
props:
  type: 'multiple'
  defaultValue:
    - 'bold'
    - 'italic'
  items:
    - label: 'Жирный'
      value: 'bold'
    - label: 'Курсив'
      value: 'italic'
    - label: 'Подчёркнутый'
      value: 'underline'
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет направление раскладки. По умолчанию `horizontal`.

::component-code
---
items:
  orientation:
    - horizontal
    - vertical
ignore:
  - items
  - defaultValue
external:
  - items
externalTypes:
  - ToggleGroupItem[]
props:
  orientation: 'vertical'
  defaultValue: 'week'
  items:
    - label: 'День'
      value: 'day'
    - label: 'Неделя'
      value: 'week'
    - label: 'Месяц'
      value: 'month'
---
::

### Соединение {#attached}

Пропс `attached` соединяет элементы в одну группу, как в [FieldGroup](/docs/components/field-group/).

::component-code
---
items:
  orientation:
    - horizontal
    - vertical
ignore:
  - items
  - defaultValue
external:
  - items
externalTypes:
  - ToggleGroupItem[]
props:
  attached: true
  defaultValue: 'week'
  items:
    - label: 'День'
      value: 'day'
    - label: 'Неделя'
      value: 'week'
    - label: 'Месяц'
      value: 'month'
---
::

### Цвет {#color}

Пропс `color` задаёт цвет неактивных элементов. По умолчанию `air-secondary-no-accent`.

::component-code
---
items:
  color:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-secondary-no-accent
    - air-tertiary
    - air-tertiary-accent
    - air-tertiary-no-accent
    - air-selection
    - air-boost
ignore:
  - items
  - defaultValue
external:
  - items
externalTypes:
  - ToggleGroupItem[]
props:
  color: air-tertiary-no-accent
  defaultValue: 'week'
  items:
    - label: 'День'
      value: 'day'
    - label: 'Неделя'
      value: 'week'
    - label: 'Месяц'
      value: 'month'
---
::

### Цвет нажатого {#active-color}

Пропс `active-color` задаёт цвет нажатых элементов. По умолчанию `air-primary`.

::component-code
---
items:
  activeColor:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-secondary-no-accent
    - air-tertiary
    - air-tertiary-accent
    - air-tertiary-no-accent
    - air-selection
    - air-boost
ignore:
  - items
  - defaultValue
external:
  - items
externalTypes:
  - ToggleGroupItem[]
props:
  activeColor: air-primary-success
  defaultValue: 'week'
  items:
    - label: 'День'
      value: 'day'
    - label: 'Неделя'
      value: 'week'
    - label: 'Месяц'
      value: 'month'
---
::

### Размер {#size}

Пропс `size` меняет размер элементов.

::component-code
---
ignore:
  - items
  - defaultValue
external:
  - items
externalTypes:
  - ToggleGroupItem[]
props:
  size: xl
  defaultValue: 'week'
  items:
    - label: 'День'
      value: 'day'
    - label: 'Неделя'
      value: 'week'
    - label: 'Месяц'
      value: 'month'
---
::

### Отключение {#disabled}

Пропс `disabled` отключает ToggleGroup.

::component-code
---
ignore:
  - items
  - defaultValue
external:
  - items
externalTypes:
  - ToggleGroupItem[]
props:
  disabled: true
  defaultValue: 'week'
  items:
    - label: 'День'
      value: 'day'
    - label: 'Неделя'
      value: 'week'
    - label: 'Месяц'
      value: 'month'
---
::

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
