import {
  contactUseCaseCustomId,
  contactUseCaseOptions,
  type ContactFormPayload,
  type ContactUseCaseId,
} from "@/content/contact";

const useCaseValues = new Set<string>(
  contactUseCaseOptions.map((option) => option.value),
);

function isValidPayload(body: unknown): body is ContactFormPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (typeof b.name !== "string" || !b.name.trim()) return false;
  if (typeof b.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email))
    return false;
  if (typeof b.useCase !== "string" || !useCaseValues.has(b.useCase)) return false;
  if (b.useCase === contactUseCaseCustomId) {
    if (typeof b.message !== "string" || !b.message.trim()) return false;
  } else if (b.message !== undefined && typeof b.message !== "string") {
    return false;
  }
  if (b.company !== undefined && typeof b.company !== "string") return false;
  return true;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const useCase = body.useCase as ContactUseCaseId;
  const selectedOption = contactUseCaseOptions.find((option) => option.value === useCase);

  const payload: ContactFormPayload = {
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    useCase,
    message: body.message?.trim() || undefined,
    company: body.company?.trim() || undefined,
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          useCaseLabel: selectedOption?.label,
          source: "contact-page",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        return Response.json({ error: "Upstream webhook failed" }, { status: 502 });
      }
    } catch {
      return Response.json({ error: "Could not reach webhook" }, { status: 502 });
    }
  }

  return Response.json({ ok: true, forwarded: Boolean(webhook) });
}
