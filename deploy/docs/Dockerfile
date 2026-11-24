# syntax=docker/dockerfile:1.7
# Сайт документации Bitrix24 UI (docs/, Nuxt + Nitro-сервер с MCP и серверными маршрутами).
# Контекст сборки — КОРЕНЬ репозитория:
#   docker build -f deploy/docs/Dockerfile \
#     --build-arg SITE_URL=https://docs.example.com -t b24-ui-docs .
# Образ: ghcr.io/bx-shef/b24-ui-docs, порт 3000. Сервер — deploy/docs/ (compose, Makefile, install.sh).

ARG NODE_VERSION=24

# ─── Сборка ──────────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-slim AS build
WORKDIR /repo

# pnpm — через corepack, версия берётся из поля packageManager корневого package.json
# (corepack читает его сам, версию здесь не дублируем). Браузер для puppeteer не качаем:
# он нужен только скриптам скриншотов, сборке сайта — нет.
ENV CI=true \
    COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    PUPPETEER_SKIP_DOWNLOAD=1 \
    NODE_OPTIONS=--max-old-space-size=8192 \
    NUXT_TELEMETRY_DISABLED=1
RUN corepack enable

COPY . .
# frozen-lockfile — сборка не меняет pnpm-lock.yaml; кэш хранилища pnpm — между сборками
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Адреса сайта попадают в статику при сборке (canonical, sitemap, llms.txt, raw/*.md,
# ответы MCP). Домен не зашит в образ, а приходит аргументом — см. deploy/docs/README.md,
# «Адреса сайта: сборка и рантайм». BASE_URL пуст — сайт в корне домена.
ARG SITE_URL=https://docs.example.com
ARG CANONICAL_URL=
ARG BASE_URL=
ARG GIT_URL=https://github.com/bx-shef/b24-ui
ENV NUXT_PUBLIC_SITE_URL=${SITE_URL} \
    NUXT_PUBLIC_BASE_URL=${BASE_URL} \
    NUXT_PUBLIC_GIT_URL=${GIT_URL}
# canonical по умолчанию равен адресу сайта
RUN export NUXT_PUBLIC_CANONICAL_URL="${CANONICAL_URL:-$SITE_URL}" \
 && pnpm run dev:prepare \
 && pnpm run build \
 && pnpm run docs:build

# ─── Рантайм ─────────────────────────────────────────────────────────
# Nitro кладёт в .output всё нужное для запуска (включая node_modules сервера),
# репозиторий и pnpm в образ не едут.
FROM node:${NODE_VERSION}-slim
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000 \
    NITRO_PORT=3000
COPY --from=build /repo/docs/.output ./.output
# @nuxt/content (sqliteConnector: native) на старте собирает SQLite-базу из встроенного дампа и по умолчанию
# кладёт её рядом с сервером (.output/server/contents.sqlite) — туда node писать не может, и контентные
# инструменты MCP и /__nuxt_content/* отвечают 500 («unable to open database file»). Путь переопределяется
# в рантайме через runtimeConfig; база — в каталоге, который принадлежит node, код образа остаётся
# только для чтения. База пересоздаётся при каждом старте, хранить её не нужно.
RUN mkdir /data && chown node:node /data
ENV NUXT_CONTENT_DATABASE_FILENAME=/data/contents.sqlite
EXPOSE 3000
LABEL org.opencontainers.image.source=https://github.com/bx-shef/b24-ui \
      org.opencontainers.image.description="Bitrix24 UI — сайт документации (Nuxt-сервер)"
USER node
# 127.0.0.1, а не localhost: в контейнере localhost резолвится и в ::1
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/llms.txt').then(r => process.exit(r.ok ? 0 : 1), () => process.exit(1))"
CMD ["node", ".output/server/index.mjs"]
