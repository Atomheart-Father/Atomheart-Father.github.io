# Studio Content Interface

This site is a static Astro site. There is no database and no live CMS in v1.
The content interface is file-based and intentionally typed:

- `services`: front-door offers
- `research`: under-review work, working papers, memos, essays, notes
- `samples`: public samples and articles
- `evidence`: dossier records, public or internal

## Create New Content

From the project root:

```bash
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

- A `sample` appears at `/samples` only when `status: "published"`.
- A `research` item appears at `/research` only when `visibility: "public"` and `status` is not `draft`.
- An `evidence` item is not displayed publicly unless `visibility: "public"` and `status: "published"`.
- A `service` appears on `/services` only when `status: "active"`.

## Recommended Workflow

1. Create content with `npm run new:content`.
2. Keep it as `draft` or `private` while writing.
3. Fill only public-safe content.
4. Switch status or visibility when ready.
5. Run checks and build before pushing.

## Why This Structure Exists

The site should not require page-code edits every time a new article, sample, memo, service, or dossier record is added.
Pages read typed collections through `src/lib/content-api.ts`, and visual components stay in `src/components/studio`.
