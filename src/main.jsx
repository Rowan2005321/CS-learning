import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Compass,
  Cpu,
  Database,
  Globe2,
  Layers3,
  Network,
  Search,
  Shield,
  Sparkles
} from "lucide-react";
import "./styles.css";

const copy = {
  zh: {
    switchLabel: "EN",
    eyebrow: "开源计算机科学学习地图",
    title: "Open CS Atlas",
    subtitle:
      "仿照 OSSU 的思路，把公开课程、教材和项目练习整理成可执行的 CS 学习路线。",
    search: "搜索课程、学校或主题",
    all: "全部",
    discipline: "学科",
    level: "难度",
    track: "路线",
    open: "直达课程",
    save: "收藏",
    saved: "已收藏",
    courses: "课程",
    links: "直达链接",
    projects: "项目关卡",
    results: "门课程匹配",
    roadmap: "学习路线",
    catalog: "课程目录",
    milestones: "项目里程碑",
    source: "课程优先选择大学公开视频、开放教材和长期维护的课程页。",
    noResults: "没有匹配课程，换一个关键词或筛选条件。",
    progress: "本地收藏",
    build: "验证命令：npm run build"
  },
  en: {
    switchLabel: "中文",
    eyebrow: "Open computer science learning map",
    title: "Open CS Atlas",
    subtitle:
      "An OSSU-inspired roadmap that turns open courses, textbooks, and projects into an actionable CS curriculum.",
    search: "Search courses, schools, or topics",
    all: "All",
    discipline: "Discipline",
    level: "Level",
    track: "Track",
    open: "Open course",
    save: "Save",
    saved: "Saved",
    courses: "Courses",
    links: "Direct links",
    projects: "Project gates",
    results: "matching courses",
    roadmap: "Roadmap",
    catalog: "Course Catalog",
    milestones: "Project Milestones",
    source: "Courses prioritize university videos, open textbooks, and maintained course pages.",
    noResults: "No courses match. Try another keyword or filter.",
    progress: "Local saves",
    build: "Verified with: npm run build"
  }
};

const disciplines = [
  { id: "foundation", icon: Compass, zh: "基础入门", en: "Foundations" },
  { id: "math", icon: Layers3, zh: "数学基础", en: "Mathematics" },
  { id: "programming", icon: BookOpen, zh: "编程与语言", en: "Programming" },
  { id: "systems", icon: Cpu, zh: "系统", en: "Systems" },
  { id: "algorithms", icon: Network, zh: "算法", en: "Algorithms" },
  { id: "ai", icon: Sparkles, zh: "AI 与数据", en: "AI & Data" },
  { id: "security", icon: Shield, zh: "安全与工程", en: "Security & Engineering" }
];

const levels = [
  { id: "beginner", zh: "入门", en: "Beginner" },
  { id: "intermediate", zh: "进阶", en: "Intermediate" },
  { id: "advanced", zh: "高级", en: "Advanced" }
];

const tracks = [
  {
    id: "core",
    zh: "CS 核心",
    en: "CS Core",
    descZh: "从编程、数学、算法到系统，适合完整打底。",
    descEn: "Programming, math, algorithms, and systems for a complete base.",
    color: "blue"
  },
  {
    id: "systems",
    zh: "系统方向",
    en: "Systems",
    descZh: "面向 OS、网络、数据库和计算机结构。",
    descEn: "Operating systems, networks, databases, and architecture.",
    color: "green"
  },
  {
    id: "ai",
    zh: "AI / 数据",
    en: "AI / Data",
    descZh: "机器学习、深度学习、统计与数据系统。",
    descEn: "Machine learning, deep learning, statistics, and data systems.",
    color: "violet"
  },
  {
    id: "builder",
    zh: "工程实践",
    en: "Builder",
    descZh: "把课程知识落到项目、工具链和安全实践。",
    descEn: "Turn course knowledge into projects, tooling, and secure practice.",
    color: "coral"
  }
];

