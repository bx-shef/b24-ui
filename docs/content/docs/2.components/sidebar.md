---
title: Sidebar
description: 'Сворачиваемое боковое меню с несколькими вариантами оформления.'
category: layout
keywords:
  - сайдбар
  - боковое меню
  - сворачиваемое меню
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Sidebar.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/sidebar
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/sidebar
---

## Использование {#usage}

Sidebar — самостоятельное фиксированное боковое меню, которое сдвигает содержимое страницы. На десктопе оно отрисовывается в потоке и сворачивается, на мобильных открывается в компоненте [Modal](/docs/components/modal/), [Slideover](/docs/components/slideover/) или [Drawer](/docs/components/drawer/).

::tip{to="/docs/components/dashboard-sidebar/"}
**Sidebar и DashboardSidebar.** Sidebar — простое самостоятельное боковое меню, которое можно поставить куда угодно (панель чата, настройки, навигация). Если нужны изменение размера перетаскиванием, сохранение состояния и интеграция с [DashboardGroup](/docs/components/dashboard-group/), используйте [DashboardSidebar](/docs/components/dashboard-sidebar/).
::

Слоты `header`, `default` и `footer` настраивают содержимое меню. Директива `v-model:open` учитывает область просмотра: на десктопе она управляет состоянием «развёрнуто / свёрнуто», на мобильных — самим меню.

::component-example
---
collapse: true
prettier: true
name: 'sidebar-example'
overflowHidden: true
class: '!p-0 !justify-st2art h-[500px] contain-[paint] transform-gpu'
---
::

### Вариант {#variant}

Пропс `variant` меняет визуальный стиль меню. По умолчанию `sidebar`.

::component-example
---
collapse: true
prettier: true
name: 'sidebar-props-example'
overflowHidden: true
options:
  - name: 'variant'
    label: 'variant'
    items:
      - sidebar
      - floating
      - inset
    default: 'inset'
class: '!p-0 !justify-start h-[500px] contain-[paint] transform-gpu'
---
::

### Сворачивание {#collapsible}

Пропс `collapsible` меняет способ сворачивания меню. По умолчанию `offcanvas`.

- `offcanvas`: меню полностью уезжает за пределы экрана.
- `icon`: меню сужается до ширины иконки.
- `none`: меню не сворачивается.

::component-example
---
collapse: true
prettier: true
name: 'sidebar-props-example'
overflowHidden: true
options:
  - name: 'collapsible'
    label: 'collapsible'
    items:
      - offcanvas
      - icon
      - none
    default: 'icon'
  - name: 'variant'
    label: 'variant'
    items:
      - sidebar
      - floating
      - inset
    default: 'sidebar'
class: '!p-0 !justify-start h-[500px] contain-[paint] transform-gpu'
---
::

::tip{to="#slots"}
В пропсах слота доступно `state`: по нему можно менять содержимое свёрнутого меню.
::

### Сторона {#side}

Пропс `side` меняет сторону, с которой стоит меню. По умолчанию `left`.

::component-example
---
collapse: true
prettier: true
name: 'sidebar-props-example'
overflowHidden: true
options:
  - name: 'side'
    label: 'side'
    items:
      - left
      - right
    default: 'right'
class: '!p-0 !justify-start h-[500px] contain-[paint] transform-gpu'
---
::

### Заголовок {#title}

Пропс `title` задаёт заголовок шапки меню.

::component-code
---
prettier: true
hide:
  - class
  - b24ui
ignore:
  - b24ui.container
props:
  title: Навигация
  b24ui:
    container: h-full
slots:
  default: |

    <Placeholder class="h-full" />
class: '!p-0 !justify-start h-[500px] contain-[paint] transform-gpu'
---

:placeholder{class="h-full"}
::

### Описание {#description}

Пропс `description` задаёт описание в шапке меню.

::component-code
---
prettier: true
hide:
  - class
  - b24ui
ignore:
  - title
  - b24ui.container
props:
  title: Навигация
  description: Просмотр рабочего пространства
  b24ui:
    container: h-full
slots:
  default: |

    <Placeholder class="h-full" />
class: '!p-0 !justify-start h-[500px] contain-[paint] transform-gpu'
---

:placeholder{class="h-full"}
::

### Рейка {#rail}

Пропс `rail` показывает у меню тонкий интерактивный край, по клику на который меню сворачивается и разворачивается. Рейка отрисовывается, только когда `collapsible` не равен `none`.

::component-code
---
prettier: true
ignore:
  - title
  - b24ui.container
hide:
  - b24ui
  - class
props:
  rail: true
  collapsible: icon
  title: Навигация
  b24ui.container: h-full
slots:
  default: |

    <Placeholder class="h-full" />
class: '!p-0 !justify-start h-[500px] contain-[paint] transform-gpu'
---

:placeholder{class="h-full"}
::

### Закрытие {#close}

Пропс `close` показывает в шапке меню кнопку закрытия. Кнопка отрисовывается, только когда `collapsible` не равен `none`.

Чтобы настроить её, передайте любые свойства компонента [Button](/docs/components/button/).

