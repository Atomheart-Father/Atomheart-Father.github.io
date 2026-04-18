#!/Users/bozhongxiao/code/.venv/bin/python
"""Import a curated photo manifest into web-sized assets and public JSON metadata."""

from __future__ import annotations

import argparse
import json
import re
import shutil
from pathlib import Path
from typing import Any

import yaml
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MANIFEST_DIR = ROOT / "private" / "photo_manifests"
ASSET_ROOT = ROOT / "src" / "assets" / "visual-series"
DATA_ROOT = ROOT / "src" / "data" / "visual-series"
MAX_LONG_EDGE = 2200
JPEG_QUALITY = 86


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "image"


def resolve_manifest_path(raw: str) -> Path:
    candidate = Path(raw).expanduser()
    if candidate.suffix in {".yaml", ".yml"}:
        return candidate if candidate.is_absolute() else (ROOT / candidate).resolve()
    return (DEFAULT_MANIFEST_DIR / f"{raw}.yaml").resolve()


def normalize_image(image_config: dict[str, Any], slug: str, index: int) -> dict[str, Any]:
    source_path = Path(str(image_config["source"])).expanduser().resolve()
    if not source_path.exists():
        raise FileNotFoundError(f"Missing image source: {source_path}")

    asset_dir = ASSET_ROOT / slug
    asset_name = f"{index:02d}-{slugify(source_path.stem)}.jpg"
    destination = asset_dir / asset_name

    with Image.open(source_path) as image:
        image = ImageOps.exif_transpose(image)
        if image.mode not in {"RGB", "L"}:
            image = image.convert("RGB")
        elif image.mode == "L":
            image = image.convert("RGB")

        if max(image.size) > MAX_LONG_EDGE:
            image.thumbnail((MAX_LONG_EDGE, MAX_LONG_EDGE), Image.Resampling.LANCZOS)

        width, height = image.size
        orientation = "square"
        if width > height:
            orientation = "landscape"
        elif height > width:
            orientation = "portrait"

        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, format="JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)

    return {
        "source": str(source_path),
        "assetPath": f"/src/assets/visual-series/{slug}/{asset_name}",
        "alt": str(image_config["alt"]).strip(),
        "caption": str(image_config.get("caption", "")).strip() or None,
        "crop": str(image_config.get("crop", "")).strip() or None,
        "width": width,
        "height": height,
        "orientation": orientation,
    }


def import_manifest(manifest_path: Path) -> Path:
    if not manifest_path.exists():
        raise FileNotFoundError(f"Manifest not found: {manifest_path}")

    with manifest_path.open("r", encoding="utf-8") as handle:
        payload = yaml.safe_load(handle) or {}

    required = {"title", "slug", "year", "summary", "cover", "images"}
    missing = required.difference(payload)
    if missing:
        joined = ", ".join(sorted(missing))
        raise ValueError(f"Manifest {manifest_path} is missing required keys: {joined}")

    slug = str(payload["slug"]).strip()
    images_config = payload.get("images", [])
    if not isinstance(images_config, list) or not images_config:
        raise ValueError(f"Manifest {manifest_path} must contain a non-empty images list")

    asset_dir = ASSET_ROOT / slug
    if asset_dir.exists():
        shutil.rmtree(asset_dir)

    normalized_images = [
        normalize_image(image_config, slug=slug, index=index)
        for index, image_config in enumerate(images_config, start=1)
    ]

    cover_reference = str(payload["cover"]).strip()
    cover_asset = None
    for image in normalized_images:
        if image["source"] == cover_reference or Path(image["source"]).name == cover_reference:
            cover_asset = image["assetPath"]
            break

    if not cover_asset:
        raise ValueError(
            f'Could not resolve cover "{cover_reference}". Use an absolute image path or a source filename.'
        )

    public_manifest = {
        "title": str(payload["title"]).strip(),
        "slug": slug,
        "year": int(payload["year"]),
        "summary": str(payload["summary"]).strip(),
        "cover": cover_asset,
        "images": normalized_images,
    }

    DATA_ROOT.mkdir(parents=True, exist_ok=True)
    output_path = DATA_ROOT / f"{slug}.json"
    with output_path.open("w", encoding="utf-8") as handle:
        json.dump(public_manifest, handle, ensure_ascii=False, indent=2)
        handle.write("\n")

    return output_path


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Import a photo manifest into web-sized site assets and public JSON metadata."
    )
    parser.add_argument(
        "manifest",
        nargs="+",
        help="Manifest path or slug inside private/photo_manifests (omit .yaml for slugs).",
    )
    args = parser.parse_args(argv)

    output_paths = []
    for raw_manifest in args.manifest:
        manifest_path = resolve_manifest_path(raw_manifest)
        output_paths.append(import_manifest(manifest_path))

    for path in output_paths:
        print(path)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
