# sporty-docs — agent instructions

The SportyPlus docs site: Docus + `@nuxt/content` 3. **This directory is its own git
repo**, checked out inside `Inspirium/sporty`'s working tree and gitignored there — so
`git` commands run here act on *this* repo, not on `sporty`. Verify with `git remote -v`
before committing.

## Related repos — resolve them, never clone them

These repos are one system, and work here often has to read or change another one. On any
machine that has been set up, **the other repos are already cloned** — so a fresh clone is
the wrong move twice over: it costs a large download, and edits land in a throwaway tree
that is never pushed while the real checkout sits untouched.

Resolve one by its GitHub slug. Never write a checkout path into this file or any other
committed file — it is correct only on its author's machine, and it fails silently:

```bash
cd "$(repo-path Inspirium/tennis-web)"      # exits non-zero rather than guessing
```

| Slug | What it is |
| --- | --- |
| `Inspirium/sporty` | Laravel 13 API in `backend/`, Nuxt 4 CMS/admin in `frontend/`. Often cloned as `tenis`. |
| `Inspirium/tennis-laravel` | The **member app's** Laravel 13 API (Passport), behind `api.sporty.plus/api/v3`. Often cloned as `hts`; its `composer.json` is still named `inspirium/hts`. |
| `Inspirium/sporty-app` | The member app — Nuxt **2.17** / Vue 2.7, web + Capacitor iOS/Android. Often cloned as `tennis-frontend`. |
| `Inspirium/tennis-web` | Nuxt 4 marketing site and blog behind `sporty.plus`. Blog articles are authored **here**. |
| **`Inspirium/sporty-docs`** | **this repo** — Docs site — Docus + `@nuxt/content` 3. Commonly checked out **inside** `sporty`'s working tree at `docs/`, where it is gitignored. |
| `Inspirium/sporty-vision` | Court-video analytics worker — Python 3.12, OpenCV, PyTorch. Not a web app. |
| `Inspirium/claude-plugins` | The shared Claude Code skills, and the `repo-path` helper itself. |

`repo-path` ships with the `infra` plugin from the `Inspirium/claude-plugins` marketplace
and is on `PATH`. Three rules when it can't find something:

- **Don't guess from a directory name.** These repos predate their current names, so the
  folder is not evidence: `tenis` is `sporty`, `hts` is `tennis-laravel`, `tennis-frontend`
  is `sporty-app`. Identify a checkout by its git remote (`git remote -v`) — and note that
  some use a remote named `gh-origin` rather than `origin`.
- **Don't search the filesystem for something plausible.** A stale second clone looks
  exactly like the right answer. If `repo-path` fails, the location is genuinely unknown:
  ask, then `repo-path --record <slug> <path>` so it is never asked again.
- **Only clone when it truly isn't here.** `/infra:setup <owner/repo>` proposes a path,
  confirms, clones once, and records it.

If `repo-path` isn't available at all (a non-Claude agent, or the plugin isn't installed),
ask for the path — don't clone, and don't fall back to a guess.
