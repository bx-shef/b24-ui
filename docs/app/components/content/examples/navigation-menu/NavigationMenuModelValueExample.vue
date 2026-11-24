<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/main/MicrophoneOnIcon'
import CrmMapIcon from '@bitrix24/b24icons-vue/crm/CrmMapIcon'
import Settings5Icon from '@bitrix24/b24icons-vue/editor/Settings5Icon'

const items: NavigationMenuItem[] = [
  {
    label: 'Воронка продаж',
    icon: ConnectionIcon,
    children: [
      {
        label: 'Привлечение лидов',
        description: 'Первичный контакт с потенциальными клиентами'
      },
      {
        label: 'Квалификация лидов',
        description: 'Оценка потенциала клиента'
      },
      {
        label: 'Переговоры',
        description: 'Обсуждение условий сделки',
        icon: MicrophoneOnIcon
      }
    ]
  },
  {
    label: 'Аналитика продаж',
    badge: '+3',
    children: [
      {
        label: 'Отчёты по продажам',
        icon: CrmMapIcon,
        active: true,
        badge: 1
      },
      {
        label: 'Ключевые показатели',
        icon: Settings5Icon,
        badge: {
          label: 2,
          color: 'air-primary-copilot' as const
        }
      },
      {
        label: 'Интеграция с CRM'
      }
    ]
  },
  {
    label: 'Ресурсы',
    children: [
      {
        label: 'Поддержка',
        icon: Info1Icon,
        disabled: true,
        to: 'https://helpdesk.bitrix24.com/',
        target: '_blank'
      },
      {
        label: 'Интеграция с REST API'
      }
    ]
  }
]

const active = ref()

defineShortcuts({
  1: () => {
    active.value = 'item-0'
  },
  2: () => {
    active.value = 'item-1'
  },
  3: () => {
    active.value = 'item-2'
  }
})
</script>

<template>
  <B24NavigationMenu v-model="active" :items="items" class="w-full justify-center" />
</template>
