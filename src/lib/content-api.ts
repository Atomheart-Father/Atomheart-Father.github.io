import { getCollection, type CollectionEntry } from 'astro:content';

export type ServiceEntry = CollectionEntry<'services'>;
export type ResearchEntry = CollectionEntry<'research'>;
export type SampleEntry = CollectionEntry<'samples'>;
export type JournalEntry = CollectionEntry<'journal'>;
export type EvidenceEntry = CollectionEntry<'evidence'>;

function bySortOrder<T extends { data: { sortOrder: number } }>(a: T, b: T) {
	return a.data.sortOrder - b.data.sortOrder;
}

function byDateDesc<T extends { data: { date: Date } }>(a: T, b: T) {
	return b.data.date.getTime() - a.data.date.getTime();
}

function byFeaturedOrderAndDate<T extends { data: { featured?: boolean; sortOrder: number; date: Date } }>(a: T, b: T) {
	if (Boolean(a.data.featured) !== Boolean(b.data.featured)) {
		return a.data.featured ? -1 : 1;
	}

	if (a.data.sortOrder !== b.data.sortOrder) {
		return a.data.sortOrder - b.data.sortOrder;
	}

	return byDateDesc(a, b);
}

export async function getActiveServices() {
	const services = await getCollection('services');
	return services.filter((entry) => entry.data.status === 'active').sort(bySortOrder);
}

export async function getPublicResearch() {
	const entries = await getCollection('research');
	return entries
		.filter((entry) => entry.data.visibility === 'public' && entry.data.status !== 'draft')
		.sort(bySortOrder);
}

export async function getResearchByCategory(category: ResearchEntry['data']['category']) {
	const entries = await getPublicResearch();
	return entries.filter((entry) => entry.data.category === category);
}

export async function getPublishedSamples() {
	const samples = await getCollection('samples');
	return samples.filter((entry) => entry.data.status === 'published').sort((a, b) => {
		if (a.data.sortOrder !== b.data.sortOrder) {
			return a.data.sortOrder - b.data.sortOrder;
		}

		return byDateDesc(a, b);
	});
}

export async function getPublishedJournal() {
	const entries = await getCollection('journal');
	return entries.filter((entry) => entry.data.status === 'published').sort(byFeaturedOrderAndDate);
}

export async function getPublishedWriting() {
	const entries = await getPublishedJournal();
	return entries.filter((entry) => entry.data.type !== 'image_note');
}

export async function getPublishedImageNotes() {
	const entries = await getPublishedJournal();
	return entries.filter((entry) => entry.data.type === 'image_note');
}

export async function getPublicEvidence() {
	const evidence = await getCollection('evidence');
	return evidence
		.filter((entry) => entry.data.visibility === 'public' && entry.data.status === 'published')
		.sort(byDateDesc);
}

export const researchColumns = [
	{
		key: 'under_review',
		title: 'Under review / in progress',
		description: 'Manuscripts and active research projects that are not public PDFs.',
		categories: ['under_review', 'in_progress'] as const,
	},
	{
		key: 'working',
		title: 'Working papers / memos',
		description: 'Draftable notes that can become briefs, samples, or research entries.',
		categories: ['working_paper', 'memo'] as const,
	},
	{
		key: 'essays',
		title: 'Essays / notes',
		description: 'Public-facing writing that is useful without needing to be a formal paper.',
		categories: ['essay', 'note'] as const,
	},
] as const;
