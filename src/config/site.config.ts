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
		'Independent writing and research notes on AI systems, judgment, and public consequences.',
	email: 'bozhongxiao@gmail.com',
	orcid: 'https://orcid.org/0009-0004-1734-4894',
	github: 'https://github.com/Atomheart-Father',
} as const;

/**
 * primaryNav 控制顶部一级导航。
 *
 * 当前只保留 Home / Work / Journal / About / Contact。
 * Work 在这里指你自己的研究项目和调研系统，不是接咨询活的 services。
 * Research、Samples、Photography、Table 都先不放一级导航，避免把还没正式公开的东西编造成身份。
 *
 * 怎么改：
 * - label 是显示文字
 * - href 是链接路径
 * - 不建议超过 5 个一级导航
 * - Work 放研究项目；Services 如果未来需要，另开语义，不要混在一起
 * - Photography 不建议放一级导航；图像内容先走 Journal -> Image Notes，未来再考虑 visual series
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
 * 2. 四个入口：Work / Journal / About / Contact
 * 3. Selected surface，只有有 published 内容时才出现
 * 4. Contact CTA
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

	selected: {
		// Selected surface 不是固定出现。只有 published journal / image note 存在时才渲染。
		// 它的作用是展示真实公开内容，不把草稿或未来模块包装成成果。
		kicker: 'Selected',
		title: 'Selected writing.',
		intro:
			'Only public-ready notes appear here. Drafts, placeholders, and future formats stay hidden.',
	},

	work: {
		// 首页 Work 入口。这里的 Work 是 ongoing research work，不是咨询服务。
		kicker: 'Work',
		title: 'Active work.',
		intro:
			'Ongoing research projects, field validation, and questionnaire infrastructure that are public enough to describe.',
	},

	researchProgram: {
		// 首页这里先写成 current concerns，而不是正式 research program。
		// 这样不会把还没完成的项目包装成已经成型的研究产品。
		kicker: 'Current concerns',
		title: 'Adoption, evaluation, governance, public consequence.',
		intro:
			'The question stays blunt: how AI systems reorganize judgment before institutions notice what has moved.',
	},

	contact: {
		// 首页结尾 CTA。这里强调“先发 decision/problem”，不是预约销售电话。
		kicker: 'Start here',
		title: 'Send the decision first.',
		intro:
			'The first useful message names the decision, the material already available, who will use the output, and what would count as a useful next move.',
		ctaLabel: 'Send an email',
		ctaHref: '/contact',
	},
} as const;

/**
 * researchPrograms 是全站共用的三条研究主轴。
 *
 * 当前会影响：
 * - About 的 Current focus
 *
 * 以前它也用于 Home / Research 页面。现在这两个公开展示已关闭，避免把未完成研究包装成成果。
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
 * workPage 控制 /work 页面壳层文案。
 *
 * 具体项目来自 src/content/work/*.md，不在这里写。
 * 这里的 Work 指研究项目、调研材料、问卷系统接口，不指咨询服务。
 */
export const workPage = {
	hero: {
		kicker: 'Work',
		title: 'Research work in progress.',
		intro:
			'Work collects active research projects, technical manuscripts, field validation materials, and questionnaire infrastructure. It is not a consulting menu.',
		asideTitle: 'Boundary',
		aside:
			'Public pages describe the project and workflow. Participant lists, internal assignment manifests, raw responses, and unfinished manuscripts stay private.',
	},
	bridge: {
		// Work 页底部桥接到 Journal / Contact。
		title: 'What can be public',
		intro:
			'The public layer can show a project summary, current stage, safe material types, and a questionnaire route. It should not expose participant identities or internal experimental assignment tables.',
		links: [
			{ label: 'Open Journal', href: '/journal' },
			{ label: 'Contact', href: '/contact' },
		],
	},
} as const;

/**
 * samplesPage 是未来 /samples 页面配置。
 *
 * Samples 现在不是一级导航，公开路由也只显示未开放提示，因为真实样本还没有准备好。
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
		title: 'Writing and research around AI systems.',
		intro:
			'Chromi Kingdom is a public surface for writing, research notes, and developing judgment on AI systems. It is intentionally small while the work takes shape.',
	},
	current:
		'The current structure is simple: a Work layer for active research projects and questionnaire infrastructure, a Journal layer for public notes, a small set of research concerns, and a contact route. Consulting-style services are not presented publicly until they become real formats rather than placeholders.',
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
			'The first step is not a vague call. Send the problem, the decision you need to make, what material already exists, and what kind of response would be useful.',
		asideTitle: 'Preferred contact',
	},
	checklistTitle: 'Inquiry checklist',
	checklist: [
		'What are you trying to decide?',
		'Who will use the answer or note?',
		'What have you already tried?',
		'What material can you share?',
		'What would count as a useful next step?',
	],
	frontDoorTitle: 'Public work is not listed yet',
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
		title: 'Public notes and fragments.',
		intro:
			'Journal is where public-ready notes live. Some are long arguments, some may later become fragments or image notes, but nothing is displayed here until it exists.',
	},
	writingTitle: 'Writing',
	writingIntro:
		'Published notes appear here when they can stand on their own.',
	visualTitle: 'Image notes',
	visualIntro:
		'Image notes will appear only when there is an actual visual fragment to publish.',
} as const;

/**
 * footerCopy 控制页脚左侧一句话。
 *
 * 这里要比首页更稳定、更像身份摘要。
 * 不建议写得很抒情，因为 footer 会在每页重复出现。
 */
export const footerCopy =
	'Independent writing and research notes on AI systems, organizational judgment, and public consequence.';

/**
 * legacyCopy 是旧占位页文案的保留字段。
 *
 * 当前 /table 页面已经不再读取这些长文案，只显示 not public yet。
 * 如果以后重新开放 Table，再决定是否恢复使用。
 */
export const legacyCopy = {
	tableLead: 'Table is reserved for a future practice and is not part of the current Studio front door.',
	tableBody:
		'This route remains available as a placeholder, but the current public site is focused on work, journal, research, and contact.',
} as const;
