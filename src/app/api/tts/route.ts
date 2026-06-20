import { NextResponse } from "next/server";

const MAX_CHARS = 5000;

/** Jessica — expressive, warm American female (charismatic on eleven_v3) */
const DEFAULT_VOICE_ID = "cgSgspJ2msm6clMCkdW9";

const DEFAULT_MODEL_ID = "eleven_v3";

/** Slightly faster than normal; override with ELEVEN_LABS_SPEED (0.25–4.0) */
const DEFAULT_SPEED = 1.3;

const DEFAULT_API_BASE = "https://api.elevenlabs.io/v1";

function getTtsConfig() {
  const apiKey =
    process.env.ELEVEN_LABS_API_KEY?.trim() ||
    process.env.ELEVENLABS_API_KEY?.trim();

  const apiBase = (
    process.env.ELEVEN_LABS_API_URL?.trim() ||
    process.env.ELEVENLABS_API_URL?.trim() ||
    DEFAULT_API_BASE
  ).replace(/\/$/, "");

  const voiceId =
    process.env.ELEVEN_LABS_VOICE_ID?.trim() ||
    process.env.ELEVENLABS_VOICE_ID?.trim() ||
    DEFAULT_VOICE_ID;

  const modelId =
    process.env.ELEVEN_LABS_MODEL_ID?.trim() ||
    process.env.ELEVENLABS_MODEL_ID?.trim() ||
    DEFAULT_MODEL_ID;

  const speedRaw =
    process.env.ELEVEN_LABS_SPEED?.trim() || process.env.ELEVENLABS_SPEED?.trim();
  const speedParsed = speedRaw ? Number.parseFloat(speedRaw) : DEFAULT_SPEED;
  const speed = Number.isFinite(speedParsed)
    ? Math.min(4, Math.max(0.25, speedParsed))
    : DEFAULT_SPEED;

  return { apiKey, apiBase, voiceId, modelId, speed };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const text =
    body && typeof body === "object" && "text" in body && typeof (body as { text: unknown }).text === "string"
      ? (body as { text: string }).text.trim()
      : "";

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  if (text.length > MAX_CHARS) {
    return NextResponse.json(
      { error: `Text exceeds ${MAX_CHARS} character limit` },
      { status: 400 },
    );
  }

  const { apiKey, apiBase, voiceId, modelId, speed } = getTtsConfig();

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Text-to-speech is not configured. Add ELEVEN_LABS_API_KEY to .env and restart the dev server.",
      },
      { status: 503 },
    );
  }

  const ttsUrl = `${apiBase}/text-to-speech/${voiceId}`;

  const elevenRes = await fetch(ttsUrl, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: {
        stability: 0.38,
        similarity_boost: 0.8,
        style: 0.45,
        speed,
        use_speaker_boost: true,
      },
    }),
  });

  if (!elevenRes.ok) {
    const detail = await elevenRes.text().catch(() => "");
    console.error("[tts] ElevenLabs error:", elevenRes.status, detail);

    let message = "Could not generate speech";
    if (elevenRes.status === 401) {
      message = "Invalid ElevenLabs API key";
    } else if (detail.includes("model")) {
      message = "Voice model not available on your plan — try eleven_multilingual_v2";
    }

    return NextResponse.json(
      { error: message },
      { status: elevenRes.status === 401 ? 401 : 502 },
    );
  }

  const audio = await elevenRes.arrayBuffer();

  return new Response(audio, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "private, max-age=3600",
    },
  });
}
