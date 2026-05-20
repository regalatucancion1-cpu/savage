import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { createElement, type ReactElement } from "react";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import MyShowPdf from "../../myshow/MyShowPdf";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const TO_EMAIL = process.env.MYSHOW_TO_EMAIL || "infosavageparty@gmail.com";
  const FROM_EMAIL = process.env.MYSHOW_FROM_EMAIL || "Savage Party <onboarding@resend.dev>";

  let body: {
    subject?: string;
    message?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plan?: any;
    pdfBase64?: string;
    pdfFilename?: string;
    replyTo?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { subject, message, plan, pdfBase64, pdfFilename, replyTo } = body;

  // Build the PDF on the server from the plan so the client never has to
  // generate or upload it (keeps mobile memory low and avoids large request
  // bodies). A pre-rendered pdfBase64 is still honoured as a fallback.
  let attachmentContent: Buffer | string | undefined = pdfBase64;
  if (!attachmentContent && plan) {
    try {
      const logoSrc = new URL("/logo-savage.png", req.nextUrl.origin).href;
      attachmentContent = await renderToBuffer(
        createElement(MyShowPdf, { plan, logoSrc }) as ReactElement<DocumentProps>,
      );
    } catch (e) {
      // The email body has every detail, so send without the PDF rather
      // than failing the whole submission.
      console.error("myshow PDF render failed, sending without attachment", e);
    }
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: replyTo || undefined,
      subject: subject || "New show submission",
      text: message || "",
      attachments: attachmentContent
        ? [
            {
              filename: pdfFilename || "myshow.pdf",
              content: attachmentContent,
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
