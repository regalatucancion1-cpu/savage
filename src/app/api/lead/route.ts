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

    const clientHtml = clientConfirmationHtml(body);
    const clientText = clientConfirmationText(body);
    const clientResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: body.email,
      replyTo: TO_EMAIL,
      subject: "Savage Party · we got your request",
      text: clientText,
      html: clientHtml,
    });

    if (clientResult.error) {
      console.error("[lead] client confirmation error", clientResult.error);
    }

    return NextResponse.json({ ok: true, delivered: true, id: result.data?.id });
  } catch (err) {
    console.error("[lead] send exception", err);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 });
  }
}

function clientConfirmationText(body: LeadPayload) {
  return [
    `Hey ${body.names},`,
    ``,
    `We got your request for ${body.date} at ${body.venue}.`,
    `You'll hear back from us within 24h with availability and next steps.`,
    ``,
    `If it's urgent, reply to this email or WhatsApp +34 681 955 024.`,
    ``,
    `Savage Party`,
    `DJ + live band · Barcelona`,
    `savageparty.es`,
  ].join("\n");
}

function clientConfirmationHtml(body: LeadPayload) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0e0c0a;color:#f5efe6;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0e0c0a;padding:40px 20px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="background:#141210;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:40px;max-width:100%;">
            <tr>
              <td>
                <p style="margin:0;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#ffc007;">Request received</p>
                <h1 style="margin:16px 0 0;font-size:32px;line-height:1.05;text-transform:uppercase;color:#f5efe6;font-weight:800;">We&rsquo;ll reply within 24h.</h1>
                <p style="margin:20px 0 0;font-size:16px;line-height:1.5;color:rgba(245,239,230,0.8);">
                  Hey ${escapeHtml(body.names)}, thanks for reaching out. We got your request for <strong style="color:#ffc007;">${escapeHtml(body.date)}</strong> at <strong>${escapeHtml(body.venue)}</strong>.
                </p>
                <p style="margin:16px 0 0;font-size:16px;line-height:1.5;color:rgba(245,239,230,0.8);">
                  One of us will come back to you within 24 hours with availability and next steps. If it&rsquo;s urgent, reply to this email or WhatsApp us at +34 681 955 024.
                </p>
                <hr style="border:0;border-top:1px solid rgba(255,255,255,0.08);margin:32px 0;" />
                <p style="margin:0;font-size:12px;letter-spacing:0.25em;text-transform:uppercase;color:#ffc007;">Savage Party</p>
                <p style="margin:6px 0 0;font-size:14px;color:rgba(245,239,230,0.6);">DJ + live band · Barcelona · <a href="https://savageparty.es" style="color:rgba(245,239,230,0.8);text-decoration:none;">savageparty.es</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
