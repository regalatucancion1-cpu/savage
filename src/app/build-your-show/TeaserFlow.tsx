"use client";

import { useState } from "react";

type Vibe = "international" | "latin" | "oldschool" | "fullsend";

const vibes: { id: Vibe; title: string; blurb: string }[] = [
  {
    id: "international",
    title: "International mix",
    blurb: "English pop, disco, house. A crowd from everywhere.",
  },
  {
    id: "latin",
    title: "Latin heavy",
    blurb: "Reggaetón, Bad Bunny, Rosalía. Dancefloor hot from minute one.",
  },
  {
    id: "oldschool",
    title: "Old school",
    blurb: "Motown, funk, rock classics. Parents on the floor till 2am.",
  },
  {
    id: "fullsend",
    title: "Full send",
    blurb: "Techno leanings, late night. Ibiza energy after midnight.",
  },
];

const tracksByVibe: Record<Vibe, { title: string; artist: string }[]> = {
  international: [
    { title: "Don't Stop Me Now", artist: "Queen" },
    { title: "Dance the Night", artist: "Dua Lipa" },
    { title: "September", artist: "Earth, Wind & Fire" },
    { title: "One More Time", artist: "Daft Punk" },
    { title: "Freed From Desire", artist: "Gala" },
    { title: "Mr. Brightside", artist: "The Killers" },
  ],
  latin: [
    { title: "Titi Me Preguntó", artist: "Bad Bunny" },
    { title: "Pepas", artist: "Farruko" },
    { title: "Despechá", artist: "Rosalía" },
    { title: "Gasolina", artist: "Daddy Yankee" },
    { title: "La Bachata", artist: "Manuel Turizo" },
    { title: "TQG", artist: "Karol G, Shakira" },
  ],
  oldschool: [
    { title: "Superstition", artist: "Stevie Wonder" },
    { title: "Ain't No Mountain High Enough", artist: "Marvin Gaye" },
    { title: "Dancing Queen", artist: "ABBA" },
    { title: "I Wanna Dance With Somebody", artist: "Whitney Houston" },
    { title: "Sweet Caroline", artist: "Neil Diamond" },
    { title: "Livin' on a Prayer", artist: "Bon Jovi" },
  ],
  fullsend: [
    { title: "Music Sounds Better With You", artist: "Stardust" },
    { title: "One Kiss", artist: "Calvin Harris, Dua Lipa" },
    { title: "Losing It", artist: "Fisher" },
    { title: "Body", artist: "Loud Luxury" },
    { title: "In My Mind", artist: "Dynoro" },
    { title: "Insomnia", artist: "Faithless" },
  ],
};

const timeline = [
  { time: "23:00", title: "DJ + Band · Set 1", note: "The warm-up. Groove heavy, floor filling." },
  { time: "00:00", title: "DJ + Band · Set 2", note: "Peak. Sax, guitar and drums leave the stage, into the crowd." },
  { time: "01:30", title: "DJ · Late night", note: "Closer flow, non-stop to the end." },
  { time: "02:30", title: "Shutdown", note: "" },
];

type Step = 1 | 2 | 3 | 4;

