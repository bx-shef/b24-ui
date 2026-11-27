# Таблицы данных

Готовые приёмы вывода и управления табличными данными.

## Простая таблица

```vue
<script setup lang="ts">
import type { TableColumn } from '@bxshefby/b24ui-nuxt'

const data = ref([
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'Editor' }
])

const columns: TableColumn<typeof data.value[number]>[] = [{
  accessorKey: 'name',
  header: 'Name'
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'role',
  header: 'Role'
}]
</script>

<template>
  <B24Table :data="data" :columns="columns" />
</template>
```

## С поиском и фильтрами (дашборд)

```vue
<script setup lang="ts">
import type { TableColumn } from '@bxshefby/b24ui-nuxt'
import TrashBinIcon from '@bitrix24/b24icons-vue/main/TrashBinIcon'
import PencilDrawIcon from '@bitrix24/b24icons-vue/actions/PencilDrawIcon'
import MenuIcon from '@bitrix24/b24icons-vue/main/MenuIcon'

const search = ref('')
const roleFilter = ref('All')

const rows = ref([
  { name: 'Alice', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob', email: 'bob@example.com', role: 'Editor', status: 'Inactive' }
])

const columns: TableColumn[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions' }
]

const filteredRows = computed(() => {
  return rows.value.filter(row => {
    const matchesSearch = !search.value || row.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesRole = roleFilter.value === 'All' || row.role === roleFilter.value
    return matchesSearch && matchesRole
  })
})
</script>

<template>
  <B24DashboardPanel>
    <template #header>
      <B24DashboardNavbar title="Users" />

      <B24DashboardToolbar>
        <template #left>
          <B24Input v-model="search" placeholder="Search users..." />
        </template>
        <template #right>
          <B24Select v-model="roleFilter" :items="['All', 'Admin', 'Editor', 'Viewer']" />
        </template>
      </B24DashboardToolbar>
    </template>

    <template #body>
      <B24Table :data="filteredRows" :columns="columns">
        <template #status-cell="{ row }">
          <B24Badge :color="row.original.status === 'Active' ? 'air-primary-success' : 'air-tertiary'" :label="row.original.status" />
        </template>

        <template #actions-cell="{ row }">
          <B24DropdownMenu
            :items="[
              [{ label: 'Edit', icon: PencilDrawIcon, onSelect: () => edit(row.original) }],
              [{ label: 'Delete', icon: TrashBinIcon, color: 'air-primary-alert', onSelect: () => remove(row.original) }]
            ]"
          >
            <B24Button :icon="MenuIcon" color="air-tertiary-no-accent" size="sm" />
          </B24DropdownMenu>
        </template>
      </B24Table>
    </template>
  </B24DashboardPanel>
</template>
```

## С выбором строк

Выбор строк использует состояние `rowSelection` из TanStack Table — `Record<string, boolean>` с ID строки в качестве ключа. По умолчанию ID — индекс строки. Если данные заменяются, фильтруются до передачи в таблицу или приходят страницами с сервера, задайте `getRowId` со стабильным уникальным строковым ID.

```vue
<script setup lang="ts">
const table = useTemplateRef('table')
const rowSelection = ref<Record<string, boolean>>({})
</script>

<template>
  <B24Table ref="table" v-model:row-selection="rowSelection" :data="data" :columns="columns" :get-row-id="row => row.id" />

  <div class="px-4 py-3.5 text-sm text-muted">
    {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
    {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} строк выбрано.
  </div>
</template>
```

Пример предполагает, что у каждой записи есть уникальный строковый `id`. При серверной пагинации модели выбранных строк включают только записи текущих входных данных. Для массовых действий через несколько страниц храните выбранные ID в `rowSelection`, а не выводите полный выбор из `getSelectedRowModel()` или `getFilteredSelectedRowModel()`. Решите, должна ли смена страницы или фильтра сбрасывать выбор.

Колонку с чекбоксами добавьте через функцию `h`. Для заголовка «выбрать всё» используйте трёхзначный `modelValue` (`true`, `false` или `'indeterminate'`):

