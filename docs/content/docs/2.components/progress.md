---
title: Progress
description: 'Индикатор выполнения, показывающий, насколько завершена задача.'
category: element
keywords:
  - progress bar
  - loading bar
  - meter
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Progress.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/progress
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/progress
  - label: Progress
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/progress
---

## Использование {#usage}

Директива `v-model` управляет значением Progress.

::component-code
---
external:
  - modelValue
props:
  modelValue: 24
---
::

::note
Компонент [`ProgressGroup`](/docs/components/progress-group) делит одну полосу на несколько сегментов, которые в сумме дают общее значение.
::

### Максимум {#max}

Пропс `max` задаёт максимальное значение Progress.

::component-code
---
external:
  - modelValue
props:
  modelValue: 2
  max: 4
---
::

Если передать в `max` массив строк, под полосой показывается активный шаг, а максимальное значение равно длине массива.

::component-code
---
prettier: true
ignore:
  - max
external:
  - modelValue
props:
  modelValue: 3
  max:
    - 'Поиск клиентов...'
    - 'Квалификация...'
    - 'Презентация...'
    - 'Переговоры...'
    - 'Сделка закрыта!'
---
::

### Статус {#status}

Пропс `status` показывает текущее значение Progress над полосой.

::component-code
---
external:
  - modelValue
props:
  modelValue: 24
  status: true
---
::

::tip
Статус следует за концом полосы; чтобы растянуть его на всю ширину, используйте `:b24ui="{ status: 'w-full' }"`.
::

### Неопределённое состояние {#indeterminate}

Когда `v-model` не задан или значение равно `null`, Progress переходит в _неопределённое состояние_: полоса анимируется как `loading`; анимацию можно сменить пропсом [`animation`](#animation).

::component-code
---
external:
  - modelValue
props:
  modelValue: null
---
::

::tip
Если пользователь предпочитает уменьшенное движение, анимация отключается, и полоса неопределённого состояния показывается как пульсация на всю ширину.
::

### Анимация {#animation}

Пропс `animation` меняет анимацию Progress на обратную карусель, качающуюся полосу или упругую полосу. По умолчанию `loading`.

::component-code
---
props:
  animation: swing
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию Progress. По умолчанию `horizontal`.

::component-code
---
ignore:
  - class
props:
  orientation: vertical
  class: 'h-48 justify-center'
---
::

### Цвет {#color}

Пропс `color` меняет цвет Progress.

::component-code
---
props:
  color: 'air-primary-copilot'
---
::

### Размер {#size}

Пропс `size` меняет размер Progress.

::component-code
---
props:
  size: lg
---
::

### Инверсия {#inverted}

Пропс `inverted` визуально инвертирует Progress.

::component-code
---
props:
  inverted: true
  modelValue: 24
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
