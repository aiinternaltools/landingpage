export const landingUseCasesEn = [
  {
    id: "social-media",
    title: "AI Social Media Assistant",
    tagline: "From a Google Sheets idea to scheduled posts — with you in control.",
    href: "/use-cases/ai-social-media-assistant",
  },
] as const;

export const landingUseCasesRo = [
  {
    id: "social-media",
    title: "Asistent AI pentru social media",
    tagline: "De la o idee în Google Sheets la postări programate — cu tine la control.",
    href: "/use-cases/ai-social-media-assistant",
  },
] as const;

export type LandingUseCaseId = (typeof landingUseCasesEn)[number]["id"];

export const contactUseCaseCustomId = "custom" as const;

export type ContactUseCaseId = LandingUseCaseId | typeof contactUseCaseCustomId;

export const contactUseCaseOptionsEn = [
  ...landingUseCasesEn.map(({ id, title }) => ({ value: id, label: title })),
  { value: contactUseCaseCustomId, label: "Something custom" },
] as const;

export const contactUseCaseOptionsRo = [
  ...landingUseCasesRo.map(({ id, title }) => ({ value: id, label: title })),
  { value: contactUseCaseCustomId, label: "Ceva personalizat" },
] as const;

// Backward-compatible exports for legacy imports
export const landingUseCases = landingUseCasesEn;
export const contactUseCaseOptions = contactUseCaseOptionsEn;
