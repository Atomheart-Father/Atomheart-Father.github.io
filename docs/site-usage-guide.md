# Boxz Studio 网站使用说明

这份文档用于日常维护 Boxz Studio。你可以先按这里的流程补内容、本地预览、检查构建，再决定是否 push 到 GitHub 自动发布。

## 1. 当前网站是什么

这是一个免费的静态网站：

- 技术栈：Astro + TypeScript + Tailwind CSS
- 内容方式：Markdown / MDX 文件 + typed content collections
- 部署方式：GitHub Pages
- 线上地址：https://boxz-studio.github.io/
- 正式发布仓库：https://github.com/boxz-studio/boxz-studio.github.io
- 旧个人仓库：https://github.com/Atomheart-Father/Atomheart-Father.github.io

它没有数据库、没有后台登录、没有 CMS。所谓“后台接口”在 v1 里就是文件接口：你改配置文件和 Markdown 文件，Astro 会自动把它们渲染成页面。

## 1.1 本地、GitHub、线上网页的关系

这套网站要分清三层：

```text
你的电脑本地仓库
  -> 你编辑文件、运行 npm、检查页面

GitHub 仓库
  -> 保存网站源码，是线上部署的来源

GitHub Pages 线上网站
  -> GitHub Actions 自动 build 后发布出来的静态网页
```

最重要的结论：

- `npm run dev` 只是本地预览，不会更新线上网页
- `npm run check` 只是本地检查，不会更新线上网页
- `npm run build` 只是本地构建测试，不会更新线上网页
- 真正更新线上网页，需要把改动 `commit` 并 `push` 到 GitHub 的 `main` 分支
- push 之后，GitHub Actions 会在 GitHub 云端重新执行安装依赖、构建、部署
- 你不需要本地一直启动网站，GitHub Pages 才能显示
- 本地服务器关掉后，线上站点仍然照常存在

实际流程是：

```text
1. 本地改 Markdown / 配置 / 图片
2. 本地 npm run check
3. 本地 npm run build
4. git add
5. git commit
6. git push origin main
7. GitHub Actions 自动部署
8. https://boxz-studio.github.io/ 更新
```

可以把它理解成：

```text
npm = 本地试运行和检查工具
git = 把你的改动送到 GitHub
GitHub Actions = GitHub 服务器上的自动构建工人
GitHub Pages = 最终公开网页
```

如果你只是在本地改了文件，但没有 push：

```text
本地能看到变化
GitHub 仓库看不到变化
线上网页也不会变化
```

如果你 push 了，但内容还是 `status: "draft"` 或 `visibility: "private"`：

```text
GitHub 仓库会更新
线上可能不会显示新条目
因为内容规则把它隐藏了
```

如果你想直接在 GitHub 网页上编辑文件，也可以：

```text
GitHub 网页编辑文件 -> Commit changes to main -> GitHub Actions 自动部署
```

但是这种方式没有本地 `npm run check`，frontmatter 写错时更容易让构建失败。推荐先本地测试，再 push。

## 1.2 两个 GitHub 仓库怎么分工

现在正式网页使用组织仓库：

```text
https://github.com/boxz-studio/boxz-studio.github.io
```

正式线上地址是：

```text
https://boxz-studio.github.io/
```

旧个人仓库可以继续作为源仓、备份仓或历史入口：

```text
https://github.com/Atomheart-Father/Atomheart-Father.github.io
```

本地仓库会把 `origin` 指向正式发布仓，同时保留一个 `personal` remote 指向旧个人仓。实际含义是：

```text
origin   = 新组织发布仓库
personal = 旧个人仓库
```

如果只想更新正式网页：

```bash
git push origin main
```

如果想两个仓库都更新：

```bash
git push origin main
git push personal main
```

仓库里也放了一个自动同步工作流：`.github/workflows/sync-boxz-studio.yml`。它只会在旧个人仓库里运行；当你 push 到旧个人仓库时，它可以自动把 `main` 同步到 `boxz-studio/boxz-studio.github.io`。

这个自动同步需要你在旧个人仓库设置一个 GitHub secret：

