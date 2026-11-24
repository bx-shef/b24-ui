import type { ContentSearchLink } from '@bitrix24/b24ui-nuxt'
import PlayLIcon from '@bitrix24/b24icons-vue/outline/PlayLIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'
import ViewmodeCodeIcon from '@bitrix24/b24icons-vue/editor/ViewmodeCodeIcon'
import FormattingIcon from '@bitrix24/b24icons-vue/editor/FormattingIcon'
import FormIcon from '@bitrix24/b24icons-vue/outline/FormIcon'
// import DemonstrationOnIcon from '@bitrix24/b24icons-vue/outline/DemonstrationOnIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

export function useSearch() {
  const route = useRoute()
  const { frameworks } = useFrameworks()

  const searchTerm = ref('')

  const links = computed(() => [
    {
      label: 'Начало работы',
      description: 'Как начать работу с Bitrix24 UI.',
      icon: PlayLIcon,
      to: '/docs/getting-started/',
      active: route.path.startsWith('/docs/getting-started')
    },
    {
      label: 'Компоненты',
      description: 'Компоненты, доступные в Bitrix24 UI.',
      icon: DeveloperResourcesIcon,
      to: '/docs/components/',
      active: route.path.startsWith('/docs/components')
    },
    {
      label: 'Композаблы',
      description: 'Как использовать композаблы Bitrix24 UI.',
      icon: ViewmodeCodeIcon,
      to: '/docs/composables/define-shortcuts/',
      active: route.path.startsWith('/docs/composables')
    },
    {
      label: 'Типографика',
      description: 'Возможности типографики Bitrix24 UI и их настройка.',
      icon: FormattingIcon,
      to: '/docs/typography/',
      active: route.path.startsWith('/docs/typography')
    },
    {
      label: 'Шаблоны',
      icon: FormIcon,
      description: 'Официальные шаблоны на Bitrix24 UI.',
      to: '/templates/'
    },
    {
      label: 'GitHub',
      description: 'Репозиторий Bitrix24 UI: следите за разработкой на GitHub.',
      icon: GitHubIcon,
      to: 'https://github.com/bitrix24/b24ui',
      target: '_blank'
    }
  ] as ContentSearchLink[])

  const groups = computed(() => [
    {
      id: 'framework',
      label: 'Фреймворк',
      items: frameworks.value
    }
  ])

  return {
    links,
    groups,
    searchTerm
  }
}
