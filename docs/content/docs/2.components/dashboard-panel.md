---
title: DashboardPanel
description: 'Панель дашборда с изменяемым размером.'
category: dashboard
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardPanel.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-panel
---

## Использование {#usage}

Компонент DashboardPanel показывает панель. Её состояние (размер, свёрнутость и другое) сохраняется по пропсам `storage` и `storage-key` компонента [DashboardGroup](/docs/components/dashboard-group/#props).

Используйте его в слоте по умолчанию компонента [DashboardGroup](/docs/components/dashboard-group/): рядом можно поставить несколько панелей:

```vue [pages/index.vue]{8,10}
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <B24DashboardPanel id="inbox-1" resizable />

  <B24DashboardPanel id="inbox-2" class="hidden lg:flex" />
</template>
```

::caution
Если панели стоят на разных страницах, задайте каждой `id`, чтобы они не конфликтовали.
::

::warning
С пропсом `resizable` у компонента нет единого корневого элемента, поэтому при переходах между страницами или если нужен единый корень для раскладки, оберните его в контейнер (например, `<div class="flex flex-1">`).
::

Слоты `header`, `body` и `footer` настраивают панель. Если не нужно тело с прокруткой и отступами, используйте слот по умолчанию.

::component-example
---
collapse: true
name: 'dashboard-panel-example'
class: '!p-0 !justify-start'
props:
  minSize: 200
  defaultSize: 240
  maxSize: 250
  class: '!min-h-96 h-136'
---
::

::note
Чаще всего в слоте `header` используют компонент [`DashboardNavbar`](/docs/components/dashboard-navbar/).
::

### Изменяемый размер {#resizable}

Пропс `resizable` делает размер панели изменяемым.

::note
Перетаскивание, запоминание размера и сворачивание обеспечивает композабл `useResizable`. Он экспортируется, если вам нужна собственная область с изменяемым размером:

```ts
const { el, size, isDragging, isCollapsed, onMouseDown, onTouchStart, onDoubleClick, collapse } = useResizable('my-panel', {
  side: 'left',
  unit: '%',
  defaultSize: 25,
  minSize: 10,
  maxSize: 50,
  collapsible: true,
  storage: 'local'
})
```

Привяжите `el` к элементу, размер которого меняется, а обработчики — к своей ручке. Первый аргумент — ключ хранилища, поэтому у каждой области он должен быть свой: две области с одним ключом делят одну ширину.
::

::warning
Четыре значения по умолчанию стоит задать явно, потому что они не такие, как подсказывают названия пропсов. `unit` равен `'px'`{lang="ts-type"}, поэтому `minSize` и `maxSize` без единиц — это пиксели, а не проценты. `defaultSize` равен `0`{lang="ts-type"}. `collapsible` в композабле равен `false`{lang="ts-type"}, поэтому `collapse()`{lang="ts"} и `isCollapsed` ничего не делают, пока вы его не включите. А `storage` равен `'cookie'`{lang="ts-type"} и опирается на `useCookie`: вне Nuxt это заглушка, и ничего не сохраняется, поэтому в обычном Vue-приложении используйте `'local'`{lang="ts-type"}.
::

::component-code
---
prettier: true
hide:
  - class
props:
  resizable: true
  minSize: 200
  defaultSize: 240
  maxSize: 250
  class: '!min-h-96'
slots:
  body: |

    <Placeholder class="ms-2 mt-4 h-96" />
class: '!p-0 !justify-start'
---

#body
:placeholder{class="ms-2 mt-4 h-96"}
::

### Размер {#size}

Пропсы `min-size`, `max-size` и `default-size` задают размеры панели.

::component-code
---
prettier: true
ignore:
  - resizable
hide:
  - class
props:
  resizable: true
  minSize: 200
  defaultSize: 240
  maxSize: 250
  class: '!min-h-96'
slots:
  body: |

    <Placeholder class="ms-2 mt-4 h-96" />
class: '!p-0 !justify-start'
---

#body
:placeholder{class="ms-2 mt-4 h-96"}
::

::tip{to="/docs/components/dashboard-group/#props"}
По умолчанию размеры считаются в процентах. Единицу меняет пропс `unit` компонента `DashboardGroup`.
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
