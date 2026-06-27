import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Binary,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Brain,
  CheckCircle2,
  Code2,
  Compass,
  Database,
  ExternalLink,
  Filter,
  Globe2,
  GraduationCap,
  Languages,
  Layers3,
  Library,
  List,
  Lock,
  Map,
  Network,
  Play,
  Search,
  Shield,
  Sigma,
  SlidersHorizontal,
  Sparkles,
  TerminalSquare,
  Wrench
} from "lucide-react";
import "./styles.css";

const disciplines = [
  { id: "all", icon: Compass, color: "teal" },
  { id: "programming", icon: Code2, color: "teal" },
  { id: "math", icon: Sigma, color: "amber" },
  { id: "systems", icon: TerminalSquare, color: "blue" },
  { id: "theory", icon: Binary, color: "violet" },
  { id: "ai", icon: Brain, color: "green" },
  { id: "data", icon: Database, color: "teal" },
  { id: "security", icon: Shield, color: "blue" },
  { id: "engineering", icon: Wrench, color: "amber" },
  { id: "tools", icon: SlidersHorizontal, color: "teal" }
];

const levels = ["all", "intro", "foundational", "intermediate", "advanced"];
const tracks = ["all", "core", "systems", "ai-data", "security", "software"];

const copy = {
  en: {
    langName: "English",
    nav: ["Roadmap", "Courses", "Tracks", "Projects", "Sources"],
    heroTitle: "Build a real computer science foundation from open courses",
    heroCopy:
      "A curated map across programming, math, systems, theory, AI, security, data, and software engineering.",
    startRoadmap: "Start the roadmap",
    browseCourses: "Browse courses",
    learnPace: "Learn at your pace",
    learnPaceDesc: "Self-study with open courses from universities and public learning projects.",
    structured: "Structured roadmap",
    structuredDesc: "A coherent path with prerequisites, disciplines, and project milestones.",
    directLinks: "Course direct links",
    directLinksDesc: "Every course entry opens the official source page in one click.",
    pathTitle: "Your learning path",
    viewFull: "View full roadmap",
    progress: "Overall progress",
    resume: "Resume where you left off",
    coursesTitle: "Browse courses",
    searchPlaceholder: "Search courses, topics, sources...",
    discipline: "Discipline",
    level: "Level",
    track: "Track",
    source: "Source",
    time: "Est. time",
    tags: "Tags",
    action: "Action",
    saved: "Saved",
    openCourse: "Open course",
    course: "Course",
    allDisciplines: "All disciplines",
    list: "List",
    grid: "Grid",
    found: "courses found",
    mapTitle: "Discipline map",
    trackTitle: "Track bundles",
    projectsTitle: "Project milestones",
    sourceTitle: "Source transparency",
    sourceDesc:
      "The atlas prioritizes official course pages, open textbooks, university materials, and long-running public learning resources.",
    transparencyTitle: "Transparent by design",
    transparencyDesc:
      "Each row keeps its official link visible. Use the external-link action to verify availability before starting.",
    footerNote: "Open CS Atlas is an original learning map inspired by open curriculum projects. It is not affiliated with OSSU.",
    contribute: "Contribute",
    language: "Language",
    noResults: "No courses match the current filters.",
    resetFilters: "Reset filters",
    all: "All",
    labels: {
      all: "All",
      programming: "Programming",
      math: "Math",
      systems: "Systems",
      theory: "Theory",
      ai: "AI",
      data: "Data",
      security: "Security",
      engineering: "Software Engineering",
      tools: "Tools",
      intro: "Intro",
      foundational: "Foundational",
      intermediate: "Intermediate",
      advanced: "Advanced",
      core: "Core CS",
      "ai-data": "AI & Data",
      software: "Software",
      completed: "Completed",
      active: "In progress",
      locked: "Locked"
    }
  },
  zh: {
    langName: "中文",
    nav: ["路线图", "课程", "方向", "项目", "来源"],
    heroTitle: "用开源课程建立真正扎实的计算机科学基础",
    heroCopy:
      "覆盖编程、数学、系统、理论、人工智能、安全、数据与软件工程的自学地图。",
    startRoadmap: "开始路线图",
    browseCourses: "浏览课程",
    learnPace: "按自己的节奏学习",
    learnPaceDesc: "用大学公开课、开放教材和长期维护的公共学习资源自学。",
    structured: "结构化路线",
    structuredDesc: "按前置知识、学科模块和项目里程碑组织，而不是堆链接。",
    directLinks: "课程直达链接",
    directLinksDesc: "每门课都保留官方页面，一键打开原始课程来源。",
    pathTitle: "你的学习路径",
    viewFull: "查看完整路线",
    progress: "总体进度",
    resume: "继续上次进度",
    coursesTitle: "浏览课程",
    searchPlaceholder: "搜索课程、主题、来源...",
    discipline: "学科",
    level: "难度",
    track: "路线",
    source: "来源",
    time: "预计时长",
    tags: "标签",
    action: "操作",
    saved: "已收藏",
    openCourse: "打开课程",
    course: "课程",
    allDisciplines: "全部学科",
    list: "列表",
    grid: "网格",
    found: "门课程",
    mapTitle: "学科地图",
    trackTitle: "方向组合",
    projectsTitle: "项目里程碑",
    sourceTitle: "来源透明",
    sourceDesc:
      "优先收录官方课程页、开放教材、大学课程材料和长期维护的公共学习资源。",
    transparencyTitle: "透明可核验",
    transparencyDesc:
      "每一行都展示官方直达链接。开始学习前，建议点开原始页面确认课程仍可访问。",
    footerNote: "Open CS Atlas 是原创学习地图，受开源课程项目启发，但不隶属于 OSSU。",
    contribute: "参与维护",
    language: "语言",
    noResults: "当前筛选下没有匹配课程。",
    resetFilters: "重置筛选",
    all: "全部",
    labels: {
      all: "全部",
      programming: "编程",
      math: "数学",
      systems: "系统",
      theory: "理论",
      ai: "人工智能",
      data: "数据",
      security: "安全",
      engineering: "软件工程",
      tools: "工具",
      intro: "入门",
      foundational: "基础",
      intermediate: "进阶",
      advanced: "高级",
      core: "核心 CS",
      "ai-data": "AI 与数据",
      software: "软件工程",
      completed: "已完成",
      active: "进行中",
      locked: "待解锁"
    }
  }
};