```text
BOXZ_STUDIO_SYNC_TOKEN
```

这个 token 需要有 `boxz-studio/boxz-studio.github.io` 的 contents write 权限。没有这个 secret 时，工作流会跳过同步，不会影响网站部署。

## 2. 最常用命令

先进入站点目录：

```bash
cd /Users/bozhongxiao/Desktop/ChlomeeTV/论文/boxz-studio-site
```

如果是第一次在这台机器上跑，先安装依赖：

```bash
npm install
```

本地启动：

```bash
npm run dev
```

打开浏览器访问：

```text
http://localhost:4321
```

检查内容 schema、类型和页面生成：

```bash
npm run check
```

构建生产版本：

```bash
npm run build
```

预览生产构建：

```bash
npm run preview
```

创建新内容：

```bash
npm run new:content -- journal "My New Note"
npm run new:content -- sample "A Public Sample"
npm run new:content -- research "A Research Memo"
npm run new:content -- evidence "A Dossier Record"
npm run new:content -- service "A New Service"
```

导入摄影系列：

```bash
npm run import:photos -- private/photo_manifests/<slug>.yaml
```

## 3. 文件结构怎么理解

主要只需要碰这些地方：

```text
src/config/site.config.ts          全站文字、导航、首页、About、Contact 等配置
src/content/work/                  当前 Work 项目：研究、调研、问卷系统接口
src/content/services/              未来 Services/咨询类草稿模板，当前不公开
src/content/journal/               Journal 文章、短札、case note、image note
src/content/research/              未来 Research 条目，当前不公开成页面
src/content/samples/               未来 Samples 条目，当前不公开成页面
src/content/works/                 旧 Works 架构内容，当前不公开成页面
src/content/visual-series/         未来摄影系列的公开内容文件，当前不进一级导航
src/data/visual-series/            摄影导入后生成的公开 JSON 元数据
src/assets/visual-series/          摄影导入后生成的网页尺寸图片
private/photo_manifests/           私有摄影选择清单，不提交 yaml
public/                            直接公开的静态文件，例如 journal 图片
scripts/new_content.py             新内容生成脚本
scripts/import_photos.py           摄影导入脚本
```

一般不要改这些地方，除非你明确要改代码或视觉系统：

```text
src/pages/                         页面路由代码
src/components/                    页面组件
src/lib/                           内容读取、排序、过滤逻辑
src/styles/global.css              09 sterile terminal 视觉系统
src/content.config.ts              内容 schema
.github/workflows/deploy.yml       GitHub Pages 自动部署
```

## 4. 公开页面分别是什么

### Home `/`

首页是对外前门。现在结构是：

- 第一屏：一句强定位 + protocol field
- 四个入口：Work / Journal / About / Contact
- Selected surface：只有当 Journal 或 Image Note 有 published 内容时才出现
- Contact CTA：引导到联系页

主要编辑位置：

```text
src/config/site.config.ts
src/content/work/*.md
src/content/journal/*.md
```

注意：首页大标题目前在 `src/pages/index.astro` 里有一处硬排版，因为它包含黑底 highlight。普通文案优先改 `site.config.ts`，如果要改第一屏大标题的具体断句和 highlight，再改页面代码。

### Work `/work`

这是当前公开的研究工作入口。这里的 Work 指你自己的研究项目、调研系统、问卷系统，不是接咨询的服务菜单。

当前状态：

- 在顶部导航显示
- 首页有 Work 入口
- 读取 `src/content/work/*.md`
- 当前公开项目是第四篇论文相关的 centralized interpretive pipeline / human validation 项目

公开规则：

```text
visibility: "public"
status: "active"
```

`draft` 或 `private` 都不会显示。

问卷规则：

- `questionnaire.status: "manual_distribution"`：显示问卷状态，但不提供公开下载
- `questionnaire.status: "external_link"` + `questionnaire.href`：显示网页问卷或外部表单链接
- GitHub Pages 没有后端，不能自己安全收集问卷答案；如果要网页填写，需要接 Tally、Google Forms、Qualtrics、Formspree，或做“填写后下载结果再邮件返回”的静态方案

