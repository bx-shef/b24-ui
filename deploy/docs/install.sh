#!/usr/bin/env bash
# Сайт документации Bitrix24 UI — установка и обновление ОДНОЙ командой на сервере с Docker:
#
#   git clone https://github.com/bx-shef/b24-ui.git && DOMAIN=docs.example.com EMAIL=me@example.com \
#     sudo -E bash b24-ui/deploy/docs/install.sh
#
# Повторный запуск той же командой — обновление: свежие docker-compose.prod.yml и Makefile (из клона —
# перед повтором сделайте git pull), новый образ, проверка. Переменные (все необязательные, кроме
# DOMAIN при первом запуске):
#
#   DOMAIN    домен сайта (при первом запуске обязателен; плейсхолдер docs.example.com не принимается)
#   EMAIL     почта для Let's Encrypt
#   B24_DIR   каталог сайта на сервере            (по умолчанию /home/bitrix/b24-ui-docs)
#   B24_PROXY имя контейнера nginx-proxy, если их на сервере несколько
#   B24_SITE_FILES  откуда брать файлы установки  (по умолчанию — каталог этого скрипта)
# Префикс B24_ — чтобы чужие DIR и PROXY из окружения сервера не подменили каталог и прокси.
#
# Заданное в команде пишется в DIR/.env, не заданное там остаётся как было.
#
# Сервер — общий docker-хост проектов bx-shef: nginx-proxy, acme-companion и Watchtower на нём ОБЩИЕ.
# Скрипт их не пересоздаёт — находит работающий nginx-proxy и подключает к нему только свой домен.
# К общему прокси скрипт добавляет лимит запросов к /mcp/ (conf.d и vhost.d прокси, nginx -t и reload).
# Прокси на хосте нет вовсе — ставит его (proxy.compose.yml рядом), но только если порты 80 и 443
# свободны. Watchtower скрипт не ставит (нужен вход в ghcr — make shared-watchtower).
set -euo pipefail

DIR="${B24_DIR:-/home/bitrix/b24-ui-docs}"
CONTAINER=b24-ui-docs
SITE_FILES="${B24_SITE_FILES:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"

ok()   { printf '[ok] %s\n' "$*"; }
note() { printf '[..] %s\n' "$*"; }
fail() { printf '[!!] %s\n' "$*" >&2; exit 1; }

# --- 1. Что есть на сервере -------------------------------------------------
command -v docker >/dev/null 2>&1 || fail "Docker не установлен. Поставить: curl -fsSL https://get.docker.com | sh — и запустить эту команду снова"
docker info >/dev/null 2>&1 || fail "нет доступа к Docker: запускайте через sudo или от root"
docker compose version >/dev/null 2>&1 || fail "нет docker compose v2 (пакет docker-compose-plugin)"
command -v curl >/dev/null 2>&1 || fail "нет curl"
ok "Docker $(docker version --format '{{.Server.Version}}' 2>/dev/null), $(docker compose version --short 2>/dev/null)"

# --- 2. Файлы сайта ---------------------------------------------------------
[ -f "$SITE_FILES/docker-compose.prod.yml" ] || fail "нет $SITE_FILES/docker-compose.prod.yml — запускайте скрипт из клона репозитория или задайте B24_SITE_FILES"
mkdir -p "$DIR/proxy"
cd "$DIR"
fetch() { # fetch <имя в SITE_FILES> <куда>
	cp "$SITE_FILES/$1" "$2.new" && mv "$2.new" "$2"
}
fetch docker-compose.prod.yml docker-compose.prod.yml
fetch Makefile Makefile
fetch .env.example .env.example
fetch proxy.compose.yml proxy/proxy.compose.yml
fetch watchtower.compose.yml watchtower.compose.yml
fetch proxy-errorlog.conf proxy/proxy-errorlog.conf
fetch proxy-limits.conf proxy/proxy-limits.conf
fetch mcp-location.conf proxy/mcp-location.conf
ok "файлы сайта в $DIR"

umask 077
[ -f .env ] || cp .env.example .env
chmod 600 .env

# Значение из окружения → строка KEY= в .env. awk, а не sed: в значении бывают «/», «&», «|».
set_env() {
	local key="$1" value="$2"
	[ -n "$value" ] || return 0
	VALUE="$value" awk -v k="$key" '
		BEGIN { v = ENVIRON["VALUE"] }
		index($0, k "=") == 1 { print k "=" v; done = 1; next }
		{ print }
		END { if (!done) print k "=" v }
	' .env > .env.new && mv .env.new .env
	chmod 600 .env
}
# Домен проверяем до записи в .env: перевод строки или запятая в значении испортили бы .env и VIRTUAL_HOST
domain_re='^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$'
if [ -n "${DOMAIN:-}" ] && ! [[ "$DOMAIN" =~ $domain_re ]]; then
	fail "DOMAIN='$DOMAIN' не похож на имя домена (нужно вида docs.example.com, без https:// и пути)"
