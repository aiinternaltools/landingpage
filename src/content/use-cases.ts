export const landingUseCases = [
  {
    id: "social-media",
    title: "AI Social Media Assistant",
    tagline: "From a Google Sheets idea to scheduled posts — with you in control.",
    href: "/use-cases/ai-social-media-assistant",
  },
] as const;

export type LandingUseCaseId = (typeof landingUseCases)[number]["id"];

export const contactUseCaseCustomId = "custom" as const;

export type ContactUseCaseId = LandingUseCaseId | typeof contactUseCaseCustomId;

export const contactUseCaseOptions = [
  ...landingUseCases.map(({ id, title }) => ({ value: id, label: title })),
  { value: contactUseCaseCustomId, label: "Something custom" },
] as const;