不要公开：

- 参与者名单
- 内部分配表
- response template
- raw response
- 未准备公开的手稿全文
- 本地绝对路径

### Journal `/journal`

这是公开 writing surface，不叫 blog。它支持四种类型：

- `long_note`
- `short_note`
- `case_note`
- `image_note`

读取位置：

```text
src/content/journal/*.md
```

只有 `status: "published"` 会显示。`draft` 不显示，也不会生成详情页。

`image_note` 会进入 Journal 下方的 Image Notes 区，不会变成一级 Photography。

### About `/about`

这是身份说明页，不是 CV 时间轴。主要编辑：

```text
src/config/site.config.ts
```

相关字段：

- `aboutPage.hero`
- `aboutPage.current`
- `aboutPage.journalIntro`
- `researchPrograms`
- `siteMeta.email`
- `siteMeta.orcid`
- `siteMeta.github`

### Contact `/contact`

这是联系入口。主要编辑：

```text
src/config/site.config.ts
```

联系邮箱来自：

```ts
siteMeta.email
```

当前 Contact 只保留邮箱、ORCID、GitHub 和一段很短的联系说明；没有表单、预约入口或问题清单。

### Research `/research`

这个路由当前不公开正式内容。直接访问只会提示 Research 还没开放，并指向 Journal。

`src/content/research/*.md` 仍然保留为未来接口，但现在不要把研究草稿包装成公开成果。

### Samples `/samples`

这个路由当前不公开正式内容。直接访问只会提示 Samples 还没开放。

`src/content/samples/*.md` 仍然保留为未来接口，但没有真实样本前不显示 format 占位说明。

### Works `/works`

这是旧的混合作品架构，保留给未来论文、项目和视觉系列。它不是现在主导航里的 `Work`，当前也不公开内容。

读取：

```text
src/content/works/*.md
src/content/visual-series/*.md
src/data/visual-series/*.json
src/assets/visual-series/
```

未来适合放：

- abstract-level paper
- project
- longform
- curated visual series

当前规则：

- `/works` 只显示“Public works are not listed yet”
- `/works/<slug>` 不会静态生成
- 旧论文内容文件不会被公开展示

不要把论文 PDF、履历 PDF、证件、电话等放进去。

### Notes `/notes`

这是旧占位页。现在正式写作入口是 `/journal`。保留 `/notes` 是为了兼容旧结构。

### Table `/table`

这是 legacy future route。当前只显示“Table is not public yet”，不展示未成形设想。

## 5. 全站配置怎么改

打开：

```text
src/config/site.config.ts
```

这里放的是全站常用文案和导航，不需要进入组件改。

常见修改：

```ts
export const siteMeta = {
  title: 'Boxz Studio',
  description: '...',
  email: '...',
  orcid: '...',
  github: '...',
} as const;
```

一级导航：

```ts
export const primaryNav = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;
```

不建议轻易加太多导航。当前美学依赖克制的信息层级。

研究方向：

```ts
export const researchPrograms = [
  {
    title: 'AI adoption, evaluation, and decision quality',
    summary: '...',
  },
] as const;
```

这些会影响 Research 和 About。首页现在不展示未完成的 research program 模块。

## 6. 如何编辑 Work 项目

Work 项目文件在：

```text
src/content/work/
```

推荐用脚本创建：

```bash
npm run new:content -- work "New Research Project"
```

示例结构：

```yaml
---
title: "Canonical Order in AI Interpretive Pipelines"
slug: "canonical-order-interpretive-pipelines"
year: 2026
kind: "research_project"
summary: "A public-safe project summary."
status: "active"
visibility: "public"
featured: true
sortOrder: 10
stage: "Manuscript drafting; human validation package prepared"
access: "public_summary"
themes: ["AI interpretation", "canonical order", "human validation"]
publicMaterials:
  - "Public-safe project summary"
  - "Questionnaire workflow description"
questionnaire:
  status: "manual_distribution"
  label: "Human validation questionnaire"
  note: "Questionnaires are distributed manually for now."
links:
  - label: "Contact about this work"
    href: "/contact"
    type: "contact"
---
```

