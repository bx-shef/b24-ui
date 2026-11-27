#!/usr/bin/env python3
"""Fail unless release-please.yml chains a release to npm the way releasing.md says.

Merging the release PR is the only human action (owner decision, #63): the
`publish` job dispatches npm-publish.yml on the release TAG. That job holds
`actions: write` and nothing else, so the third-party release-please-action
never gets it, and it only runs for this repository with NPM_RELEASE=true.

Usage: assert-release-chain.py <path to release-please.yml>
Covered by test/workflows/release-chain.test.sh.
"""
import re
import sys

import yaml

REPO_GATE = "github.repository == 'bx-shef/b24-ui' && vars.NPM_RELEASE == 'true'"
DISPATCH = 'gh workflow run npm-publish.yml --repo "$GITHUB_REPOSITORY" --ref "$TAG"'
TAG_CHECK = r'[[ "$TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.]+)?$ ]]'


def norm(x):
    return ' '.join(str(x).split())


def main(path):
    wf = yaml.safe_load(open(path, encoding='utf-8'))
    errors = []
    jobs = wf.get('jobs') or {}

    if wf.get('permissions') != {'contents': 'read'}:
        errors.append('workflow-level permissions must be exactly {contents: read}')

    rp = jobs.get('release-please') or {}
    if norm(rp.get('if', '')) != REPO_GATE:
        errors.append(f'job `release-please` `if` must be exactly: {REPO_GATE}')
    if 'actions' in (rp.get('permissions') or {}):
        errors.append('job `release-please` (third-party action) must not have `actions`')
    if (rp.get('permissions') or {}) != {'contents': 'write', 'pull-requests': 'write'}:
        errors.append('job `release-please` permissions must be exactly {contents: write, pull-requests: write}')
    outs = rp.get('outputs') or {}
    for k in ('release_created', 'tag_name'):
        if k not in outs:
            errors.append(f'job `release-please` must expose output `{k}`')

    pub = jobs.get('publish')
    if not pub:
        errors.append('job `publish` (dispatch of npm-publish.yml) is missing')
    else:
        need = pub.get('needs')
        if 'release-please' not in ([need] if isinstance(need, str) else (need or [])):
            errors.append('job `publish` must need `release-please`')
        want_if = REPO_GATE + " && needs.release-please.outputs.release_created == 'true'"
        if norm(pub.get('if', '')) != want_if:
            errors.append(f'job `publish` `if` must be exactly: {want_if}')
        if pub.get('permissions') != {'actions': 'write'}:
            errors.append('job `publish` permissions must be exactly {actions: write}')
        steps = pub.get('steps') or []
        if len(steps) != 1:
            errors.append('job `publish` must have exactly one step')
        else:
            st = steps[0]
            if 'uses' in st or set(st) - {'name', 'env', 'run'}:
                errors.append('job `publish` step must be a plain `run` with `env` only (no checkout, no actions)')
            env = st.get('env') or {}
            if env.get('TAG') != '${{ needs.release-please.outputs.tag_name }}':
                errors.append('dispatch must take TAG from the release tag output')
            if set(env) != {'GH_TOKEN', 'TAG'}:
                errors.append('dispatch env must be exactly {GH_TOKEN, TAG}')
            run = str(st.get('run', ''))
            if TAG_CHECK not in run:
                errors.append('dispatch must validate TAG as vX.Y.Z before use')
            lines = [l.strip() for l in run.strip().splitlines()]
            if DISPATCH not in lines:
                errors.append(f'dispatch must run exactly: {DISPATCH} (the tag, not a branch)')
            if re.search(r'--ref\s+(?!"\$TAG")', run):
                errors.append('every `--ref` in the dispatch job must be "$TAG"')

    ci = jobs.get('ci-release-pr')
    if ci and ci.get('permissions') != {'actions': 'write'}:
        errors.append('job `ci-release-pr` permissions must be exactly {actions: write}')

    for name, j in jobs.items():
        if name != 'release-please' and name != 'publish' and name != 'ci-release-pr':
            errors.append(f'unexpected job `{name}`')
        perms = (j or {}).get('permissions')
        if not isinstance(perms, dict):
            errors.append(f'job `{name}` must give an explicit permissions map')
        elif 'id-token' in perms:
            errors.append(f'job `{name}` must not have `id-token`')

    for e in errors:
        print(f'{path}: {e}')
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))
