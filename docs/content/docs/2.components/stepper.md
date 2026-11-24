---
title: Stepper
description: 'Компонент пошагового мастера, который показывает прогресс в многошаговом процессе.'
category: navigation
keywords:
  - wizard
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Stepper.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/stepper
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/stepper
---

## Использование {#usage}

Stepper показывает список элементов в виде пошагового мастера.

::component-code
---
collapse: true
hide:
  - class
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - StepperItem[]
props:
  items:
    - title: 'Адрес'
      description: 'Укажите здесь свой адрес'
    - title: 'Доставка'
      description: 'Выберите способ доставки'
    - title: 'Оформление'
      description: 'Подтвердите заказ'
  class: 'w-full'
---
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- `title?: string`{lang="ts-type"}
- `description?: string`{lang="ts-type"}
- `content?: string`{lang="ts-type"}
- [`icon?: IconComponent`{lang="ts-type"}](#with-controls)
- `value?: string | number`{lang="ts-type"}
- `disabled?: boolean`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, container?: ClassNameValue, trigger?: ClassNameValue, indicator?: ClassNameValue, icon?: ClassNameValue, separator?: ClassNameValue, wrapper?: ClassNameValue, title?: ClassNameValue, description?: ClassNameValue }`{lang="ts-type"}

::component-code
---
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - StepperItem[]
props:
  items:
    - title: 'Адрес'
      description: 'Укажите здесь свой адрес'
    - title: 'Доставка'
      description: 'Выберите способ доставки'
    - title: 'Оформление'
      description: 'Подтвердите заказ'
  class: 'w-full'
---
::

::note
Щёлкайте по элементам, чтобы переходить между шагами.
::

### Цвет {#color}

Пропс `color` меняет цвет Stepper.

::component-code
---
ignore:
  - content
  - items
  - class
external:
  - items
externalTypes:
  - StepperItem[]
props:
  color: air-primary-alert
  items:
    - title: 'Адрес'
      description: 'Укажите здесь свой адрес'
    - title: 'Доставка'
      description: 'Выберите способ доставки'
    - title: 'Оформление'
      description: 'Подтвердите заказ'
  class: 'w-full'
---
::

### Размер {#size}

Пропс `size` меняет размер Stepper.

::component-code
---
ignore:
  - content
  - items
  - class
external:
  - items
externalTypes:
  - StepperItem[]
props:
  size: xl
  items:
    - title: 'Адрес'
      description: 'Укажите здесь свой адрес'
    - title: 'Доставка'
      description: 'Выберите способ доставки'
    - title: 'Оформление'
      description: 'Подтвердите заказ'
  class: 'w-full'
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию Stepper. По умолчанию `horizontal`.

::component-code
---
ignore:
  - content
  - items
  - class
external:
  - items
externalTypes:
  - StepperItem[]
props:
  orientation: vertical
  items:
    - title: 'Адрес'
      description: 'Укажите здесь свой адрес'
    - title: 'Доставка'
      description: 'Выберите способ доставки'
    - title: 'Оформление'
      description: 'Подтвердите заказ'
  class: 'w-full'
---
::

### Отключение {#disabled}

Пропс `disabled` отключает переходы между шагами.

::component-code
---
ignore:
  - content
  - items
  - class
external:
  - items
externalTypes:
  - StepperItem[]
props:
  disabled: true
  items:
    - title: 'Адрес'
      description: 'Укажите здесь свой адрес'
    - title: 'Доставка'
      description: 'Выберите способ доставки'
    - title: 'Оформление'
      description: 'Подтвердите заказ'
---
::

::note{to="#with-controls"}
Это удобно, когда переходить между шагами нужно только с помощью кнопок управления.
::

## Примеры {#examples}

### С кнопками управления {#with-controls}

Кнопки добавляют Stepper дополнительное управление.

:component-example{name="stepper-with-controls-example"}

### Управление активным элементом {#control-active-item}

Активным элементом управляют пропс `default-value` или директива `v-model` со значением `value` элемента. Если `value` не задан, берётся индекс.

:component-example{name="stepper-model-value-example"}

::tip
Пропс `value-key` меняет ключ, по которому элементы сопоставляются с `v-model` или `default-value`.

Значение сопоставляется с `value-key` каждого элемента независимо от его типа. Число сохраняет позиционный смысл, если у элемента на этой позиции нет `value-key` (поэтому обычные массивы по-прежнему работают по индексу), и превращается в позицию, если ни один элемент не совпал. Числа вне диапазона не выбирают ничего.
::

### Со слотом content {#with-content-slot}

Слот `#content` настраивает содержимое каждого элемента.

:component-example{name="stepper-content-slot-example"}

### С собственным слотом {#with-custom-slot}

Свойство `slot` настраивает отдельный элемент.

Вам будут доступны слоты:

- `#{{ item.slot }}`{lang="ts-type"}

:component-example{name="stepper-custom-slot-example"}

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

### Доступ через ref {#expose}

Типизированный экземпляр компонента доступен через [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref).

```vue
<script setup lang="ts">
const stepper = useTemplateRef('stepper')
</script>

<template>
  <B24Stepper ref="stepper" />
</template>
```

Он даёт доступ к следующему:

| Имя | Тип |
| ---- | ---- |
| `next`{lang="ts-type"}    | `() => void`{lang="ts-type"}   |
| `prev`{lang="ts-type"}    | `() => void`{lang="ts-type"}   |
| `hasNext`{lang="ts-type"} | `Ref<boolean>`{lang="ts-type"} |
| `hasPrev`{lang="ts-type"} | `Ref<boolean>`{lang="ts-type"} |

## Тема {#theme}

:component-theme