字段含义：

- `status`：`active`、`paused`、`archived` 会显示；`draft` 隐藏
- `visibility`：只有 `public` 会显示
- `kind`：`research_project`、`field_study`、`manuscript`、`questionnaire_system`、`tool`
- `stage`：当前阶段，保持一句话
- `publicMaterials`：说明哪些材料可以公开，但不要直接泄露内部文件
- `questionnaire.status`：`manual_distribution`、`external_link`、`closed`、`not_public`
- `questionnaire.href`：只有接外部问卷系统时才填写

问卷要注意：GitHub Pages 是静态站，没有数据库和登录系统。它可以展示问卷入口、外部表单链接、下载材料，但不能自己安全收集答案。

## 7. 如何编辑未来 Services 草稿

服务草稿文件在：

```text
src/content/services/
```

示例结构：

```yaml
---
title: "AI Demand Diagnosis Memo"
slug: "ai-demand-diagnosis-memo"
summary: "A short diagnostic engagement..."
status: "draft"
sortOrder: 10
idealFor:
  - "Small teams preparing to adopt AI"
clientQuestions:
  - "Should this AI idea exist?"
deliverables:
  - "One 45-60 minute problem interview"
boundaries:
  - "No code implementation"
upgradePaths:
  - "Second diagnosis round"
assetOutputs:
  - "Reusable demand diagnosis template"
ctaLabel: "Ask for a diagnosis memo"
ctaHref: "/contact"
---

Optional body copy can go here.
```

字段含义：

- `title`：服务标题
- `slug`：URL anchor，用小写英文和连字符
- `summary`：首页和列表摘要
- `status`：`active` 显示，`draft` 隐藏。当前默认保持 `draft`
- `sortOrder`：越小越靠前
- `idealFor`：适合谁
- `clientQuestions`：客户常见问题
- `deliverables`：交付物
- `boundaries`：明确不做什么
- `upgradePaths`：后续可能通向什么
- `assetOutputs`：内部可沉淀资产
- `ctaLabel` / `ctaHref`：按钮文案和链接

改完运行：

```bash
npm run check
npm run build
```

## 8. 如何新增 Journal 内容

最推荐用脚本：

```bash
npm run new:content -- journal "Why AI adoption fails before the prototype"
```

它会生成：

```text
src/content/journal/why-ai-adoption-fails-before-the-prototype.md
```

生成后默认是：

```yaml
status: "draft"
type: "short_note"
```

写完后，如果要公开，改成：

```yaml
status: "published"
```

Journal frontmatter 完整结构：

```yaml
---
title: "Title"
slug: "title"
date: 2026-04-25
summary: "One or two public-facing sentences."
status: "draft"
type: "short_note"
featured: false
sortOrder: 100
tags: ["ai adoption", "evaluation"]
highlights:
  - "answer before source"
  - "contestable synthesis"
relatedService: "ai-demand-diagnosis-memo"
cover: ""
images: []
---
```

字段含义：

- `status: "draft"`：不显示
- `status: "published"`：显示在 `/journal` 并生成 `/journal/<slug>`
- `type`：`long_note`、`short_note`、`case_note`、`image_note`
- `featured`：保留字段；Journal 当前主要按日期排序
- `sortOrder`：同一天文章的辅助排序
- `tags`：页面上显示的小标签
- `highlights`：文章页顶部黑底白字的重点短语，建议 3-6 个
- `relatedService`：可选，用来记录和哪个服务有关
- `cover`：暂时保留字段，当前页面没有强依赖
- `images`：只给 image note 使用

正文用普通 Markdown：

```md
## Core observation

Write the main argument.

## Why it matters

Explain why the failure mode matters.
```

强调语法可以直接写在 Markdown 里：

```md
**黑底反白重点**
*红色斜体重点*
<u>硬下划线重点</u>
<mark>黑底反白 marker</mark>
> 一句主旨句，页面会显示成很大的 pull quote。
`小型技术词`
<span class="signal">index term</span>
<span class="reverse">manual reverse span</span>
```

建议：

