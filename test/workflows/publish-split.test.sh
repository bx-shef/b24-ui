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
case_ "npm upgrade of the publisher itself"     ok      "s = s.replace('$STEPS_HEAD', '      - run: npm install --global npm@11.6.2\n$STEPS_HEAD')"

echo
echo "$pass passed, $fail failed"
[ "$fail" -eq 0 ]
