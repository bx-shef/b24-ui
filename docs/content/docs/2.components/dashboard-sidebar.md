---
title: DashboardSidebar
description: 'Боковое меню дашборда с изменяемым размером и возможностью сворачивания.'
category: dashboard
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardSidebar.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-sidebar
---

## Использование {#usage}

Компонент DashboardSidebar показывает боковое меню. Его состояние (размер, свёрнутость и другое) сохраняется по пропсам `storage` и `storage-key` компонента [DashboardGroup](/docs/components/dashboard-group/#props).

Используйте его в слоте по умолчанию компонента [DashboardGroup](/docs/components/dashboard-group/):

```vue [layouts/dashboard.vue]{3}
<template>
  <B24DashboardGroup>
    <B24DashboardSidebar />

    <slot />
  </B24DashboardGroup>
</template>
```

::warning
С пропсом `resizable` у компонента нет единого корневого элемента, поэтому при переходах между страницами или если нужен единый корень для раскладки, оберните его в контейнер (например, `<div class="flex flex-1">`).
::

Слоты `header`, `default` и `footer` настраивают боковое меню, а слоты `body` и `content` — его мобильное меню.

::component-example
---
collapse: true
name: 'dashboard-sidebar-example'
class: '!p-0 !justify-start'
props:
  class: '!min-h-98 h-140'
---
::

::note
Чтобы свернуть меню, перетащите его к левому краю экрана.
::

### Изменяемый размер {#resizable}

Пропс `resizable` делает размер бокового меню изменяемым.

::component-code
---
prettier: true
hide:
  - class
props:
  resizable: true
  class: '!min-h-96'
slots:
  default: |

    <Placeholder class="ms-2 h-96" />
class: '!p-0 !justify-start'
---

:placeholder{class="ms-2 h-96"}
::

### Сворачивание {#collapsible}

Пропс `collapsible` позволяет сворачивать боковое меню, когда его перетаскивают к краю экрана.

::warning
Если боковое меню не **collapsible**, компонент [`DashboardSidebarCollapse`](/docs/components/dashboard-sidebar-collapse/) ничего не сделает.
::

::component-code
---
prettier: true
ignore:
  - resizable
hide:
  - class
props:
  resizable: true
  collapsible: true
  class: '!min-h-96'
slots:
  default: |

    <Placeholder class="ms-2 h-96" />
class: '!p-0 !justify-start'
---

:placeholder{class="ms-2 h-96"}
::

::tip{to="#slots"}
Состояние `collapsed` доступно в слот-пропсах, поэтому содержимое свёрнутого меню можно настроить.
::

### Размер {#size}

Пропсы `min-size`, `max-size`, `default-size` и `collapsed-size` (в `px`) задают размер бокового меню.

::component-code
---
prettier: true
ignore:
  - resizable
  - collapsible
hide:
  - class
props:
  resizable: true
  collapsible: true
  minSize: 200
  defaultSize: 240
  maxSize: 250
  collapsedSize: 66
  class: '!min-h-96'
slots:
  default: |

    <Placeholder class="ms-2 h-96" />
class: '!p-0 !justify-start'
---

:placeholder{class="ms-2 h-96"}
::

::tip{to="/docs/components/dashboard-group/#props"}
По умолчанию размеры считаются в процентах. Единицу меняет пропс `unit` компонента `DashboardGroup`.
::

::note
По умолчанию `collapsed-size` равен `0`, но у бокового меню есть `min-w-16`, чтобы оно оставалось видимым.
::

### Сторона {#side}

Пропс `side` меняет сторону бокового меню. По умолчанию `left`.

::component-code
---
prettier: true
ignore:
  - resizable
  - collapsible
  - side
hide:
  - class
props:
  side: 'right'
  resizable: true
  collapsible: true
  class: '!min-h-96'
slots:
  default: |

    <Placeholder class="ms-2 h-96" />
class: '!p-0 !justify-end'
---

:placeholder{class="ms-2 h-96"}
::

### Режим {#mode}

Пропс `mode` меняет режим мобильного меню. По умолчанию `slideover`.

Слот `body` заполняет тело меню (под шапкой), слот `content` — всё меню целиком.

::tip{to="#props"}
Пропс `menu` настраивает мобильное меню бокового меню и подстраивается под выбранный режим.
::

::component-example
---
collapse: true
iframe:
  height: 500px;
  class: 'max-w-[1000px]'
iframeMobile: true
overflowHidden: true
name: 'dashboard-sidebar-mode-example'
options:
  - name: 'mode'
    label: 'mode'
    default: 'drawer'
    items:
      - modal
      - slideover
      - drawer
props:
  class: 'w-full'
---
::

::note
В этих примерах есть компоненты [`DashboardGroup`](/docs/components/dashboard-group/), [`DashboardPanel`](/docs/components/dashboard-panel/) и [`DashboardNavbar`](/docs/components/dashboard-navbar/): они нужны, чтобы показать боковое меню на мобильных устройствах.
::

### Кнопка переключения {#toggle}

Пропс `toggle` настраивает компонент [DashboardSidebarToggle](/docs/components/dashboard-sidebar-toggle/), который показывается на мобильных устройствах.

Кнопку можно настроить любым свойством компонента [Button](/docs/components/button/).

::component-example
---
collapse: true
iframe:
  height: 500px;
  class: 'max-w-[1000px]'
iframeMobile: true
overflowHidden: true
name: 'dashboard-sidebar-toggle-example'
props:
  class: 'w-full'
---
::

### Сторона кнопки {#toggle-side}

Пропс `toggle-side` меняет сторону, с которой стоит кнопка переключения. По умолчанию `left`.

::component-example
---
collapse: true
iframe:
  height: 500px;
  class: 'max-w-[1000px]'
iframeMobile: true
overflowHidden: true
name: 'dashboard-sidebar-toggle-side-example'
props:
  class: 'w-full'
---
::

## Примеры {#examples}

### Управление состоянием открытия {#control-open-state}

Состоянием открытия управляют пропс `open` или директива `v-model:open`.

::note
В этом примере с помощью [`defineShortcuts`](/docs/composables/define-shortcuts/) DashboardSidebar открывается и закрывается клавишей :kbd{value="O"}.
::

::component-example
---
collapse: true
iframe:
  height: 500px;
  class: 'max-w-[1000px]'
iframeMobile: true
overflowHidden: true
name: 'dashboard-sidebar-open-example'
class: '!p-0 !justify-start'
---
::

### Управление состоянием сворачивания {#control-collapsed-state}

Состоянием сворачивания управляют пропс `collapsed` или директива `v-model:collapsed`.

::note
В этом примере с помощью [`defineShortcuts`](/docs/composables/define-shortcuts/) DashboardSidebar сворачивается и разворачивается клавишей :kbd{value="C"}.
::

::component-example
---
name: 'dashboard-sidebar-collapsed-example'
class: '!p-0 !justify-start'
collapse: true
props:
  class: '!min-h-96 h-136'
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