- `>` 每篇文章最多放 1-3 句，用来抓主旨
- `**...**` 放核心判断，不要整段都加粗
- `<u>...</u>` 适合强调术语或短句
- `<mark>...</mark>` 和 `<span class="reverse">...</span>` 适合需要反转色的短语
- `<span class="signal">...</span>` 适合关键词、机制名、编号感标签

公开 long note / work note 统一使用下面这个节奏，不要一篇写 `1. 2. 3.`，另一篇完全不编号：

```md
<span class="signal">long note</span> <span class="signal">theme</span>

> 一句主旨句。

## 00 / Entry frame

## 01 / First mechanism

## 02 / Second mechanism

## References
```

## 9. 如何写 Image Note

Image Note 是 Journal 的轻视觉分支，不是摄影作品集。

1. 准备网页图片，放到：

```text
public/journal/
```

如果目录不存在，可以新建：

```bash
mkdir -p public/journal
```

2. 新建 journal 文件：

```bash
npm run new:content -- image-note "Night Window Observation"
```

3. 修改 frontmatter：

```yaml
---
title: "Night Window Observation"
slug: "night-window-observation"
date: 2026-04-25
summary: "A sparse visual note on interior light and institutional distance."
status: "published"
type: "image_note"
featured: true
sortOrder: 20
tags: ["image note", "observation"]
relatedService: ""
cover: ""
images:
  - src: "/journal/night-window-01.webp"
    alt: "A dark window with reflected interior light."
    caption: "Interior light, exterior distance."
---

Short text goes here.
```

图片路径规则：

- 放在 `public/journal/night-window-01.webp`
- 页面里写 `/journal/night-window-01.webp`
- 每张图必须有 `alt`

注意：这个方式适合少量 Image Notes。如果是正式摄影系列，用下面的 visual series workflow。

## 10. 如何新增 Research 条目

创建：

```bash
npm run new:content -- research "Agentic Workflow Audit Memo"
```

生成文件在：

```text
src/content/research/
```

Research frontmatter：

```yaml
---
title: "Agentic Workflow Audit Memo"
slug: "agentic-workflow-audit-memo"
summary: "Abstract-level public description."
year: 2026
status: "draft"
category: "memo"
visibility: "private"
featured: false
sortOrder: 100
themes: ["evaluation", "agent workflow"]
relatedServices: ["llm-agent-workflow-audit"]
---
```

公开规则：

- `visibility: "private"`：不公开
- `visibility: "public"` 且 `status` 不是 `"draft"`：显示在 `/research`

可用 status：

```text
under_review
in_progress
working
draft
published
```

可用 category：

```text
under_review
in_progress
working_paper
memo
essay
note
```

建议：

- 双盲论文只写 abstract-level 信息
- 不上传 PDF
- 不写敏感私人信息
- 不把不成熟草稿伪装成 formal publication

## 11. 如何新增 Sample

Sample 是方法展示，不是普通博客。适合写：

- vague AI demand 怎么拆
- workflow audit 怎么判断失败点
- governance brief 怎么把问题压成决策结构

创建：

```bash
npm run new:content -- sample "Why vague AI demand should not start with a chatbot"
```

frontmatter：

```yaml
---
title: "Why vague AI demand should not start with a chatbot"
slug: "why-vague-ai-demand-should-not-start-with-a-chatbot"
date: 2026-04-25
summary: "A method note on why demand should be diagnosed before a demo is built."
status: "draft"
template: "diagnosis"
relatedService: "ai-demand-diagnosis-memo"
sortOrder: 100
tags: ["diagnosis", "ai adoption"]
---
```

公开：

```yaml
status: "published"
```

可用 template：

```text
diagnosis
workflow_audit
governance_brief
case_note
```

## 12. 如何准备未来 Works 里的论文和项目

`/works` 是混合作品库，和主导航里的 `/work` 不同。当前它不公开具体作品，只保留未来接口。

论文/项目文件在：

```text
src/content/works/
```

frontmatter：

```yaml
---
title: "Drifting Capability, Collapsing Audit"
slug: "drifting-capability-collapsing-audit"
year: 2026
kind: "paper"
summary: "A socio-technical diagnosis..."
featured: true
sortOrder: 30
status: "under_review"
access: "abstract_only"
themes: ["surveillance governance", "audit", "agentic AI"]
---
```

