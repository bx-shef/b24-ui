---
title: Button
description: 'Кнопка-ссылка или кнопка, выполняющая действие.'
category: element
keywords:
  - cta
  - action
  - btn
  - кнопка
  - призыв к действию
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Button.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/button/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/button
---

## Использование {#usage}

Слот по умолчанию задаёт подпись Button.

::component-code
---
prettier: true
slots:
  default: Кнопка
---
::

### Подпись {#label}

Пропс `label` задаёт подпись Button.

::component-code
---
prettier: true
props:
  label: Кнопка
---
::

### Цвет {#color}

Пропс `color` меняет цвет Button.

::component-code
---
prettier: true
props:
  color: 'air-secondary-no-accent'
slots:
  default: Кнопка
---
::

### Размер {#size}

Пропс `size` меняет размер Button.

::component-code
---
prettier: true
props:
  size: xl
slots:
  default: Кнопка
---
::

### Иконка {#icon}

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) внутри Button.

::component-code
---
prettier: true
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  size: md
  color: 'air-primary'
slots:
  default: Кнопка
---
::

Пропс `use-dropdown` показывает иконку справа.

::component-code
---
prettier: true
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  useDropdown: true
  icon: 'RocketIcon'
  size: md
  color: 'air-primary'
slots:
  default: Кнопка
---
::

Подпись (пропс или слот `label`) необязательна, поэтому Button может быть кнопкой только с иконкой.

::component-code
---
prettier: true
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  size: md
  color: 'air-primary'
---
::

### Аватар {#avatar}

Пропс `avatar` показывает [аватар](/docs/components/avatar/) внутри Button.

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
  color: 'air-primary'
slots:
  default: |

    Кнопка
---
::

Подпись (пропс или слот `label`) необязательна, поэтому Button может быть кнопкой только с аватаром.

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
  color: 'air-primary'
---
::

### Ссылка {#link}

Можно передать любое свойство компонента [Link](/docs/components/link/#props): `to`, `target` и другие.

::component-code
---
prettier: true
ignore:
  - target
props:
  to: https://apidocs.bitrix24.com
  target: _blank
slots:
  default: Кнопка
---
::

Если Button — ссылка или задан пропс `active`, пропс `active-color` настраивает активное состояние.

::component-code
---
prettier: true
ignore:
  - color
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
props:
  active: true
  color: 'air-secondary-no-accent'
  activeColor: 'air-primary'
slots:
  default: |

    Кнопка
---

Кнопка
::

Активное состояние настраивают и пропсы `active-class` и `inactive-class`.

::component-code
---
prettier: true
props:
  active: true
  activeClass: 'italic'
  inactiveClass: 'tracking-widest'
slots:
  default: Кнопка
---

Кнопка
::

### Загрузка {#loading}

Пропс `loading` показывает иконку загрузки и отключает Button.

::component-code
---
prettier: true
props:
  loading: true
  color: 'air-primary'
slots:
  default: Кнопка
---
Кнопка
::

Пропс `loading-auto` показывает иконку загрузки, пока выполняется промис обработчика `@click`.

:component-example{name="button-loading-auto-example"}

Это работает и с компонентом [Form](/docs/components/form/).

:component-example{name="button-loading-auto-form-example"}

### Иконка загрузки {#loading-icon}

Пропсы `use-clock` и `use-wait` показывают разные иконки загрузки.

::component-code
---
prettier: true
props:
  loading: true
  useWait: true
  useClock: false
  color: 'air-primary'
slots:
  default: Кнопка
---
Кнопка
::

### Отключение {#disabled}

Пропс `disabled` отключает Button.

::component-code
---
prettier: true
props:
  disabled: true
  color: 'air-primary'
slots:
  default: Кнопка
---

Кнопка
::

### Скругление {#rounded}

Пропс `rounded` скругляет Button.

::component-code
---
prettier: true
props:
  rounded: true
  color: 'air-primary'
slots:
  default: Кнопка
---

Кнопка
::

### На всю ширину {#block}

Свойство `block` задаёт Button класс `w-full`.

::component-code
---
prettier: true
props:
  block: true
  color: 'air-primary'
slots:
  default: Кнопка
---

Кнопка
::

### NormalCase

Свойство `normalCase` включает для Button `uppercase`.

::component-code
---
prettier: true
props:
  normalCase: false
  color: 'air-primary'
slots:
  default: Кнопка
---

Кнопка
::

## API

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<button>`.
::

::callout{color="air-secondary-accent" icon-name="GitHubIcon" to="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Link.vue#L13"}
Компонент `Button` расширяет компонент `Link`. Исходный код — на GitHub.
::

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
