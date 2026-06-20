import type { Metadata } from "next";
import { MarketingAuditTool } from "@/components/marketing-audit/MarketingAuditTool";

export const metadata: Metadata = {
  title: "Marketing Audit",
  description:
    "AI-powered marketing audit for your website. Discovers key pages, scores messaging, CRO, SEO, positioning, and trust — with actionable recommendations.",
};

export default function MarketingAuditPage() {
  return (
    <main className="flex flex-1 flex-col">
      <MarketingAuditTool />
    </main>
  );
}
