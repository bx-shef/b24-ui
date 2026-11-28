/**
 * Remark-плагин: явный якорь заголовка `## Использование {#usage}`.
 *
 * Заголовки на русском, а якоря остаются английскими, чтобы не ломать
 * внешние ссылки и ссылки между страницами (см. .github/contributing/translation.md).
 */
const ANCHOR = /\s*\{#([\w-]+)\}\s*$/

interface MdNode {
  type: string
  value?: string
  data?: Record<string, any>
  children?: MdNode[]
}

function walk(node: MdNode) {
  if (node.type === 'heading' && node.children?.length) {
    const last = node.children[node.children.length - 1]!
    const match = last.type === 'text' && last.value ? last.value.match(ANCHOR) : null
    if (match) {
      last.value = last.value!.replace(ANCHOR, '')
      if (!last.value) {
        node.children.pop()
      }
      node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id: match[1] } }
    }
  }
  node.children?.forEach(walk)
}

export default function remarkHeadingId() {
  return (tree: MdNode) => walk(tree)
}
