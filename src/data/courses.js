export const tracks = [
  "foundations",
  "systems",
  "ai-data",
  "software-engineering",
  "interview-prep"
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
  }
];