const courses = [
  {
    id: "cs50x",
    discipline: "programming",
    level: "intro",
    track: "core",
    weeks: 11,
    source: "Harvard",
    url: "https://cs50.harvard.edu/x/",
    title: {
      en: "CS50x: Introduction to Computer Science",
      zh: "CS50x：计算机科学导论"
    },
    desc: {
      en: "Broad introduction to computational thinking, C, Python, SQL, web basics, and problem sets.",
      zh: "覆盖计算思维、C、Python、SQL、Web 基础和高质量作业的综合入门课。"
    },
    tags: ["programming", "c", "python", "web"]
  },
  {
    id: "mit-6100l",
    discipline: "programming",
    level: "intro",
    track: "core",
    weeks: 8,
    source: "MIT OpenCourseWare",
    url: "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/",
    title: {
      en: "6.100L: Introduction to CS and Programming Using Python",
      zh: "MIT 6.100L：Python 计算机科学与编程导论"
    },
    desc: {
      en: "Python-first introduction to abstraction, algorithms, testing, and data structures.",
      zh: "以 Python 进入抽象、算法、测试和数据结构的 MIT 入门课程。"
    },
    tags: ["python", "algorithms", "testing"]
  },
  {
    id: "berkeley-cs61a",
    discipline: "programming",
    level: "foundational",
    track: "core",
    weeks: 13,
    source: "UC Berkeley",
    url: "https://cs61a.org/",
    title: {
      en: "CS 61A: Structure and Interpretation of Computer Programs",
      zh: "UC Berkeley CS 61A：程序的结构与解释"
    },
    desc: {
      en: "Functional abstraction, recursion, interpreters, and core ideas behind programming languages.",
      zh: "学习函数抽象、递归、解释器和编程语言背后的核心思想。"
    },
    tags: ["abstraction", "recursion", "scheme", "python"]
  },
  {
    id: "missing-semester",
    discipline: "tools",
    level: "intro",
    track: "core",
    weeks: 2,
    source: "MIT",
    url: "https://missing.csail.mit.edu/",
    title: {
      en: "The Missing Semester of Your CS Education",
      zh: "计算机教育中缺失的一课"
    },
    desc: {
      en: "Shell, Git, editors, debugging, profiling, security, and productivity workflows.",
      zh: "补齐 shell、Git、编辑器、调试、性能分析、安全和效率工具。"
    },
    tags: ["shell", "git", "vim", "debugging"]
  },
  {
    id: "pro-git",
    discipline: "tools",
    level: "intro",
    track: "software",
    weeks: 2,
    source: "Git SCM",
    url: "https://git-scm.com/book/en/v2",
    title: {
      en: "Pro Git",
      zh: "Pro Git 开放教材"
    },
    desc: {
      en: "Official open book for Git fundamentals, branching, remotes, internals, and collaboration.",
      zh: "Git 官方开放教材，覆盖基础、分支、远端、内部原理和协作。"
    },
    tags: ["git", "version-control", "collaboration"]
  },
  {
    id: "mit-6042",
    discipline: "math",
    level: "foundational",
    track: "core",
    weeks: 13,
    source: "MIT OpenCourseWare",
    url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/",
    title: {
      en: "6.042J: Mathematics for Computer Science",
      zh: "MIT 6.042J：计算机科学数学"
    },
    desc: {
      en: "Proofs, induction, graph theory, number theory, counting, probability, and discrete structures.",
      zh: "覆盖证明、归纳、图论、数论、计数、概率和离散结构。"
    },
    tags: ["proofs", "discrete-math", "probability"]
  },
  {
    id: "linear-algebra",
    discipline: "math",
    level: "foundational",
    track: "ai-data",
    weeks: 12,
    source: "MIT OpenCourseWare",
    url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/",
    title: {
      en: "18.06SC: Linear Algebra",
      zh: "MIT 18.06SC：线性代数"
    },
    desc: {
      en: "Vectors, matrices, subspaces, eigenvalues, least squares, and linear transformations.",
      zh: "向量、矩阵、子空间、特征值、最小二乘和线性变换。"
    },
    tags: ["linear-algebra", "vectors", "matrices"]
  },
  {
    id: "stat110",
    discipline: "math",
    level: "intermediate",
    track: "ai-data",
    weeks: 15,
    source: "Harvard",
    url: "https://projects.iq.harvard.edu/stat110/home",
    title: {
      en: "Stat 110: Introduction to Probability",
      zh: "Harvard Stat 110：概率论导论"
    },
    desc: {
      en: "Probability foundations for algorithms, machine learning, statistics, and data science.",
      zh: "为算法、机器学习、统计和数据科学打基础的概率课程。"
    },
    tags: ["probability", "statistics", "data"]
  },
  {
    id: "nand2tetris",
    discipline: "systems",
    level: "foundational",
    track: "systems",
    weeks: 12,
    source: "Nand2Tetris",
    url: "https://www.nand2tetris.org/",
    title: {
      en: "Nand2Tetris: Build a Modern Computer from First Principles",
      zh: "Nand2Tetris：从第一性原理构建现代计算机"
    },
    desc: {
      en: "Build logic gates, CPU, assembler, VM, compiler, and a small operating system layer.",
      zh: "从逻辑门、CPU、汇编器、虚拟机、编译器一路构建到小型系统层。"
    },
    tags: ["architecture", "hardware", "compiler", "vm"]
  },
  {
    id: "cmu-213",
    discipline: "systems",
    level: "intermediate",
    track: "systems",
    weeks: 14,
    source: "Carnegie Mellon",
    url: "https://www.cs.cmu.edu/~213/",
    title: {
      en: "15-213: Introduction to Computer Systems",
      zh: "CMU 15-213：计算机系统导论"
    },
    desc: {
      en: "Machine-level code, memory hierarchy, linking, exceptional control flow, and concurrency.",
      zh: "学习机器级代码、存储层次、链接、异常控制流和并发。"
    },
    tags: ["c", "memory", "systems", "concurrency"]
  },
  {
    id: "ostep",
    discipline: "systems",
    level: "intermediate",
    track: "systems",
    weeks: 12,
    source: "OSTEP",
    url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
    title: {
      en: "Operating Systems: Three Easy Pieces",
      zh: "操作系统：三个简单部分"
    },
    desc: {
      en: "Processes, virtualization, scheduling, concurrency, memory, file systems, and distributed systems.",
      zh: "覆盖进程、虚拟化、调度、并发、内存、文件系统和分布式系统。"
    },
    tags: ["os", "concurrency", "virtualization"]
  },
  {
    id: "networking-top-down",
    discipline: "systems",
    level: "intermediate",
    track: "systems",
    weeks: 8,
    source: "UMass Amherst",
    url: "https://gaia.cs.umass.edu/kurose_ross/online_lectures.htm",
    title: {
      en: "Computer Networking: A Top-Down Approach Lectures",
      zh: "自顶向下的计算机网络课程"
    },
    desc: {
      en: "Application, transport, network, link, wireless, security, and multimedia networking.",
      zh: "从应用层到传输层、网络层、链路层、无线、安全和多媒体网络。"
    },
    tags: ["networking", "tcp-ip", "internet"]
  },
  {
    id: "algs4",
    discipline: "theory",
    level: "foundational",
    track: "core",
    weeks: 12,
    source: "Princeton",
    url: "https://algs4.cs.princeton.edu/home/",
    title: {
      en: "Algorithms, 4th Edition",
      zh: "Princeton Algorithms：算法开放教材"
    },
    desc: {
      en: "Classic algorithms and data structures with Java implementations and visual explanations.",
      zh: "经典算法与数据结构，配套 Java 实现和可视化讲解。"
    },
    tags: ["algorithms", "data-structures", "java"]
  },
  {
    id: "roughgarden-algorithms",
    discipline: "theory",
    level: "intermediate",
    track: "core",
    weeks: 16,
    source: "Tim Roughgarden",
    url: "https://timroughgarden.org/videos.html",
    title: {
      en: "Algorithms Illuminated Video Lectures",
      zh: "Algorithms Illuminated 算法视频课"
    },
    desc: {
      en: "Divide and conquer, graph search, shortest paths, greedy algorithms, dynamic programming, and NP-completeness.",
      zh: "分治、图搜索、最短路、贪心、动态规划和 NP 完全性。"
    },
    tags: ["algorithms", "graphs", "complexity"]
  },
  {
    id: "mit-theory",
    discipline: "theory",
    level: "advanced",
    track: "core",
    weeks: 13,
    source: "MIT OpenCourseWare",
    url: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
    title: {
      en: "18.404J: Theory of Computation",
      zh: "MIT 18.404J：计算理论"
    },
    desc: {
      en: "Automata, computability, complexity, reductions, and what computation can and cannot do.",
      zh: "自动机、可计算性、复杂性、归约，以及计算能力的边界。"
    },
    tags: ["automata", "complexity", "computability"]
  },
  {
    id: "cs229",
    discipline: "ai",
    level: "intermediate",
    track: "ai-data",
    weeks: 10,
    source: "Stanford",
    url: "https://cs229.stanford.edu/",
    title: {
      en: "CS229: Machine Learning",
      zh: "Stanford CS229：机器学习"
    },
    desc: {
      en: "Supervised learning, generalization, SVMs, kernels, generative models, and reinforcement learning.",
      zh: "监督学习、泛化、SVM、核方法、生成模型和强化学习。"
    },
    tags: ["machine-learning", "statistics", "optimization"]
  },
  {
    id: "cs231n",
    discipline: "ai",
    level: "advanced",
    track: "ai-data",
    weeks: 10,
    source: "Stanford",
    url: "https://cs231n.stanford.edu/",
    title: {
      en: "CS231n: Deep Learning for Computer Vision",
      zh: "Stanford CS231n：面向计算机视觉的深度学习"
    },
    desc: {
      en: "Neural networks, CNNs, representation learning, detection, segmentation, and visual recognition.",
      zh: "神经网络、CNN、表征学习、检测、分割和视觉识别。"
    },
    tags: ["deep-learning", "computer-vision", "pytorch"]
  },
  {
    id: "cs188",
    discipline: "ai",
    level: "intermediate",
    track: "ai-data",
    weeks: 14,
    source: "UC Berkeley",
    url: "https://inst.eecs.berkeley.edu/~cs188/",
    title: {
      en: "CS188: Introduction to Artificial Intelligence",
      zh: "UC Berkeley CS188：人工智能导论"
    },
    desc: {
      en: "Search, games, MDPs, reinforcement learning, Bayes nets, HMMs, and machine learning.",
      zh: "搜索、博弈、MDP、强化学习、贝叶斯网络、HMM 和机器学习。"
    },
    tags: ["ai", "search", "rl", "probability"]
  },
  {
    id: "cmu-15445",
    discipline: "data",
    level: "intermediate",
    track: "ai-data",
    weeks: 14,
    source: "Carnegie Mellon",
    url: "https://15445.courses.cs.cmu.edu/",
    title: {
      en: "15-445/645: Database Systems",
      zh: "CMU 15-445/645：数据库系统"
    },
    desc: {
      en: "Storage, indexing, query execution, optimization, transactions, concurrency, and recovery.",
      zh: "存储、索引、查询执行、优化、事务、并发控制和恢复。"
    },
    tags: ["database", "sql", "transactions"]
  },
  {
    id: "stanford-cs145",
    discipline: "data",
    level: "foundational",
    track: "ai-data",
    weeks: 10,
    source: "Stanford",
    url: "https://web.stanford.edu/class/cs145/",
    title: {
      en: "CS145: Data Management and Data Systems",
      zh: "Stanford CS145：数据管理与数据系统"
    },
    desc: {
      en: "Relational design, SQL, query processing, transactions, and modern data systems.",
      zh: "关系设计、SQL、查询处理、事务和现代数据系统。"
    },
    tags: ["data", "database", "sql"]
  },
  {
    id: "portswigger",
    discipline: "security",
    level: "foundational",
    track: "security",
    weeks: 8,
    source: "PortSwigger",
    url: "https://portswigger.net/web-security",
    title: {
      en: "Web Security Academy",
      zh: "Web Security Academy：Web 安全学院"
    },
    desc: {
      en: "Hands-on labs for XSS, SQL injection, authentication, access control, SSRF, and more.",
      zh: "通过实验学习 XSS、SQL 注入、认证、访问控制、SSRF 等 Web 安全主题。"
    },
    tags: ["web-security", "labs", "appsec"]
  },
  {
    id: "mit-6858",
    discipline: "security",
    level: "advanced",
    track: "security",
    weeks: 12,
    source: "MIT CSAIL",
    url: "https://css.csail.mit.edu/6.858/2023/",
    title: {
      en: "6.858: Computer Systems Security",
      zh: "MIT 6.858：计算机系统安全"
    },
    desc: {
      en: "Threat models, memory safety, web security, OS security, cryptography, and system defenses.",
      zh: "威胁模型、内存安全、Web 安全、操作系统安全、密码学和系统防御。"
    },
    tags: ["systems-security", "cryptography", "defense"]
  },
  {
    id: "fullstackopen",
    discipline: "engineering",
    level: "intermediate",
    track: "software",
    weeks: 12,
    source: "University of Helsinki",
    url: "https://fullstackopen.com/en/",
    title: {
      en: "Full Stack Open",
      zh: "Full Stack Open：现代 Web 全栈开发"
    },
    desc: {
      en: "React, Node.js, testing, TypeScript, GraphQL, containers, CI/CD, and modern web practices.",
      zh: "学习 React、Node.js、测试、TypeScript、GraphQL、容器、CI/CD 和现代 Web 实践。"
    },
    tags: ["react", "node", "testing", "typescript"]
  },
  {
    id: "ubc-cpsc310",
    discipline: "engineering",
    level: "advanced",
    track: "software",
    weeks: 10,
    source: "UBC",
    url: "https://github.com/ubccpsc/310/tree/main/resources",
    title: {
      en: "CPSC 310: Introduction to Software Engineering",
      zh: "UBC CPSC 310：软件工程导论资源"
    },
    desc: {
      en: "Design, testing, maintainability, requirements, and large-project engineering practices.",
      zh: "围绕设计、测试、可维护性、需求和大型项目工程实践。"
    },
    tags: ["software-engineering", "testing", "design"]
  }
];

