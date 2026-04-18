# Chromi Kingdom

Chromi Kingdom is a content-first Astro site being rebuilt as a research-driven AI Studio front door.
The architecture is typed, modular, and file-based so services, samples, research notes, and dossier records can be added without editing page code.

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
| `npm run new:content -- sample "Title"` | Create a typed article/sample/research/evidence/service entry |
| `npm run import:photos -- private/photo_manifests/<slug>.yaml` | Import curated photo manifests into site assets |

## Studio content workflow

The main content interface is documented in `docs/content-interface.md`.

Content collections:

- `src/content/services`: three bounded front-door services
- `src/content/research`: under-review work, working papers, memos, essays, notes
- `src/content/samples`: public samples and articles
- `src/content/evidence`: dossier records and external proof

Create a new public sample:

```sh
npm run new:content -- sample "Why vague AI demand should not start with a chatbot"
```

Then edit the generated Markdown file, switch `status` to `published` when ready, and run `npm run check`.

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
