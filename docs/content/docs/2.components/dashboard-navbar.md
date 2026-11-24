---
title: DashboardNavbar
description: 'Адаптивная навигационная панель для дашбордов.'
category: dashboard
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardNavbar.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-navbar
---

## Использование {#usage}

Компонент DashboardNavbar — адаптивная навигационная панель, которая работает вместе с [DashboardSidebar](/docs/components/dashboard-sidebar/). В ней есть кнопка для мобильных устройств, которая открывает навигацию в раскладках дашборда.

Используйте его в слоте `header` компонента [DashboardPanel](/docs/components/dashboard-panel/):

```vue [pages/index.vue]{9-11}
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <B24DashboardPanel>
    <template #header>
      <B24DashboardNavbar />
    </template>
  </B24DashboardPanel>
</template>
```

Слоты `left`, `default` и `right` настраивают панель.

::component-example
---
prettier: true
name: 'dashboard-navbar-example'
class: '!px-0 !pt-0'
props:
  class: 'w-full'
---
::

### Заголовок {#title}

Пропс `title` задаёт заголовок панели.

::component-code
---
hide:
  - class
props:
  title: 'Дашборд'
  class: 'w-full'
class: '!px-0 !pt-0'
---
::

::tip
По умолчанию заголовок отрисовывается как `h1`. Чтобы изменить тег, передайте в пропс `as` объект: например, `:as="{ title: 'h2' }"`{lang="ts-type"}. Так же можно задать корневой элемент: `:as="{ root: 'section', title: 'h2' }"`{lang="ts-type"}.
::

### Иконка {#icon}

Пропс `icon` задаёт иконку панели.

::component-code
---
hide:
  - class
ignore:
  - title
  - icon
cast:
  icon: 'RocketIcon'
props:
  title: 'Дашборд'
  icon: 'RocketIcon'
  class: 'w-full'
class: '!px-0 !pt-0'
---
::

### Кнопка переключения {#toggle}

Пропс `toggle` настраивает кнопку переключения, которая показывается на мобильных устройствах и открывает [DashboardSidebar](/docs/components/dashboard-sidebar/).

Кнопку можно настроить любым свойством компонента [Button](/docs/components/button/).

::component-example
---
iframe:
  height: 500px;
  class: 'max-w-[1000px]'
iframeMobile: true
overflowHidden: true
name: 'dashboard-navbar-toggle-example'
props:
  class: 'w-full'
---
::

### Сторона кнопки {#toggle-side}

Пропс `toggle-side` меняет сторону, с которой стоит кнопка переключения. По умолчанию `left`.

::component-example
---
iframe: true
iframeMobile: true
overflowHidden: true
name: 'dashboard-navbar-toggle-side-example'
props:
  class: 'w-full'
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
