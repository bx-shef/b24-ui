---
title: DashboardSidebarCollapse
description: 'Кнопка для десктопа, которая сворачивает боковое меню и освобождает место для контента.'
category: dashboard
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardSidebarCollapse.vue
  - label: Button
    iconName: Bitrix24Icon
    to: /docs/components/button/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-sidebar-collapse
---

## Использование {#usage}

Компонент DashboardSidebarCollapse сворачивает и разворачивает [DashboardSidebar](/docs/components/dashboard-sidebar/) **при заданном пропсе `collapsible`**.

:component-code

Компонент расширяет [Button](/docs/components/button/), поэтому ему можно передать любое свойство: `color`, `size` и другие.

::component-code
---
ignore:
  - color
props:
    color: 'air-primary'
---
::

::note
По умолчанию у кнопки `color="air-tertiary"`.
::

## Примеры {#examples}

### В слоте `header` {#within-header-slot}

Компонент можно поставить в слот `header` компонента [DashboardSidebar](/docs/components/dashboard-sidebar/) и, например, скрыть левую часть шапки пропсом `collapsed`:

```vue [layouts/dashboard.vue]{4-8}
<template>
  <B24DashboardGroup>
    <B24DashboardSidebar collapsible>
      <template #header="{ collapsed }">
        <Logo v-if="!collapsed" />

        <B24DashboardSidebarCollapse />
      </template>
    </B24DashboardSidebar>

    <slot />
  </B24DashboardGroup>
</template>
```

### В слоте `leading` {#within-leading-slot}

Компонент можно поставить в слот `leading` компонента [DashboardNavbar](/docs/components/dashboard-navbar/), например чтобы показать его перед заголовком:

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
        <template #leading>
          <B24DashboardSidebarCollapse />
        </template>
      </B24DashboardNavbar>
    </template>
  </B24DashboardPanel>
</template>
```

## API

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<button>`.
::

## Тема {#theme}

:component-theme
