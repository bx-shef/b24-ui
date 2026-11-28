#!/usr/bin/env python3
"""Учёт одного порта nuxt/ui: запись в реестре, журнал, снимок dep-parity.

Запуск из корня репозитория:
  python3 .sync/ledger.py <sha> <port|no-op|skip|n/a> "<summary>" < журнал.md

Текст журнала — со стандартного ввода; `{SHA}` в нём заменяется полным SHA.
Зеркало nuxt/ui — переменная NUXT_UI_MIRROR (по умолчанию ../nuxt-ui).
Курсор переводится на этот коммит, запись в `processed` — с `pr`/`b24ui_sha`
`pending-merge`; сверка с номером PR — после мержа (§6 п. 4 PORTING.md).
"""
import json
import os
import subprocess
import sys

DECISIONS = ('port', 'no-op', 'skip', 'n/a')

if len(sys.argv) != 4 or sys.argv[2] not in DECISIONS:
    sys.exit(__doc__)
short, decision, summary = sys.argv[1:4]
mirror = os.environ.get('NUXT_UI_MIRROR', '../nuxt-ui')
full = subprocess.check_output(['git', '-C', mirror, 'rev-parse', short + '^{commit}'], text=True).strip()

ledger_path = '.sync/nuxt-ui.json'
with open(ledger_path, encoding='utf-8') as f:
    ledger = json.load(f)
ledger['processed'][full] = {'pr': 'pending-merge', 'b24ui_sha': 'pending-merge', 'decision': decision, 'summary': summary}
ledger['cursor'] = full
with open(ledger_path, 'w', encoding='utf-8') as f:
    f.write(json.dumps(ledger, indent=2, ensure_ascii=False) + '\n')

with open(f'.sync/log/{full}.md', 'w', encoding='utf-8') as f:
    f.write(sys.stdin.read().replace('{SHA}', full))

snapshot = subprocess.check_output(['node', '.sync/dep-parity.mjs', mirror], text=True)
with open('.sync/dep-parity.json', 'w', encoding='utf-8') as f:
    f.write(snapshot if snapshot.endswith('\n') else snapshot + '\n')

print(full)
