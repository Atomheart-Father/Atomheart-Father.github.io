# CHLOMEE STUDIO

CHLOMEE STUDIO is a content-first Astro site for public writing and research notes.
The current public surface is deliberately small: Home, Work, Journal, About, and Contact.
The architecture is typed, modular, and file-based so future services, samples, research notes, works, visual series, and dossier records can be prepared without presenting unfinished material.

## Stack

- Astro
- TypeScript
- Tailwind CSS v4
- MDX
- GitHub Pages deployment via `withastro/action`

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production site |
| `npm run check` | Run Astro's type and content checks |
| `npm run preview` | Preview the production build locally |
| `npm run new:content -- work "Title"` | Create a typed work/journal/sample/research/evidence/service entry |
| `npm run import:photos -- private/photo_manifests/<slug>.yaml` | Import curated photo manifests into site assets |

## Studio content workflow

The short content interface is documented in `docs/content-interface.md`.

The detailed Chinese operation guide is documented in `docs/site-usage-guide.md`.

Content collections:

- `src/content/work`: active research projects, field validation, and questionnaire infrastructure
- `src/content/services`: draft templates for future services; not public by default
- `src/content/research`: future research entries; current public page is closed
- `src/content/samples`: future samples and articles; current public page is closed
- `src/content/works`: future works entries; current public detail pages are closed
- `src/content/evidence`: dossier records and external proof

Create a new Work project:

```sh
npm run new:content -- work "New Research Project"
```

Then edit the generated Markdown file, switch `visibility` to `public` and `status` to `active` when ready, and run `npm run check`.

## Photo import workflow

Photography stays in a private archive outside the public site repo. The site only stores curated, web-sized derivatives plus public metadata.

1. Copy `scripts/photo_manifest.example.yaml` into `private/photo_manifests/<slug>.yaml`
2. Fill in absolute source paths and alt text
3. Run:

```sh
npm run import:photos -- private/photo_manifests/<slug>.yaml
```

4. Add or update the matching `src/content/visual-series/<slug>.md` entry when the series is ready to publish

Generated output:

- `src/assets/visual-series/<slug>/`
- `src/data/visual-series/<slug>.json`

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` is configured for GitHub Pages. The site is set up for the user-site repository URL:

`https://atomheart-father.github.io`
