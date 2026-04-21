import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

type PlanState = {
  names: string;
  eventDate: string;
  venue: string;
  phone: string;
  genres: string[];
  favoriteArtists: string;
  decades: string[];
  bandSongs: string[];
  wishlistSongs: string;
  dropEverythingSong: string;
  crowd: string;
  guestWeight: number;
  mustPlay: string;
  reference: string;
  specialMoments: string;
  doNotPlay: string;
  anythingElse: string;
  involvement: string;
};

type SubmitPayload = {
  token: string;
  plan: PlanState;
};

const TO_EMAIL = "infosavageparty@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM ?? "Savage Web <onboarding@resend.dev>";

function section(title: string, body: string) {
  return `━━━ ${title.toUpperCase()} ━━━\n${body || "(empty)"}\n`;
}

function formatList(items: string[]) {
  if (!items || items.length === 0) return "(none)";
  return items.map((i) => `• ${i}`).join("\n");
}

export async function POST(req: NextRequest) {
  let body: SubmitPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.token || body.token.length < 4) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }
  if (!body.plan || !body.plan.names || !body.plan.eventDate) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const p = body.plan;
  const subject = `My Show · ${p.names} · ${p.eventDate}`;

  const text = [
    section("Token", body.token),
    section("Basics", [
      `Names: ${p.names}`,
      `Event date: ${p.eventDate}`,
      `Venue: ${p.venue}`,
      `Phone: ${p.phone || "(not provided)"}`,
    ].join("\n")),
    section("Musical taste", [
      `Genres:\n${formatList(p.genres)}`,
      "",
      `Favorite artists / bands:\n${p.favoriteArtists || "(empty)"}`,
      "",
      `Decades:\n${formatList(p.decades)}`,
    ].join("\n")),
    section("Selected band songs", formatList(p.bandSongs)),
    section("Wishlist", [
      `Extra song wishes:\n${p.wishlistSongs || "(empty)"}`,
      "",
      `Drop everything song: ${p.dropEverythingSong || "(empty)"}`,
    ].join("\n")),
    section("Crowd", [
      `Vibe: ${p.crowd || "(empty)"}`,
      `Guest weight (0 their taste ↔ 10 ours): ${p.guestWeight}`,
    ].join("\n")),
    section("Must play + references", [
      `Must play at all costs:\n${p.mustPlay || "(empty)"}`,
      "",
      `Reference night / artist:\n${p.reference || "(empty)"}`,
      "",
      `Special moments:\n${p.specialMoments || "(empty)"}`,
    ].join("\n")),
    section("DJ set + extras", [
      `Do NOT play:\n${p.doNotPlay || "(empty)"}`,
      "",
      `Anything else:\n${p.anythingElse || "(empty)"}`,
      "",
      `Involvement: ${p.involvement || "(empty)"}`,
    ].join("\n")),
  ].join("\n");

  console.log("[my-show submit]", body.token, p.names);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[my-show submit] full text\n", text);
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
      subject,
      text,
    });

    if (result.error) {
      console.error("[my-show submit] resend error", result.error);
      return NextResponse.json(
        { ok: false, error: "Email provider error" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true, id: result.data?.id });
  } catch (err) {
    console.error("[my-show submit] send exception", err);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 });
  }
}