const roadmap = [
  { id: "foundations", discipline: "tools", weeks: "0-4", icon: Compass },
  { id: "programming", discipline: "programming", weeks: "4-12", icon: Code2 },
  { id: "math", discipline: "math", weeks: "8-24", icon: Sigma },
  { id: "systems", discipline: "systems", weeks: "16-36", icon: TerminalSquare },
  { id: "theory", discipline: "theory", weeks: "24-44", icon: Binary },
  { id: "data", discipline: "data", weeks: "32-52", icon: Database },
  { id: "ai", discipline: "ai", weeks: "40-64", icon: Brain },
  { id: "security", discipline: "security", weeks: "48-72", icon: Shield },
  { id: "engineering", discipline: "engineering", weeks: "52+", icon: Wrench }
];

const roadmapText = {
  en: {
    foundations: "Foundations",
    programming: "Programming",
    math: "Math",
    systems: "Systems",
    theory: "Theory",
    data: "Data",
    ai: "AI",
    security: "Security",
    engineering: "Engineering"
  },
  zh: {
    foundations: "基础工具",
    programming: "编程",
    math: "数学",
    systems: "系统",
    theory: "理论",
    data: "数据",
    ai: "人工智能",
    security: "安全",
    engineering: "工程"
  }
};

const trackBundles = [
  {
    id: "core",
    icon: GraduationCap,
    title: { en: "Core CS", zh: "核心计算机科学" },
    desc: {
      en: "Programming, math, algorithms, systems, and theory for a broad foundation.",
      zh: "编程、数学、算法、系统和理论，构成通用基础。"
    },
    items: ["cs50x", "mit-6042", "algs4", "nand2tetris"]
  },
  {
    id: "systems",
    icon: Network,
    title: { en: "Systems Builder", zh: "系统构建方向" },
    desc: {
      en: "Computer architecture, OS, networking, and security for low-level competence.",
      zh: "计算机组成、操作系统、网络和安全，建立底层能力。"
    },
    items: ["nand2tetris", "cmu-213", "ostep", "networking-top-down"]
  },
  {
    id: "ai-data",
    icon: Brain,
    title: { en: "AI & Data", zh: "AI 与数据方向" },
    desc: {
      en: "Linear algebra, probability, ML, databases, and deep learning.",
      zh: "线性代数、概率、机器学习、数据库和深度学习。"
    },
    items: ["linear-algebra", "stat110", "cs229", "cmu-15445"]
  },
  {
    id: "software",
    icon: Layers3,
    title: { en: "Software Engineering", zh: "软件工程方向" },
    desc: {
      en: "Tools, web engineering, testing, design, and maintainable systems.",
      zh: "工具、Web 工程、测试、设计和可维护系统。"
    },
    items: ["missing-semester", "pro-git", "fullstackopen", "ubc-cpsc310"]
  }
];

