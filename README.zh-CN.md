# Open CS Atlas

简体中文 | [English](README.md)

Open CS Atlas 是一个面向中文学习者的双语计算机科学自学规划器。它把公开课程、课程讲义和项目里程碑整理成可搜索、可筛选、可收藏、可追踪进度的学习路线图。

在线访问：[Open CS Atlas 中文模式](https://rowan2005321.github.io/CS-learning/?lang=zh) | [English mode](https://rowan2005321.github.io/CS-learning/?lang=en)

> 截图占位说明：每次重要 UI 发布后建议补充桌面端和移动端截图。建议路径：`docs/assets/open-cs-atlas-desktop.png` 和 `docs/assets/open-cs-atlas-mobile.png`。

## 功能列表

- 中文和英文界面切换。
- 基于路线的学习地图：Foundations、Systems、AI & Data、Software Engineering、Interview Prep。
- 支持课程搜索、学科筛选、难度筛选和路线筛选。
- 支持表格视图和卡片视图，移动端自动使用卡片展示。
- 收藏课程和已完成课程保存在本地 localStorage。
- 根据已完成课程真实计算总体进度。
- 学习计划面板可根据每周可学习小时数估算完成时间。
- 每门课程都有官方直达链接。
- 支持 GitHub Pages 静态部署。

## 技术栈

- React 19
- Vite 6
- Lucide React
- ESLint
- Prettier
- Vitest
- GitHub Actions 和 GitHub Pages

## 本地开发

```powershell
npm install
npm run dev
```

然后打开 Vite 输出的本地地址。

## 检查命令

```powershell
npm run lint
npm run test
npm run build
```

生产构建产物会生成在 `dist/` 目录。

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
