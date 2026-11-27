---
title: Checkbox
description: 'Поле-переключатель: отмечено или не отмечено.'
category: form
keywords:
  - tickbox
  - check
  - boolean
  - чекбокс
  - флажок
  - галочка
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Checkbox.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/checkbox
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/checkbox
  - label: Checkbox
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/checkbox
---

## Использование {#usage}

Состоянием Checkbox управляет директива `v-model`.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: true
---
::

Пропс `default-value` задаёт начальное значение, если управлять состоянием не нужно.

::component-code
---
prettier: true
ignore:
  - defaultValue
props:
  defaultValue: true
---
::

### Неопределённое состояние {#indeterminate}

Значение `indeterminate` в `v-model` или `default-value` переводит Checkbox в [неопределённое состояние](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes).

::component-code
---
prettier: true
ignore:
  - defaultValue
props:
  defaultValue: 'indeterminate'
---
::

### Подпись {#label}

Пропс `label` задаёт подпись Checkbox.

::component-code
---
prettier: true
props:
  label: Все сотрудники могут писать в Ленту
---
::

При пропсе `required` рядом с подписью появляется звёздочка.

::component-code
---
prettier: true
ignore:
  - label
props:
  required: true
  label: Все сотрудники могут писать в Ленту
---
::

### Описание {#description}

Пропс `description` задаёт описание Checkbox.

::component-code
---
prettier: true
ignore:
  - label
props:
  label: Все сотрудники могут писать в Ленту
  description: 'Рассылка сообщений в Ленте разрешена. Эти сообщения будут видны всем.'
---
::

### Цвет {#color}

Пропс `color` меняет цвет Checkbox.

::component-code
---
prettier: true
ignore:
  - label
  - defaultValue
props:
  color: 'air-primary-copilot'
  defaultValue: true
  label: Включить расширенный предпросмотр ссылок
---
::

### Вариант {#variant}

Пропс `variant` меняет вариант Checkbox.

::component-code
---
prettier: true
ignore:
  - label
  - defaultValue
props:
  variant: 'card'
  color: 'air-primary-copilot'
  defaultValue: true
  label: Все сотрудники могут писать в Ленту
  description: 'Рассылка сообщений в Ленте разрешена. Эти сообщения будут видны всем.'
---
::

### Размер {#size}

Пропс `size` меняет размер Checkbox.

::component-code
---
prettier: true
ignore:
  - label
  - description
  - defaultValue
props:
  size: lg
  variant: list
  defaultValue: true
  label: Все сотрудники могут писать в Ленту
  description: 'Рассылка сообщений в Ленте разрешена. Эти сообщения будут видны всем.'
---
::

### Индикатор {#indicator}

Пропс `indicator` меняет положение индикатора или скрывает его. По умолчанию — `start`.

::note
При `indicator` равном `hidden` `icon` показывается над подписью.
::

::component-code
---
ignore:
  - label
  - icon
  - defaultValue
cast:
  icon: 'RocketIcon'
items:
  indicator:
    - start
    - end
    - hidden
props:
  indicator: 'hidden'
  variant: 'card'
  icon: 'RocketIcon'
  defaultValue: true
  label: Все сотрудники могут писать в Ленту
---
::

### Отключение {#disabled}

Пропс `disabled` отключает Checkbox.

::component-code
---
ignore:
  - label
  - description
props:
  disabled: true
  label: Все сотрудники могут писать в Ленту
  description: 'Рассылка сообщений в Ленте разрешена. Эти сообщения будут видны всем.'
  variant: list
---
::

## API

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
