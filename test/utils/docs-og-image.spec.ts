import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

const root = process.cwd()

/** Размер картинки без зависимостей: PNG — IHDR, JPEG — первый маркер SOFn. */
export function imageSize(buf: Buffer): { width: number, height: number } {
  if (buf.subarray(1, 4).toString('latin1') === 'PNG') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  }
  let i = 2
  while (i < buf.length) {
    if (buf[i] !== 0xFF) throw new Error('bad jpeg')
    const marker = buf[i + 1] as number
    if (marker >= 0xC0 && marker <= 0xCF && ![0xC4, 0xC8, 0xCC].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) }
    }
    i += 2 + buf.readUInt16BE(i + 2)
  }
  throw new Error('no size')
}

/** Превью ссылок: без og:image мессенджеры показывают пустую карточку. */
describe('docs: og:image', () => {
  const config = readFileSync(resolve(root, 'docs/nuxt.config.ts'), 'utf-8')

  it('nuxt.config declares og:image and twitter:image from the site address', () => {
    expect(config).toContain(`property: 'og:image'`)
    expect(config).toContain(`name: 'twitter:image'`)
    expect(config).toContain(`name: 'twitter:card', content: 'summary_large_image'`)
    expect(config).toMatch(/const ogImageUrl = `\$\{prodUrl\}\$\{baseUrl\}\/og-image\.(png|jpg)`/)
  })

  it('the image exists in docs/public and is 1200x630', () => {
    const file = ['png', 'jpg'].map(e => resolve(root, `docs/public/og-image.${e}`)).find(existsSync)

    expect(file).toBeTruthy()
    expect(imageSize(readFileSync(file as string))).toEqual({ width: 1200, height: 630 })
  })

  it('the declared size matches the file', () => {
    expect(config).toContain(`content: '1200'`)
    expect(config).toContain(`content: '630'`)
  })
})
