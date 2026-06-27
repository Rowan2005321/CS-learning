import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Bookmark,
  Brain,
  CheckCircle2,
  Code2,
  Compass,
  Database,
  ExternalLink,
  Globe2,
  Languages,
  List,
  Lock,
  Map,
  Play,
  Search,
  Shield,
  Sigma,
  TerminalSquare,
  Wrench
} from "lucide-react";
import "./styles.css";

const labels = {
  en: {
    nav: ["Roadmap", "Courses", "Tracks", "Projects", "Sources"],
    title: "Build a real computer science foundation from open courses",
    subtitle: "A curated map across programming, math, systems, theory, AI, security, data, and software engineering.",
    start: "Start the roadmap",
    browse: "Browse courses",
    pace: "Learn at your pace",
    paceDesc: "Self-study with open courses from top universities.",
    structured: "Structured roadmap",
    structuredDesc: "A coherent path with prerequisites and milestones.",
    links: "Course direct links",
    linksDesc: "Every course opens the official source in one click.",
    path: "Your learning path",
    full: "View full roadmap",
    progress: "Overall progress",
    resume: "Resume where you left off",
    courses: "Browse courses",
    search: "Search courses...",
    discipline: "Discipline",
    allDisciplines: "All disciplines",
    level: "Level",
    allLevels: "All levels",
    source: "Source",
    time: "Est. time",
    track: "Track",
    added: "Added",
    action: "Action",
    list: "List",
    grid: "Grid",
    map: "Discipline map",
    projects: "Project milestones",
    completed: "Completed",
    active: "In progress",
    locked: "Locked",
    sources: "Our sources",
    transparency: "Transparency",
    openGithub: "Open View on GitHub",
    footer: "Open CS Atlas is open source.",
    noResults: "No courses match the current filters.",
    lang: "English",
    switchLang: "中文",
    levels: { intro: "Intro", foundation: "Foundational", intermediate: "Intermediate", advanced: "Advanced" },
    disciplines: {
      programming: "Programming",
      math: "Math",
      systems: "Systems",
      theory: "Theory",
      ai: "AI",
      data: "Data",
      security: "Security",
      engineering: "Software Engineering"
    }
  },
  zh: {
    nav: ["路线图", "课程", "方向", "项目", "来源"],
    title: "用开源课程建立真正扎实的计算机科学基础",
    subtitle: "覆盖编程、数学、系统、理论、人工智能、安全、数据与软件工程的自学地图。",
    start: "开始路线图",
    browse: "浏览课程",
    pace: "按自己的节奏学习",
    paceDesc: "用大学公开课和开放教材自学。",
    structured: "结构化路线",
    structuredDesc: "按前置知识、学科和里程碑组织。",
    links: "课程直达链接",
    linksDesc: "每门课都能一键打开官方来源。",
    path: "你的学习路径",
    full: "查看完整路线",
    progress: "总体进度",
    resume: "继续上次进度",
    courses: "浏览课程",
    search: "搜索课程...",
    discipline: "学科",
    allDisciplines: "全部学科",
    level: "难度",
    allLevels: "全部难度",
    source: "来源",
    time: "预计时长",
    track: "路线",
    added: "已加入",
    action: "操作",
    list: "列表",
    grid: "网格",
    map: "学科地图",
    projects: "项目里程碑",
    completed: "已完成",
    active: "进行中",
    locked: "待解锁",
    sources: "课程来源",
    transparency: "透明说明",
    openGithub: "在 GitHub 查看",
    footer: "Open CS Atlas 是开源学习地图。",
    noResults: "当前筛选没有匹配课程。",
    lang: "中文",
    switchLang: "EN",
    levels: { intro: "入门", foundation: "基础", intermediate: "进阶", advanced: "高级" },
    disciplines: {
      programming: "编程",
      math: "数学",
      systems: "系统",
      theory: "理论",
      ai: "人工智能",
      data: "数据",
      security: "安全",
      engineering: "软件工程"
    }
  }
};

const icons = {
  programming: Code2,
  math: Sigma,
  systems: TerminalSquare,
  theory: Brain,
  ai: Brain,
  data: Database,
  security: Shield,
  engineering: Wrench
};

const stages = [
  ["programming", "Foundations", "0-4"],
  ["programming", "Programming", "4-8"],
  ["math", "Math", "8-16"],
  ["systems", "Systems", "16-24"],
  ["theory", "Theory", "24-32"],
  ["data", "Data", "32-40"],
  ["security", "Security", "40-48"],
  ["engineering", "Engineering", "48+"]
];