fi
set_env DOMAIN "${DOMAIN:-}"
set_env LETSENCRYPT_EMAIL "${EMAIL:-}"

# Каталог — владельцу (/home/bitrix → bitrix), а не root: иначе make doctor от него не прочтёт .env
OWNER="${SUDO_USER:-}"
[ -n "$OWNER" ] && [ "$OWNER" != root ] || OWNER="$(stat -c %U "$(dirname "$DIR")" 2>/dev/null || true)"
own_dir() { if [ -n "$OWNER" ] && [ "$OWNER" != root ] && id "$OWNER" >/dev/null 2>&1; then chown -R "$OWNER": "$DIR"; fi; }
own_dir

DOMAIN="$(grep -E '^DOMAIN=' .env | cut -d= -f2-)"
[ -n "$DOMAIN" ] || fail "DOMAIN пуст в $DIR/.env"
[ "$DOMAIN" != docs.example.com ] || fail "в $DIR/.env плейсхолдер DOMAIN=docs.example.com — задайте домен: DOMAIN=<домен> sudo -E bash …/install.sh"
# Домен идёт в имя файла nginx и в VIRTUAL_HOST: только строчные буквы, цифры, точки, дефисы, хотя бы одна точка
[[ "$DOMAIN" =~ ^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$ ]] || fail "DOMAIN='$DOMAIN' не похож на имя домена (нужно вида docs.example.com, без https:// и пути)"
ok "домен $DOMAIN"

# DNS: только предупреждение — сертификат выпустится, когда запись дойдёт
ip_dns="$(getent ahostsv4 "$DOMAIN" 2>/dev/null | awk 'NR==1 { print $1 }')"
ip_srv="$(curl -fsS --max-time 5 https://api.ipify.org 2>/dev/null || true)"
if [ -z "$ip_dns" ]; then
	note "DNS: $DOMAIN пока не резолвится — нужна A-запись на ${ip_srv:-этот сервер}; сертификат выпустится после"
elif [ -n "$ip_srv" ] && [ "$ip_dns" != "$ip_srv" ]; then
	note "DNS: $DOMAIN → $ip_dns, а у сервера $ip_srv — проверьте A-запись"
else
	ok "DNS: $DOMAIN → $ip_dns"
fi

# --- 3. Обратный прокси с TLS (общий для хоста) ----------------------------
docker network inspect proxy-net >/dev/null 2>&1 || { docker network create proxy-net >/dev/null; ok "создана сеть proxy-net"; }

# Работающий nginx-proxy — по образу, а не по имени
find_proxy() {
	if [ -n "${B24_PROXY:-}" ]; then printf '%s\n' "$B24_PROXY"; return; fi
	docker ps -q | xargs -r docker inspect -f '{{.Name}} {{.Config.Image}}' 2>/dev/null \
		| awk '$2 ~ /(^|\/)nginx-proxy(:|@|$)/ { sub(/^\//, "", $1); print $1 }'
}
proxy="$(find_proxy)"
count="$(printf '%s\n' "$proxy" | grep -c . || true)"

if [ "$count" -gt 1 ]; then
	fail "контейнеров nginx-proxy несколько ($(echo "$proxy" | tr '\n' ' ')) — укажите нужный: B24_PROXY=<имя>"
elif [ "$count" = 1 ]; then
	[ "$(docker inspect -f '{{.State.Running}}' "$proxy" 2>/dev/null)" = true ] || fail "контейнер прокси $proxy не запущен"
	ok "общий прокси: $proxy (контейнер не пересоздаём)"
