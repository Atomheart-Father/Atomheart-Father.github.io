#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT_ROOT = ROOT / "src" / "content"


TEMPLATES = {
    "sample": {
        "directory": "samples",
        "body": """---
title: "{title}"
slug: "{slug}"
date: {today}
summary: "Replace with a 1-2 sentence public summary."
status: "draft"
template: "diagnosis"
relatedService: "ai-demand-diagnosis-memo"
sortOrder: 100
tags: []
---

## What usually goes wrong

Write the common mistake in plain language.

## How I would decompose the problem

Show the method, not a generic opinion.

## Minimum advice

State the first useful move.

## If this continues

Name the next diagnostic, audit, or brief step.
""",
    },
    "research": {
        "directory": "research",
        "body": """---
title: "{title}"
slug: "{slug}"
summary: "Replace with an abstract-level description."
year: {year}
status: "draft"
category: "memo"
visibility: "private"
featured: false
sortOrder: 100
themes: []
relatedServices: []
---

Write only the public-safe version here.
""",
    },
    "evidence": {
        "directory": "evidence",
        "body": """---
title: "{title}"
slug: "{slug}"
date: {today}
summary: "Replace with a short dossier note."
category: "outreach"
visibility: "internal"
status: "draft"
sortOrder: 100
relatedItems: []
---

Record what happened, who was involved, and why it matters.
""",
    },
    "service": {
        "directory": "services",
        "body": """---
title: "{title}"
slug: "{slug}"
summary: "Replace with a short service summary."
status: "draft"
sortOrder: 100
idealFor: []
clientQuestions: []
deliverables: []
boundaries: []
upgradePaths: []
assetOutputs: []
ctaLabel: "Start with a scoped inquiry"
ctaHref: "/contact"
---

Use this only if a new front-door service becomes justified by evidence.
""",
    },
}


ALIASES = {
    "samples": "sample",
    "article": "sample",
    "articles": "sample",
    "writing": "sample",
    "memo": "research",
    "memos": "research",
    "research-note": "research",
    "dossier": "evidence",
    "record": "evidence",
    "services": "service",
}


def slugify(title: str) -> str:
    lowered = title.strip().lower()
    lowered = re.sub(r"[^a-z0-9]+", "-", lowered)
    lowered = re.sub(r"-+", "-", lowered).strip("-")
    if not lowered:
        raise SystemExit("Could not generate a slug. Use ASCII words or pass --slug.")
    return lowered


def resolve_kind(kind: str) -> str:
    normalized = kind.strip().lower()
    normalized = ALIASES.get(normalized, normalized)
    if normalized not in TEMPLATES:
        valid = ", ".join(sorted(TEMPLATES))
        raise SystemExit(f"Unknown content kind '{kind}'. Valid kinds: {valid}")
    return normalized


def main() -> None:
    parser = argparse.ArgumentParser(description="Create a typed content file for the Studio site.")
    parser.add_argument("kind", help="sample, research, evidence, or service")
    parser.add_argument("title", help="Public title for the new content item")
    parser.add_argument("--slug", help="Override generated slug")
    args = parser.parse_args()

    kind = resolve_kind(args.kind)
    slug = args.slug or slugify(args.title)
    today = date.today().isoformat()
    year = date.today().year
    template = TEMPLATES[kind]
    target_dir = CONTENT_ROOT / template["directory"]
    target_dir.mkdir(parents=True, exist_ok=True)
    target = target_dir / f"{slug}.md"

    if target.exists():
        raise SystemExit(f"Refusing to overwrite existing file: {target}")

    content = template["body"].format(title=args.title.replace('"', '\\"'), slug=slug, today=today, year=year)
    target.write_text(content, encoding="utf-8")
    print(target)


if __name__ == "__main__":
    main()
