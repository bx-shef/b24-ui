<script setup lang="ts">
import type { AvatarProps } from '@bxshefby/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'

const { data: users, status, execute } = await useLazyFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'typicode-users',
  transform: (data: { id: number, name: string }[]) => {
    return data?.map(user => ({
      label: user.name,
      value: String(user.id),
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}`, loading: 'lazy' as const }
    }))
  },
  immediate: false
})

function onOpen() {
  if (!users.value?.length) {
    execute()
  }
}
</script>

<template>
  <B24Select
    :items="users"
    :loading="status === 'pending'"
    :icon="UserIcon"
    :trailing-icon="Expand1Icon"
    placeholder="Выберите пользователя"
    value-key="value"
    class="w-48"
    @update:open="onOpen"
  >
    <template #leading="{ item, b24ui }">
      <B24Avatar
        v-if="item"
        v-bind="item.avatar"
        :size="(b24ui.leadingAvatarSize() as AvatarProps['size'])"
        :class="b24ui.leadingAvatar()"
      />
    </template>
  </B24Select>
</template>
