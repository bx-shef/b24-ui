---
title: InputRating
description: 'Компонент для показа и сбора оценок от пользователей.'
category: form
keywords:
  - star rating
  - stars
  - рейтинг
  - звёзды
  - оценка пользователя
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/InputRating.vue
  - label: Rating
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/inpu-rating
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/listbox
---

## Использование {#usage}

Директива `v-model` управляет значением оценки InputRating.

::component-code
---
external:
  - modelValue
props:
  modelValue: 3
---
::

Пропс `default-value` задаёт начальное значение, когда управлять состоянием не нужно.

::component-code
---
ignore:
  - defaultValue
props:
  defaultValue: 3
---
::

### Шаг {#step}

Пропс `step` задаёт точность каждой звезды. Значение `0.5` разрешает оценки в ползвезды.

::component-code
---
ignore:
  - defaultValue
props:
  step: 0.5
  defaultValue: 3.5
---
::

### Количество {#length}

Пропс `length` задаёт число звёзд. По умолчанию `5`.

::component-code
---
ignore:
  - defaultValue
props:
  length: 10
  step: 0.5
  defaultValue: 7.5
---
::

### Сбрасываемое значение {#clearable}

Пропс `clearable` позволяет сбросить оценку щелчком по текущему выбранному значению. По умолчанию `false`.

::component-code
---
ignore:
  - defaultValue
props:
  clearable: true
  defaultValue: 3
---
::

### Предпросмотр при наведении {#hoverable}

Пропс `hoverable` определяет, показывает ли оценка предпросмотр значения при наведении на звёзды. По умолчанию `false`.

::component-code
---
ignore:
  - defaultValue
props:
  hoverable: true
  defaultValue: 3
---
::

### Иконка {#icon}

Пропс `icon` меняет иконку звёзд.

::component-code
---
ignore:
  - defaultValue
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  defaultValue: 4
---
::

### Иконка пустой звезды {#empty-icon}

Пропс `empty-icon` меняет иконку пустых звёзд. Если он не задан, используется та же иконка, что и в `icon`.

::component-code
---
ignore:
  - defaultValue
  - emptyIcon
cast:
  emptyIcon: 'RocketIcon'
props:
  emptyIcon: 'RocketIcon'
  defaultValue: 3
---
::

### Цвет {#color}

Пропс `color` меняет цвет закрашенных звёзд.

::component-code
---
ignore:
  - defaultValue
props:
  color: 'air-primary-success'
  defaultValue: 4
---
::

### Размер {#size}

Пропс `size` меняет размер звёзд.

::component-code
---
ignore:
  - defaultValue
items:
  size:
    - xs
    - sm
    - md
    - lg
    - xl
props:
  size: xl
  defaultValue: 4
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию оценки. По умолчанию `horizontal`.

::component-code
---
ignore:
  - defaultValue
props:
  orientation: vertical
  defaultValue: 4
---
::

### Отключение {#disabled}

Пропс `disabled` отключает InputRating.

::component-code
---
ignore:
  - defaultValue
props:
  disabled: true
  defaultValue: 3
---
::

### Только чтение {#readonly}

Пропс `readonly` показывает оценку без возможности взаимодействия. В отличие от `disabled`, внешний вид остаётся обычным (полная непрозрачность, курсор по умолчанию). Используйте, когда оценку нельзя менять, но выглядеть она должна как обычно.

::component-code
---
ignore:
  - defaultValue
props:
  readonly: true
  defaultValue: 4.5
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
