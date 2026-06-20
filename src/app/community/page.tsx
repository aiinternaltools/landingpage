import type { Metadata } from "next";
import Link from "next/link";
import { CommunityBenefitsSection } from "@/components/community/CommunityBenefitsSection";
import { CommunityJoinForm } from "@/components/community/CommunityJoinForm";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageBackdrop } from "@/components/ui/PageBackdrop";
import { communityWaitlist } from "@/content/community";

export const metadata: Metadata = {
  title: "Community Waitlist",
  description:
    "Join the waitlist for a practical AI community hub for entrepreneurs and SMBs. The first 1,000 members get free access when we launch.",
};

export default function CommunityPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Section
        pad="tight"
        className="relative flex min-h-[calc(100dvh-var(--header-height))] flex-col justify-center overflow-hidden py-0"
      >
        <PageBackdrop glow="hero" />
        <div className="relative mx-auto w-full max-w-3xl px-2 text-center sm:px-0">
          <Eyebrow>{communityWaitlist.eyebrow}</Eyebrow>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            <span className="text-gradient">Applied AI</span> community for
            entrepreneurs and small/medium businesses
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            {communityWaitlist.heroDescription}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#join" variant="primary">
              {communityWaitlist.cta}
            </Button>
            <Button href="/" variant="secondary">
              Back to home
            </Button>
          </div>
        </div>
      </Section>

      <Section className="relative border-t border-border py-14 md:py-20">
        <CommunityBenefitsSection />
      </Section>

      <Section
        id="join"
        pad="tight"
        className="section-band relative flex min-h-[calc(100dvh-var(--header-height))] scroll-mt-[var(--header-height)] flex-col justify-center overflow-hidden border-t border-border !py-6 md:!py-8"
      >
        <PageBackdrop glow="soft" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              Hub launching soon · {communityWaitlist.freeAccessLimit.toLocaleString()} free spots
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {communityWaitlist.joinHeading}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-[15px]">
              {communityWaitlist.joinDescription}
            </p>
            <ul className="mt-5 space-y-2.5">
              {communityWaitlist.trustItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted">
                  <span className="text-accent" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 hidden text-sm text-muted lg:block">
              Prefer email?{" "}
              <Link
                href="/contact"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                Get in touch
              </Link>
            </p>
          </div>

          <div className="form-glow-panel overflow-hidden rounded-2xl lg:col-span-7 lg:ml-auto lg:w-full lg:max-w-2xl">
            <div className="border-b border-border/60 bg-background/20 px-5 py-3 text-xs text-muted sm:px-6">
              Waitlist form
            </div>
            <div className="px-5 py-5 sm:px-6">
              <CommunityJoinForm />
            </div>
          </div>

          <p className="text-center text-sm text-muted lg:col-span-12 lg:hidden">
            Prefer email?{" "}
            <Link
              href="/contact"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Get in touch
            </Link>
          </p>
        </div>
      </Section>
    </main>
  );
}
