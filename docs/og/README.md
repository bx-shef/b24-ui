# Превью ссылок (og:image)

`og.html` — исходник картинки 1200×630 (знак «Василёк», шрифт Inter Tight из `docs/app/assets/fonts`, без внешних ресурсов).
Пересборка: `node docs/og/render.mjs` (нужен Playwright с Chromium; если пакета нет в `node_modules`,
укажите `PLAYWRIGHT_MODULE=<путь к пакету playwright>`). Результат — `docs/public/og-image.jpg`, он подключён в `docs/nuxt.config.ts`.
