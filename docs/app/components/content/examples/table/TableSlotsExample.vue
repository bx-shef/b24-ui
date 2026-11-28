<script setup lang="ts">
import type { TableColumn, DropdownMenuItem } from '@bxshefby/b24ui-nuxt'
import { useClipboard } from '@vueuse/core'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
import MenuIcon from '@bitrix24/b24icons-vue/main/MenuIcon'

interface User {
  id: number
  name: string
  position: string
  email: string
  role: string
}

const toast = useToast()
const { copy } = useClipboard()

const data = ref<User[]>([
  {
    id: 1,
    name: 'Lindsay Walton',
    position: 'Frontend-разработчик',
    email: 'lindsay.walton@example.com',
    role: 'Участник'
  },
  {
    id: 2,
    name: 'Courtney Henry',
    position: 'Дизайнер',
    email: 'courtney.henry@example.com',
    role: 'Администратор'
  },
  {
    id: 3,
    name: 'Tom Cook',
    position: 'Директор по продукту',
    email: 'tom.cook@example.com',
    role: 'Участник'
  },
  {
    id: 4,
    name: 'Whitney Francis',
    position: 'Копирайтер',
    email: 'whitney.francis@example.com',
    role: 'Администратор'
  },
  {
    id: 5,
    name: 'Leonard Krasner',
    position: 'Старший дизайнер',
    email: 'leonard.krasner@example.com',
    role: 'Владелец'
  },
  {
    id: 6,
    name: 'Floyd Miles',
    position: 'Ведущий дизайнер',
    email: 'floyd.miles@example.com',
    role: 'Участник'
  }
])

const columns: TableColumn<User>[] = [
  {
    id: 'action',
    meta: {
      style: {
        td: {
          width: '20px',
          padding: '16px 4px'
        }
      }
    }
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Имя'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'role',
    header: 'Роль'
  }
]

function getDropdownActions(user: User): DropdownMenuItem[][] {
  return [
    [{
      label: 'Копировать ID пользователя',
      onSelect: () => {
        copy(user.id.toString())

        toast.add({
          title: 'ID платежа скопирован в буфер обмена!',
          color: 'air-primary-success',
          icon: CircleCheckIcon
        })
      }
    }],
    [{
      label: 'Изменить'
    }, {
      label: 'Удалить',
      color: 'air-primary-alert'
    }]
  ]
}
</script>

<template>
  <B24Table :data="data" :columns="columns" class="flex-1">
    <template #name-cell="{ row }">
      <div class="flex items-center gap-3">
        <B24Avatar :src="`https://i.pravatar.cc/120?img=${row.original.id}`" size="lg" loading="lazy" :alt="`Аватар ${row.original.name}`" />
        <div>
          <p class="font-(--ui-font-weight-medium)">
            {{ row.original.name }}
          </p>
          <p>
            {{ row.original.position }}
          </p>
        </div>
      </div>
    </template>
    <template #action-cell="{ row }">
      <B24DropdownMenu :items="getDropdownActions(row.original)" arrow :content="{ align: 'center', side: 'right', sideOffset: -2 }">
        <B24Button color="air-tertiary-no-accent" size="sm" :icon="MenuIcon" aria-label="Действия" />
      </B24DropdownMenu>
    </template>
  </B24Table>
</template>
