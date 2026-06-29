export const projects = [
  {
    id: "hello-world-github-profile",
    status: "completed",
    title: {
      en: "Hello World + GitHub Profile",
      zh: "Hello World + GitHub 主页"
    },
    description: {
      en: "Write your first small programs, set up Git, and publish a profile README.",
      zh: "写下第一组小程序，配置 Git，并发布一份 GitHub 主页 README。"
    },
    targetAudience: {
      en: "New CS learners who need a clean starting point.",
      zh: "刚进入 CS 自学路线、需要建立起点的新学习者。"
    },
    difficulty: "beginner",
    estimatedWeeks: 1,
    deliverables: {
      en: ["GitHub profile README", "3 small programs", "One setup note"],
      zh: ["GitHub 主页 README", "3 个小程序", "一份环境配置笔记"]
    },
    recommendedCourses: ["cs50x"],
    evaluationChecklist: {
      en: ["Repository is public", "README explains what was learned", "Programs can run locally"],
      zh: ["仓库公开可访问", "README 说明学到了什么", "程序可以在本地运行"]
    },
    portfolioValue: {
      en: "Shows that you can set up tools, document work, and publish progress.",
      zh: "证明你能配置工具、记录过程并公开展示进度。"
    },
    githubRepoSuggestion: "cs-foundations-start",
    aiAssistedTips: {
      en: ["Ask an AI assistant to review README clarity", "Use AI to explain Git errors, not to hide them"],
      zh: ["让 AI 检查 README 是否清晰", "用 AI 解释 Git 报错，而不是跳过理解"]
    },
    nextMilestoneId: "cs-foundations-notebook"
  },
  {
    id: "cs-foundations-notebook",
    status: "completed",
    title: {
      en: "CS Foundations Notebook",
      zh: "CS 基础知识笔记"
    },
    description: {
      en: "Build a structured notebook for programming, discrete math, and core CS vocabulary.",
      zh: "整理编程、离散数学和核心 CS 术语的结构化笔记。"
    },
    targetAudience: {
      en: "Learners who want to turn scattered course notes into a reusable knowledge base.",
      zh: "希望把零散课程笔记沉淀成可复用知识库的学习者。"
    },
    difficulty: "foundation",
    estimatedWeeks: 2,
    deliverables: {
      en: ["Markdown notes", "Glossary", "Proof and complexity examples"],
      zh: ["Markdown 笔记", "术语表", "证明与复杂度例子"]
    },
    recommendedCourses: ["cs50x", "mit-discrete"],
    evaluationChecklist: {
      en: ["Notes are organized by topic", "Every note has examples", "Unknown terms are tracked"],
      zh: ["笔记按主题组织", "每篇笔记都有例子", "陌生术语有追踪记录"]
    },
    portfolioValue: {
      en: "Demonstrates learning discipline and technical communication.",
      zh: "展示学习纪律和技术表达能力。"
    },
    githubRepoSuggestion: "cs-foundations-notebook",
    aiAssistedTips: {
      en: ["Use AI to quiz your notes", "Ask for counterexamples to weak explanations"],
      zh: ["用 AI 根据笔记出题", "让 AI 找出解释薄弱处的反例"]
    },
    nextMilestoneId: "data-structures-visualizer"
  },
  {
    id: "data-structures-visualizer",
    status: "active",
    title: {
      en: "Data Structures Visualizer",
      zh: "数据结构可视化器"
    },
    description: {
      en: "Implement and visualize lists, stacks, queues, trees, hash tables, and graph traversals.",
      zh: "实现并可视化链表、栈、队列、树、哈希表和图遍历。"
    },
    targetAudience: {
      en: "Learners preparing for algorithms, interviews, or stronger programming fluency.",
      zh: "准备算法、面试或想提升编程熟练度的学习者。"
    },
    difficulty: "foundation",
    estimatedWeeks: 3,
    deliverables: {
      en: ["Interactive visualizer", "Unit tests", "Complexity notes"],
      zh: ["交互式可视化页面", "单元测试", "复杂度说明"]
    },
    recommendedCourses: ["ucsd-dsa", "neetcode"],
    evaluationChecklist: {
      en: ["Operations are animated", "Tests cover edge cases", "Big-O notes match implementation"],
      zh: ["操作过程有动画", "测试覆盖边界情况", "复杂度说明和实现一致"]
    },
    portfolioValue: {
      en: "Turns abstract algorithms into a visible, inspectable project.",
      zh: "把抽象算法变成可观察、可展示的项目。"
    },
    githubRepoSuggestion: "data-structures-visualizer",
    aiAssistedTips: {
      en: ["Use AI to generate edge-case tests", "Ask AI to compare alternative implementations"],
      zh: ["用 AI 生成边界测试", "让 AI 对比不同实现方式"]
    },
    nextMilestoneId: "web-app-with-auth"
  },
  {
    id: "web-app-with-auth",
    status: "locked",
    title: {
      en: "Web App with Auth",
      zh: "带登录认证的 Web 应用"
    },
    description: {
      en: "Build a deployed web app with routing, forms, auth, protected user state, and tests.",
      zh: "构建包含路由、表单、认证、用户状态和测试的可部署 Web 应用。"
    },
    targetAudience: {
      en: "Learners moving from scripts to real user-facing software.",
      zh: "从脚本练习走向真实用户应用的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 4,
    deliverables: {
      en: ["Responsive app", "Auth flow", "Tested form states", "Deployment URL"],
      zh: ["响应式应用", "认证流程", "表单状态测试", "部署链接"]
    },
    recommendedCourses: ["fullstackopen", "harvard-cs50w-web-programming"],
    evaluationChecklist: {
      en: ["Auth errors are handled", "Mobile layout works", "Build and tests pass"],
      zh: ["认证错误有处理", "移动端布局可用", "构建和测试通过"]
    },
    portfolioValue: {
      en: "Shows product thinking beyond isolated programming exercises.",
      zh: "体现超越单点编程练习的产品实现能力。"
    },
    githubRepoSuggestion: "fullstack-learning-app",
    aiAssistedTips: {
      en: ["Use AI for accessibility review", "Ask AI to list failure states before coding"],
      zh: ["用 AI 做可访问性检查", "编码前让 AI 列出失败状态"]
    },
    nextMilestoneId: "database-learning-tracker"
  },
  {
    id: "database-learning-tracker",
    status: "locked",
    title: {
      en: "Database-backed Learning Tracker",
      zh: "数据库驱动的学习跟踪器"
    },
    description: {
      en: "Design tables, RLS policies, indexes, and sync logic for long-term learning data.",
      zh: "为长期学习数据设计表、RLS 策略、索引和同步逻辑。"
    },
    targetAudience: {
      en: "Learners ready to connect frontend state with durable backend data.",
      zh: "准备把前端状态连接到持久化后端数据的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 3,
    deliverables: {
      en: ["Schema migration", "RLS policies", "Sync service", "Data mapping tests"],
      zh: ["Schema 迁移", "RLS 策略", "同步服务", "数据映射测试"]
    },
    recommendedCourses: ["cmu-db", "fullstackopen"],
    evaluationChecklist: {
      en: ["Users cannot read each other's rows", "Indexes match query paths", "Local-first fallback works"],
      zh: ["用户不能读取彼此数据", "索引匹配查询路径", "本地优先回退可用"]
    },
    portfolioValue: {
      en: "Demonstrates backend data modeling and security awareness.",
      zh: "展示后端数据建模和安全意识。"
    },
    githubRepoSuggestion: "supabase-learning-tracker",
    aiAssistedTips: {
      en: ["Ask AI to review RLS policy edge cases", "Use AI to draft migration checklists"],
      zh: ["让 AI 检查 RLS 边界情况", "用 AI 起草迁移检查清单"]
    },
    nextMilestoneId: "ai-rag-mini-project"
  },
  {
    id: "ai-rag-mini-project",
    status: "locked",
    title: {
      en: "AI/RAG Mini Project",
      zh: "AI/RAG 小项目"
    },
    description: {
      en: "Build a small retrieval app with evaluation notes and clear source grounding.",
      zh: "构建一个小型检索增强应用，并补充评测和来源依据说明。"
    },
    targetAudience: {
      en: "Learners entering practical AI engineering after foundations.",
      zh: "完成基础后进入 AI 工程实践的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 4,
    deliverables: {
      en: ["Document ingestion", "Search/retrieval flow", "Evaluation report", "Failure examples"],
      zh: ["文档导入", "搜索/检索流程", "评测报告", "失败案例"]
    },
    recommendedCourses: ["deeplearning-ai-building-evaluating-advanced-rag", "ragas-rag-evaluation"],
    evaluationChecklist: {
      en: ["Answers cite sources", "Evaluation cases include failures", "Prompt and retrieval settings are documented"],
      zh: ["回答包含来源", "评测样例包含失败情况", "提示词和检索设置有记录"]
    },
    portfolioValue: {
      en: "Shows that you can evaluate AI behavior instead of only calling an API.",
      zh: "展示你能评测 AI 行为，而不只是调用 API。"
    },
    githubRepoSuggestion: "rag-course-search",
    aiAssistedTips: {
      en: ["Use AI to generate eval cases", "Ask AI to find unsupported claims"],
      zh: ["用 AI 生成评测样例", "让 AI 找出缺少依据的回答"]
    },
    nextMilestoneId: "systems-tool-cli"
  },
  {
    id: "systems-tool-cli",
    status: "locked",
    title: {
      en: "Systems Tool or CLI",
      zh: "系统工具或 CLI"
    },
    description: {
      en: "Build a small shell, profiler, log parser, allocator demo, or local developer tool.",
      zh: "构建一个小型 shell、性能分析器、日志解析器、分配器演示或本地开发工具。"
    },
    targetAudience: {
      en: "Learners who want stronger systems and debugging instincts.",
      zh: "希望强化系统能力和调试直觉的学习者。"
    },
    difficulty: "advanced",
    estimatedWeeks: 4,
    deliverables: {
      en: ["CLI interface", "README examples", "Benchmarks or traces", "Error handling"],
      zh: ["CLI 接口", "README 示例", "基准或追踪记录", "错误处理"]
    },
    recommendedCourses: ["cmu-213", "ostep"],
    evaluationChecklist: {
      en: ["Tool handles invalid input", "Performance tradeoffs are documented", "Examples are reproducible"],
      zh: ["工具能处理无效输入", "性能取舍有说明", "示例可复现"]
    },
    portfolioValue: {
      en: "Signals low-level curiosity and practical debugging ability.",
      zh: "体现底层好奇心和实际调试能力。"
    },
    githubRepoSuggestion: "systems-cli-tool",
    aiAssistedTips: {
      en: ["Ask AI to explain traces", "Use AI to propose test fixtures for edge cases"],
      zh: ["让 AI 解释追踪结果", "用 AI 设计边界测试数据"]
    },
    nextMilestoneId: "open-source-contribution"
  },
  {
    id: "open-source-contribution",
    status: "locked",
    title: {
      en: "Open Source Contribution",
      zh: "开源贡献"
    },
    description: {
      en: "Make a meaningful issue, documentation fix, test improvement, or small feature PR.",
      zh: "完成一个有意义的 issue、文档修复、测试改进或小功能 PR。"
    },
    targetAudience: {
      en: "Learners ready to collaborate in public codebases.",
      zh: "准备参与公开代码协作的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 2,
    deliverables: {
      en: ["Issue analysis", "Pull request", "Review response notes"],
      zh: ["Issue 分析", "Pull Request", "Review 回复记录"]
    },
    recommendedCourses: ["fullstackopen", "cmu-ai-tools-software-dev"],
    evaluationChecklist: {
      en: ["PR scope is small", "Tests or docs are updated", "Review feedback is addressed"],
      zh: ["PR 范围足够小", "测试或文档有更新", "Review 反馈已处理"]
    },
    portfolioValue: {
      en: "Shows collaboration, maintenance thinking, and public engineering hygiene.",
      zh: "展示协作能力、维护意识和公开工程习惯。"
    },
    githubRepoSuggestion: "open-source-pr-journal",
    aiAssistedTips: {
      en: ["Use AI to summarize unfamiliar code paths", "Ask AI to draft a concise PR description"],
      zh: ["用 AI 总结陌生代码路径", "让 AI 起草简洁 PR 描述"]
    },
    nextMilestoneId: "interview-prep-portfolio"
  },
  {
    id: "interview-prep-portfolio",
    status: "locked",
    title: {
      en: "Interview Prep Portfolio",
      zh: "面试准备作品集"
    },
    description: {
      en: "Turn algorithm practice, project writeups, and system design notes into a compact portfolio.",
      zh: "把算法练习、项目复盘和系统设计笔记整理成紧凑作品集。"
    },
    targetAudience: {
      en: "Learners preparing for internships, transfer applications, or junior roles.",
      zh: "准备实习、转学申请或初级岗位的学习者。"
    },
    difficulty: "intermediate",
    estimatedWeeks: 3,
    deliverables: {
      en: ["Problem log", "Project index", "System design notes", "Resume-ready bullets"],
      zh: ["题目记录", "项目索引", "系统设计笔记", "简历可用要点"]
    },
    recommendedCourses: ["neetcode", "ucsd-dsa"],
    evaluationChecklist: {
      en: ["Each project has impact bullets", "Weak topics are visible", "Practice log has review dates"],
      zh: ["每个项目有影响力要点", "薄弱主题可见", "练习记录有复盘日期"]
    },
    portfolioValue: {
      en: "Connects learning evidence with interviews and applications.",
      zh: "把学习证据连接到面试和申请表达。"
    },
    githubRepoSuggestion: "cs-interview-portfolio",
    aiAssistedTips: {
      en: ["Use AI for mock interview prompts", "Ask AI to identify vague resume wording"],
      zh: ["用 AI 做模拟面试提问", "让 AI 找出简历中含糊的表达"]
    },
    nextMilestoneId: "capstone-project"
  },
  {
    id: "capstone-project",
    status: "locked",
    title: {
      en: "Capstone Project",
      zh: "综合毕业项目"
    },
    description: {
      en: "Solve one real problem end-to-end with product, data, backend, frontend, and evaluation tradeoffs.",
      zh: "端到端解决一个真实问题，覆盖产品、数据、后端、前端和评估取舍。"
    },
    targetAudience: {
      en: "Learners ready to synthesize the full CS self-study path.",
      zh: "准备综合运用整条 CS 自学路线的学习者。"
    },
    difficulty: "advanced",
    estimatedWeeks: 6,
    deliverables: {
      en: ["Deployed product", "Architecture doc", "Evaluation report", "Retrospective"],
      zh: ["已部署产品", "架构文档", "评估报告", "项目复盘"]
    },
    recommendedCourses: ["fullstackopen", "cmu-db", "cs229", "ostep"],
    evaluationChecklist: {
      en: ["Problem is clear", "Data model is documented", "Tradeoffs are explicit", "Demo is reproducible"],
      zh: ["问题清晰", "数据模型有文档", "取舍明确", "演示可复现"]
    },
    portfolioValue: {
      en: "A signature project that shows direction, depth, and independent execution.",
      zh: "一个能体现方向、深度和独立执行能力的代表作品。"
    },
    githubRepoSuggestion: "open-cs-capstone",
    aiAssistedTips: {
      en: ["Use AI as a reviewer for architecture risks", "Keep human decisions visible in the retrospective"],
      zh: ["把 AI 当作架构风险 reviewer", "在复盘中保留人的判断和取舍"]
    },
    nextMilestoneId: null
  }
];
