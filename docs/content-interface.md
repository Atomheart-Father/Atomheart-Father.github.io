# Studio Content Interface

For the detailed Chinese operation guide, see `docs/site-usage-guide.md`.

This site is a static Astro site. There is no database and no live CMS in v1.
The content interface is file-based and intentionally typed:

- `journal`: long notes, short notes, case notes, image notes
- `work`: active research projects, field validation, and questionnaire infrastructure
- `services`: draft templates for future consulting/services; not public by default
- `research`: future research entries; not publicly routed right now
- `samples`: future samples and articles; not publicly routed right now
- `evidence`: dossier records, public or internal

## Create New Content

From the project root:

```bash
npm run new:content -- journal "Why adoption failure begins before the prototype"
npm run new:content -- work "Canonical Order in AI Interpretive Pipelines"
npm run new:content -- sample "Why vague AI demand should not start with a chatbot"
npm run new:content -- research "Agentic workflow audit memo"
npm run new:content -- evidence "ODI event follow-up"
npm run new:content -- service "Workshop"
```

The script creates a Markdown file with the correct frontmatter.
Edit the generated file, then run:

```bash
npm run check
npm run build
```

## Markdown Emphasis

Journal and Work bodies are Markdown. Use these patterns directly in `.md` files:

```md
**black reverse emphasis**
*rust italic emphasis*
<u>hard underline emphasis</u>
<mark>black reverse marker</mark>
> A large pull quote for the main thesis.
`small technical term`
<span class="signal">index term</span>
<span class="reverse">manual reverse span</span>
```

Use `>` for one or two thesis sentences per article. Use `**...**` for central claims, not every keyword.

Public long notes and work notes should use the same heading rhythm:

```md
<span class="signal">long note</span> <span class="signal">theme</span>

> One thesis sentence.

## 00 / Entry frame

## 01 / First mechanism

## 02 / Second mechanism

## References
```

## Publish Rules

- A `journal` item appears at `/journal` only when `status: "published"`.
- A `journal` item with `type: "image_note"` is treated as a light visual fragment inside Journal, not as a separate portfolio page family.
- Journal entries are sorted by date, newest first. Use `highlights` for the black-background argument markers on article pages.
- A `work` item appears at `/work` and `/work/<slug>` only when `visibility: "public"` and `status` is not `draft`.
- Work is for the user's own research projects and questionnaire systems. Consulting-style offers should stay in `services` and remain draft unless explicitly reopened.
- Questionnaire links should use `questionnaire.status: "external_link"` plus `questionnaire.href`. Without a backend, GitHub Pages cannot securely collect survey responses by itself.
- `samples` and `research` remain typed content interfaces, but their public list pages are currently closed to avoid presenting unfinished material.
- An `evidence` item is not displayed publicly unless `visibility: "public"` and `status: "published"`.
- A `service` is not rendered on `/work`; current service files are `draft` and reserved for possible future consulting/services.
- `works` and `visual-series` content can be prepared in the repo, but `/works` currently does not generate public detail pages.

## Recommended Workflow

1. Create content with `npm run new:content`.
2. Keep it as `draft` or `private` while writing.
3. Fill only public-safe content.
4. Switch status or visibility when ready.
5. Run checks and build before pushing.

## Why This Structure Exists

The site should not require page-code edits every time a new journal note, article, memo, service, or dossier record is added.
Pages read typed collections through `src/lib/content-api.ts`, and visual components stay in `src/components/studio`.
