# Studio Content Interface

For the detailed Chinese operation guide, see `docs/site-usage-guide.md`.

This site is a static Astro site. There is no database and no live CMS in v1.
The content interface is file-based and intentionally typed:

- `journal`: long notes, short notes, case notes, image notes
- `services`: draft templates for future public work or services
- `research`: future research entries; not publicly routed right now
- `samples`: future samples and articles; not publicly routed right now
- `evidence`: dossier records, public or internal

## Create New Content

From the project root:

```bash
npm run new:content -- journal "Why adoption failure begins before the prototype"
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

## Publish Rules

- A `journal` item appears at `/journal` only when `status: "published"`.
- A `journal` item with `type: "image_note"` is treated as a light visual fragment inside Journal, not as a separate portfolio page family.
- `samples` and `research` remain typed content interfaces, but their public list pages are currently closed to avoid presenting unfinished material.
- An `evidence` item is not displayed publicly unless `visibility: "public"` and `status: "published"`.
- A `service` appears on `/work` only when `status: "active"`. Current service files are `draft`, so Work is hidden from primary navigation and no offer is public.
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
