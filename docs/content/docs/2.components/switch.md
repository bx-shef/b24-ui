---
title: Switch
description: 'Переключатель между двумя состояниями.'
category: form
keywords:
  - toggle
  - toggle switch
  - переключатель
  - тумблер
  - включить и выключить
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Switch.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/switch
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/switch
  - label: Switch
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/switch
---

## Использование {#usage}

Директива `v-model` управляет состоянием Switch.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: true
---
::

Пропс `default-value` задаёт начальное значение, когда управлять состоянием не нужно.

::component-code
---
ignore:
  - defaultValue
props:
  defaultValue: true
---
::

### Подпись {#label}

Пропс `label` задаёт подпись Switch.

::component-code
---
props:
  label: Включить уведомления
---
::

При использовании пропса `required` рядом с подписью появляется звёздочка.

::component-code
---
ignore:
  - label
props:
  required: true
  label: Включить уведомления
---
::

### Описание {#description}

Пропс `description` задаёт описание Switch.

::component-code
---
ignore:
  - label
props:
  label: Включить уведомления
  description: 'Это переключатель.'
---
::

### Иконка {#icon}

Пропсы `checked-icon` и `unchecked-icon` задают иконки Switch во включённом и выключенном состоянии.

::component-code
---
prettier: true
ignore:
  - label
  - defaultValue
  - checkedIcon
cast:
  checkedIcon: 'RocketIcon'
props:
  checkedIcon: 'RocketIcon'
  defaultValue: true
  label: Включить уведомления
---
::

### Загрузка {#loading}

Пропс `loading` показывает иконку загрузки в Switch.

::component-code
---
ignore:
  - label
  - defaultValue
props:
  loading: true
  defaultValue: true
  label: Включить уведомления
---
::

### Цвет {#color}

Пропс `color` меняет цвет Switch.

::component-code
---
ignore:
  - label
  - defaultValue
props:
  color: air-primary-copilot
  defaultValue: true
  label: Включить уведомления
---
::

### Размер {#size}

Пропс `size` меняет размер Switch.

::component-code
---
ignore:
  - label
  - defaultValue
props:
  size: lg
  defaultValue: true
  label: Включить уведомления
---
::

### Отключение {#disabled}

Пропс `disabled` отключает Switch.

::component-code
---
ignore:
  - label
props:
  disabled: true
  label: Включить уведомления
---
::

## API {#api}

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<button>`.
::

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
