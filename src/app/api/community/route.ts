import {
  communityInterests,
  communityRoles,
  type CommunitySignupPayload,
} from "@/content/community";

const roleValues = new Set(communityRoles.map((r) => r.value));
const interestSet = new Set<string>(communityInterests);

function isValidPayload(body: unknown): body is CommunitySignupPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (typeof b.name !== "string" || !b.name.trim()) return false;
  if (typeof b.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email))
    return false;
  if (typeof b.role !== "string" || !roleValues.has(b.role as CommunitySignupPayload["role"]))
    return false;
  if (!Array.isArray(b.interests)) return false;
  if (!b.interests.every((i) => typeof i === "string" && interestSet.has(i)))
    return false;
  if (b.challenge !== undefined && typeof b.challenge !== "string") return false;
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

  const payload: CommunitySignupPayload = {
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    role: body.role,
    interests: body.interests,
    challenge: body.challenge?.trim() || undefined,
  };

  const webhook = process.env.COMMUNITY_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
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
