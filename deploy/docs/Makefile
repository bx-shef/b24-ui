# Сайт документации Bitrix24 UI. Makefile каталога на сервере, где лежат docker-compose.prod.yml,
# этот Makefile и .env (README.md, «Сервер»). Образ из ghcr.io за обратным прокси с TLS в сети proxy-net.

.DEFAULT_GOAL := help
.PHONY: help build-local prod-up prod-down prod-pull prod-redeploy logs ps health doctor shared-watchtower watchtower-logs

# Переменные — только из .env: чужой экспортированный DOMAIN на общем хосте не должен подменить домен сайта.
override COMPOSE_ENV = env -u DOMAIN -u IMAGE_TAG -u LETSENCRYPT_EMAIL -u COMPOSE_PROJECT_NAME -u COMPOSE_FILE docker compose
override COMPOSE = $(COMPOSE_ENV) -f docker-compose.prod.yml
override CONTAINER := b24-ui-docs
override IMAGE_SOURCE := https://github.com/bx-shef/b24-ui
# Работающий nginx-proxy — по образу, а не по имени: на общем хосте контейнер назван как угодно
override FIND_PROXY = docker ps -q | xargs -r docker inspect -f '{{.Name}} {{.Config.Image}}' 2>/dev/null | awk '$$2 ~ /(^|\/)nginx-proxy(:|@|$$)/ { sub(/^\//, "", $$1); print $$1 }' | head -1

help: ## Список команд
	@grep -hE '^[a-zA-Z_-]+:.*## ' $(MAKEFILE_LIST) | awk 'BEGIN{FS=":.*## "}{printf "  %-20s %s\n", $$1, $$2}'

# SITE_URL — адрес, под который собирается сайт (попадает в canonical, sitemap, llms.txt, MCP)
SITE_URL ?= https://docs.example.com

build-local: ## Собрать образ локально — только из клона: make -C deploy/docs build-local SITE_URL=https://…
	docker build -f Dockerfile --build-arg SITE_URL=$(SITE_URL) -t b24-ui-docs:local ../..

# ─── Прод (на сервере) ───────────────────────────────────────────────

prod-up: ## Запустить / обновить контейнер
	$(COMPOSE) up -d

prod-down: ## Остановить
	$(COMPOSE) down

prod-pull: ## Скачать свежий образ, не перезапуская контейнер
	$(COMPOSE) pull

prod-redeploy: ## Обновить прямо сейчас, не дожидаясь Watchtower (он проверяет раз в 5 минут)
	$(COMPOSE) pull && $(COMPOSE) up -d && \
	docker image prune -f --filter "label=org.opencontainers.image.source=$(IMAGE_SOURCE)"

logs: ## Живой лог (Ctrl+C — выйти)
	$(COMPOSE) logs -f docs

ps: ## Состояние контейнера
	$(COMPOSE) ps

health: ## Проверка изнутри контейнера: сайт и MCP отвечают
	@for i in $$(seq 1 60); do docker exec $(CONTAINER) node -e "fetch('http://127.0.0.1:3000/llms.txt').then(r => process.exit(r.ok ? 0 : 1), () => process.exit(1))" 2>/dev/null && break; sleep 1; done  # сразу после prod-up сайт ещё стартует
	docker exec $(CONTAINER) node -e "fetch('http://127.0.0.1:3000/').then(r => { console.log('site', r.status); process.exit(r.ok ? 0 : 1) })"

# Общий Watchtower хоста — один на все сайты (watchtower.compose.yml). Каталог — свой, с .env
# (GHCR_USER, GHCR_TOKEN, WATCHTOWER_API_VERSION); файл compose кладётся туда же.
WT_DIR ?= /home/bitrix/watchtower

shared-watchtower: ## Поднять / обновить общий Watchtower со входом в ghcr (WT_DIR, по умолчанию /home/bitrix/watchtower)
	@[ -f $(WT_DIR)/.env ] || { echo "[!!] нет $(WT_DIR)/.env — GHCR_USER, GHCR_TOKEN, WATCHTOWER_API_VERSION"; exit 1; }
	@[ -f $(WT_DIR)/watchtower.compose.yml ] || cp watchtower.compose.yml $(WT_DIR)/watchtower.compose.yml
	cd $(WT_DIR) && docker compose -f watchtower.compose.yml up -d

watchtower-logs: ## Лог Watchtower: вход в ghcr, найденные обновления
	docker logs --tail 100 $$(docker ps --format '{{.Names}}' | grep -i watchtower | head -1)

doctor: ## Что не так: сеть, прокси, Watchtower, .env, контейнер
	@docker network inspect proxy-net >/dev/null 2>&1 && echo "[ok] сеть proxy-net" || echo "[!!] нет сети proxy-net — поднять nginx-proxy"
	@P=$$($(FIND_PROXY)); [ -n "$$P" ] && echo "[ok] прокси: $$P" || echo "[!!] работающий nginx-proxy не найден (ищется по образу nginx-proxy)"
	@W=$$(docker ps --format '{{.Names}}' | grep -i watchtower | head -1); [ -n "$$W" ] && echo "[ok] watchtower: $$W" || echo "[!!] watchtower не запущен — make shared-watchtower"
	@docker logs --tail 50 $$(docker ps --format '{{.Names}}' | grep -i watchtower | head -1) 2>&1 | grep -iE 'unauthorized|denied|too old' | tail -1 | sed 's/^/[!!] watchtower: /' || true
	@if [ ! -f .env ]; then echo "[!!] нет .env — cp .env.example .env"; \
	  elif [ ! -r .env ]; then echo "[!!] .env не читается этим пользователем — запускайте от владельца каталога или через sudo"; \
	  elif grep -q '^DOMAIN=docs.example.com' .env; then echo "[!!] в .env остался плейсхолдер DOMAIN=docs.example.com"; \
	  else echo "[ok] .env"; fi
	@$(COMPOSE) ps --format '{{.Name}} {{.Status}}' 2>/dev/null || true