const projects = [
  {
    id: "p1",
    status: "completed",
    title: { en: "CLI Study Tracker", zh: "命令行学习追踪器" },
    desc: { en: "Write your first program and use Git.", zh: "写第一个程序并使用 Git 管理。" }
  },
  {
    id: "p2",
    status: "completed",
    title: { en: "Data Structures Lab", zh: "数据结构实验" },
    desc: { en: "Implement core collections and tests.", zh: "实现核心集合结构和测试。" }
  },
  {
    id: "p3",
    status: "active",
    title: { en: "Web Application", zh: "Web 应用" },
    desc: { en: "Build a small full-stack app.", zh: "构建一个小型全栈应用。" }
  },
  {
    id: "p4",
    status: "locked",
    title: { en: "Tiny Systems Tool", zh: "小型系统工具" },
    desc: { en: "Use OS and networking concepts.", zh: "使用操作系统和网络概念。" }
  },
  {
    id: "p5",
    status: "locked",
    title: { en: "ML Pipeline", zh: "机器学习流水线" },
    desc: { en: "Train, evaluate, and report a model.", zh: "训练、评估并报告一个模型。" }
  },
  {
    id: "p6",
    status: "locked",
    title: { en: "Capstone", zh: "毕业项目" },
    desc: { en: "Solve a real problem end-to-end.", zh: "端到端解决一个真实问题。" }
  }
];

