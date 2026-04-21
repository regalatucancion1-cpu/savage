import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

type LeadPayload = {
  names: string;
  email: string;
  phone?: string;
  date: string;
  venue: string;
  vibe: string;
  extendHours: number;
  source?: string;
};

const TO_EMAIL = "infosavageparty@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM ?? "Savage Web <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.names || !body.email || !body.date || !body.venue) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const subject = `New lead · ${body.names} · ${body.date}`;
  const lines = [
    `Names: ${body.names}`,
    `Email: ${body.email}`,
    body.phone ? `Phone: ${body.phone}` : null,
    `Wedding date: ${body.date}`,
    `Venue: ${body.venue}`,
    `Crowd vibe: ${body.vibe}`,
    `Extend hours: +${body.extendHours}h (total ${3 + body.extendHours}h)`,
    body.source ? `Source: ${body.source}` : null,
  ].filter(Boolean);
  const text = lines.join("\n");

  console.log("[lead]", text);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      ok: true,
      delivered: false,
      note: "Logged only. Set RESEND_API_KEY to send emails.",
    });
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: body.email,
      subject,
      text,
    });

    if (result.error) {
      console.error("[lead] resend error", result.error);
      return NextResponse.json(
        { ok: false, error: "Email provider error" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true, id: result.data?.id });
  } catch (err) {
    console.error("[lead] send exception", err);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 });
  }
}