const courses = [
  ["cs50", "programming", "intro", "MIT OpenCourseWare", "CS50x: Introduction to Computer Science", "CS50x：计算机科学导论", "Programming basics with C, Python, SQL, and web.", "C、Python、SQL 和 Web 基础。", "8 weeks", "core", "https://cs50.harvard.edu/x/", ["programming", "python"]],
  ["ucsd-dsa", "programming", "foundation", "UC San Diego", "Data Structures and Algorithms", "数据结构与算法", "Core data structures and algorithm design.", "核心数据结构和算法设计。", "10 weeks", "core", "https://www.coursera.org/specializations/data-structures-algorithms", ["algorithms", "data-structures"]],
  ["discrete", "math", "foundation", "MIT OpenCourseWare", "Mathematics for Computer Science", "计算机科学数学", "Logic, proofs, sets, relations, and combinatorics.", "逻辑、证明、集合、关系和组合数学。", "12 weeks", "core", "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/", ["math", "discrete"]],
  ["systems", "systems", "intermediate", "CMU", "Computer Organization and Systems", "计算机系统导论", "From gates to CPU, memory, linking, and processes.", "从门电路到 CPU、内存、链接和进程。", "12 weeks", "systems", "https://www.cs.cmu.edu/~213/", ["systems", "architecture"]],
  ["ostep", "systems", "intermediate", "OSTEP", "Operating Systems: Three Easy Pieces", "操作系统：三个简单部分", "Processes, memory, concurrency, and file systems.", "进程、内存、并发和文件系统。", "10 weeks", "systems", "https://pages.cs.wisc.edu/~remzi/OSTEP/", ["os", "concurrency"]],
  ["ml", "ai", "intermediate", "Stanford", "Introduction to Machine Learning", "机器学习导论", "Supervised learning, models, and evaluation.", "监督学习、模型和评估。", "10 weeks", "ai", "https://cs229.stanford.edu/", ["ai", "machine-learning"]],
  ["db", "data", "intermediate", "CMU", "Database Systems", "数据库系统", "Storage, indexing, query processing, and transactions.", "存储、索引、查询处理和事务。", "12 weeks", "data", "https://15445.courses.cs.cmu.edu/", ["database", "sql"]],
  ["security", "security", "foundation", "PortSwigger", "Web Security Academy", "Web 安全学院", "Hands-on labs for modern web security.", "现代 Web 安全实战实验。", "8 weeks", "security", "https://portswigger.net/web-security", ["security", "web"]],
  ["engineering", "engineering", "intermediate", "Full Stack Open", "Full Stack Open", "全栈开放课程", "React, Node.js, testing, GraphQL, and CI/CD.", "React、Node.js、测试、GraphQL 和 CI/CD。", "12 weeks", "software", "https://fullstackopen.com/en/", ["software", "web"]]
];

const projects = [
  ["Hello World", "Write your first program and use Git.", "写第一个程序并使用 Git。", "completed"],
  ["Data Structures", "Implement core data structures.", "实现核心数据结构。", "completed"],
  ["Web Application", "Build a full-stack web application.", "构建一个全栈 Web 应用。", "active"],
  ["Systems Program", "Build a small shell or systems tool.", "构建小型 shell 或系统工具。", "locked"],
  ["ML Pipeline", "Train and evaluate a model.", "训练并评估一个模型。", "locked"],
  ["Capstone", "Solve a real-world problem end-to-end.", "端到端解决真实问题。", "locked"]
];

const sources = ["MIT", "Stanford", "UC San Diego", "Carnegie Mellon", "Harvard", "Saylor.org"];