```ts
import { h } from 'vue'

const B24Checkbox = resolveComponent('B24Checkbox')

const columns: TableColumn[] = [{
  id: 'select',
  header: ({ table }) => h(B24Checkbox, {
    'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
    'aria-label': 'Select all'
  }),
  cell: ({ row }) => h(B24Checkbox, {
    'modelValue': row.getIsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
    'aria-label': 'Select row'
  })
},
// ... остальные колонки
]
```

## С пагинацией

Задайте `v-model:pagination` у `B24Table` вместе с `getPaginationRowModel` из TanStack, затем свяжите `B24Pagination` с API таблицы. `total` у `B24Pagination` — общее число **элементов** (не страниц): число страниц он считает как `total / items-per-page`.

```vue
<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'

const table = useTemplateRef('table')

const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})
</script>

<template>
  <B24Table
    ref="table"
    v-model:pagination="pagination"
    :data="data"
    :columns="columns"
    :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
  />

  <div class="flex justify-end p-4">
    <B24Pagination
      :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
      :items-per-page="table?.tableApi?.getState().pagination.pageSize"
      :total="table?.tableApi?.getFilteredRowModel().rows.length"
      @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
    />
  </div>
</template>
```

## С асинхронными данными (Nuxt)

Для состояния загрузки используйте `status === 'pending' || status === 'idle'`: `idle` покрывает первую отрисовку до старта `useLazyFetch`.

```vue
<script setup lang="ts">
const { data, status } = useLazyFetch('/api/users', { server: false })
</script>

<template>
  <B24Table :data="data" :columns="columns" :loading="status === 'pending' || status === 'idle'" />
</template>
```

Для серверной пагинации:

```vue
<script setup lang="ts">
const page = ref(1)

const { data, status } = await useAsyncData(
  'users',
  () => $fetch('/api/users', { query: { page: page.value } }),
  { watch: [page] }
)
</script>

<template>
  <B24Table :data="data?.items" :columns="columns" :loading="status === 'pending'" />

  <div class="flex justify-end p-4">
    <B24Pagination v-model:page="page" :total="data?.total" :items-per-page="data?.pageSize" />
  </div>
</template>
```

## Обновление больших наборов данных

B24Table по умолчанию следит за `data` глубоко. Если строки обновляются заменой массива, отключите глубокое слежение — `:watch-options="{ deep: false }"` — и заменяйте массив и каждую изменённую строку, чтобы таблица обновила модели строк.

```vue
<script setup lang="ts">
const rows = shallowRef([{ id: '1', name: 'Alice' }])

function renameRow(id: string, name: string) {
  rows.value = rows.value.map(row => row.id === id ? { ...row, name } : row)
}
</script>

<template>
  <B24Table :data="rows" :watch-options="{ deep: false }" />
</template>
```

С отключённым глубоким слежением не рассчитывайте, что `push()`, `splice()` или правки вложенных полей сами обновят модели строк. Если изменение на месте — часть модели обновления, оставьте слежение по умолчанию.

Отдельная опция `virtualize` ограничивает число отрисованных строк для больших наборов, но глубокое слежение не отключает. Поддержку виртуализации и её ограничения для закреплённых и зафиксированных колонок сверяйте с установленной версией b24ui.

## Советы

- Таблица построена на [TanStack Table v8](https://tanstack.com/table/v8): колонки описываются в формате `ColumnDef` с `accessorKey`, `header`, `cell`.
- Слоты `#<column>-cell` и `#<column>-header` позволяют настраивать отрисовку Vue-шаблонами.
- Либо используйте функцию `h` в свойствах колонки `header` и `cell` для отрисовки на месте.
- Данные строки в слотах берутся через `row.original` (не из `row` напрямую).
- `v-model:row-selection` — для выбора, `v-model:sorting` — для состояния сортировки.
- В дашборде оборачивайте таблицы в `B24DashboardPanel` с панелью инструментов в `#header`.
- Для пустого состояния используйте слот `#empty`.
