/**
 * Chromi Kingdom 的全站文案配置。
 *
 * 你日常最常改的是这个文件和 src/content 里的 Markdown。
 * 这个文件适合放“页面壳层文案”：导航、首页模块标题、About 介绍、Contact 提示等。
 * 具体文章、服务、研究条目不要塞在这里，应该放进 src/content 对应 collection。
 *
 * 写给访问者看的字符串建议继续用英文，因为现在站点面向英国/国际语境。
 * 中文注释只用于维护说明，不会显示在网页上。
 */

/**
 * siteMeta 控制全站基础身份信息。
 *
 * 会影响：
 * - 浏览器标题和 meta description
 * - Open Graph / Twitter 分享摘要
 * - About、Contact、Footer 里的公开链接
 *
 * 当前写法为什么这样：
 * - 不写成传统 CV 口吻，避免 academic homepage 感
 * - 不把你定义成单一职业标签，而是压成 research / writing / intervention 三个动作
 * - description 要短，因为它会出现在搜索、分享卡片、footer 等位置
 *
 * 怎么改：
 * - title 一般不要频繁改，除非站点改名
 * - description 可以微调母题，但不要写太长
 * - email / orcid / github 是公开信息，确认可以公开再放
 */
export const siteMeta = {
	title: 'Chromi Kingdom',
	description:
		'Independent research, journal writing, and selective intervention on AI systems, judgment, and public consequences.',
	email: 'bozhongxiao@gmail.com',
	orcid: 'https://orcid.org/0009-0004-1734-4894',
	github: 'https://github.com/Atomheart-Father',
} as const;

/**
 * primaryNav 控制顶部一级导航。
 *
 * 当前只保留 Home / Work / Journal / About / Contact，是为了让站点像一个冷静的前门，
 * 而不是把 Research、Samples、Photography、Table 全塞进导航。
 *
 * 怎么改：
 * - label 是显示文字
 * - href 是链接路径
 * - 不建议超过 5 个一级导航
 * - Photography 不建议放一级导航；图像内容走 Journal -> Image Notes 或 /works 的 visual series
 */
export const primaryNav = [
	{ href: '/', label: 'Home' },
	{ href: '/work', label: 'Work' },
	{ href: '/journal', label: 'Journal' },
	{ href: '/about', label: 'About' },
	{ href: '/contact', label: 'Contact' },
] as const;

/**
 * homePage 控制首页各模块文案。
 *
 * 首页当前结构：
 * 1. 第一屏 protocol field
 * 2. 四个入口：Diagnosis / Audit / Writing / Inquiry
 * 3. Work ledger
 * 4. Selected surface，只有有 published 内容时才出现
 * 5. Research program
 * 6. Contact CTA
 */
export const homePage = {
	hero: {
		// kicker 是第一屏里的小标签，保持短、冷、像系统字段。
		kicker: 'Protocol field',

		// topStatement 是首页最上方那句硬判断。它的作用是先给世界观，不急着解释你是谁。
		topStatement: 'AI adoption is a governance event before it is a product event.',

		// 首页大标题被拆成三段，是为了保留 09 风格里的黑底高亮。
		// 改的时候保持一句完整判断：动词 + 风险判断 + 下一步。
		titleStart: 'Clarify',
		titleHighlight: 'what should not be built',
		titleEnd: 'before deciding what can be automated.',
	},

	heroRail: {
		// 右侧序列不是装饰，是把你的判断方式压成一条 failure sequence。
		// 如果你改这里，建议仍然保持 00-04 的系统编号感。
		label: 'Failure sequence',
		items: [
			'00  Demand appears',
			'01  Scope expands',
			'02  Evaluation missing',
			'03  Accountability fades',
			'04  Intervention point',
		],
		note:
			'The useful first move is not a prototype. It is a decision frame.',
	},

	work: {
		// 首页 Work 区块导向 /work。这里不要写成“我提供很多服务”，而是强调边界和第一步判断。
		kicker: 'Work',
		title: 'Decision frame before prototype.',
		intro:
			'Three bounded entry points for situations where AI demand, workflow failure, or institutional consequence needs to be made legible.',
		linkLabel: 'Open work',
	},

	selected: {
		// Selected surface 不是固定出现。只有 published journal/research/image note 存在时才渲染。
		// 它的作用是把写作、研究和图像碎片作为同一个观察系统展示，而不是堆一堆 cards。
		kicker: 'Selected',
		title: 'Writing, research, and visual fragments.',
		intro:
			'Only public-ready material appears here: journal pieces, research entries, and occasional image notes.',
	},

	researchProgram: {
		// 首页研究模块写“研究计划”，不写具体 paper vocabulary。
		// 这样不会让站点看起来围绕某一篇论文转，而是像一个长期系统。
		kicker: 'Research program',
		title: 'Adoption, audit, governance, public consequence.',
		intro:
			'The research question stays blunt: how AI systems reorganize judgment before institutions notice what has moved.',
	},

	contact: {
		// 首页结尾 CTA。这里强调“先发 decision/problem”，不是预约销售电话。
		kicker: 'Start here',
		title: 'Send the decision first.',
		intro:
			'The first useful message names the decision, the material already available, who will use the output, and what would count as a useful next move.',
		ctaLabel: 'Start a scoped inquiry',
		ctaHref: '/contact',
	},
} as const;

