# Раскладка дашборда

Интерфейсы приложений с изменяемыми по размеру боковыми меню, многопанельными раскладками и панелями инструментов.

## Когда использовать

- Приложение для Bitrix24
- Панели администратора, служебные интерфейсы
- Почтовые клиенты, инструменты управления проектами
- Любое приложение с постоянным боковым меню и панелями содержимого
- Сочетается с раскладками чата или редактора для специализированных дашбордов

## Дерево компонентов

```
B24App
└── NuxtLayout (dashboard)
    └── B24DashboardGroup
        ├── B24DashboardSidebar
        │   ├── #header (логотип, кнопка поиска)
        │   ├── #default (навигация) — получает пропс слота { collapsed }
        │   └── #footer (меню пользователя)
        └── NuxtPage
            └── B24DashboardPanel
                ├── #header → B24DashboardNavbar + B24DashboardToolbar
                ├── #body (прокручиваемое содержимое)
                └── #footer (необязательно)
```

## Раскладка

```vue [layouts/dashboard.vue]
<script setup lang="ts">
import type { NavigationMenuItem } from '@bxshefby/b24ui-nuxt'
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import MessagesIcon from '@bitrix24/b24icons-vue/outline/MessagesIcon'
import GroupIcon from '@bitrix24/b24icons-vue/outline/GroupIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'
import LogOutIcon from '@bitrix24/b24icons-vue/outline/LogOutIcon'

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Home',
  icon: HomeIcon,
  to: '/dashboard'
}, {
  label: 'Inbox',
  icon: MessagesIcon,
  to: '/dashboard/inbox'
}, {
  label: 'Users',
  icon: GroupIcon,
  to: '/dashboard/users'
}, {
  label: 'Settings',
  icon: SettingsIcon,
  to: '/dashboard/settings'
}])
</script>

<template>
  <B24DashboardGroup>
    <B24DashboardSidebar collapsible resizable>
      <template #header="{ collapsed }">
        <B24DashboardSearchButton :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <B24NavigationMenu
          :collapsed="collapsed"
          :items="items"
          orientation="vertical"
        />
      </template>

      <template #footer="{ collapsed }">
        <B24Button
          :icon="collapsed ? LogOutIcon : undefined"
          :label="collapsed ? undefined : 'Sign out'"
          :class="[!collapsed && 'py-2']"
          color="air-tertiary"
          block
        />
      </template>
    </B24DashboardSidebar>

    <slot />
  </B24DashboardGroup>
</template>
```

## Страница

```vue [pages/dashboard/index.vue]
<script setup lang="ts">
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'

definePageMeta({ layout: 'dashboard' })
</script>

<template>
  <B24DashboardPanel>
    <template #header>
      <B24DashboardNavbar title="Home">
        <template #leading>
          <B24DashboardSidebarCollapse />
        </template>
        <template #right>
          <B24Button :icon="PlusLIcon" label="New" />
        </template>
      </B24DashboardNavbar>
    </template>

    <template #body>
      <!-- Содержимое страницы -->
    </template>
  </B24DashboardPanel>
</template>
```

### Частые ошибки

- Забыли `definePageMeta({ layout: 'dashboard' })` — без него страница не использует раскладку дашборда.
- Содержимое лежит прямо в `B24DashboardPanel`, без слота `#body` — оно не будет нормально прокручиваться.
- Не обработан пропс слота `collapsed` — содержимое бокового меню должно подстраиваться под свёрнутое состояние (скрывать подписи, центрировать иконки).

## Ключевые компоненты

### DashboardGroup

Корневая обёртка. Управляет состоянием бокового меню и его сохранением.

| Пропс | По умолчанию | Назначение |
|---|---|---|
| `storage` | `'cookie'` | `'cookie'` или `'local'` |
| `storage-key` | `'dashboard'` | Имя ключа хранилища |
| `persistent` | `true` | `false` отключает сохранение размеров |
| `unit` | `'px'` | Единица размера: `'px'`, `'rem'` или `'%'` |

### DashboardSidebar

Боковое меню с изменяемым размером и сворачиванием. Должно находиться внутри `DashboardGroup`.

| Prop | Default | Purpose |
|---|---|---|
| `resizable` | `false` | Размер меняется перетаскиванием |
| `collapsible` | `false` | Сворачивается, если дотянуть до края |
| `side` | `'left'` | `'left'` или `'right'` |
| `mode` | `'slideover'` | На мобильных: `'modal'`, `'slideover'`, `'drawer'` |

Все слоты получают `{ collapsed, collapse }`: `collapsed` — булево состояние, `collapse(value)` переключает его программно. Для управления состоянием используйте `v-model:collapsed` и `v-model:open` (на мобильных).

### DashboardPanel

Панель содержимого со слотами `#header`, `#body` (прокручивается), `#footer` и `#default` (без обработки, без прокрутки).

### DashboardNavbar / DashboardToolbar

Navbar: слоты `#leading`, `#left`, `#default`, `#right` и пропс `title`. Чтобы сворачивать боковое меню на десктопе, поместите `B24DashboardSidebarCollapse` в `#leading`. Мобильный переключатель navbar уже отрисовывает сам, настраивается пропсом `toggle`.
Toolbar: те же слоты, располагается под navbar для фильтров и действий.

### B24NavigationMenu в боковом меню

Внутри сворачиваемого бокового меню всегда передавайте `:collapsed="collapsed"` в `B24NavigationMenu` — он сам скрывает подписи и центрирует иконки. Для отдельных групп (основная навигация и ссылки в подвале) используйте `NavigationMenuItem[][]` (массив массивов).

## Несколько панелей (список и подробности)

```vue [pages/dashboard/inbox.vue]
<script setup lang="ts">
  definePageMeta({ layout: 'dashboard' })
</script>

<template>
  <B24DashboardPanel id="inbox-list" resizable>
    <template #header>
      <B24DashboardNavbar title="Inbox" />
    </template>
    <template #body>
      <!-- Список писем -->
    </template>
  </B24DashboardPanel>

  <B24DashboardPanel id="inbox-detail" class="hidden lg:flex">
    <template #header>
      <B24DashboardNavbar title="Message" />
    </template>
    <template #body>
      <!-- Содержимое письма -->
    </template>
  </B24DashboardPanel>
</template>
```

## С панелью инструментов

```vue
<script setup lang="ts">
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'
</script>

<template>
  <B24DashboardPanel>
    <template #header>
      <B24DashboardNavbar title="Users" />
      <B24DashboardToolbar>
        <template #left>
          <B24Input :icon="SearchIcon" placeholder="Search..." />
        </template>
        <template #right>
          <B24Select :items="['All', 'Active', 'Inactive']" />
        </template>
      </B24DashboardToolbar>
    </template>
  </B24DashboardPanel>
</template>
```

## С поиском

```vue [layouts/dashboard.vue]
<template>
  <B24DashboardGroup>
    <B24DashboardSidebar>
      <template #header>
        <B24DashboardSearchButton />
      </template>
      <!-- ... -->
    </B24DashboardSidebar>

    <slot />

    <B24DashboardSearch :groups="searchGroups" />
  </B24DashboardGroup>
</template>
```

## Правое боковое меню

```vue
<B24DashboardGroup>
  <B24DashboardSidebar collapsible resizable>
    <!-- Левое боковое меню -->
  </B24DashboardSidebar>

  <slot />

  <B24DashboardSidebar side="right" resizable>
    <!-- Правое боковое меню -->
  </B24DashboardSidebar>
</B24DashboardGroup>
```
