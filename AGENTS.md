# AGENTS.md

Personal studio site (Boxz Studio) of the repo owner. Static Astro site on GitHub Pages — no backend, no CMS, no test suite. Content is Markdown with Zod-typed frontmatter (`src/content.config.ts`). Besides code maintenance, the agent is expected to act as the site's content writer (see House writing style).

## Commands

```sh
nvm use                                   # .nvmrc pins Node 22 (matches deploy env)
npm run dev                               # localhost:4321
npm run check                             # astro check — verifies content schema + TS; this is the only gate
npm run build                             # run before pushing
npm run new:content -- journal "Title"    # scaffold; kinds: journal|work|sample|research|evidence|service
npm run import:photos -- private/photo_manifests/<slug>.yaml
```

- Verification = `npm run check` → `npm run build`. There is no lint/test framework.
- `new:content` and `import:photos` hardcode `/Users/bozhongxiao/code/.venv/bin/python` (needs Pillow). If missing, edit the `.md` directly instead of fixing paths.
- Local npm commands never update the live site. Deploy trigger is `git push origin main` → GitHub Actions (`.github/workflows/deploy.yml`, Node 22).

## Publishing gates (most common mistake)

Schema defaults hide content. An item is publicly rendered only when:

- `journal`: `status: "published"` (types in schema: `long_note`, `short_note`, `case_note`, `image_note`, `technical_note`, `research_study` — the schema is truth; older docs list only 4).
- `work`: `visibility: "public"` **and** status ≠ `draft`. `active` → "Current" section; `published` → "Public record".
- `services`, `research`, `samples`, `works`, `visual-series`, `evidence`: public list/detail routes are currently closed placeholders. Content files may exist but will not render publicly.
- Sitemap excludes `/notes/ /research/ /samples/ /services/ /table/ /works/` (filter in `astro.config.mjs`).

## Homepage Selected logic

`src/lib/content-api.ts` `getLatestSelectedItems()` merges: published journal (by `date`) + published work (by `publishedAt`) + `active` work only if `homepageSelected: true` **and** `publishedAt` set. Newest first, top 4 (index.astro passes the limit). A new preprint never appears on the homepage without `publishedAt: YYYY-MM-DD`.

## Where to edit what

- Site chrome (nav, page shells, About/Contact copy): `src/config/site.config.ts`. Chinese comments are maintainer notes; visitor-facing strings stay English. Re-exported via `src/lib/site.ts`.
- Content: `src/content/<collection>/*.md`. Page URL comes from frontmatter `slug`, not filename (some filenames contain spaces).
- Content reading/sorting/filtering: `src/lib/content-api.ts`. Do not bypass these gates in pages.
- Visual system ("09 sterile terminal"): `src/styles/global.css` + `src/components/studio/`. Do not restyle casually; the aesthetic depends on restrained hierarchy.
- Renaming a work slug? Add a redirect in `astro.config.mjs` (existing redirects map old slugs).
- Legacy routes `/works`, `/notes`, `/table` are placeholders kept for compatibility.

## House writing style (agent is the site's writer)

- Journal is a writing surface, not a blog. No filler ("水文"), no generic AI commentary, no marketing tone. Every piece needs a concrete thesis or judgment; unfinished work must not be dressed up as achievement.
- Long notes follow the fixed rhythm:

```md
<span class="signal">long note</span> <span class="signal">theme</span>

> One thesis sentence.

## 00 / Entry frame

## 01 / First mechanism

## References
```

- Emphasis is semantic, not decoration: `**…**` = black reverse (central claims only), `*…*` = rust italic, `<u>…</u>`, `<mark>…</mark>` = reverse marker, `<span class="signal">…</span>` = index terms. `>` pull quote: max 1–3 per article.
- `highlights:` frontmatter (3–6 short phrases) renders as black-bg markers atop the article page.
- Sort orders: journal by `date` desc (then `sortOrder` asc); services/research/works by `sortOrder` asc (use 10/20/30 so items can be inserted between).

## Safety boundaries (public static repo)

- Never commit: manuscript PDFs under review, participant names or raw questionnaire data, local absolute paths, résumés/IDs/phone numbers, un-curated photo originals.
- `private/photo_manifests/*.yaml` is gitignored. Photo import generates `src/assets/visual-series/<slug>/` + `src/data/visual-series/<slug>.json`.
- GitHub Pages cannot collect form responses. Questionnaires must use `questionnaire.status: "external_link"` + `questionnaire.href` (Tally/Forms/etc.).

## MAD EATER serial

Episode links live in `src/content/work/mad-eater.md` in the `links:` array, entries like `label: "EP03 / YouTube"`. Leave `href: ""` for platforms where an episode is not yet published — the panel renders it inactive instead of a broken link. Panel sorts by episode number.

## Git & deploy

- `origin` has two push URLs: `git push origin main` publishes to `boxz-studio/boxz-studio.github.io` (live) and mirrors to `Atomheart-Father/Atomheart-Father.github.io`.
- Check deploys: `gh run list --repo boxz-studio/boxz-studio.github.io --limit 5`.
- Never commit `dist/` or `.astro/` (gitignored).

## Deeper docs

- `docs/content-interface.md` — short English content interface.
- `docs/site-usage-guide.md` — detailed Chinese operating manual (field-by-field frontmatter reference, workflow).
- When docs disagree with code, verify against `src/content.config.ts` and `src/lib/content-api.ts` first (docs have drifted, e.g. journal types).
