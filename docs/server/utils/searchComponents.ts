/**
 * Longest query and most tokens scored. The query comes from an external MCP
 * client; every token compiles three RegExps per component, and V8 refuses to
 * compile a single token of ~50k characters, so both are capped. The tool
 * schema rejects longer queries; the cap here keeps direct callers bounded too.
 */
export const MAX_QUERY_LENGTH = 200
export const MAX_QUERY_TOKENS = 16

export interface SearchableComponent {
  name?: string
  title?: string
  description?: string
  keywords?: string[]
}

/**
 * Lowercases, maps `ё` to `е` and strips Latin diacritics (`é` -> `e`).
 * Cyrillic `й` is kept as is: decomposing it would strip the breve and turn
 * `й` into `и`. Applied to the query and to every searched field, so both
 * sides of a comparison are folded the same way.
 */
function normalizeQuery(query: string): string {
  return query
    .normalize('NFC')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .normalize('NFD')
    .replace(/(?<![\u0400-\u04FF])[\u0300-\u036F]+/g, '')
    .normalize('NFC')
    .trim()
}

export function tokenize(query: string): string[] {
  return normalizeQuery(query).split(/[^\p{L}\p{N}]+/u).filter(token => token.length >= 3)
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Whole-word match. `\b` only knows ASCII word characters, so the boundary is
 * spelled with Unicode lookarounds. Tokens come from `tokenize()` and only
 * contain letters and digits, but they are escaped anyway so the function stays
 * safe if it is ever called with arbitrary text.
 */
function matchesWord(text: string, token: string): boolean {
  return new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(token)}(?![\\p{L}\\p{N}])`, 'u').test(text)
}

/**
 * Scores a component against a search query, matching name, title, keywords
 * and description at both phrase and token level. Keywords hold alternate
 * names from other ecosystems (e.g. "segmented control" for FieldGroup) and
 * only match on word boundaries to keep short keywords from firing inside
 * unrelated words.
 */
export function scoreComponent(component: SearchableComponent, query: string): number {
  const search = normalizeQuery(query.slice(0, MAX_QUERY_LENGTH))
  if (!search) {
    return 0
  }

  const name = normalizeQuery(component.name ?? '')
  const nameWords = name.replace(/-/g, ' ')
  const title = normalizeQuery(component.title ?? '')
  const keywords = (component.keywords ?? []).map(keyword => normalizeQuery(keyword))
  const description = normalizeQuery(component.description ?? '')
  const searchTokens = tokenize(search).slice(0, MAX_QUERY_TOKENS)

  let score = 0

  if (name === search || nameWords === search || title === search) {
    score += 100
  } else if (name.includes(search) || nameWords.includes(search) || title.includes(search)) {
    score += 60
  }

  if (keywords.includes(search)) {
    score += 50
  } else if (keywords.some((keyword) => {
    if (keyword.startsWith(search)) {
      return true
    }
    // Only multi-word keywords match by containment, single words score at token level
    const keywordTokens = tokenize(keyword)
    return keywordTokens.length > 1 && keywordTokens.every(token => searchTokens.includes(token))
  })) {
    score += 40
  }

  if (description.includes(search)) {
    score += 20
  }

  for (const token of searchTokens) {
    if (matchesWord(nameWords, token) || matchesWord(title, token)) {
      score += 12
    }
    if (keywords.some(keyword => matchesWord(keyword, token))) {
      score += 8
    }
    if (matchesWord(description, token)) {
      score += 3
    }
  }

  return score
}
