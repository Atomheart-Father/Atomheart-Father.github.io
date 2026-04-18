import type { ImageMetadata } from 'astro';

export type VisualManifestImage = {
	assetPath: string;
	alt: string;
	caption?: string;
	crop?: string;
	width: number;
	height: number;
	orientation: 'landscape' | 'portrait' | 'square';
};

export type VisualManifest = {
	title: string;
	slug: string;
	year: number;
	summary: string;
	cover: string;
	images: VisualManifestImage[];
};

const imageModules = import.meta.glob('/src/assets/visual-series/**/*.{avif,gif,jpeg,jpg,png,webp}', {
	eager: true,
	import: 'default',
}) as Record<string, ImageMetadata>;

const manifestModules = import.meta.glob('/src/data/visual-series/*.json', {
	eager: true,
	import: 'default',
}) as Record<string, VisualManifest>;

export function resolveSeriesAsset(assetPath?: string): ImageMetadata | undefined {
	if (!assetPath) {
		return undefined;
	}

	return imageModules[assetPath];
}

export function loadVisualManifest(manifestName: string): VisualManifest | undefined {
	const normalized = manifestName.endsWith('.json') ? manifestName : `${manifestName}.json`;
	return manifestModules[`/src/data/visual-series/${normalized}`];
}
