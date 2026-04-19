export const siteMeta = {
	title: 'Chromi Kingdom',
	description:
		'Research-driven AI judgment for teams and institutions facing unclear AI decisions.',
	email: 'bozhongxiao@gmail.com',
	orcid: 'https://orcid.org/0009-0004-1734-4894',
	github: 'https://github.com/Atomheart-Father',
} as const;

export const primaryNav = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/services', label: 'Services' },
	{ href: '/research', label: 'Research', requires: 'research' },
	{ href: '/samples', label: 'Samples', requires: 'samples' },
	{ href: '/contact', label: 'Contact' },
] as const;

export const homePage = {
	hero: {
		kicker: 'Research-driven AI judgment',
		title: 'Clarifying AI decisions before systems sprawl.',
		intro:
			'I study how AI systems reshape organizational judgment and public life. I help teams decide what to build, what to stop, and what to examine more carefully before a vague AI idea becomes an expensive system.',
		primaryCta: { label: 'View services', href: '/services' },
		secondaryCta: { label: 'Read a sample', href: '/samples', requires: 'samples' },
	},
	services: {
		kicker: 'Services',
		title: 'Three bounded ways to start.',
		intro:
			'Each front door is small enough to begin without turning into open-ended consulting, and concrete enough to produce a useful decision.',
		linkLabel: 'View all services',
	},
	featured: {
		kicker: 'Featured',
		title: 'Method and research, only when ready.',
		intro:
			'Public samples and research entries appear here after they are publishable. Empty sections stay hidden.',
	},
	researchProgram: {
		kicker: 'Research program',
		title: 'One research problem, three applied surfaces.',
		intro:
			'The public work is not a list of paper titles. It is a continuing program on how AI systems change decisions, workflows, and public consequences.',
	},
	contact: {
		kicker: 'Start here',
		title: 'Send the decision you need to make.',
		intro:
			'The useful first step is a bounded question: what you are trying to decide, what material exists, who will use the output, and which front door seems closest.',
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
		kicker: 'Services',
		title: 'Three front doors, each with a boundary.',
		intro:
			'This is not broad AI consulting. It starts with small, scoped, asynchronous-first offers that turn vague AI questions into usable judgment.',
		asideTitle: 'Boundary rule',
		aside:
			'If a request cannot be scoped, delivered lightly, and connected to a reusable method, it should be narrowed before work begins.',
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
		title: 'Independent research and scoped advisory on AI systems.',
		intro:
			'Chromi Kingdom is the public front door for work on AI systems, organizational judgment, evaluation, audit, and governance. The aim is not broad AI consulting. It is focused judgment for moments when teams or institutions need to decide what should be built, stopped, examined, or reframed.',
	},
	current:
		'The work connects a research program on AI and public life with bounded service formats: diagnosis memo, workflow audit, and governance brief. Research gives the work depth; service formats make the judgment usable.',
	focusTitle: 'Current focus',
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

export const footerCopy =
	'Research-driven AI judgment for teams and institutions. Diagnosis, workflow audit, and governance briefs without open-ended consulting sprawl.';

export const legacyCopy = {
	tableLead: 'Table is reserved for a future practice and is not part of the current Studio front door.',
	tableBody:
		'This route remains available as a placeholder, but the current public site is focused on research, services, samples, and contact.',
} as const;
