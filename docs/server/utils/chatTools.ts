import type { Tool } from 'ai'
import { dynamicTool, jsonSchema } from 'ai'
import { z } from 'zod'
import { tools as mcpToolDefinitions } from '#nuxt-mcp-toolkit/tools.mjs'
import { truncateToolResult } from './chatGuard'

/** Инструменты MCP-сервера сайта в виде инструментов AI SDK: чат читает ту же документацию, что и внешние агенты. */
function mcpToolsToAiTools() {
  const aiTools: Record<string, Tool> = {}

  for (const def of mcpToolDefinitions as any[]) {
    const filename = def._meta?.filename as string | undefined
    const name = def.name || (filename
      ? filename.replace(/\.(ts|js|mts|mjs)$/, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[_\s]+/g, '-').toLowerCase()
      : null)
    if (!name) continue

    const schema = def.inputSchema
      ? z.toJSONSchema(z.object(def.inputSchema)) as Record<string, unknown>
      : { type: 'object' as const, properties: {} }

    aiTools[name] = dynamicTool({
      description: def.description || '',
      inputSchema: jsonSchema(schema),
      execute: async (args: any) => {
        try {
          return truncateToolResult(await def.handler(args, {}))
        } catch (error: any) {
          return { error: error.statusCode ? `[${error.statusCode}] ${error.message}` : error.message || String(error) }
        }
      }
    })
  }

  return aiTools
}

export const chatTools = mcpToolsToAiTools()
