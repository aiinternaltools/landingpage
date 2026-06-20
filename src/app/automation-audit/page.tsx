import type { Metadata } from "next";
import { AutomationAuditTool } from "@/components/automation-audit/AutomationAuditTool";

export const metadata: Metadata = {
  title: "Automation Audit",
  description:
    "AI-powered automation opportunity scan. Infers business model, detects visible integrations, and recommends workflow automations.",
};

export default function AutomationAuditPage() {
  return (
    <main className="flex flex-1 flex-col">
      <AutomationAuditTool />
    </main>
  );
}