字段含义：

- `kind`：`paper`、`project`、`longform`
- `status`：`under_review`、`submitted`、`rejected`、`in_progress`、`published`
- `access`：当前建议用 `abstract_only`
- `featured`：靠前显示
- `sortOrder`：越小越靠前

安全规则：

- 不放 PDF
- 不放审稿中的全文
- 不放私人路径
- 不放电话、证件、履历 PDF、学校证明

当前公开规则：

- 内容文件可以保留在 `src/content/works/`
- `/works` 不展示列表
- `/works/<slug>` 不会生成公开详情页
- 以后真要开放 Works，再改页面路由和导航

## 13. 如何新增正式摄影系列

正式摄影系列走“私有原图库 -> 本地 manifest -> 网页尺寸衍生图 -> 公开元数据”的流程。

不要把 `/Volumes/Expansion/pic_post` 直接放进网站。

### 12.1 建私有 manifest

复制模板：

```bash
cp scripts/photo_manifest.example.yaml private/photo_manifests/canal-edges.yaml
```

编辑：

```yaml
title: "Canal Edges"
slug: "canal-edges"
year: 2026
summary: "A short curatorial note for the series."
cover: "/absolute/path/to/cover-image.jpg"
images:
  - source: "/absolute/path/to/cover-image.jpg"
    alt: "Short alt text for the cover image."
    caption: "Optional caption."
    crop: "wide"
  - source: "/absolute/path/to/second-image.jpg"
    alt: "Short alt text for a portrait image."
    caption: "Optional caption."
    crop: "portrait"
```

注意：

- `private/photo_manifests/*.yaml` 已经在 `.gitignore` 里，不会提交
- `source` 可以是任意绝对路径
- 每张图必须有 `alt`
- `cover` 可以写绝对路径，也可以写 source 文件名

### 12.2 运行导入

```bash
npm run import:photos -- private/photo_manifests/canal-edges.yaml
```

会生成：

```text
src/assets/visual-series/canal-edges/
src/data/visual-series/canal-edges.json
```

导入脚本会：

- 读取原图
- 修正 EXIF 方向
- 最长边压到 2200px
- 生成 JPEG
- 记录 width、height、orientation、alt、caption

### 12.3 新增公开 series 内容文件

创建：

```text
src/content/visual-series/canal-edges.md
```

内容：

```yaml
---
title: "Canal Edges"
slug: "canal-edges"
year: 2026
summary: "A short curatorial note for the series."
featured: true
sortOrder: 40
status: "published"
coverImage: "/src/assets/visual-series/canal-edges/01-cover-image.jpg"
palette: ["#e7ebe4", "#070807", "#e83b24"]
manifest: "canal-edges.json"
---

A short series statement goes here.
```

当前公开规则：

- `status: "draft"`：不显示
- `status: "published"`：内容准备就绪，但当前 `/works` 公开路由仍关闭
- 以后真要开放 visual series，再恢复 `/works` 列表和详情页

## 14. Evidence 是什么

Evidence 是内部 dossier 记录，不是当前公开页面的主要内容。它用于长期积累：

- publication
- public_writing
- template
- outreach
- talk
- client_work
- funding
- testimonial

创建：

```bash
npm run new:content -- evidence "ODI event follow-up"
```

frontmatter：

```yaml
---
title: "ODI event follow-up"
slug: "odi-event-follow-up"
date: 2026-04-25
summary: "Short internal record."
category: "outreach"
visibility: "internal"
status: "draft"
sortOrder: 100
relatedItems: []
---
```

当前建议：

- 默认 `visibility: "internal"`
- 默认 `status: "draft"` 或 `logged`
- 不要把私人联系人、未公开合作、敏感细节放到 public repo

## 15. 排序规则

服务：

```text
sortOrder 小的靠前
```

Journal：

```text
date 新的靠前
同一天时 sortOrder 小的靠前
```

Research：

```text
sortOrder 小的靠前
按 category 进入对应栏目
```

