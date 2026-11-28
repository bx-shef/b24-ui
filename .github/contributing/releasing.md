# Releasing

Releases are automated up to two human actions, in this order: **approve the
release PR's held CI run, then merge it**. The merge is the decision this
pipeline exists to leave with a person, and it is the *only* one: **there is no
approval of the publication** (owner decision, #63, as in bx-shef/b24-js-sdk).
Merging the release PR tags the commit and `release-please.yml` dispatches
`npm-publish.yml` on that tag, which publishes `@bxshefby/b24ui-nuxt` to npm.
Approving the release PR's held `ci` run is a click, not a decision, and the
publication does not wait for any confirmation. What goes to npm is therefore decided on the release PR, before the merge: read
its diff and CHANGELOG.

**If the release PR is sitting at `blocked` while its `ci` check is green, that
is what you are looking at.** See
[Approving the release PR's CI](#approving-the-release-prs-ci).

Three repository settings have to be right for any of this to work, and none of
them fails loudly. They are listed under
[Repository settings this depends on](#repository-settings-this-depends-on).

## The normal path

1. **Merge work into `main`** with conventional-commit subjects (`feat:`, `fix:`,
   `docs:`, `ci:`, …). Nothing is published at this point.
2. **release-please keeps one release PR open**, titled `chore(main): release
   X.Y.Z`. It contains nothing but the version bump (`package.json` and
   `.release-please-manifest.json`) and the new CHANGELOG section assembled from
   the commits since the last tag. Every push to `main` rewrites that same PR —
   fifteen merged fixes update it fifteen times, they do not cut fifteen
   releases.
3. **Approve the held CI run, then merge — in that order.** Merging the release
   PR is the release: it tags the commit, publishes the GitHub Release with those
   notes, and (job `publish` of `release-please.yml`, the only one with
   `actions: write`) dispatches `npm-publish.yml` against the tag — nothing waits
   for an approval after the merge. It will not be
   mergeable until you approve its held `ci` run; see
   [Approving the release PR's CI](#approving-the-release-prs-ci). Merge it the
   way every other PR here is merged — squash. release-please keys off the merged
   PR's `merge_commit_sha` from the API, not off the shape of the commit graph,
   so squashing does not orphan anything.
4. **`npm-publish.yml` publishes** after asserting the commit is merged `main`
   history and waiting for CI to be green on that exact SHA. It runs only from a
   `v*` tag, only for `bx-shef/b24-ui` and only with the repository variable
   `NPM_RELEASE=true`. Publishing goes through npm trusted publishing (OIDC) —
   there is no long-lived token in the repository.

The npm side of that last step is configured **outside this repository**, in the
package's Trusted Publisher settings on npmjs.com, and it is pinned to the
workflow's filename (`npm-publish.yml`) and the environment name (`npm-publish`).
Renaming either breaks publishing with no signal from here — if you rename the
file or the `npm-publish` environment, update npm to match in the same change.

That binding is also what produces the release's **provenance attestation**.
npm attaches one by itself when the publish authenticates through OIDC, which
is why `@bitrix24/b24ui-nuxt` 2.12.0, published by the parent project, has one although nothing here asked for it. Check a shipped
release with `npm view @bxshefby/b24ui-nuxt@<version> dist.attestations`.

The publish passes `--provenance` regardless, and it is worth being precise
about what that does and does not buy, because the obvious reading is wrong.
It is **not** a tripwire for the binding disappearing: this job holds no npm
token at all, so without OIDC the publish fails at authentication and never
reaches the question of attesting. What the flag guards is the *next* step
someone would take in that situation — adding a `NODE_AUTH_TOKEN` to get
publishing working again. Under token auth npm stops attesting silently, and
with `--provenance` and the `id-token: write` this job already has, it keeps
attesting instead. The flag is what makes provenance a property of this file
rather than of a setting on npmjs.com.

If a publish ever fails *on the flag itself* — npm rejecting `--provenance`
rather than the package — the release is not lost and does not need the flag
removed in a panic: the tag stays, and re-running `npm-publish.yml` against it
publishes normally. Diagnose it before dropping the flag, because "npm refused
to attest this publish" is exactly the condition it exists to report.

So the only *decision* a human makes is **when to merge the release PR**. Its
description is the changelog you are about to ship: read it, approve the held CI
run, and merge.

**The commitment is two weeks.** An open release PR should not outlive it, and
`release-watchdog.yml` reports one that does. The number lives in that workflow's
`MAX_OPEN_DAYS`; if the team's cadence changes, change both.

While the PR is open it doubles as a live list of what is fixed on `main` and not
yet on npm. That is deliberate — issue #315 exists because a crash fix sat
unreleased for five weeks with nothing surfacing the fact.

## Approving the release PR's CI

**The symptom:** the release PR sits at `blocked` while its `ci` check is
**green**, and merging is refused with

```
Required status check "ci" is expected
```

Two things cause that combination. Check them in this order.

### Cause 1 — a run is held, awaiting approval

The green `ci` you can see is the run `release-please.yml` dispatches. Separately
GitHub creates a `pull_request` run for the PR and holds it at
`action_required`. A held run creates no jobs, and therefore no check run, so it
is invisible on the *Checks* tab — but branch protection is still waiting on it.

This is specific to the bot's branch: ordinary PRs start their CI unattended, and
across the last 30 `pull_request` runs every one on `release-please--**` was held
while none of the others were.

**What to do — immediately before you merge, not earlier.** Go to **Actions →**
the held `ci` run on the `release-please--…` branch and approve it. GitHub also
surfaces the control on the PR itself — *Files changed* → **Awaiting approval**,
or the merge box on *Conversation* — and has labelled the button both
**Approve and run** and **Approve workflows to run**. The run takes about eight
minutes. Then merge.

**Why the ordering.** An approval attaches to a run, and a run attaches to a
commit. Any push to `main` regenerates the release PR onto a new head, stranding
the approval on a commit that is no longer the head while a fresh held run
appears on the new one — up to nine of them in a day here. So approving early to
"have it ready" is wasted within the hour, and **if `main` moves while your run
is in flight, approve the new held run and start the eight minutes over**. On a
busy day that means pausing merges to `main` until the release is out.

### Cause 2 — the branch is behind

If the head commit carries a green `ci` and nothing is held, the PR is simply out
of date with `main`. Update the branch and let `ci` re-run on the new head.

### Why there is no workflow-file fix worth taking

Recorded so nobody re-derives it (#353). Skip unless you are about to try one.

- `branches` and `branches-ignore` are mutually exclusive for one event, and for
  `pull_request` the filter matches the *base* branch — so a head-branch pattern
  matches nothing.
- A job-level `if` on `github.head_ref`, which is GitHub's own prescribed way to
  branch on the head, never evaluates: a held run creates no jobs at all.
- **Do not drop `ci` from required checks.** It would work, and it is a bad
  trade — it removes the merge gate from every PR into `main` to accommodate one
  bot PR, and the publish gate does not compensate, because it protects npm, not
  `main`.
- **Do not have a workflow post a commit status named `ci`.** `GITHUB_TOKEN` can
  `POST /repos/{owner}/{repo}/statuses/{sha}`, and a commit status satisfies a
  required check exactly as a check run does. It works — which is what makes it
  dangerous, because it fabricates the signal the gate exists to carry. Refused
  on purpose; written down so the next person finds the reason and not just the
  trick.

Two routes are unexplored rather than ruled out: adding `merge_group:` to
`ci.yml` behind a merge queue, and the repository or organisation setting that
governs when Actions demands approval at all. Neither has been tried here.

## Repository settings this depends on

None of these is in version control, and none fails loudly.

- **Settings → Actions → General → Workflow permissions →** *Allow GitHub
  Actions to create and approve pull requests*. Without it release-please cannot
  open the release PR at all; the run fails with `GitHub Actions is not
  permitted to create or approve pull requests`. This one gates the pipeline
  existing.
- **Branch protection on `main` requiring the `ci` check.** This is what makes a
  held run block the merge, and therefore what makes the approval above
  necessary. Deliberate — read the trade above before changing it.
- **Settings → Labels → `severity:crash`.** This one gates nothing in the release
  path; it only arms the watchdog's 48-hour threshold, and it fails silently when
  absent. See [What is watched automatically](#what-is-watched-automatically).

## Первый выпуск `@bxshefby/b24ui-nuxt`

Пакет выпускается как `@bxshefby/b24ui-nuxt`, следом за `@bitrix24/b24ui-nuxt`
2.15.0. Тег и GitHub Release `v2.16.0` есть, но в npm 2.16.0 не попала: шаг
`publish` передавал npm путь к архиву без `./`, и npm принял его за репозиторий
GitHub `owner/repo` (`git ls-remote ssh://git@github.com/dist-tarball/…`).
Перезапуск на `v2.16.0` берёт workflow с тега, а тег правило `v*` двигать не
даёт, поэтому **первая версия в реестре — 2.16.1**. `bootstrap-sha` — коммит
`chore(main): release 2.15.0` (`9d98b4a9`): тегов прошлых выпусков в этом
репозитории нет, и без него журнал первого выпуска повторил бы историю родителя.

Доверенную публикацию (OIDC) npmjs.com настраивает только у пакета, который уже
есть в реестре. Поэтому руками публикуется **заглушка**, а сама 2.16.0 выходит
из CI — с provenance и через все проверки `npm-publish.yml`.

1. **Правило на теги — обязательное условие до `NPM_RELEASE=true`**
   (*Settings → Rules → Rulesets → New tag ruleset*, правило `v*`): цель `v*`,
   *Restrict updates*, *Restrict deletions*, *Block force pushes*; *Restrict
   creations* — **выключено**: приложение GitHub Actions в список обхода
   репозитория добавить нельзя, а тег `vX.Y.Z` ставит release-please токеном
   Actions. Выпущенный тег никто не передвинет и не удалит. Создать новый `v*`
   может любой с правом записи — пока оно только у владельца (решение владельца
   2026-11-28), это не дыра. Тот, кто создаст `v*` на своём коммите со своей
   копией `npm-publish.yml` (без `await-ci` и `verify`) и запустит её, опубликует
   свой код: Trusted Publisher привязан лишь к имени файла и окружению. Поэтому
   **право записи никому не выдавать**, пока создание `v*` не закрыто (обход для
   Actions появится — включить *Restrict creations*, в обход — владелец и
   GitHub Actions). Пока правила нет, `NPM_RELEASE=true` не ставить.
   Рекомендуется также ruleset на ветку `main` (pull request и проверка `ci`
   обязательны, без прямых пушей и force-push).
2. **Окружение `npm-publish`** (*Settings → Environments → New environment*):
   *Deployment branches and tags* → *Selected branches and tags* → добавить
   `main` (ветка) и `v*` (тег); *Required reviewers* — **нет** (решение
   владельца: выпуск без одобрения, слияние release PR само публикует пакет).
   Окружение нужно, потому что к его имени привязан Trusted Publisher.
3. **Заглушка** — с машины, где выполнен `npm login` под владельцем scope
   `@bxshefby`, в пустом каталоге:

   ```sh
   echo '{"name":"@bxshefby/b24ui-nuxt","version":"0.0.0-reserve","description":"Reserved name; use ^2.16.0","license":"MIT","repository":{"type":"git","url":"git+https://github.com/bx-shef/b24-ui.git"}}' > package.json
   npm publish --access public --tag reserve
   npm deprecate @bxshefby/b24ui-nuxt@0.0.0-reserve "Заглушка имени — используйте @bxshefby/b24ui-nuxt@^2.16.0"
   ```

4. **Trusted Publisher.** npmjs.com → пакет `@bxshefby/b24ui-nuxt` → Settings →
   Trusted Publisher → GitHub Actions:
   - *Organization or user*: `bx-shef`
   - *Repository*: `b24-ui`
   - *Workflow filename*: `npm-publish.yml` (только имя файла)
   - *Environment name*: `npm-publish`
   - *Allowed actions*: отметить `npm publish`, `npm dist-tag` не отмечать.

   Ниже, в *Publishing access* — *Require two-factor authentication and
   disallow bypass 2fa tokens*: доверенной публикации это не мешает. Поля
   сравниваются с учётом регистра, и npm их при сохранении не проверяет:
   ошибка видна только на публикации. `repository.url` в `package.json` должен
   указывать на `bx-shef/b24-ui` — иначе npm откажет в provenance.

   Токен публикации есть только у job `publish` (`id-token: write`, окружение
   `npm-publish`): он без checkout и без `pnpm install` скачивает готовый
   tarball из job `build` (там `contents: read`, без `id-token`) и выполняет
   `npm publish --provenance`. Поля Trusted Publisher от этого не меняются:
   workflow и окружение те же. В `publish` разрешён только белый список шагов
   (`.github/scripts/assert-publish-split.py`, тексты шагов сверяются с
   эталоном), Node закреплён точной версией с npm не ниже 11.5.1; публикует
   только тег: имя пакета и версия внутри tarball сверяются с
   `@bxshefby/b24ui-nuxt` и тегом.

   Условие запуска публикации — `github.repository == 'bx-shef/b24-ui' &&
   vars.NPM_RELEASE == 'true'`, и только тег `v*` (workflow запускается только
   через `workflow_dispatch`; события `release` и `push` его не запускают, так
   что вручную созданный GitHub Release ничего не публикует).

   **Принятый остаточный риск (одобрения нет):** содержимое tarball собирает
   `build`, где выполняется код зависимостей. Целостность публикуемого держится
   на (а) сверке имени и версии tarball с `@bxshefby/b24ui-nuxt` и тегом,
   (б) ревью release PR и всего, что влито в `main`, перед слиянием, (в) том,
   что токен публикации есть только у job `publish` без checkout и install.
   Ждущего человека между слиянием и npm нет.

   Всё это держится на том, что **право записи в репозиторий — только у
   владельца**: любой с правом записи и правом создавать теги `v*` может
   опубликовать свой код (см. п. 1), а `workflow_dispatch` для
   `release-please.yml` с любой ветки запускает её копию с `contents: write` и
   `actions: write` (условие `github.ref == 'refs/heads/main'` в job — не защита,
   копия его уберёт). Права записи не раздавать без ruleset на теги и `main`.
5. **Settings → Actions → General → Workflow permissions** → *Allow GitHub
   Actions to create and approve pull requests* (без неё release-please не
   откроет PR) и **Settings → Secrets and variables → Actions → Variables:**
   `NPM_RELEASE=true` (включает и release-please, и публикацию).
   **Settings → Advanced Security** → *Private vulnerability reporting* →
   Enable (на него ведёт SECURITY.md).
6. **Выпуск.** release-please открывает PR `chore(main): release X.Y.Z`.
   Одобрить задержанный `ci` PR и смержить: слияние — единственное действие,
   тег публикуется сам (имя файла tarball — `bxshefby-b24ui-nuxt-*.tgz`, оно
   берётся из `pnpm pack`; npm получает его как `./dist-tarball/…` — без `./`
   npm ищет репозиторий GitHub). Проверка — `npm view @bxshefby/b24ui-nuxt
   version`, у версии на npmjs.com — значок provenance. `release-as` в
   `release-please-config.json` нет: версию считают коммиты.

## How the version is chosen

| commits since the last tag | next version |
| --- | --- |
| any `BREAKING CHANGE` / `!` | major |
| at least one `feat:` (or its alias `feature:`) | minor |
| otherwise (`fix:`, `revert:`, `docs:`, `ci:`, …) | patch |

The highest wins, and it applies once — fifteen `fix:` commits produce one patch
release, not fifteen. To force a specific version, put `Release-As: 2.12.0` in a
commit footer.

## Hotfix policy

A **crash-class** bug is one where the published package fails to start, or
breaks applications that merely upgrade, with no workaround the user can apply
themselves. #301 is the reference case: every SPA on Nuxt ≥ 4.5.1 died on boot.

When one is confirmed:

1. Label the issue `severity:crash`.
2. Fix it, then **approve the release PR's held CI run and merge it within 48
   hours** — not on the next convenient cadence. The fix reaching `main` is not
   the goal; the fix reaching npm is. Landing the fix regenerates the release PR,
   so the approval has to come after it and immediately before the merge; see
   [Approving the release PR's CI](#approving-the-release-prs-ci).
3. Say so in the issue when it is published, with the version.

The fast lane ships whatever else is on `main` alongside the fix. That is
intended: with releases automated, `main` is rarely far ahead of the last tag, so
the cost is small — and it is far smaller than the alternative, which is what
#301 cost (79 commits shipped as one minor five weeks late, because extracting
the fix retroactively had become the expensive option).

**If `main` is not in a releasable state**, that is itself part of the emergency.
The publish gate requires the commit to be merged `main` history — by design,
since anything else would let an unreviewed commit reach npm — so a hotfix
branched off the last tag cannot be published without disabling that check.

If a *merged change* is what makes `main` unreleasable: revert it, ship the
patch, re-land it afterwards. This is smaller than it sounds, and the reason is
worth saying out loud at 2am — **unreleased work on `main` has no users**.
Reverting it costs nobody anything, and the re-land is a rebase.

**Title the revert `revert(Scope): …`.** GitHub's revert button produces
`Revert "<original subject>"`, which release-please's parser rejects outright. It
never becomes a changelog line — and if it is the only commit since the last tag,
no release PR is opened at all.

```
Revert "feat(Modal): add fullscreen prop"     ->  vanishes
revert(Modal): drop the fullscreen prop       ->  lands under Reverts
```

**Set that subject in the squash-merge dialog, not only in the PR title.** A
revert PR is always a single commit, and for a single-commit PR GitHub may take
the squash subject from the commit rather than from the PR title, depending on
the repository's squash-merge settings. Editing the message box on the merge
button is the route that works either way.

The parse failure is not silent, though nothing surfaces it where you would
look: the Release Please job log carries `commit could not be parsed: <sha>
Revert "…"` on every run. That line is the diagnosis when a changelog entry is
missing.

The `Reverts` section exists (#435), but only a conventional `revert:` subject
reaches it. Two reverts in this repository's history took the `Revert "…"` form;
both predate `bootstrap-sha` and the CHANGELOG's first entry, so nothing
published is missing anything. The sample of reverts under release-please is
zero, which is why this is written down before the first one rather than after.

**A revert does not cancel the commit it undoes.** release-please pairs nothing:
a `feat:` and its `revert:` in the same release window both appear, and the
release is still a minor. Reverting unreleased work therefore produces a
changelog that announces and retracts the same feature — usually fine, but not a
surprise you want at 2am.

**If `ci` on the tag's SHA was cancelled** (the `ci` concurrency group in `main`
cancels a run when the next push arrives), `await-ci` fails and the release stays
unpublished: re-run `ci.yml` on that SHA, then dispatch `npm-publish.yml` on the
tag again. `release-watchdog` reports a tag that is not on npm.

If CI is red for something that is not a revertable commit — a flaky suite, a
broken runner image, a playground build that only fails in `npm-publish.yml` —
there is nothing to revert, and **there is no bypass in the pipeline**. Say it
plainly, because the alternatives look tempting at 2am and none of them work:
`build` declares `needs: await-ci` (and `publish` needs `build`), so a red CI skips the publishing job
entirely — it never queues. There is no approval step to wave it through, and adding one
would not open a door; it only ever closes one.

So the options are the honest two. **Fix the failure** — for a flake, re-running
`ci.yml` on the release commit is usually faster than any workaround, and the
`await-ci` gate polls for thirty minutes, so a re-run that goes green inside that
window needs no further action. **Or accept the delay** and say so on the issue.

If neither is acceptable — a crash-class bug, CI broken for reasons nobody can
fix quickly — the break-glass is a maintainer publishing by hand from a machine
logged in to npm, running the same sequence `npm-publish.yml` does:
`pnpm install --frozen-lockfile`, `pnpm run dev:prepare`, `pnpm build`, then
`pnpm publish --no-git-checks` (CI does the same in `build` with `pnpm pack`,
then `publish` uploads that tarball with `npm publish`). `dev:prepare` is not optional — it emits
`.nuxt/b24ui.static.css`, which `package.json` lists in `files` — and without
`--no-git-checks` the publish is refused outright from a detached checkout. It
is deliberately ugly.
It skips the merged-history assert, the CI gate and npm's provenance, and it
needs a human account with publish rights rather than the repository's OIDC
identity. Do it only as the last step, and open an issue afterwards recording
what was published, from where, and why the pipeline could not. Never edit the
gate out of the workflow to get the same result quietly.

## What is watched automatically

`release-watchdog.yml` runs daily and opens an issue when either of these is
true:

- the release PR has been open for 14 days or more — or **2 days**, when an open
  issue carries `severity:crash`, so the 48-hour promise above has something
  behind it besides memory;
- the latest tag exists but that version is not on npm — i.e. the publish never
  completed. Recovery for that one is Actions → **NPM publish** → *Run workflow*
  with the tag (`v*`) selected as the ref — the same `gh workflow run
  npm-publish.yml --ref <tag>` the release job runs; re-runs are safe, an already-published
  version ends as a green no-op.

The `severity:crash` half of that first line needs the label to exist, and
nothing creates it. It is listed under
[Repository settings this depends on](#repository-settings-this-depends-on) with
the reason it fails silently.

Actions → **Release watchdog** → *Run workflow* takes a day-threshold override.
It is the only way to exercise the reporting path without waiting out the real
threshold: dispatching with `0` reports whatever release PR is currently open.

## Optional hardening

`npm-publish.yml` declares `environment: npm-publish`, and by decision (#63) the
environment has **no** required reviewers: only `main` and `v*` may use it.
Adding reviewers in Settings → Environments would turn the approval back on with
no code change, but then a publication waits for a person after the merge and
the tarball (kept 7 days) can expire before it is approved. Not wanted here.
