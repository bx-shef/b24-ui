import { execFileSync, spawnSync } from 'node:child_process'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

const path = resolve(process.cwd(), 'deploy/docs/install-server.sh')
const script = readFileSync(path, 'utf-8')
// код без строк-комментариев: в шапке скрипта запрещённые команды названы словами
const code = script.split('\n').filter(line => !/^\s*#/.test(line)).join('\n')

/**
 * Установка сайта документации на сервер bx-shef (обычный nginx в контейнере `proxy`, certbot, общий default.conf).
 * Скрипт правит общий конфиг всех сайтов сервера, поэтому его защиты — откат, nginx -t, скрытый ключ — держим тестом.
 */
describe('docs install-server.sh', () => {
  it('has valid bash syntax', () => {
    expect(spawnSync('bash', ['-n', path]).status).toBe(0)
  })

  it('passes shellcheck when it is installed', (ctx) => {
    const found = spawnSync('shellcheck', ['--version'])
    if (found.error || found.status !== 0) return ctx.skip()
    const res = spawnSync('shellcheck', ['-S', 'warning', path], { encoding: 'utf-8' })
    expect(res.stdout).toBe('')
    expect(res.status).toBe(0)
  })

  it('is strict and defaults to the owner domain', () => {
    expect(script).toMatch(/^set -Eeuo pipefail$/m)
    expect(script).toContain('D=${DOMAIN:-b24-ui.bx-shef.by}')
    expect(script).toContain('ghcr.io/bx-shef/b24-ui-docs:latest')
  })

  it('backs up default.conf before the first edit and rolls back only its own marked blocks', () => {
    expect(script).toContain('.backup-default.conf.$STAMP')
    expect(script.indexOf('cp "$CONF" "$CONF_BACKUP"')).toBeLessThan(script.indexOf('>> "$CONF"'))
    expect(script).toContain('# >>> b24-ui-docs')
    expect(script).toContain('trap cleanup EXIT')
    expect(script).toContain('remove_block "$n"')
    // целый файл поверх чужих правок не восстанавливается
    expect(code).not.toContain('cp "$CONF_BACKUP" "$CONF"')
  })

  it('makes everything private: umask 077, directory 700, .env 600', () => {
    expect(script).toMatch(/^umask 077/m)
    expect(script).toContain('chmod 700 "$DIR"')
    expect(script).toContain('chmod 600 .env')
  })

  it('checks the config with nginx -t before every reload', () => {
    expect(script).toContain('docker exec proxy nginx -t && docker exec proxy nginx -s reload')
    // остальные reload — только в rollback, где возвращается прежний, проверенный конфиг
    expect(script.match(/nginx -s reload/g)).toHaveLength(2)
    expect(script.match(/^\s+reload$/gm)!.length).toBeGreaterThanOrEqual(3)
  })

  it('proxies the chat as a stream with the client address header', () => {
    expect(script).toContain('proxy_buffering off;')
    expect(script).toContain('proxy_set_header X-Forwarded-For \\$proxy_add_x_forwarded_for;')
    expect(script).toContain('proxy_set_header X-Forwarded-Proto \\$scheme;')
    expect(script).toContain('limit_req zone=b24ui_mcp')
  })

  it('reads the key hidden and never prints it', () => {
    expect(script).toContain('read -rs KEY')
    expect(script).not.toMatch(/^set -[a-zA-Z]*x/m)
    expect(script).not.toMatch(/echo[^\n]*\$KEY/)
    expect(script).not.toMatch(/printf[^\n]*\$KEY/)
    expect(script).not.toMatch(/sk-[A-Za-z0-9]{16,}/)
  })

  it('keeps the proxy volumes safe and the compose project apart from them', () => {
    expect(script).toContain('PROJECT=b24-ui-docs')
    expect(script).toMatch(/^name: b24-ui-docs$/m)
    expect(code).not.toMatch(/compose[^\n]* down( |$)/m)
    expect(code).not.toMatch(/volume (rm|prune)/)
    expect(code).not.toMatch(/--remove-orphans/)
    // у сайта в compose нет своих томов: b24-ui_html / b24-ui_certs принадлежат прокси
    const compose = script.slice(script.indexOf('<<\'EOF\''), script.indexOf('\nEOF\n'))
    expect(compose).not.toMatch(/^volumes:/m)
    expect(compose).not.toContain('VIRTUAL_HOST')
    expect(compose).toContain('com.centurylinklabs.watchtower.enable=true')
  })

  it('adds the domain to the renewal list and verifies it', () => {
    expect(script).toContain('DOMAINS=')
    expect(script).toContain('.backup-renew-certs.sh.$STAMP')
    expect(script).toContain('in_list')
  })

  it('is documented in the deploy README with the one-line install command', () => {
    const readme = readFileSync(resolve(process.cwd(), 'deploy/docs/README.md'), 'utf-8')
    expect(readme).toContain('curl -fsSLO https://raw.githubusercontent.com/bx-shef/b24-ui/main/deploy/docs/install-server.sh && bash install-server.sh')
    expect(readme).toContain('proxy_buffering off')
    expect(readme).toContain('405')
  })

  it('is executable', () => {
    expect(execFileSync('test', ['-x', path]).toString()).toBe('')
  })
})

/** Прогон скрипта с подставными docker/curl/getent и временными каталогами: сервера и docker не нужно. */
const FAKE_DOCKER = `#!/bin/bash
case "$1" in
  info|volume|network|compose) exit 0;;
  inspect) [ "$2" = proxy ] && exit 0; exit 1;;
  exec) case "$*" in *"nginx -t"*) [ -f "$SB/nginx_bad" ] && exit 1;; esac; exit 0;;
  run) a="$*"
    case "$a" in
      *"for e in crt"*) [ -f "$SB/certs" ];;
      *"test -s /le/live"*) exit 1;;
      *certbot*) if [ -n "$CERTBOT_FAIL" ]; then printf '\nserver { server_name foreign.example; }\n' >> "$CONF"; exit 1; fi; exit 0;;
      *"cp /le/live"*) touch "$SB/certs";;
      *) exit 0;;
    esac;;
esac
`

function sandbox(conf: string, renew: string) {
  const root = mkdtempSync(join(tmpdir(), 'install-server-'))
  const bin = join(root, 'bin')
  const proxy = join(root, 'proxy')
  mkdirSync(bin)
  mkdirSync(join(proxy, 'conf.d'), { recursive: true })
  const put = (name: string, body: string) => {
    writeFileSync(join(bin, name), body)
    chmodSync(join(bin, name), 0o755)
  }
  put('docker', FAKE_DOCKER)
  put('curl', '#!/bin/bash\ncase "$*" in *ipify*) echo 1.2.3.4;; *llms.txt*) echo 200;; esac\n')
  put('getent', '#!/bin/bash\necho "1.2.3.4 STREAM x"\n')
  writeFileSync(join(proxy, 'conf.d/default.conf'), conf)
  writeFileSync(join(proxy, 'renew-certs.sh'), renew)
  const confPath = join(proxy, 'conf.d/default.conf')
  const run = (file = path, extra: Record<string, string> = {}) => spawnSync('bash', [file], {
    encoding: 'utf-8',
    stdin: 'ignore',
    env: {
      PATH: `${bin}:${process.env.PATH}`,
      HOME: root,
      SB: root,
      CONF: confPath,
      B24_DIR: join(root, 'site'),
      B24_PROXY_DIR: proxy,
      NUXT_DEEPSEEK_API_KEY: 'test-key_123',
      ...extra
    }
  })
  return { root, proxy, confPath, renewPath: join(proxy, 'renew-certs.sh'), site: join(root, 'site'), run }
}

const BASE_CONF = 'resolver 127.0.0.11;\nserver { server_name other.bx-shef.by; listen 80; }\n'
const mode = (p: string) => (statSync(p).mode & 0o777).toString(8)

describe('docs install-server.sh: behaviour on stubs', () => {
  it('is idempotent, lists the domain once, keeps the key private', () => {
    const sb = sandbox(BASE_CONF, 'DOMAINS="a b"\n')
    const first = sb.run()
    expect(first.status, first.stdout + first.stderr).toBe(0)
    const after = readFileSync(sb.confPath, 'utf-8')
    expect(after).toContain('# >>> b24-ui-docs b24-ui.bx-shef.by 443')
    expect(after).toContain('proxy_buffering off;')
    expect(after).toContain('map $uri $b24ui_mcp_key')

    const second = sb.run()
    expect(second.status, second.stdout + second.stderr).toBe(0)
    expect(readFileSync(sb.confPath, 'utf-8')).toBe(after)

    const renew = readFileSync(sb.renewPath, 'utf-8')
    expect(renew.match(/\bb24-ui\b/g)).toHaveLength(1)
    expect(renew.match(/^DOMAINS=/gm)).toHaveLength(1)

    expect(mode(sb.site)).toBe('700')
    expect(mode(join(sb.site, '.env'))).toBe('600')
    expect(readFileSync(join(sb.site, '.env'), 'utf-8')).toContain('NUXT_DEEPSEEK_API_KEY=test-key_123')
    expect(readdirSync(sb.site).filter(f => f.endsWith('.new'))).toEqual([])
    for (const f of readdirSync(sb.site)) expect(statSync(join(sb.site, f)).mode & 0o077, f).toBe(0)
    expect(first.stdout + first.stderr).not.toContain('test-key_123')
  })

  it('on a failed certbot removes only its own blocks and keeps foreign edits', () => {
    const sb = sandbox(BASE_CONF, 'DOMAINS="a b"\n')
    const res = sb.run(path, { CERTBOT_FAIL: '1' })
    expect(res.status).not.toBe(0)
    const conf = readFileSync(sb.confPath, 'utf-8')
    expect(conf).toContain(BASE_CONF)
    expect(conf).toContain('server { server_name foreign.example; }')
    expect(conf).not.toContain('b24-ui-docs')
    expect(conf).not.toContain('b24ui_mcp')
    expect(readFileSync(sb.renewPath, 'utf-8')).toBe('DOMAINS="a b"\n')
  })

  it('a copy that restores the whole file on rollback loses the foreign edit (the test is able to fail)', () => {
    const mutated = script.replace('  for n in "${ADDED[@]}"; do remove_block "$n"; done', '  cp "$CONF_BACKUP" "$CONF"')
    expect(mutated).not.toBe(script)
    const sb = sandbox(BASE_CONF, 'DOMAINS="a b"\n')
    const copy = join(sb.root, 'mutant.sh')
    writeFileSync(copy, mutated)
    sb.run(copy, { CERTBOT_FAIL: '1' })
    expect(readFileSync(sb.confPath, 'utf-8')).not.toContain('foreign.example')
  })

  it('refuses an unexpected renew-certs.sh format before touching anything', () => {
    for (const renew of ['DOMAINS="a"\nDOMAINS="b"\n', 'DOMAINS=(a b)\n', '# нет списка\n']) {
      const sb = sandbox(BASE_CONF, renew)
      const res = sb.run()
      expect(res.status).toBe(1)
      expect(readFileSync(sb.confPath, 'utf-8')).toBe(BASE_CONF)
      expect(readFileSync(sb.renewPath, 'utf-8')).toBe(renew)
      expect(existsSync(join(sb.proxy, '.backup-default.conf'))).toBe(false)
      expect(readdirSync(sb.proxy).filter(f => f.startsWith('.backup'))).toEqual([])
    }
  })

  it('refuses a domain outside bx-shef.by and bad input before any edit', () => {
    const sb = sandbox(BASE_CONF, 'DOMAINS="a b"\n')
    expect(sb.run(path, { DOMAIN: 'docs.example.com' }).status).toBe(1)
    expect(sb.run(path, { LETSENCRYPT_EMAIL: 'a b@x.by' }).status).toBe(1)
    expect(sb.run(path, { NUXT_DEEPSEEK_MODEL: 'x\ny' }).status).toBe(1)
    expect(readFileSync(sb.confPath, 'utf-8')).toBe(BASE_CONF)
  })

  it('does not add a second server for a domain already served without our markers', () => {
    const own = 'server { server_name b24-ui.bx-shef.by; listen 80; }\n'
    const sb = sandbox(BASE_CONF + own, 'DOMAINS="a b"\n')
    expect(sb.run().status).toBe(1)
    expect(readFileSync(sb.confPath, 'utf-8')).toBe(BASE_CONF + own)
  })

  it('keys the MCP limit by the normalised $uri everywhere', () => {
    expect(readFileSync(resolve(process.cwd(), 'deploy/docs/proxy-limits.conf'), 'utf-8')).toContain('map $uri $b24ui_mcp_key')
    expect(readFileSync(resolve(process.cwd(), 'deploy/docs/proxy-limits.conf'), 'utf-8')).not.toMatch(/^map \$request_uri/m)
  })
})
