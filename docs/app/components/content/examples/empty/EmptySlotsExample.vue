<script setup lang="ts">
import type { UserProps } from '@bitrix24/b24ui-nuxt'
import AddProductIcon from '@bitrix24/b24icons-vue/outline/AddProductIcon'

const members: UserProps[] = [
  {
    name: 'Имя сотрудника',
    description: 'Сотрудник команды',
    to: 'https://github.com/bitrix24',
    target: '_blank',
    avatar: {
      src: '/b24ui/avatar/employee.png',
      alt: 'Имя сотрудника',
      loading: 'lazy' as const
    }
  },
  {
    name: 'Имя сотрудника',
    description: 'Ассистент команды',
    to: 'https://github.com/bitrix24',
    target: '_blank',
    avatar: {
      src: '/b24ui/avatar/assistant.png',
      alt: 'Имя ассистента',
      loading: 'lazy' as const
    }
  }
]
</script>

<template>
  <B24Empty
    title="Нет участников команды"
    description="Пригласите команду для совместной работы над проектом."
    :actions="[{
      label: 'Пригласить участников',
      icon: AddProductIcon
    }]"
  >
    <template #leading>
      <B24AvatarGroup size="xl">
        <B24Avatar src="/b24ui/avatar/employee.png" alt="Имя сотрудника" loading="lazy" />
        <B24Avatar src="https://github.com/bitrix24.png" alt="bitrix24" loading="lazy" />
      </B24AvatarGroup>
    </template>

    <template #footer>
      <B24Separator class="my-4" />

      <div class="grid grid-cols-2 gap-4">
        <B24Card
          v-for="(member, index) in members"
          :key="index"
          :b24ui="{ body: 'p-4 sm:p-4' }"
        >
          <B24User
            :avatar="member.avatar"
            :name="member.name"
            :description="member.description"
            :b24ui="{ name: 'truncate' }"
          />
          <div class="mt-2 w-full flex flex-row justify-end">
            <B24Link
              class="text-xs"
              is-action
              :to="member.to"
              :target="member.target"
            >
              Пригласить
            </B24Link>
          </div>
        </B24Card>
      </div>
    </template>
  </B24Empty>
</template>
