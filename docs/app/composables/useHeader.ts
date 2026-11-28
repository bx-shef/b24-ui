import type { NavigationMenuItem } from '@bxshefby/b24ui-nuxt'
import { createSharedComposable } from '@vueuse/core'
import PlayLIcon from '@bitrix24/b24icons-vue/outline/PlayLIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'
import ViewmodeCodeIcon from '@bitrix24/b24icons-vue/editor/ViewmodeCodeIcon'
import FormattingIcon from '@bitrix24/b24icons-vue/editor/FormattingIcon'
import FormIcon from '@bitrix24/b24icons-vue/outline/FormIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import BarcodeIcon from '@bitrix24/b24icons-vue/outline/BarcodeIcon'
import EarthIcon from '@bitrix24/b24icons-vue/outline/EarthIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'

const _useHeader = () => {
  const route = useRoute()

  const isNeedChangeTarget = ref(false)
  const tgLink = computed(() => {
    return (
      isNeedChangeTarget.value && (typeof window !== 'undefined' && window.navigator?.language.includes('ru'))
    )
      ? 'https://t.me/bitrix24apps'
      : 'https://t.me/b24_dev'
  })

  const b24DocsLink = computed(() => {
    return (
      isNeedChangeTarget.value && (typeof window !== 'undefined' && window.navigator?.language.includes('ru'))
    )
      ? 'https://apidocs.bitrix24.ru/'
      : 'https://apidocs.bitrix24.com/'
  })

  const desktopLinks = computed<NavigationMenuItem[]>(() => [
    {
      label: 'Документация',
      to: '/docs/getting-started/',
      active: route.path.startsWith('/docs/getting-started')
    },
    {
      label: 'Шаблоны',
      to: '/templates/'
    },
    {
      label: 'Ресурсы',
      type: 'trigger',
      children: [
        {
          label: 'Bitrix24 UI',
          description: 'Vue-компоненты для приложений Битрикс24',
          icon: FormIcon,
          to: '/'
        },
        {
          label: 'B24 JS SDK',
          description: 'для работы с REST API Bitrix24 в приложениях',
          icon: DeveloperResourcesIcon,
          to: 'https://b24-js-sdk.bx-shef.by/',
          target: '_blank'
        },
        {
          label: 'B24 Icons',
          description: 'Оформляйте приложения в стиле Bitrix24.',
          icon: BarcodeIcon,
          to: 'https://b24-icons.bx-shef.by/',
          target: '_blank'
        },
        {
          label: 'Сообщество',
          description: 'Bitrix24 UI в Telegram',
          icon: EarthIcon,
          to: tgLink.value,
          target: '_blank'
        },
        {
          label: 'REST API',
          description: 'REST API Bitrix24 и приложения Маркета',
          icon: Bitrix24Icon,
          to: b24DocsLink.value,
          target: '_blank'
        }
      ]
    }
  ])

  const mobileLinks = computed<NavigationMenuItem[]>(() => [
    {
      label: 'Начало работы',
      to: '/docs/getting-started/',
      icon: PlayLIcon,
      active: route.path.startsWith('/docs/getting-started')
    },
    {
      label: 'Компоненты',
      to: '/docs/components/',
      icon: DeveloperResourcesIcon,
      active: route.path.startsWith('/docs/components')
    },
    {
      label: 'Композаблы',
      to: '/docs/composables/',
      icon: ViewmodeCodeIcon,
      active: route.path.startsWith('/docs/composables')
    },
    {
      label: 'Типографика',
      to: '/docs/typography/',
      icon: FormattingIcon,
      active: route.path.startsWith('/docs/typography')
    },
    {
      label: 'Шаблоны',
      to: '/templates/',
      icon: FormIcon
    },
    {
      label: 'B24 JS SDK',
      to: 'https://b24-js-sdk.bx-shef.by/',
      icon: DeveloperResourcesIcon,
      target: '_blank'
    },
    {
      label: 'B24 Icons',
      to: 'https://b24-icons.bx-shef.by/',
      icon: BarcodeIcon,
      target: '_blank'
    },
    {
      label: 'GitHub',
      to: 'https://github.com/bx-shef/b24-ui',
      icon: GitHubIcon,
      target: '_blank',
      b24ui: {
        linkLeadingIcon: 'size-[20px] ms-[4px] me-[4px]'
      }
    }
  ])

  onMounted(() => {
    isNeedChangeTarget.value = true
  })

  return {
    desktopLinks,
    mobileLinks,
    b24DocsLink,
    tgLink
  }
}

export const useHeader = /* @__PURE__ */ createSharedComposable(_useHeader)
