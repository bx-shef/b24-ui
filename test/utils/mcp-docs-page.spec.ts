import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { glob } from 'tinyglobby'

/**
 * The MCP page (docs/getting-started/ai/mcp) lists every tool, resource and prompt the server
 * advertises. The toolkit derives a tool's client-visible name from its file name, so a new file
 * in docs/server/mcp/tools/ is a new tool that the page does not mention, and a renamed one leaves
 * a name on the page that the server rejects (`X-MCP-Tools` answers 400 on an unknown name).
 * This keeps the page and the code in step (bx-shef/b24-ui#93).
 */

const root = process.cwd()
const page = readFileSync(resolve(root, 'docs/content/docs/1.getting-started/7.ai/1.mcp.md'), 'utf-8')
const names = async (dir: string) => (await glob('*.ts', { cwd: resolve(root, dir) })).map(f => f.replace(/\.ts$/, '')).sort()

const tools = await names('docs/server/mcp/tools')
const prompts = await names('docs/server/mcp/prompts')
const resources = (await glob('*.ts', { cwd: resolve(root, 'docs/server/mcp/resources') }))
  .map(f => readFileSync(resolve(root, 'docs/server/mcp/resources', f), 'utf-8').match(/uri: '([^']+)'/)?.[1])
  .filter((uri): uri is string => !!uri)
  .sort()

describe('MCP docs page', () => {
  it('describes every tool', () => {
    for (const tool of tools) expect(page, tool).toContain(`**\`${tool}\`**`)
  })

  it('describes every prompt', () => {
    for (const prompt of prompts) expect(page, prompt).toContain(`**\`${prompt}\`**`)
  })

  it('describes every resource', () => {
    expect(resources.length).toBeGreaterThan(0)
    for (const uri of resources) expect(page, uri).toContain(`**\`${uri}\`**`)
  })

  it('names nothing the server does not have', () => {
    const known = new Set([...tools, ...prompts])
    const mentioned = [...page.matchAll(/b24-ui-[a-z-]+[a-z]/g)].map(m => m[0])
      // `b24-ui-nuxt` is the skill, not an MCP name
      .filter(name => name !== 'b24-ui-nuxt')
    expect(mentioned.filter(name => !known.has(name))).toEqual([])
    const uris = [...page.matchAll(/resource:\/\/[\w/-]+/g)].map(m => m[0])
    expect(uris.filter(uri => !resources.includes(uri))).toEqual([])
  })
})
