# Навигация

Приёмы для шапок, боковых меню, хлебных крошек и вкладок.

## Шапка с мобильным меню

Слот по умолчанию `B24Header` — навигация для десктопа, `#body` — мобильное меню. Без `#body` у мобильных пользователей нет навигации.

```vue
<B24Header>
  <template #title>
    <Logo class="h-6 w-auto" />
  </template>

  <B24NavigationMenu :items="items" />

  <template #right>
    <B24ColorModeButton />
    <B24Button label="Sign in" />
  </template>

  <template #body>
    <B24NavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
  </template>
</B24Header>
```

## Навигация в боковом меню (дашборд)

Полный пример бокового меню с `B24DashboardSidebar` и `B24NavigationMenu` — в [раскладке дашборда](../layouts/dashboard.md). Главное:
- внутри сворачиваемых боковых меню передавайте `:collapsed="collapsed"` в `B24NavigationMenu`;
- для отдельных групп навигации используйте `NavigationMenuItem[][]` (вложенные массивы);
- меню пользователя с `B24DropdownMenu` помещайте в слот `#footer`.

## Вкладки (внутри страницы)

```vue
<script setup lang="ts">
const items = [{
  label: 'Overview',
  slot: 'overview' as const
}, {
  label: 'Activity',
  slot: 'activity' as const
}, {
  label: 'Members',
  slot: 'members' as const
}]
</script>

<template>
  <B24Tabs :items="items">
    <template #overview>
      <!-- Содержимое «Обзора» -->
    </template>
    <template #activity>
      <!-- Лента активности -->
    </template>
    <template #members>
      <!-- Список участников -->
    </template>
  </B24Tabs>
</template>
```

