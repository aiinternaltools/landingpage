import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { PageBackdrop } from "@/components/ui/PageBackdrop";
import { contactPage } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out about a workflow from the site or request a custom automation—we'll reply with clear next steps.",
};

export default function ContactPage() {
  return (
    <main className="flex h-[calc(100dvh-var(--header-height))] flex-col overflow-hidden">
      <Section
        pad="tight"
        className="relative flex h-[calc(100dvh-var(--header-height))] max-h-[calc(100dvh-var(--header-height))] flex-col justify-center overflow-hidden !py-4 md:!py-6"
      >
        <PageBackdrop glow="soft" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Contact
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-[15px]">
              {contactPage.intro}
            </p>
            <div className="mt-5 hidden lg:block">
              <Button href="/" variant="ghost" className="justify-start px-0">
                ← Home
              </Button>
            </div>
          </div>

          <div className="form-glow-panel overflow-hidden rounded-2xl lg:col-span-7 lg:ml-auto lg:w-full lg:max-w-2xl">
            <div className="px-4 py-4 sm:px-5 sm:py-5">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-12 lg:hidden">
            <Button href="/" variant="ghost" className="justify-center sm:justify-start">
              ← Home
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