Works：

```text
featured: true 优先
sortOrder 小的靠前
year 新的靠前
```

建议使用：

```yaml
sortOrder: 10
sortOrder: 20
sortOrder: 30
```

这样以后可以在中间插入 `15`、`25`。

## 16. 状态和可见性速查

```text
services:
  active  -> 当前仍不显示在 /work；Services 是未来咨询/服务接口
  draft   -> 隐藏

journal:
  published -> 显示在 /journal，并生成详情页
  draft     -> 隐藏

work:
  visibility public + status active/paused/archived -> 显示在 /work，并生成详情页
  visibility private                                -> 隐藏
  status draft                                      -> 隐藏

research:
  当前不在主页或一级导航显示
  visibility public + status 非 draft -> 仅在重新开放 /research 后才显示
  visibility private                  -> 隐藏
  status draft                         -> 隐藏

samples:
  当前不在主页或一级导航显示
  published -> 仅在重新开放 /samples 后才显示
  draft     -> 隐藏

works:
  当前不公开列表，也不生成详情页

visual-series:
  当前不公开列表，也不生成详情页
  draft     -> 隐藏

evidence:
  当前没有主要公开页面，默认内部记录
```

## 17. 本地测试流程

本地测试的目的，是在 push 到 GitHub 之前先发现问题。它不会影响线上网站。

每次补内容后建议这样走：

```bash
npm run check
npm run build
npm run dev
```

三条命令分别做什么：

```text
npm run check
  检查 Astro、TypeScript、content collection frontmatter 是否合法

npm run build
  模拟 GitHub Pages 发布前的正式构建

npm run dev
  启动本地预览服务器，只给你自己看
```

然后手动检查：

```text
http://localhost:4321/
http://localhost:4321/work
http://localhost:4321/journal
http://localhost:4321/about
http://localhost:4321/contact
```

`/work` 是公开导航入口。`/works`、`/research`、`/samples`、`/notes`、`/table` 现在都不是公开导航入口，只需要在你准备重新开放对应模块时检查。

如果你准备重新开放 research：

```text
http://localhost:4321/research
```

如果你准备重新开放 sample：

```text
http://localhost:4321/samples
```

如果你准备重新开放 works 或 visual series：

```text
http://localhost:4321/works
```

常见错误：

- frontmatter 少字段
- `status` 拼错
- `type` 不在允许值里
- YAML 数组缩进错
- `date` 格式不是 `YYYY-MM-DD`
- 图片路径不存在
- `slug` 和文件名不一致造成 URL 混乱

本地测试通过后，线上仍然不会自动变化。下一步必须走 GitHub 提交流程。

## 18. 发布到线上

线上发布不是靠本地 `npm`，而是靠 GitHub：

```text
本地 commit/push -> GitHub 收到 main 分支更新 -> GitHub Actions 自动构建 -> GitHub Pages 发布
```

### 17.1 推荐方式：本地测试后 push

确认本地通过：

```bash
npm run check
npm run build
git status --short
```

查看有哪些文件变了：

```bash
git status --short
```

常见输出例子：

```text
 M src/content/journal/my-note.md
 M src/config/site.config.ts
?? public/journal/new-image.webp
```

含义：

```text
M  = modified，已有文件被修改
?? = untracked，新文件还没有加入 git
```

把要发布的改动加入 git：

```bash
git add src/content src/config public src/assets src/data docs README.md
```

如果你只改了一篇 Journal，也可以更精确：

```bash
git add src/content/journal/my-note.md
```

提交：

```bash
git commit -m "Add new public content"
```

推送到 GitHub：

```bash
git push origin main
```

推送到 `main` 后，GitHub Actions 会自动部署 GitHub Pages。

查看部署：

```bash
gh run list --repo boxz-studio/boxz-studio.github.io --limit 5
```

如果想等待某次部署完成：

```bash
gh run watch <run-id> --repo boxz-studio/boxz-studio.github.io --exit-status
```

线上地址：

```text
https://boxz-studio.github.io/
```

通常 push 后几十秒到一两分钟内会更新。浏览器如果有缓存，可以强制刷新。

