---
title: ProgressGroup
description: 'Один индикатор выполнения, который несёт сразу несколько значений, каждое в виде отдельного цветного сегмента.'
category: element
keywords:
  - meter group
  - segmented progress
  - stacked bar
  - breakdown
  - группа индикаторов
  - составной индикатор
  - сегментированная шкала
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ProgressGroup.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/progress-group
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/progress-group
---

## Использование {#usage}

ProgressGroup показывает несколько значений как сегменты одного индикатора выполнения.

::component-code
---
collapse: true
ignore:
  - items
  - max
  - class
external:
  - items
externalTypes:
  - ProgressGroupItem[]
props:
  max: 128
  items:
    - label: 'Система'
      value: 24
      color: 'air-secondary'
    - label: 'Приложения'
      value: 8
      color: 'air-primary-alert'
    - label: 'Документы'
      value: 12
      color: 'air-primary-warning'
    - label: 'Мультимедиа'
      value: 42
      color: 'air-primary-success'
  class: 'w-96'
---
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- `label?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `value?: number`{lang="ts-type"}
- `color?: "air-primary" | "air-primary-success" | "air-primary-alert" | "air-primary-copilot" | "air-primary-warning" | "air-secondary"`{lang="ts-type"}
- `slot?: string`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { segment?: ClassNameValue, indicator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingDot?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue }`{lang="ts-type"}

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - ProgressGroupItem[]
props:
  items:
    - label: 'Вычисления'
      value: 42
      color: 'air-primary'
    - label: 'Хранилище'
      value: 18
      color: 'air-secondary'
    - label: 'Пропускная способность'
      value: 9
      color: 'air-primary-warning'
  class: 'w-96'
---
::

::note
Элементы без `icon` получают в списке цветную точку.
::

### Максимум {#max}

Пропс `max` задаёт значение, которое составляют все элементы вместе. По умолчанию `100`.

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - ProgressGroupItem[]
props:
  max: 128
  items:
    - label: 'Система'
      value: 24
    - label: 'Приложения'
      value: 8
  class: 'w-96'
---
::

::note
Если `max` не положительное число, используется `100`, и сегменты сохраняют пропорции, а не схлопываются.
::

### Статус {#status}

Пропс `status` показывает суммарное значение прогресса.

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - ProgressGroupItem[]
props:
  max: 128
  status: true
  items:
    - label: 'Система'
      value: 24
      color: 'air-secondary'
    - label: 'Приложения'
      value: 8
      color: 'air-primary-alert'
  class: 'w-96'
---
::

::tip
Статус следует за концом полосы; чтобы растянуть его на всю ширину, используйте `:b24ui="{ status: 'w-full' }"`.
::

### Цвет {#color}

Пропс `color` задаёт цвет, который берут элементы без своего цвета.

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - ProgressGroupItem[]
props:
  color: 'air-secondary'
  max: 128
  items:
    - label: 'Система'
      value: 24
    - label: 'Приложения'
      value: 8
  class: 'w-96'
---
::

### Размер {#size}

Пропс `size` меняет толщину полосы.

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - ProgressGroupItem[]
props:
  size: 'lg'
  max: 128
  items:
    - label: 'Система'
      value: 24
    - label: 'Приложения'
      value: 8
  class: 'w-96'
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет направление полосы. По умолчанию `horizontal`.

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - ProgressGroupItem[]
props:
  orientation: 'vertical'
  max: 128
  items:
    - label: 'Система'
      value: 24
    - label: 'Приложения'
      value: 8
  class: 'h-96'
---
::

## Примеры {#examples}

### Со слотом status {#with-status-slot}

Слот `status` заменяет суммарное значение вашим содержимым.

::component-example
---
collapse: true
name: 'progress-group-status-example'
---
::

### Со слотами элементов {#with-item-slots}

Слоты `item-label` и `item-trailing` меняют то, что легенда показывает для каждого элемента.

::component-example
---
collapse: true
name: 'progress-group-item-example'
---
::

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme

## История изменений {#changelog}

:component-changelog
