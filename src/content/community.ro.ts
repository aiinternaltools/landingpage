export const communityWaitlist = {
  freeAccessLimit: 1000,
} as const;

export const communityBenefits = [
  {
    id: "tools",
    text: "Audit Marketing și Audit Automatizare incluse — scanează site-ul și primești rapoarte acționabile (bonus fondator)",
  },
  {
    id: "templates",
    text: "Fluxuri de lucru și șabloane de automatizare gata de folosit",
  },
  {
    id: "examples",
    text: "Implementări reale în business — nu teorie",
  },
  {
    id: "curated",
    text: "Ghidaj curat, fără hype sau spam de instrumente",
  },
  {
    id: "networking",
    text: "Conectează-te cu operatori care rezolvă probleme similare",
  },
] as const;

export const communityRoles = [
  { value: "entrepreneur", label: "Antreprenor" },
  { value: "freelancer", label: "Freelancer" },
  { value: "manager", label: "Manager" },
  { value: "consultant", label: "Consultant" },
  { value: "other", label: "Altul" },
] as const;

export const communityInterests = [
  { id: "audit-tools", label: "Să încerc instrumentele de audit" },
  { id: "understand-ai", label: "Să înțeleg mai bine AI" },
  { id: "save-time", label: "Să economisesc timp în afacerea mea" },
  { id: "automate", label: "Să automatizez procese" },
  { id: "discover-tools", label: "Să descopăr instrumente utile" },
  { id: "templates", label: "Să primesc șabloane / fluxuri de lucru" },
  { id: "examples", label: "Să văd exemple practice" },
  { id: "networking", label: "Networking" },
  { id: "consulting", label: "Consultanță / implementare AI" },
  { id: "courses", label: "Cursuri / ateliere" },
] as const;