function getStored(key, fallback) {
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function HeroMap() {
  const pins = [
    [150, 154, "DB", "teal"],
    [285, 100, "</>", "dark"],
    [324, 248, "SW", "teal"],
    [494, 133, "M", "amber"],
    [410, 218, "OS", "violet"],
    [615, 263, "SEC", "blue"],
    [735, 151, "AI", "green"]
  ];
  return (
    <div className="hero-visual" aria-hidden="true">
      <svg viewBox="0 0 980 430" className="atlas-map" focusable="false">
        <defs>
          <linearGradient id="water" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#e8f5f6" />
            <stop offset="100%" stopColor="#bddfe4" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#0f172a" floodOpacity=".18" />
          </filter>
        </defs>
        <g transform="rotate(-2 500 214)" filter="url(#softShadow)">
          <polygon className="paper" points="42,28 940,2 970,350 64,396" />
          <polygon className="water" points="62,50 916,24 948,332 88,374" />
          <path className="grid" d="M140 42 154 370M232 39 244 365M324 36 336 360M416 33 426 356M508 31 517 352M600 28 607 348M692 26 698 344M784 24 788 340M876 21 879 336M66 98 923 71M70 146 928 119M74 194 933 167M78 242 938 216M83 290 943 265M87 338 948 315" />
          <path className="land" d="M116 132c34-44 86-52 132-30 30 14 49 7 85 3 49-6 72 20 92 52-30 17-72 12-105 5-45-10-80 2-116 24-48 29-99 11-88-54z" />
          <path className="land" d="M254 232c58-23 122-12 159 28 28 30 69 40 104 26 27-11 47 4 61 26-40 31-117 34-174 8-41-19-71-48-121-37-34 7-60-16-29-51z" />
          <path className="land" d="M474 88c72-37 160-36 228 1 57 31 111 21 166 7 44-11 66 15 54 45-62 20-145 10-205 23-87 18-161-6-243-76z" />
          <path className="land" d="M628 186c32-25 91-22 124 3 31 24 71 28 112 23 33-4 55 15 43 44-55 19-127 8-175-16-32-16-71-12-100 9-30 21-56-26-4-63z" />
        </g>
        <path className="route" d="M146 170 C210 105 292 118 354 166 S453 241 542 171 S693 95 748 162 S814 248 874 230" />
        {[205, 348, 560, 674, 804].map((x, i) => <circle className="route-dot" cx={x} cy={[146, 166, 154, 208, 212][i]} r="9" key={x} />)}
        {pins.map(([x, y, label, tone]) => (
          <g className="pin" transform={`translate(${x} ${y})`} key={label}>
            <circle className="pin-rim" r="37" />
            <circle className={`pin-core ${tone}`} r="30" />
            <text textAnchor="middle" dominantBaseline="central">{label}</text>
          </g>
        ))}
        <g className="compass-rose" transform="translate(790 245)">
          <circle cx="76" cy="76" r="70" />
          <circle className="face" cx="76" cy="76" r="56" />
          <path className="needle north" d="M76 18 95 77 76 66 57 77Z" />
          <path className="needle south" d="M76 134 95 77 76 88 57 77Z" />
          <circle className="pivot" cx="76" cy="76" r="10" />
        </g>
      </svg>
    </div>
  );
}

function Header({ lang, setLang, t }) {
  return (
    <header className="site-header">
      <a className="brand" href="#roadmap">
        <Compass size={25} />
        <span>Open CS Atlas</span>
      </a>
      <nav>
        {t.nav.map((item, index) => (
          <a key={item} href={["#roadmap", "#courses", "#tracks", "#projects", "#sources"][index]}>{item}</a>
        ))}
      </nav>
      <button className="lang-switch" onClick={() => setLang(lang === "zh" ? "en" : "zh")}>
        <Languages size={16} />
        {t.lang} / {t.switchLang}
      </button>
    </header>
  );
}

function App() {
  const [lang, setLang] = useState(() => getStored("open-cs-atlas-lang", "zh"));
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState("all");
  const [level, setLevel] = useState("all");
  const [saved, setSaved] = useState(() => new Set((getStored("open-cs-atlas-saved", "") || "").split(",").filter(Boolean)));
  const t = labels[lang];
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return courses.filter((course) => {
      const haystack = course.join(" ").toLowerCase();
      return (!needle || haystack.includes(needle)) &&
        (discipline === "all" || course[1] === discipline) &&
        (level === "all" || course[2] === level);
    });
  }, [query, discipline, level]);

  function switchLang(next) {
    setLang(next);
    window.localStorage.setItem("open-cs-atlas-lang", next);
  }

  function toggleSaved(id) {
    const next = new Set(saved);
    next.has(id) ? next.delete(id) : next.add(id);
    setSaved(next);
    window.localStorage.setItem("open-cs-atlas-saved", Array.from(next).join(","));
  }

  const progress = Math.round((2 / projects.length) * 100);

  return (
    <div className="app-shell">
      <Header lang={lang} setLang={switchLang} t={t} />
      <main>
        <section className="hero-section" id="roadmap">
          <div className="hero-copy">
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
            <div className="hero-actions">
              <a className="button primary" href="#path">{t.start}<ArrowRight size={16} /></a>
              <a className="button secondary" href="#courses">{t.browse}</a>
            </div>
            <div className="proof-row">
              <Feature icon={Compass} title={t.pace} desc={t.paceDesc} />
              <Feature icon={Map} title={t.structured} desc={t.structuredDesc} />
              <Feature icon={ExternalLink} title={t.links} desc={t.linksDesc} />
            </div>
          </div>
          <HeroMap />
        </section>

        <section className="path-section" id="path">
          <div className="section-heading compact">
            <div>
              <h2>{t.path}</h2>
              <a href="#tracks">{t.full}<ArrowRight size={14} /></a>
            </div>
            <div className="progress-panel">
              <span>{t.progress}</span>
              <strong>{progress}%</strong>
              <div className="progress-track"><div style={{ width: `${progress}%` }} /></div>
              <a className="small-button" href="#projects"><Play size={14} />{t.resume}</a>
            </div>
          </div>
          <div className="roadmap-strip">
            {stages.map(([id, title, weeks], index) => {
              const Icon = icons[id] || Code2;
              return (
                <button className="roadmap-node" key={`${id}-${title}`} onClick={() => setDiscipline(id)}>
                  <span>{index + 1}</span>
                  <Icon size={23} />
                  <strong>{lang === "zh" ? t.disciplines[id] : title}</strong>
                  <small>{weeks} {lang === "zh" ? "周" : "weeks"}</small>
                </button>
              );
            })}
          </div>
        </section>

        <section className="courses-section" id="courses">
          <aside className="filters-panel">
            <div className="search-box"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.search} /></div>
            <label>{t.discipline}<select value={discipline} onChange={(e) => setDiscipline(e.target.value)}>
              <option value="all">{t.allDisciplines}</option>
              {Object.keys(t.disciplines).map((id) => <option key={id} value={id}>{t.disciplines[id]}</option>)}
            </select></label>
            <label>{t.level}<select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="all">{t.allLevels}</option>
              {Object.entries(t.levels).map(([id, text]) => <option key={id} value={id}>{text}</option>)}
            </select></label>
          </aside>
          <div className="courses-main">
            <div className="section-heading">
              <div><h2>{t.courses}</h2><p>{filtered.length} {lang === "zh" ? "门课程" : "courses"}</p></div>
              <div className="view-toggle"><button className="is-active"><List size={15} />{t.list}</button><button>{t.grid}</button></div>
            </div>
            {filtered.length ? <CourseTable rows={filtered} lang={lang} t={t} saved={saved} onSave={toggleSaved} /> : <p className="empty-state">{t.noResults}</p>}
          </div>
        </section>

        <section className="discipline-section" id="tracks">
          <div className="section-heading"><h2>{t.map}</h2></div>
          <div className="discipline-grid">
            {Object.entries(t.disciplines).map(([id, text]) => {
              const Icon = icons[id] || Code2;
              return <button className="discipline-tile" key={id} onClick={() => setDiscipline(id)}><Icon size={24} /><strong>{text}</strong></button>;
            })}
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading"><h2>{t.projects}</h2></div>
          <div className="project-strip">
            {projects.map(([title, en, zh, status], index) => (
              <button className={`project-card ${status}`} key={title} disabled={status === "locked"}>
                <span>{index + 1}</span><strong>{title}</strong><p>{lang === "zh" ? zh : en}</p>
                {status === "locked" ? <Lock size={17} /> : <CheckCircle2 size={17} />}
              </button>
            ))}
          </div>
        </section>

        <section className="sources-section" id="sources">
          <div><h2>{t.sources}</h2><p>{lang === "zh" ? "优先选择高质量、开放、可长期访问的课程来源。" : "High-quality, open, durable course sources are prioritized."}</p></div>
          <div className="source-links">{sources.map((s) => <span key={s}>{s}</span>)}</div>
          <div className="transparency-panel"><Globe2 size={24} /><div><h3>{t.transparency}</h3><p>{t.footer}</p></div></div>
        </section>
      </main>
      <footer className="site-footer"><span>Open CS Atlas</span><a href="https://github.com/Rowan2005321/CS-learning" target="_blank" rel="noreferrer">{t.openGithub}<ExternalLink size={14} /></a></footer>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return <div className="feature"><Icon size={22} /><div><strong>{title}</strong><span>{desc}</span></div></div>;
}

