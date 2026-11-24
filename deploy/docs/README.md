# Сайт документации Bitrix24 UI в Docker

Сайт из `docs/` (Nuxt 4 + Nitro-сервер: серверные маршруты, MCP-сервер `/mcp/`, `llms.txt`, `raw/*.md`)
собирается в образ `ghcr.io/bx-shef/b24-ui-docs` и крутится на своём сервере за общим `nginx-proxy` с TLS.
Схема та же, что у остальных сайтов bx-shef: GitHub Actions публикует образ на каждый push в `main`,
общий Watchtower на сервере подхватывает новый `:latest`.

| Файл | Зачем |
|---|---|
| `Dockerfile` | сборка: библиотека, затем `docs`; финальный образ `node:24-slim`, `USER node`, порт 3000, healthcheck |
| `docker-compose.prod.yml` | сервис за прокси в сети `proxy-net` (`VIRTUAL_HOST`, `LETSENCRYPT_HOST`), метка Watchtower |
| `proxy.compose.yml`, `watchtower.compose.yml` | общий прокси и Watchtower — только если их на сервере ещё нет |
| `install.sh`, `Makefile`, `.env.example` | установка и обновление на сервере |
| `../../.github/workflows/docs-image.yml` | сборка, дымовая проверка и публикация образа |

## Адреса сайта: сборка и рантайм

Домен **вшивается в образ при сборке**. Проверено на собранном сайте: `NUXT_PUBLIC_SITE_URL`,
`NUXT_PUBLIC_CANONICAL_URL` и `NUXT_PUBLIC_GIT_URL` попадают в `runtimeConfig.public` и в рантайме
переопределяются, но сайт при сборке пререндерит около 400 страниц (HTML, `sitemap.md`, `.well-known/*`,
`raw/*.md` — с адресом в canonical и ссылках), и они остаются с адресом сборки. Рантайм-переопределение
действует только на страницы, которые рендерит сервер (ответы MCP, часть маршрутов) — получился бы сайт
с двумя адресами. Поэтому в `docker-compose.prod.yml` этих переменных нет, а адрес задаётся при сборке:

- `SITE_URL` — build-arg образа (`https://домен`, без слэша на конце); `CANONICAL_URL` по умолчанию равен ему;
- в GitHub Actions — переменная репозитория `DOCS_SITE_URL` (Settings → Secrets and variables → Actions →
  Variables) или поле `site_url` при ручном запуске workflow; пусто — плейсхолдер `https://docs.example.com`;
- `NUXT_PUBLIC_BASE_URL` (подкаталог) в образе пуст: сайт стоит в корне домена, как нужно за `nginx-proxy`.

Сменили домен — задайте `DOCS_SITE_URL`, запустите workflow «Docs image» (Run workflow), на сервере
поменяйте `DOMAIN` в `.env` и выполните `make prod-redeploy`.

> Домен ещё не выбран владельцем (bx-shef/b24-ui#9): пока везде плейсхолдер `docs.example.com`.
> `install.sh` и `make doctor` с плейсхолдером не работают — это защита от выпуска сертификата на чужой домен.

## Сервер

Нужно: Linux с Docker и `docker compose` v2, A-запись домена на сервер, порты 80 и 443 (если прокси ещё нет).

Одна команда (первая установка и каждое обновление файлов):

```bash
git clone https://github.com/bx-shef/b24-ui.git
DOMAIN=<домен> EMAIL=<почта для Let's Encrypt> sudo -E bash b24-ui/deploy/docs/install.sh
```

Скрипт: проверяет Docker, кладёт файлы в `/home/bitrix/b24-ui-docs` (`DIR=` — другой каталог), пишет `.env`,
находит работающий `nginx-proxy` (не трогает его; если прокси нет и порты свободны — ставит `proxy.compose.yml`),
скачивает образ, поднимает контейнер и ждёт ответа `/llms.txt`. Сертификат выпускается 1–2 минуты после того,
как DNS указывает на сервер.

Если пакет `ghcr.io/bx-shef/b24-ui-docs` приватный, до установки: `docker login ghcr.io` (логин GitHub и
classic PAT только с `read:packages`).

### Обновление

- **Само.** Общий Watchtower (проверка раз в 5 минут) подхватывает новый `:latest` по метке
  `com.centurylinklabs.watchtower.enable=true`. Если Watchtower на хосте нет: в `/home/bitrix/watchtower/.env`
  — `GHCR_USER`, `GHCR_TOKEN`, `WATCHTOWER_API_VERSION=1.44`, затем `make shared-watchtower`.
- **Сразу:** `cd /home/bitrix/b24-ui-docs && make prod-redeploy`.
- **Файлы установки** (compose, Makefile) — `git pull` в клоне и та же команда `install.sh`.
- **Закрепить версию:** `IMAGE_TAG=sha-<коммит>` в `.env`, `make prod-up`.

Прочее: `make help` (список), `make doctor` (сеть, прокси, Watchtower, `.env`), `make health`, `make logs`.

## Сборка образа

Контекст — корень репозитория, на сборку уходит около 10 минут и до 8 ГБ памяти Node (`NODE_OPTIONS`):

```bash
docker build -f deploy/docs/Dockerfile --build-arg SITE_URL=https://docs.example.com -t b24-ui-docs .
docker run --rm -p 3000:3000 b24-ui-docs        # http://localhost:3000
```

pnpm ставится через corepack, версия — из `packageManager` корневого `package.json`; зависимости —
`pnpm install --frozen-lockfile`. В образ попадает только `docs/.output` (Nitro уже включает нужные
`node_modules` сервера), репозитория и pnpm там нет.

## GitHub Pages

Старая публикация (`.github/workflows/deploy.yml`, GitHub Pages, базовый путь `/b24ui`) пока остаётся.
После переезда на свой сервер её выключат — решение владельца, вопрос в bx-shef/b24-ui#9; до тех пор
оба сайта живут параллельно.