::component-code
---
prettier: true
ignore:
  - title
  - rail
  - b24ui.container
hide:
  - b24ui
  - class
props:
  close: true
  rail: true
  collapsible: icon
  title: Навигация
  b24ui:
    container: h-full
items:
  close:
    - true
    - false
slots:
  default: |

    <Placeholder class="h-full" />
class: '!p-0 !justify-start h-[500px] contain-[paint] transform-gpu'
---

:placeholder{class="h-full"}
::

### Иконка закрытия {#close-icon}

Пропс `close-icon` меняет [иконку](https://bitrix24.github.io/b24icons/icons/) кнопки закрытия.

::component-code
---
prettier: true
ignore:
  - title
  - rail
  - side
  - close
  - b24ui.container
  - closeIcon
cast:
  closeIcon: 'RocketIcon'
hide:
  - b24ui
  - class
props:
  close: true
  closeIcon: 'RocketIcon'
  rail: true
  collapsible: icon
  side: right
  title: Навигация
  b24ui:
    container: h-full
items:
  close:
    - true
    - false
slots:
  default: |

    <Placeholder class="h-full" />
class: '!p-0 !justify-start h-[500px] contain-[paint] transform-gpu'
---

:placeholder{class="h-full"}
::

### Контрольная точка :badge{label="2.15+" class="align-text-top"} {#breakpoint}

Пропс `breakpoint` задаёт контрольную точку, ниже которой меню отрисовывается как меню-оверлей. По умолчанию `lg`.

```vue
<template>
  <B24Sidebar breakpoint="xl" />
</template>
```

::note
Значения соответствуют стандартным контрольным точкам Tailwind CSS. Свои значения `--breakpoint-*` не учитываются.
::

### Режим {#mode}

Пропс `mode` меняет режим меню на мобильных. По умолчанию `slideover`.

::component-example
---
collapse: true
iframe:
  height: 500px;
iframeMobile: true
overflowHidden: true
name: 'sidebar-mode-example'
options:
  - name: 'mode'
    label: 'mode'
    default: 'slideover'
    items:
      - modal
      - slideover
      - drawer
props:
  class: 'w-full'
---
::

::tip{to="#props"}
Пропс `menu` настраивает меню; оно подстраивается под выбранный режим.
::

## Примеры {#examples}

### Управление открытием {#control-open-state}

Состоянием открытия управляют пропс `open` или директива `v-model:open`. На десктопе она переключает «развёрнуто / свёрнуто», на мобильных — открывает и закрывает выезжающее меню.

::component-example
---
collapse: true
prettier: true
name: 'sidebar-open-example'
overflowHidden: true
class: '!p-0 !justify-start h-[500px] contain-[paint] transform-gpu'
---
::

::note
В этом примере с помощью [`defineShortcuts`](/docs/composables/define-shortcuts/) Sidebar переключается по нажатию :kbd{value="O"}.
::

### Сохранение состояния {#persist-open-state}

Чтобы сохранять состояние меню между перезагрузками страницы, используйте вместо `ref` [`useLocalStorage`](https://vueuse.org/core/useLocalStorage/) из VueUse или [`useCookie`](https://nuxt.com/docs/4.x/api/composables/use-cookie).

::component-example
---
collapse: true
prettier: true
name: 'sidebar-persist-example'
overflowHidden: true
class: '!p-0 !justify-start h-[500px] contain-[paint] transform-gpu'
---
::

::note
Единственное отличие от предыдущего примера — `ref(true)` заменён на `useLocalStorage('sidebar-open', true)`.
::

### С нестандартной шириной {#with-custom-width}

Ширину меню задаёт CSS-переменная `--sidebar-width` (по умолчанию `16rem`), а ширину свёрнутого меню с иконками — `--sidebar-width-icon` (по умолчанию `4rem`).

Переопределить их можно глобально в CSS или для отдельного экземпляра через атрибут `style`.

::component-example
---
collapse: true
prettier: true
name: 'sidebar-width-example'
overflowHidden: true
class: '!p-0 !justify-start h-[500px] contain-[paint] transform-gpu'
---
::

### С шапкой {#with-header}

Чтобы расположить меню под [Header](/docs/components/header/), настройте `gap` и `container` через пропс `b24ui`.

::component-example
---
collapse: true
prettier: true
name: 'sidebar-header-example'
overflowHidden: true
class: '!p-0 !justify-start h-[500px] contain-[paint] transform-gpu'
---
::

::note
Переменная `--b24ui-header-height` по умолчанию равна `3.625rem` и используется в Header. Измените её, если у навигационной панели другая высота.
::

### С AI-чатом {#with-ai-chat}

Разместите меню справа вместе с [ChatMessages](/docs/components/chat-messages/) и [ChatPrompt](/docs/components/chat-prompt/), чтобы получить панель AI-чата.

::component-example
---
collapse: true
prettier: true
name: 'sidebar-chat-example'
overflowHidden: true
class: '!p-0 !justify-start h-[500px] contain-[paint] transform-gpu'
---
::

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