export default function TeaserFlow() {
  const [step, setStep] = useState<Step>(1);
  const [names, setNames] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [vibe, setVibe] = useState<Vibe | null>(null);
  const [extendHours, setExtendHours] = useState<0 | 1 | 2>(0);

  const canNext1 = names.trim().length > 1 && date.length > 0;
  const canNext2 = venue.trim().length > 1;
  const canNext3 = vibe !== null;

  if (step === 4 && vibe) {
    return (
      <Result
        names={names}
        date={date}
        venue={venue}
        vibe={vibe}
        extendHours={extendHours}
        onExtend={setExtendHours}
        onReset={() => {
          setStep(1);
          setNames("");
          setDate("");
          setVenue("");
          setVibe(null);
          setExtendHours(0);
        }}
      />
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <Progress step={step} />

      <div className="flex flex-1 items-center justify-center px-6 py-16 md:px-14 md:py-24">
        <div className="w-full max-w-2xl">
          {step === 1 && (
            <StepShell
              overline="Step 1 of 3"
              title="Who's getting married, and when?"
              subtitle="We'll use this on your teaser poster."
            >
              <label className="block">
                <span className="text-xs uppercase tracking-[0.3em] text-savage-white/60">
                  Names
                </span>
                <input
                  type="text"
                  placeholder="e.g. Sarah & James"
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-savage-white/20 bg-savage-black px-5 py-4 text-xl text-savage-white outline-none placeholder:text-savage-white/30 focus:border-savage-yellow"
                />
              </label>

              <label className="mt-6 block">
                <span className="text-xs uppercase tracking-[0.3em] text-savage-white/60">
                  Wedding date
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-savage-white/20 bg-savage-black px-5 py-4 text-xl text-savage-white outline-none focus:border-savage-yellow"
                />
              </label>

              <NavRow
                primaryLabel="Next →"
                primaryDisabled={!canNext1}
                onPrimary={() => setStep(2)}
              />
            </StepShell>
          )}

          {step === 2 && (
            <StepShell
              overline="Step 2 of 3"
              title="Where's the party?"
              subtitle="Venue, town, or region. We play destination weddings all over Europe."
            >
              <label className="block">
                <span className="text-xs uppercase tracking-[0.3em] text-savage-white/60">
                  Venue / location
                </span>
                <input
                  type="text"
                  placeholder="e.g. Castell de Caramany, Costa Brava"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-savage-white/20 bg-savage-black px-5 py-4 text-xl text-savage-white outline-none placeholder:text-savage-white/30 focus:border-savage-yellow"
                />
              </label>

              <NavRow
                onBack={() => setStep(1)}
                primaryLabel="Next →"
                primaryDisabled={!canNext2}
                onPrimary={() => setStep(3)}
              />
            </StepShell>
          )}

          {step === 3 && (
            <StepShell
              overline="Step 3 of 3"
              title="What's your crowd?"
              subtitle="We'll shape the teaser tracks around this. No commitment, you'll tune everything after booking."
            >
              <div className="grid gap-3">
                {vibes.map((v) => {
                  const active = vibe === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setVibe(v.id)}
                      className={`text-left rounded-2xl border p-5 transition ${
                        active
                          ? "border-savage-yellow bg-savage-yellow/10"
                          : "border-savage-white/20 hover:border-savage-white/50"
                      }`}
                    >
                      <p
                        className={`font-display uppercase text-xl ${
                          active ? "text-savage-yellow" : "text-savage-white"
                        }`}
                      >
                        {v.title}
                      </p>
                      <p className="mt-1 text-sm text-savage-white/70">
                        {v.blurb}
                      </p>
                    </button>
                  );
                })}
              </div>

              <NavRow
                onBack={() => setStep(2)}
                primaryLabel="See your night →"
                primaryDisabled={!canNext3}
                onPrimary={() => setStep(4)}
              />
            </StepShell>
          )}
        </div>
      </div>
    </div>
  );
}

function Progress({ step }: { step: Step }) {
  return (
    <div className="flex gap-2 px-6 pt-6 md:px-14">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`h-1 flex-1 rounded-full ${
            s <= step ? "bg-savage-yellow" : "bg-savage-white/10"
          }`}
        />
      ))}
    </div>
  );
}

function StepShell({
  overline,
  title,
  subtitle,
  children,
}: {
  overline: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
        {overline}
      </p>
      <h1 className="font-display uppercase text-3xl md:text-5xl mt-4 leading-[0.9]">
        {title}
      </h1>
      <p className="font-editorial italic mt-4 text-lg md:text-xl text-savage-cream max-w-xl">
        {subtitle}
      </p>
      <div className="mt-10">{children}</div>
    </div>
  );
}

function NavRow({
  onBack,
  onPrimary,
  primaryLabel,
  primaryDisabled,
}: {
  onBack?: () => void;
  onPrimary: () => void;
  primaryLabel: string;
  primaryDisabled?: boolean;
}) {
  return (
    <div className="mt-10 flex items-center justify-between gap-4">
      {onBack ? (
        <button
          onClick={onBack}
          className="text-xs uppercase tracking-[0.3em] text-savage-white/60 hover:text-savage-yellow"
        >
          ← Back
        </button>
      ) : (
        <span />
      )}
      <button
        onClick={onPrimary}
        disabled={primaryDisabled}
        className="rounded-full bg-savage-yellow px-7 py-4 font-semibold text-savage-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {primaryLabel}
      </button>
    </div>
  );
}

