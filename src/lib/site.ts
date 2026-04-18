export const siteMeta = {
	title: 'Chromi Kingdom',
	description:
		'A research-driven AI studio for diagnosis, workflow audit, and governance briefs.',
	email: 'bozhongxiao@gmail.com',
	orcid: 'https://orcid.org/0009-0004-1734-4894',
	github: 'https://github.com/Atomheart-Father',
};

export const primaryNav = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/research', label: 'Research' },
	{ href: '/services', label: 'Services' },
	{ href: '/samples', label: 'Samples' },
	{ href: '/contact', label: 'Contact' },
] as const;

export const homeEntry = {
	kicker: 'Research-driven AI studio',
	title: 'Clearer judgment for teams facing vague AI decisions.',
	intro:
		'Chromi Kingdom is being rebuilt as a small front door for AI diagnosis, LLM workflow audit, and governance brief work. The site is designed to turn research, samples, and client-facing methods into reusable assets instead of one-off pages.',
};

export const homeLinks = [
	{
		href: '/services',
		title: 'Services',
		description: 'Three bounded front-door offers: diagnosis memo, workflow audit, and research brief.',
	},
	{
		href: '/research',
		title: 'Research',
		description: 'Under-review work, working papers, memos, and public essays arranged as a research surface.',
	},
	{
		href: '/samples',
		title: 'Samples',
		description: 'Public samples and method notes that show how a problem gets diagnosed.',
	},
] as const;

export const studioPositioning = {
	internal:
		'Independent researcher / research-driven consultant focused on agentic AI, AI governance, evaluation, audit, and organizational adoption.',
	public:
		'I help teams clarify whether an AI demand is worth pursuing, where an LLM workflow is breaking, and how a governance or technical issue should be turned into a decision-ready brief.',
	stage: 'Stage A: prototype, front door, samples, and first evidence.',
};

export const studioMetrics = [
	'Public front door',
	'First samples',
	'External evidence',
	'Reusable assets',
] as const;

export const currentConcerns = [
	'Agentic AI, auditability, and capability drift',
	'LLM workflow failure, evaluation gaps, and decision risk',
	'AI governance, organizational adoption, and public-interest consequences',
	'How technical systems concentrate interpretation and authority',
] as const;

export const aboutSections = {
	extended:
		'Bozhong Xiao works between AI systems, research writing, and governance-facing analysis. The current Studio direction is intentionally narrow: turn technical and social judgment about AI systems into diagnosis, audit, and brief formats that outside teams can actually use.',
	current:
		'Current work is focused on building a public research surface, three bounded front-door services, public samples, and a dossier of evidence that can support future research, institutional collaboration, and client work.',
};

export const tableCopy = {
	lead:
		'Table is reserved for a future practice of meals, conversation, and carefully staged encounters.',
	body:
		'It will eventually hold menus, salon formats, and dinner notes. For now, it stands as a signal: food belongs here as a medium of expression, not as a side project pasted onto an otherwise “serious” site.',
};
