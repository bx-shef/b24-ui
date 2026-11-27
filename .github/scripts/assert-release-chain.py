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
RP_IF = REPO_GATE + " && github.ref == 'refs/heads/main'"
CI_IF = REPO_GATE + " && needs.release-please.outputs.prs_created == 'true'"
PUB_IF = REPO_GATE + " && needs.release-please.outputs.release_created == 'true'"
# Reference `run` bodies, compared whole (after strip()), not by substrings.
DISPATCH_RUN = r'''[[ "$TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.]+)?$ ]] || { echo "::error::unexpected tag '$TAG'"; exit 1; }
gh workflow run npm-publish.yml --repo "$GITHUB_REPOSITORY" --ref "refs/tags/$TAG"'''
CI_RUN = '''gh workflow run ci.yml --repo "$GITHUB_REPOSITORY" --ref "$BRANCH"'''
JOB_FORBIDDEN = ('env', 'defaults', 'container', 'services', 'strategy', 'continue-on-error')


def norm(x):
    return ' '.join(str(x).split())


def main(path):
    wf = yaml.safe_load(open(path, encoding='utf-8'))
    errors = []
    jobs = wf.get('jobs') or {}

    if wf.get('permissions') != {'contents': 'read'}:
        errors.append('workflow-level permissions must be exactly {contents: read}')

    rp = jobs.get('release-please') or {}
    if norm(rp.get('if', '')) != RP_IF:
        errors.append(f'job `release-please` `if` must be exactly: {RP_IF}')
    if (rp.get('permissions') or {}) != {'contents': 'write', 'pull-requests': 'write'}:
        errors.append('job `release-please` (third-party action) permissions must be exactly '
                      '{contents: write, pull-requests: write}, no `actions`')
    outs = rp.get('outputs') or {}
    for k in ('release_created', 'tag_name', 'prs_created', 'pr_branch'):
        if k not in outs:
            errors.append(f'job `release-please` must expose output `{k}`')

    def need_rp(job, name):
        need = job.get('needs')
        if 'release-please' not in ([need] if isinstance(need, str) else (need or [])):
            errors.append(f'job `{name}` must need `release-please`')

    def one_step(job, name):
        steps = job.get('steps') or []
        if len(steps) != 1:
            errors.append(f'job `{name}` must have exactly one step')
            return None
        st = steps[0]
        if 'uses' in st or set(st) - {'name', 'env', 'run'}:
            errors.append(f'job `{name}` step must be a plain `run` with `env` only (no checkout, no actions)')
        return st

    pub = jobs.get('publish')
    if not pub:
        errors.append('job `publish` (dispatch of npm-publish.yml) is missing')
    else:
        need_rp(pub, 'publish')
        if norm(pub.get('if', '')) != PUB_IF:
            errors.append(f'job `publish` `if` must be exactly: {PUB_IF}')
        if pub.get('permissions') != {'actions': 'write'}:
            errors.append('job `publish` permissions must be exactly {actions: write}')
        for k in JOB_FORBIDDEN:
            if k in pub:
                errors.append(f'job `publish` must not set `{k}`')
        st = one_step(pub, 'publish')
        if st:
            if st.get('env') != {'GH_TOKEN': '${{ secrets.GITHUB_TOKEN }}',
                                 'TAG': '${{ needs.release-please.outputs.tag_name }}'}:
                errors.append('dispatch env must be exactly {GH_TOKEN: GITHUB_TOKEN, TAG: the release tag output}')
            if str(st.get('run', '')).strip() != DISPATCH_RUN.strip():
                errors.append('dispatch `run` differs from the reference in assert-release-chain.py '
                              '(tag check + `--ref "refs/tags/$TAG"`)')

    ci = jobs.get('ci-release-pr')
    if ci:
        need_rp(ci, 'ci-release-pr')
        if norm(ci.get('if', '')) != CI_IF:
            errors.append(f'job `ci-release-pr` `if` must be exactly: {CI_IF}')
        if ci.get('permissions') != {'actions': 'write'}:
            errors.append('job `ci-release-pr` permissions must be exactly {actions: write}')
        for k in JOB_FORBIDDEN:
            if k in ci:
                errors.append(f'job `ci-release-pr` must not set `{k}`')
        st = one_step(ci, 'ci-release-pr')
        if st:
            if st.get('env') != {'GH_TOKEN': '${{ secrets.GITHUB_TOKEN }}',
                                 'BRANCH': '${{ needs.release-please.outputs.pr_branch }}'}:
                errors.append('ci-release-pr env must be exactly {GH_TOKEN, BRANCH from outputs.pr_branch}')
            if str(st.get('run', '')).strip() != CI_RUN:
                errors.append('ci-release-pr `run` differs from the reference')

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
