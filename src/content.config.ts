import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		date: z.coerce.date(),
		summary: z.string(),
		tags: z.array(z.string()).default([]),
		status: z.enum(['published', 'draft']),
		kind: z.enum(['essay', 'note', 'fragment', 'journal']),
		cover: z.string().optional(),
	}),
});

const work = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		year: z.number().int(),
		kind: z.enum(['research_project', 'field_study', 'manuscript', 'questionnaire_system', 'tool']),
		summary: z.string(),
		status: z.enum(['active', 'paused', 'archived', 'draft']).default('draft'),
		visibility: z.enum(['public', 'private']).default('private'),
		featured: z.boolean().default(false),
		sortOrder: z.number().int().default(100),
		stage: z.string(),
		access: z.enum(['public_summary', 'public_materials', 'contact_required']).default('public_summary'),
		themes: z.array(z.string()).default([]),
		publicMaterials: z.array(z.string()).default([]),
		questionnaire: z
			.object({
				status: z.enum(['not_public', 'manual_distribution', 'external_link', 'closed']).default('not_public'),
				label: z.string().default('Questionnaire system'),
				href: z.string().optional(),
				note: z.string().default('No public questionnaire link is available yet.'),
			})
			.default({
				status: 'not_public',
				label: 'Questionnaire system',
				note: 'No public questionnaire link is available yet.',
			}),
		links: z
			.array(
				z.object({
					label: z.string(),
					href: z.string(),
					type: z.enum(['internal', 'external', 'download', 'contact']).default('internal'),
				}),
			)
			.default([]),
	}),
});

const works = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/works' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		year: z.number().int(),
		kind: z.enum(['paper', 'project', 'longform']),
		summary: z.string(),
		featured: z.boolean().default(false),
		sortOrder: z.number().int().default(100),
		status: z.enum(['under_review', 'submitted', 'rejected', 'in_progress', 'published']),
		access: z.enum(['abstract_only', 'external']).default('abstract_only'),
		themes: z.array(z.string()).default([]),
	}),
});

const visualSeries = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/visual-series' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		year: z.number().int(),
		summary: z.string(),
		featured: z.boolean().default(false),
		sortOrder: z.number().int().default(100),
		status: z.enum(['draft', 'published']).default('draft'),
		coverImage: z.string(),
		palette: z.array(z.string()).default([]),
		manifest: z.string(),
	}),
});

const services = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		summary: z.string(),
		status: z.enum(['active', 'draft']).default('draft'),
		sortOrder: z.number().int().default(100),
		idealFor: z.array(z.string()).default([]),
		clientQuestions: z.array(z.string()).default([]),
		deliverables: z.array(z.string()).default([]),
		boundaries: z.array(z.string()).default([]),
		upgradePaths: z.array(z.string()).default([]),
		assetOutputs: z.array(z.string()).default([]),
		ctaLabel: z.string().default('Start with a scoped inquiry'),
		ctaHref: z.string().default('/contact'),
	}),
});

const research = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/research' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		summary: z.string(),
		year: z.number().int(),
		status: z.enum(['under_review', 'in_progress', 'working', 'draft', 'published']).default('draft'),
		category: z.enum(['under_review', 'in_progress', 'working_paper', 'memo', 'essay', 'note']),
		visibility: z.enum(['public', 'private']).default('public'),
		featured: z.boolean().default(false),
		sortOrder: z.number().int().default(100),
		themes: z.array(z.string()).default([]),
		relatedServices: z.array(z.string()).default([]),
	}),
});

const samples = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/samples' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		date: z.coerce.date(),
		summary: z.string(),
		status: z.enum(['draft', 'published']).default('draft'),
		template: z.enum(['diagnosis', 'workflow_audit', 'governance_brief', 'case_note']),
		relatedService: z.string().optional(),
		sortOrder: z.number().int().default(100),
		tags: z.array(z.string()).default([]),
	}),
});

const journal = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/journal' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		date: z.coerce.date(),
		summary: z.string(),
		status: z.enum(['draft', 'published']).default('draft'),
		type: z.enum(['long_note', 'short_note', 'case_note', 'image_note']),
		featured: z.boolean().default(false),
		sortOrder: z.number().int().default(100),
		tags: z.array(z.string()).default([]),
		relatedService: z.string().optional(),
		cover: z.string().optional(),
		images: z
			.array(
				z.object({
					src: z.string(),
					alt: z.string(),
					caption: z.string().optional(),
				}),
			)
			.default([]),
	}),
});

const evidence = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/evidence' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		date: z.coerce.date(),
		summary: z.string(),
		category: z.enum([
			'publication',
			'public_writing',
			'template',
			'outreach',
			'talk',
			'client_work',
			'funding',
			'testimonial',
		]),
		visibility: z.enum(['public', 'internal', 'private']).default('internal'),
		status: z.enum(['draft', 'logged', 'published']).default('draft'),
		sortOrder: z.number().int().default(100),
		relatedItems: z.array(z.string()).default([]),
	}),
});

export const collections = {
	notes,
	work,
	works,
	visualSeries,
	services,
	research,
	samples,
	journal,
	evidence,
};
