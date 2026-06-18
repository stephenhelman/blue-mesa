import { NextResponse } from "next/server";
import { getLeadSink } from "@/lib/leads";
import { LeadSinkConfigError, type Lead } from "@/lib/leads/sink";
import { validateLead } from "@/lib/leads/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Hidden field name the form fills only for bots. Real users never see it.
const HONEYPOT_FIELD = "company";

export async function POST(req: Request) {
  // 1) Rate limit per IP.
  const ip = clientIp(req.headers);
  const { allowed, retryAfter } = rateLimit(`lead:${ip}`);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  // 2) Parse body.
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  // 3) Honeypot — if filled, silently accept (don't tip off the bot, don't store).
  if (typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD].trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 4) Validate + normalize.
  const result = validateLead(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: result.errors },
      { status: 400 }
    );
  }

  // 5) Capture via the active sink.
  const lead: Lead = {
    ...result.lead,
    source: "website-consult-form",
    createdAt: new Date().toISOString(),
  };

  try {
    const { ok } = await getLeadSink().capture(lead);
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "We couldn't submit your request. Please call us instead." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    if (err instanceof LeadSinkConfigError) {
      console.error("[/api/lead] sink not configured:", err.message);
      return NextResponse.json(
        { ok: false, error: "Submissions aren't available yet. Please call us." },
        { status: 503 }
      );
    }
    console.error("[/api/lead] unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please call us." },
      { status: 500 }
    );
  }
}