function Result({
  names,
  date,
  venue,
  vibe,
  extendHours,
  onExtend,
  onReset,
}: {
  names: string;
  date: string;
  venue: string;
  vibe: Vibe;
  extendHours: 0 | 1 | 2;
  onExtend: (v: 0 | 1 | 2) => void;
  onReset: () => void;
}) {
  const tracks = tracksByVibe[vibe];
  const prettyDate = formatDate(date);
  const totalHours = 3 + extendHours;
  const shutdown = extendHours === 0 ? "02:30" : extendHours === 1 ? "03:30" : "04:30";

  return (
    <div className="px-6 py-12 md:px-14 md:py-20">
      <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
        Your savage night · preview
      </p>
      <h1 className="font-display uppercase text-4xl md:text-6xl mt-3 leading-[0.9]">
        Here&apos;s the shape of it.
      </h1>
      <p className="font-editorial italic mt-4 text-lg md:text-xl text-savage-cream max-w-2xl">
        This is a teaser, not a contract. The full setlist gets built with you
        after you book. We don&apos;t freestyle weddings.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Poster */}
        <div className="rounded-3xl bg-savage-ink p-10 md:p-14 text-savage-white border border-savage-white/10">
          <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
            {names} · Savage Night
          </p>
          <h2 className="font-display uppercase mt-4 text-4xl md:text-6xl leading-[0.88]">
            {prettyDate.weekday}
            <br />
            <span className="text-savage-yellow">{prettyDate.main}</span>
            <br />
            <span className="font-editorial italic normal-case text-3xl md:text-5xl">
              {venue}
            </span>
          </h2>

          <div className="mt-10 divide-y divide-savage-white/15 border-y border-savage-white/15">
            {timeline.map((t) => {
              const time = t.title === "Shutdown" ? shutdown : t.time;
              return (
                <div
                  key={t.title}
                  className="grid grid-cols-[90px_1fr] items-baseline gap-6 py-5"
                >
                  <span className="font-display text-2xl text-savage-yellow">
                    {time}
                  </span>
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em]">
                      {t.title}
                    </p>
                    {t.note && (
                      <p className="mt-1 text-savage-white/70">{t.note}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.3em] text-savage-white/60">
              Extend your night · {totalHours}h total
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <HoursPill
                active={extendHours === 0}
                onClick={() => onExtend(0)}
                label="3h · Base"
              />
              <HoursPill
                active={extendHours === 1}
                onClick={() => onExtend(1)}
                label="+1h DJ = 4h"
              />
              <HoursPill
                active={extendHours === 2}
                onClick={() => onExtend(2)}
                label="+2h DJ = 5h · Ibiza mode"
              />
            </div>
          </div>
        </div>

        {/* Sample tracks + CTAs */}
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-savage-white/10 bg-savage-black/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-savage-yellow">
              Six sample tracks from your night
            </p>
            <ul className="mt-4 space-y-3">
              {tracks.map((t) => (
                <li
                  key={t.title}
                  className="flex items-baseline justify-between gap-4 border-b border-savage-white/10 pb-2 last:border-0"
                >
                  <span className="font-editorial italic text-lg">
                    {t.title}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-savage-white/60">
                    {t.artist}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <LeadCapture
            names={names}
            date={date}
            venue={venue}
            vibe={vibe}
            extendHours={extendHours}
            onReset={onReset}
          />
        </div>
      </div>
    </div>
  );
}

function LeadCapture({
  names,
  date,
  venue,
  vibe,
  extendHours,
  onReset,
}: {
  names: string;
  date: string;
  venue: string;
  vibe: Vibe;
  extendHours: 0 | 1 | 2;
  onReset: () => void;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || status === "sending") return;

    setStatus("sending");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          names,
          email,
          phone,
          date,
          venue,
          vibe,
          extendHours,
          source: "build-your-show",
        }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error ?? "Send failed");
      }
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Send failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-savage-yellow bg-savage-yellow/5 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-savage-yellow">
          You&apos;re in the system
        </p>
        <p className="font-display uppercase text-2xl md:text-3xl mt-3 leading-[1]">
          We&apos;ll reply within 24h.
        </p>
        <p className="font-editorial italic mt-3 text-savage-cream">
          Check your inbox, we&apos;ll send you availability, pricing and a quick
          call slot. If you don&apos;t see anything, check spam once.
        </p>
        <button
          onClick={onReset}
          className="mt-6 text-xs uppercase tracking-[0.3em] text-savage-white/60 hover:text-savage-yellow"
        >
          ← Start over
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-savage-white/10 bg-savage-black/60 p-6"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-savage-yellow">
        Reserve your date
      </p>
      <p className="font-editorial italic mt-2 text-savage-cream/90">
        Drop your email and we&apos;ll send availability plus a 15-min call slot.
      </p>

      <label className="mt-5 block">
        <span className="sr-only">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full rounded-xl border border-savage-white/20 bg-savage-black px-4 py-3 text-savage-white outline-none placeholder:text-savage-white/30 focus:border-savage-yellow"
        />
      </label>

      <label className="mt-3 block">
        <span className="sr-only">Phone (optional)</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone / WhatsApp (optional)"
          className="w-full rounded-xl border border-savage-white/20 bg-savage-black px-4 py-3 text-savage-white outline-none placeholder:text-savage-white/30 focus:border-savage-yellow"
        />
      </label>

      <button
        type="submit"
        disabled={!valid || status === "sending"}
        className="mt-5 w-full rounded-full bg-savage-yellow px-6 py-4 font-semibold text-savage-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "sending" ? "Sending…" : "Send me availability"}
      </button>

      {status === "error" && (
        <p className="mt-3 text-sm text-savage-red">
          Something went wrong. {errorMsg}. Try again in a moment.
        </p>
      )}

      <button
        type="button"
        onClick={onReset}
        className="mt-4 block mx-auto text-xs uppercase tracking-[0.3em] text-savage-white/50 hover:text-savage-yellow"
      >
        ← Start over
      </button>
    </form>
  );
}

function HoursPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm transition ${
        active
          ? "bg-savage-yellow text-savage-ink"
          : "border border-savage-white/30 text-savage-white hover:border-savage-yellow"
      }`}
    >
      {label}
    </button>
  );
}

function formatDate(iso: string): { weekday: string; main: string } {
  if (!iso) return { weekday: "Saturday", main: "July 25 · 2028" };
  const d = new Date(iso);
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();
  return {
    weekday,
    main: `${month} ${day} · ${year}`,
  };
}
