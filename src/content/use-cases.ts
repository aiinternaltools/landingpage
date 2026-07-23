export const landingUseCases = [
  {
    id: "social-media",
    title: "AI Social Media Assistant",
    tagline: "From a Google Sheets idea to scheduled posts — with you in control.",
    href: "/use-cases/ai-social-media-assistant",
  },
  {
    id: "email-agent",
    title: "Email AI Agent",
    tagline: "Classify every email, reply with knowledge, and hand off when a human should take over.",
    href: "/use-cases/email-ai-agent",
  },
] as const;

export type LandingUseCaseId = (typeof landingUseCases)[number]["id"];

export const contactUseCaseCustomId = "custom" as const;

export type ContactUseCaseId = LandingUseCaseId | typeof contactUseCaseCustomId;

export const contactUseCaseOptions = [
  ...landingUseCases.map(({ id, title }) => ({ value: id, label: title })),
  { value: contactUseCaseCustomId, label: "Something custom" },
] as const;
