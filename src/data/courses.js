export const tracks = [
  "foundations",
  "systems",
  "ai-data",
  "software-engineering",
  "interview-prep",
  "ai-assisted-software-engineering",
  "agent-engineering",
  "blockchain-web3"
];

export const courses = [
  {
    id: "cs50x",
    discipline: "programming",
    level: "intro",
    tracks: ["foundations", "interview-prep"],
    provider: "Harvard / CS50",
    code: "CS50x",
    title: {
      en: "CS50x: Introduction to Computer Science",
      zh: "CS50x：计算机科学导论"
    },
    description: {
      en: "Programming basics with C, Python, SQL, web concepts, and demanding problem sets.",
      zh: "用 C、Python、SQL 和 Web 作业建立计算思维与编程基本功。"
    },
    audience: {
      en: "Beginners who want a broad, rigorous first CS course.",
      zh: "适合零基础或想系统补第一门 CS 课的学习者。"
    },
    outcomes: {
      en: "Write small programs, reason about memory, use SQL, and build a simple web app.",
      zh: "能写小程序、理解内存基础、使用 SQL，并完成一个简单 Web 项目。"
    },
    prerequisites: {
      en: "Basic computer literacy.",
      zh: "基本电脑操作能力。"
    },
    language: "English",
    weeks: 8,
    hoursPerWeek: 8,
    isFree: true,
    officialUrl: "https://cs50.harvard.edu/x/",
    lastChecked: "2026-06-27",
    tags: ["programming", "python", "c", "web"]
  },
  {
    id: "ucsd-dsa",
    discipline: "programming",
    level: "foundation",
    tracks: ["foundations", "interview-prep"],
    provider: "UC San Diego",
    code: "Data Structures",
    title: {
      en: "Data Structures and Algorithms",
      zh: "数据结构与算法"
    },
    description: {
      en: "Core data structures, algorithm design, and programming assignments.",
      zh: "学习核心数据结构、算法设计方法和编程作业。"
    },
    audience: {
      en: "Learners who know basic programming and need algorithmic fluency.",
      zh: "适合已有编程基础、准备提升算法能力的人。"
    },
    outcomes: {
      en: "Implement lists, trees, heaps, hash tables, graph algorithms, and dynamic programming ideas.",
      zh: "能实现链表、树、堆、哈希表、图算法和动态规划基础。"
    },
    prerequisites: {
      en: "One introductory programming course.",
      zh: "完成一门编程入门课程。"
    },
    language: "English",
    weeks: 10,
    hoursPerWeek: 7,
    isFree: false,
    officialUrl: "https://www.coursera.org/specializations/data-structures-algorithms",
    lastChecked: "2026-06-27",
    tags: ["algorithms", "data-structures", "interview"]
  },
  {
    id: "mit-discrete",
    discipline: "math",
    level: "foundation",
    tracks: ["foundations", "interview-prep"],
    provider: "MIT OpenCourseWare",
    code: "6.042J",
    title: {
      en: "Mathematics for Computer Science",
      zh: "计算机科学数学"
    },
    description: {
      en: "Proofs, induction, graph theory, counting, probability, and discrete structures.",
      zh: "覆盖证明、归纳、图论、计数、概率和离散结构。"
    },
    audience: {
      en: "Self-learners who want the math language behind CS.",
      zh: "适合想补齐 CS 数学语言和证明能力的学习者。"
    },
    outcomes: {
      en: "Read and write proofs, analyze graphs, and reason about probability and counting.",
      zh: "能读写基础证明，分析图结构，理解计数和概率推理。"
    },
    prerequisites: {
      en: "High-school algebra and comfort with symbolic reasoning.",
      zh: "高中代数基础，愿意练习符号推理。"
    },
    language: "English",
    weeks: 12,
    hoursPerWeek: 6,
    isFree: true,
    officialUrl: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/",
    lastChecked: "2026-06-27",
    tags: ["math", "proofs", "discrete"]
  },
  {
    id: "cmu-213",
    discipline: "systems",
    level: "intermediate",
    tracks: ["systems", "software-engineering"],
    provider: "Carnegie Mellon",
    code: "15-213",
    title: {
      en: "Computer Organization and Systems",
      zh: "计算机系统导论"
    },
    description: {
      en: "Machine-level programming, memory, linking, processes, and concurrency.",
      zh: "学习机器级编程、内存、链接、进程和并发。"
    },
    audience: {
      en: "Developers who want to understand what code does below the language level.",
      zh: "适合想理解代码在语言层之下如何运行的学习者。"
    },
    outcomes: {
      en: "Debug low-level behavior, reason about memory, and understand systems performance.",
      zh: "能调试底层行为、理解内存模型，并分析系统性能。"
    },
    prerequisites: {
      en: "C basics and data structures.",
      zh: "C 语言基础和数据结构。"
    },
    language: "English",
    weeks: 12,
    hoursPerWeek: 8,
    isFree: true,
    officialUrl: "https://www.cs.cmu.edu/~213/",
    lastChecked: "2026-06-27",
    tags: ["systems", "c", "architecture"]
  },
  {
    id: "ostep",
    discipline: "systems",
    level: "intermediate",
    tracks: ["systems"],
    provider: "OSTEP",
    code: "OSTEP",
    title: {
      en: "Operating Systems: Three Easy Pieces",
      zh: "操作系统：三个简单部分"
    },
    description: {
      en: "Processes, scheduling, memory, concurrency, file systems, and distributed systems.",
      zh: "覆盖进程、调度、内存、并发、文件系统和分布式系统。"
    },
    audience: {
      en: "Learners moving from programming into systems.",
      zh: "适合从编程转向系统方向的学习者。"
    },
    outcomes: {
      en: "Explain OS abstractions and build small schedulers, allocators, or shell-like tools.",
      zh: "能解释 OS 抽象，并实现小型调度器、分配器或 shell 类工具。"
    },
    prerequisites: {
      en: "C basics and computer systems fundamentals.",
      zh: "C 语言和计算机系统基础。"
    },
    language: "English",
    weeks: 10,
    hoursPerWeek: 6,
    isFree: true,
    officialUrl: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
    lastChecked: "2026-06-27",
    tags: ["os", "concurrency", "memory"]
  },
  {
    id: "cs229",
    discipline: "ai",
    level: "intermediate",
    tracks: ["ai-data"],
    provider: "Stanford",
    code: "CS229",
    title: {
      en: "CS229: Machine Learning",
      zh: "CS229：机器学习"
    },
    description: {
      en: "Supervised learning, generalization, optimization, generative models, and evaluation.",
      zh: "学习监督学习、泛化、优化、生成模型和模型评估。"
    },
    audience: {
      en: "Learners with math foundations who want a serious ML route.",
      zh: "适合已有数学基础、想认真进入机器学习方向的人。"
    },
    outcomes: {
      en: "Train and evaluate classical ML models and understand their assumptions.",
      zh: "能训练和评估经典机器学习模型，并理解模型假设。"
    },
    prerequisites: {
      en: "Linear algebra, probability, calculus, and Python.",
      zh: "线性代数、概率、微积分和 Python。"
    },
    language: "English",
    weeks: 10,
    hoursPerWeek: 8,
    isFree: true,
    officialUrl: "https://cs229.stanford.edu/",
    lastChecked: "2026-06-27",
    tags: ["machine-learning", "ai", "statistics"]
  },
  {
    id: "cmu-db",
    discipline: "data",
    level: "intermediate",
    tracks: ["ai-data", "systems", "software-engineering"],
    provider: "Carnegie Mellon",
    code: "15-445",
    title: {
      en: "Database Systems",
      zh: "数据库系统"
    },
    description: {
      en: "Storage, indexing, query execution, optimization, transactions, and recovery.",
      zh: "学习存储、索引、查询执行、优化、事务和恢复。"
    },
    audience: {
      en: "Backend and data learners who need real database internals.",
      zh: "适合后端、数据方向学习者理解数据库内部原理。"
    },
    outcomes: {
      en: "Understand query engines and implement parts of a database system.",
      zh: "能理解查询引擎，并实现数据库系统的关键模块。"
    },
    prerequisites: {
      en: "Data structures, C++ helpful, and basic systems knowledge.",
      zh: "数据结构，最好了解 C++ 和系统基础。"
    },
    language: "English",
    weeks: 12,
    hoursPerWeek: 8,
    isFree: true,
    officialUrl: "https://15445.courses.cs.cmu.edu/",
    lastChecked: "2026-06-27",
    tags: ["database", "sql", "storage"]
  },
  {
    id: "portswigger",
    discipline: "security",
    level: "foundation",
    tracks: ["software-engineering", "interview-prep"],
    provider: "PortSwigger",
    code: "Web Security Academy",
    title: {
      en: "Web Security Academy",
      zh: "Web 安全学院"
    },
    description: {
      en: "Hands-on labs for modern web vulnerabilities and defensive thinking.",
      zh: "通过实战实验理解现代 Web 漏洞与防御思维。"
    },
    audience: {
      en: "Web developers and security beginners.",
      zh: "适合 Web 开发者和安全入门学习者。"
    },
    outcomes: {
      en: "Identify common vulnerabilities and explain practical mitigations.",
      zh: "能识别常见漏洞，并说明实际防护方式。"
    },
    prerequisites: {
      en: "HTTP, browser basics, and a little JavaScript.",
      zh: "HTTP、浏览器基础和少量 JavaScript。"
    },
    language: "English",
    weeks: 8,
    hoursPerWeek: 4,
    isFree: true,
    officialUrl: "https://portswigger.net/web-security",
    lastChecked: "2026-06-27",
    tags: ["security", "web", "labs"]
  },
  {
    id: "fullstackopen",
    discipline: "engineering",
    level: "intermediate",
    tracks: ["software-engineering"],
    provider: "Full Stack Open",
    code: "Full Stack Open",
    title: {
      en: "Full Stack Open",
      zh: "全栈开放课程"
    },
    description: {
      en: "React, Node.js, testing, GraphQL, TypeScript, containers, and CI/CD.",
      zh: "覆盖 React、Node.js、测试、GraphQL、TypeScript、容器和 CI/CD。"
    },
    audience: {
      en: "Learners who want to build production-style web applications.",
      zh: "适合想做出接近生产环境 Web 应用的学习者。"
    },
    outcomes: {
      en: "Build and test a full-stack app with modern JavaScript tooling.",
      zh: "能用现代 JavaScript 工具构建和测试全栈应用。"
    },
    prerequisites: {
      en: "JavaScript fundamentals and basic web development.",
      zh: "JavaScript 基础和基础 Web 开发经验。"
    },
    language: "English",
    weeks: 12,
    hoursPerWeek: 7,
    isFree: true,
    officialUrl: "https://fullstackopen.com/en/",
    lastChecked: "2026-06-27",
    tags: ["software", "react", "node"]
  },
  {
    id: "neetcode",
    discipline: "programming",
    level: "foundation",
    tracks: ["interview-prep"],
    provider: "NeetCode",
    code: "Roadmap",
    title: {
      en: "NeetCode Roadmap",
      zh: "NeetCode 面试刷题路线"
    },
    description: {
      en: "A structured interview-prep sequence across arrays, trees, graphs, DP, and systems patterns.",
      zh: "围绕数组、树、图、动态规划和常见面试模式的结构化刷题路线。"
    },
    audience: {
      en: "Learners preparing for software engineering interviews.",
      zh: "适合准备软件工程面试的学习者。"
    },
    outcomes: {
      en: "Recognize core problem patterns and practice interview-ready explanations.",
      zh: "能识别核心题型模式，并练习面试级讲解。"
    },
    prerequisites: {
      en: "Data structures and one programming language.",
      zh: "数据结构和至少一门编程语言。"
    },
    language: "English",
    weeks: 8,
    hoursPerWeek: 6,
    isFree: false,
    officialUrl: "https://neetcode.io/roadmap",
    lastChecked: "2026-06-27",
    tags: ["interview", "algorithms", "leetcode"]
  },
  {
    id: "cmu-ai-tools-software-dev",
    discipline: "software-engineering",
    level: "intermediate",
    tracks: ["ai-assisted-software-engineering", "agent-engineering"],
    provider: "CMU School of Computer Science",
    university: "Carnegie Mellon University",
    code: "17-316/616",
    title: {
      en: "17-316/616: AI Tools for Software Development",
      zh: "CMU：AI 软件开发工具"
    },
    description: {
      en: "A structured course on using AI developer tools for coding, testing, review, debugging, security, and project work.",
      zh: "系统学习如何把 AI 开发工具用于编码、测试、评审、调试、安全检查和真实项目交付。"
    },
    audience: {
      en: "Learners who can already program and want a rigorous workflow for Cursor, Copilot, Replit, Windsurf, and AI coding agents.",
      zh: "适合已经会基础编程，想系统学习 Cursor、Copilot、Replit、Windsurf 等 AI 编程工具工作流的学习者。"
    },
    outcomes: {
      en: "Use AI developer tools across coding, review, testing, debugging, security, and project management; evaluate AI-generated code responsibly.",
      zh: "能够把 AI 工具用于编码、审查、测试、调试、安全与项目管理，并能负责任地评估 AI 生成代码。"
    },
    prerequisites: {
      en: "Python or JavaScript, basic software development, Git, and documentation reading.",
      zh: "Python 或 JavaScript、基础软件开发、Git，以及阅读文档的能力。"
    },
    language: "English",
    weeks: 14,
    hoursPerWeek: 6,
    estimatedHours: 80,
    durationNote: "Semester course; estimated workload for self-learners.",
    access: "Public course website",
    isFree: true,
    officialUrl: "https://ai-developer-tools.github.io/",
    sourceType: "official-course-site",
    priority: "P0",
    commonPitfallsZh:
      "不要把 vibe coding 理解成不看代码、不测试、不维护。核心是用 AI 加速开发，但人类负责需求拆解、上下文管理、测试验证和安全审查。",
    bridgeMaterialsZh: "建议先学习 Git、基础 Web 开发、单元测试、命令行和一个主流框架。",
    outputTaskZh:
      "用 AI coding agent 完成一个小型全栈应用，并提交 PRD、测试用例、AI 使用记录和人工审查报告。",
    lastChecked: "2026-06-27",
    tags: ["vibe-coding", "ai-tools", "software-engineering", "testing", "security", "code-review"]
  },
  {
    id: "deeplearning-ai-vibe-coding-replit",
    discipline: "software-engineering",
    level: "beginner",
    tracks: ["ai-assisted-software-engineering"],
    provider: "DeepLearning.AI / Replit",
    university: "Non-university practical supplement",
    code: "Vibe Coding 101",
    title: {
      en: "Vibe Coding 101 with Replit",
      zh: "DeepLearning.AI：Vibe Coding 101 with Replit"
    },
    description: {
      en: "A short practical supplement for prototyping and deploying small apps with Replit coding agents.",
      zh: "用 Replit coding agents 快速体验原型开发、调试迭代和部署的小型实践补充课程。"
    },
    audience: {
      en: "Beginners, product managers, and builders who want a quick taste of AI-assisted app development.",
      zh: "适合零基础或产品经理快速体验 vibe coding，但不应替代正式 CS 或软件工程课程。"
    },
    outcomes: {
      en: "Prototype and deploy web apps with Replit agents, write PRDs and prompts, and debug AI-generated apps.",
      zh: "能够使用 Replit agent 原型化并部署 Web 应用，编写 PRD 和提示词，并迭代调试 AI 生成应用。"
    },
    prerequisites: {
      en: "Basic web concepts are helpful but not required.",
      zh: "了解基础 Web 概念会有帮助，但不是必需。"
    },
    language: "English",
    weeks: 1,
    hoursPerWeek: 2,
    estimatedHours: 2,
    durationNote: "Official duration is about 1h34m; use as a quick practical supplement.",
    access: "Free enrollment with optional paid or pro features",
    isFree: "partial",
    officialUrl: "https://www.deeplearning.ai/courses/vibe-coding-101-with-replit",
    sourceType: "practical-short-course",
    priority: "P1",
    commonPitfallsZh:
      "这门课很实用，但不是名校 CS 课程。展示时应标记为 practical supplement，避免和 MIT、Stanford、Berkeley、CMU 课程混淆。",
    bridgeMaterialsZh: "建议搭配 Harvard CS50W 或基础 Web 开发课程。",
    outputTaskZh: "完成一个 SEO analyzer 或 voting app，并写一份 AI 辅助开发复盘。",
    lastChecked: "2026-06-27",
    tags: ["vibe-coding", "replit", "prd", "prompting", "prototype", "deployment"]
  },
  {
    id: "harvard-cs50w-web-programming",
    discipline: "web-development",
    level: "intermediate",
    tracks: ["ai-assisted-software-engineering", "software-engineering"],
    provider: "Harvard CS50",
    university: "Harvard University",
    code: "CS50W",
    title: {
      en: "CS50's Web Programming with Python and JavaScript",
      zh: "Harvard CS50W：Python 与 JavaScript Web 编程"
    },
    description: {
      en: "A project-heavy web development course covering Python, JavaScript, SQL, Django, React, APIs, GitHub, and deployment.",
      zh: "项目驱动的 Web 开发课程，覆盖 Python、JavaScript、SQL、Django、React、API、GitHub 和部署。"
    },
    audience: {
      en: "Learners who want to use vibe coding without becoming prompt-only developers.",
      zh: "适合想做 vibe coding 但又不想只会提示词的人，能补足 Web 应用开发底层能力。"
    },
    outcomes: {
      en: "Build web applications, understand database design, APIs, security, user experience, GitHub workflows, and cloud deployment.",
      zh: "能够构建 Web 应用，理解数据库设计、API、安全、用户体验、GitHub 工作流和云部署。"
    },
    prerequisites: {
      en: "CS50x or prior programming experience.",
      zh: "建议先完成 CS50x 或具备等价编程经验。"
    },
    language: "English",
    weeks: 12,
    hoursPerWeek: 8,
    estimatedHours: 90,
    durationNote: "Official page says 12 weeks, 6-9 hours per week.",
    access: "Free audit via OpenCourseWare; optional certificate on edX",
    isFree: true,
    officialUrl: "https://cs50.harvard.edu/web/",
    sourceType: "official-course-site",
    priority: "P0",
    commonPitfallsZh:
      "不要只看 lecture，要完成 project。否则用 AI 生成 Web App 时会看不懂数据库、路由、API 和前端状态管理。",
    bridgeMaterialsZh: "建议先学 CS50x 或 CS50P。",
    outputTaskZh: "做一个可部署的全栈 Web App，并尝试用 AI agent 辅助重构和加测试。",
    lastChecked: "2026-06-27",
    tags: ["web-development", "python", "javascript", "django", "react", "sql", "api", "deployment"]
  },
  {
    id: "cmu-mlip-ai-engineering",
    discipline: "ai-engineering",
    level: "advanced",
    tracks: ["agent-engineering", "ai-assisted-software-engineering"],
    provider: "CMU",
    university: "Carnegie Mellon University",
    code: "17-445/645/745",
    title: {
      en: "17-445/17-645/17-745 Machine Learning in Production / AI Engineering",
      zh: "CMU：生产环境机器学习 / AI 工程"
    },
    description: {
      en: "A production AI course focused on building, deploying, assuring, and maintaining ML-enabled software products.",
      zh: "面向生产环境 AI 的课程，关注构建、部署、保障和维护机器学习软件产品。"
    },
    audience: {
      en: "AI engineers, AI product managers, and agent builders moving from demos to real products.",
      zh: "适合从 demo 走向真实 AI 产品的人，尤其适合 AI 工程师、AI 产品经理和 Agent 产品开发者。"
    },
    outcomes: {
      en: "Understand MLOps, responsible AI, safety, security, fairness, explainability, testing, and debugging production ML systems.",
      zh: "理解 MLOps、负责任 AI、安全、公平、可解释性，以及生产 ML 系统的测试和调试。"
    },
    prerequisites: {
      en: "Python, basic ML, basic software engineering, and Unix shell.",
      zh: "Python、基础机器学习、基础软件工程和 Unix shell。"
    },
    language: "English",
    weeks: 14,
    hoursPerWeek: 7,
    estimatedHours: 100,
    durationNote: "Semester course; estimated workload for self-learners.",
    access: "Public course website and materials",
    isFree: true,
    officialUrl: "https://mlip-cmu.github.io/s2025/",
    sourceType: "official-course-site",
    priority: "P0",
    commonPitfallsZh:
      "很多 Agent 项目只停留在 demo，这门课能补足部署、评估、测试、维护和风险控制。",
    bridgeMaterialsZh: "建议先学基础 ML、Python、Git、测试和后端部署。",
    outputTaskZh: "把一个 LLM/RAG/Agent demo 改造成有日志、测试、评估和部署说明的 AI 产品原型。",
    lastChecked: "2026-06-27",
    tags: ["ai-engineering", "mlops", "production", "testing", "responsible-ai", "software-product"]
  },
  {
    id: "mit-ai-system-architecture-llm-applications",
    discipline: "ai-engineering",
    level: "advanced",
    tracks: ["agent-engineering"],
    provider: "MIT Professional Education",
    university: "MIT",
    code: "MIT Professional",
    title: {
      en: "AI System Architecture and Large Language Model Applications",
      zh: "MIT Professional Education：AI 系统架构与大语言模型应用"
    },
    description: {
      en: "A paid professional course on AI system architecture, LLM applications, testing, evaluation, deployment, and maintainability.",
      zh: "付费职业教育课程，覆盖 AI 系统架构、LLM 应用、测试、评估、部署和可维护性。"
    },
    audience: {
      en: "Technical leads, product leads, and AI engineers; not ideal for absolute beginners.",
      zh: "适合技术负责人、产品负责人和 AI 工程师，不太适合零基础学生。"
    },
    outcomes: {
      en: "Understand AI system architecture blocks and design an LLM-powered agentic AI system.",
      zh: "理解 AI 系统架构构件，并能设计 LLM 驱动的 agentic AI 系统。"
    },
    prerequisites: {
      en: "Technical background, bachelor-level knowledge, and professional experience recommended.",
      zh: "建议具备技术背景、本科层级知识和一定职业经验。"
    },
    language: "English",
    weeks: 5,
    hoursPerWeek: 8,
    estimatedHours: 40,
    durationNote: "Professional education course; exact schedule may vary.",
    access: "Paid professional education",
    isFree: false,
    officialUrl: "https://professional.mit.edu/llm",
    sourceType: "official-professional-course",
    priority: "P1",
    commonPitfallsZh:
      "这是职业教育课程，不是免费 OCW。展示时要标注 paid/professional，避免误导用户。",
    bridgeMaterialsZh: "建议先学 MIT 6.S087、6.S191 或 Stanford CS224N。",
    outputTaskZh: "设计一个 LLM Agent 系统架构图，包含工具调用、RAG、评估、日志、部署和安全边界。",
    lastChecked: "2026-06-27",
    tags: ["llm-application", "agentic-ai", "system-architecture", "evaluation", "deployment"]
  },
  {
    id: "mit-6s087-foundation-models-generative-ai",
    discipline: "artificial-intelligence",
    level: "beginner",
    tracks: ["agent-engineering", "ai-assisted-software-engineering"],
    provider: "MIT OpenCourseWare",
    university: "MIT",
    code: "6.S087",
    title: {
      en: "6.S087 Foundation Models and Generative AI",
      zh: "MIT 6.S087：基础模型与生成式 AI"
    },
    description: {
      en: "An introductory MIT OCW lecture series on foundation models, generative AI, ChatGPT, Copilot, diffusion models, and self-supervised learning.",
      zh: "MIT OCW 入门讲座，介绍基础模型、生成式 AI、ChatGPT、Copilot、扩散模型和自监督学习。"
    },
    audience: {
      en: "Learners beginning to understand foundation models, generative AI, and Copilot-like tools.",
      zh: "适合刚开始理解大模型、生成式 AI 和 Copilot 类工具的学习者。"
    },
    outcomes: {
      en: "Build conceptual vocabulary before studying LLM agents and AI engineering.",
      zh: "在学习 LLM Agent 和 AI 工程前建立关键概念词汇。"
    },
    prerequisites: {
      en: "Basic AI literacy is helpful but not required.",
      zh: "基础 AI 常识有帮助，但不是必需。"
    },
    language: "English",
    weeks: 4,
    hoursPerWeek: 3,
    estimatedHours: 12,
    durationNote: "Introductory lecture series; suitable as conceptual foundation.",
    access: "Free via MIT OCW",
    isFree: true,
    officialUrl:
      "https://ocw.mit.edu/courses/6-s087-foundation-models-and-generative-ai-january-iap-2024/",
    sourceType: "official-ocw",
    priority: "P0",
    commonPitfallsZh: "这门课偏概念，不适合直接当工程实践课。应作为 Agent/LLM 课程前置。",
    bridgeMaterialsZh: "可搭配 Harvard CS50AI 或 MIT 6.S191。",
    outputTaskZh:
      "写一份 foundation models 学习笔记，解释 LLM、diffusion、self-supervised learning、Copilot 的关系。",
    lastChecked: "2026-06-27",
    tags: [
      "foundation-models",
      "generative-ai",
      "chatgpt",
      "copilot",
      "diffusion",
      "self-supervised-learning"
    ]
  },
  {
    id: "mit-6s191-intro-deep-learning",
    discipline: "deep-learning",
    level: "intermediate",
    tracks: ["agent-engineering"],
    provider: "MIT",
    university: "MIT",
    code: "6.S191",
    title: {
      en: "MIT 6.S191 Introduction to Deep Learning",
      zh: "MIT 6.S191：深度学习导论"
    },
    description: {
      en: "A practical deep learning course covering neural networks, modern LLM and generative AI topics, and hands-on labs.",
      zh: "实践型深度学习课程，覆盖神经网络、现代 LLM 与生成式 AI 主题，以及动手实验。"
    },
    audience: {
      en: "Learners entering LLM or agent work who need deep learning foundations.",
      zh: "适合想进入 LLM/Agent 方向但深度学习基础不够的学习者。"
    },
    outcomes: {
      en: "Understand deep learning foundations and gain practical experience building neural networks.",
      zh: "理解深度学习基础，并获得构建神经网络的实践经验。"
    },
    prerequisites: {
      en: "Calculus, linear algebra, and Python helpful.",
      zh: "建议具备微积分、线性代数和 Python 基础。"
    },
    language: "English",
    weeks: 8,
    hoursPerWeek: 5,
    estimatedHours: 40,
    durationNote: "Bootcamp-style course; lectures, slides, and labs are released publicly.",
    access: "Free public course materials",
    isFree: true,
    officialUrl: "https://introtodeeplearning.com/",
    sourceType: "official-course-site",
    priority: "P0",
    commonPitfallsZh:
      "不要直接跳 Agent 框架而完全不懂神经网络、训练、表示学习。至少要知道模型为什么会失败。",
    bridgeMaterialsZh: "建议补线性代数、微积分和 Python。",
    outputTaskZh: "完成一个小型深度学习实验，并总结模型训练、过拟合和评估指标。",
    lastChecked: "2026-06-27",
    tags: ["deep-learning", "neural-networks", "llm", "generative-ai", "python"]
  },
  {
    id: "mit-mas-s60-how-to-ai-almost-anything",
    discipline: "artificial-intelligence",
    level: "advanced",
    tracks: ["agent-engineering"],
    provider: "MIT OpenCourseWare",
    university: "MIT",
    code: "MAS.S60",
    title: {
      en: "MAS.S60 How to AI (Almost) Anything",
      zh: "MIT MAS.S60：如何用 AI 做几乎任何事"
    },
    description: {
      en: "A graduate MIT OCW course on applying modern AI to language, vision, audio, sensors, medical data, music, art, and other modalities.",
      zh: "MIT OCW 研究生课程，学习把现代 AI 应用于语言、视觉、音频、传感器、医疗数据、音乐和艺术等多模态场景。"
    },
    audience: {
      en: "Learners with AI foundations who want to expand toward multimodal agents or AI product innovation.",
      zh: "适合已有 AI 基础、想扩展到多模态 Agent 或 AI 产品创新的人。"
    },
    outcomes: {
      en: "Understand modern deep learning and foundation models across real-world multimodal data.",
      zh: "理解现代深度学习和基础模型如何处理真实世界多模态数据。"
    },
    prerequisites: {
      en: "Deep learning foundation, Python, and research reading ability.",
      zh: "需要深度学习基础、Python 和论文阅读能力。"
    },
    language: "English",
    weeks: 14,
    hoursPerWeek: 6,
    estimatedHours: 80,
    durationNote: "Graduate course; estimated workload for self-learners.",
    access: "Free via MIT OCW",
    isFree: true,
    officialUrl: "https://ocw.mit.edu/courses/mas-s60-how-to-ai-almost-anything-spring-2025/",
    sourceType: "official-ocw",
    priority: "P1",
    commonPitfallsZh: "这门课偏研究和多模态，不适合零基础直接上。应放在进阶路线中。",
    bridgeMaterialsZh: "建议先学 MIT 6.S191、Stanford CS224N 或 CS336。",
    outputTaskZh: "设计一个多模态 AI Agent 项目提案，例如图像加文本的留学材料审核助手。",
    lastChecked: "2026-06-27",
    tags: ["foundation-models", "multimodal-ai", "ai-research", "real-world-data", "agents"]
  },
  {
    id: "harvard-cs50ai-python",
    discipline: "artificial-intelligence",
    level: "intermediate",
    tracks: ["agent-engineering"],
    provider: "Harvard CS50",
    university: "Harvard University",
    code: "CS50AI",
    title: {
      en: "CS50's Introduction to Artificial Intelligence with Python",
      zh: "Harvard CS50AI：Python 人工智能导论"
    },
    description: {
      en: "An AI foundations course covering search, knowledge, uncertainty, optimization, machine learning, neural networks, and large language models.",
      zh: "AI 基础课程，覆盖搜索、知识表示、不确定性、优化、机器学习、神经网络和大语言模型。"
    },
    audience: {
      en: "Programmers moving into AI and agent engineering.",
      zh: "适合从普通编程进入 AI/Agent 的学生。"
    },
    outcomes: {
      en: "Build AI programs in Python and understand the foundations behind intelligent systems.",
      zh: "能够用 Python 构建 AI 程序，并理解智能系统背后的基础方法。"
    },
    prerequisites: {
      en: "CS50x or at least one year of Python experience.",
      zh: "建议完成 CS50x 或具备至少一年 Python 经验。"
    },
    language: "English",
    weeks: 7,
    hoursPerWeek: 14,
    estimatedHours: 100,
    durationNote: "Official page says 7 weeks, 10-30 hours per week.",
    access: "Free audit via CS50 OpenCourseWare; optional certificate",
    isFree: true,
    officialUrl: "https://cs50.harvard.edu/ai/",
    sourceType: "official-course-site",
    priority: "P0",
    commonPitfallsZh:
      "这门课不是只教调 API，而是 AI 基础。学 Agent 之前先理解 search、optimization、learning 很重要。",
    bridgeMaterialsZh: "建议先学 CS50x 或 CS50P。",
    outputTaskZh: "完成一个 AI 搜索、推荐或分类项目，并写出算法原理说明。",
    lastChecked: "2026-06-27",
    tags: ["ai", "python", "search", "machine-learning", "neural-networks", "llm"]
  },
  {
    id: "harvard-seas-llm-transformer-agentic-ai",
    discipline: "large-language-models",
    level: "intermediate",
    tracks: ["agent-engineering"],
    provider: "Harvard SEAS",
    university: "Harvard University",
    code: "Harvard SEAS LLM",
    title: {
      en: "Large Language Models: From Transformer Basics to Agentic AI",
      zh: "Harvard SEAS：从 Transformer 基础到 Agentic AI"
    },
    description: {
      en: "A paid professional online course covering Transformers, BERT, GPT, RAG, Self-RAG, Graph-RAG, agents, and LoRA fine-tuning.",
      zh: "付费职业在线课程，覆盖 Transformer、BERT、GPT、RAG、Self-RAG、Graph-RAG、Agent 和 LoRA 微调。"
    },
    audience: {
      en: "Learners who want a structured professional overview from LLM basics to agentic AI.",
      zh: "适合想系统了解 LLM 到 Agentic AI 的学习者，但它是职业在线课程，不是完全开放 OCW。"
    },
    outcomes: {
      en: "Build practical understanding for real-world LLM systems and agentic AI applications.",
      zh: "建立面向真实 LLM 系统和 Agentic AI 应用的实践理解。"
    },
    prerequisites: {
      en: "Basic AI or ML familiarity; Python helpful.",
      zh: "需要基础 AI/ML 常识，懂 Python 更好。"
    },
    language: "English",
    weeks: 4,
    hoursPerWeek: 6,
    estimatedHours: 25,
    durationNote:
      "Live online professional course; official page mentions interactive instruction plus optional hackathon.",
    access: "Paid live online program",
    isFree: false,
    officialUrl: "https://sites.harvard.edu/harvard-seas-llm/",
    sourceType: "official-professional-course",
    priority: "P1",
    commonPitfallsZh: "如果项目主要收录免费公开课，请把这门放到 paid/professional 分组。",
    bridgeMaterialsZh: "可先学 Harvard CS50AI 或 MIT 6.S087。",
    outputTaskZh: "做一个 RAG + Agent 小项目，并比较普通 RAG、Self-RAG、Graph-RAG 的适用场景。",
    lastChecked: "2026-06-27",
    tags: ["llm", "transformer", "rag", "agents", "lora", "fine-tuning"]
  },
  {
    id: "stanford-cs224n-nlp-deep-learning",
    discipline: "natural-language-processing",
    level: "advanced",
    tracks: ["agent-engineering"],
    provider: "Stanford",
    university: "Stanford University",
    code: "CS224N",
    title: {
      en: "CS224N Natural Language Processing with Deep Learning",
      zh: "Stanford CS224N：深度学习自然语言处理"
    },
    description: {
      en: "A rigorous NLP course with public slides, assignments, and older public videos, focused on neural language models and PyTorch implementations.",
      zh: "严谨的 NLP 课程，公开课件、作业和公开视频，重点是神经语言模型和 PyTorch 实现。"
    },
    audience: {
      en: "Learners who want to build LLM or agent systems but lack NLP foundations.",
      zh: "适合想做 LLM/Agent 但 NLP 基础不足的学习者。"
    },
    outcomes: {
      en: "Understand neural NLP, LLM research foundations, and implement language models with PyTorch.",
      zh: "理解神经 NLP、LLM 研究基础，并能用 PyTorch 实现语言模型。"
    },
    prerequisites: {
      en: "Python, deep learning, machine learning, and linear algebra.",
      zh: "Python、深度学习、机器学习和线性代数。"
    },
    language: "English",
    weeks: 10,
    hoursPerWeek: 10,
    estimatedHours: 100,
    durationNote: "Stanford quarter course; public slides and assignments available.",
    access: "Public course materials; some official enrollment options paid",
    isFree: "partial",
    officialUrl: "https://web.stanford.edu/class/cs224n/",
    sourceType: "official-course-site",
    priority: "P0",
    commonPitfallsZh:
      "Agent 工程不是只学 LangChain。NLP 和 LLM 基础决定你能否判断模型输出、embedding、RAG 和评估问题。",
    bridgeMaterialsZh: "建议先学机器学习、深度学习、Python、线性代数。",
    outputTaskZh: "实现一个文本分类或问答系统，并分析 embedding、attention、evaluation。",
    lastChecked: "2026-06-27",
    tags: ["nlp", "deep-learning", "llm", "pytorch", "language-models"]
  },
  {
    id: "stanford-cs336-language-modeling-from-scratch",
    discipline: "large-language-models",
    level: "advanced",
    tracks: ["agent-engineering"],
    provider: "Stanford",
    university: "Stanford University",
    code: "CS336",
    title: {
      en: "CS336 Language Modeling from Scratch",
      zh: "Stanford CS336：从零构建语言模型"
    },
    description: {
      en: "A demanding course on building language models from scratch, including tokenization, data, transformers, training, evaluation, and deployment.",
      zh: "高强度课程，从零构建语言模型，覆盖 tokenizer、数据、Transformer、训练、评估和部署。"
    },
    audience: {
      en: "Advanced learners, AI engineers, and builders who want deep implementation literacy for LLM systems.",
      zh: "适合高级学习者、AI 工程师、想真正理解 LLM 底层的人。"
    },
    outcomes: {
      en: "Build language models from scratch and understand tokenization, training, evaluation, and deployment.",
      zh: "能够从零构建语言模型，并理解分词、训练、评估和部署。"
    },
    prerequisites: {
      en: "Strong Python, software engineering, deep learning, and systems optimization.",
      zh: "强 Python、软件工程、深度学习和系统优化基础。"
    },
    language: "English",
    weeks: 10,
    hoursPerWeek: 12,
    estimatedHours: 120,
    durationNote:
      "Stanford Spring 2026; assignments require substantial Python and software engineering work.",
    access: "Public course website and recordings",
    isFree: true,
    officialUrl: "https://cs336.stanford.edu/",
    sourceType: "official-course-site",
    priority: "P0",
    commonPitfallsZh: "这门课代码量很大，不适合没有 Python/深度学习/系统基础的人直接上。",
    bridgeMaterialsZh: "建议先学 MIT 6.S191、CS224N、PyTorch 和 Linux/GPU 基础。",
    outputTaskZh: "从零实现 tokenizer + tiny transformer，并写一份训练与评估报告。",
    lastChecked: "2026-06-27",
    tags: [
      "llm",
      "language-modeling",
      "tokenization",
      "transformers",
      "training",
      "evaluation",
      "python"
    ]
  },
  {
    id: "stanford-cs25-transformers-united",
    discipline: "large-language-models",
    level: "intermediate",
    tracks: ["agent-engineering"],
    provider: "Stanford",
    university: "Stanford University",
    code: "CS25",
    title: {
      en: "CS25 Transformers United",
      zh: "Stanford CS25：Transformers United"
    },
    description: {
      en: "A seminar course for following frontier Transformer research and applications across LLMs, art, biology, robotics, and other fields.",
      zh: "用于追踪 Transformer 前沿研究和应用的 seminar，横跨 LLM、艺术、生物、机器人等领域。"
    },
    audience: {
      en: "Learners who already know LLM basics and want frontier awareness.",
      zh: "适合已经入门 LLM、想追前沿方向的人。"
    },
    outcomes: {
      en: "Understand current Transformer research and build high-level frontier awareness.",
      zh: "理解当前 Transformer 研究，并建立前沿方向感。"
    },
    prerequisites: {
      en: "Basic machine learning; basic deep learning helpful.",
      zh: "需要基础机器学习，具备深度学习基础更好。"
    },
    language: "English",
    weeks: 10,
    hoursPerWeek: 2,
    estimatedHours: 20,
    durationNote: "Seminar course; suitable for keeping up with frontier Transformer research.",
    access: "Public audit and recordings",
    isFree: true,
    officialUrl: "https://web.stanford.edu/class/cs25/",
    sourceType: "official-seminar-site",
    priority: "P1",
    commonPitfallsZh: "这是 seminar，不是系统训练课程。不要把它作为唯一基础课。",
    bridgeMaterialsZh: "建议搭配 CS224N 或 CS336。",
    outputTaskZh: "每周整理一篇 Transformer 前沿阅读笔记，并总结可应用到 Agent 产品的点。",
    lastChecked: "2026-06-27",
    tags: ["transformers", "llm", "seminar", "frontier-ai", "research"]
  },
  {
    id: "stanford-cs329a-self-improving-ai-agents",
    discipline: "ai-agents",
    level: "advanced",
    tracks: ["agent-engineering"],
    provider: "Stanford",
    university: "Stanford University",
    code: "CS329A",
    title: {
      en: "CS329A Self-Improving AI Agents",
      zh: "Stanford CS329A：自我改进型 AI Agent"
    },
    description: {
      en: "A graduate seminar on self-improving agents, verifiers, test-time compute, tool use, memory, planning, coding agents, and autonomous systems.",
      zh: "研究生 seminar，学习自我改进 Agent、验证器、test-time compute、工具使用、记忆、规划、coding agents 和自主系统。"
    },
    audience: {
      en: "Advanced learners who want to study agent research and high-end applications.",
      zh: "适合想深入 Agent 前沿研究和高级应用的人。"
    },
    outcomes: {
      en: "Study self-improving agents, constitutional AI, verifiers, search with LLMs, RL, tool use, memory, and planning.",
      zh: "学习自我改进 Agent、Constitutional AI、验证器、LLM 搜索、RL、工具调用、记忆和规划。"
    },
    prerequisites: {
      en: "LLM basics, deep learning, research paper reading, and Python.",
      zh: "LLM 基础、深度学习、论文阅读和 Python。"
    },
    language: "English",
    weeks: 10,
    hoursPerWeek: 8,
    estimatedHours: 80,
    durationNote: "Graduate seminar; Autumn 2025.",
    access: "Public course website",
    isFree: true,
    officialUrl: "https://cs329a.stanford.edu/",
    sourceType: "official-course-site",
    priority: "P0",
    commonPitfallsZh:
      "不适合零基础。这里的 Agent 不是简单调用 API，而是涉及搜索、验证器、长期记忆、规划和评估。",
    bridgeMaterialsZh: "建议先学 CS224N、CS336 或 Berkeley LLM Agents。",
    outputTaskZh:
      "设计一个可以自我评估和迭代改进的 coding/research assistant，并写出 evaluation framework。",
    lastChecked: "2026-06-27",
    tags: ["ai-agents", "self-improvement", "tool-use", "memory", "planning", "coding-agents", "rl"]
  },
  {
    id: "berkeley-llm-agents",
    discipline: "ai-agents",
    level: "advanced",
    tracks: ["agent-engineering"],
    provider: "UC Berkeley RDI",
    university: "UC Berkeley",
    code: "CS294/194-196",
    title: {
      en: "CS294/194-196 Large Language Model Agents",
      zh: "UC Berkeley：大语言模型 Agent"
    },
    description: {
      en: "A broad public course on LLM agents, reasoning, planning, tool use, RAG, infrastructure, evaluation, safety, ethics, and multi-agent collaboration.",
      zh: "系统学习 LLM Agent、推理、规划、工具调用、RAG、基础设施、评估、安全、伦理和多 Agent 协作的公开课程。"
    },
    audience: {
      en: "Learners who want a full landscape course for agent engineering.",
      zh: "适合想系统学习 Agent 开发全景的人，应作为 Agent track 核心课。"
    },
    outcomes: {
      en: "Understand LLM agents, code generation, web automation, scientific discovery, evaluation, privacy, safety, and human-agent interaction.",
      zh: "理解 LLM Agent、代码生成、Web 自动化、科学发现、评估、隐私、安全和人机协作。"
    },
    prerequisites: {
      en: "LLM basics, machine learning, Python, and research reading.",
      zh: "LLM 基础、机器学习、Python 和论文阅读。"
    },
    language: "English",
    weeks: 14,
    hoursPerWeek: 7,
    estimatedHours: 90,
    durationNote: "Fall 2024 course with public materials.",
    access: "Public course website",
    isFree: true,
    officialUrl: "https://rdi.berkeley.edu/llm-agents/f24",
    sourceType: "official-course-site",
    priority: "P0",
    commonPitfallsZh:
      "不要只学框架 API。Agent 的核心是任务分解、工具调用、状态管理、评估、安全和人机协作。",
    bridgeMaterialsZh: "建议先了解 LLM、RAG、Python、API 调用。",
    outputTaskZh: "构建一个带工具调用、RAG、任务规划和评估日志的 Agent demo。",
    lastChecked: "2026-06-27",
    tags: [
      "llm-agents",
      "rag",
      "tool-use",
      "planning",
      "code-generation",
      "web-automation",
      "multi-agent"
    ]
  },
  {
    id: "berkeley-advanced-llm-agents",
    discipline: "ai-agents",
    level: "advanced",
    tracks: ["agent-engineering"],
    provider: "UC Berkeley RDI",
    university: "UC Berkeley",
    code: "CS294/194-280",
    title: {
      en: "CS294/194-280 Advanced Large Language Model Agents",
      zh: "UC Berkeley：高级大语言模型 Agent"
    },
    description: {
      en: "An advanced course on inference-time reasoning, post-training, search, planning, tool use, function calling, code generation, verification, and theorem proving.",
      zh: "高级课程，学习推理时计算、后训练、搜索、规划、工具调用、函数调用、代码生成、验证和定理证明。"
    },
    audience: {
      en: "Learners continuing after Berkeley LLM Agents or Stanford CS329A.",
      zh: "适合学完 Berkeley LLM Agents 或 Stanford CS329A 后继续深入的人。"
    },
    outcomes: {
      en: "Study advanced agentic workflows and LLMs for code generation, verification, mathematics, and theorem proving.",
      zh: "学习高级 agentic workflows，以及 LLM 在代码生成、验证、数学和定理证明中的应用。"
    },
    prerequisites: {
      en: "LLM agents foundation, reasoning, Python, and research paper reading.",
      zh: "LLM Agent 基础、推理、Python 和论文阅读。"
    },
    language: "English",
    weeks: 10,
    hoursPerWeek: 8,
    estimatedHours: 80,
    durationNote: "Spring 2025 advanced course; estimated self-study workload.",
    access: "Public course website",
    isFree: true,
    officialUrl: "https://rdi.berkeley.edu/adv-llm-agents/sp25",
    sourceType: "official-course-site",
    priority: "P0",
    commonPitfallsZh: "这门课偏高级研究，不适合拿来做入门课。应放在 Agent track 的 advanced 阶段。",
    bridgeMaterialsZh: "建议先学 Berkeley LLM Agents、Stanford CS224N 或 CS336。",
    outputTaskZh: "实现一个可调用工具、可验证代码输出、可记录推理链路的高级 Agent 原型。",
    lastChecked: "2026-06-27",
    tags: [
      "advanced-agents",
      "reasoning",
      "planning",
      "function-calling",
      "code-generation",
      "program-verification"
    ]
  },
  {
    id: "mit-15s12-blockchain-and-money",
    discipline: "blockchain",
    level: "intermediate",
    tracks: ["blockchain-web3"],
    provider: "MIT OpenCourseWare",
    university: "MIT",
    code: "15.S12",
    title: {
      en: "15.S12 Blockchain and Money",
      zh: "MIT 15.S12：区块链与货币"
    },
    description: {
      en: "An MIT Sloan OCW course on Bitcoin, blockchain, distributed ledgers, smart contracts, money, finance, and policy.",
      zh: "MIT Sloan OCW 课程，从金融、商业和政策角度学习 Bitcoin、区块链、分布式账本和智能合约。"
    },
    audience: {
      en: "Learners who want to understand Web3 from finance, business, and policy perspectives.",
      zh: "适合想从金融、商业和政策角度理解 Web3 的学习者。"
    },
    outcomes: {
      en: "Understand Bitcoin, blockchain, distributed ledgers, smart contracts, and blockchain applications in money and finance.",
      zh: "理解 Bitcoin、区块链、分布式账本、智能合约，以及区块链在货币和金融中的应用。"
    },
    prerequisites: {
      en: "Basic finance, cryptography, and computer science helpful.",
      zh: "基础金融、密码学和计算机科学常识有帮助。"
    },
    language: "English",
    weeks: 12,
    hoursPerWeek: 5,
    estimatedHours: 60,
    durationNote: "Fall 2018 MIT Sloan course with videos, slides, readings, and assignments.",
    access: "Free via MIT OCW",
    isFree: true,
    officialUrl: "https://ocw.mit.edu/courses/15-s12-blockchain-and-money-fall-2018/",
    sourceType: "official-ocw",
    priority: "P0",
    commonPitfallsZh: "这门课不是教炒币，而是理解区块链如何改变金融基础设施。",
    bridgeMaterialsZh: "建议补基本密码学、网络和金融常识。",
    outputTaskZh: "写一份区块链金融应用分析报告，比较传统金融和智能合约方案。",
    lastChecked: "2026-06-27",
    tags: ["blockchain", "bitcoin", "smart-contracts", "distributed-ledger", "finance", "policy"]
  },
  {
    id: "mit-mas-s62-cryptocurrency-engineering-design",
    discipline: "blockchain",
    level: "advanced",
    tracks: ["blockchain-web3"],
    provider: "MIT OpenCourseWare",
    university: "MIT",
    code: "MAS.S62",
    title: {
      en: "MAS.S62 Cryptocurrency Engineering and Design",
      zh: "MIT MAS.S62：加密货币工程与设计"
    },
    description: {
      en: "An engineering-focused MIT OCW course on Bitcoin, cryptocurrency design, cryptography, game theory, and network architecture.",
      zh: "MIT OCW 工程向课程，学习 Bitcoin、加密货币设计、密码学、博弈论和网络架构。"
    },
    audience: {
      en: "Learners who want to understand blockchain foundations from an engineering perspective.",
      zh: "适合想从工程角度深入理解区块链底层的人。"
    },
    outcomes: {
      en: "Understand how cryptocurrencies work in practice and how cryptography, incentives, and networks shape their design.",
      zh: "理解加密货币如何运行，以及密码学、激励机制和网络如何影响系统设计。"
    },
    prerequisites: {
      en: "Cryptography basics, networking basics, distributed systems helpful, and programming.",
      zh: "密码学基础、网络基础、分布式系统常识和编程能力。"
    },
    language: "English",
    weeks: 12,
    hoursPerWeek: 7,
    estimatedHours: 80,
    durationNote: "Spring 2018 MIT OCW course with lecture notes, videos, and problem sets.",
    access: "Free via MIT OCW",
    isFree: true,
    officialUrl:
      "https://ocw.mit.edu/courses/mas-s62-cryptocurrency-engineering-and-design-spring-2018/",
    sourceType: "official-ocw",
    priority: "P0",
    commonPitfallsZh: "不要只学 Solidity。真正的 Web3 工程要理解密码学、共识、网络和激励机制。",
    bridgeMaterialsZh: "建议先学基本密码学、计算机网络和分布式系统。",
    outputTaskZh: "实现一个简化版区块链或交易验证模块，并解释安全边界。",
    lastChecked: "2026-06-27",
    tags: [
      "cryptocurrency",
      "bitcoin",
      "cryptography",
      "game-theory",
      "network-architecture",
      "engineering"
    ]
  },
  {
    id: "stanford-cs251-blockchain-technologies",
    discipline: "blockchain",
    level: "advanced",
    tracks: ["blockchain-web3"],
    provider: "Stanford",
    university: "Stanford University",
    code: "CS251",
    title: {
      en: "CS251 Blockchain Technologies",
      zh: "Stanford CS251：区块链技术"
    },
    description: {
      en: "A technical blockchain course covering distributed consensus, smart contracts, economics, scalability, Bitcoin, Ethereum, and applications.",
      zh: "技术向区块链课程，覆盖分布式共识、智能合约、经济学、可扩展性、Bitcoin、Ethereum 和应用。"
    },
    audience: {
      en: "CS learners who want to study the technical core of Web3.",
      zh: "适合想深入 Web3 技术核心的 CS 学生。"
    },
    outcomes: {
      en: "Understand blockchain technologies through Bitcoin and Ethereum case studies.",
      zh: "通过 Bitcoin 和 Ethereum 案例理解区块链技术。"
    },
    prerequisites: {
      en: "Algorithms, cryptography helpful, distributed systems helpful, and programming.",
      zh: "算法、密码学、分布式系统常识和编程。"
    },
    language: "English",
    weeks: 10,
    hoursPerWeek: 9,
    estimatedHours: 90,
    durationNote: "Stanford quarter course.",
    access: "Public course website",
    isFree: true,
    officialUrl: "https://cs251.stanford.edu/",
    sourceType: "official-course-site",
    priority: "P0",
    commonPitfallsZh: "这门课偏技术，不适合完全零基础。需要算法、系统和密码学基础。",
    bridgeMaterialsZh: "建议先学数据结构算法、计算机网络、密码学入门。",
    outputTaskZh: "完成一个智能合约或共识机制分析项目，并写安全风险说明。",
    lastChecked: "2026-06-27",
    tags: [
      "blockchain",
      "distributed-consensus",
      "smart-contracts",
      "ethereum",
      "bitcoin",
      "scalability"
    ]
  },
  {
    id: "princeton-bitcoin-cryptocurrency-technologies",
    discipline: "blockchain",
    level: "intermediate",
    tracks: ["blockchain-web3"],
    provider: "Princeton Online / Coursera",
    university: "Princeton University",
    code: "Bitcoin",
    title: {
      en: "Bitcoin and Cryptocurrency Technologies",
      zh: "Princeton：比特币与加密货币技术"
    },
    description: {
      en: "A foundational online course explaining how Bitcoin works technically and how to reason about cryptocurrency claims.",
      zh: "基础在线课程，解释 Bitcoin 的技术机制，并帮助区分加密货币叙事中的事实与噪声。"
    },
    audience: {
      en: "Beginner-to-intermediate Web3 learners who need strong technical foundations.",
      zh: "适合 Web3 入门到中阶学习者，是很好的技术基础课。"
    },
    outcomes: {
      en: "Understand how Bitcoin works and gain foundations for secure software interacting with Bitcoin.",
      zh: "理解 Bitcoin 如何工作，并建立与 Bitcoin 交互的软件安全基础。"
    },
    prerequisites: {
      en: "Programming, basic algorithms, and basic security concepts helpful.",
      zh: "编程、基础算法和基础安全概念有帮助。"
    },
    language: "English",
    weeks: 11,
    hoursPerWeek: 5,
    estimatedHours: 50,
    durationNote: "11-module online course; Coursera availability may vary.",
    access: "Princeton Online / Coursera",
    isFree: "partial",
    officialUrl: "https://www.coursera.org/learn/cryptocurrency",
    sourceType: "official-online-course",
    priority: "P0",
    commonPitfallsZh: "不要只看价格和交易，要理解 Bitcoin 的交易、共识、安全和隐私机制。",
    bridgeMaterialsZh: "建议补基本编程、数据结构、哈希和数字签名。",
    outputTaskZh: "写一份 Bitcoin 技术机制说明，并实现一个简化交易验证 demo。",
    lastChecked: "2026-06-27",
    tags: ["bitcoin", "cryptocurrency", "security", "blockchain", "software-engineering"]
  },
  {
    id: "berkeley-defi",
    discipline: "blockchain",
    level: "advanced",
    tracks: ["blockchain-web3"],
    provider: "UC Berkeley RDI",
    university: "UC Berkeley",
    code: "DeFi",
    title: {
      en: "Decentralized Finance",
      zh: "UC Berkeley：去中心化金融 DeFi"
    },
    description: {
      en: "An interdisciplinary CS and finance course on decentralized systems, permissionless blockchains, consensus, smart contracts, DeFi protocols, risk, and incentives.",
      zh: "交叉计算机科学和金融的课程，学习去中心化系统、无许可区块链、共识、智能合约、DeFi 协议、风险和激励。"
    },
    audience: {
      en: "Learners interested in Web3 finance, DeFi products, security analysis, or on-chain data analysis.",
      zh: "适合想做 Web3 金融、DeFi 产品、安全分析或链上数据分析的人。"
    },
    outcomes: {
      en: "Evaluate DeFi protocols, security risks, incentive compatibility, and financial mechanisms.",
      zh: "能够评估 DeFi 协议、安全风险、激励相容性和金融机制。"
    },
    prerequisites: {
      en: "Blockchain basics, smart contracts, finance basics, and security awareness.",
      zh: "区块链基础、智能合约、金融基础和安全意识。"
    },
    language: "English",
    weeks: 14,
    hoursPerWeek: 6,
    estimatedHours: 80,
    durationNote: "Fall 2024 course; interdisciplinary CS and finance.",
    access: "Public course website",
    isFree: true,
    officialUrl: "https://rdi.berkeley.edu/berkeley-defi/f24",
    sourceType: "official-course-site",
    priority: "P0",
    commonPitfallsZh: "DeFi 不只是去中心化交易所，它涉及金融结构、合约安全、激励机制和系统性风险。",
    bridgeMaterialsZh: "建议先学 MIT Blockchain and Money 或 Stanford CS251。",
    outputTaskZh: "选择一个 DeFi 协议，分析其金融功能、智能合约机制、风险和改进方案。",
    lastChecked: "2026-06-27",
    tags: ["defi", "smart-contracts", "stablecoins", "amm", "debt", "derivatives", "security"]
  },
  {
    id: "berkeley-cs294-144-blockchain-cryptoeconomics",
    discipline: "blockchain",
    level: "intermediate",
    tracks: ["blockchain-web3"],
    provider: "UC Berkeley",
    university: "UC Berkeley",
    code: "CS294-144",
    title: {
      en: "CS294-144 Blockchain, Cryptoeconomics, and the Future of Technology, Business and Law",
      zh: "UC Berkeley CS294-144：区块链、加密经济学与技术/商业/法律未来"
    },
    description: {
      en: "An interdisciplinary course on blockchain, cryptoeconomics, payments, smart contracts, ICOs, scalability, privacy, business, and law.",
      zh: "跨学科课程，讨论区块链、加密经济学、支付、智能合约、ICO、可扩展性、隐私、商业和法律。"
    },
    audience: {
      en: "Product managers, founders, and learners seeking business, law, and technology context.",
      zh: "适合产品经理、创业者、留学申请背景提升或项目选题者。"
    },
    outcomes: {
      en: "Develop interdisciplinary judgment about blockchain applications and their social impact.",
      zh: "形成对区块链应用及其社会影响的跨学科判断。"
    },
    prerequisites: {
      en: "Blockchain basics helpful; interest in business, law, and technology.",
      zh: "具备区块链基础会有帮助，并对商业、法律和技术感兴趣。"
    },
    language: "English",
    weeks: 14,
    hoursPerWeek: 4,
    estimatedHours: 50,
    durationNote: "Spring 2018 interdisciplinary course; older but useful for context.",
    access: "Public course website",
    isFree: true,
    officialUrl: "https://berkeley-blockchain.github.io/cs294-144-s18/",
    sourceType: "official-course-site",
    priority: "P1",
    commonPitfallsZh: "课程较旧，不适合了解最新 Web3 技术栈，但适合理解区块链的跨学科影响。",
    bridgeMaterialsZh: "建议搭配 MIT Blockchain and Money 和 Berkeley DeFi。",
    outputTaskZh: "完成一个区块链商业、法律和技术综合分析报告。",
    lastChecked: "2026-06-27",
    tags: ["blockchain", "cryptoeconomics", "business", "law", "smart-contracts", "ico", "payments"]
  },
  {
    id: "blockchain-at-berkeley-openlearning",
    discipline: "blockchain",
    level: "beginner",
    tracks: ["blockchain-web3"],
    provider: "Blockchain at Berkeley",
    university: "UC Berkeley student organization",
    code: "OpenLearning",
    title: {
      en: "Blockchain at Berkeley OpenLearning MOOCs",
      zh: "Blockchain at Berkeley：OpenLearning 区块链 MOOC"
    },
    description: {
      en: "A university-based student organization resource for beginner-to-intermediate blockchain and cryptocurrency learning.",
      zh: "来自 Berkeley 学生组织的实践型补充资源，适合区块链和加密货币入门到中阶学习。"
    },
    audience: {
      en: "Learners who want practical Web3 supplement materials.",
      zh: "适合想找更实践型 Web3 补充材料的人。"
    },
    outcomes: {
      en: "Learn blockchain concepts and bridge from conceptual courses to hands-on Web3 resources.",
      zh: "学习区块链基础概念，并从概念课程过渡到动手型 Web3 学习。"
    },
    prerequisites: {
      en: "Basic programming helpful.",
      zh: "基础编程有帮助。"
    },
    language: "English",
    weeks: 6,
    hoursPerWeek: 5,
    estimatedHours: 30,
    durationNote:
      "University-based student organization resources; not a regular official registrar course.",
    access: "Public OpenLearning resources",
    isFree: true,
    officialUrl: "https://www.openlearning.com/blockchainberkeley/",
    sourceType: "university-student-org-mooc",
    priority: "P2",
    commonPitfallsZh:
      "这不是正式大学注册课程，建议标记为 Berkeley student organization supplement。",
    bridgeMaterialsZh: "建议搭配 Princeton Bitcoin 或 Stanford CS251。",
    outputTaskZh:
      "完成一份 Web3 入门学习笔记，并整理术语表：wallet、address、transaction、block、consensus、smart contract。",
    lastChecked: "2026-06-27",
    tags: ["blockchain", "web3", "mooc", "berkeley", "cryptocurrency"]
  }
];
