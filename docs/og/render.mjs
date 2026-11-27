// Снимок docs/og/og.html -> docs/public/og-image.jpg (1200×630).
// Запуск из корня репозитория: node docs/og/render.mjs
// Нужен playwright с установленным Chromium (PLAYWRIGHT_MODULE=<путь к пакету>, если он не в node_modules).
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(resolve(process.env.PLAYWRIGHT_MODULE, 'index.mjs')).href : 'playwright')

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.goto(pathToFileURL(resolve(here, 'og.html')).href)
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: resolve(here, '../public/og-image.jpg'), type: 'jpeg', quality: 90 })
await browser.close()
