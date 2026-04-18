import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { loadVisualManifest, resolveSeriesAsset, type VisualManifest } from './visual-series';

type WorkEntry = CollectionEntry<'works'>;
type VisualEntry = CollectionEntry<'visualSeries'>;

export type UnifiedWork = {
	slug: string;
	title: string;
	year: number;
	summary: string;
	featured: boolean;
	sortOrder: number;
	filterKey: 'paper' | 'visual' | 'projects';
	typeLabel: string;
	statusLabel: string;
	href: string;
	themes: string[];
	cover?: ImageMetadata;
	palette?: string[];
	manifest?: VisualManifest;
	entry: WorkEntry | VisualEntry;
	kind: 'paper' | 'project' | 'longform' | 'visual';
};

function sortWorks(a: UnifiedWork, b: UnifiedWork) {
	if (a.featured !== b.featured) {
		return Number(b.featured) - Number(a.featured);
	}

	if (a.sortOrder !== b.sortOrder) {
		return a.sortOrder - b.sortOrder;
	}

	return b.year - a.year;
}

function paperStatusLabel(status: WorkEntry['data']['status']) {
	switch (status) {
		case 'under_review':
			return 'Under review';
		case 'submitted':
			return 'Submitted';
		case 'rejected':
			return 'Declined';
		case 'in_progress':
			return 'In progress';
		case 'published':
			return 'Published';
	}
}

function paperTypeLabel(kind: WorkEntry['data']['kind']) {
	switch (kind) {
		case 'paper':
			return 'Paper';
		case 'project':
			return 'Project';
		case 'longform':
			return 'Longform';
	}
}

export async function getPaperWorks() {
	const entries = await getCollection('works');

	return entries.map<UnifiedWork>((entry) => ({
		slug: entry.data.slug,
		title: entry.data.title,
		year: entry.data.year,
		summary: entry.data.summary,
		featured: entry.data.featured,
		sortOrder: entry.data.sortOrder,
		filterKey: entry.data.kind === 'paper' ? 'paper' : 'projects',
		typeLabel: paperTypeLabel(entry.data.kind),
		statusLabel: paperStatusLabel(entry.data.status),
		href: `/works/${entry.data.slug}`,
		themes: entry.data.themes,
		entry,
		kind: entry.data.kind,
	}));
}

export async function getPublishedVisualSeries() {
	let entries: VisualEntry[] = [];

	try {
		entries = await getCollection('visualSeries');
	} catch (error) {
		if (error instanceof Error && error.message.includes('does not exist or is empty')) {
			return [];
		}

		throw error;
	}

	return entries
		.filter((entry) => entry.data.status === 'published')
		.map<UnifiedWork | null>((entry) => {
			const manifest = loadVisualManifest(entry.data.manifest);
			if (!manifest) {
				return null;
			}

			return {
				slug: entry.data.slug,
				title: entry.data.title,
				year: entry.data.year,
				summary: entry.data.summary,
				featured: entry.data.featured,
				sortOrder: entry.data.sortOrder,
				filterKey: 'visual',
				typeLabel: 'Visual series',
				statusLabel: 'Published selectively',
				href: `/works/${entry.data.slug}`,
				themes: [],
				cover: resolveSeriesAsset(entry.data.coverImage) ?? resolveSeriesAsset(manifest.cover),
				palette: entry.data.palette,
				manifest,
				entry,
				kind: 'visual',
			};
		})
		.filter((entry): entry is UnifiedWork => Boolean(entry));
}

export async function getUnifiedWorks() {
	const papers = await getPaperWorks();
	const series = await getPublishedVisualSeries();

	return [...papers, ...series].sort(sortWorks);
}

export async function getFeaturedWorks(limit = 4) {
	const works = await getUnifiedWorks();
	return works.filter((work) => work.featured).slice(0, limit);
}
