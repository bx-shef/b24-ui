---
title: Toggle
description: 'Кнопка, которую можно нажать и отжать: у неё два состояния.'
category: element
keywords:
  - toggle button
  - pressed button
  - кнопка-переключатель
  - нажатая кнопка
  - состояние нажатия
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Toggle.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/toggle
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/toggle
  - label: Toggle
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/toggle
navigation.badge: Soon
---

## Использование {#usage}

Директива `v-model` управляет нажатым состоянием Toggle.

::component-code
---
ignore:
  - modelValue
  - label
external:
  - modelValue
props:
  modelValue: true
  label: Жирный
---
::

Пропс `default-value` задаёт начальное значение, когда состоянием не нужно управлять.

::component-code
---
ignore:
  - defaultValue
  - label
props:
  defaultValue: true
  label: Жирный
---
::

::note
Toggle построен на [Button](/docs/components/button/), поэтому принимает его пропсы: `label`, `icon`, `size` и другие, кроме пропсов ссылки. Нажатое состояние Toggle передаёт в пропс `active` у Button.
::

### Иконка {#icon}

Пропс `icon` показывает иконку. Кнопке без подписи нужен `aria-label`.

::component-code
---
ignore:
  - icon
  - aria-label
props:
  icon: 'RocketIcon'
  aria-label: Запуск
---
::

### Цвет {#color}

Пропс `color` задаёт цвет неактивного Toggle. По умолчанию `air-secondary-no-accent`.

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
  - label
  - defaultValue
props:
  color: air-tertiary-no-accent
  label: Жирный
---
::

### Цвет нажатого {#active-color}

Пропс `active-color` задаёт цвет нажатого Toggle. По умолчанию `air-primary`.

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
  - label
  - defaultValue
props:
  activeColor: air-primary-success
  defaultValue: true
  label: Жирный
---
::

### Размер {#size}

Пропс `size` меняет размер Toggle.

::component-code
---
ignore:
  - label
props:
  size: xl
  label: Жирный
---
::

### Отключение {#disabled}

Пропс `disabled` отключает Toggle.

::component-code
---
ignore:
  - label
props:
  disabled: true
  label: Жирный
---
::

## Примеры {#examples}

### Стиль нажатого состояния {#style-the-pressed-state}

В нажатом состоянии Toggle получает `data-state="on"`, и его можно оформить вариантом `data-[state=on]`.

::component-code
---
ignore:
  - label
  - class
props:
  label: Жирный
  class: 'data-[state=on]:italic'
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
