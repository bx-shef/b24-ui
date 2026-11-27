#!/usr/bin/env python3
"""Fail unless npm-publish.yml keeps the publishing identity away from code.

The job that holds `id-token: write` can mint an OIDC token, and through the
npm Trusted Publisher that token is a licence to publish. Anything that runs in
that job can ask for it — so nothing from the repository or its dependency tree
may run there: no checkout, no install, no build. Those live in a job without
the permission (`build`), and the publishing job (`publish`) only downloads the
tarball and calls `npm publish`.

Usage: assert-publish-split.py <path to npm-publish.yml>
Covered by test/workflows/publish-split.test.sh — run it after editing.
"""
import re
import sys

import yaml

# What may not appear in a job that can mint a token. `npm install --global
# npm@<pin>` (upgrading the publisher itself) is the one install allowed.
FORBIDDEN_RUN = re.compile(
    r'\b(pnpm|yarn|npx|corepack|bun)\b'
    r'|\bnpm\s+(ci|i|install|run|exec|rebuild|test|start)\b(?!\s+(--global|-g)\s+npm@)'
)
FORBIDDEN_USES = re.compile(r'^(actions/checkout|pnpm/action-setup)@')


def has_id_token(perms) -> bool:
    return isinstance(perms, dict) and perms.get('id-token') == 'write'


def main(path: str) -> int:
    with open(path, encoding='utf-8') as fh:
        wf = yaml.safe_load(fh)
    errors = []

    if has_id_token(wf.get('permissions')):
        errors.append('workflow-level permissions grant id-token: write to every job')

    jobs = wf.get('jobs') or {}
    signing = [n for n, j in jobs.items() if has_id_token((j or {}).get('permissions'))]
    if signing != ['publish']:
        errors.append(f'expected exactly the job `publish` to hold id-token: write, got {signing}')

    build = jobs.get('build') or {}
    if build.get('permissions') != {'contents': 'read'}:
        errors.append('job `build` must declare exactly `permissions: {contents: read}`')
    if 'environment' in build:
        errors.append('job `build` must not use the publishing environment')

    for name in signing:
        job = jobs[name]
        needs = job.get('needs')
        if 'build' not in ([needs] if isinstance(needs, str) else (needs or [])):
            errors.append(f'job `{name}` must need `build`')
        if job.get('environment') != 'npm-publish':
            errors.append(f'job `{name}` must run in the `npm-publish` environment')
        for i, step in enumerate(job.get('steps') or []):
            label = f'job `{name}` step {i + 1} ({step.get("name", "unnamed")})'
            uses = str(step.get('uses', ''))
            run = str(step.get('run', ''))
            if FORBIDDEN_USES.match(uses):
                errors.append(f'{label}: `{uses}` — no repository checkout or pnpm in a token-holding job')
            if FORBIDDEN_RUN.search(run):
                errors.append(f'{label}: runs an install/build command — it must only publish the tarball')
        if not any('npm publish' in str(s.get('run', '')) for s in job.get('steps') or []):
            errors.append(f'job `{name}` has no `npm publish` step')

    for e in errors:
        print(f'{path}: {e}')
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))
