#!/usr/bin/env python3
"""Fail unless npm-publish.yml keeps the publishing identity away from code.

The job that holds `id-token: write` can mint an OIDC token, and through the
npm Trusted Publisher that token is a licence to publish. Anything that runs in
that job can ask for it. So the guard is an ALLOW-LIST, not a deny-list: the
`publish` job may contain exactly the steps below, in this order, and the `run`
bodies must equal the reference text kept here. A deny-list of "bad commands"
is bypassed by any new spelling (`npm i -g npm@x left-pad`, `node evil.mjs`,
`curl | sh`, `echo "npm publish"`); a byte-for-byte reference is not.

Also enforced: only `publish` may have `id-token`; no `write-all` anywhere; the
other jobs keep exactly the permissions they have today.

Usage: assert-publish-split.py <path to npm-publish.yml>
Covered by test/workflows/publish-split.test.sh. Changing a publish step means
changing the reference text below on purpose, in the same PR.
"""
import re
import sys

import yaml

SHA_USES = r'@[0-9a-f]{40}$'
NODE_PIN = re.compile(r'^\d+\.\d+\.\d+$')  # exact release, not `24` or `lts/*`

# Reference `run` bodies of the publish job (compared after strip()).
RUN_NPM_VERSION = r'''ver=$(npm --version)
if [ "$(printf '%s\n' 11.5.1 "$ver" | sort -V | head -n1)" != "11.5.1" ]; then
  echo "::error::npm $ver is older than 11.5.1 (trusted publishing); bump the pinned node-version"
  exit 1
fi
echo "npm $ver"'''

RUN_VERIFY = r'''if [ "$REF_TYPE" != "tag" ]; then
  echo "::error::publishing is only allowed from a tag, got $REF_TYPE $REF_NAME"
  exit 1
fi
if ! [[ "$TARBALL" =~ ^[A-Za-z0-9._-]+\.tgz$ ]]; then
  echo "::error::unexpected tarball name"
  exit 1
fi
if [ "$(ls -A dist-tarball)" != "$TARBALL" ] || [ ! -f "dist-tarball/$TARBALL" ] || [ -L "dist-tarball/$TARBALL" ]; then
  echo "::error::dist-tarball must contain exactly the regular file $TARBALL"
  exit 1
fi
manifest=$(tar -xzOf "dist-tarball/$TARBALL" package/package.json)
name=$(printf '%s' "$manifest" | node -p "JSON.parse(require('fs').readFileSync(0, 'utf8')).name")
version=$(printf '%s' "$manifest" | node -p "JSON.parse(require('fs').readFileSync(0, 'utf8')).version")
if [ "$name" != "@bxshefby/b24ui-nuxt" ]; then
  echo "::error::tarball package name is $name, expected @bxshefby/b24ui-nuxt"
  exit 1
fi
if [ "v$version" != "$REF_NAME" ]; then
  echo "::error::tarball version v$version does not match tag $REF_NAME"
  exit 1
fi'''

RUN_PUBLISH = r'''npm publish "dist-tarball/$TARBALL" --provenance --access public'''

# Step keys other than these (`if`, `env`, `working-directory`,
# `continue-on-error`, `timeout-minutes`...) change what or whether a step runs.
STEP_KEYS = {'name', 'id', 'uses', 'with', 'run', 'shell'}
# Values too, not only names: `REF_TYPE: tag` would switch off the tag-only check in `verify`.
EXPECTED_JOB_ENV = {
    'TARBALL': '${{ needs.build.outputs.tarball }}',
    'REF_TYPE': '${{ github.ref_type }}',
    'REF_NAME': '${{ github.ref_name }}',
}
EXPECTED_JOB_ENV_KEYS = set(EXPECTED_JOB_ENV)
REPO_GATE = "github.repository == 'bx-shef/b24-ui' && vars.NPM_RELEASE == 'true'"
# Whitespace-normalised `if:` of the jobs that gate publishing (the repository,
# the NPM_RELEASE switch, and a tag for the first job; no approval is involved).
EXPECTED_IF = {
    'await-ci': REPO_GATE + " && startsWith(github.ref, 'refs/tags/v')",
    'publish': REPO_GATE + " && needs.build.outputs.skip == 'false'",
}
JOB_PERMISSIONS = {
    'await-ci': {'contents': 'read', 'actions': 'read'},
    'build': {'contents': 'read'},
    'publish': {'contents': 'read', 'id-token': 'write'},
}