/**
 * researchPrograms 是全站共用的三条研究主轴。
 *
 * 会影响：
 * - Home 的 Research program
 * - Research 页面顶部 program cards
 * - About 的 Current focus
 *
 * 当前为什么这样写：
 * - 不写成单篇论文标题
 * - 不直接写敏感政治标签
 * - 把你的关心点提升为“AI 如何改变组织判断和公共后果”
 *
 * 怎么改：
 * - title 保持可持续研究方向，不要太像论文摘要
 * - summary 解释它为什么重要，但不要写太学术
 * - 如果新增第 4 条，页面会显示，但视觉节奏可能要重新看
 */
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

/**
 * servicesPage 控制 /work 页面壳层文案。
 *
 * 具体服务内容来自 src/content/services/*.md，不在这里写。
 * 这里主要解释“为什么这不是普通 AI 咨询”，以及 Work 背后的边界规则。
 */
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
		// Work 页底部桥接到 Journal / Research，说明服务不是凭空卖，而是由研究和写作反哺。
		title: 'What sits behind the front door',
		intro:
			'The work is fed by a larger system: public journal notes, ongoing research, and image-based observation that sharpen the method without turning the site into a gallery.',
		links: [
			{ label: 'Open Journal', href: '/journal' },
			{ label: 'Read Research', href: '/research' },
		],
	},
} as const;

/**
 * samplesPage 控制 /samples 页面。
 *
 * Samples 现在不是一级导航，因为公开样本还少。
 * 它适合未来放方法展示：diagnosis、workflow audit、governance brief、case note。
 */
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

/**
 * aboutPage 控制 /about 页面。
 *
 * 当前 About 不写 CV 时间线，是因为这个站不是简历站。
 * 它要解释：你在持续关心什么、这些媒介为什么能共存、如何工作。
 */
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

/**
 * contactPage 控制 /contact 页面。
 *
 * 当前写法故意不做“book a call”销售页。
 * 它要求对方先说明问题、材料、使用者和有用结果，保护你的时间边界。
 */
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

/**
 * journalPage 控制 /journal 页面壳层文案。
 *
 * 具体文章来自 src/content/journal/*.md。
 * Journal 不是传统 blog，也不是 content marketing。它是把论文、判断、方法和图像观察逐步公开化的 writing surface。
 */
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

/**
 * footerCopy 控制页脚左侧一句话。
 *
 * 这里要比首页更稳定、更像身份摘要。
 * 不建议写得很抒情，因为 footer 会在每页重复出现。
 */
export const footerCopy =
	'Independent research, journal writing, and selective intervention on AI systems, organizational judgment, and public consequence.';

/**
 * legacyCopy 控制旧占位页文案，例如 /table。
 *
 * Table 不是当前前门，只保留为未来媒介。
 * 这里不需要经常改。
 */
export const legacyCopy = {
	tableLead: 'Table is reserved for a future practice and is not part of the current Studio front door.',
	tableBody:
		'This route remains available as a placeholder, but the current public site is focused on work, journal, research, and contact.',
} as const;
