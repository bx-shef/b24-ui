---
title: DashboardGroup
description: 'Контейнер дашборда с фиксированной раскладкой, управлением состоянием бокового меню и сохранением состояния интерфейса.'
category: dashboard
keywords:
  - группа дашборда
  - раскладка дашборда
  - управление боковым меню
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardGroup.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-group
---

## Использование {#usage}

Компонент DashboardGroup — основная раскладка, которая оборачивает компоненты [DashboardSidebar](/docs/components/dashboard-sidebar/) и [DashboardPanel](/docs/components/dashboard-panel/) и собирает адаптивный интерфейс дашборда.

Используйте его в раскладке или в `app.vue`:

```vue [layouts/dashboard.vue]{2,6}
<template>
  <B24DashboardGroup>
    <B24DashboardSidebar />

    <slot />
  </B24DashboardGroup>
</template>
```

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
