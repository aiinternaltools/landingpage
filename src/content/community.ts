export const communityWaitlist = {
  freeAccessLimit: 1000,
  eyebrow: "Waitlist · First 1,000 get free access",
  heroDescription:
    "The community hub is still in the works. Join the waitlist today—the first 1,000 people get free access when we launch.",
  cta: "Join the waitlist",
  benefitsHeading: "What's coming",
  benefitsSubheading: "A practical hub",
  joinHeading: "Join the waitlist",
  joinDescription:
    "The hub isn't live yet. Reserve your spot and we'll email you when access opens. The first 1,000 on the list get in free.",
  trustItems: ["No credit card", "First 1,000 free", "Leave anytime"] as const,
  formSubmit: "Join the waitlist",
  formSubmitting: "Joining…",
  successTitle: "You're on the waitlist",
  successDescription:
    "Thanks for signing up. You're in line for free access—we'll email you as soon as the community hub opens.",
} as const;

export const communityBenefits = [
  {
    id: "curated",
    text: "Structured information, without the hype",
  },
  {
    id: "examples",
    text: "Real examples of AI applied in business",
  },
  {
    id: "templates",
    text: "Practical templates, workflows, and automations",
  },
  {
    id: "networking",
    text: "Networking with entrepreneurs interested in AI",
  },
  {
    id: "updates",
    text: "Relevant updates on AI tools and trends",
  },
] as const;

export type CommunityBenefitId = (typeof communityBenefits)[number]["id"];

export const communityRoles = [
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "freelancer", label: "Freelancer" },
  { value: "manager", label: "Manager" },
  { value: "consultant", label: "Consultant" },
  { value: "other", label: "Other" },
] as const;

export const communityInterests = [
  "Better understand AI",
  "Save time in my business",
  "Automate processes",
  "Discover useful tools",
  "Receive templates / workflows",
  "See practical examples",
  "Networking",
  "AI consulting / implementation",
  "Courses / workshops",
  "Stay up to date with AI news",
] as const;

export type CommunityRole = (typeof communityRoles)[number]["value"];

export type CommunitySignupPayload = {
  name: string;
  email: string;
  role: CommunityRole;
  interests: string[];
  challenge?: string;
};
