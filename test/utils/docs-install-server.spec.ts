import { execFileSync, spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
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

  it('backs up default.conf before the first edit and rolls it back on failure', () => {
    expect(script).toContain('.backup-default.conf.$STAMP')
    expect(script.indexOf('cp "$CONF" "$CONF_BACKUP"')).toBeLessThan(script.indexOf('cat >> "$CONF"'))
    expect(script).toMatch(/trap 'rc=\$\?; \[ "\$rc" -eq 0 \] \|\| rollback' EXIT/)
    expect(script).toContain('cp "$CONF_BACKUP" "$CONF"')
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
    expect(script).toContain('in_list ||')
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
