/**
 * Profil concis pentru /about — detalii complete la cerere.
 */

export const aboutProfile = {
  name: "Andrei Alexandru Gabriel",
  headline: "Automatizare AI și inginerie aplicată pentru operațiuni reale",
  location: "București, România",
  email: "andrei.gabriel1190@gmail.com",

  summary:
    "Inginer cu peste 10 ani în mentenanța aeronavelor militare și leadership de calitate, cu doctorat în AI pentru mentenanță predictivă. Construiesc automatizări, instrumente interne și funcții LLM pe care echipele le folosesc cu adevărat — nu prezentări.",

  whatIDo:
    "Automatizare de fluxuri, agenți, asistenți de cunoștințe și dashboard-uri. Acest site găzduiește demo-uri; contactul este pentru scoping de producție.",

  roles: [
    "Inginer AI aplicat",
    "Automatizare și integrări",
    "QA și sisteme operaționale",
  ] as const,

  hiringLine:
    "Disponibil: livrare full-stack pe React / Next.js / TypeScript, Supabase, Vercel, plus AI aplicat și automatizare — cap-coadă.",

  coreStack: [
    {
      title: "Frontend",
      summary: "React / Next.js / TypeScript",
      bullets: ["HTML / CSS", "JavaScript", "UI bazat pe componente"],
    },
    {
      title: "Backend",
      summary: "Supabase (Postgres, Auth, Storage)",
      bullets: [
        "Funcții edge / server când e nevoie",
        "Realtime când e cazul",
      ],
    },
    {
      title: "Deployment",
      summary: "Vercel",
      bullets: ["Medii și fluxuri de deploy", "Domenii și configurare"],
    },
    {
      title: "AI aplicat",
      summary:
        "Integrări LLM, fluxuri multimodale, pipeline-uri AI structurate",
      bullets: [
        "API-uri OpenAI și Anthropic",
        "Orchestrare de prompturi",
        "Output-uri structurate și tool calling",
      ],
    },
    {
      title: "Pattern-uri produse AI",
      summary:
        "Funcții AI livrabile — nu doar urmărirea numelor de modele",
      bullets: [
        "Pipeline-uri de prompturi și fluxuri de generare",
        "Job-uri async, cozi, înlănțuire API",
        "Fluxuri media / multimodale unde e relevant",
      ],
    },
    {
      title: "Automatizare",
      summary: "n8n, orchestrare API, automatizare de fluxuri",
      bullets: [
        "n8n: fluxuri multi-pas, webhooks, integrări SaaS",
        "Orchestrare API între instrumente și servicii interne",
      ],
    },
    {
      title: "Agenți și retrieval",
      summary: "Agenți, RAG, servere MCP, Google ADK",
      bullets: [
        "MCP (Model Context Protocol): servere, unelte, integrări client",
        "Google ADK (Agent Development Kit) pentru design și livrare de agenți",
        "RAG, fluxuri de retrieval și orchestrare de agenți",
      ],
    },
  ] as const,

  highlights: [
    {
      title: "PixelPlot",
      role: "Co-fondator · full-stack (focus AI)",
      period: "2024 — prezent",
      href: "https://www.pixelplot.ai/",
      summary:
        "PixelPlot este un instrument creativ AI pentru reclame scurte și storyboard-uri aliniate brandului: context de brand și produs la intrare, apoi resurse generate pentru social (ex. Meta, TikTok, LinkedIn). Co-fondator: inginerie full-stack cu focus AI — aplicație, integrări, fluxuri de generare LLM și multimodală.",
      stack:
        "React, Next.js, TypeScript, Supabase, Vercel, OpenAI, generare stil imagine și video",
    },
    {
      title: "Romanian Air Force — Quality assurance",
      role: "Șef QA",
      period: "2017 — prezent",
      href: undefined as string | undefined,
      summary:
        "Conduce QA în mentenanța aeronavelor — audituri, fluxuri de lucru, date pentru leadership, context de înaltă fiabilitate.",
      stack: "QMS, înregistrări de mentenanță",
    },
    {
      title: "ICI Bucharest",
      role: "Produs blockchain (part-time)",
      period: "2024 — 2025",
      href: undefined as string | undefined,
      summary:
        "Urmărire descentralizată a datelor de mentenanță — de la cercetare la produs, prezentări pentru parteneri.",
      stack: "DApps, smart contracts",
    },
  ] as const,

  militaryEarlier:
    "Anterior: șef motor/airframe MiG-21, producție și planificare (2014–2017).",

  education: [
    {
      title: "Doctorat (summa cum laude)",
      school: "Politehnica Bucharest — Inginerie industrială și robotică",
      period: "2019 — 2022",
      detail: "QA mentenanță predictivă, ML, înregistrări orientate blockchain.",
    },
    {
      title: "AI & GPT Bootcamp",
      school: "Encode Club",
      period: "2024",
      detail: "Agenți, RAG, multimodal. Proiect: asistent RAG pentru aviație.",
      projectHref:
        "https://github.com/AlexGabrielANDREI/Team9EncodeAIBootcamp2024_FINAL_Project",
    },
    {
      title: "Solidity Bootcamp",
      school: "Encode Club",
      period: "2023",
      detail: "Smart contracts, DApps, securitate EVM.",
    },
    {
      title: "MSc & BSc — Inginerie aerospațială",
      school: "Military Technical Academy",
      period: "2010 — 2016",
      detail: "Inginerie aerospațială și mentenanță.",
    },
  ] as const,

  competitions: [
    {
      name: "Ocean Foam — Net Zero Buildings",
      result: "Locul 1 — feb. 2025",
      href: "https://medium.com/ocean-foam/building-a-sustainable-future-winners-of-the-net-zero-buildings-data-challenge-0a4a2198c27d",
      note: "ML, recomandări, vizualizare.",
    },
    {
      name: "Ocean Foam — PowerCast forecasting",
      result: "Locul 3 — mar. 2025",
      href: "https://medium.com/ocean-foam/powercast-champions-celebrating-the-future-of-electricity-price-forecasting-682eb8c3cfce",
      note: "Prognoză ensemble, logging on-chain.",
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
      label: "Cercetare și ML",
      items: ["ML clasic și prognoză", "Python", "Data storytelling"],
    },
    {
      label: "Domeniu",
      items: [
        "Mentenanță aviație și leadership QA",
        "Mentenanță predictivă",
      ],
    },
    {
      label: "Altele",
      items: ["Solidity / EVM", "Lucru pe produse blockchain"],
    },
  ] as const,

  languages: [
    { language: "Română", level: "Nativ" },
    { language: "Engleză", level: "Avansat" },
    { language: "Italiană", level: "Începător" },
  ] as const,
} as const;
