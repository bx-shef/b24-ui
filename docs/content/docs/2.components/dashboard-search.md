---
title: DashboardSearch
description: 'Готовая командная палитра CommandPalette для вашего дашборда.'
category: dashboard
keywords:
  - поиск по дашборду
  - командная палитра дашборда
  - глобальный поиск
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardSearch.vue
  - label: CommandPalette
    iconName: Bitrix24Icon
    to: /docs/components/command-palette/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-search
---

## Использование {#usage}

Компонент DashboardSearch расширяет [CommandPalette](/docs/components/command-palette/), поэтому ему можно передать любое свойство: `icon`, `placeholder` и другие.

Используйте его в слоте по умолчанию компонента [DashboardGroup](/docs/components/dashboard-group/):

```vue [layouts/dashboard.vue]{4}
<template>
  <B24DashboardGroup>
    <B24DashboardSidebar>
      <B24DashboardSearchButton />
    </B24DashboardSidebar>

    <B24DashboardSearch />

    <slot />
  </B24DashboardGroup>
</template>
```

::tip
Открыть палитру можно сочетанием :kbd{value="meta"} :kbd{value="K" class="ms-px"}, компонентом [DashboardSearchButton](/docs/components/dashboard-search-button/) или директивой `v-model:open`{lang="ts"}.
::

### Сочетание клавиш {#shortcut}

Пропс `shortcut` меняет сочетание клавиш, которое [defineShortcuts](/docs/composables/define-shortcuts/) использует для открытия DashboardSearch. По умолчанию `meta_k` (:kbd{value="meta"} :kbd{value="K"}).

```vue [app.vue]{4}
<template>
  <B24DashboardSearch
    v-model:search-term="searchTerm"
    shortcut="meta_k"
    :groups="groups"
    :fuse="{ resultLimit: 42 }"
  />
</template>
```

### Цветовая схема {#color-mode}

По умолчанию в палитру добавляется группа команд для переключения между светлой и тёмной темой. Это работает, только если `colorMode` не зафиксирован на конкретной странице через `definePageMeta`:

```vue [pages/index.vue]
<script setup lang="ts">
definePageMeta({
  colorMode: 'dark'
})
</script>
```

Отключить эту группу можно пропсом `color-mode` со значением `false`:

```vue [app.vue]{4}
<template>
  <B24DashboardSearch
    v-model:search-term="searchTerm"
    :color-mode="false"
    :groups="groups"
    :fuse="{ resultLimit: 42 }"
  />
</template>
```

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

### Доступ через ref {#expose}

Через ref шаблона доступно:

| Name | Type |
| ---- | ---- |
| `commandPaletteRef`{lang="ts-type"} | `Ref<InstanceType<typeof B24CommandPalette> \| null>`{lang="ts-type"} |

## Тема {#theme}

:component-theme
