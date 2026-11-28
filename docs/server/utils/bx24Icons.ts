/**
 * Иконки bx24 для MCP (`b24-ui-search-icons`, `b24-ui-get-icon`) — bx-shef/b24-ui#75.
 *
 * Поиск — `createSearch()` из `@bxshefby/icons-json/search`, тот же, что в каталоге
 * https://b24-icons.bx-shef.by: русские и английские ключевые слова, темы, старые имена компонентов
 * `@bitrix24/b24icons-vue` (`CheckLIcon`). Своей копии поиска здесь нет намеренно (решение владельца:
 * MCP иконок — только в b24-ui, поиск один на двоих с каталогом).
 */
import { createSearch } from '@bxshefby/icons-json/search'
import type { Bx24SearchIndex, Bx24SearchResult } from '@bxshefby/icons-json/search'
import index from '@bxshefby/icons-json/search.json'
import { icons } from '@bxshefby/icons-json'

export const BX24_CATALOG_URL = 'https://b24-icons.bx-shef.by'

const search = createSearch(index as Bx24SearchIndex)

export interface Bx24IconHit {
  /** Имя для `icon` / `<B24Icon name>`: `i-bx24-outline-check-l` */
  name: string
  /** Картинка из каталога */
  preview: string
  /** Все варианты группы: стили (наборы) и размеры */
  variants: { name: string, set: string, size: string }[]
  themes: string[]
  /** Старые компоненты `@bitrix24/b24icons-vue/<set>/<Component>` */
  legacy: string[]
}

const toHit = (r: Bx24SearchResult): Bx24IconHit => ({
  name: `i-bx24-${r.name}`,
  preview: `${BX24_CATALOG_URL}/svg/${r.name}.svg`,
  variants: r.variants.map(v => ({ name: `i-bx24-${v.name}`, set: v.set, size: v.size })),
  themes: r.themes,
  legacy: r.legacy.map(l => `@bitrix24/b24icons-vue/${l}`)
})

export function searchBx24Icons(query: string, options: { limit?: number, set?: string, theme?: string } = {}) {
  const { total, results } = search(query, { limit: options.limit ?? 32, set: options.set, theme: options.theme })
  return { query, total, icons: results.map(toHit) }
}

/** `i-bx24-x`, `bx24:x` или `x` → имя в коллекции (`x`), или null. */
export function bx24IconName(name: string): string | null {
  const short = name.trim().replace(/^i-bx24-|^bx24:/, '')
  return icons.icons[short] ? short : null
}

/** SVG иконки (размер — из коллекции, цвет — currentColor) и примеры использования. */
export function getBx24Icon(name: string) {
  const short = bx24IconName(name)
  if (!short) return null
  const icon = icons.icons[short]!
  const width = icon.width ?? icons.width ?? 16
  const height = icon.height ?? icons.height ?? 16
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${icon.left ?? 0} ${icon.top ?? 0} ${width} ${height}">${icon.body}</svg>`
  const group = search(short, { limit: 1 }).results[0]
  return {
    name: `i-bx24-${short}`,
    iconify: `bx24:${short}`,
    preview: `${BX24_CATALOG_URL}/svg/${short}.svg`,
    catalog: `${BX24_CATALOG_URL}/?icon=${short}`,
    svg,
    variants: group?.variants.map(v => `i-bx24-${v.name}`) ?? [],
    usage: {
      // строковые иконки в пропах b24-ui — после bx-shef/b24-ui#69; до этого — <Icon> из @nuxt/icon
      b24ui: `<B24Button icon="i-bx24-${short}" /> <!-- строковый icon: после bx-shef/b24-ui#69 -->`,
      nuxtIcon: `<Icon name="i-bx24-${short}" />`,
      vue: `<Icon icon="bx24:${short}" /> <!-- @iconify/vue + addCollection(icons) из @bxshefby/icons-json -->`,
      react: `<Icon icon="bx24:${short}" /> {/* @iconify/react + addCollection(icons) */}`
    }
  }
}