const sourceLinks = [
  ["MIT OCW", "https://ocw.mit.edu/"],
  ["Harvard CS50", "https://cs50.harvard.edu/x/"],
  ["Stanford Online", "https://online.stanford.edu/"],
  ["UC Berkeley", "https://www2.eecs.berkeley.edu/Courses/"],
  ["Carnegie Mellon", "https://www.cs.cmu.edu/"],
  ["Full Stack Open", "https://fullstackopen.com/en/"],
  ["Teach Yourself CS", "https://teachyourselfcs.com/"],
  ["CS自学指南", "https://csdiy.wiki/"]
];

function HeroMap() {
  const pins = [
    { x: 152, y: 166, color: "teal", label: "DB" },
    { x: 270, y: 114, color: "dark", label: "</>" },
    { x: 314, y: 252, color: "teal", label: "SW" },
    { x: 490, y: 132, color: "amber", label: "M" },
    { x: 392, y: 218, color: "violet", label: "OS" },
    { x: 610, y: 262, color: "blue", label: "SEC" },
    { x: 734, y: 152, color: "green", label: "AI" }
  ];

  const routeDots = [
    [205, 146],
    [348, 166],
    [560, 154],
    [674, 208],
    [804, 212]
  ];

  return (
    <div className="hero-visual" aria-hidden="true">
      <svg className="map-illustration" viewBox="0 0 980 430" focusable="false">
        <defs>
          <linearGradient id="waterGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#e7f4f5" />
            <stop offset="100%" stopColor="#c6e1e5" />
          </linearGradient>
          <radialGradient id="compassGlass" cx="45%" cy="38%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="72%" stopColor="#dde5e5" />
            <stop offset="100%" stopColor="#88979a" />
          </radialGradient>
          <filter id="mapShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#0f172a" floodOpacity="0.18" />
          </filter>
          <filter id="pinShadow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0f172a" floodOpacity="0.24" />
          </filter>
          <clipPath id="mapClip">
            <polygon points="62,50 916,24 948,332 88,374" />
          </clipPath>
        </defs>

        <g className="map-paper" filter="url(#mapShadow)" transform="rotate(-2 505 213)">
          <polygon className="paper-edge" points="40,28 940,0 970,350 62,398" />
          <polygon className="map-water" points="62,50 916,24 948,332 88,374" />
          <g clipPath="url(#mapClip)">
            <path className="map-grid vertical" d="M138 42 153 370M230 39 243 365M322 36 335 360M414 34 425 356M506 31 516 352M598 29 606 348M690 26 697 344M782 24 787 340M874 21 878 336" />
            <path className="map-grid horizontal" d="M66 98 923 71M70 146 928 119M74 194 933 167M78 242 938 216M83 290 943 265M87 338 948 315" />
            <path className="land" d="M116 132c34-44 86-52 132-30 30 14 49 7 85 3 49-6 72 20 92 52-30 17-72 12-105 5-45-10-80 2-116 24-48 29-99 11-88-54z" />
            <path className="land" d="M254 232c58-23 122-12 159 28 28 30 69 40 104 26 27-11 47 4 61 26-40 31-117 34-174 8-41-19-71-48-121-37-34 7-60-16-29-51z" />
            <path className="land" d="M474 88c72-37 160-36 228 1 57 31 111 21 166 7 44-11 66 15 54 45-62 20-145 10-205 23-87 18-161-6-243-76z" />
            <path className="land" d="M628 186c32-25 91-22 124 3 31 24 71 28 112 23 33-4 55 15 43 44-55 19-127 8-175-16-32-16-71-12-100 9-30 21-56-26-4-63z" />
            <path className="land pale" d="M132 304c62-12 101 11 156 26-51 28-143 26-196 4 7-16 20-25 40-30z" />
            <path className="land pale" d="M760 296c45-18 98-19 142-2-19 23-75 39-124 32-25-4-31-17-18-30z" />
            <path className="fold" d="M488 22 506 356" />
            <path className="fold soft" d="M718 22 722 340" />
          </g>
          <path className="map-border" d="M62 50 916 24 948 332 88 374Z" />
        </g>

        <path className="map-route-shadow" d="M146 170 C210 105 292 118 354 166 S453 241 542 171 S693 95 748 162 S814 248 874 230" />
        <path className="map-route" d="M146 170 C210 105 292 118 354 166 S453 241 542 171 S693 95 748 162 S814 248 874 230" />
        {routeDots.map(([x, y]) => (
          <circle key={`${x}-${y}`} className="route-dot" cx={x} cy={y} r="9" />
        ))}

        {pins.map((pin) => (
          <g key={pin.label} className="map-pin" transform={`translate(${pin.x} ${pin.y})`} filter="url(#pinShadow)">
            <circle className="pin-rim" r="37" />
            <circle className={`pin-core ${pin.color}`} r="30" />
            <text textAnchor="middle" dominantBaseline="central">
              {pin.label}
            </text>
          </g>
        ))}

        <g className="compass-rose" transform="translate(788 240)">
          <circle className="compass-shadow" cx="78" cy="78" r="72" />
          <circle className="compass-metal" cx="78" cy="78" r="67" />
          <circle className="compass-face" cx="78" cy="78" r="55" fill="url(#compassGlass)" />
          <g className="tick-ring">
            {Array.from({ length: 24 }, (_, index) => (
              <line
                key={index}
                x1="78"
                x2="78"
                y1={index % 3 === 0 ? "25" : "30"}
                y2="34"
                transform={`rotate(${index * 15} 78 78)`}
              />
            ))}
          </g>
          <path className="needle teal" d="M78 21 96 79 78 68 60 79Z" />
          <path className="needle dark" d="M78 135 96 79 78 88 60 79Z" />
          <circle className="pivot" cx="78" cy="78" r="11" />
          <path className="loop" d="M132 18c20-15 38 7 20 23" />
        </g>
      </svg>
    </div>
  );
}