else
	busy=""
	command -v ss >/dev/null 2>&1 || note "нет ss (пакет iproute2): занятые порты 80/443 не проверены"
	for port in 80 443; do
		if ss -ltnH "sport = :$port" 2>/dev/null | grep -q .; then
			busy="$busy $port ($(ss -ltnpH "sport = :$port" 2>/dev/null | grep -o 'users:(("[^"]*' | head -1 | cut -d'"' -f2))"
		fi
	done
	[ -z "$busy" ] || fail "nginx-proxy на хосте нет, а порты заняты:$busy — прокси не ставлю; освободите порты или подключите сайт к своему прокси"
	docker compose -f "$DIR/proxy/proxy.compose.yml" up -d
	proxy=nginx-proxy
	ok "nginx-proxy и acme-companion запущены (их на хосте не было)"
fi

# Прокси должен быть в сети proxy-net, иначе не увидит сайт (чужой прокси мог быть запущен в другой сети)
if ! docker inspect -f '{{range $k, $_ := .NetworkSettings.Networks}}{{$k}} {{end}}' "$proxy" | tr ' ' '\n' | grep -qx proxy-net; then
	docker network connect proxy-net "$proxy" 2>/dev/null \
		&& ok "прокси $proxy подключён к сети proxy-net" \
		|| fail "прокси $proxy не в сети proxy-net и подключить не удалось — выполните: docker network connect proxy-net $proxy"
fi

# Лимит запросов к MCP: зона — в conf.d (http), включение — в vhost.d/<домен>_location. Не прошло nginx -t — откат.
docker cp proxy/proxy-limits.conf "$proxy:/etc/nginx/conf.d/b24ui-limits.conf" >/dev/null
loc="/etc/nginx/vhost.d/${DOMAIN}_location"
# Свой файл vhost.d узнаём по метке; чужой (уже был у этого домена) не перезаписываем
if docker exec "$proxy" test -f "$loc" && ! docker exec "$proxy" grep -q 'b24ui_mcp' "$loc"; then
	note "в прокси уже есть $loc не от этого сайта — лимит /mcp/ не ставлю; добавьте строки из proxy/mcp-location.conf в него вручную"
	loc=""
fi
[ -z "$loc" ] || docker cp proxy/mcp-location.conf "$proxy:$loc" >/dev/null
if [ -z "$loc" ]; then
	:
elif docker exec "$proxy" nginx -t >/dev/null 2>&1; then
	docker exec "$proxy" nginx -s reload >/dev/null 2>&1 || true
	ok "лимит запросов к /mcp/ включён в прокси (30 в минуту с адреса)"
else
	docker exec "$proxy" rm -f /etc/nginx/conf.d/b24ui-limits.conf "$loc" >/dev/null 2>&1 || true
	note "лимит /mcp/ не включён: nginx -t в прокси не прошёл, файлы убраны — настройте limit_req вручную (proxy/proxy-limits.conf, proxy/mcp-location.conf)"
fi

# --- 4. Сайт ---------------------------------------------------------------
# Переменные — только из .env: чужие экспортированные на хосте не должны подменить их
compose() {
	env -u DOMAIN -u IMAGE_TAG -u LETSENCRYPT_EMAIL -u COMPOSE_PROJECT_NAME -u COMPOSE_FILE \
		docker compose -f docker-compose.prod.yml "$@"
}
compose pull -q || fail "образ не скачался. Если пакет ghcr.io/bx-shef/b24-ui-docs приватный: docker login ghcr.io (classic PAT, read:packages)"
compose up -d
docker ps --format '{{.Names}}' | grep -qi watchtower \
	&& ok "Watchtower есть — нужен вход в ghcr (make doctor покажет unauthorized)" \
	|| note "Watchtower на хосте не найден — make shared-watchtower или обновлять make prod-redeploy"
docker image prune -f --filter "label=org.opencontainers.image.source=https://github.com/bx-shef/b24-ui" >/dev/null 2>&1 || true

# --- 5. Проверка -----------------------------------------------------------
probe() { docker exec "$CONTAINER" node -e "$1" 2>/dev/null; }
LLMS="fetch('http://127.0.0.1:3000/llms.txt').then(r => process.exit(r.ok ? 0 : 1), () => process.exit(1))"
for _ in $(seq 1 90); do
	probe "$LLMS" && break
	sleep 1
done
probe "$LLMS" || { docker logs --tail 30 "$CONTAINER" >&2 || true; fail "сайт не отвечает — лог выше"; }
curl_in() { docker exec "$CONTAINER" node -e "fetch('http://127.0.0.1:3000/llms.txt').then(r => r.text()).then(t => { process.stdout.write(t); }, () => process.exit(1))" 2>/dev/null; }
curl_in | grep -qF "$DOMAIN" \
	&& ok "сайт работает, адрес $DOMAIN в llms.txt" \
	|| note "сайт работает, но в llms.txt нет $DOMAIN: образ собран под другой адрес (в GitHub — переменная DOCS_SITE_URL, затем запуск «Docs image» и make prod-redeploy)"

own_dir

echo
echo "Готово: https://$DOMAIN"
echo "  первый запуск — сертификат выпускается 1–2 минуты после того, как DNS указывает на сервер;"
echo "  обновления приезжают через общий Watchtower со входом в ghcr; обновить руками — та же команда или make prod-redeploy;"
echo "  лог — docker logs -f $CONTAINER; проверка — cd $DIR && make doctor"
