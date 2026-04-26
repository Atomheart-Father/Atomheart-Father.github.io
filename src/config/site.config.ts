/**
 * CHLOMEE STUDIO 的全站文案配置。
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
 * - 不把你定义成单一职业标签，而是压成 research / writing / observation 三个动作
 * - description 要短，因为它会出现在搜索、分享卡片、footer 等位置
 *
 * 怎么改：
 * - title 一般不要频繁改，除非站点改名
 * - description 可以微调母题，但不要写太长
 * - email / orcid / github 是公开信息，确认可以公开再放
 */
export const siteMeta = {
	title: 'CHLOMEE STUDIO',
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
 * Work 在这里指你自己的研究项目和调研系统。
 * Research、Samples、Photography、Table 都先不放一级导航，避免把还没正式公开的东西编造成身份。
 *
 * 怎么改：
 * - label 是显示文字
 * - href 是链接路径
 * - 不建议超过 5 个一级导航
 * - Work 放研究项目
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
 * 1. 第一屏 studio field
 * 2. 四个入口：Work / Journal / About / Contact
 * 3. Selected surface，只有有 published 内容时才出现
 * 4. Contact CTA
 */
export const homePage = {
	hero: {
		// kicker 是第一屏里的小标签，保持短、冷、像系统字段。
		kicker: 'Studio field',

		// topStatement 是首页最上方那句硬判断。它的作用是先给世界观，不急着解释你是谁。
		topStatement: 'AI / order / public life.',

		// 首页大标题被拆成三段，是为了保留 09 风格里的黑底高亮。
		// 改的时候保持一句完整判断：动词 + 风险判断 + 下一步。
		titleStart: 'Order',
		titleHighlight: 'learns',
		titleEnd: 'to look natural.',
	},

	activeWorkRail: {
		// 首页首屏右侧直接读取 src/content/work 里公开的 active work。
		// 不在这里硬写项目标题，避免首页变成自我解释或旧 slogan。
		label: 'Active work',
		empty: 'No public work yet.',
	},

	selected: {
		// Selected surface 不是固定出现。只有 published journal / image note 存在时才渲染。
		// 它的作用是展示真实公开内容，不把草稿或未来模块包装成成果。
		kicker: 'Selected',
		title: 'Selected.',
		intro: '',
	},

	work: {
		// 首页 Work 入口。这里的 Work 是 ongoing research work，不是咨询服务。
		kicker: 'Work',
		title: 'Active work.',
		intro: 'Manuscripts. Fieldwork. Instruments.',
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
		// 首页结尾 CTA。只给直接联系入口，不做额外流程。
		kicker: 'Contact',
		title: 'Email.',
		intro: '',
		ctaLabel: 'Email',
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
		title: 'AI systems and institutional judgment',
		summary:
			'How automated systems change what people and institutions can see, trust, measure, ignore, and act on.',
	},
	{
		title: 'Platform convenience and reorganized life',
		summary:
			'How convenient interfaces absorb attention, labor, payment, communication, and everyday decision-making into platform order.',
	},
	{
		title: 'Human review, evaluation, and audit',
		summary:
			'How claims of oversight, review, and evaluation survive or collapse when systems become operational infrastructure.',
	},
] as const;

/**
 * workPage 控制 /work 页面壳层文案。
 *
 * 具体项目来自 src/content/work/*.md，不在这里写。
 * 这里的 Work 指研究项目、调研材料、问卷系统接口。
 */
export const workPage = {
	hero: {
		kicker: 'Work',
		title: 'Work in progress.',
		intro: '',
		asideTitle: '',
		aside: '',
	},
	bridge: {
		// Work 页底部桥接到 Journal / Contact。
		title: 'Elsewhere',
		intro: '',
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
		title: 'Not a category.',
		intro: '',
	},
	current:
		'Independent research, software practice, and visual observation around AI systems, platforms, convenience, audit, and institutional judgment.',
	focusTitle: 'Current focus',
	journalTitle: 'Index',
	journalIntro: '',
	linksTitle: 'Links',
} as const;

/**
 * contactPage 控制 /contact 页面。
 *
 * Contact 只提供低调联系方式和边界说明。
 */
export const contactPage = {
	hero: {
		kicker: 'Contact',
		title: 'Email.',
		intro: '',
		asideTitle: 'Email',
	},
	noteTitle: 'Links',
	note: '',
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
		title: 'Notes and fragments.',
		intro: '',
	},
	writingTitle: 'Writing',
	writingIntro: '',
	visualTitle: 'Image notes',
	visualIntro: '',
} as const;

/**
 * footerCopy 控制页脚左侧一句话。
 *
 * 这里要比首页更稳定、更像身份摘要。
 * 不建议写得很抒情，因为 footer 会在每页重复出现。
 */
export const footerCopy =
	'AI systems / judgment / fragments.';

/**
 * legacyCopy 是旧占位页文案的保留字段。
 *
 * 当前 /table 页面已经不再读取这些长文案，只显示 not public yet。
 * 如果以后重新开放 Table，再决定是否恢复使用。
 */
export const legacyCopy = {
	tableLead: 'Not yet.',
	tableBody: '',
} as const;