function getStored(key, fallback) {
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function setStored(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Local storage is optional; the UI still works without persistence.
  }
}

function App() {
  const [lang, setLang] = useState(() => getStored("open-cs-atlas-lang", "zh"));
  const [discipline, setDiscipline] = useState("all");
  const [level, setLevel] = useState("all");
  const [track, setTrack] = useState("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState("list");
  const [savedIds, setSavedIds] = useState(() => {
    const saved = getStored("open-cs-atlas-saved", "");
    return new Set(saved ? saved.split(",") : []);
  });
  const [completedProjects, setCompletedProjects] = useState(() => {
    const stored = getStored("open-cs-atlas-projects", "");
    return new Set(stored ? stored.split(",") : projects.filter((project) => project.status === "completed").map((project) => project.id));
  });

  const t = copy[lang];
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

  const filteredCourses = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesDiscipline = discipline === "all" || course.discipline === discipline;
      const matchesLevel = level === "all" || course.level === level;
      const matchesTrack = track === "all" || course.track === track;
      const haystack = [
        course.title.en,
        course.title.zh,
        course.desc.en,
        course.desc.zh,
        course.source,
        course.discipline,
        course.level,
        course.track,
        ...course.tags
      ]
        .join(" ")
        .toLowerCase();
      return matchesDiscipline && matchesLevel && matchesTrack && (!needle || haystack.includes(needle));
    });
  }, [discipline, level, query, track]);

  const disciplineCounts = useMemo(() => {
    return courses.reduce((acc, course) => {
      acc[course.discipline] = (acc[course.discipline] || 0) + 1;
      return acc;
    }, {});
  }, []);

  const progress = Math.round((completedProjects.size / projects.length) * 100);

  function switchLanguage(nextLang) {
    setLang(nextLang);
    setStored("open-cs-atlas-lang", nextLang);
  }

  function toggleSaved(courseId) {
    const next = new Set(savedIds);
    if (next.has(courseId)) {
      next.delete(courseId);
    } else {
      next.add(courseId);
    }
    setSavedIds(next);
    setStored("open-cs-atlas-saved", Array.from(next).join(","));
  }

  function toggleProject(projectId) {
    const project = projects.find((item) => item.id === projectId);
    if (!project || project.status === "locked") return;
    const next = new Set(completedProjects);
    if (next.has(projectId)) {
      next.delete(projectId);
    } else {
      next.add(projectId);
    }
    setCompletedProjects(next);
    setStored("open-cs-atlas-projects", Array.from(next).join(","));
  }

  function resetFilters() {
    setDiscipline("all");
    setLevel("all");
    setTrack("all");
    setQuery("");
  }

  return (
    <div className="app-shell">
      <Header lang={lang} t={t} onSwitchLanguage={switchLanguage} />
      <main>
        <section className="hero-section" id="roadmap">
          <div className="hero-copy">
            <h1>{t.heroTitle}</h1>
            <p>{t.heroCopy}</p>
            <div className="hero-actions">
              <a className="button primary" href="#path">
                {t.startRoadmap}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a className="button secondary" href="#courses">
                {t.browseCourses}
              </a>
            </div>
            <div className="proof-row" aria-label="site features">
              <Feature icon={Compass} title={t.learnPace} desc={t.learnPaceDesc} />
              <Feature icon={Map} title={t.structured} desc={t.structuredDesc} />
              <Feature icon={ExternalLink} title={t.directLinks} desc={t.directLinksDesc} />
            </div>
          </div>
          <HeroMap />
        </section>

        <section className="path-section" id="path">
          <div className="section-heading compact">
            <div>
              <h2>{t.pathTitle}</h2>
              <a href="#tracks">
                {t.viewFull}
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
            <div className="progress-panel">
              <span>{t.progress}</span>
              <strong>{progress}%</strong>
              <div className="progress-track" aria-hidden="true">
                <div style={{ width: `${progress}%` }} />
              </div>
              <a className="small-button" href="#projects">
                <Play size={14} aria-hidden="true" />
                {t.resume}
              </a>
            </div>
          </div>
          <div className="roadmap-strip">
            {roadmap.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <button
                  className={`roadmap-node ${discipline === stage.discipline ? "is-selected" : ""}`}
                  key={stage.id}
                  type="button"
                  onClick={() => {
                    setDiscipline(stage.discipline);
                    document.querySelector("#courses")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="node-index">{index + 1}</span>
                  <Icon size={22} aria-hidden="true" />
                  <strong>{roadmapText[lang][stage.id]}</strong>
                  <small>{stage.weeks} {lang === "zh" ? "周" : "weeks"}</small>
                </button>
              );
            })}
          </div>
        </section>

        <section className="courses-section" id="courses">
          <div className="course-layout">
            <aside className="filters-panel" aria-label={t.discipline}>
              <div className="search-box">
                <Search size={16} aria-hidden="true" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t.searchPlaceholder}
                />
              </div>
              <div className="filter-group">
                <span className="filter-title">
                  <Filter size={15} aria-hidden="true" />
                  {t.discipline}
                </span>
                {disciplines.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      className={discipline === item.id ? "filter-option is-active" : "filter-option"}
                      key={item.id}
                      type="button"
                      onClick={() => setDiscipline(item.id)}
                    >
                      <Icon size={16} aria-hidden="true" />
                      <span>{item.id === "all" ? t.allDisciplines : t.labels[item.id]}</span>
                      <small>{item.id === "all" ? courses.length : disciplineCounts[item.id] || 0}</small>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="courses-main">
              <div className="section-heading">
                <div>
                  <h2>{t.coursesTitle}</h2>
                  <p>{filteredCourses.length} {t.found}</p>
                </div>
                <div className="view-toggle" role="group" aria-label="view mode">
                  <button className={view === "list" ? "is-active" : ""} type="button" onClick={() => setView("list")}>
                    <List size={15} aria-hidden="true" />
                    {t.list}
                  </button>
                  <button className={view === "grid" ? "is-active" : ""} type="button" onClick={() => setView("grid")}>
                    <Layers3 size={15} aria-hidden="true" />
                    {t.grid}
                  </button>
                </div>
              </div>

              <div className="toolbar">
                <Select label={t.level} value={level} options={levels} t={t} onChange={setLevel} />
                <Select label={t.track} value={track} options={tracks} t={t} onChange={setTrack} />
              </div>

              {filteredCourses.length ? (
                view === "list" ? (
                  <CourseTable
                    courses={filteredCourses}
                    lang={lang}
                    t={t}
                    savedIds={savedIds}
                    onToggleSaved={toggleSaved}
                  />
                ) : (
                  <CourseGrid
                    courses={filteredCourses}
                    lang={lang}
                    t={t}
                    savedIds={savedIds}
                    onToggleSaved={toggleSaved}
                  />
                )
              ) : (
                <div className="empty-state">
                  <Library size={30} aria-hidden="true" />
                  <p>{t.noResults}</p>
                  <button className="button secondary" type="button" onClick={resetFilters}>
                    {t.resetFilters}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="discipline-section">
          <div className="section-heading">
            <div>
              <h2>{t.mapTitle}</h2>
              <p>{lang === "zh" ? "点击学科可直接筛选课程目录。" : "Click a discipline to filter the catalog."}</p>
            </div>
          </div>
          <div className="discipline-grid">
            {disciplines.filter((item) => item.id !== "all").map((item) => {
              const Icon = item.icon;
              return (
                <button
                  className={`discipline-tile ${discipline === item.id ? "is-active" : ""}`}
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setDiscipline(item.id);
                    document.querySelector("#courses")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Icon size={24} aria-hidden="true" />
                  <strong>{t.labels[item.id]}</strong>
                  <span>{disciplineCounts[item.id] || 0} {lang === "zh" ? "门课程" : "courses"}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="tracks-section" id="tracks">
          <div className="section-heading">
            <div>
              <h2>{t.trackTitle}</h2>
              <p>{lang === "zh" ? "按目标方向组合课程，避免只按单课随意跳转。" : "Course bundles organized by learning goals, not isolated links."}</p>
            </div>
          </div>
          <div className="track-grid">
            {trackBundles.map((bundle) => {
              const Icon = bundle.icon;
              return (
                <article className="track-card" key={bundle.id}>
                  <Icon size={26} aria-hidden="true" />
                  <h3>{bundle.title[lang]}</h3>
                  <p>{bundle.desc[lang]}</p>
                  <div className="mini-course-list">
                    {bundle.items.map((courseId) => {
                      const course = courses.find((item) => item.id === courseId);
                      return (
                        <a key={courseId} href={course.url} target="_blank" rel="noreferrer">
                          {course.title[lang]}
                          <ExternalLink size={13} aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <div>
              <h2>{t.projectsTitle}</h2>
              <p>{lang === "zh" ? "用项目把课程知识转化成作品和可验证能力。" : "Turn coursework into visible artifacts and verifiable skill."}</p>
            </div>
          </div>
          <div className="project-strip">
            {projects.map((project, index) => {
              const isCompleted = completedProjects.has(project.id);
              const isLocked = project.status === "locked";
              return (
                <button
                  className={`project-card ${isCompleted ? "is-complete" : ""} ${project.status === "active" ? "is-active" : ""}`}
                  disabled={isLocked}
                  key={project.id}
                  type="button"
                  onClick={() => toggleProject(project.id)}
                >
                  <span className="project-number">{index + 1}</span>
                  <div>
                    <strong>{project.title[lang]}</strong>
                    <p>{project.desc[lang]}</p>
                  </div>
                  {isLocked ? <Lock size={18} aria-hidden="true" /> : isCompleted ? <CheckCircle2 size={18} aria-hidden="true" /> : <Sparkles size={18} aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </section>

        <section className="sources-section" id="sources">
          <div>
            <h2>{t.sourceTitle}</h2>
            <p>{t.sourceDesc}</p>
          </div>
          <div className="source-links">
            {sourceLinks.map(([label, url]) => (
              <a href={url} key={label} target="_blank" rel="noreferrer">
                {label}
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="transparency-panel">
            <Globe2 size={26} aria-hidden="true" />
            <div>
              <h3>{t.transparencyTitle}</h3>
              <p>{t.transparencyDesc}</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <span>{t.footerNote}</span>
        <div>
          <a href="https://github.com/" target="_blank" rel="noreferrer">{t.contribute}</a>
          <button type="button" onClick={() => switchLanguage(lang === "zh" ? "en" : "zh")}>
            <Languages size={14} aria-hidden="true" />
            {lang === "zh" ? "English" : "中文"}
          </button>
        </div>
      </footer>
    </div>
  );
}

function Header({ lang, t, onSwitchLanguage }) {
  return (
    <header className="site-header">
      <a className="brand" href="#roadmap" aria-label="Open CS Atlas">
        <span className="brand-mark">
          <Compass size={23} aria-hidden="true" />
        </span>
        <span>Open CS Atlas</span>
      </a>
      <nav aria-label="Primary navigation">
        {t.nav.map((item, index) => (
          <a key={item} href={["#roadmap", "#courses", "#tracks", "#projects", "#sources"][index]}>
            {item}
          </a>
        ))}
      </nav>
      <div className="language-toggle" aria-label={t.language}>
        <Languages size={16} aria-hidden="true" />
        <button className={lang === "zh" ? "is-active" : ""} type="button" onClick={() => onSwitchLanguage("zh")}>
          中文
        </button>
        <button className={lang === "en" ? "is-active" : ""} type="button" onClick={() => onSwitchLanguage("en")}>
          EN
        </button>
      </div>
    </header>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="feature">
      <Icon size={22} aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <span>{desc}</span>
      </div>
    </div>
  );
}

function Select({ label, value, options, t, onChange }) {
  return (
    <label className="select-control">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {t.labels[option] ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}

function CourseTable({ courses, lang, t, savedIds, onToggleSaved }) {
  return (
    <div className="course-table-wrap">
      <table className="course-table">
        <thead>
          <tr>
            <th>{t.course}</th>
            <th>{t.source}</th>
            <th>{t.level}</th>
            <th>{t.tags}</th>
            <th>{t.time}</th>
            <th>{t.track}</th>
            <th>{t.action}</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>
                <div className="course-name">
                  <span className={`course-icon icon-${course.discipline}`}>{iconFor(course.discipline)}</span>
                  <div>
                    <strong>{course.title[lang]}</strong>
                    <p>{course.desc[lang]}</p>
                  </div>
                </div>
              </td>
              <td>
                <a className="source-link" href={course.url} target="_blank" rel="noreferrer">
                  {course.source}
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </td>
              <td>{t.labels[course.level]}</td>
              <td>
                <div className="tag-list">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </td>
              <td>{course.weeks} {lang === "zh" ? "周" : "weeks"}</td>
              <td>{t.labels[course.track]}</td>
              <td>
                <div className="row-actions">
                  <a className="icon-button labeled" href={course.url} target="_blank" rel="noreferrer">
                    <ExternalLink size={15} aria-hidden="true" />
                    {t.openCourse}
                  </a>
                  <button className="icon-button" type="button" onClick={() => onToggleSaved(course.id)} aria-label={t.saved}>
                    {savedIds.has(course.id) ? <BookmarkCheck size={17} aria-hidden="true" /> : <Bookmark size={17} aria-hidden="true" />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CourseGrid({ courses, lang, t, savedIds, onToggleSaved }) {
  return (
    <div className="course-grid">
      {courses.map((course) => (
        <article className="course-card" key={course.id}>
          <div className="course-card-top">
            <span className={`course-icon icon-${course.discipline}`}>{iconFor(course.discipline)}</span>
            <button className="icon-button" type="button" onClick={() => onToggleSaved(course.id)} aria-label={t.saved}>
              {savedIds.has(course.id) ? <BookmarkCheck size={17} aria-hidden="true" /> : <Bookmark size={17} aria-hidden="true" />}
            </button>
          </div>
          <h3>{course.title[lang]}</h3>
          <p>{course.desc[lang]}</p>
          <div className="tag-list">
            {course.tags.slice(0, 4).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="course-card-meta">
            <span>{course.source}</span>
            <span>{course.weeks} {lang === "zh" ? "周" : "weeks"}</span>
          </div>
          <a className="button secondary full" href={course.url} target="_blank" rel="noreferrer">
            {t.openCourse}
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </article>
      ))}
    </div>
  );
}

function iconFor(discipline) {
  const match = disciplines.find((item) => item.id === discipline);
  if (!match) return <BookOpen size={18} aria-hidden="true" />;
  const Icon = match.icon;
  return <Icon size={18} aria-hidden="true" />;
}

createRoot(document.getElementById("root")).render(<App />);