const courses = [
  ["cs50", "foundation", "beginner", "core", "Harvard", "CS50x", "CS50x 计算机科学导论", "CS50x Introduction to Computer Science", "C, Python, Web", "C, Python, web", "https://cs50.harvard.edu/x/"],
  ["mit60001", "foundation", "beginner", "core", "MIT", "6.0001", "Python 编程与计算思维", "Introduction to CS and Programming in Python", "Python, problem solving", "Python, problem solving", "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/"],
  ["cs61a", "programming", "intermediate", "core", "UC Berkeley", "CS 61A", "程序构造与抽象", "Structure and Interpretation of Computer Programs", "Scheme, Python, abstraction", "Scheme, Python, abstraction", "https://cs61a.org/"],
  ["nand2tetris", "systems", "beginner", "systems", "Hebrew University", "Nand2Tetris", "从与门到俄罗斯方块", "From Nand to Tetris", "hardware, compiler, VM", "hardware, compiler, VM", "https://www.nand2tetris.org/"],
  ["mit6042", "math", "intermediate", "core", "MIT", "6.042J", "计算机科学数学", "Mathematics for Computer Science", "proof, graph, probability", "proofs, graphs, probability", "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/"],
  ["linear", "math", "beginner", "ai", "MIT", "18.06", "线性代数", "Linear Algebra", "matrix, vector space", "matrices, vector spaces", "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/"],
  ["stat110", "math", "intermediate", "ai", "Harvard", "Stat 110", "概率论", "Probability", "random variables, inference", "random variables, inference", "https://projects.iq.harvard.edu/stat110/home"],
  ["princeton-algs", "algorithms", "intermediate", "core", "Princeton", "Algorithms I/II", "算法 I/II", "Algorithms I/II", "sorting, graph, strings", "sorting, graphs, strings", "https://algs4.cs.princeton.edu/home/"],
  ["mit6006", "algorithms", "intermediate", "core", "MIT", "6.006", "算法导论", "Introduction to Algorithms", "data structures, dynamic programming", "data structures, dynamic programming", "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/"],
  ["cs61b", "programming", "intermediate", "core", "UC Berkeley", "CS 61B", "数据结构", "Data Structures", "Java, testing, data structures", "Java, testing, data structures", "https://sp24.datastructur.es/"],
  ["ostep", "systems", "intermediate", "systems", "OSTEP", "OSTEP", "操作系统：三件简单的事", "Operating Systems: Three Easy Pieces", "process, memory, file system", "processes, memory, file systems", "https://pages.cs.wisc.edu/~remzi/OSTEP/"],
  ["cs144", "systems", "advanced", "systems", "Stanford", "CS144", "计算机网络", "Computer Networking", "TCP/IP, routing, transport", "TCP/IP, routing, transport", "https://cs144.github.io/"],
  ["cmu213", "systems", "advanced", "systems", "CMU", "15-213", "计算机系统导论", "Introduction to Computer Systems", "C, memory, linking", "C, memory, linking", "https://www.cs.cmu.edu/~213/"],
  ["db15445", "systems", "advanced", "systems", "CMU", "15-445", "数据库系统", "Database Systems", "query, storage, transactions", "queries, storage, transactions", "https://15445.courses.cs.cmu.edu/"],
  ["ml", "ai", "intermediate", "ai", "Stanford / DeepLearning.AI", "Machine Learning", "机器学习", "Machine Learning", "supervised, unsupervised, neural nets", "supervised, unsupervised, neural nets", "https://www.coursera.org/specializations/machine-learning-introduction"],
  ["cs229", "ai", "advanced", "ai", "Stanford", "CS229", "机器学习", "Machine Learning", "optimization, generative models", "optimization, generative models", "https://cs229.stanford.edu/"],
  ["cs231n", "ai", "advanced", "ai", "Stanford", "CS231n", "视觉识别深度学习", "Deep Learning for Computer Vision", "CNN, vision, representation", "CNNs, vision, representation", "https://cs231n.stanford.edu/"],
  ["missing", "security", "beginner", "builder", "MIT", "Missing Semester", "计算机教育缺失的一课", "The Missing Semester", "shell, git, debugging", "shell, git, debugging", "https://missing.csail.mit.edu/"],
  ["se", "security", "intermediate", "builder", "UC Berkeley", "CS169", "软件工程", "Software Engineering", "Rails, testing, SaaS", "Rails, testing, SaaS", "https://saasbook.info/"],
  ["security", "security", "advanced", "builder", "Stanford", "CS155", "计算机与网络安全", "Computer and Network Security", "web, crypto, systems security", "web, crypto, systems security", "https://cs155.stanford.edu/"]
].map(([id, discipline, level, track, school, code, zh, en, tagsZh, tagsEn, url]) => ({
  id,
  discipline,
  level,
  track,
  school,
  code,
  title: { zh, en },
  tags: { zh: tagsZh, en: tagsEn },
  url
}));

