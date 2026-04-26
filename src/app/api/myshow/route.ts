import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const TO_EMAIL = process.env.MYSHOW_TO_EMAIL || "chrislogz0@gmail.com";
  const FROM_EMAIL = process.env.MYSHOW_FROM_EMAIL || "Savage Party <onboarding@resend.dev>";

  let body: {
    subject?: string;
    message?: string;
    pdfBase64?: string;
    pdfFilename?: string;
    replyTo?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { subject, message, pdfBase64, pdfFilename, replyTo } = body;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: replyTo || undefined,
      subject: subject || "New show submission",
      text: message || "",
      attachments: pdfBase64
        ? [
            {
              filename: pdfFilename || "myshow.pdf",
              content: pdfBase64,
            },
          ]
        : undefined,
    });
    if (error) throw new Error(error.message || "Resend error");
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("myshow send error", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Send failed" },
      { status: 500 },
    );
  }
}
