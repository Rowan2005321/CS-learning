export const advancedSpecialtyCourses = [
  {
    id: "stanford-cs324-large-language-models",
    discipline: "large-language-models",
    level: "advanced",
    tracks: ["llm-systems-rag-evaluation", "ai-data", "agent-engineering"],
    provider: "Stanford",
    university: "Stanford University",
    code: "CS324",
    title: {
      en: "CS324: Large Language Models",
      zh: "Stanford CS324：大语言模型"
    },
    description: {
      en: "A broad Stanford course covering capabilities, training, data, security, harms, law, and deployment questions around large language models.",
      zh: "Stanford 的大语言模型课程，覆盖能力、训练、数据、安全、风险、法律和部署等核心问题。"
    },
    audience: {
      en: "Learners who want a rigorous conceptual foundation before building LLM systems or RAG applications.",
      zh: "适合在做 LLM 系统、RAG 或 Agent 之前，先补齐大语言模型整体框架的人。"
    },
    outcomes: {
      en: "Understand the LLM lifecycle, evaluation concerns, data issues, misuse risks, and deployment tradeoffs.",
      zh: "能够理解 LLM 生命周期、评测问题、数据问题、滥用风险和部署取舍。"
    },
    prerequisites: {
      en: "Machine learning, NLP basics, Python, and research-paper reading.",
      zh: "机器学习、NLP 基础、Python，以及阅读论文的能力。"
    },
    language: "English",
    weeks: 10,
    hoursPerWeek: 7,
    estimatedHours: 70,
    durationNote: "Stanford winter course with public syllabus and materials.",
    access: "Public course website",
    isFree: true,
    officialUrl: "https://stanford-cs324.github.io/winter2022/",
    sourceType: "official-course-site",
    priority: "P0",
    commonPitfallsZh:
      "不要直接跳到 RAG 框架 API。先理解模型能力边界、训练数据、评测和安全问题，后面的系统设计才不会只停在调用接口。",
    bridgeMaterialsZh: "建议先学 CS229、CS224N 或 MIT 6.S191。",
    outputTaskZh: "写一份 LLM 应用风险评估表，覆盖数据、评测、幻觉、安全、隐私和上线监控。",
    lastChecked: "2026-06-27",
    tags: ["llm", "evaluation", "safety", "deployment", "nlp", "systems"]
  },
  {
    id: "fullstackdeeplearning-llm-bootcamp",
    discipline: "ai-engineering",
    level: "intermediate",
    tracks: ["llm-systems-rag-evaluation", "agent-engineering", "software-engineering"],
    provider: "Full Stack Deep Learning",
    university: "Independent open course",
    code: "LLM Bootcamp",
    title: {
      en: "Full Stack Deep Learning LLM Bootcamp",
      zh: "Full Stack Deep Learning：LLM Bootcamp"
    },
    description: {
      en: "A practical bootcamp on building, deploying, evaluating, and improving LLM applications.",
      zh: "面向实践的 LLM 应用训练营，关注构建、部署、评测和改进 LLM 应用。"
    },
    audience: {
      en: "Software engineers moving from prototypes to production LLM applications.",
      zh: "适合从 LLM demo 走向可部署应用的软件工程学习者。"
    },
    outcomes: {
      en: "Design LLM application architecture, add retrieval, evaluate outputs, and prepare a production-minded demo.",
      zh: "能够设计 LLM 应用架构、加入检索、评测输出，并做出更接近生产形态的 demo。"
    },
    prerequisites: {
      en: "Python, APIs, basic ML, and web application fundamentals.",
      zh: "Python、API、基础机器学习和 Web 应用基础。"
    },
    language: "English",
    weeks: 4,
    hoursPerWeek: 8,
    estimatedHours: 32,
    durationNote: "Bootcamp-style open course; useful as a practical bridge.",
    access: "Public course website",
    isFree: true,
    officialUrl: "https://fullstackdeeplearning.com/llm-bootcamp/",
    sourceType: "open-source-course",
    priority: "P0",
    commonPitfallsZh:
      "不要只看演示代码。重点是把 prompt、检索、评测、部署和监控连成一个可迭代系统。",
    bridgeMaterialsZh: "建议搭配 CS324 或 CS336，补足原理层理解。",
    outputTaskZh: "做一个带 RAG、评测集、错误分析和部署说明的 LLM 应用。",
    lastChecked: "2026-06-27",
    tags: ["llmops", "rag", "evaluation", "deployment", "full-stack", "mlops"]
  },
  {
    id: "deeplearning-ai-building-evaluating-advanced-rag",
    discipline: "ai-engineering",
    level: "intermediate",
    tracks: ["llm-systems-rag-evaluation", "agent-engineering"],
    provider: "DeepLearning.AI",
    university: "Non-university practical supplement",
    code: "Advanced RAG",
    title: {
      en: "Building and Evaluating Advanced RAG",
      zh: "DeepLearning.AI：构建与评估高级 RAG"
    },
    description: {
      en: "A short applied course focused on advanced retrieval-augmented generation patterns and evaluation loops.",
      zh: "短实践课，聚焦高级 RAG 模式、检索增强生成和评测闭环。"
    },
    audience: {
      en: "Builders who already know basic RAG and want to improve retrieval quality and evaluation discipline.",
      zh: "适合已经会基础 RAG，想提升检索质量和评测规范的人。"
    },
    outcomes: {
      en: "Improve RAG pipelines with better retrieval, query handling, evaluation, and error analysis.",
      zh: "能够通过更好的检索、查询处理、评测和错误分析改进 RAG 管线。"
    },
    prerequisites: {
      en: "Python, embeddings, vector search, and basic RAG.",
      zh: "Python、embedding、向量检索和基础 RAG。"
    },
    language: "English",
    weeks: 1,
    hoursPerWeek: 3,
    estimatedHours: 3,
    durationNote: "Short practical course; use as a supplement, not a full university course.",
    access: "Free enrollment with platform account",
    isFree: "partial",
    officialUrl: "https://www.deeplearning.ai/courses/building-evaluating-advanced-rag",
    sourceType: "practical-short-course",
    priority: "P1",
    commonPitfallsZh: "不要把 RAG 评测只理解成看几个样例回答。要建立固定测试集、指标和错误分类。",
    bridgeMaterialsZh: "建议先完成一个基础 RAG demo，再学习这门课。",
    outputTaskZh: "为一个 RAG 应用建立 20 条测试问题、检索命中分析和失败案例表。",
    lastChecked: "2026-06-27",
    tags: ["rag", "retrieval", "evaluation", "embeddings", "vector-search"]
  },
  {
    id: "deeplearning-ai-llmops",
    discipline: "ai-engineering",
    level: "intermediate",
    tracks: ["llm-systems-rag-evaluation", "software-engineering"],
    provider: "DeepLearning.AI",
    university: "Non-university practical supplement",
    code: "LLMOps",
    title: {
      en: "LLMOps",
      zh: "DeepLearning.AI：LLMOps"
    },
    description: {
      en: "A short course on operational workflows for LLM applications, including data, evaluation, and deployment thinking.",
      zh: "LLM 应用工程化短课，关注数据、评测、部署和上线后的运维思维。"
    },
    audience: {
      en: "Engineers who need to move LLM apps beyond notebooks and demos.",
      zh: "适合想把 LLM 应用从 notebook/demo 推向工程化交付的人。"
    },
    outcomes: {
      en: "Apply LLMOps thinking to dataset management, evaluation, iteration, and deployment workflows.",
      zh: "能够把 LLMOps 思维用于数据集管理、评测、迭代和部署流程。"
    },
    prerequisites: {
      en: "Python, APIs, ML basics, and basic software engineering.",
      zh: "Python、API、机器学习基础和基本软件工程能力。"
    },
    language: "English",
    weeks: 1,
    hoursPerWeek: 3,
    estimatedHours: 3,
    durationNote: "Short practical course.",
    access: "Free enrollment with platform account",
    isFree: "partial",
    officialUrl: "https://www.deeplearning.ai/courses/llmops",
    sourceType: "practical-short-course",
    priority: "P1",
    commonPitfallsZh: "不要等到上线前才考虑评测和监控。LLMOps 应该从第一个原型阶段就开始设计。",
    bridgeMaterialsZh: "建议搭配 Full Stack Deep Learning LLM Bootcamp。",
    outputTaskZh: "给一个 LLM 应用设计版本、数据集、评测和上线回滚流程。",
    lastChecked: "2026-06-27",
    tags: ["llmops", "deployment", "evaluation", "mlops", "monitoring"]
  },
  {
    id: "ragas-rag-evaluation",
    discipline: "ai-engineering",
    level: "intermediate",
    tracks: ["llm-systems-rag-evaluation"],
    provider: "Ragas",
    university: "Open-source framework",
    code: "Ragas Docs",
    title: {
      en: "Ragas: RAG Evaluation Framework",
      zh: "Ragas：RAG 评测框架"
    },
    description: {
      en: "Official documentation and examples for evaluating retrieval-augmented generation applications.",
      zh: "Ragas 官方文档和示例，用于评测 RAG 应用的检索和生成质量。"
    },
    audience: {
      en: "Builders who need measurable RAG quality instead of manual spot checks.",
      zh: "适合需要量化 RAG 质量，而不是只靠人工抽查的人。"
    },
    outcomes: {
      en: "Set up RAG evaluation metrics, datasets, and regression checks for retrieval and answer quality.",
      zh: "能够建立 RAG 指标、测试集和回归检查，用来评估检索质量和回答质量。"
    },
    prerequisites: {
      en: "Basic RAG, Python, and understanding of embeddings and retrieval.",
      zh: "基础 RAG、Python，以及对 embedding 和检索的理解。"
    },
    language: "English",
    weeks: 2,
    hoursPerWeek: 4,
    estimatedHours: 8,
    durationNote: "Framework documentation and tutorials; not a full course.",
    access: "Public official docs",
    isFree: true,
    officialUrl: "https://docs.ragas.io/",
    sourceType: "framework-docs",
    priority: "P1",
    commonPitfallsZh: "不要把工具指标当成绝对真理。指标要和业务场景、人工标注和错误分析一起使用。",
    bridgeMaterialsZh: "建议先完成一个 RAG demo，并准备真实或半真实问题集。",
    outputTaskZh: "为一个 RAG demo 加入 Ragas 评测脚本，并输出每轮迭代前后的指标变化。",
    lastChecked: "2026-06-27",
    tags: ["rag", "evaluation", "metrics", "testing", "regression"]
  },
  {
    id: "trail-of-bits-secure-contracts",
    discipline: "security",
    level: "advanced",
    tracks: ["solidity-security-auditing", "blockchain-web3"],
    provider: "Trail of Bits",
    university: "Security research organization",
    code: "Secure Contracts",
    title: {
      en: "Building Secure Contracts",
      zh: "Trail of Bits：构建安全智能合约"
    },
    description: {
      en: "A security-focused guide for Ethereum smart contract development, testing, threat modeling, and auditing.",
      zh: "面向 Ethereum 智能合约开发、测试、威胁建模和审计的安全指南。"
    },
    audience: {
      en: "Solidity developers and auditors who want professional security practices.",
      zh: "适合 Solidity 开发者和智能合约审计学习者建立专业安全实践。"
    },
    outcomes: {
      en: "Apply secure design, testing, static analysis, fuzzing, and review practices to Solidity contracts.",
      zh: "能够把安全设计、测试、静态分析、模糊测试和代码审查用于 Solidity 合约。"
    },
    prerequisites: {
      en: "Solidity basics, Ethereum basics, and software testing.",
      zh: "Solidity 基础、Ethereum 基础和软件测试基础。"
    },
    language: "English",
    weeks: 4,
    hoursPerWeek: 6,
    estimatedHours: 24,
    durationNote: "Professional security guide; use as a structured auditing reference.",
    access: "Public official guide",
    isFree: true,
    officialUrl: "https://secure-contracts.com/",
    sourceType: "official-docs",
    priority: "P0",
    commonPitfallsZh:
      "不要只背漏洞清单。真正的审计需要威胁建模、测试策略、工具链和人工 review 结合。",
    bridgeMaterialsZh: "建议先学 Stanford CS251 或至少完成 Solidity 基础项目。",
    outputTaskZh: "对一个 ERC20 或 DeFi 合约写威胁模型、测试计划和审计 checklist。",
    lastChecked: "2026-06-27",
    tags: ["solidity", "security", "auditing", "fuzzing", "static-analysis", "ethereum"]
  },
  {
    id: "smart-contract-security-field-guide",
    discipline: "security",
    level: "intermediate",
    tracks: ["solidity-security-auditing", "blockchain-web3"],
    provider: "Smart Contract Security Field Guide",
    university: "Open security guide",
    code: "SCSFG",
    title: {
      en: "Smart Contract Security Field Guide",
      zh: "智能合约安全现场指南"
    },
    description: {
      en: "A practical field guide for smart contract vulnerabilities, security patterns, and audit preparation.",
      zh: "面向智能合约漏洞、安全模式和审计准备的实用指南。"
    },
    audience: {
      en: "Developers who need a compact reference while reviewing Solidity contracts.",
      zh: "适合在审查 Solidity 合约时需要高密度安全参考的人。"
    },
    outcomes: {
      en: "Recognize common vulnerability classes and translate them into review questions and tests.",
      zh: "能够识别常见漏洞类型，并把它们转化为审查问题和测试用例。"
    },
    prerequisites: {
      en: "Solidity basics and basic Ethereum transaction model.",
      zh: "Solidity 基础和 Ethereum 交易模型基础。"
    },
    language: "English",
    weeks: 3,
    hoursPerWeek: 4,
    estimatedHours: 12,
    durationNote: "Reference-style guide; best used with hands-on labs.",
    access: "Public guide",
    isFree: true,
    officialUrl: "https://scsfg.io/",
    sourceType: "official-docs",
    priority: "P0",
    commonPitfallsZh: "不要只看定义，要把每类漏洞落实到最小复现、测试和修复方案。",
    bridgeMaterialsZh: "建议搭配 Ethernaut 或 Damn Vulnerable DeFi 做练习。",
    outputTaskZh: "整理一份智能合约漏洞卡片库：触发条件、影响、检测方法、修复建议。",
    lastChecked: "2026-06-27",
    tags: ["solidity", "smart-contracts", "security", "vulnerabilities", "audit"]
  },
  {
    id: "openzeppelin-ethernaut",
    discipline: "security",
    level: "intermediate",
    tracks: ["solidity-security-auditing", "blockchain-web3"],
    provider: "OpenZeppelin",
    university: "OpenZeppelin",
    code: "Ethernaut",
    title: {
      en: "Ethernaut",
      zh: "OpenZeppelin：Ethernaut"
    },
    description: {
      en: "An interactive Web3/Solidity security wargame for learning contract vulnerabilities by exploiting levels.",
      zh: "互动式 Web3/Solidity 安全闯关，通过攻击关卡学习合约漏洞。"
    },
    audience: {
      en: "Learners who want hands-on Solidity security practice after reading the basics.",
      zh: "适合学完 Solidity 基础后，想通过实战理解漏洞的人。"
    },
    outcomes: {
      en: "Exploit common Solidity vulnerabilities and explain how each bug should be fixed.",
      zh: "能够利用常见 Solidity 漏洞，并说明每个漏洞的修复方式。"
    },
    prerequisites: {
      en: "Solidity basics, wallet usage, and Ethereum transaction basics.",
      zh: "Solidity 基础、钱包使用和 Ethereum 交易基础。"
    },
    language: "English",
    weeks: 4,
    hoursPerWeek: 4,
    estimatedHours: 16,
    durationNote: "Interactive lab; pacing depends on how deeply you write postmortems.",
    access: "Public interactive lab",
    isFree: true,
    officialUrl: "https://ethernaut.openzeppelin.com/",
    sourceType: "interactive-lab",
    priority: "P1",
    commonPitfallsZh: "不要只找答案通关。每关都要写攻击路径、根因和修复方案。",
    bridgeMaterialsZh: "建议先完成 Solidity 基础，并阅读 Smart Contract Security Field Guide。",
    outputTaskZh: "每完成 5 关写一份漏洞复盘，包含 exploit、根因、影响和修复。",
    lastChecked: "2026-06-27",
    tags: ["solidity", "security", "wargame", "openzeppelin", "exploits"]
  },
  {
    id: "damn-vulnerable-defi",
    discipline: "security",
    level: "advanced",
    tracks: ["solidity-security-auditing", "blockchain-web3"],
    provider: "Damn Vulnerable DeFi",
    university: "Open-source security lab",
    code: "DVDeFi",
    title: {
      en: "Damn Vulnerable DeFi",
      zh: "Damn Vulnerable DeFi"
    },
    description: {
      en: "A hands-on DeFi security lab with vulnerable smart contracts and exploitation challenges.",
      zh: "DeFi 安全实战实验，提供带漏洞的智能合约和攻击挑战。"
    },
    audience: {
      en: "Advanced learners moving from Solidity security basics to DeFi protocol exploits.",
      zh: "适合从 Solidity 安全基础进阶到 DeFi 协议攻击的人。"
    },
    outcomes: {
      en: "Exploit DeFi-specific vulnerabilities involving flash loans, oracles, governance, and token mechanics.",
      zh: "能够分析并利用闪电贷、预言机、治理和代币机制相关的 DeFi 漏洞。"
    },
    prerequisites: {
      en: "Solidity, Ethereum, DeFi basics, and testing frameworks.",
      zh: "Solidity、Ethereum、DeFi 基础和测试框架。"
    },
    language: "English",
    weeks: 6,
    hoursPerWeek: 5,
    estimatedHours: 30,
    durationNote: "Advanced security lab; pair with writeups and your own tests.",
    access: "Public interactive lab",
    isFree: true,
    officialUrl: "https://www.damnvulnerabledefi.xyz/",
    sourceType: "interactive-lab",
    priority: "P1",
    commonPitfallsZh:
      "不要在不了解 DeFi 机制时直接刷题。先理解 AMM、oracle、governance 和 token accounting。",
    bridgeMaterialsZh: "建议先学 Berkeley DeFi、Ethernaut 和基础审计方法。",
    outputTaskZh: "完成至少 3 个 DeFi 攻击挑战，并为每个挑战写测试、攻击步骤和修复建议。",
    lastChecked: "2026-06-27",
    tags: ["defi", "security", "flash-loans", "oracles", "solidity", "exploits"]
  },
  {
    id: "cyfrin-updraft-smart-contract-security",
    discipline: "security",
    level: "intermediate",
    tracks: ["solidity-security-auditing", "blockchain-web3"],
    provider: "Cyfrin Updraft",
    university: "Cyfrin",
    code: "Smart Contract Security",
    title: {
      en: "Smart Contract Security",
      zh: "Cyfrin Updraft：智能合约安全"
    },
    description: {
      en: "A practical training course for smart contract security, auditing workflows, and vulnerability analysis.",
      zh: "面向智能合约安全、审计流程和漏洞分析的实践训练课。"
    },
    audience: {
      en: "Learners who want guided security training with modern Solidity tooling.",
      zh: "适合希望用现代 Solidity 工具链系统学习合约安全的人。"
    },
    outcomes: {
      en: "Use auditing workflows and tooling to identify, test, and document smart contract vulnerabilities.",
      zh: "能够使用审计流程和工具发现、测试并记录智能合约漏洞。"
    },
    prerequisites: {
      en: "Solidity, Foundry or Hardhat basics, and Ethereum fundamentals.",
      zh: "Solidity、Foundry 或 Hardhat 基础，以及 Ethereum 基础。"
    },
    language: "English",
    weeks: 6,
    hoursPerWeek: 5,
    estimatedHours: 30,
    durationNote: "Practical professional training; platform access may vary.",
    access: "Public course page with platform enrollment",
    isFree: "partial",
    officialUrl: "https://updraft.cyfrin.io/courses/security",
    sourceType: "official-training",
    priority: "P0",
    commonPitfallsZh: "不要只看视频。智能合约安全必须动手写测试、跑工具、写审计报告。",
    bridgeMaterialsZh: "建议先掌握 Solidity、Foundry 和基本合约开发。",
    outputTaskZh: "完成一个小合约审计报告，包含 findings、severity、PoC 和 remediation。",
    lastChecked: "2026-06-27",
    tags: ["smart-contract-security", "auditing", "foundry", "solidity", "cyfrin"]
  },
  {
    id: "consensys-smart-contract-best-practices",
    discipline: "security",
    level: "intermediate",
    tracks: ["solidity-security-auditing", "blockchain-web3"],
    provider: "ConsenSys Diligence",
    university: "ConsenSys",
    code: "Best Practices",
    title: {
      en: "Ethereum Smart Contract Security Best Practices",
      zh: "ConsenSys：以太坊智能合约安全最佳实践"
    },
    description: {
      en: "A classic reference on Ethereum smart contract vulnerabilities, design patterns, and defensive practices.",
      zh: "经典 Ethereum 智能合约安全参考，覆盖漏洞、设计模式和防御实践。"
    },
    audience: {
      en: "Learners who want a compact historical reference for audit checklists.",
      zh: "适合需要合约审计 checklist 和经典漏洞参考的人。"
    },
    outcomes: {
      en: "Build a smart contract security checklist and recognize historically important vulnerability patterns.",
      zh: "能够建立智能合约安全 checklist，并识别经典漏洞模式。"
    },
    prerequisites: {
      en: "Solidity and Ethereum basics.",
      zh: "Solidity 和 Ethereum 基础。"
    },
    language: "English",
    weeks: 2,
    hoursPerWeek: 4,
    estimatedHours: 8,
    durationNote: "Classic reference; combine with newer resources.",
    access: "Public guide",
    isFree: true,
    officialUrl: "https://consensysdiligence.github.io/smart-contract-best-practices/",
    sourceType: "official-docs",
    priority: "P2",
    commonPitfallsZh: "这是一份经典资料，但部分内容可能不覆盖最新工具链。要搭配新课程和实验使用。",
    bridgeMaterialsZh: "建议搭配 Trail of Bits、Cyfrin 和 Ethernaut。",
    outputTaskZh: "把其中的安全建议整理成一份适合自己项目的审计 checklist。",
    lastChecked: "2026-06-27",
    tags: ["ethereum", "solidity", "security", "best-practices", "audit"]
  },
  {
    id: "dune-docs-dunesql",
    discipline: "data",
    level: "intermediate",
    tracks: ["onchain-data-analytics", "blockchain-web3"],
    provider: "Dune",
    university: "Dune",
    code: "DuneSQL",
    title: {
      en: "Dune Docs and DuneSQL",
      zh: "Dune 文档与 DuneSQL"
    },
    description: {
      en: "Official Dune documentation for querying, visualizing, and sharing on-chain analytics with DuneSQL.",
      zh: "Dune 官方文档，用 DuneSQL 查询、可视化和分享链上数据分析。"
    },
    audience: {
      en: "Learners who want to build public dashboards for DeFi, NFT, DAO, or protocol analytics.",
      zh: "适合想做 DeFi、NFT、DAO 或协议数据看板的人。"
    },
    outcomes: {
      en: "Query blockchain datasets, build dashboards, and explain protocol metrics with SQL.",
      zh: "能够用 SQL 查询链上数据、构建看板并解释协议指标。"
    },
    prerequisites: {
      en: "SQL basics, blockchain basics, and comfort reading schemas.",
      zh: "SQL 基础、区块链基础和阅读数据表结构的能力。"
    },
    language: "English",
    weeks: 3,
    hoursPerWeek: 5,
    estimatedHours: 15,
    durationNote: "Official docs and hands-on dashboard workflow.",
    access: "Public official docs",
    isFree: "partial",
    officialUrl: "https://docs.dune.com/",
    sourceType: "official-tool-docs",
    priority: "P0",
    commonPitfallsZh: "不要只会复制别人的查询。要理解表结构、时间窗口、去重、合约事件和指标定义。",
    bridgeMaterialsZh: "建议先学 SQL、基础 DeFi 和 Etherscan 读合约事件。",
    outputTaskZh: "做一个协议指标看板：活跃用户、交易量、TVL 代理指标和异常波动说明。",
    lastChecked: "2026-06-27",
    tags: ["on-chain-data", "sql", "dune", "analytics", "dashboard", "defi"]
  },
  {
    id: "the-graph-docs-subgraphs",
    discipline: "data",
    level: "intermediate",
    tracks: ["onchain-data-analytics", "blockchain-web3"],
    provider: "The Graph",
    university: "The Graph",
    code: "Subgraphs",
    title: {
      en: "The Graph Docs: Subgraphs",
      zh: "The Graph 文档：Subgraph"
    },
    description: {
      en: "Official documentation for indexing blockchain data and querying subgraphs with GraphQL.",
      zh: "The Graph 官方文档，用于索引区块链数据并通过 GraphQL 查询 subgraph。"
    },
    audience: {
      en: "Developers and analysts who need custom indexed blockchain data rather than only hosted dashboards.",
      zh: "适合需要自定义索引链上数据，而不只依赖现成看板的开发者和分析师。"
    },
    outcomes: {
      en: "Design a subgraph schema, index events, and query indexed blockchain data.",
      zh: "能够设计 subgraph schema、索引事件并查询链上索引数据。"
    },
    prerequisites: {
      en: "GraphQL basics, smart contract events, and JavaScript or TypeScript.",
      zh: "GraphQL 基础、智能合约事件和 JavaScript 或 TypeScript。"
    },
    language: "English",
    weeks: 4,
    hoursPerWeek: 5,
    estimatedHours: 20,
    durationNote: "Official docs; best learned by building one subgraph.",
    access: "Public official docs",
    isFree: true,
    officialUrl: "https://thegraph.com/docs/en/",
    sourceType: "official-tool-docs",
    priority: "P0",
    commonPitfallsZh: "不要把 The Graph 当成普通 API。核心是理解事件、索引、schema 和查询模型。",
    bridgeMaterialsZh: "建议先学合约事件、GraphQL 和基本链上数据结构。",
    outputTaskZh: "为一个 ERC20 或 DeFi 合约建立 subgraph，并写 5 个 GraphQL 查询。",
    lastChecked: "2026-06-27",
    tags: ["the-graph", "subgraph", "graphql", "indexing", "on-chain-data"]
  },
  {
    id: "google-blockchain-analytics",
    discipline: "data",
    level: "intermediate",
    tracks: ["onchain-data-analytics", "blockchain-web3"],
    provider: "Google Cloud",
    university: "Google Cloud",
    code: "Blockchain Analytics",
    title: {
      en: "Google Cloud Blockchain Analytics",
      zh: "Google Cloud：区块链分析数据集"
    },
    description: {
      en: "Official Google Cloud documentation for blockchain analytics datasets and BigQuery workflows.",
      zh: "Google Cloud 官方文档，介绍区块链分析数据集和 BigQuery 工作流。"
    },
    audience: {
      en: "Analysts who want warehouse-style blockchain analytics with SQL and cloud datasets.",
      zh: "适合想用数据仓库和 SQL 做链上数据分析的人。"
    },
    outcomes: {
      en: "Query blockchain datasets in BigQuery and reason about cross-chain analytics workflows.",
      zh: "能够在 BigQuery 查询区块链数据集，并理解跨链数据分析流程。"
    },
    prerequisites: {
      en: "SQL, cloud data warehouse basics, and blockchain data concepts.",
      zh: "SQL、云数据仓库基础和链上数据概念。"
    },
    language: "English",
    weeks: 3,
    hoursPerWeek: 4,
    estimatedHours: 12,
    durationNote: "Official cloud documentation; cloud usage may incur costs.",
    access: "Public docs; cloud usage may be paid",
    isFree: "partial",
    officialUrl: "https://cloud.google.com/blockchain-analytics/docs",
    sourceType: "official-tool-docs",
    priority: "P1",
    commonPitfallsZh: "云数据集查询可能产生费用。学习时要控制查询范围和成本。",
    bridgeMaterialsZh: "建议先掌握 SQL 聚合、窗口函数和基础链上事件模型。",
    outputTaskZh: "用 BigQuery 写一组链上指标查询，并记录查询成本和优化方式。",
    lastChecked: "2026-06-27",
    tags: ["bigquery", "blockchain-analytics", "sql", "cloud", "data-warehouse"]
  },
  {
    id: "etherscan-api-docs",
    discipline: "data",
    level: "beginner",
    tracks: ["onchain-data-analytics", "blockchain-web3"],
    provider: "Etherscan",
    university: "Etherscan",
    code: "API Docs",
    title: {
      en: "Etherscan API Documentation",
      zh: "Etherscan API 文档"
    },
    description: {
      en: "Official API documentation for reading Ethereum account, transaction, contract, and token data.",
      zh: "Etherscan 官方 API 文档，用于读取 Ethereum 账户、交易、合约和代币数据。"
    },
    audience: {
      en: "Beginners who want to script small on-chain data pulls before moving to larger analytics platforms.",
      zh: "适合在进入大型分析平台前，先脚本化拉取链上数据的入门学习者。"
    },
    outcomes: {
      en: "Fetch contract, transaction, token, and account data through APIs and store them for analysis.",
      zh: "能够通过 API 拉取合约、交易、代币和账户数据，并保存用于分析。"
    },
    prerequisites: {
      en: "HTTP APIs, JavaScript or Python, and Ethereum basics.",
      zh: "HTTP API、JavaScript 或 Python，以及 Ethereum 基础。"
    },
    language: "English",
    weeks: 2,
    hoursPerWeek: 4,
    estimatedHours: 8,
    durationNote: "Official API docs; useful for small scripts and data ingestion.",
    access: "Public docs; API limits may apply",
    isFree: "partial",
    officialUrl: "https://docs.etherscan.io/",
    sourceType: "official-tool-docs",
    priority: "P1",
    commonPitfallsZh:
      "不要把 API 拉取当成完整数据仓库。它适合小规模查询和补充数据，复杂分析应转向 Dune、BigQuery 或索引方案。",
    bridgeMaterialsZh: "建议先了解交易、日志、合约 ABI 和 token transfer。",
    outputTaskZh: "写一个脚本拉取某地址交易和 token 转账，生成一份简单资产流动报告。",
    lastChecked: "2026-06-27",
    tags: ["etherscan", "api", "ethereum", "transactions", "tokens", "data-ingestion"]
  },
  {
    id: "substreams-docs",
    discipline: "data",
    level: "advanced",
    tracks: ["onchain-data-analytics", "blockchain-web3"],
    provider: "StreamingFast / The Graph",
    university: "The Graph ecosystem",
    code: "Substreams",
    title: {
      en: "Substreams Documentation",
      zh: "Substreams 文档"
    },
    description: {
      en: "Official documentation for high-performance blockchain data extraction and transformation pipelines.",
      zh: "用于高性能链上数据提取和转换管线的官方文档。"
    },
    audience: {
      en: "Advanced developers building custom, scalable blockchain data pipelines.",
      zh: "适合构建自定义、可扩展链上数据管线的高级开发者。"
    },
    outcomes: {
      en: "Understand streaming blockchain data modules and build reusable extraction pipelines.",
      zh: "能够理解流式链上数据模块，并构建可复用的数据提取管线。"
    },
    prerequisites: {
      en: "Blockchain indexing, protobuf, Rust or Go helpful, and backend engineering.",
      zh: "区块链索引、protobuf，最好了解 Rust 或 Go，以及后端工程能力。"
    },
    language: "English",
    weeks: 5,
    hoursPerWeek: 6,
    estimatedHours: 30,
    durationNote: "Advanced official docs; use after Dune or The Graph basics.",
    access: "Public official docs",
    isFree: true,
    officialUrl: "https://docs.substreams.dev/",
    sourceType: "official-tool-docs",
    priority: "P1",
    commonPitfallsZh: "不要一开始就学 Substreams。它更适合需要高性能数据管线的进阶场景。",
    bridgeMaterialsZh: "建议先学 Dune、The Graph 和基本后端数据处理。",
    outputTaskZh: "实现一个简单链上事件提取模块，并说明它相对 SQL 看板的优势和成本。",
    lastChecked: "2026-06-27",
    tags: ["substreams", "indexing", "data-pipeline", "blockchain-data", "streaming"]
  },
  {
    id: "swe-bench-benchmark",
    discipline: "software-engineering",
    level: "advanced",
    tracks: ["ai-coding-agent-evaluation-tools", "ai-assisted-software-engineering"],
    provider: "SWE-bench",
    university: "Princeton NLP / community benchmark",
    code: "SWE-bench",
    title: {
      en: "SWE-bench",
      zh: "SWE-bench：软件工程智能体评测基准"
    },
    description: {
      en: "A benchmark for evaluating AI systems on real software engineering issues from GitHub repositories.",
      zh: "用于评测 AI 系统解决真实 GitHub 软件工程问题能力的 benchmark。"
    },
    audience: {
      en: "Learners building or evaluating coding agents beyond toy tasks.",
      zh: "适合想构建或评测 AI coding agent，而不满足于玩具任务的人。"
    },
    outcomes: {
      en: "Understand real-world coding-agent evaluation and design issue-resolution experiments.",
      zh: "能够理解真实软件工程任务评测，并设计 issue 修复实验。"
    },
    prerequisites: {
      en: "GitHub workflows, Python, testing, and software engineering basics.",
      zh: "GitHub 工作流、Python、测试和软件工程基础。"
    },
    language: "English",
    weeks: 3,
    hoursPerWeek: 5,
    estimatedHours: 15,
    durationNote: "Benchmark and papers; use for evaluation literacy.",
    access: "Public benchmark website",
    isFree: true,
    officialUrl: "https://www.swebench.com/",
    sourceType: "benchmark-resource",
    priority: "P0",
    commonPitfallsZh:
      "不要用几个 demo 成功案例判断 coding agent 能力。要看真实 issue、测试通过率、失败模式和可复现性。",
    bridgeMaterialsZh: "建议先掌握 Git、测试、CI 和至少一个真实项目维护流程。",
    outputTaskZh: "选择 5 个真实 bugfix issue，设计一套 coding agent 评测表和失败分类。",
    lastChecked: "2026-06-27",
    tags: ["coding-agent", "benchmark", "evaluation", "github", "software-engineering"]
  },
  {
    id: "swe-agent",
    discipline: "software-engineering",
    level: "advanced",
    tracks: ["ai-coding-agent-evaluation-tools", "ai-assisted-software-engineering"],
    provider: "SWE-agent",
    university: "Open-source project",
    code: "SWE-agent",
    title: {
      en: "SWE-agent",
      zh: "SWE-agent：软件工程智能体工具链"
    },
    description: {
      en: "An open-source system for turning language models into software engineering agents that work on GitHub issues.",
      zh: "开源软件工程智能体系统，把语言模型接入真实 GitHub issue 修复流程。"
    },
    audience: {
      en: "Builders who want to study coding-agent architecture and issue-solving loops.",
      zh: "适合想研究 coding agent 架构和真实 issue 修复循环的人。"
    },
    outcomes: {
      en: "Understand coding-agent loops: repo setup, command execution, patch generation, tests, and evaluation.",
      zh: "能够理解 coding agent 循环：仓库准备、命令执行、补丁生成、测试和评测。"
    },
    prerequisites: {
      en: "Python, Git, shell, testing, and software engineering workflows.",
      zh: "Python、Git、命令行、测试和软件工程工作流。"
    },
    language: "English",
    weeks: 4,
    hoursPerWeek: 6,
    estimatedHours: 24,
    durationNote: "Open-source project docs; best learned by running controlled experiments.",
    access: "Public project docs",
    isFree: true,
    officialUrl: "https://swe-agent.com/",
    sourceType: "official-tool-docs",
    priority: "P0",
    commonPitfallsZh: "不要把 agent 看成聊天机器人。它是带工具、环境、测试和补丁循环的工程系统。",
    bridgeMaterialsZh: "建议先看 SWE-bench，再运行小规模实验。",
    outputTaskZh: "在一个小仓库中运行 coding agent，记录轨迹、补丁、测试结果和失败原因。",
    lastChecked: "2026-06-27",
    tags: ["coding-agent", "swe-agent", "github-issues", "tool-use", "testing", "patching"]
  },
  {
    id: "openai-evals",
    discipline: "ai-engineering",
    level: "intermediate",
    tracks: ["ai-coding-agent-evaluation-tools", "llm-systems-rag-evaluation"],
    provider: "OpenAI",
    university: "OpenAI",
    code: "Evals",
    title: {
      en: "OpenAI Evals",
      zh: "OpenAI Evals：模型与应用评测框架"
    },
    description: {
      en: "An open-source framework and registry for evaluating model and application behavior.",
      zh: "OpenAI 开源评测框架和评测集注册表，用于评估模型和应用行为。"
    },
    audience: {
      en: "Builders who need repeatable evaluation for LLM applications or coding-agent workflows.",
      zh: "适合需要为 LLM 应用或 coding agent 建立可重复评测的人。"
    },
    outcomes: {
      en: "Create evaluation datasets, define graders, and run repeatable model/application checks.",
      zh: "能够创建评测数据集、定义评分器，并运行可重复的模型/应用检查。"
    },
    prerequisites: {
      en: "Python, JSON, LLM API basics, and testing mindset.",
      zh: "Python、JSON、LLM API 基础和测试思维。"
    },
    language: "English",
    weeks: 3,
    hoursPerWeek: 4,
    estimatedHours: 12,
    durationNote: "Open-source framework docs and examples.",
    access: "Public GitHub repository",
    isFree: true,
    officialUrl: "https://github.com/openai/evals",
    sourceType: "open-source-framework",
    priority: "P1",
    commonPitfallsZh:
      "不要把评测写成只服务一次 demo。要可复现、可版本化，并能在模型或 prompt 改动后回归。",
    bridgeMaterialsZh: "建议先学基本软件测试和 LLM 应用错误分析。",
    outputTaskZh:
      "为一个 coding agent 或 RAG demo 写 10 条 eval case，并在两种 prompt 下比较结果。",
    lastChecked: "2026-06-27",
    tags: ["evals", "llm-evaluation", "testing", "regression", "openai"]
  },
  {
    id: "aider-docs",
    discipline: "software-engineering",
    level: "intermediate",
    tracks: ["ai-coding-agent-evaluation-tools", "ai-assisted-software-engineering"],
    provider: "Aider",
    university: "Open-source tool",
    code: "Aider Docs",
    title: {
      en: "Aider Documentation",
      zh: "Aider 文档：AI 结对编程工具"
    },
    description: {
      en: "Official documentation for an open-source AI pair-programming tool that works with local Git repositories.",
      zh: "Aider 官方文档，用于学习开源 AI 结对编程工具如何在本地 Git 仓库中工作。"
    },
    audience: {
      en: "Developers comparing AI coding tools and agentic edit workflows.",
      zh: "适合比较 AI coding 工具和 agentic edit 工作流的开发者。"
    },
    outcomes: {
      en: "Use an AI coding tool with Git-aware edits, review generated patches, and compare workflow tradeoffs.",
      zh: "能够使用具备 Git 感知能力的 AI 编程工具，审查补丁并比较工作流取舍。"
    },
    prerequisites: {
      en: "Git, command line, one programming language, and code review basics.",
      zh: "Git、命令行、一门编程语言和代码审查基础。"
    },
    language: "English",
    weeks: 2,
    hoursPerWeek: 4,
    estimatedHours: 8,
    durationNote: "Tool documentation; use with a small controlled repository.",
    access: "Public docs",
    isFree: true,
    officialUrl: "https://aider.chat/docs/",
    sourceType: "official-tool-docs",
    priority: "P1",
    commonPitfallsZh: "不要只看生成速度。要比较上下文管理、diff 质量、测试闭环和代码审查成本。",
    bridgeMaterialsZh: "建议和 CMU AI Tools for Software Development 一起学习。",
    outputTaskZh: "用 Aider 完成一个小功能，记录 prompt、diff、测试结果和人工修改比例。",
    lastChecked: "2026-06-27",
    tags: ["ai-coding", "pair-programming", "git", "tooling", "code-review"]
  },
  {
    id: "github-copilot-coding-agent",
    discipline: "software-engineering",
    level: "intermediate",
    tracks: ["ai-coding-agent-evaluation-tools", "ai-assisted-software-engineering"],
    provider: "GitHub Docs",
    university: "GitHub",
    code: "Copilot Coding Agent",
    title: {
      en: "GitHub Copilot Coding Agent Documentation",
      zh: "GitHub Copilot Coding Agent 文档"
    },
    description: {
      en: "Official GitHub documentation for understanding cloud coding agents, issue delegation, review, and repository workflow integration.",
      zh: "GitHub 官方文档，用于理解云端 coding agent、issue 委派、审查和仓库工作流集成。"
    },
    audience: {
      en: "Teams and solo builders evaluating how coding agents fit into GitHub workflows.",
      zh: "适合评估 coding agent 如何进入 GitHub 工作流的团队和个人开发者。"
    },
    outcomes: {
      en: "Understand how cloud coding agents are assigned work, produce changes, and fit into review workflows.",
      zh: "能够理解云端 coding agent 如何接任务、产出修改并进入 review 流程。"
    },
    prerequisites: {
      en: "GitHub issues, pull requests, CI, and code review basics.",
      zh: "GitHub issue、pull request、CI 和代码审查基础。"
    },
    language: "English",
    weeks: 1,
    hoursPerWeek: 3,
    estimatedHours: 3,
    durationNote: "Official product documentation; product availability may vary.",
    access: "Public docs; product access may be paid or gated",
    isFree: "partial",
    officialUrl: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent",
    sourceType: "official-tool-docs",
    priority: "P1",
    commonPitfallsZh:
      "不要把 coding agent 接入主分支直推。要通过 issue、分支、PR、CI 和人工 review 控制风险。",
    bridgeMaterialsZh: "建议先熟悉 GitHub PR 工作流和基本 CI。",
    outputTaskZh:
      "设计一份 coding agent 任务接入规范：任务类型、权限、review、CI gate 和回滚策略。",
    lastChecked: "2026-06-27",
    tags: ["github", "copilot", "coding-agent", "pull-request", "ci", "workflow"]
  }
];