const projects = [
  {
    zh: "写一个命令行工具，覆盖参数解析、文件 IO、测试和 README。",
    en: "Build a CLI with argument parsing, file IO, tests, and a README."
  },
  {
    zh: "实现一个小型解释器或虚拟机，连接编程语言与系统知识。",
    en: "Implement a small interpreter or VM to connect PL and systems ideas."
  },
  {
    zh: "完成一个网络服务：数据库、认证、缓存、日志和部署。",
    en: "Ship a network service with database, auth, caching, logging, and deploy."
  },
  {
    zh: "复现一篇 ML 课程作业或论文实验，写清数据、指标和误差分析。",
    en: "Reproduce an ML assignment or paper experiment with metrics and error analysis."
  }
];

function AtlasVisual() {
  return (
    <svg className="atlas" viewBox="0 0 460 340" role="img" aria-label="Open CS Atlas map">
      <defs>
        <linearGradient id="line" x1="0" x2="1">
          <stop offset="0" stopColor="#2b7fff" />
          <stop offset="1" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      <path d="M70 170 C130 52 250 58 318 132 S382 264 242 284 S32 252 70 170Z" fill="#f8fbff" stroke="#d8e4f0" />
      <path d="M120 112 L224 78 L338 142 L288 244 L148 250 Z" fill="none" stroke="url(#line)" strokeWidth="5" strokeLinecap="round" />
      {[
        [120, 112, "CS"],
        [224, 78, "MATH"],
        [338, 142, "SYS"],
        [288, 244, "AI"],
        [148, 250, "ENG"]
      ].map(([x, y, label]) => (
        <g key={label}>
          <circle cx={x} cy={y} r="32" fill="#fff" stroke="#b8c7d8" strokeWidth="2" />
          <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill="#132033">{label}</text>
        </g>
      ))}
      <circle cx="78" cy="242" r="6" fill="#f97316" />
      <circle cx="382" cy="88" r="7" fill="#7c3aed" />
      <circle cx="392" cy="250" r="5" fill="#14b8a6" />
    </svg>
  );
}

