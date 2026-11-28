import { defineMcpTool } from '@nuxtjs/mcp-toolkit/server'
import { z } from 'zod'
import { searchBx24Icons } from '../../utils/bx24Icons'

// Форк: коллекция bx24 (bx-shef/b24-icons), а не Iconify API, как у nuxt/ui — bx24 там нет. bx-shef/b24-ui#75.
export default defineMcpTool({
  title: 'Search Icons',
  description: 'Search Bitrix24 icons (Iconify collection `bx24`, catalog https://b24-icons.bx-shef.by). Understands Russian and English words ("корзина", "trash"), themes and old `@bitrix24/b24icons-vue` component names ("CheckLIcon"). Returns icon groups: `name` in the `i-bx24-{set}-{name}` format used by `icon` props, a `preview` image URL, all `variants` (sets and sizes), themes and the old component names. Use `b24-ui-get-icon` for the SVG and usage snippets.',
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  },
  inputSchema: {
    query: z.string().describe('Search query in Russian or English, or an old component name (e.g. "корзина", "arrow down", "CheckLIcon")'),
    limit: z.number().min(1).max(200).optional().describe('Maximum number of icon groups (default: 32)'),
    set: z.string().optional().describe('Only icons that have a variant in this set: outline, solid, main, actions, crm, editor, file-type, social, common-service, …'),
    theme: z.string().optional().describe('Only icons in this catalog theme (Russian title, e.g. "Стрелки и навигация")')
  },
  inputExamples: [
    { query: 'корзина' },
    { query: 'arrow', limit: 10 },
    { query: 'CheckLIcon' }
  ],
  cache: '1h',
  handler({ query, limit, set, theme }) {
    return searchBx24Icons(query, { limit, set, theme })
  }
})
