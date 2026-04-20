export const siteMeta = {
	title: 'Chromi Kingdom',
	description:
		'Independent research, journal writing, and selective intervention on AI systems, judgment, and public consequences.',
	email: 'bozhongxiao@gmail.com',
	orcid: 'https://orcid.org/0009-0004-1734-4894',
	github: 'https://github.com/Atomheart-Father',
} as const;

export const primaryNav = [
	{ href: '/', label: 'Home' },
	{ href: '/work', label: 'Work' },
	{ href: '/journal', label: 'Journal' },
	{ href: '/about', label: 'About' },
	{ href: '/contact', label: 'Contact' },
] as const;

export const homePage = {
	hero: {
		kicker: 'Independent research and selective intervention',
		title: 'AI systems change how institutions see, decide, and fail.',
		intro:
			'I study that shift and help teams act before the system sprawls. Research, diagnosis, and selective intervention for AI decisions.',
		primaryCta: { label: 'View work', href: '/work' },
		secondaryCta: { label: 'Open journal', href: '/journal' },
	},
	heroRail: {
		label: 'Current surfaces',
		items: [
			'01  Work',
			'02  Journal',
			'03  Research program',
			'04  Contact',
		],
		note:
			'Image notes live inside Journal as a parallel observational layer, not as a separate portfolio.',
	},
	work: {
		kicker: 'Work',
		title: 'Three bounded entry points.',
		intro:
			'The public front door stays narrow: one diagnostic surface, one workflow audit surface, and one governance or research brief surface.',
		linkLabel: 'Open work',
	},
	selected: {
		kicker: 'Selected',
		title: 'Writing, research, and visual fragments.',
		intro:
			'Only public-ready material appears here: journal pieces, research entries, and occasional image notes.',
	},
	researchProgram: {
		kicker: 'Research program',
		title: 'A continuing program, not a paper shelf.',
		intro:
			'The site is organized around a durable question: how AI systems reorganize judgment, workflows, and public consequence.',
	},
	contact: {
		kicker: 'Start here',
		title: 'Start with the decision, not the pitch.',
		intro:
			'Send the question, the decision you need to make, the material that already exists, and which entry point seems closest.',
		ctaLabel: 'Start a scoped inquiry',
		ctaHref: '/contact',
	},
} as const;

export const researchPrograms = [
	{
		title: 'AI adoption, evaluation, and decision quality',
		summary:
			'How teams decide whether an AI system is worth building, how they evaluate it, and where decision quality breaks before engineering begins.',
	},
	{
		title: 'LLM / agent workflow failure and audit',
		summary:
			'How multi-step AI workflows fail through missing evaluation, unclear handoffs, weak evidence, brittle prompts, or uncontrolled tool use.',
	},
	{
		title: 'Governance and public-interest consequences',
		summary:
			'How AI systems reshape authority, surveillance, institutional accountability, and the public consequences of automated judgment.',
	},
] as const;

export const servicesPage = {
	hero: {
		kicker: 'Work',
		title: 'Three front doors, each with a boundary.',
		intro:
			'This is not broad AI consulting. It is a small public front door for diagnosis, audit, and governance-facing judgment.',
		asideTitle: 'Boundary rule',
		aside:
			'If a request cannot be scoped, delivered lightly, and connected to a reusable method, it should be narrowed before work begins.',
	},
	bridge: {
		title: 'What sits behind the front door',
		intro:
			'The work is fed by a larger system: public journal notes, ongoing research, and image-based observation that sharpen the method without turning the site into a gallery.',
		links: [
			{ label: 'Open Journal', href: '/journal' },
			{ label: 'Read Research', href: '/research' },
		],
	},
} as const;

export const samplesPage = {
	hero: {
		kicker: 'Samples',
		title: 'Short public assets that show the method.',
		intro:
			'Samples are the bridge between research and service: not academic papers, not marketing posts, but small demonstrations of how a vague AI problem gets decomposed.',
	},
	formats: [
		{
			title: 'Problem diagnosis',
			summary:
				'Identify the common mistake, explain why it happens, and reduce the situation to one useful first move.',
		},
		{
			title: 'Workflow audit',
			summary:
				'Trace where an LLM or agent workflow is likely to break: prompts, data, handoffs, evidence, evaluation, or scope.',
		},
		{
			title: 'Governance brief',
			summary:
				'Translate a technical AI issue into organizational risk, public consequence, and decision-ready structure.',
		},
	],
	serviceLinkTitle: 'Where samples connect',
} as const;

export const aboutPage = {
	hero: {
		kicker: 'About',
		title: 'Research, writing, and selective intervention around AI systems.',
		intro:
			'Chromi Kingdom is a public front door for research and applied judgment on AI systems. The work sits between research, public writing, and bounded advisory: enough structure to be usable, enough distance to stay critical.',
	},
	current:
		'The current structure connects a research program on AI and institutional judgment with three bounded work formats, a journal layer for longer and shorter notes, and an occasional image-note track used as an observational method.',
	focusTitle: 'Current focus',
	journalTitle: 'Journal surfaces',
	journalIntro:
		'Journal carries the lighter public layer: long notes, short notes, case notes, and sparse image notes. It is a writing surface, not a content funnel.',
	linksTitle: 'Links',
} as const;

export const contactPage = {
	hero: {
		kicker: 'Contact',
		title: 'Start small. Define the question before the work expands.',
		intro:
			'The first step is not a vague call. Send the problem, the decision you need to make, what material already exists, and which front door seems closest.',
		asideTitle: 'Preferred contact',
	},
	checklistTitle: 'Inquiry checklist',
	checklist: [
		'What are you trying to decide?',
		'Who will use the memo, audit, or brief?',
		'What have you already tried?',
		'What material can you share?',
		'What would count as a useful next step?',
	],
	frontDoorTitle: 'Choose a front door',
} as const;

export const journalPage = {
	hero: {
		kicker: 'Journal',
		title: 'Writing surface, working surface, image surface.',
		intro:
			'Journal carries the public writing layer: long notes, short notes, case notes, and a light image-note track. It is where formal research loosens into readable public material without becoming content marketing.',
	},
	tracks: [
		{
			title: 'Long notes',
			summary: 'Longer essays, rewritten papers, and public-facing arguments that need room.',
		},
		{
			title: 'Short notes',
			summary: 'Compressed judgments, observations, and smaller textual fragments.',
		},
		{
			title: 'Case notes',
			summary: 'Applied notes that connect method, diagnosis, and bounded client-facing work.',
		},
		{
			title: 'Image notes',
			summary: 'A parallel visual track: sparse images treated as observation, not as a separate portfolio identity.',
		},
	],
	writingTitle: 'Writing',
	writingIntro:
		'Writing entries stay close to judgment: they should clarify a problem, trace a failure, or sharpen a question.',
	visualTitle: 'Image notes',
	visualIntro:
		'Image notes are intentionally light. They appear as visual fragments inside the journal rather than as a standalone photography section.',
} as const;

export const footerCopy =
	'Independent research, journal writing, and selective intervention on AI systems, organizational judgment, and public consequence.';

export const legacyCopy = {
	tableLead: 'Table is reserved for a future practice and is not part of the current Studio front door.',
	tableBody:
		'This route remains available as a placeholder, but the current public site is focused on work, journal, research, and contact.',
} as const;
