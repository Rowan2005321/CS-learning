# Open CS Atlas

简体中文 | [English](README.md)

Open CS Atlas 是一个面向中文学习者的双语计算机科学自学规划器。它把公开课程、课程讲义和项目里程碑整理成可搜索、可筛选、可收藏、可追踪进度的学习路线图。

在线访问：[Open CS Atlas 中文模式](https://rowan2005321.github.io/CS-learning/?lang=zh) | [English mode](https://rowan2005321.github.io/CS-learning/?lang=en)

> 截图占位说明：每次重要 UI 发布后建议补充桌面端和移动端截图。建议路径：`docs/assets/open-cs-atlas-desktop.png` 和 `docs/assets/open-cs-atlas-mobile.png`。

## 给 2026 高考后选择计算机科学的同学

如果你刚结束 2026 年高考，正在报考或即将进入计算机科学相关专业，不必因为 AI Agent、自动编程和大模型工具的高速发展而过度焦虑。技术变化越快，越需要扎实的基础、清晰的问题意识和持续动手的能力。

计算机科学不只是“学某个语言”或“追某个热门框架”。它更像一张长期地图：编程、数学、数据结构、系统、网络、数据库、AI、软件工程和安全会互相连接。AI Agent 会改变写代码的方式，但不会替代你理解问题、拆解系统、判断取舍和创造新方向的能力。

给新同学的几句话：

- 不要急着证明自己“会很多工具”，先把基础课、英文阅读和动手项目稳住。
- 不要被“AI 会不会取代程序员”困住，真正重要的是学会用 AI 放大自己的学习、实验和表达能力。
- 不要只盯着就业焦虑，大学四年更值得训练的是发散思维、系统思维和把想法做成作品的能力。
- 找到一个方向持续深入：AI 工程、系统、数据、安全、Web3、开发工具、教育技术都可能长出新的机会。
- 每天记录一点学习过程，回头看时你会发现，长期进步往往来自稳定的小步推进。

Open CS Atlas 希望帮助你把焦虑变成路线，把路线变成计划，把计划变成每天可以执行的行动。

## 功能列表

- 中文和英文界面切换。
- 基于路线的学习地图：Foundations、Systems、AI & Data、Software Engineering、Interview Prep。
- 支持课程搜索、学科筛选、难度筛选和路线筛选。
- 支持表格视图和卡片视图，移动端自动使用卡片展示。
- 收藏课程和已完成课程保存在本地 localStorage。
- 根据已完成课程真实计算总体进度。
- 学习计划面板可根据每周可学习小时数估算完成时间。
- 学习记录面板可记录每日学习小时数、笔记、产出、下一步计划和连续记录天数，并保存在本地。
- 可选 Supabase 账号登录与云同步，支持同步收藏课程、已完成课程和学习记录。
- 由 `public/three3.json` 驱动的 Three.js 交互路线地图。
- 多页面静态架构，包含 `/courses/`、`/tracks/`、`/study-log/`、`/account/`、`/projects/` 和 `/sources/`。
- 使用 Web Worker 承担课程搜索排序、路线时间估算和进度摘要等规划计算。
- 每门课程都有官方直达链接。
- 支持 GitHub Pages 静态部署。

## 技术栈

- React 19
- Vite 6
- Three.js
- Supabase JS
- Web Workers
- Lucide React
- ESLint
- Prettier
- Vitest
- GitHub Actions 和 GitHub Pages

## 本地开发

请先克隆仓库，并进入项目根目录：

```powershell
git clone https://github.com/Rowan2005321/CS-learning.git
cd CS-learning
```

安装依赖并启动 Vite：

```powershell
npm.cmd install
npm.cmd run dev
```

然后打开 Vite 输出的本地地址。

所有 npm 命令都必须在项目根目录执行，也就是包含 `package.json` 的目录。如果你在 `C:\Users\pc` 或其他父目录直接运行，npm 会报 `Could not read package.json`。

## 检查命令

```powershell
npm.cmd run lint
npm.cmd run test
npm.cmd run build
```

生产构建产物会生成在 `dist/` 目录。

## 架构说明

Open CS Atlas 现在是 Vite 多页面应用，不再只依赖单页 hash 导航。主要静态页面包括：

- `/`：首页 Hero 和路线总览。
- `/courses/`：课程搜索、筛选、路线计划、收藏和完成状态。
- `/study-log/`：每日学习记录、统计和复盘图表。
- `/tracks/`：路线图和学科地图。
- `/account/`：可选 Supabase 登录和云同步。
- `/projects/`、`/sources/`：项目里程碑和课程来源说明。

旧链接如 `/#courses`、`/#study-log` 会自动跳转到对应页面，避免已有 GitHub Pages 链接失效。

课程规划计算通过 `src/hooks/useCoursePlannerWorker.js` 接入 Web Worker。Worker 调用 `src/app/coursePlanner.js` 中的纯函数；如果浏览器不支持 Worker，应用会自动回退到同步计算。

页面、Worker、Supabase 和未来 Agent 后端边界详见 [`docs/architecture.md`](docs/architecture.md)。

## Supabase 云同步

云同步是可选能力。没有配置 Supabase 时，应用仍然可以完整使用本地功能。

1. 创建 Supabase 项目。
2. 在 Supabase SQL Editor 中运行 [`supabase/schema.sql`](supabase/schema.sql)。
3. 复制 `.env.example` 为 `.env.local`。
4. 设置 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_PUBLISHABLE_KEY`。

完整步骤见 [`docs/supabase-setup.md`](docs/supabase-setup.md)。

## Three.js 路线地图

首页路线地图由 [`public/three3.json`](public/three3.json) 驱动。后续要新增节点、连线、颜色、相机或动画参数，优先修改这个 JSON，再调整渲染代码。

## 课程数据格式

课程数据位于 `src/data/courses.js`。每门课程应包含：

```js
{
  id: "cs50x",
  discipline: "programming",
  level: "intro",
  tracks: ["foundations", "interview-prep"],
  provider: "Harvard / CS50",
  code: "CS50x",
  title: { en: "...", zh: "..." },
  description: { en: "...", zh: "..." },
  audience: { en: "...", zh: "..." },
  outcomes: { en: "...", zh: "..." },
  prerequisites: { en: "...", zh: "..." },
  language: "English",
  weeks: 8,
  hoursPerWeek: 8,
  isFree: true,
  officialUrl: "https://example.edu/course",
  lastChecked: "2026-06-27",
  tags: ["programming", "python"]
}
```

请使用稳定的 `id`、官方链接和简洁的中英文描述。

## 如何贡献课程

新增课程前，请先阅读 `docs/content-guidelines.md`。

优先收录：

- 来自大学或长期维护教育项目的官方资源。
- 有 syllabus、lecture notes、assignments、labs、projects 或 problem sets 的课程。
- 前置知识和学习产出清晰的课程。
- 长期可访问的资源。
- 明确标注费用状态和主要语言的课程。

不要添加低质量广告页、盗版课程、付费内容的非官方搬运、失效链接或来源不清的资源。

## Roadmap

- 扩充体系结构、编译器、网络、数据库、分布式系统、AI 工程和安全方向课程。
- 增加官方链接的定期可用性检查。
- 增加按每周时间和目标日期生成学习计划的功能。
- 为中文学习者增加更多前置知识桥接页面。
- 当课程目录扩大后，补充正式截图和小型文档站。

## GitHub Pages

仓库包含 `.github/workflows/deploy-pages.yml`。每次推送到 `main` 后，GitHub Actions 会安装依赖、运行 lint、运行测试、构建站点，并把 `dist/` 部署到 GitHub Pages。

## License

代码和文档使用 MIT License。课程名称和外部课程资料归各自提供方所有。
