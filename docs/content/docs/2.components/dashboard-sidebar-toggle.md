---
title: DashboardSidebarToggle
description: 'Кнопка мобильного меню, которая показывает или скрывает навигацию бокового меню.'
category: dashboard
keywords:
  - мобильное меню
  - кнопка гамбургер
  - показать боковое меню
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardSidebarToggle.vue
  - label: Button
    iconName: Bitrix24Icon
    to: /docs/components/button/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-sidebar-toggle
---

## Использование {#usage}

Компонент DashboardSidebarToggle используют [DashboardNavbar](/docs/components/dashboard-navbar/) и [DashboardSidebar](/docs/components/dashboard-sidebar/).

На мобильных устройствах он показывается автоматически и переключает боковое меню, **добавлять его вручную не нужно**.

::component-code
---
hide:
  - class
props:
  class: 'lg:flex'
---
::

Компонент расширяет [Button](/docs/components/button/), поэтому ему можно передать любое свойство: `color`, `size` и другие.

::component-code
---
hide:
  - class
ignore:
  - color
props:
  color: 'air-primary'
  class: 'lg:flex'
---
::

::note
По умолчанию у кнопки `color="air-tertiary"`.
::

## Примеры {#examples}

### В слоте `toggle` {#within-toggle-slot}

Хотя на мобильных устройствах компонент показывается автоматически, слот `toggle` компонентов [DashboardNavbar](/docs/components/dashboard-navbar/) и [DashboardSidebar](/docs/components/dashboard-sidebar/) позволяет настроить кнопку.

::code-group

```vue [layouts/dashboard.vue]{4-6}
<template>
  <B24DashboardGroup>
    <B24DashboardSidebar>
      <template #toggle>
        <B24DashboardSidebarToggle />
      </template>
    </B24DashboardSidebar>

    <slot />
  </B24DashboardGroup>
</template>
```

```vue [pages/index.vue]{11-13}
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <B24DashboardPanel>
    <template #header>
      <B24DashboardNavbar title="Home">
        <template #toggle>
          <B24DashboardSidebarToggle />
        </template>
      </B24DashboardNavbar>
    </template>
  </B24DashboardPanel>
</template>
```

::

::tip
Пропс `toggle-side` компонентов `DashboardSidebar` и `DashboardNavbar` задаёт сторону, на которой стоит кнопка.
::

## API

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<button>`.
::

## Тема {#theme}

:component-theme
