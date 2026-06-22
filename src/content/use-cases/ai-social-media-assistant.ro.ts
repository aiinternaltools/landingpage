export const aiSocialMediaAssistant = {
  metadata: {
    title: "Asistent AI pentru social media",
    description:
      "Transformă ideile din Google Sheets în postări social media aliniate brandului. AI generează conținut pe canal, tu aprobi și programezi, apoi postările apar automat pe LinkedIn, Instagram, Facebook și X.",
  },
  eyebrow: "Asistent AI pentru social media",
  headline: "Rămâi activ pe social media",
  headlineAccent: "în minute, nu ore",
  subhead:
    "Nu mai pierde timp scriind și programând postări manual. Generează, revizuiește și publică conținut pe toate canalele dintr-un singur flux simplu.",
  primaryCta: "Programează un demo",
  secondaryCta: "Vezi cum funcționează",
  flowIntro:
    "Idei la intrare. AI creează conținut aliniat brandului. Tu rămâi la control.",
  flowDiagram: {
    agent: {
      step: "02",
      title: "Asistent AI pentru social media",
      subtitle:
        "Creează automat postări pentru Facebook, Instagram și LinkedIn adaptate fiecărei platforme și aliniate brandului tău.",
      subtitleHighlights: ["adaptate fiecărei platforme", "aliniate brandului tău"],
      badge: "Rulează 24/7",
    },
    input: {
      step: "01",
      title: "Planificare conținut",
      body: "Adaugă produsele, ofertele, ideile sau temele de campanie. AI le transformă în conținut social media gata de publicat.",
      flowLabel: "Google Sheets → Agent AI",
    },
    approval: {
      step: "03",
      title: "Revizuire și aprobare",
      body: "Revizuiește conținutul, aprobă postările și setează orele de publicare. Nimic nu apare live fără aprobarea ta.",
      bodyHighlights: ["setează orele de publicare"],
      flowLabel: "Agent AI → Aprobare Google Sheets",
    },
    publishing: {
      step: "04",
      title: "Publică peste tot",
      body: "După aprobare, postările sunt programate și publicate automat pe toate canalele social media conectate.",
    },
    platforms: [
      { id: "linkedin", name: "LinkedIn" },
      { id: "instagram", name: "Instagram" },
      { id: "facebook", name: "Facebook" },
      { id: "x", name: "X" },
    ],
  },
  benefitsHeading: "De ce le place echipelor",
  benefitsSubheading: "Tu rămâi la control. Munca repetitivă rulează singură.",
  benefits: [
    {
      id: "time",
      title: "Ore recuperate în fiecare săptămână",
      body: "Nu mai rescrii aceeași postare în patru variante și nu mai cauți imagini în ultimul moment.",
    },
    {
      id: "brand",
      title: "Aliniat brandului, pe fiecare canal",
      body: "Fiecare platformă primește conținut potrivit formatului și identității tale vizuale.",
    },
    {
      id: "control",
      title: "Nimic nu apare live fără tine",
      body: "Aprobarea umană în buclă înseamnă că semnezi înainte ca orice să fie programat sau publicat.",
    },
  ],
  finalCta: {
    heading: "Vrei asta pentru brandul tău?",
    body: "Spune-ne despre canalele tale și ritmul de postare. Vom defini un flux de lucru potrivit modului în care lucrezi deja.",
    button: "Începe o conversație",
  },
} as const;
