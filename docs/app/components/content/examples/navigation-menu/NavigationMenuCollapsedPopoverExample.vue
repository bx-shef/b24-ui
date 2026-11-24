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
    icon: CrmMapIcon,
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
    icon: Info1Icon,
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

const isCollapsed = ref(true)
const isPopover = ref(true)
</script>

<template>
  <div class="flex flex-col items-center gap-[4px]">
    <div class="flex flex-row flex-wrap items-center justify-center gap-[4px]">
      <B24Switch v-model="isCollapsed" label="collapsed" />
      <B24Switch v-model="isPopover" label="popover" />
    </div>
    <B24Separator class="my-[4px]" />
    <B24NavigationMenu
      orientation="vertical"
      :collapsed="isCollapsed"
      :popover="isPopover"
      :items="items"
      class="data-[collapsed=true]:w-[50px]"
    />
  </div>
</template>