function App() {
  const [lang, setLang] = useState("zh");
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState("all");
  const [level, setLevel] = useState("all");
  const [track, setTrack] = useState("all");
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem("atlas-saved") || "[]"));
  const t = copy[lang];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((course) => {
      const haystack = [course.school, course.code, course.title.zh, course.title.en, course.tags.zh, course.tags.en]
        .join(" ")
        .toLowerCase();
      return (
        (!q || haystack.includes(q)) &&
        (discipline === "all" || course.discipline === discipline) &&
        (level === "all" || course.level === level) &&
        (track === "all" || course.track === track)
      );
    });
  }, [query, discipline, level, track]);

  const toggleSave = (id) => {
    const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id];
    setSaved(next);
    localStorage.setItem("atlas-saved", JSON.stringify(next));
  };

  const label = (list, id) => list.find((item) => item.id === id)?.[lang] || id;

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Open CS Atlas">
          <Globe2 size={22} />
          <span>Open CS Atlas</span>
        </a>
        <nav>
          <a href="#roadmap">{t.roadmap}</a>
          <a href="#catalog">{t.catalog}</a>
          <a href="#milestones">{t.milestones}</a>
        </nav>
        <button className="iconText" onClick={() => setLang(lang === "zh" ? "en" : "zh")}>
          <Globe2 size={17} />
          {t.switchLabel}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="heroText">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="lede">{t.subtitle}</p>
            <div className="searchbar">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} />
            </div>
            <div className="stats" aria-label="Site stats">
              <span><strong>{courses.length}</strong>{t.courses}</span>
              <span><strong>{courses.length}</strong>{t.links}</span>
              <span><strong>{projects.length}</strong>{t.projects}</span>
              <span><strong>{saved.length}</strong>{t.progress}</span>
            </div>
          </div>
          <AtlasVisual />
        </section>

        <section id="roadmap" className="band">
          <div className="sectionHead">
            <p className="eyebrow">{t.roadmap}</p>
            <h2>{lang === "zh" ? "按目标选择路线" : "Choose by learning goal"}</h2>
          </div>
          <div className="trackGrid">
            {tracks.map((item) => (
              <button className={`trackCard ${item.color} ${track === item.id ? "active" : ""}`} key={item.id} onClick={() => setTrack(track === item.id ? "all" : item.id)}>
                <span>{item[lang]}</span>
                <small>{lang === "zh" ? item.descZh : item.descEn}</small>
              </button>
            ))}
          </div>
        </section>

        <section id="catalog" className="catalog">
          <div className="sectionHead">
            <p className="eyebrow">{t.catalog}</p>
            <h2>{filtered.length} {t.results}</h2>
          </div>
          <div className="filters">
            <Select label={t.discipline} value={discipline} onChange={setDiscipline} options={disciplines} lang={lang} all={t.all} />
            <Select label={t.level} value={level} onChange={setLevel} options={levels} lang={lang} all={t.all} />
            <Select label={t.track} value={track} onChange={setTrack} options={tracks} lang={lang} all={t.all} />
          </div>
          <div className="courseGrid">
            {filtered.map((course) => {
              const Icon = disciplines.find((item) => item.id === course.discipline)?.icon || BookOpen;
              const isSaved = saved.includes(course.id);
              return (
                <article className="courseCard" key={course.id}>
                  <div className="courseTop">
                    <span className="courseIcon"><Icon size={18} /></span>
                    <span className="badge">{label(disciplines, course.discipline)}</span>
                    <span className="badge muted">{label(levels, course.level)}</span>
                  </div>
                  <h3>{course.title[lang]}</h3>
                  <p>{course.school} · {course.code}</p>
                  <p className="tags">{course.tags[lang]}</p>
                  <div className="actions">
                    <button onClick={() => toggleSave(course.id)}>
                      {isSaved ? <Check size={16} /> : <BookOpen size={16} />}
                      {isSaved ? t.saved : t.save}
                    </button>
                    <a href={course.url} target="_blank" rel="noreferrer">
                      {t.open}
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          {filtered.length === 0 && <p className="empty">{t.noResults}</p>}
        </section>

        <section id="milestones" className="band milestones">
          <div className="sectionHead">
            <p className="eyebrow">{t.milestones}</p>
            <h2>{lang === "zh" ? "用项目把知识串起来" : "Tie the knowledge together with projects"}</h2>
          </div>
          <ol>
            {projects.map((project, index) => (
              <li key={project.en}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{project[lang]}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer>
        <Database size={18} />
        <span>{t.source}</span>
        <span>{t.build}</span>
      </footer>
    </>
  );
}

function Select({ label: selectLabel, value, onChange, options, lang, all }) {
  return (
    <label>
      <span>{selectLabel}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="all">{all}</option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>{option[lang]}</option>
        ))}
      </select>
    </label>
  );
}

createRoot(document.getElementById("root")).render(<App />);
