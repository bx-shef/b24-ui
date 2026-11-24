---
title: DashboardResizeHandle
description: 'Ручка изменения размера для боковых меню и панелей.'
category: dashboard
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardResizeHandle.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-resize-handle
---

## Использование {#usage}

Компонент DashboardResizeHandle используют [DashboardSidebar](/docs/components/dashboard-sidebar/) и [DashboardPanel](/docs/components/dashboard-panel/).

Он показывается автоматически, если задан пропс `resizable`, **добавлять его вручную не нужно**.

## Примеры {#examples}

### В слоте `resize-handle` {#within-resize-handle-slot}

Хотя компонент показывается автоматически при пропсе `resizable`, слот `resize-handle` компонентов [DashboardSidebar](/docs/components/dashboard-sidebar/) и [DashboardPanel](/docs/components/dashboard-panel/) позволяет настроить ручку.

::code-group

```vue [layouts/dashboard.vue]{4-11}
<template>
  <B24DashboardGroup>
    <B24DashboardSidebar resizable>
      <template #resize-handle="{ onMouseDown, onTouchStart, onDoubleClick }">
        <B24DashboardResizeHandle
          class="after:absolute after:inset-y-0 after:right-0 after:w-px hover:after:bg-(--ui-color-accent-soft-element-blue) after:transition"
          @mousedown="onMouseDown"
          @touchstart="onTouchStart"
          @dblclick="onDoubleClick"
        />
      </template>
    </B24DashboardSidebar>

    <slot />
  </B24DashboardGroup>
</template>
```

```vue [pages/index.vue]{9-16}
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <B24DashboardPanel resizable>
    <template #resize-handle="{ onMouseDown, onTouchStart, onDoubleClick }">
      <B24DashboardResizeHandle
        class="after:absolute after:inset-y-0 after:right-0 after:w-px hover:after:bg-(--ui-color-accent-soft-element-blue) after:transition"
        @mousedown="onMouseDown"
        @touchstart="onTouchStart"
        @dblclick="onDoubleClick"
      />
    </template>
  </B24DashboardPanel>
</template>
```

::

::note
В этом примере псевдоэлемент `after` рисует вертикальную линию при наведении.
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
