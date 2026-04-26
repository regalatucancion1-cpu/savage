"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { REPERTOIRE_CATEGORIES } from "@/content/repertoire";
import { pdf } from "@react-pdf/renderer";
import MyShowPdf from "./MyShowPdf";

const BAND_AVATARS = [
  { name: "Chris", role: "DJ + producer", initial: "C", color: "bg-savage-yellow text-savage-ink" },
  { name: "Marc", role: "Drums", initial: "M", color: "bg-savage-red text-savage-cream" },
  { name: "Joel", role: "Sax", initial: "J", color: "bg-savage-cream text-savage-ink" },
  { name: "Pau", role: "Guitar", initial: "P", color: "bg-savage-ink text-savage-yellow border border-savage-yellow/40" },
];

const CROWD_VIBES = [
  "They go all night",
  "They fade by 1am",
  "They dance to anything",
  "Need warm-up",
  "Mixed generations",
  "Lots of older family",
  "Young crew, 25-35",
  "Reggaeton yes",
  "Reggaeton no",
];

const LIVE_GENRES = [
  "Pop",
  "Classic rock",
  "Hip hop · R&B",
  "Funk · Disco",
  "80's",
  "90's · 2000's",
  "Indie",
  "Latin · Reggaeton",
  "Soul · Motown",
];

const DJ_VIBE_CHIPS = [
  "Club techno-ish",
  "Afro house",
  "2010's commercial singalong",
  "Elegant house",
  "Open format peak",
  "Reggaeton",
  "Disco closing",
  "Soft afterparty",
];

type FirstDance = "dj" | "none" | null;
type DjRequests = "yes" | "filtered" | "no" | null;
type DressCode = "savage" | "suits" | null;

const PARTY_START_OPTIONS = ["20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"];

type Plan = {
  names: string;
  eventDate: string;
  partyStart: string;
  djExtraHours: number;
  venue: string;
  phone: string;
  email: string;
  guests: string;
  ages: string;
  crowdVibes: string[];
  dressCode: DressCode;
  liveGenres: string[];
  liveSet: string[];
  liveMustPlay: string;
  firstDance: FirstDance;
  firstDanceSong: string;
  firstDanceLink: string;
  djVibes: string[];
  djReferenceUrl: string;
  djMustBangers: string;
  djMustSingalongs: string;
  djMustClosing: string;
  djRequests: DjRequests;
  lastSong: string;
  vetos: string;
  notes: string;
};

const INITIAL: Plan = {
  names: "",
  eventDate: "",
  partyStart: "",
  djExtraHours: 0,
  venue: "",
  phone: "",
  email: "",
  guests: "",
  ages: "",
  crowdVibes: [],
  dressCode: null,
  liveGenres: [],
  liveSet: [],
  liveMustPlay: "",
  firstDance: null,
  firstDanceSong: "",
  firstDanceLink: "",
  djVibes: [],
  djReferenceUrl: "",
  djMustBangers: "",
  djMustSingalongs: "",
  djMustClosing: "",
  djRequests: null,
  lastSong: "",
  vetos: "",
  notes: "",
};

type StepDef = {
  id: string;
  part: "intro" | "live" | "dj" | "outro";
  partLabel: string;
  title: string;
  hint?: string;
  splash?: boolean;
};

const STEPS: StepDef[] = [
  { id: "basics", part: "intro", partLabel: "The basics", title: "Let's start with you.", hint: "Names, date, venue, party start. We confirm against the contract, no surprises." },
  { id: "welcome", part: "intro", partLabel: "Welcome", title: "You're in." },
  { id: "crowd", part: "intro", partLabel: "Your people", title: "Who's going to be on the floor?", hint: "Helps us calibrate when to hit and when to chill." },
  { id: "dress", part: "intro", partLabel: "Dress code", title: "How do we show up?", hint: "We match your wedding's vibe so the band looks like part of the room, not a vendor." },
  { id: "splash-live", part: "live", partLabel: "Part one", title: "LIVE BAND", splash: true },
  { id: "live-genres", part: "live", partLabel: "Live · 1 of 4", title: "What genres represent you?", hint: "Tick what you actually listen to. Don't filter for 'wedding'." },
  { id: "live-songs", part: "live", partLabel: "Live · 2 of 4", title: "Pick from our live repertoire.", hint: "Everything we rehearse. Tap to add to your setlist, watch it grow on the right." },
  { id: "live-must", part: "live", partLabel: "Live · 3 of 4", title: "Anything we missed?", hint: "If there's a song that's NOT in our repertoire and you'd love to hear it live, drop it here. We'll see what we can pull off." },
  { id: "first-dance", part: "live", partLabel: "Live · 4 of 4", title: "Any dances to open the party?", hint: "Sometimes you do the first dances at dinner. If they happen at the party instead, tell us how." },
  { id: "splash-dj", part: "dj", partLabel: "Part two", title: "DJ SET", splash: true },
  { id: "dj-vibes", part: "dj", partLabel: "DJ · 1 of 5", title: "Where's the DJ set heading?", hint: "When the band steps off, this is the map." },
  { id: "dj-ref", part: "dj", partLabel: "DJ · 2 of 5", title: "Drop a reference playlist.", hint: "More useful than a hundred questions." },
  { id: "dj-must", part: "dj", partLabel: "DJ · 3 of 5", title: "DJ must-plays.", hint: "Different list than the live one. Songs that have to drop in the booth, no matter what." },
  { id: "dj-requests", part: "dj", partLabel: "DJ · 4 of 5", title: "Do we take requests from your guests?", hint: "Be honest." },
  { id: "last-song", part: "dj", partLabel: "DJ · 5 of 5", title: "Last song of the night.", hint: "The one when the lights come up and you walk out." },
  { id: "vetos", part: "outro", partLabel: "What stays out", title: "What we DON'T play.", hint: "Be ruthless. Every veto saves an awkward moment." },
  { id: "notes", part: "outro", partLabel: "One more thing", title: "Anything else we should know?", hint: "Surprises, family drama, dedications, the song your mum needs to hear." },
  { id: "review", part: "outro", partLabel: "Wrap it", title: "This is your night.", hint: "Quick check, then we send it to rehearsal." },
];

