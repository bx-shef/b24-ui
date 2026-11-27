---
title: useScrollShadow
description: 'Композабл для добавления теней прокрутки любому прокручиваемому элементу.'
---

## Использование {#usage}

Автоимпортируемый композабл `useScrollShadow` добавляет затухающие тени по краям прокручиваемого элемента — они показывают, что в этом направлении есть ещё содержимое.

::component-example
---
name: 'use-scroll-shadow-example'
---
::

- Содержимое по краям затухает с помощью CSS `mask-image`, а не накладываемых элементов, поэтому эффект работает на любом фоне.
- Композабл сам определяет, переполнен ли элемент, и добавляет тени только при необходимости.
- Поддерживаются вертикальная и горизонтальная ориентации.

## API

`useScrollShadow(element, options?)`{lang="ts-type"}

### Параметры {#parameters}

::field-group

::field{name="element" type="MaybeRef<HTMLElement | null | undefined>" required}
Ссылка (template ref) или реактивная ссылка на прокручиваемый элемент.
::

::field{name="options" type="UseScrollShadowOptions"}
Настройки тени прокрутки.

    ::collapsible

      ::field-group
        ::field{name="size" type="MaybeRefOrGetter<number>" default="24"}
        Размер тени в пикселях.
        ::

        ::field{name="orientation" type="MaybeRefOrGetter<'vertical' | 'horizontal'>" default="'vertical'"}
        Направление прокрутки, для которого добавляются тени.
        ::
      ::
    ::
::
::

### Возвращаемое значение {#return}

::field-group

::field{name="style" type="ComputedRef<CSSProperties | undefined>"}
Реактивный объект стилей, который привязывается к прокручиваемому элементу через `:style`. Содержит `maskImage`, когда тени активны, и `undefined` в остальных случаях.
::

::field{name="isOverflowing" type="ComputedRef<boolean>"}
Выходит ли содержимое элемента за пределы видимой области.
::

::field{name="arrivedState" type="{ top: boolean, bottom: boolean, left: boolean, right: boolean }"}
Реактивное состояние достижения краёв прокрутки из [`useScroll`](https://vueuse.org/core/useScroll/).
::
::

## Примеры {#examples}

### Горизонтальная прокрутка {#horizontal}

Для контейнеров с горизонтальной прокруткой используйте опцию `orientation`:

```vue
<script setup lang="ts">
const el = useTemplateRef('el')

const { style } = useScrollShadow(el, { orientation: 'horizontal' })
</script>

<template>
  <div ref="el" class="overflow-x-auto whitespace-nowrap" :style="style">
    <!-- Содержимое с горизонтальной прокруткой -->
  </div>
</template>
```

### Свой размер {#custom-size}

Опция `size` меняет размер тени в пикселях:

```vue
<script setup lang="ts">
const el = useTemplateRef('el')

const { style } = useScrollShadow(el, { size: 48 })
</script>

<template>
  <div ref="el" class="max-h-[300px] overflow-y-auto" :style="style">
    <!-- Прокручиваемое содержимое -->
  </div>
</template>
```
