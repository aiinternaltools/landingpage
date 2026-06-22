export const aiSocialMediaAssistant = {
  metadata: {
    title: "AI Social Media Assistant",
    description:
      "Turn Google Sheets ideas into on-brand social posts. AI generates content per channel, you approve and schedule, then posts go live automatically on LinkedIn, Instagram, Facebook, and X.",
  },
  eyebrow: "AI Social Media Assistant",
  headline: "Stay active on social media",
  headlineAccent: "in minutes, not hours",
  subhead:
    "Stop wasting time writing and scheduling posts manually. Generate, review, and publish content across all your channels from one simple workflow.",
  primaryCta: "Book a Demo",
  secondaryCta: "See How It Works",
  flowIntro:
    "Ideas in. AI creates on-brand content. You stay in control.",
  flowDiagram: {
    agent: {
      step: "02",
      title: "AI Social Media Assistant",
      subtitle:
        "Automatically creates Facebook, Instagram, and LinkedIn posts tailored to each platform and aligned with your brand.",
      subtitleHighlights: ["tailored to each platform", "aligned with your brand"],
      badge: "Runs 24/7",
    },
    input: {
      step: "01",
      title: "Content Planning",
      body: "Add your products, offers, ideas, or campaign topics. The AI turns them into ready-to-publish social media content.",
      flowLabel: "Google Sheets → AI Agent",
    },
    approval: {
      step: "03",
      title: "Review & Approve",
      body: "Review content, approve posts, and set publishing times. Nothing goes live without your approval.",
      bodyHighlights: ["set publishing times"],
      flowLabel: "AI Agent → Google Sheets Approval",
    },
    publishing: {
      step: "04",
      title: "Publish Everywhere",
      body: "Once approved, posts are automatically scheduled and published across all connected social media channels.",
    },
    platforms: [
      { id: "linkedin", name: "LinkedIn" },
      { id: "instagram", name: "Instagram" },
      { id: "facebook", name: "Facebook" },
      { id: "x", name: "X" },
    ],
  },
  benefitsHeading: "Why teams like it",
  benefitsSubheading: "You stay in control. The busywork runs itself.",
  benefits: [
    {
      id: "time",
      title: "Hours back every week",
      body: "No more rewriting the same post four ways or hunting for images at the last minute.",
    },
    {
      id: "brand",
      title: "On-brand, per channel",
      body: "Each platform gets content that fits its format and your visual identity.",
    },
    {
      id: "control",
      title: "Nothing goes live without you",
      body: "Human-in-the-loop approval means you sign off before anything is scheduled or posted.",
    },
  ],
  finalCta: {
    heading: "Want this for your brand?",
    body: "Tell us about your channels and posting rhythm. We'll scope a workflow that fits how you already work.",
    button: "Start a conversation",
  },
} as const;