### 17.2 直接在 GitHub 网页上编辑

也可以不用本地命令，直接在 GitHub 上改：

```text
1. 打开 https://github.com/boxz-studio/boxz-studio.github.io
2. 找到要改的文件，例如 src/content/journal/example.md
3. 点编辑
4. 修改 Markdown / frontmatter
5. 点 Commit changes
6. 确认提交到 main 分支
7. GitHub Actions 自动部署
```

这种方式的优点：

- 不需要本地运行 `npm`
- 小改动很快

这种方式的风险：

- 写错 YAML 时，GitHub Actions 可能构建失败
- 你要等 CI 报错后再改
- 不适合一次性改很多文件或导入图片

### 17.3 什么文件需要 push

普通文字内容：

```text
src/content/**/*.md
src/config/site.config.ts
```

Journal 里的少量公开图片：

```text
public/journal/*
src/content/journal/*.md
```

正式 visual series：

```text
src/assets/visual-series/<slug>/*
src/data/visual-series/<slug>.json
src/content/visual-series/<slug>.md
```

Work 项目：

```text
src/content/work/*.md
```

未来 Services 草稿：

```text
src/content/services/*.md
```

文档：

```text
docs/*.md
README.md
```

不要 push：

```text
private/photo_manifests/*.yaml
private/photo_manifests/*.yml
node_modules/
dist/
.astro/
output/playwright/
```

这些已经在 `.gitignore` 里，但发布前仍然要有这个意识。

### 17.4 为什么本地 build 和 GitHub build 都要有

你本地运行：

```bash
npm run build
```

只是提前模拟一次构建，帮你在 push 前发现问题。

你 push 后，GitHub Actions 会再在云端运行一次构建。最终线上网站来自 GitHub Actions 的构建结果，而不是你本地的 `dist/`。

所以正常情况下：

```text
不要手动提交 dist/
不要把本地 dev server 当成线上服务器
不要以为 npm run build 后网页就上线了
```

真正上线的触发条件是：

```text
git push origin main
```

## 19. 安全和公开边界

发布前检查：

- 不上传论文 PDF，除非你明确决定公开
- 不上传审稿中全文
- 不上传电话、证件、履历 PDF、学历证明
- 不上传原始摄影大图
- 不提交 `private/photo_manifests/*.yaml`
- 不把本地绝对原图路径写进公开 markdown
- 不公开私人邮箱往来、客户细节、未确认合作
- `alt` 不要写成一堆关键词，要正常描述图片

如果只是自己测试，优先保持：

```yaml
status: "draft"
visibility: "private"
```

## 20. 建议的内容补充顺序

先从最安全、最容易验证的内容开始：

1. 改 `src/config/site.config.ts` 里的 About / Contact 文案
2. 新增一个 `journal` short note，保持 `draft`
3. 本地 `npm run check`
4. 改成 `published`，看 `/journal` 和首页 Selected surface
5. 新增一个 `image_note`，用 `public/journal/` 的少量图片测试
6. 新增一个 `research`，先 `visibility: "private"`
7. 确认逻辑后再考虑 visual series 导入

## 21. 如果只想快速试一次

下面这个流程只会先在本地验证。看到本地成功后，如果想让线上也更新，还要执行 `git add`、`git commit`、`git push origin main`。

执行：

```bash
cd /Users/bozhongxiao/Desktop/ChlomeeTV/论文/boxz-studio-site
npm run new:content -- journal "Test Observation"
```

编辑生成的文件，把：

```yaml
status: "draft"
```

改成：

```yaml
status: "published"
```

然后运行：

```bash
npm run check
npm run dev
```

打开：

```text
http://localhost:4321/journal
```

如果看到新条目，说明基本内容管线正常。

然后发布到线上：

```bash
git add src/content/journal
git commit -m "Add test journal observation"
git push origin main
```

等待 GitHub Actions 完成后打开：

```text
https://boxz-studio.github.io/journal
```

如果你只是测试，不想让这篇测试内容公开，不要 push；或者把它改回：

```yaml
status: "draft"
```

再 commit/push。