export default function PreviewExperience() {
  const [plan, setPlan] = useState<Plan>(INITIAL);
  const [stepIdx, setStepIdx] = useState(0);
  const [showPoster, setShowPoster] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showPanelMobile, setShowPanelMobile] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const step = STEPS[stepIdx];
  const totalSteps = STEPS.length;
  const isLast = stepIdx === totalSteps - 1;
  const isFirst = stepIdx === 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [stepIdx]);

  async function generatePdfBlob(): Promise<Blob> {
    const logoSrc = `${window.location.origin}/logo-savage.png`;
    return await pdf(<MyShowPdf plan={plan} logoSrc={logoSrc} />).toBlob();
  }

  async function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1] ?? "");
      };
      reader.onerror = () => reject(new Error("Failed to read PDF blob"));
      reader.readAsDataURL(blob);
    });
  }

  function pdfFilename(): string {
    const slug = (plan.names || "show").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const dateSlug = (plan.eventDate || "").replace(/-/g, "");
    return `myshow-${slug}${dateSlug ? "-" + dateSlug : ""}.pdf`;
  }

  async function handleDownloadPdf() {
    try {
      const blob = await generatePdfBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFilename();
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit() {
    if (sending) return;
    setSubmitError(null);
    setSending(true);
    try {
      const message = buildEmailBody(plan);
      const subject = `New show submission from ${plan.names || "(no name)"} for ${plan.eventDate ? formatDate(plan.eventDate) : "an upcoming wedding"}`;

      const blob = await generatePdfBlob();
      const pdfBase64 = await blobToBase64(blob);

      const res = await fetch("/api/myshow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          message,
          pdfBase64,
          pdfFilename: pdfFilename(),
          replyTo: plan.email || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Submit failed");
      setShowPoster(false);
      setShowSummary(false);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitError(err instanceof Error ? err.message : "Submit failed");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return <SuccessScreen names={plan.names} onDownload={handleDownloadPdf} />;
  }

  function update<K extends keyof Plan>(k: K, v: Plan[K]) {
    setPlan((prev) => ({ ...prev, [k]: v }));
  }
  function toggleArr<K extends "crowdVibes" | "liveGenres" | "djVibes" | "liveSet">(k: K, v: string) {
    setPlan((prev) => {
      const arr = prev[k];
      return { ...prev, [k]: arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v] };
    });
  }

  return (
    <main className="min-h-screen bg-savage-black text-savage-white flex flex-col">
      <Header plan={plan} />

      {!step.splash && <ProgressBar step={stepIdx + 1} total={totalSteps} part={step.part} />}

      <div className="flex-1 grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px]">
        <section className={step.splash
          ? "flex items-center justify-center px-5 py-16 min-h-[60vh]"
          : "px-5 sm:px-8 md:px-14 py-10 md:py-16 max-w-3xl mx-auto w-full pb-32 lg:pb-16"
        }>
          <div key={step.id} className="w-full">
            {step.splash ? (
              <SplashStep step={step} onContinue={() => setStepIdx(stepIdx + 1)} onBack={() => setStepIdx(stepIdx - 1)} />
            ) : (
              <>
                <StepHeader part={step.partLabel} title={step.title} hint={step.hint} accent={partAccent(step.part)} />
                <div className="mt-8 sm:mt-10">
                  <StepBody
                    step={step.id}
                    plan={plan}
                    update={update}
                    toggleArr={toggleArr}
                    onShowPoster={() => setShowPoster(true)}
                    onShowSummary={() => setShowSummary(true)}
                  />
                </div>
                <Nav
                  isFirst={isFirst}
                  isLast={isLast}
                  onBack={() => setStepIdx(stepIdx - 1)}
                  onNext={() => isLast ? handleSubmit() : setStepIdx(stepIdx + 1)}
                  nextLabel={isLast ? (sending ? "Sending to the band…" : "Send it to the band →") : "Next →"}
                  accent={isLast ? "red" : partAccent(step.part)}
                  disabled={sending}
                />
                {isLast && submitError && (
                  <p className="mt-4 text-sm text-savage-red">
                    Something went wrong: {submitError}. Try again in a moment.
                  </p>
                )}
              </>
            )}
          </div>
        </section>

        <aside className="hidden lg:block border-l border-savage-white/10 bg-savage-black/60">
          <SidePanel plan={plan} />
        </aside>
      </div>

      {!step.splash && (
        <button
          onClick={() => setShowPanelMobile(true)}
          className="lg:hidden fixed bottom-5 right-5 z-30 rounded-full bg-savage-yellow text-savage-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-savage-yellow/30"
        >
          Your show · {plan.liveSet.length}
        </button>
      )}

      <AnimatePresence>
        {showPanelMobile && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="lg:hidden fixed inset-0 z-40 bg-savage-black overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-savage-black border-b border-savage-white/10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-savage-yellow">Your show, live</p>
              <button onClick={() => setShowPanelMobile(false)} className="text-savage-white/60 text-sm py-2 px-3 -mr-2">Close ✕</button>
            </div>
            <SidePanel plan={plan} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPoster && (
          <PosterModal onClose={() => setShowPoster(false)} plan={plan} />
        )}
        {showSummary && (
          <SummaryModal onClose={() => setShowSummary(false)} plan={plan} onSubmit={handleSubmit} sending={sending} onDownload={handleDownloadPdf} />
        )}
      </AnimatePresence>
    </main>
  );
}

function partAccent(part: StepDef["part"]): "yellow" | "cream" | "red" | "white" {
  if (part === "live") return "yellow";
  if (part === "dj") return "cream";
  if (part === "outro") return "red";
  return "white";
}

// ============== HEADER + PROGRESS ==============

function Header({ plan }: { plan: Plan }) {
  return (
    <header className="border-b border-savage-white/10 px-5 sm:px-6 md:px-10 py-4">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image src="/logo-savage.png" alt="Savage Party" width={88} height={88} className="w-[72px] h-auto sm:w-[88px]" priority />
        </Link>
        <div className="hidden md:flex items-center gap-3">
          <div className="flex -space-x-2">
            {BAND_AVATARS.map((a) => (
              <div
                key={a.name}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-savage-black ${a.color}`}
                title={`${a.name} · ${a.role}`}
              >
                {a.initial}
              </div>
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-savage-white/60">
            Your channel with the band
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-savage-yellow font-medium">{plan.names || "Your names"}</p>
          <p className="text-[10px] text-savage-white/50">{plan.eventDate ? formatDate(plan.eventDate) : "—"}</p>
        </div>
      </div>
    </header>
  );
}

function formatDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function ProgressBar({ step, total, part }: { step: number; total: number; part: StepDef["part"] }) {
  const partColors: Record<StepDef["part"], string> = {
    intro: "bg-savage-white/40",
    live: "bg-savage-yellow",
    dj: "bg-savage-cream",
    outro: "bg-savage-red",
  };
  return (
    <div className="px-5 sm:px-8 md:px-14 pt-5">
      <div className="max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-savage-white/50">
        <span>Step {String(step).padStart(2, "0")} of {total}</span>
        <span className="text-savage-yellow">{Math.round((step / total) * 100)}%</span>
      </div>
      <div className="mt-3 flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i + 1 <= step ? partColors[part] : "bg-savage-white/10"
            }`}
          />
        ))}
      </div>
      </div>
    </div>
  );
}

function StepHeader({ part, title, hint, accent }: { part: string; title: string; hint?: string; accent: "yellow" | "cream" | "red" | "white" }) {
  const accentColor = accent === "yellow" ? "text-savage-yellow" : accent === "cream" ? "text-savage-cream" : accent === "red" ? "text-savage-red" : "text-savage-white";
  return (
    <div>
      <p className={`text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold ${accentColor}`}>
        {part}
      </p>
      <h1 className="font-display uppercase mt-3 sm:mt-4 text-[1.5rem] sm:text-[2.25rem] md:text-[3.25rem] leading-[1] sm:leading-[0.95] text-savage-white max-w-3xl break-words">
        {title}
      </h1>
      {hint && (
        <p className="font-editorial italic mt-4 text-base sm:text-lg text-savage-cream/80 max-w-xl leading-relaxed">
          {hint}
        </p>
      )}
    </div>
  );
}

function Nav({ isFirst, onBack, onNext, nextLabel, accent, disabled }: {
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  accent: "yellow" | "cream" | "red" | "white";
  disabled?: boolean;
}) {
  const btnClass =
    accent === "red" ? "bg-savage-red text-savage-cream" :
    accent === "cream" ? "bg-savage-cream text-savage-ink" :
    "bg-savage-yellow text-savage-ink";
  return (
    <div className="mt-12 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
      {!isFirst ? (
        <button onClick={onBack} className="text-xs uppercase tracking-[0.3em] text-savage-white/60 hover:text-savage-yellow py-3 px-3 -mx-3 -my-3 self-start sm:self-auto">
          ← Back
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
      <button
        onClick={onNext}
        disabled={disabled}
        className={`rounded-full px-6 sm:px-7 py-4 text-sm font-bold uppercase tracking-[0.2em] transition ${btnClass} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"} w-full sm:w-auto`}
      >
        {isFirst ? "Let's go →" : nextLabel}
      </button>
    </div>
  );
}

// ============== SPLASH ==============

function SplashStep({ step, onContinue, onBack }: { step: StepDef; onContinue: () => void; onBack: () => void }) {
  const isLive = step.id === "splash-live";
  const accent = isLive ? "text-savage-yellow" : "text-savage-cream";
  const buttonBg = isLive ? "bg-savage-yellow text-savage-ink" : "bg-savage-cream text-savage-ink";
  return (
    <div className="text-center max-w-2xl mx-auto relative">
      {!isLive && <div className="absolute inset-0 halftone opacity-[0.05] pointer-events-none" />}
      <div className="relative">
        <p className={`text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] font-bold ${accent} mb-6`}>
          {step.partLabel}
        </p>
        <h1 className={`font-display uppercase text-[2.75rem] sm:text-[5rem] md:text-[7rem] leading-[0.9] sm:leading-[0.85] break-words ${accent}`}>
          {step.title}
        </h1>
        <p className="font-editorial italic mt-8 text-lg sm:text-xl text-savage-cream/80 max-w-md mx-auto">
          {isLive
            ? "Two hours. Four musicians. Sax, guitar and drums roaming the floor. Songs you actually want."
            : "From 23:30 to close. The booth takes over. This is where the night gets long."}
        </p>
        <div className="mt-12 flex flex-col-reverse sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
          <button onClick={onBack} className="text-xs uppercase tracking-[0.3em] text-savage-white/50 hover:text-savage-white py-3 px-3 -mx-3 -my-3">
            ← Back
          </button>
          <button
            onClick={onContinue}
            className={`rounded-full px-6 sm:px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] hover:brightness-110 transition w-full sm:w-auto ${buttonBg}`}
          >
            {isLive ? "Start the live show →" : "Step into the booth →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============== STEP BODY ==============

function StepBody({ step, plan, update, toggleArr, onShowPoster, onShowSummary }: {
  step: string;
  plan: Plan;
  update: <K extends keyof Plan>(k: K, v: Plan[K]) => void;
  toggleArr: <K extends "crowdVibes" | "liveGenres" | "djVibes" | "liveSet">(k: K, v: string) => void;
  onShowPoster: () => void;
  onShowSummary: () => void;
}) {
  switch (step) {
    case "welcome":
      return <WelcomeStep names={plan.names} />;
    case "basics":
      return (
        <div className="space-y-6">
          <Field label="Your names *">
            <input
              type="text"
              value={plan.names}
              onChange={(e) => update("names", e.target.value)}
              className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-5 py-4 text-lg text-savage-white outline-none focus:border-savage-yellow"
              placeholder="e.g. Sarah & James"
            />
          </Field>
          <Field label="Wedding date *">
            <input
              type="date"
              value={plan.eventDate}
              onChange={(e) => update("eventDate", e.target.value)}
              className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-5 py-4 text-lg text-savage-white outline-none focus:border-savage-yellow"
            />
          </Field>
          <Field label="Reception party time *" hint="When the live show kicks off. We use this to build your real night timeline.">
            <TimeBubbles
              value={plan.partyStart}
              onChange={(v) => update("partyStart", v)}
              options={PARTY_START_OPTIONS}
            />
          </Field>
          <Field label="Extra DJ hours" hint="2h of live show + 1h of DJ are already included. Add extras if you want the night to run longer.">
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3, 4].map((h) => {
                const active = plan.djExtraHours === h;
                return (
                  <button
                    key={h}
                    onClick={() => update("djExtraHours", h)}
                    className={`font-display text-sm sm:text-base px-4 py-2.5 rounded-full border-2 transition tracking-wide ${
                      active
                        ? "bg-savage-yellow text-savage-ink border-savage-yellow"
                        : "border-savage-white/15 text-savage-white/80 hover:border-savage-white/40"
                    }`}
                  >
                    {h === 0 ? "Just included" : `+${h}h`}
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Venue *">
            <input
              type="text"
              value={plan.venue}
              onChange={(e) => update("venue", e.target.value)}
              className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-5 py-4 text-lg text-savage-white outline-none focus:border-savage-yellow"
              placeholder="e.g. Castell de Caramany"
            />
          </Field>
          <Field label="Phone / WhatsApp *">
            <input
              type="tel"
              value={plan.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-5 py-4 text-lg text-savage-white outline-none focus:border-savage-yellow"
              placeholder="+34 …"
            />
          </Field>
          <Field label="Email *">
            <input
              type="email"
              value={plan.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-5 py-4 text-lg text-savage-white outline-none focus:border-savage-yellow"
              placeholder="you@example.com"
            />
          </Field>
        </div>
      );
    case "dress":
      return (
        <Radio
          options={[
            { id: "savage", label: "Savage style", subtitle: "Elegant but funky. Our usual look. Works for most weddings." },
            { id: "suits", label: "Full suits, gala", subtitle: "Black tie or formal wedding. We dress to match the room." },
          ]}
          value={plan.dressCode}
          onChange={(v) => update("dressCode", v as DressCode)}
        />
      );
    case "crowd":
      return (
        <div className="space-y-8">
          <Field label="Headcount">
            <input
              type="text"
              value={plan.guests}
              onChange={(e) => update("guests", e.target.value)}
              className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-5 py-4 text-lg text-savage-white outline-none focus:border-savage-yellow"
              placeholder="120"
            />
          </Field>
          <Field label="Age range">
            <input
              type="text"
              value={plan.ages}
              onChange={(e) => update("ages", e.target.value)}
              className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-5 py-4 text-lg text-savage-white outline-none focus:border-savage-yellow"
              placeholder="Mostly 25-55, lots of older family…"
            />
          </Field>
          <Field label="Crowd vibe" hint="Tick what applies.">
            <Chips options={CROWD_VIBES} selected={plan.crowdVibes} onToggle={(v) => toggleArr("crowdVibes", v)} />
          </Field>
        </div>
      );
    case "live-genres":
      return (
        <Field hint="Pick what you actually listen to. Don't filter for 'wedding'.">
          <Chips options={LIVE_GENRES} selected={plan.liveGenres} onToggle={(v) => toggleArr("liveGenres", v)} large />
        </Field>
      );
    case "live-songs":
      return (
        <RepertoirePicker
          selected={plan.liveSet}
          onToggle={(v) => toggleArr("liveSet", v)}
        />
      );
    case "live-must":
      return (
        <Field label="One per line. Any artist, any style." hint="No promises, but we&rsquo;ll try. The more honest, the better.">
          <textarea
            rows={9}
            value={plan.liveMustPlay}
            onChange={(e) => update("liveMustPlay", e.target.value)}
            className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-5 py-4 text-base text-savage-white outline-none focus:border-savage-yellow resize-none leading-relaxed"
            placeholder="Don't Stop Believin' — Journey&#10;Use Somebody — Kings of Leon&#10;…"
          />
        </Field>
      );
    case "first-dance":
      return (
        <div className="space-y-6">
          <Radio
            options={[
              { id: "dj", label: "Yes, DJ plays it", subtitle: "Original track or the version you send us." },
              { id: "none", label: "No, already done at dinner", subtitle: "We'll skip straight into the live show." },
            ]}
            value={plan.firstDance}
            onChange={(v) => update("firstDance", v as FirstDance)}
          />
          {plan.firstDance === "dj" && (
            <div className="space-y-5">
              <Field label="Title and artist">
                <input
                  type="text"
                  value={plan.firstDanceSong}
                  onChange={(e) => update("firstDanceSong", e.target.value)}
                  className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-5 py-4 text-lg text-savage-white outline-none focus:border-savage-yellow"
                  placeholder="Can't Help Falling in Love — Elvis"
                />
              </Field>
              <Field
                label="Link (optional)"
                hint="Spotify, YouTube, Apple Music. Only if it's a specific version or arrangement we should match."
              >
                <input
                  type="url"
                  value={plan.firstDanceLink}
                  onChange={(e) => update("firstDanceLink", e.target.value)}
                  className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-5 py-4 text-base text-savage-white outline-none focus:border-savage-yellow"
                  placeholder="https://open.spotify.com/track/…"
                />
              </Field>
            </div>
          )}
        </div>
      );
    case "dj-vibes":
      return (
        <DJWrap>
          <Field hint="Tick all that apply, or hit + to add your own (EDM, drum & bass, whatever you're into).">
            <Chips options={DJ_VIBE_CHIPS} selected={plan.djVibes} onToggle={(v) => toggleArr("djVibes", v)} accent="cream" large allowCustom />
          </Field>
        </DJWrap>
      );
    case "dj-ref":
      return (
        <DJWrap>
          <Field label="Spotify, Apple Music, SoundCloud…">
            <input
              type="url"
              value={plan.djReferenceUrl}
              onChange={(e) => update("djReferenceUrl", e.target.value)}
              className="w-full bg-savage-ink/60 border border-savage-cream/20 rounded-xl px-5 py-4 text-lg text-savage-cream outline-none focus:border-savage-cream"
              placeholder="https://open.spotify.com/playlist/…"
            />
          </Field>
        </DJWrap>
      );
    case "dj-must":
      return (
        <DJWrap>
          <p className="text-savage-cream/60 text-sm mb-6 -mt-2">Split your must-plays by moment. One per line in each box. The DJ uses these as anchors when reading the floor.</p>
          <div className="space-y-5">
            <DJBox
              label="Peak bangers"
              hint="High energy, the drops. When the floor is locked in."
              value={plan.djMustBangers}
              onChange={(v) => update("djMustBangers", v)}
              placeholder={"One More Time — Daft Punk\nMusic Sounds Better With You — Stardust"}
            />
            <DJBox
              label="Singalongs / anthems"
              hint="When the crowd shouts the lyrics back at you."
              value={plan.djMustSingalongs}
              onChange={(v) => update("djMustSingalongs", v)}
              placeholder={"Mr. Brightside — The Killers\nDancing Queen — ABBA"}
            />
            <DJBox
              label="Closing vibes"
              hint="Last hour, the slower fade out before the lights come up."
              value={plan.djMustClosing}
              onChange={(v) => update("djMustClosing", v)}
              placeholder={"Strobe — deadmau5\nClosing Time — Semisonic"}
            />
          </div>
        </DJWrap>
      );
    case "dj-requests":
      return (
        <DJWrap>
          <Radio
            accent="cream"
            options={[
              { id: "yes", label: "Yes, open mic", subtitle: "If the song fits the flow, I drop it" },
              { id: "filtered", label: "Yes, but filtered through us", subtitle: "We approve before it goes on" },
              { id: "no", label: "No, you decide", subtitle: "Zero requests from the floor" },
            ]}
            value={plan.djRequests}
            onChange={(v) => update("djRequests", v as DjRequests)}
          />
        </DJWrap>
      );
    case "last-song":
      return (
        <DJWrap>
          <Field label="Title and artist">
            <input
              type="text"
              value={plan.lastSong}
              onChange={(e) => update("lastSong", e.target.value)}
              className="w-full bg-savage-ink/60 border border-savage-cream/20 rounded-xl px-5 py-4 text-lg text-savage-cream outline-none focus:border-savage-cream"
              placeholder="Closing Time — Semisonic"
            />
          </Field>
        </DJWrap>
      );
    case "vetos":
      return (
        <Field label="One per line.">
          <textarea
            rows={6}
            value={plan.vetos}
            onChange={(e) => update("vetos", e.target.value)}
            className="w-full bg-savage-ink/40 border border-savage-red/30 rounded-xl px-5 py-4 text-base text-savage-white outline-none focus:border-savage-red resize-none leading-relaxed"
            placeholder="Macarena&#10;Despacito"
          />
        </Field>
      );
    case "notes":
      return (
        <Field label="Anything">
          <textarea
            rows={6}
            value={plan.notes}
            onChange={(e) => update("notes", e.target.value)}
            className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-5 py-4 text-base text-savage-white outline-none focus:border-savage-yellow resize-none leading-relaxed"
            placeholder="Surprises, family drama, dedications…"
          />
        </Field>
      );
    case "review":
      return <ReviewStep plan={plan} onShowPoster={onShowPoster} onShowSummary={onShowSummary} />;
    default:
      return null;
  }
}

// ============== WELCOME ==============

function WelcomeStep({ names }: { names: string }) {
  const display = names.trim() || "You two";
  return (
    <div className="space-y-6">
      <p className="font-display uppercase text-savage-yellow text-xl sm:text-2xl md:text-3xl break-words">
        {display} — locked in.
      </p>
      <p className="text-savage-white/90 leading-relaxed text-lg sm:text-xl">
        Welcome to Savage. From now on you&apos;re not just clients. <span className="text-savage-yellow font-bold">You&apos;re part of the band.</span>
      </p>
      <p className="text-savage-white/85 leading-relaxed text-base sm:text-lg">
        Being in the band means one thing, bring that attitude with you. Tell us what you really want, what you really can&apos;t stand, and what you can&apos;t imagine the night without. The truer you are, the harder we hit.
      </p>
      <div className="rounded-2xl border border-savage-yellow/30 bg-savage-yellow/5 p-5 sm:p-6 mt-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-savage-yellow font-bold mb-3">How this works</p>
        <ul className="space-y-2 text-savage-white/80 text-sm sm:text-base leading-relaxed">
          <li>· Two parts. <span className="text-savage-yellow font-bold">LIVE BAND</span> first, <span className="text-savage-cream font-bold">DJ SET</span> after.</li>
          <li>· Around 10 minutes in one go. Don&rsquo;t close the tab, nothing saves until you hit send.</li>
          <li>· Once you submit it&rsquo;s with the band. We&rsquo;ll write to you only if something needs clarifying.</li>
        </ul>
      </div>
    </div>
  );
}

// ============== REVIEW ==============

function ReviewStep({ onShowPoster, onShowSummary }: {
  plan: Plan;
  onShowPoster: () => void;
  onShowSummary: () => void;
}) {
  return (
    <div className="space-y-6">
      <p className="text-savage-white/85 leading-relaxed text-base sm:text-lg">
        Two things to check before you send. The poster is yours, dedicated, you can download it. The summary is the full show spec, that one goes straight to the band.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <button
          onClick={onShowPoster}
          className="text-left rounded-2xl border border-savage-yellow/40 bg-savage-yellow/5 hover:bg-savage-yellow/15 transition p-6 group"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-savage-yellow font-bold">01 · Yours</p>
          <h3 className="font-display uppercase text-2xl mt-3 text-savage-white group-hover:text-savage-yellow transition">Your show poster</h3>
          <p className="text-savage-white/60 text-sm mt-3 leading-relaxed">A dedicated festival-style poster with your names, date and venue. Download as PNG to share.</p>
          <p className="text-savage-yellow text-xs uppercase tracking-[0.3em] mt-4">Open →</p>
        </button>
        <button
          onClick={onShowSummary}
          className="text-left rounded-2xl border border-savage-cream/40 bg-savage-cream/5 hover:bg-savage-cream/15 transition p-6 group"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-savage-cream font-bold">02 · The spec</p>
          <h3 className="font-display uppercase text-2xl mt-3 text-savage-white group-hover:text-savage-cream transition">Show summary</h3>
          <p className="text-savage-white/60 text-sm mt-3 leading-relaxed">Everything you decided, structured like a document. Download as PDF. The band gets the same.</p>
          <p className="text-savage-cream text-xs uppercase tracking-[0.3em] mt-4">Open →</p>
        </button>
      </div>

      <p className="text-savage-white/60 text-sm leading-relaxed">
        When you hit <span className="text-savage-red font-bold">Send it to the band</span>, the show summary goes straight to Chris. If we have any doubt we&rsquo;ll write to you, otherwise consider it locked.
      </p>
    </div>
  );
}

// ============== REPERTOIRE PICKER ==============

function RepertoirePicker({ selected, onToggle }: {
  selected: string[];
  onToggle: (song: string) => void;
}) {
  return (
    <div className="space-y-8">
      {REPERTOIRE_CATEGORIES.map((cat) => (
        <div key={cat.id}>
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-xs uppercase tracking-[0.3em] text-savage-yellow font-bold">{cat.title}</p>
            <p className="text-[10px] uppercase tracking-wider text-savage-white/40">
              {cat.songs.filter((s) => selected.includes(s)).length} / {cat.songs.length}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {cat.songs.map((s) => {
              const active = selected.includes(s);
              const [title, artist] = s.split(" — ");
              return (
                <motion.button
                  key={s}
                  onClick={() => onToggle(s)}
                  whileTap={{ scale: 0.97 }}
                  className={`text-left rounded-xl border p-3 flex items-center gap-3 transition ${
                    active
                      ? "border-savage-yellow bg-savage-yellow/10"
                      : "border-savage-white/15 hover:border-savage-white/40"
                  }`}
                >
                  <SongCover title={title} accent="yellow" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-savage-white truncate">{title}</p>
                    <p className="text-xs text-savage-white/50 truncate">{artist || ""}</p>
                  </div>
                  <span className={`text-xs ${active ? "text-savage-yellow" : "text-savage-white/30"}`}>
                    {active ? "✓" : "+"}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============== FORM PRIMITIVES ==============

function Field({ label, hint, children }: { label?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      {label && <p className="text-[10px] uppercase tracking-[0.3em] text-savage-white/60 mb-3">{label}</p>}
      {hint && <p className="text-savage-white/55 text-sm mb-4">{hint}</p>}
      {children}
    </div>
  );
}

function TimeBubbles({ value, onChange, options }: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x"
      style={{
        maskImage: "linear-gradient(to right, transparent 0, black 12px, black calc(100% - 24px), transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0, black 12px, black calc(100% - 24px), transparent 100%)",
      }}
    >
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`shrink-0 snap-start font-display text-sm sm:text-base px-3.5 sm:px-4 py-2.5 rounded-full border-2 transition tracking-wide ${
              active
                ? "bg-savage-yellow text-savage-ink border-savage-yellow"
                : "border-savage-white/15 text-savage-white/80 hover:border-savage-white/40"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function Chips({ options, selected, onToggle, accent = "yellow", large, allowCustom }: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  accent?: "yellow" | "cream";
  large?: boolean;
  allowCustom?: boolean;
}) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const customs = selected.filter((s) => !options.includes(s));
  const allOptions = [...options, ...customs];
  const activeClass =
    accent === "cream"
      ? "bg-savage-cream text-savage-ink border-savage-cream"
      : "bg-savage-yellow text-savage-ink border-savage-yellow";
  const sizeClass = large ? "text-sm px-4 py-2.5" : "text-xs px-3 py-2";

  function commit() {
    const v = draft.trim();
    if (v && !selected.includes(v)) onToggle(v);
    setDraft("");
    setAdding(false);
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {allOptions.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`uppercase tracking-wider rounded-full border transition ${sizeClass} ${
              active ? activeClass : "border-savage-white/20 text-savage-white/70 hover:border-savage-white/50"
            }`}
          >
            {opt}
          </button>
        );
      })}
      {allowCustom && (
        adding ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit();
              }
              if (e.key === "Escape") {
                setDraft("");
                setAdding(false);
              }
            }}
            onBlur={commit}
            placeholder="Type a genre and press enter"
            className={`uppercase tracking-wider rounded-full border-2 bg-savage-black/60 outline-none transition ${sizeClass} ${
              accent === "cream" ? "border-savage-cream text-savage-cream" : "border-savage-yellow text-savage-yellow"
            } w-full sm:w-auto sm:min-w-[200px]`}
          />
        ) : (
          <button
            onClick={() => setAdding(true)}
            className={`uppercase tracking-wider rounded-full border-2 border-dashed transition ${sizeClass} ${
              accent === "cream"
                ? "border-savage-cream/40 text-savage-cream/70 hover:border-savage-cream hover:text-savage-cream"
                : "border-savage-yellow/40 text-savage-yellow/70 hover:border-savage-yellow hover:text-savage-yellow"
            }`}
          >
            + Add
          </button>
        )
      )}
    </div>
  );
}

function Radio<T extends string>({ options, value, onChange, accent = "yellow" }: {
  options: { id: T; label: string; subtitle?: string }[];
  value: T | null;
  onChange: (v: T) => void;
  accent?: "yellow" | "cream";
}) {
  return (
    <div className="grid gap-3">
      {options.map((opt) => {
        const active = value === opt.id;
        const activeBorder = accent === "cream" ? "border-savage-cream bg-savage-cream/10" : "border-savage-yellow bg-savage-yellow/10";
        const activeText = accent === "cream" ? "text-savage-cream" : "text-savage-yellow";
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`text-left rounded-2xl border-2 px-5 py-4 transition ${
              active ? activeBorder : "border-savage-white/15 hover:border-savage-white/40"
            }`}
          >
            <p className={`text-base font-bold ${active ? activeText : "text-savage-white"}`}>{opt.label}</p>
            {opt.subtitle && <p className="text-xs text-savage-white/55 mt-1">{opt.subtitle}</p>}
          </button>
        );
      })}
    </div>
  );
}

function DJBox({ label, hint, value, onChange, placeholder }: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="rounded-2xl border border-savage-cream/15 bg-savage-black/40 p-4">
      <p className="text-[10px] uppercase tracking-[0.3em] text-savage-cream font-bold">{label}</p>
      {hint && <p className="text-savage-cream/50 text-xs mt-1">{hint}</p>}
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full bg-transparent border-t border-savage-cream/10 pt-3 text-base text-savage-cream outline-none resize-none leading-relaxed placeholder:text-savage-cream/25"
      />
    </div>
  );
}

function DJWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-gradient-to-b from-savage-ink/60 to-savage-black border border-savage-cream/15 p-5 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 halftone opacity-[0.04] pointer-events-none" />
      <div className="relative">
        <p className="text-[10px] uppercase tracking-[0.4em] text-savage-cream/60 mb-5">
          ◇ Booth · 23:30 → close
        </p>
        {children}
      </div>
    </div>
  );
}

// ============== SIDE PANEL ==============

function SidePanel({ plan }: { plan: Plan }) {
  const [liveExpanded, setLiveExpanded] = useState(false);
  const LIVE_PREVIEW_COUNT = 4;
  const vetos = splitLines(plan.vetos);
  const liveMust = splitLines(plan.liveMustPlay);
  const djMustGroups: { label: string; songs: string[] }[] = [
    { label: "Bangers", songs: splitLines(plan.djMustBangers) },
    { label: "Singalongs", songs: splitLines(plan.djMustSingalongs) },
    { label: "Closing", songs: splitLines(plan.djMustClosing) },
  ].filter((g) => g.songs.length > 0);
  const djMustTotal = djMustGroups.reduce((acc, g) => acc + g.songs.length, 0);

  return (
    <div className="lg:sticky lg:top-0 lg:h-screen overflow-y-auto p-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-savage-yellow">Your show, live</p>
        <h3 className="font-display uppercase text-2xl mt-2 leading-tight">{plan.names || "Your names"}</h3>
        <p className="text-xs text-savage-white/60 mt-1">{formatDate(plan.eventDate)} · {plan.venue || "—"}</p>
      </div>

      <Timeline partyStart={plan.partyStart} djExtraHours={plan.djExtraHours} />

      {plan.liveSet.length > 0 && (
        <PanelBlock title="Live · picks" count={plan.liveSet.length} accent="yellow">
          <AnimatePresence initial={false}>
            {(liveExpanded ? plan.liveSet : plan.liveSet.slice(0, LIVE_PREVIEW_COUNT)).map((s, i) => (
              <PanelSongRow key={s} index={i} title={s.split(" — ")[0]} subtitle={s.split(" — ")[1]} accent="yellow" />
            ))}
          </AnimatePresence>
          {plan.liveSet.length > LIVE_PREVIEW_COUNT && (
            <button
              onClick={() => setLiveExpanded(!liveExpanded)}
              className="w-full mt-2 text-[10px] uppercase tracking-[0.3em] text-savage-yellow/70 hover:text-savage-yellow py-2 border border-dashed border-savage-yellow/30 rounded-lg transition"
            >
              {liveExpanded
                ? "Show less ▲"
                : `+ ${plan.liveSet.length - LIVE_PREVIEW_COUNT} more ▼`}
            </button>
          )}
        </PanelBlock>
      )}

      {liveMust.length > 0 && (
        <PanelBlock title="Live · wishlist" count={liveMust.length} accent="yellow">
          {liveMust.map((s, i) => (
            <PanelSongRow key={s + i} index={i} title={s} accent="yellow" muted />
          ))}
        </PanelBlock>
      )}

      {plan.djVibes.length > 0 && (
        <PanelBlock title="DJ · vibes" count={plan.djVibes.length} accent="cream">
          <div className="flex flex-wrap gap-1.5">
            {plan.djVibes.map((v) => (
              <span key={v} className="text-[10px] uppercase tracking-wide text-savage-cream bg-savage-cream/10 border border-savage-cream/20 px-2 py-1 rounded">
                {v}
              </span>
            ))}
          </div>
        </PanelBlock>
      )}

      {djMustTotal > 0 && (
        <PanelBlock title="DJ · must-plays" count={djMustTotal} accent="cream">
          {djMustGroups.map((g) => (
            <div key={g.label} className="mt-2 first:mt-0">
              <p className="text-[9px] uppercase tracking-[0.3em] text-savage-cream/50 mb-1.5 px-1">{g.label}</p>
              <div className="space-y-1">
                {g.songs.map((s, i) => (
                  <PanelSongRow key={g.label + s + i} index={i} title={s} accent="cream" muted />
                ))}
              </div>
            </div>
          ))}
        </PanelBlock>
      )}

      {plan.lastSong && (
        <div className="mt-3 rounded-lg bg-savage-yellow/8 border border-savage-yellow/25 px-3 py-2.5">
          <p className="text-[10px] uppercase tracking-[0.25em] text-savage-yellow">Last song</p>
          <p className="text-sm text-savage-white mt-0.5">{plan.lastSong}</p>
        </div>
      )}

      {vetos.length > 0 && (
        <div className="mt-6 rounded-xl border border-savage-red/30 bg-savage-red/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-savage-red mb-2">No play</p>
          <div className="flex flex-wrap gap-1.5">
            {vetos.map((v) => (
              <span key={v} className="text-[11px] line-through text-savage-white/60 bg-savage-black/40 px-2 py-1 rounded">
                {v}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function addMinutes(time: string, minutes: number): string | null {
  if (!time || !/^\d{2}:\d{2}$/.test(time)) return null;
  const [hh, mm] = time.split(":").map(Number);
  const total = hh * 60 + mm + minutes;
  const wrapped = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const newHH = Math.floor(wrapped / 60);
  const newMM = wrapped % 60;
  return `${String(newHH).padStart(2, "0")}:${String(newMM).padStart(2, "0")}`;
}

function Timeline({ partyStart, djExtraHours }: { partyStart: string; djExtraHours: number }) {
  const liveDuration = 120;
  const djDuration = 60;
  const extraDuration = djExtraHours * 60;

  const liveStart = partyStart || "—";
  const djStart = addMinutes(partyStart, liveDuration) || "—";
  const extraStart = addMinutes(partyStart, liveDuration + djDuration) || "—";
  const closeTime = addMinutes(partyStart, liveDuration + djDuration + extraDuration) || "—";

  const segments: { label: string; color: string; flex: number; start: string }[] = [
    { label: "Live", color: "bg-savage-yellow", flex: liveDuration, start: liveStart },
    { label: "DJ", color: "bg-savage-cream", flex: djDuration, start: djStart },
  ];
  if (djExtraHours > 0) {
    segments.push({ label: `+${djExtraHours}h DJ`, color: "bg-savage-red", flex: extraDuration, start: extraStart });
  }

  return (
    <div className="mt-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-savage-white/50 mb-2">Timeline</p>
      <div className="flex h-2 rounded-full overflow-hidden">
        {segments.map((s) => (
          <div key={s.label} className={s.color} style={{ flex: s.flex }} title={`${s.label} · ${s.start}`} />
        ))}
      </div>
      <div className={`grid gap-1 mt-2 ${djExtraHours > 0 ? "grid-cols-4" : "grid-cols-3"}`}>
        {segments.map((s) => (
          <div key={s.label}>
            <p className="text-[10px] uppercase tracking-wide text-savage-white/70 truncate">{s.label}</p>
            <p className="text-[10px] text-savage-white/40">{s.start}</p>
          </div>
        ))}
        <div>
          <p className="text-[10px] uppercase tracking-wide text-savage-white/70 truncate">Close</p>
          <p className="text-[10px] text-savage-white/40">{closeTime}</p>
        </div>
      </div>
    </div>
  );
}

function PanelBlock({ title, count, accent, children }: {
  title: string;
  count: number;
  accent: "yellow" | "cream";
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-[10px] uppercase tracking-[0.3em] text-savage-white/50">{title}</p>
        <p className={`text-xs font-bold ${accent === "yellow" ? "text-savage-yellow" : "text-savage-cream"}`}>
          {count.toString().padStart(2, "0")}
        </p>
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function PanelSongRow({ index, title, subtitle, accent, muted }: { index: number; title: string; subtitle?: string; accent: "yellow" | "cream"; muted?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -30, scale: 0.95 }}
      transition={{ type: "spring", damping: 22 }}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
        muted
          ? "bg-savage-black/30 border border-savage-white/10"
          : accent === "yellow"
            ? "bg-savage-yellow/8 border border-savage-yellow/20"
            : "bg-savage-cream/5 border border-savage-cream/20"
      }`}
    >
      <span className={`font-display text-xs w-6 ${accent === "yellow" ? "text-savage-yellow" : "text-savage-cream"}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <SongCover title={title} accent={accent} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-savage-white truncate">{title}</p>
        {subtitle && <p className="text-[11px] text-savage-white/50 uppercase tracking-wide truncate">{subtitle}</p>}
      </div>
    </motion.div>
  );
}

function SongCover({ title, accent }: { title: string; accent: "yellow" | "cream" }) {
  const initial = title.charAt(0).toUpperCase();
  return (
    <div className={`w-9 h-9 rounded shrink-0 flex items-center justify-center font-display text-sm ${
      accent === "yellow" ? "bg-savage-yellow/20 text-savage-yellow" : "bg-savage-cream/15 text-savage-cream"
    }`}>
      {initial}
    </div>
  );
}

function splitLines(s: string): string[] {
  return s.split("\n").map((x) => x.trim()).filter(Boolean);
}

function buildEmailBody(plan: Plan): string {
  const dash = "—";
  const fmtList = (items: string[]) =>
    items.length === 0 ? `  ${dash}` : items.map((v) => `  - ${v}`).join("\n");
  const dressLabel =
    plan.dressCode === "savage" ? "Savage style (elegant and funky)" :
    plan.dressCode === "suits" ? "Full suits, gala" : dash;
  const requestsLabel =
    plan.djRequests === "yes" ? "Open mic" :
    plan.djRequests === "filtered" ? "Filtered by couple" :
    plan.djRequests === "no" ? "Closed" : dash;
  const firstDanceLabel =
    plan.firstDance === "dj" ? `DJ plays it (${plan.firstDanceSong || "no title"})` :
    plan.firstDance === "none" ? "Already done at dinner" : dash;
  const liveMust = splitLines(plan.liveMustPlay);
  const bangers = splitLines(plan.djMustBangers);
  const sing = splitLines(plan.djMustSingalongs);
  const closing = splitLines(plan.djMustClosing);
  const vetos = splitLines(plan.vetos);
  const date = plan.eventDate ? formatDate(plan.eventDate) : dash;
  const liveEnd = addMinutes(plan.partyStart, 120) || dash;
  const djEnd = addMinutes(plan.partyStart, 180) || dash;
  const closeTime = addMinutes(plan.partyStart, 180 + plan.djExtraHours * 60) || dash;
  const extraLabel = plan.djExtraHours === 0 ? "Just the included hour of DJ" : `+${plan.djExtraHours}h on top of the included hour`;

  return [
    `Hi,`,
    ``,
    `A new show was just submitted via myshow. Full details are also in the attached PDF.`,
    ``,
    `Couple`,
    `  Names: ${plan.names || dash}`,
    `  Date: ${date}`,
    `  Venue: ${plan.venue || dash}`,
    `  Phone: ${plan.phone || dash}`,
    `  Email: ${plan.email || dash}`,
    `  Party start: ${plan.partyStart || dash}`,
    `  Extra DJ hours: ${extraLabel}`,
    ``,
    `Timeline`,
    `  Live: ${plan.partyStart || dash} to ${liveEnd}`,
    `  DJ: ${liveEnd} to ${djEnd}` + (plan.djExtraHours > 0 ? ` (1h included)` : ``),
    plan.djExtraHours > 0 ? `  Extra DJ: ${djEnd} to ${closeTime}` : ``,
    `  Close: ${closeTime}`,
    ``,
    `Crowd`,
    `  Headcount: ${plan.guests || dash}`,
    `  Ages: ${plan.ages || dash}`,
    `  Vibes:`,
    fmtList(plan.crowdVibes),
    ``,
    `Dress code: ${dressLabel}`,
    ``,
    `Live show genres:`,
    fmtList(plan.liveGenres),
    ``,
    `Live picks from repertoire (${plan.liveSet.length}):`,
    fmtList(plan.liveSet),
    ``,
    `Live wishlist not in repertoire (${liveMust.length}):`,
    fmtList(liveMust),
    ``,
    `Opening dance: ${firstDanceLabel}`,
    plan.firstDanceLink ? `Reference link: ${plan.firstDanceLink}` : ``,
    ``,
    `DJ set vibes (${plan.djVibes.length}):`,
    fmtList(plan.djVibes),
    ``,
    `DJ reference playlist: ${plan.djReferenceUrl || dash}`,
    `Guest requests: ${requestsLabel}`,
    `Last song of the night: ${plan.lastSong || dash}`,
    ``,
    `DJ peak bangers (${bangers.length}):`,
    fmtList(bangers),
    ``,
    `DJ singalongs (${sing.length}):`,
    fmtList(sing),
    ``,
    `DJ closing vibes (${closing.length}):`,
    fmtList(closing),
    ``,
    `Banned (${vetos.length}):`,
    fmtList(vetos),
    ``,
    `Notes:`,
    plan.notes ? `  ${plan.notes.split("\n").join("\n  ")}` : `  ${dash}`,
    ``,
    `Source: savageparty.es/myshow`,
  ].join("\n").replace(/\n{3,}/g, "\n\n");
}

// ============== POSTER MODAL ==============

function PosterModal({ onClose, plan }: { onClose: () => void; plan: Plan }) {
  const name1 = plan.names.split(" & ")[0] || "Name 1";
  const name2 = plan.names.split(" & ")[1] || "Name 2";
  const dateLine = plan.eventDate
    ? new Date(plan.eventDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()
    : "DATE.MONTH.YEAR";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-savage-black/95 overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col items-center justify-start p-5 sm:p-10">
        <button onClick={onClose} className="self-end text-savage-white/60 text-sm mb-4 hover:text-savage-yellow py-2 px-3 -mr-2">
          ← Back
        </button>

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 22 }}
          className="w-full max-w-xl bg-savage-red text-savage-yellow relative overflow-hidden shadow-2xl shadow-savage-black/70"
          style={{ aspectRatio: "3 / 4" }}
        >
          {/* Halftone texture */}
          <div
            className="absolute inset-0 opacity-[0.18] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: "radial-gradient(rgba(0,0,0,0.6) 1px, transparent 1px)",
              backgroundSize: "6px 6px",
            }}
          />
          {/* Yellow frame stripes */}
          <div className="absolute top-0 left-0 right-0 h-2.5 bg-savage-yellow" />
          <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-savage-yellow" />
          <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-savage-yellow" />
          <div className="absolute top-0 bottom-0 right-0 w-2.5 bg-savage-yellow" />

          <div className="absolute inset-0 flex flex-col px-5 sm:px-9 md:px-12 pt-7 sm:pt-9 pb-6 sm:pb-8">

            <div className="flex items-start justify-between gap-3">
              <Image src="/logo-savage.png" alt="Savage Party" width={64} height={64} className="sm:w-[86px] sm:h-[86px]" />
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-savage-yellow">Private show</p>
                <p className="text-[9px] uppercase tracking-[0.25em] mt-1 text-savage-yellow/60 break-all">
                  No. {(plan.names.replace(/\s|&/g, "").toUpperCase().slice(0, 6) || "—")}-{(plan.eventDate || "").replace(/-/g, "").slice(2) || "—"}
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="block w-6 sm:w-10 h-[2px] bg-savage-yellow" />
                <p className="font-display uppercase text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-savage-yellow">
                  Headlining
                </p>
                <span className="block w-6 sm:w-10 h-[2px] bg-savage-yellow" />
              </div>
              <h1 className="font-display uppercase text-[2.25rem] sm:text-[4rem] md:text-[5.5rem] leading-[0.85] sm:leading-[0.82] text-savage-yellow break-words">
                {name1}
                <br />
                <span className="font-display text-[2.5rem] sm:text-[4.5rem] md:text-[6rem] inline-block leading-none my-1 text-savage-cream">×</span>
                <br />
                {name2}
              </h1>
              <div className="mt-6 sm:mt-9 flex flex-col items-center gap-2">
                <p className="font-display text-[1.25rem] sm:text-[2rem] tracking-tight text-savage-yellow">{dateLine}</p>
                <p className="text-[11px] sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold text-savage-cream break-words">{plan.venue || "Venue"}</p>
                {plan.partyStart && (
                  <p className="text-[10px] uppercase tracking-[0.4em] text-savage-yellow/60 mt-1">
                    Doors {plan.partyStart}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t-2 border-savage-yellow pt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold text-savage-yellow">
              <span>One night.</span>
              <span className="text-savage-cream">One band.</span>
              <span>Your show.</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button className="rounded-full bg-savage-yellow text-savage-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:brightness-110 transition">
            Download PNG
          </button>
        </div>
        <p className="text-savage-white/40 text-xs mt-3 text-center max-w-xs">The poster is yours to download and share. The band keeps a copy too.</p>
      </div>
    </motion.div>
  );
}

function SummaryModal({ onClose, plan, onSubmit, sending, onDownload }: { onClose: () => void; plan: Plan; onSubmit: () => void; sending: boolean; onDownload: () => void | Promise<void> }) {
  const [downloading, setDownloading] = useState(false);
  async function handleDownloadClick() {
    setDownloading(true);
    try {
      await onDownload();
    } finally {
      setDownloading(false);
    }
  }
  const liveWishlist = splitLines(plan.liveMustPlay);
  const dressLabel = plan.dressCode === "savage" ? "Savage style (elegant + funky)" : plan.dressCode === "suits" ? "Full suits, gala" : "—";
  const requestsLabel = plan.djRequests === "yes" ? "Open mic" : plan.djRequests === "filtered" ? "Filtered by couple" : "Closed";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-savage-black/95 overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-8">
        <div className="w-full max-w-3xl flex items-center justify-between mb-4">
          <button onClick={onClose} className="text-savage-white/60 text-sm hover:text-savage-cream py-2 px-3 -ml-2">
            ← Back
          </button>
          <p className="text-[10px] uppercase tracking-[0.3em] text-savage-white/50">Mock · download buttons are placeholders</p>
        </div>

        <motion.article
          initial={{ scale: 0.97, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 24 }}
          className="w-full max-w-3xl bg-savage-cream text-savage-ink relative overflow-hidden shadow-2xl shadow-savage-black/60 mx-2 sm:mx-0"
        >
          <div className="absolute inset-0 halftone opacity-[0.06] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-savage-yellow" />
          <div className="relative p-5 sm:p-8 md:p-12 pt-8 sm:pt-10">
            <header className="border-b-2 border-savage-ink pb-5 flex items-start justify-between gap-6">
              <Image src="/logo-savage.png" alt="Savage Party" width={72} height={72} />
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.3em] text-savage-ink/70">Booking ref</p>
                <p className="font-display text-sm mt-1">{plan.names.replace(/\s|&/g, "").toUpperCase().slice(0, 12) || "—"}-{(plan.eventDate || "").replace(/-/g, "").slice(2) || "—"}</p>
              </div>
            </header>

            <p className="text-[10px] uppercase tracking-[0.4em] text-savage-red font-bold mt-6">Show specification</p>
            <h1 className="font-display uppercase text-3xl sm:text-4xl mt-2 leading-tight">
              Show for {plan.names || "—"}
            </h1>
            <p className="text-sm text-savage-ink/70 mt-1">{formatDate(plan.eventDate)} · {plan.venue || "—"}</p>

          <SummarySection title="Event basics">
            <SummaryRow label="Names" value={plan.names || "—"} />
            <SummaryRow label="Date" value={formatDate(plan.eventDate)} />
            <SummaryRow label="Venue" value={plan.venue || "—"} />
            <SummaryRow label="Phone" value={plan.phone || "—"} />
            <SummaryRow label="Email" value={plan.email || "—"} mono />
            <SummaryRow label="Party start" value={plan.partyStart || "—"} />
            <SummaryRow label="Extra DJ hours" value={plan.djExtraHours === 0 ? "Just included (1h)" : `+${plan.djExtraHours}h on top of the included hour`} />
            <SummaryRow label="Headcount" value={plan.guests || "—"} />
            <SummaryRow label="Age range" value={plan.ages || "—"} />
            <SummaryRow label="Crowd vibe" value={plan.crowdVibes.join(", ") || "—"} />
            <SummaryRow label="Dress code" value={dressLabel} />
          </SummarySection>

          <SummarySection title="Live show">
            <SummaryRow label="Genres" value={plan.liveGenres.join(", ") || "—"} />
            <SummaryRow label="Picks from repertoire" value={`${plan.liveSet.length} tracks`} />
            {plan.liveSet.length > 0 && <SummaryList items={plan.liveSet} />}
            <SummaryRow label="Wishlist (not in repertoire)" value={`${liveWishlist.length} tracks`} />
            {liveWishlist.length > 0 && <SummaryList items={liveWishlist} />}
            <SummaryRow
              label="Opening dance"
              value={
                plan.firstDance === "dj" ? `DJ plays it · ${plan.firstDanceSong || "—"}` :
                plan.firstDance === "none" ? "Already done at dinner" :
                "—"
              }
            />
            {plan.firstDance === "dj" && plan.firstDanceLink && (
              <SummaryRow label="Reference link" value={plan.firstDanceLink} mono />
            )}
          </SummarySection>

          <SummarySection title="DJ set" cream>
            <SummaryRow label="Vibes" value={plan.djVibes.join(", ") || "—"} />
            <SummaryRow label="Reference playlist" value={plan.djReferenceUrl || "—"} mono />
            <SummaryRow label="Requests from guests" value={requestsLabel} />
            <SummaryRow label="Last song of the night" value={plan.lastSong || "—"} />
            <SummaryDjBucket title="Peak bangers" items={splitLines(plan.djMustBangers)} />
            <SummaryDjBucket title="Singalongs" items={splitLines(plan.djMustSingalongs)} />
            <SummaryDjBucket title="Closing vibes" items={splitLines(plan.djMustClosing)} />
          </SummarySection>

          <SummarySection title="Banned">
            {splitLines(plan.vetos).length > 0
              ? <SummaryList items={splitLines(plan.vetos)} striked />
              : <p className="text-sm text-savage-ink/60 italic">Nothing banned.</p>
            }
          </SummarySection>

          <SummarySection title="Notes">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{plan.notes || "—"}</p>
          </SummarySection>

            <footer className="mt-10 pt-4 border-t-2 border-savage-ink flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-savage-ink/60">
              <span>Generated by Savage Party · my-show</span>
              <span>{new Date().toLocaleDateString("en-GB")}</span>
            </footer>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-savage-yellow" />
        </motion.article>

        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button
            onClick={onSubmit}
            disabled={sending}
            className={`rounded-full bg-savage-red text-savage-cream px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition ${sending ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}`}
          >
            {sending ? "Sending…" : "Send it to the band"}
          </button>
          <button
            onClick={handleDownloadClick}
            disabled={downloading}
            className={`rounded-full bg-savage-yellow text-savage-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition ${downloading ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}`}
          >
            {downloading ? "Generating…" : "Download PDF"}
          </button>
        </div>
        <p className="text-savage-white/50 text-xs mt-3 text-center max-w-md">When you confirm, the show summary lands in the band&rsquo;s inbox. The poster stays here for you to download.</p>
      </div>
    </motion.div>
  );
}

function SuccessScreen({ names, onDownload }: { names: string; onDownload: () => void | Promise<void> }) {
  const display = names.trim() || "You two";
  const [downloading, setDownloading] = useState(false);
  async function handleDownloadClick() {
    setDownloading(true);
    try { await onDownload(); } finally { setDownloading(false); }
  }
  return (
    <main className="min-h-screen bg-savage-red text-savage-yellow relative overflow-hidden flex flex-col">
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.6) 1px, transparent 1px)",
          backgroundSize: "6px 6px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-2.5 bg-savage-yellow" />
      <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-savage-yellow" />

      <header className="relative z-10 px-5 sm:px-6 md:px-10 py-5 flex items-center justify-between">
        <Image src="/logo-savage.png" alt="Savage Party" width={88} height={88} />
        <Link
          href="/"
          className="rounded-full border-2 border-savage-yellow text-savage-yellow px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] hover:bg-savage-yellow hover:text-savage-ink transition"
        >
          ← Home
        </Link>
      </header>

      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-12 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-savage-cream font-bold mb-6"
        >
          ━━ Done ━━
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-display uppercase text-[2.25rem] sm:text-[4rem] md:text-[5.5rem] leading-[0.9] sm:leading-[0.85] break-words"
        >
          {display}
          <br />
          <span className="text-savage-cream">you&rsquo;re locked in.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-editorial italic text-lg sm:text-xl md:text-2xl text-savage-cream mt-8 max-w-2xl leading-relaxed"
        >
          That&rsquo;s everything we need. The whole band is reading it tonight. If anything needs clarifying we&rsquo;ll reach out, otherwise consider it locked.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-12 grid sm:grid-cols-3 gap-4 w-full max-w-2xl text-left"
        >
          <SuccessStep n="01" text="Chris reads it all tonight and builds the first draft of your show." />
          <SuccessStep n="02" text="If we have any doubt, we&rsquo;ll write to you. Otherwise no news, all good." />
          <SuccessStep n="03" text="On the night, the band plays the wedding the three of us built." />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <button
            onClick={handleDownloadClick}
            disabled={downloading}
            className={`rounded-full bg-savage-yellow text-savage-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition ${downloading ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}`}
          >
            {downloading ? "Generating…" : "Download your show PDF"}
          </button>
          <p className="text-xs text-savage-yellow/60 max-w-md text-center">
            Keep a copy of your show summary. The band already has it.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mt-12 text-sm uppercase tracking-[0.3em] text-savage-yellow/70"
        >
          See you at soundcheck.
        </motion.p>
        <p className="font-editorial italic text-savage-cream text-base mt-2">
          — Chris, on behalf of the band.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-savage-cream text-savage-ink px-7 py-3.5 text-sm font-bold uppercase tracking-[0.25em] hover:brightness-110 transition"
          >
            ← Back to home
          </Link>
        </motion.div>
      </section>

      <div className="relative z-10 border-t-2 border-savage-yellow/40 px-6 py-4 flex items-center justify-between text-[9px] uppercase tracking-[0.3em] font-bold">
        <span>One night.</span>
        <span className="text-savage-cream">One band.</span>
        <span>Your show.</span>
      </div>
    </main>
  );
}

function SuccessStep({ n, text }: { n: string; text: string }) {
  return (
    <div className="rounded-2xl border-2 border-savage-yellow/40 bg-savage-yellow/5 p-5">
      <p className="font-display text-3xl text-savage-cream">{n}</p>
      <p className="text-sm text-savage-yellow/90 mt-2 leading-relaxed">{text}</p>
    </div>
  );
}

function SummarySection({ title, cream, children }: { title: string; cream?: boolean; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <div className="flex items-baseline gap-3 mb-3">
        <span className={`inline-block w-2.5 h-2.5 rounded-full ${cream ? "bg-savage-red" : "bg-savage-yellow"}`} />
        <h2 className={`font-display uppercase text-sm tracking-[0.3em] flex-1 pb-2 border-b-2 ${cream ? "text-savage-red border-savage-red/40" : "text-savage-ink border-savage-ink/40"}`}>
          {title}
        </h2>
      </div>
      <div className="space-y-1.5">
        {children}
      </div>
    </section>
  );
}

function SummaryRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 py-1">
      <span className="text-[10px] uppercase tracking-[0.25em] text-savage-ink/55 sm:shrink-0 sm:w-48 mb-0.5 sm:mb-0">{label}</span>
      <span className={`text-sm text-savage-ink break-words ${mono ? "font-mono break-all" : ""}`}>{value}</span>
    </div>
  );
}

function SummaryList({ items, striked }: { items: string[]; striked?: boolean }) {
  return (
    <ul className="sm:ml-48 list-none mt-1 mb-3 space-y-0.5">
      {items.map((it, i) => (
        <li key={it + i} className={`text-sm break-words ${striked ? "line-through text-savage-ink/60" : "text-savage-ink"}`}>
          · {it}
        </li>
      ))}
    </ul>
  );
}

function SummaryDjBucket({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-3">
      <p className="text-[10px] uppercase tracking-[0.25em] text-savage-ink/55 mb-1">{title} · {items.length}</p>
      <ul className="space-y-0.5">
        {items.map((it, i) => (
          <li key={it + i} className="text-sm text-savage-ink">· {it}</li>
        ))}
      </ul>
    </div>
  );
}
