import { defineMcpTool } from '@nuxtjs/mcp-toolkit/server'
import { createError } from 'h3'
import { z } from 'zod'
import { getBx24Icon } from '../../utils/bx24Icons'

// Форк: инструмента нет у nuxt/ui. Иконка коллекции bx24 — SVG и примеры. bx-shef/b24-ui#75.
export default defineMcpTool({
  title: 'Get Icon',
  description: 'Returns one Bitrix24 icon from the `bx24` collection: the SVG (currentColor), its variants (sets and sizes), the catalog link and usage snippets for @nuxt/icon (`<Icon name="i-bx24-…">`), Vue, React and b24-ui (`<B24Button icon="i-bx24-…">`, string icon props arrive with bx-shef/b24-ui#69). Accepts `i-bx24-outline-check-l`, `bx24:outline-check-l` or `outline-check-l`; find names with `b24-ui-search-icons`.',
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  },
  inputSchema: {
    name: z.string().describe('Icon name: i-bx24-outline-check-l, bx24:outline-check-l or outline-check-l')
  },
  inputExamples: [
    { name: 'i-bx24-outline-check-l' }
  ],
  cache: '1h',
  handler({ name }) {
    const icon = getBx24Icon(name)
    if (!icon) {
      throw createError({ status: 404, message: `Icon '${name}' not found in the bx24 collection. Use the b24-ui-search-icons tool to find the exact name.` })
    }
    return icon
  }
})
