import { queryCollection } from '@nuxt/content/server'

// const DOMAIN = 'https://bitrix24.github.io/b24ui'

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = `${config.public.canonicalUrl}${config.public.baseUrl}`
  const DOMAIN = baseUrl

  const page = await queryCollection(event, 'index').first() as any

  const title = page?.title || 'Bitrix24 UI'
  const description = page?.description || 'Полная библиотека UI-компонентов для Vue (Nuxt по желанию): 130+ доступных компонентов на Tailwind CSS для создания современных веб-приложений.'

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `canonical_url: ${JSON.stringify(DOMAIN)}`,
    '---',
    '\n'
  ].join('\n')

  // - MCP Server Card: <${DOMAIN}/.well-known/mcp/server-card.json>
  // - MCP endpoint: <${DOMAIN}/mcp>
  // @todo fix tg en (https://t.me/b24_dev) | ru (https://t.me/bitrix24apps)

  const body = `# ${title}

${description}

## О библиотеке

Bitrix24 UI — бесплатная библиотека UI-компонентов для Vue с открытым исходным кодом на основе [Reka UI](https://reka-ui.com/) и [Tailwind CSS](https://tailwindcss.com/). Работает и с Nuxt, и с обычными Vue-приложениями.

- 130+ доступных компонентов, готовых к использованию в продакшене
- Основа — Reka UI (примитивы, соответствующие WAI-ARIA)
- Темы на Tailwind CSS: CSS-переменные и Tailwind Variants
- Поддержка TypeScript с полным автодополнением
- Совместимость с серверным рендерингом (SSR)
- Тёмная тема и 20 языков через i18n

## Установка

- Nuxt: <${DOMAIN}/raw/docs/getting-started/installation/nuxt.md>
- Vue: <${DOMAIN}/raw/docs/getting-started/installation/vue.md>

## Разделы

- Документация: <${DOMAIN}/raw/docs/getting-started.md>
- Компоненты: <${DOMAIN}/raw/docs/components.md>
- Композаблы: <${DOMAIN}/raw/docs/composables/define-shortcuts.md>
- Типографика: <${DOMAIN}/raw/docs/typography.md>
- Карта сайта (XML): <${DOMAIN}/sitemap.xml>
- Карта сайта (Markdown): <${DOMAIN}/sitemap.md>
- Индекс для LLM: <${DOMAIN}/llms.txt>
- Полная документация для LLM: <${DOMAIN}/llms-full.txt>

## Ссылки

- Сайт: <${DOMAIN}>
- GitHub: <https://github.com/bitrix24/b24ui>
- Сообщество: <https://t.me/b24_dev>
`

  setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setResponseHeader(event, 'Link', [
    `<${DOMAIN}>; rel="canonical"`,
    `<${DOMAIN}>; rel="alternate"; type="text/html"`
  ].join(', '))
  return frontmatter + body
}, {
  swr: true,
  maxAge: 60 * 60
})
