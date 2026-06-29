export const projectTracks = [
  {
    id: "cs-foundation",
    title: {
      en: "CS Foundation Projects",
      zh: "CS 基础项目线"
    },
    description: {
      en: "For zero-to-foundation learners who need a visible starting point.",
      zh: "适合零基础、准大一、刚开始自学 CS 的学习者。"
    }
  },
  {
    id: "software-engineering",
    title: {
      en: "Software Engineering / Full-stack Projects",
      zh: "软件工程 / 全栈项目线"
    },
    description: {
      en: "Move from course exercises into real web apps, testing, deployment, and backend data.",
      zh: "适合想从课程学习走向真实 Web 应用和工程实践的学习者。"
    }
  },
  {
    id: "vibe-coding",
    title: {
      en: "AI-assisted Software Engineering / Vibe Coding",
      zh: "AI 辅助软件工程 / Vibe Coding 项目线"
    },
    description: {
      en: "Use AI coding tools while keeping product, testing, review, and maintenance discipline.",
      zh: "适合想用 Cursor、Copilot、Replit、Windsurf 等工具做产品原型，同时保留工程质量、测试和代码审查能力的学习者。"
    }
  },
  {
    id: "agent-engineering",
    title: {
      en: "AI Agent / RAG Projects",
      zh: "AI Agent / RAG 项目线"
    },
    description: {
      en: "Build RAG, tool calling, function calling, agent workflow, and evaluation projects.",
      zh: "适合想做 RAG、tool calling、function calling、agent workflow、evaluation 的学习者。"
    }
  },
  {
    id: "blockchain-web3",
    title: {
      en: "Blockchain / Web3 Projects",
      zh: "区块链 / Web3 项目线"
    },
    description: {
      en: "Practice wallets, smart contracts, DeFi, on-chain analytics, and contract security.",
      zh: "适合想做钱包、智能合约、DeFi、链上数据分析、智能合约安全的学习者。"
    }
  },
  {
    id: "portfolio-capstone",
    title: {
      en: "Portfolio / Capstone Projects",
      zh: "作品集 / 综合毕业项目线"
    },
    description: {
      en: "Turn learning evidence into GitHub portfolio, interview material, and a complete capstone.",
      zh: "适合希望把学习成果整理成 GitHub 作品集、面试材料、留学背景提升材料的学习者。"
    }
  }
];

const defaultRubric = {
  en: [
    "Scope is clear and small enough to finish.",
    "README explains setup, decisions, and tradeoffs.",
    "Evidence is visible through commits, tests, screenshots, or a demo."
  ],
  zh: [
    "范围清楚，并且小到可以完成。",
    "README 说明环境、决策和取舍。",
    "通过提交记录、测试、截图或 demo 展示真实证据。"
  ]
};

const defaultReviewQuestions = {
  en: [
    "What did you build yourself?",
    "What failed and how did you debug it?",
    "What would you improve in the next iteration?"
  ],
  zh: ["哪些部分是你自己完成的？", "哪里失败过，你是如何调试的？", "下一轮你会优先改进什么？"]
};

const defaultPitfalls = {
  en: [
    "Trying to build too much before the core path works.",
    "Hiding AI-generated code instead of reviewing and documenting it.",
    "Skipping README and reproducibility notes."
  ],
  zh: [
    "核心路径还没跑通就想做太多功能。",
    "隐藏 AI 生成代码，而不是审查并记录。",
    "跳过 README 和可复现说明。"
  ]
};

const defaultAiWorkflow = {
  en: [
    "Ask AI to challenge the scope before coding.",
    "Use AI to draft tests and edge cases.",
    "Review every generated diff before committing."
  ],
  zh: [
    "编码前先让 AI 质疑项目范围。",
    "用 AI 起草测试和边界情况。",
    "每次提交前人工审查生成的 diff。"
  ]
};

function makeProject(project) {
  return {
    unlockCriteria: {
      requiredCourses: project.requiredCourses ?? [],
      requiredProjects: [],
      ...(project.unlockCriteria ?? {})
    },
    submissionRequirements: project.submissionRequirements ?? {
      en: ["GitHub repository", "Short README", "Reflection note"],
      zh: ["GitHub 仓库", "简短 README", "复盘记录"]
    },
    evaluationRubric: project.evaluationRubric ?? defaultRubric,
    reviewQuestions: project.reviewQuestions ?? defaultReviewQuestions,
    commonPitfalls: project.commonPitfalls ?? defaultPitfalls,
    aiAssistedWorkflow: project.aiAssistedWorkflow ?? defaultAiWorkflow,
    communityCta: project.communityCta ?? {
      en: "Share the repository link with a study partner or community for feedback.",
      zh: "把仓库链接发给同伴或社区，请对方给你一次具体反馈。"
    },
    nextProjectIds: project.nextProjectIds ?? [],
    tags: project.tags ?? [],
    ...project
  };
}