def check_publish(job, errors):
    needs = job.get('needs')
    if 'build' not in ([needs] if isinstance(needs, str) else (needs or [])):
        errors.append('job `publish` must need `build`')
    if job.get('environment') != 'npm-publish':
        errors.append('job `publish` must run in the `npm-publish` environment')
    env = job.get('env')
    if not isinstance(env, dict) or env != EXPECTED_JOB_ENV:
        errors.append(f'job `publish` env must be exactly {EXPECTED_JOB_ENV}')
    if job.get('runs-on') != 'ubuntu-latest':
        errors.append('job `publish` must run on `ubuntu-latest` (a GitHub-hosted runner)')
    for key in ('container', 'services', 'defaults', 'strategy', 'continue-on-error'):
        if key in job:
            errors.append(f'job `publish` must not set `{key}`')

    steps = job.get('steps') or []
    ids = [s.get('id') for s in steps]
    want = ['download', 'node', 'npm-version', 'verify', 'publish']
    if ids != want:
        errors.append(f'job `publish` steps must be exactly {want}, got {ids}')
        return
    by = dict(zip(ids, steps))

    for s in steps:
        extra = set(s) - STEP_KEYS
        if extra:
            errors.append(f'step `{s["id"]}`: unexpected keys {sorted(extra)}')

    dl = by['download']
    if not re.match(r'^actions/download-artifact' + SHA_USES, str(dl.get('uses', ''))):
        errors.append('step `download` must be actions/download-artifact pinned by sha')
    if dl.get('with') != {'name': 'npm-tarball', 'path': 'dist-tarball'}:
        errors.append('step `download` `with` must be exactly {name: npm-tarball, path: dist-tarball} '
                      '(no run-id / github-token / repository / other path)')

    nd = by['node']
    if not re.match(r'^actions/setup-node' + SHA_USES, str(nd.get('uses', ''))):
        errors.append('step `node` must be actions/setup-node pinned by sha')
    w = nd.get('with') or {}
    if set(w) != {'node-version', 'registry-url'}:
        errors.append('step `node` `with` must be exactly {node-version, registry-url} (no cache)')
    if not NODE_PIN.match(str(w.get('node-version', ''))):
        errors.append('step `node` node-version must be an exact X.Y.Z release')
    if w.get('registry-url') != 'https://registry.npmjs.org':
        errors.append('step `node` registry-url must be https://registry.npmjs.org')

    for sid, ref in (('npm-version', RUN_NPM_VERSION), ('verify', RUN_VERIFY), ('publish', RUN_PUBLISH)):
        s = by[sid]
        if 'uses' in s or 'with' in s:
            errors.append(f'step `{sid}` must be a plain `run` step')
        if str(s.get('run', '')).strip() != ref.strip():
            errors.append(f'step `{sid}`: `run` differs from the reference in assert-publish-split.py')
        if s.get('shell', 'bash') != 'bash':
            errors.append(f'step `{sid}`: shell must be bash')


def main(path: str) -> int:
    with open(path, encoding='utf-8') as fh:
        wf = yaml.safe_load(fh)
    errors = []

    wperm = wf.get('permissions')
    if wperm != {'contents': 'read'}:
        errors.append('workflow-level permissions must be exactly {contents: read}')
    for key in ('env', 'defaults'):
        if key in wf:
            errors.append(f'workflow-level `{key}` is not allowed (it reaches the publishing job)')

    jobs = wf.get('jobs') or {}
    for name, j in jobs.items():
        j = j or {}
        perms = j.get('permissions')
        if isinstance(perms, str):
            errors.append(f'job `{name}`: permissions given as a string ({perms}); use an explicit map')
            continue
        if name != 'publish' and isinstance(perms, dict) and 'id-token' in perms:
            errors.append(f'job `{name}` must not have `id-token` (only `publish` may)')
        if name in JOB_PERMISSIONS and perms != JOB_PERMISSIONS[name]:
            errors.append(f'job `{name}` permissions must be exactly {JOB_PERMISSIONS[name]}')
        if name not in JOB_PERMISSIONS and perms is not None:
            errors.append(f'unexpected job `{name}` with its own permissions')

    for name, want in EXPECTED_IF.items():
        got = ' '.join(str((jobs.get(name) or {}).get('if', '')).split())
        if got != want:
            errors.append(f'job `{name}` `if` must be exactly: {want}')

    # Only a dispatch may start a publish: a `release` event (hand-made release)
    # or a push must not reach npm now that no reviewer stands in between.
    triggers = wf.get('on', wf.get(True))
    if not isinstance(triggers, dict) or set(triggers) != {'workflow_dispatch'}:
        errors.append('npm-publish.yml must be triggered by `workflow_dispatch` only')

    if 'publish' not in jobs:
        errors.append('job `publish` is missing')
    else:
        check_publish(jobs['publish'], errors)
    if 'environment' in (jobs.get('build') or {}):
        errors.append('job `build` must not use the publishing environment')

    for e in errors:
        print(f'{path}: {e}')
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))
