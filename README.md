# Boxz Studio

**Boxz Studio** is an independent research and creative technology studio exploring the space between artificial intelligence, interactive systems, and digital culture.

We build experiments, research projects, and interactive works around questions such as:

- How should AI systems be designed when they become active participants in complex workflows?
- How can persistent worlds, agents, and narrative systems evolve beyond fixed scripts?
- What new forms of software, games, and creative tools become possible when AI is treated as part of the system rather than simply an interface?

Our work spans **AI research, agentic systems, interactive narrative, game development, and experimental digital media**.

Current projects include research on AI-mediated workflows and system architecture, as well as **REVOLUTION**, an experimental narrative game built around persistent social state, evolving relationships, organisations, and player-driven consequences.

Much of the work here is exploratory. Some projects are published openly as papers, prototypes, or technical notes; others remain in active development.

## Stack

`Python` · `PyTorch` · `LLMs` · `Agents` · `RAG` · `Evaluation` · `Game Systems` · `Web`

---

**Research · Systems · Games · Experiments**

## Studio content workflow

The short content interface is documented in `docs/content-interface.md`.

The detailed Chinese operation guide is documented in `docs/site-usage-guide.md`.

Content collections:

- `src/content/work`: active research projects, public preprints, visual projects, and questionnaire infrastructure
- `src/content/services`: draft templates for future services; not public by default
- `src/content/research`: future research entries; current public page is closed
- `src/content/samples`: future samples and articles; current public page is closed
- `src/content/works`: future works entries; current public detail pages are closed
- `src/content/evidence`: dossier records and external proof

Create a new Work project:

```sh
npm run new:content -- work "New Research Project"
```

Then edit the generated Markdown file, switch `visibility` to `public` and `status` to `active` or `published` when ready, and run `npm run check`.

## MAD EATER episode links

The visual serial is stored in `src/content/work/mad-eater.md`. Add episode links in its existing `links:` field:

```yaml
- label: "EP01 / YouTube"
  href: "https://www.youtube.com/watch?v=..."
  type: "external"

- label: "EP01 / TikTok"
  href: "https://www.tiktok.com/@.../video/..."
  type: "external"
```

Leave `href: ""` when an episode is not available on a platform yet. The page keeps that platform inactive and does not create a broken link. Add the next episode by copying its YouTube and TikTok entries; the page sorts the episode panel by episode number.

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

The GitHub Actions workflow in `.github/workflows/deploy.yml` is configured for GitHub Pages. The production site is published from the organization user-site repository:

`https://boxz-studio.github.io`

Repository:

`https://github.com/boxz-studio/boxz-studio.github.io`

The previous personal repository can remain as a source mirror or backup:

`https://github.com/Atomheart-Father/Atomheart-Father.github.io`
