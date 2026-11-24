---
title: DashboardToolbar
description: 'Дополнительная панель действий под основной навигацией дашборда.'
category: dashboard
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardToolbar.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-toolbar
---

## Использование {#usage}

Компонент DashboardToolbar показывает панель инструментов под компонентом [DashboardNavbar](/docs/components/dashboard-navbar/).

Используйте его в слоте `header` компонента [DashboardPanel](/docs/components/dashboard-panel/):

```vue [pages/index.vue]{9-13}
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <B24DashboardPanel>
    <template #header>
      <B24DashboardNavbar />

      <B24DashboardToolbar />
    </template>
  </B24DashboardPanel>
</template>
```

Слоты `left`, `default` и `right` настраивают панель инструментов.

::component-example
---
prettier: true
name: 'dashboard-toolbar-example'
class: '!px-0 !pt-0'
props:
  class: 'w-full'
---
::

::note
В этом примере для вывода ссылок используется компонент [NavigationMenu](/docs/components/navigation-menu/).
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
