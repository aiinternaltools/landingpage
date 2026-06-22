export const communityWaitlist = {
  freeAccessLimit: 1000,
} as const;

export const communityBenefits = [
  {
    id: "tools",
    text: "Marketing & Automation Audits included—scan your site and get actionable reports (founding bonus)",
  },
  {
    id: "templates",
    text: "Ready-to-use workflows and automation templates",
  },
  {
    id: "examples",
    text: "Real business implementations—not theory",
  },
  {
    id: "curated",
    text: "Curated guidance without hype or tool spam",
  },
  {
    id: "networking",
    text: "Connect with operators solving similar problems",
  },
] as const;

export const communityRoles = [
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "freelancer", label: "Freelancer" },
  { value: "manager", label: "Manager" },
  { value: "consultant", label: "Consultant" },
  { value: "other", label: "Other" },
] as const;

export const communityInterests = [
  { id: "audit-tools", label: "Try the audit tools" },
  { id: "understand-ai", label: "Better understand AI" },
  { id: "save-time", label: "Save time in my business" },
  { id: "automate", label: "Automate processes" },
  { id: "discover-tools", label: "Discover useful tools" },
  { id: "templates", label: "Receive templates / workflows" },
  { id: "examples", label: "See practical examples" },
  { id: "networking", label: "Networking" },
  { id: "consulting", label: "AI consulting / implementation" },
  { id: "courses", label: "Courses / workshops" },
] as const;

export type CommunityBenefitId = (typeof communityBenefits)[number]["id"];
export type CommunityRole = (typeof communityRoles)[number]["value"];
export type CommunityInterestId = (typeof communityInterests)[number]["id"];

export type CommunitySignupPayload = {
  name: string;
  email: string;
  role: CommunityRole;
  interests: CommunityInterestId[];
  challenge?: string;
};