function CourseTable({ rows, lang, t, saved, onSave }) {
  return (
    <div className="course-table-wrap">
      <table className="course-table">
        <thead><tr><th>{lang === "zh" ? "课程" : "Course"}</th><th>{t.source}</th><th>{t.level}</th><th>{t.time}</th><th>{t.track}</th><th>{t.added}</th><th>{t.action}</th></tr></thead>
        <tbody>
          {rows.map((row) => {
            const [id, disc, level, source, enTitle, zhTitle, enDesc, zhDesc, weeks, track, url, tags] = row;
            const Icon = icons[disc] || Code2;
            return (
              <tr key={id}>
                <td><div className="course-name"><span><Icon size={18} /></span><div><strong>{lang === "zh" ? zhTitle : enTitle}</strong><p>{lang === "zh" ? zhDesc : enDesc}</p></div></div></td>
                <td><a href={url} target="_blank" rel="noreferrer">{source}<ExternalLink size={13} /></a></td>
                <td>{t.levels[level]}</td>
                <td>{weeks}</td>
                <td>{track}</td>
                <td>{saved.has(id) ? <CheckCircle2 size={17} /> : null}</td>
                <td><button onClick={() => onSave(id)}><Bookmark size={16} /></button><a className="open-link" href={url} target="_blank" rel="noreferrer">{tags[0]}<ExternalLink size={13} /></a></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
