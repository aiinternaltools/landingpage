/**
 * Curated profile for /about — concise for web. Full detail on request.
 */

export const aboutProfile = {
  name: "Andrei Alexandru Gabriel",
  headline: "AI automation & applied engineering for real operations",
  location: "Bucharest, Romania",
  email: "andrei.gabriel1190@gmail.com",

  summary:
    "Engineer with 10+ years in military aircraft maintenance and quality leadership, PhD work in predictive maintenance AI. I build automations, internal tools, and LLM features that teams actually use—not slide decks.",

  whatIDo:
    "Workflow automation, agents, knowledge assistants, and dashboards. This site hosts demos; contact is for production scoping.",

  roles: [
    "Applied AI engineer",
    "Automation & integrations",
    "QA & operational systems",
  ] as const,

  hiringLine:
    "Hiring: full-stack delivery on React / Next.js / TypeScript, Supabase, Vercel, plus applied AI and automation—end to end.",

  coreStack: [
    {
      title: "Frontend",
      summary: "React / Next.js / TypeScript",
      bullets: ["HTML / CSS", "JavaScript", "Component-driven UI"],
    },
    {
      title: "Backend",
      summary: "Supabase (Postgres, Auth, Storage)",
      bullets: ["Edge / server functions when needed", "Realtime when applicable"],
    },
    {
      title: "Deployment",
      summary: "Vercel",
      bullets: ["Environments & deploy workflows", "Domains & config"],
    },
    {
      title: "Applied AI",
      summary:
        "LLM integrations, multimodal workflows, structured AI pipelines",
      bullets: [
        "OpenAI & Anthropic APIs",
        "Prompt orchestration",
        "Structured outputs & tool calling",
      ],
    },
    {
      title: "AI product patterns",
      summary: "Shippable AI features—not chasing model names alone",
      bullets: [
        "Prompt pipelines & generation workflows",
        "Async jobs, queues, API chaining",
        "Media / multimodal flows where relevant",
      ],
    },
    {
      title: "Automation",
      summary: "n8n, API orchestration, workflow automation",
      bullets: [
        "n8n: multi-step workflows, webhooks, SaaS integrations",
        "API orchestration between tools and internal services",
      ],
    },
    {
      title: "Agents & retrieval",
      summary: "Agents, RAG, MCP servers, Google ADK",
      bullets: [
        "MCP (Model Context Protocol): servers, tools, client integrations",
        "Google ADK (Agent Development Kit) for agent design and delivery",
        "RAG, retrieval workflows & agent orchestration",
      ],
    },
  ] as const,

  highlights: [
    {
      title: "PixelPlot",
      role: "Co-founder · full-stack (AI focus)",
      period: "2024 — present",
      href: "https://www.pixelplot.ai/",
      summary:
        "PixelPlot is an AI creative tool for on-brand short-form ads and storyboards: brand and product context in, then generated assets for social (e.g. Meta, TikTok, LinkedIn). Co-founder: full-stack engineering with an AI focus—app, integrations, LLM and multimodal generation workflows.",
      stack:
        "React, Next.js, TypeScript, Supabase, Vercel, OpenAI, image & video-style generation",
    },
    {
      title: "Romanian Air Force — Quality assurance",
      role: "Head of QA",
      period: "2017 — present",
      href: undefined as string | undefined,
      summary:
        "Leads QA in aircraft maintenance—audits, workflows, data for leadership, high-reliability context.",
      stack: "QMS, maintenance records",
    },
    {
      title: "ICI Bucharest",
      role: "Blockchain product (part-time)",
      period: "2024 — 2025",
      href: undefined as string | undefined,
      summary:
        "Decentralized maintenance data tracking—research to product, partner presentations.",
      stack: "DApps, smart contracts",
    },
  ] as const,

  militaryEarlier:
    "Earlier: MiG-21 engine/airframes lead, production & planning (2014–2017).",

  education: [
    {
      title: "PhD (summa cum laude)",
      school: "Politehnica Bucharest — Industrial & robotic engineering",
      period: "2019 — 2022",
      detail: "Predictive maintenance QA, ML, blockchain-oriented records.",
    },
    {
      title: "AI & GPT Bootcamp",
      school: "Encode Club",
      period: "2024",
      detail: "Agents, RAG, multimodal. Project: aviation RAG assistant.",
      projectHref:
        "https://github.com/AlexGabrielANDREI/Team9EncodeAIBootcamp2024_FINAL_Project",
    },
    {
      title: "Solidity Bootcamp",
      school: "Encode Club",
      period: "2023",
      detail: "Smart contracts, DApps, EVM security.",
    },
    {
      title: "MSc & BSc — Aerospace engineering",
      school: "Military Technical Academy",
      period: "2010 — 2016",
      detail: "Aerospace engineering & maintenance.",
    },
  ] as const,

  competitions: [
    {
      name: "Ocean Foam — Net Zero Buildings",
      result: "1st — Feb 2025",
      href: "https://medium.com/ocean-foam/building-a-sustainable-future-winners-of-the-net-zero-buildings-data-challenge-0a4a2198c27d",
      note: "ML, recommendations, visualization.",
    },
    {
      name: "Ocean Foam — PowerCast forecasting",
      result: "3rd — Mar 2025",
      href: "https://medium.com/ocean-foam/powercast-champions-celebrating-the-future-of-electricity-price-forecasting-682eb8c3cfce",
      note: "Ensemble forecasting, on-chain logging.",
    },
  ] as const,

  publications: [
    {
      title: "Building a Blockchain for Aviation Maintenance Records",
      venue: "J. Phys.: Conf. Ser. 1781, 2021",
      href: "https://iopscience.iop.org/article/10.1088/1742-6596/1781/1/012067",
    },
    {
      title:
        "A New Paradigm for Monitoring the Quality of a Process in Aviation Industry",
      venue: "Acta Technica Napocensis, 2021",
      href: "https://atna-mam.utcluj.ro/index.php/Acta/article/view/1683",
    },
    {
      title:
        "Setting Up New Standards in Aviation Industry with the Help of Artificial Intelligent",
      venue: "J. Phys.: Conf. Ser. 2212, 2022",
      href: "https://iopscience.iop.org/article/10.1088/1742-6596/2212/1/012014",
    },
    {
      title: "Hybrid Smart Contracts with Decentralized Oracles",
      venue: "Romanian Cyber Security Journal, 2024",
      href: "https://doi.org/10.54851/v6i1y202410",
    },
    {
      title: "Overview Regarding Human Factors in Aviation",
      venue: "Annals of the Romanian Academy, 2021",
      href: "https://aos.ro/wp-content/anale/TVol13Nr1Art.7.pdf",
    },
    {
      title: "A New Aircraft Maintenance Approach Based on the Markov Chains",
      venue: "Annals of the Romanian Academy, 2021",
      href: "https://aos.ro/wp-content/anale/TVol13Nr1Art.5.pdf",
    },
  ] as const,

  skillGroups: [
    {
      label: "Research & ML",
      items: ["Traditional ML & forecasting", "Python", "Data storytelling"],
    },
    {
      label: "Domain",
      items: [
        "Aviation maintenance & QA leadership",
        "Predictive maintenance",
      ],
    },
    {
      label: "Other",
      items: ["Solidity / EVM", "Blockchain product work"],
    },
  ] as const,

  languages: [
    { language: "Romanian", level: "Native" },
    { language: "English", level: "Advanced" },
    { language: "Italian", level: "Beginner" },
  ] as const,
} as const;
