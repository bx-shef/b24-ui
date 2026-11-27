<script setup lang="ts">
import type { TabsItem } from '@bxshefby/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Shield2ContourIcon from '@bitrix24/b24icons-vue/main/Shield2ContourIcon'

const route = useRoute()
const router = useRouter()

const items: TabsItem[] = [
  {
    label: 'Аккаунт',
    icon: UserIcon,
    value: 'account'
  },
  {
    label: 'Пароль',
    icon: Shield2ContourIcon,
    value: 'password'
  }
]

const active = computed({
  get() {
    return (route.query.tab as string) || 'account'
  },
  set(tab) {
    // Хеш указан здесь, чтобы страница не прокручивалась наверх
    router.push({
      path: '/b24ui/docs/components/tabs',
      query: { tab },
      hash: '#with-route-query'
    })
  }
})
</script>

<template>
  <B24Tabs v-model="active" :content="false" :items="items" class="w-full" />
</template>