export const projects = [
  makeProject({
    id: "github-profile-and-dev-setup",
    trackIds: ["cs-foundation"],
    order: 1,
    title: {
      en: "GitHub Profile and Developer Setup",
      zh: "GitHub 主页与开发环境搭建"
    },
    subtitle: {
      en: "Start with tools, identity, and three tiny programs.",
      zh: "从工具、公开身份和三个小程序开始。"
    },
    description: {
      en: "Configure a clean local development environment, publish a GitHub profile README, and write three small programs.",
      zh: "配置本地开发环境，发布 GitHub profile README，并完成 3 个小程序。"
    },
    targetAudience: {
      en: "Absolute beginners or incoming CS students who need a concrete first step.",
      zh: "适合零基础、准大一、需要明确起点的学习者。"
    },
    difficulty: "beginner",
    estimatedWeeks: 1,
    estimatedHours: 8,
    requiredCourses: [],
    recommendedCourses: ["cs50x"],
    unlockCriteria: {
      requiredCourses: [],
      requiredProjects: []
    },
    deliverables: {
      en: ["GitHub profile README", "Three small programs", "Development setup note"],
      zh: ["GitHub 主页 README", "3 个小程序", "开发环境配置笔记"]
    },
    portfolioValue: {
      en: "Shows that you can set up tools, document work, and publish progress.",
      zh: "证明你能配置工具、记录过程，并公开展示学习进度。"
    },
    githubRepoSuggestion: "cs-foundation-start",
    nextProjectIds: ["cs-learning-notebook"],
    tags: ["git", "github", "setup", "beginner"]
  }),
  makeProject({
    id: "cs-learning-notebook",
    trackIds: ["cs-foundation", "portfolio-capstone"],
    order: 2,
    title: {
      en: "CS Learning Notebook",
      zh: "CS 学习笔记与术语表"
    },
    subtitle: {
      en: "Turn scattered notes into a reusable knowledge base.",
      zh: "把零散笔记变成可复用的知识库。"
    },
    description: {
      en: "Build a Markdown notebook for programming, discrete math, CS vocabulary, and weekly review notes.",
      zh: "用 Markdown 建立编程、离散数学、CS 术语和周复盘笔记。"
    },
    targetAudience: {
      en: "Learners who want a long-term personal CS reference.",
      zh: "适合想沉淀长期 CS 知识库的学习者。"
    },
    difficulty: "beginner",
    estimatedWeeks: 2,
    estimatedHours: 12,
    requiredCourses: ["cs50x"],
    recommendedCourses: ["mit-discrete"],
    unlockCriteria: {
      requiredCourses: ["cs50x"],
      requiredProjects: ["github-profile-and-dev-setup"]
    },
    deliverables: {
      en: ["Markdown notebook", "Glossary", "Weekly review template"],
      zh: ["Markdown 笔记库", "术语表", "周复盘模板"]
    },
    portfolioValue: {
      en: "Demonstrates learning discipline and technical communication.",
      zh: "展示学习纪律和技术表达能力。"
    },
    githubRepoSuggestion: "cs-learning-notebook",
    nextProjectIds: ["data-structures-visualizer"],
    tags: ["notes", "markdown", "glossary", "review"]
  }),
  makeProject({
    id: "data-structures-visualizer",
    trackIds: ["cs-foundation", "portfolio-capstone"],
    order: 3,
    title: {
      en: "Data Structures Visualizer",
      zh: "数据结构可视化器"
    },
    subtitle: {
      en: "Animate core structures instead of only memorizing them.",
      zh: "把核心数据结构做成可观察的交互项目。"
    },
    description: {
      en: "Implement and visualize arrays, linked lists, stacks, queues, trees, and graph traversal.",
      zh: "实现并可视化数组、链表、栈、队列、树和图遍历。"
    },
    targetAudience: {
      en: "Learners preparing for algorithms, interviews, or stronger programming fluency.",
      zh: "适合准备算法、面试，或想提升编程熟练度的学习者。"
    },
    difficulty: "foundation",
    estimatedWeeks: 3,
    estimatedHours: 30,
    requiredCourses: ["ucsd-dsa"],
    recommendedCourses: ["neetcode"],
    unlockCriteria: {
      requiredCourses: ["ucsd-dsa"],
      requiredProjects: ["cs-learning-notebook"]
    },
    deliverables: {
      en: ["Interactive visualizer", "Unit tests", "Complexity notes"],
      zh: ["交互式可视化页面", "单元测试", "复杂度说明"]
    },
    portfolioValue: {
      en: "Turns abstract algorithms into a visible, inspectable project.",
      zh: "把抽象算法变成可观察、可展示的项目。"
    },
    githubRepoSuggestion: "data-structures-visualizer",
    nextProjectIds: ["web-app-with-auth", "interview-prep-portfolio"],
    tags: ["data-structures", "algorithms", "visualization"]
  }),
  makeProject({
    id: "web-app-with-auth",
    trackIds: ["software-engineering", "portfolio-capstone"],
    order: 4,
    title: {
      en: "Web App with Auth",
      zh: "带登录认证的 Web 应用"
    },
    subtitle: {
      en: "Build a real user-facing app with protected state.",
      zh: "做一个包含受保护用户状态的真实 Web 应用。"
    },
    description: {
      en: "Create a web app with routing, forms, authentication, protected user state, and deployment.",
      zh: "做一个带登录、路由、表单校验、用户状态和部署的 Web 应用。"
    },
    targetAudience: {
      en: "Learners moving from scripts to user-facing software.",
      zh: "适合从脚本练习走向真实用户应用的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 4,
    estimatedHours: 45,
    requiredCourses: ["fullstackopen"],
    recommendedCourses: ["harvard-cs50w-web-programming", "portswigger"],
    unlockCriteria: {
      requiredCourses: ["fullstackopen"],
      requiredProjects: ["data-structures-visualizer"],
      minCompletedCourses: 2
    },
    deliverables: {
      en: ["Responsive app", "Auth flow", "Form validation", "Deployment URL"],
      zh: ["响应式应用", "认证流程", "表单校验", "部署链接"]
    },
    portfolioValue: {
      en: "Shows product thinking beyond isolated programming exercises.",
      zh: "体现超越单点编程练习的产品实现能力。"
    },
    githubRepoSuggestion: "auth-web-app",
    nextProjectIds: ["database-backed-learning-tracker", "testing-and-deployment-pipeline"],
    tags: ["react", "auth", "forms", "deployment"]
  }),
  makeProject({
    id: "database-backed-learning-tracker",
    trackIds: ["software-engineering", "portfolio-capstone"],
    order: 5,
    title: {
      en: "Database-backed Learning Tracker",
      zh: "数据库驱动的学习跟踪器"
    },
    subtitle: {
      en: "Persist personal learning data with schema, RLS, and sync.",
      zh: "用 schema、RLS 和同步逻辑持久化学习数据。"
    },
    description: {
      en: "Design database tables, RLS, indexes, and cloud sync logic for a long-term learning tracker.",
      zh: "设计数据库、RLS、索引和云端同步逻辑，做一个长期学习记录工具。"
    },
    targetAudience: {
      en: "Learners ready to connect frontend state with durable backend data.",
      zh: "适合准备把前端状态连接到持久化后端数据的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 3,
    estimatedHours: 35,
    requiredCourses: ["cmu-db", "fullstackopen"],
    recommendedCourses: ["cmu-ai-tools-software-dev"],
    unlockCriteria: {
      requiredCourses: ["cmu-db", "fullstackopen"],
      requiredProjects: ["web-app-with-auth"]
    },
    deliverables: {
      en: ["Schema migration", "RLS policies", "Sync service", "Mapper tests"],
      zh: ["Schema 迁移", "RLS 策略", "同步服务", "数据映射测试"]
    },
    portfolioValue: {
      en: "Demonstrates backend data modeling and security awareness.",
      zh: "展示后端数据建模和安全意识。"
    },
    githubRepoSuggestion: "database-learning-tracker",
    nextProjectIds: ["testing-and-deployment-pipeline", "capstone-product"],
    tags: ["database", "rls", "supabase", "sync"]
  }),
  makeProject({
    id: "testing-and-deployment-pipeline",
    trackIds: ["software-engineering", "vibe-coding"],
    order: 6,
    title: {
      en: "Testing and Deployment Pipeline",
      zh: "测试与部署流水线"
    },
    subtitle: {
      en: "Make quality gates visible before shipping.",
      zh: "在上线前建立可见的质量门禁。"
    },
    description: {
      en: "Add tests, lint, CI/CD, preview deployment, and release notes to an existing project.",
      zh: "给项目加入测试、lint、CI/CD、预览部署和发布说明。"
    },
    targetAudience: {
      en: "Learners who want engineering habits that survive larger projects.",
      zh: "适合想建立可迁移工程习惯的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 2,
    estimatedHours: 22,
    requiredCourses: ["fullstackopen"],
    recommendedCourses: ["cmu-ai-tools-software-dev", "aider-docs"],
    unlockCriteria: {
      requiredCourses: ["fullstackopen"],
      requiredProjects: ["web-app-with-auth"]
    },
    deliverables: {
      en: ["Unit tests", "Lint config", "CI workflow", "Deployment docs"],
      zh: ["单元测试", "Lint 配置", "CI 工作流", "部署文档"]
    },
    portfolioValue: {
      en: "Signals that you can maintain software, not just make demos.",
      zh: "说明你不只是会做 demo，也能维护软件。"
    },
    githubRepoSuggestion: "tested-deployed-web-app",
    nextProjectIds: ["open-source-contribution", "capstone-product"],
    tags: ["testing", "ci", "deployment", "quality"]
  }),
  makeProject({
    id: "prd-to-mvp-vibe-coding",
    trackIds: ["vibe-coding", "software-engineering"],
    order: 7,
    title: {
      en: "PRD to MVP with Vibe Coding",
      zh: "从 PRD 到 MVP 的 Vibe Coding"
    },
    subtitle: {
      en: "Use AI coding agents without losing product judgment.",
      zh: "用 AI coding agent 做 MVP，但保留产品判断。"
    },
    description: {
      en: "Write a small PRD, use AI coding tools to build an MVP, and document human decisions.",
      zh: "用 PRD + AI coding agent 做一个最小可用产品，并记录人工决策。"
    },
    targetAudience: {
      en: "Builders who want fast prototypes without becoming prompt-only developers.",
      zh: "适合想快速做原型但不想只会写提示词的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 2,
    estimatedHours: 20,
    requiredCourses: ["cmu-ai-tools-software-dev"],
    recommendedCourses: ["deeplearning-ai-vibe-coding-replit", "aider-docs"],
    unlockCriteria: {
      requiredCourses: ["cmu-ai-tools-software-dev"],
      requiredProjects: ["github-profile-and-dev-setup"],
      minCompletedCourses: 2
    },
    deliverables: {
      en: ["One-page PRD", "Working MVP", "Prompt and decision log"],
      zh: ["一页 PRD", "可运行 MVP", "提示词与决策记录"]
    },
    portfolioValue: {
      en: "Shows AI-accelerated product execution with human control.",
      zh: "展示由人控制的 AI 加速产品执行能力。"
    },
    githubRepoSuggestion: "prd-to-mvp-ai-build",
    nextProjectIds: ["ai-assisted-refactor-and-test", "ai-code-review-journal"],
    tags: ["prd", "mvp", "ai-coding", "vibe-coding"]
  }),
  makeProject({
    id: "ai-assisted-refactor-and-test",
    trackIds: ["vibe-coding", "software-engineering"],
    order: 8,
    title: {
      en: "AI-assisted Refactor and Test",
      zh: "AI 辅助重构与补测试"
    },
    subtitle: {
      en: "Improve old code with tests, error states, and reviewable diffs.",
      zh: "用测试、错误状态和可审查 diff 改进旧代码。"
    },
    description: {
      en: "Use AI to refactor legacy code, add tests, improve error handling, and write a review note.",
      zh: "用 AI 辅助重构旧代码，并补测试、错误状态处理和审查记录。"
    },
    targetAudience: {
      en: "Learners who want to use AI for maintenance, not just greenfield demos.",
      zh: "适合想把 AI 用在维护和改进，而不只是新项目 demo 的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 3,
    estimatedHours: 30,
    requiredCourses: ["cmu-ai-tools-software-dev", "fullstackopen"],
    recommendedCourses: ["swe-bench-benchmark", "aider-docs"],
    unlockCriteria: {
      requiredCourses: ["cmu-ai-tools-software-dev", "fullstackopen"],
      requiredProjects: ["prd-to-mvp-vibe-coding"]
    },
    deliverables: {
      en: ["Before/after diff", "Regression tests", "Error-state notes", "Refactor review"],
      zh: ["重构前后 diff", "回归测试", "错误状态说明", "重构审查记录"]
    },
    portfolioValue: {
      en: "Signals practical maintenance ability in the AI coding era.",
      zh: "体现 AI 编程时代的真实维护能力。"
    },
    githubRepoSuggestion: "ai-refactor-test-journal",
    nextProjectIds: ["ai-code-review-journal", "open-source-contribution"],
    tags: ["refactor", "testing", "maintenance", "ai-coding"]
  }),
  makeProject({
    id: "ai-code-review-journal",
    trackIds: ["vibe-coding", "portfolio-capstone"],
    order: 9,
    title: {
      en: "AI Code Review Journal",
      zh: "AI 生成代码人工审查日志"
    },
    subtitle: {
      en: "Record bugs, risks, and fixes in generated code.",
      zh: "记录 AI 生成代码里的 bug、风险和修复过程。"
    },
    description: {
      en: "Create a journal that reviews AI-generated code, including bugs, risks, fixes, and lessons.",
      zh: "记录 AI 生成代码的人工审查过程，包括 bug、风险和修复。"
    },
    targetAudience: {
      en: "Learners who want responsible AI-assisted engineering habits.",
      zh: "适合想建立负责任 AI 辅助工程习惯的学习者。"
    },
    difficulty: "foundation",
    estimatedWeeks: 2,
    estimatedHours: 18,
    requiredCourses: ["cmu-ai-tools-software-dev"],
    recommendedCourses: ["github-copilot-coding-agent", "portswigger"],
    unlockCriteria: {
      requiredCourses: ["cmu-ai-tools-software-dev"],
      requiredProjects: ["prd-to-mvp-vibe-coding"]
    },
    deliverables: {
      en: ["Review log", "Bug taxonomy", "Fixed examples", "Personal review checklist"],
      zh: ["审查日志", "问题分类", "修复案例", "个人审查清单"]
    },
    portfolioValue: {
      en: "Makes your judgment visible, not only your prompts.",
      zh: "让你的判断力可见，而不只是展示提示词。"
    },
    githubRepoSuggestion: "ai-code-review-journal",
    nextProjectIds: ["testing-and-deployment-pipeline", "open-source-contribution"],
    tags: ["code-review", "ai-risk", "security", "quality"]
  }),
  makeProject({
    id: "rag-course-qa-assistant",
    trackIds: ["agent-engineering", "portfolio-capstone"],
    order: 10,
    title: {
      en: "RAG Course QA Assistant",
      zh: "课程问答 RAG 助手"
    },
    subtitle: {
      en: "Answer questions with grounded course sources.",
      zh: "让答案必须带课程来源。"
    },
    description: {
      en: "Build a course QA assistant where answers cite source chunks and unsupported answers are refused.",
      zh: "构建一个课程问答 RAG 助手，答案必须包含来源，并能拒答缺乏依据的问题。"
    },
    targetAudience: {
      en: "Learners entering practical LLM application engineering.",
      zh: "适合进入 LLM 应用工程实践的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 4,
    estimatedHours: 42,
    requiredCourses: ["deeplearning-ai-building-evaluating-advanced-rag"],
    recommendedCourses: ["fullstackdeeplearning-llm-bootcamp", "ragas-rag-evaluation"],
    unlockCriteria: {
      requiredCourses: ["deeplearning-ai-building-evaluating-advanced-rag"],
      requiredProjects: ["web-app-with-auth"],
      minCompletedCourses: 3
    },
    deliverables: {
      en: ["Document ingestion", "Retrieval UI", "Cited answers", "Failure examples"],
      zh: ["文档导入", "检索界面", "带引用答案", "失败案例"]
    },
    portfolioValue: {
      en: "Shows you can ground LLM behavior instead of only calling an API.",
      zh: "说明你能约束 LLM 行为，而不只是调用 API。"
    },
    githubRepoSuggestion: "rag-course-qa-assistant",
    nextProjectIds: ["rag-evaluation-dashboard", "tool-calling-study-agent"],
    tags: ["rag", "retrieval", "citations", "llm"]
  }),
  makeProject({
    id: "tool-calling-study-agent",
    trackIds: ["agent-engineering", "vibe-coding"],
    order: 11,
    title: {
      en: "Tool-calling Study Agent",
      zh: "可调用工具的学习助理 Agent"
    },
    subtitle: {
      en: "Let an agent plan, log, and search with tools.",
      zh: "让 Agent 调用工具生成计划、记录日志和检索课程。"
    },
    description: {
      en: "Build a study assistant that can call tools to generate plans, record logs, and search courses.",
      zh: "做一个能调用工具的学习助手，例如生成计划、记录日志、检索课程。"
    },
    targetAudience: {
      en: "Builders who want to understand agents as engineered workflows.",
      zh: "适合想把 Agent 理解为工程化工作流的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 4,
    estimatedHours: 45,
    requiredCourses: ["berkeley-llm-agents"],
    recommendedCourses: ["berkeley-advanced-llm-agents", "openai-evals"],
    unlockCriteria: {
      requiredCourses: ["berkeley-llm-agents"],
      requiredProjects: ["rag-course-qa-assistant"]
    },
    deliverables: {
      en: ["Tool schema", "Agent workflow", "Trace log", "Safety limits"],
      zh: ["工具 schema", "Agent 工作流", "轨迹日志", "安全限制"]
    },
    portfolioValue: {
      en: "Shows agent thinking beyond chat prompts.",
      zh: "展示超越聊天提示词的 Agent 工程思维。"
    },
    githubRepoSuggestion: "tool-calling-study-agent",
    nextProjectIds: ["multi-step-agent-workflow"],
    tags: ["agent", "tool-calling", "workflow", "planning"]
  }),
  makeProject({
    id: "rag-evaluation-dashboard",
    trackIds: ["agent-engineering", "software-engineering"],
    order: 12,
    title: {
      en: "RAG Evaluation Dashboard",
      zh: "RAG 评测看板"
    },
    subtitle: {
      en: "Make success, failure, and metrics visible.",
      zh: "把成功、失败和指标可视化。"
    },
    description: {
      en: "Build a dashboard with evaluation cases, failure cases, metrics, and retrospective notes.",
      zh: "构建 RAG 评测页面，包含成功案例、失败案例、指标和复盘。"
    },
    targetAudience: {
      en: "Learners who want production-minded LLM evaluation habits.",
      zh: "适合想建立生产化 LLM 评测习惯的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 3,
    estimatedHours: 32,
    requiredCourses: ["ragas-rag-evaluation", "deeplearning-ai-building-evaluating-advanced-rag"],
    recommendedCourses: ["openai-evals", "deeplearning-ai-llmops"],
    unlockCriteria: {
      requiredCourses: ["ragas-rag-evaluation", "deeplearning-ai-building-evaluating-advanced-rag"],
      requiredProjects: ["rag-course-qa-assistant"]
    },
    deliverables: {
      en: ["Eval dataset", "Metrics table", "Failure gallery", "Iteration notes"],
      zh: ["评测数据集", "指标表", "失败案例库", "迭代记录"]
    },
    portfolioValue: {
      en: "Shows that you can improve AI systems with evidence.",
      zh: "展示你能用证据改进 AI 系统。"
    },
    githubRepoSuggestion: "rag-evaluation-dashboard",
    nextProjectIds: ["multi-step-agent-workflow", "capstone-product"],
    tags: ["rag", "evaluation", "metrics", "dashboard"]
  }),
  makeProject({
    id: "multi-step-agent-workflow",
    trackIds: ["agent-engineering", "portfolio-capstone"],
    order: 13,
    title: {
      en: "Multi-step Agent Workflow",
      zh: "多步骤 Agent 工作流"
    },
    subtitle: {
      en: "Diagnose foundation, recommend courses, then generate project tasks.",
      zh: "从基础诊断到课程推荐，再到项目任务生成。"
    },
    description: {
      en: "Build a multi-step workflow such as diagnose foundation, recommend courses, and generate project tasks.",
      zh: "构建多步骤 Agent workflow，例如“诊断基础 → 推荐课程 → 生成项目任务”。"
    },
    targetAudience: {
      en: "Advanced learners designing agent workflows with state and evaluation.",
      zh: "适合设计带状态和评测的 Agent 工作流学习者。"
    },
    difficulty: "advanced",
    estimatedWeeks: 5,
    estimatedHours: 55,
    requiredCourses: ["berkeley-llm-agents"],
    recommendedCourses: ["berkeley-advanced-llm-agents", "swe-agent"],
    unlockCriteria: {
      requiredCourses: ["berkeley-llm-agents"],
      requiredProjects: ["tool-calling-study-agent", "rag-evaluation-dashboard"]
    },
    deliverables: {
      en: ["Workflow graph", "State model", "Tool traces", "Evaluation report"],
      zh: ["工作流图", "状态模型", "工具调用轨迹", "评测报告"]
    },
    portfolioValue: {
      en: "Demonstrates agent architecture, orchestration, and evaluation depth.",
      zh: "展示 Agent 架构、编排和评测深度。"
    },
    githubRepoSuggestion: "multi-step-study-agent",
    nextProjectIds: ["capstone-product"],
    tags: ["agent", "orchestration", "state", "evaluation"]
  }),
  makeProject({
    id: "blockchain-concepts-notebook",
    trackIds: ["blockchain-web3", "portfolio-capstone"],
    order: 14,
    title: {
      en: "Blockchain Concepts Notebook",
      zh: "区块链概念笔记"
    },
    subtitle: {
      en: "Explain wallets, addresses, transactions, blocks, consensus, and contracts.",
      zh: "整理 wallet、address、transaction、block、consensus、smart contract 等术语。"
    },
    description: {
      en: "Create a notebook that explains wallets, addresses, transactions, blocks, consensus, and smart contracts.",
      zh: "整理 wallet、address、transaction、block、consensus、smart contract 等术语和示例。"
    },
    targetAudience: {
      en: "Learners entering Web3 who need technical vocabulary before coding.",
      zh: "适合进入 Web3 前需要补齐技术词汇的学习者。"
    },
    difficulty: "beginner",
    estimatedWeeks: 2,
    estimatedHours: 16,
    requiredCourses: ["mit-15s12-blockchain-and-money"],
    recommendedCourses: [
      "princeton-bitcoin-cryptocurrency-technologies",
      "blockchain-at-berkeley-openlearning"
    ],
    unlockCriteria: {
      requiredCourses: ["mit-15s12-blockchain-and-money"],
      requiredProjects: ["cs-learning-notebook"]
    },
    deliverables: {
      en: ["Concept glossary", "Transaction walkthrough", "Risk notes"],
      zh: ["概念术语表", "交易流程解析", "风险笔记"]
    },
    portfolioValue: {
      en: "Shows that you can explain Web3 fundamentals without hype.",
      zh: "展示你能脱离噱头解释 Web3 基础。"
    },
    githubRepoSuggestion: "blockchain-concepts-notebook",
    nextProjectIds: ["solidity-todo-contract", "onchain-data-dashboard"],
    tags: ["blockchain", "web3", "notebook", "concepts"]
  }),
  makeProject({
    id: "solidity-todo-contract",
    trackIds: ["blockchain-web3", "software-engineering"],
    order: 15,
    title: {
      en: "Solidity Todo Contract",
      zh: "Solidity Todo 智能合约"
    },
    subtitle: {
      en: "Write, test, and deploy a minimal contract.",
      zh: "写一个包含测试和部署记录的最小智能合约。"
    },
    description: {
      en: "Write a small Solidity smart contract with tests, deployment notes, and security assumptions.",
      zh: "写一个简单 Solidity 智能合约，包含测试和部署记录。"
    },
    targetAudience: {
      en: "Learners ready to move from blockchain concepts to hands-on contracts.",
      zh: "适合从区块链概念走向合约实作的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 3,
    estimatedHours: 30,
    requiredCourses: ["stanford-cs251-blockchain-technologies"],
    recommendedCourses: ["openzeppelin-ethernaut", "smart-contract-security-field-guide"],
    unlockCriteria: {
      requiredCourses: ["stanford-cs251-blockchain-technologies"],
      requiredProjects: ["blockchain-concepts-notebook"]
    },
    deliverables: {
      en: ["Solidity contract", "Tests", "Deployment log", "Security assumptions"],
      zh: ["Solidity 合约", "测试", "部署记录", "安全假设"]
    },
    portfolioValue: {
      en: "Demonstrates minimal Web3 engineering with test discipline.",
      zh: "展示带测试意识的最小 Web3 工程能力。"
    },
    githubRepoSuggestion: "solidity-todo-contract",
    nextProjectIds: ["smart-contract-security-report"],
    tags: ["solidity", "smart-contract", "testing", "ethereum"]
  }),
  makeProject({
    id: "smart-contract-security-report",
    trackIds: ["blockchain-web3", "portfolio-capstone"],
    order: 16,
    title: {
      en: "Smart Contract Security Report",
      zh: "智能合约安全分析报告"
    },
    subtitle: {
      en: "Audit one contract or lab and write a concrete report.",
      zh: "选择一个合约或靶场，写出具体安全分析。"
    },
    description: {
      en: "Choose a contract or security lab and write a report with threat model, findings, evidence, and fixes.",
      zh: "选择一个合约或靶场，写安全分析报告，包含威胁模型、发现、证据和修复建议。"
    },
    targetAudience: {
      en: "Learners moving from Solidity basics to auditing discipline.",
      zh: "适合从 Solidity 基础进阶到审计方法的学习者。"
    },
    difficulty: "advanced",
    estimatedWeeks: 4,
    estimatedHours: 40,
    requiredCourses: ["trail-of-bits-secure-contracts"],
    recommendedCourses: [
      "smart-contract-security-field-guide",
      "damn-vulnerable-defi",
      "cyfrin-updraft-smart-contract-security"
    ],
    unlockCriteria: {
      requiredCourses: ["trail-of-bits-secure-contracts"],
      requiredProjects: ["solidity-todo-contract"]
    },
    deliverables: {
      en: ["Threat model", "Findings table", "Proof of concept", "Fix recommendations"],
      zh: ["威胁模型", "漏洞表格", "复现证据", "修复建议"]
    },
    portfolioValue: {
      en: "Signals serious security thinking in Web3 projects.",
      zh: "体现 Web3 项目中的严肃安全思维。"
    },
    githubRepoSuggestion: "smart-contract-security-report",
    nextProjectIds: ["onchain-data-dashboard"],
    tags: ["security", "audit", "solidity", "threat-modeling"]
  }),
  makeProject({
    id: "onchain-data-dashboard",
    trackIds: ["blockchain-web3", "software-engineering"],
    order: 17,
    title: {
      en: "On-chain Data Dashboard",
      zh: "链上数据 Dashboard"
    },
    subtitle: {
      en: "Analyze transactions, addresses, protocols, or DeFi metrics.",
      zh: "展示交易、地址、协议或 DeFi 指标。"
    },
    description: {
      en: "Build an on-chain data dashboard that shows transactions, addresses, protocols, or DeFi metrics.",
      zh: "做一个链上数据 dashboard，展示交易、地址、协议或 DeFi 指标。"
    },
    targetAudience: {
      en: "Web3 learners who like data, analytics, and product storytelling.",
      zh: "适合对链上数据、分析和产品表达感兴趣的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 4,
    estimatedHours: 38,
    requiredCourses: ["dune-docs-dunesql"],
    recommendedCourses: [
      "the-graph-docs-subgraphs",
      "google-blockchain-analytics",
      "etherscan-api-docs"
    ],
    unlockCriteria: {
      requiredCourses: ["dune-docs-dunesql"],
      requiredProjects: ["blockchain-concepts-notebook"]
    },
    deliverables: {
      en: ["Data queries", "Dashboard UI", "Metric definitions", "Insight summary"],
      zh: ["数据查询", "看板 UI", "指标定义", "洞察总结"]
    },
    portfolioValue: {
      en: "Shows that you can turn blockchain data into understandable insight.",
      zh: "展示你能把链上数据转成可理解的洞察。"
    },
    githubRepoSuggestion: "onchain-data-dashboard",
    nextProjectIds: ["capstone-product"],
    tags: ["on-chain-data", "dashboard", "sql", "defi"]
  }),
  makeProject({
    id: "open-source-contribution",
    trackIds: ["portfolio-capstone", "software-engineering", "vibe-coding"],
    order: 18,
    title: {
      en: "Open Source Contribution",
      zh: "开源贡献"
    },
    subtitle: {
      en: "Make one useful documentation, test, or small feature PR.",
      zh: "完成一个文档、测试或小功能 PR。"
    },
    description: {
      en: "Complete one documentation fix, test improvement, or small feature PR in a public repository.",
      zh: "完成一个文档修复、测试改进或小功能 PR。"
    },
    targetAudience: {
      en: "Learners ready to collaborate in public codebases.",
      zh: "适合准备参与公开代码协作的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 2,
    estimatedHours: 20,
    requiredCourses: ["fullstackopen"],
    recommendedCourses: ["cmu-ai-tools-software-dev", "github-copilot-coding-agent"],
    unlockCriteria: {
      requiredCourses: ["fullstackopen"],
      requiredProjects: ["testing-and-deployment-pipeline"],
      minCompletedProjects: 2
    },
    deliverables: {
      en: ["Issue analysis", "Pull request", "Review response notes"],
      zh: ["Issue 分析", "Pull Request", "Review 回复记录"]
    },
    portfolioValue: {
      en: "Shows collaboration, maintenance thinking, and public engineering hygiene.",
      zh: "展示协作能力、维护意识和公开工程习惯。"
    },
    githubRepoSuggestion: "open-source-pr-journal",
    nextProjectIds: ["interview-prep-portfolio", "capstone-product"],
    tags: ["open-source", "pull-request", "collaboration"]
  }),
  makeProject({
    id: "interview-prep-portfolio",
    trackIds: ["portfolio-capstone", "cs-foundation"],
    order: 19,
    title: {
      en: "Interview Prep Portfolio",
      zh: "面试准备作品集"
    },
    subtitle: {
      en: "Organize algorithms, projects, system design notes, and resume bullets.",
      zh: "整理算法、项目、系统设计笔记和简历 bullet。"
    },
    description: {
      en: "Organize algorithm practice, project writeups, system design notes, and resume-ready bullets.",
      zh: "整理算法、项目、系统设计笔记和简历 bullet。"
    },
    targetAudience: {
      en: "Learners preparing for internships, applications, or junior roles.",
      zh: "适合准备实习、申请或初级岗位的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 3,
    estimatedHours: 30,
    requiredCourses: ["neetcode", "ucsd-dsa"],
    recommendedCourses: ["cmu-213", "fullstackopen"],
    unlockCriteria: {
      requiredCourses: ["neetcode", "ucsd-dsa"],
      requiredProjects: ["data-structures-visualizer"]
    },
    deliverables: {
      en: ["Problem log", "Project index", "System design notes", "Resume bullets"],
      zh: ["刷题记录", "项目索引", "系统设计笔记", "简历 bullet"]
    },
    portfolioValue: {
      en: "Connects learning evidence with interviews and applications.",
      zh: "把学习证据连接到面试和申请表达。"
    },
    githubRepoSuggestion: "cs-interview-portfolio",
    nextProjectIds: ["capstone-product"],
    tags: ["interview", "portfolio", "algorithms", "resume"]
  }),
  makeProject({
    id: "capstone-product",
    trackIds: ["portfolio-capstone", "software-engineering", "agent-engineering"],
    order: 20,
    title: {
      en: "Capstone Product",
      zh: "综合毕业产品"
    },
    subtitle: {
      en: "Build one complete product with requirements, architecture, data, frontend, backend, tests, deployment, and retrospective.",
      zh: "完成一个包含需求、架构、数据库、前端、后端、测试、部署和复盘的完整产品。"
    },
    description: {
      en: "Build a complete product with requirements, architecture, database, frontend, backend, tests, deployment, and retrospective.",
      zh: "做一个完整产品，包含需求、架构、数据库、前端、后端、测试、部署和复盘。"
    },
    targetAudience: {
      en: "Learners ready to synthesize the full CS self-study path.",
      zh: "适合准备综合运用整条 CS 自学路线的学习者。"
    },
    difficulty: "advanced",
    estimatedWeeks: 6,
    estimatedHours: 80,
    requiredCourses: ["fullstackopen", "cmu-db"],
    recommendedCourses: ["cs229", "ostep", "cmu-ai-tools-software-dev", "openai-evals"],
    unlockCriteria: {
      requiredCourses: ["fullstackopen", "cmu-db"],
      requiredProjects: ["database-backed-learning-tracker", "testing-and-deployment-pipeline"],
      minCompletedProjects: 4
    },
    deliverables: {
      en: ["Deployed product", "Architecture document", "Test plan", "Retrospective"],
      zh: ["已部署产品", "架构文档", "测试计划", "项目复盘"]
    },
    portfolioValue: {
      en: "A signature project that shows direction, depth, and independent execution.",
      zh: "一个体现方向、深度和独立执行能力的代表作。"
    },
    githubRepoSuggestion: "open-cs-capstone-product",
    nextProjectIds: [],
    tags: ["capstone", "product", "architecture", "portfolio"]
  })
];
