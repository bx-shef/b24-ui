# Оформление «Василёк»

Сайт документации оформлен в стиле «Василёк» семейства AI-помощника bx-shef (bx-shef/b24-ui#8).
Меняется только сайт (`docs/app/**`, `docs/public/`); `src/` и темы компонентов (токены `air-*`) не затронуты.

| Что | Где | Источник |
|---|---|---|
| Токены («Ледяной неон» `#6E5BFF → #3FA9FF → #7CFFE4`, акцент `#4B3CD0` / тёмная `#A9B4FF`), подложка, акценты | `css/vasilek.css` | toolsai-assistant `docs/design/v2/tokens.css`, `spec.md` |
| Шрифт Inter Tight (variable, latin + cyrillic, локально, OFL 1.1) | `fonts/` (лицензия — `fonts/OFL.txt`) | toolsai-assistant `install/js/shef/toolsaiassistant/chat/fonts/` (`@fontsource-variable/inter-tight`) |
| Знак «Василёк» в шапке и подвале | `../components/Cornflower.vue` | toolsai-assistant `docs/design/v2/brand/svg/cornflower-solid-iris.svg` |
| Favicon, apple-touch-icon | `docs/public/favicon.svg` (плитка), `favicon-32.png`, `favicon.ico`, `apple-touch-icon.png` | `cornflower-tile.svg` v2; PNG/ICO — toolsai `site/landing/` |

Правила: перелив — на заголовке героя, главной кнопке и линии подвала; основной текст остаётся сплошным.
Превью примеров (`.bg-grid-example`) сохраняют системный шрифт библиотеки.
