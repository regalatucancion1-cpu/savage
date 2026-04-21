"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

type Vibe = "international" | "latin" | "oldschool" | "fullsend";

const vibes: {
  id: Vibe;
  title: string;
  blurb: string;
  preview: { title: string; artist: string }[];
}[] = [
  {
    id: "international",
    title: "International mix",
    blurb: "English pop, disco, house. A crowd from everywhere.",
    preview: [
      { title: "Don't Stop Me Now", artist: "Queen" },
      { title: "Dance the Night", artist: "Dua Lipa" },
      { title: "One More Time", artist: "Daft Punk" },
    ],
  },
  {
    id: "latin",
    title: "Latin heavy",
    blurb: "Reggaetón, Bad Bunny, Rosalía. Dancefloor hot from minute one.",
    preview: [
      { title: "Titi Me Preguntó", artist: "Bad Bunny" },
      { title: "Despechá", artist: "Rosalía" },
      { title: "TQG", artist: "Karol G, Shakira" },
    ],
  },
  {
    id: "oldschool",
    title: "Old school",
    blurb: "Motown, funk, rock classics. Parents on the floor till 2am.",
    preview: [
      { title: "Superstition", artist: "Stevie Wonder" },
      { title: "Dancing Queen", artist: "ABBA" },
      { title: "Sweet Caroline", artist: "Neil Diamond" },
    ],
  },
  {
    id: "fullsend",
    title: "Full send",
    blurb: "Techno leanings, late night. Ibiza energy after midnight.",
    preview: [
      { title: "Music Sounds Better With You", artist: "Stardust" },
      { title: "One Kiss", artist: "Calvin Harris, Dua Lipa" },
      { title: "Losing It", artist: "Fisher" },
    ],
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

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter") {
        if (step === 1 && canNext1) setStep(2);
        else if (step === 2 && canNext2) setStep(3);
        else if (step === 3 && canNext3) setStep(4);
      } else if (e.key === "Escape") {
        if (step > 1) setStep((s) => (s - 1) as Step);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, canNext1, canNext2, canNext3]);

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

      <div className="flex flex-1 px-5 sm:px-6 py-10 sm:py-14 md:px-14 md:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-start">
          <StepArea
            step={step}
            names={names}
            date={date}
            venue={venue}
            vibe={vibe}
            canNext1={canNext1}
            canNext2={canNext2}
            canNext3={canNext3}
            setNames={setNames}
            setDate={setDate}
            setVenue={setVenue}
            setVibe={setVibe}
            setStep={setStep}
          />

          <LivePoster
            names={names}
            date={date}
            venue={venue}
            vibe={vibe}
          />
        </div>
      </div>
    </div>
  );
}

function StepArea({
  step,
  names,
  date,
  venue,
  vibe,
  canNext1,
  canNext2,
  canNext3,
  setNames,
  setDate,
  setVenue,
  setVibe,
  setStep,
}: {
  step: Step;
  names: string;
  date: string;
  venue: string;
  vibe: Vibe | null;
  canNext1: boolean;
  canNext2: boolean;
  canNext3: boolean;
  setNames: (v: string) => void;
  setDate: (v: string) => void;
  setVenue: (v: string) => void;
  setVibe: (v: Vibe) => void;
  setStep: (s: Step) => void;
}) {
  const reduce = useReducedMotion();
  const slide: Variants = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
      };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={slide}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <StepShell
              overline="Step 1 of 3"
              title="Who's getting married, and when?"
              subtitle="We'll use this on your teaser poster. Watch the preview update as you type."
            >
              <FieldInput
                label="Names"
                type="text"
                value={names}
                onChange={setNames}
                placeholder="e.g. Sarah & James"
                autoFocus
              />
              <FieldInput
                label="Wedding date"
                type="date"
                value={date}
                onChange={setDate}
                placeholder=""
                className="mt-5"
              />
              <NavRow
                primaryLabel="Next →"
                primaryDisabled={!canNext1}
                onPrimary={() => setStep(2)}
              />
            </StepShell>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={slide}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <StepShell
              overline="Step 2 of 3"
              title="Where's the party?"
              subtitle="Venue, town or region. We play destination weddings all over Europe."
            >
              <FieldInput
                label="Venue / location"
                type="text"
                value={venue}
                onChange={setVenue}
                placeholder="e.g. Castell de Caramany, Costa Brava"
                autoFocus
              />
              <NavRow
                onBack={() => setStep(1)}
                primaryLabel="Next →"
                primaryDisabled={!canNext2}
                onPrimary={() => setStep(3)}
              />
            </StepShell>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={slide}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <StepShell
              overline="Step 3 of 3"
              title="What's your crowd?"
              subtitle="We'll shape the teaser around this. You tune everything after booking."
            >
              <div className="grid gap-3">
                {vibes.map((v) => {
                  const active = vibe === v.id;
                  return (
                    <motion.button
                      key={v.id}
                      onClick={() => setVibe(v.id)}
                      whileHover={reduce ? undefined : { scale: 1.01 }}
                      whileTap={reduce ? undefined : { scale: 0.99 }}
                      className={`text-left rounded-2xl border p-5 transition ${
                        active
                          ? "border-savage-yellow bg-gradient-to-r from-savage-yellow/15 to-savage-yellow/0"
                          : "border-savage-white/20 hover:border-savage-white/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p
                          className={`font-display uppercase text-xl sm:text-2xl ${
                            active ? "text-savage-yellow" : "text-savage-white"
                          }`}
                        >
                          {v.title}
                        </p>
                        {active && (
                          <span className="rounded-full bg-savage-yellow px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-savage-ink">
                            Picked
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-savage-white/70">
                        {v.blurb}
                      </p>
                      <AnimatePresence>
                        {active && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-4 overflow-hidden space-y-1.5"
                          >
                            {v.preview.map((t) => (
                              <li
                                key={t.title}
                                className="flex items-baseline justify-between gap-4 text-sm"
                              >
                                <span className="font-editorial italic">
                                  {t.title}
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-savage-white/60">
                                  {t.artist}
                                </span>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.button>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldInput({
  label,
  value,
  onChange,
  type,
  placeholder,
  className = "",
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  placeholder: string;
  className?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-white/60">
        {label}
      </span>
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-savage-white/20 bg-savage-black px-4 sm:px-5 py-3.5 sm:py-4 text-lg sm:text-xl text-savage-white outline-none placeholder:text-savage-white/30 focus:border-savage-yellow"
      />
    </label>
  );
}

function Progress({ step }: { step: Step }) {
  return (
    <div className="flex gap-2 px-5 sm:px-6 pt-5 sm:pt-6 md:px-14">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className="h-1 flex-1 overflow-hidden rounded-full bg-savage-white/10"
        >
          <motion.div
            className="h-full bg-savage-yellow"
            initial={false}
            animate={{ width: s <= step ? "100%" : "0%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
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
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
        {overline}
      </p>
      <h1 className="font-display uppercase text-[1.75rem] sm:text-4xl md:text-5xl mt-3 sm:mt-4 leading-[0.9]">
        {title}
      </h1>
      <p className="font-editorial italic mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-savage-cream max-w-xl">
        {subtitle}
      </p>
      <div className="mt-8 sm:mt-10">{children}</div>
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
    <div className="mt-8 sm:mt-10 flex items-center justify-between gap-4">
      {onBack ? (
        <button
          onClick={onBack}
          className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-white/60 hover:text-savage-yellow"
        >
          ← Back
        </button>
      ) : (
        <span />
      )}
      <button
        onClick={onPrimary}
        disabled={primaryDisabled}
        className="rounded-full bg-savage-yellow px-6 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-semibold text-savage-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {primaryLabel}
      </button>
    </div>
  );
}

function LivePoster({
  names,
  date,
  venue,
  vibe,
}: {
  names: string;
  date: string;
  venue: string;
  vibe: Vibe | null;
}) {
  const pretty = useMemo(() => formatDate(date), [date]);
  const displayNames = names.trim() || "Sarah & James";
  const displayVenue = venue.trim() || "Your venue · Spain";

  return (
    <aside className="hidden lg:block sticky top-10 self-start">
      <div className="relative overflow-hidden rounded-3xl border border-savage-white/10 bg-savage-ink p-10 text-savage-white shadow-[0_30px_80px_-40px_rgba(255,192,7,0.3)]">
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.5) 0.5px, transparent 0.5px)",
            backgroundSize: "3px 3px",
          }}
        />
        <p className="relative text-[10px] uppercase tracking-[0.4em] text-savage-yellow">
          Live preview · teaser
        </p>
        <p className="relative mt-6 text-[10px] uppercase tracking-[0.4em] text-savage-white/60">
          {displayNames} · Savage Night
        </p>
        <h2 className="relative font-display uppercase mt-3 text-3xl md:text-[2.75rem] leading-[0.88]">
          <AnimatedText text={pretty.weekday} />
          <br />
          <span className="text-savage-yellow">
            <AnimatedText text={pretty.main} />
          </span>
          <br />
          <span className="font-editorial italic normal-case text-2xl md:text-3xl">
            <AnimatedText text={displayVenue} />
          </span>
        </h2>
        <div className="relative mt-8 border-t border-savage-white/15 pt-5">
          <p className="text-[10px] uppercase tracking-[0.3em] text-savage-white/50">
            {vibe ? `${vibes.find((v) => v.id === vibe)?.title}` : "Pick your vibe"}
          </p>
          <p className="mt-2 text-savage-white/80 text-sm leading-relaxed">
            DJ + live band. Three hours non-stop. Sax, guitar and drums roaming
            your dancefloor.
          </p>
        </div>
      </div>
      <p className="mt-4 text-center text-[10px] uppercase tracking-[0.3em] text-savage-white/40">
        Not final · updates as you type
      </p>
    </aside>
  );
}

function AnimatedText({ text }: { text: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={text}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </AnimatePresence>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="px-5 sm:px-6 py-10 sm:py-14 md:px-14 md:py-20"
    >
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
        Your savage night · preview
      </p>
      <h1 className="font-display uppercase text-[2rem] sm:text-4xl md:text-6xl mt-3 sm:mt-4 leading-[0.9]">
        Here&apos;s the shape of it
      </h1>
      <p className="font-editorial italic mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-savage-cream max-w-2xl">
        A teaser, not a contract. The full setlist gets built with you after
        you book. We don&apos;t freestyle weddings.
      </p>

      <div className="mt-10 sm:mt-12 grid gap-6 sm:gap-8 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-3xl bg-savage-ink p-7 sm:p-10 md:p-14 text-savage-white border border-savage-white/10"
        >
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
            {names} · Savage Night
          </p>
          <h2 className="font-display uppercase mt-3 sm:mt-4 text-[2rem] sm:text-4xl md:text-6xl leading-[0.88]">
            {prettyDate.weekday}
            <br />
            <span className="text-savage-yellow">{prettyDate.main}</span>
            <br />
            <span className="font-editorial italic normal-case text-2xl sm:text-3xl md:text-5xl">
              {venue}
            </span>
          </h2>

          <div className="mt-8 sm:mt-10 divide-y divide-savage-white/15 border-y border-savage-white/15">
            {timeline.map((t) => {
              const time = t.title === "Shutdown" ? shutdown : t.time;
              return (
                <div
                  key={t.title}
                  className="grid grid-cols-[70px_1fr] sm:grid-cols-[90px_1fr] items-baseline gap-4 sm:gap-6 py-4 sm:py-5"
                >
                  <span className="font-display text-xl sm:text-2xl text-savage-yellow">
                    {time}
                  </span>
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em]">
                      {t.title}
                    </p>
                    {t.note && (
                      <p className="mt-1 text-sm sm:text-base text-savage-white/70">
                        {t.note}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-7 sm:mt-8">
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-white/60">
                Extend your night
              </p>
              <p className="font-display text-xl sm:text-2xl text-savage-yellow">
                {totalHours}h
              </p>
            </div>
            <input
              type="range"
              min={0}
              max={2}
              step={1}
              value={extendHours}
              onChange={(e) => onExtend(Number(e.target.value) as 0 | 1 | 2)}
              className="savage-slider mt-4 w-full"
              aria-label="Extend hours"
            />
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.2em] text-savage-white/50">
              <span>3h base</span>
              <span>+1h DJ</span>
              <span>+2h Ibiza</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col gap-5 sm:gap-6"
        >
          <div className="rounded-3xl border border-savage-white/10 bg-savage-black/60 p-5 sm:p-6">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-yellow">
              Six sample tracks from your night
            </p>
            <ul className="mt-4 space-y-2.5 sm:space-y-3">
              {tracks.map((t) => (
                <li
                  key={t.title}
                  className="flex items-baseline justify-between gap-4 border-b border-savage-white/10 pb-2 last:border-0"
                >
                  <span className="font-editorial italic text-base sm:text-lg">
                    {t.title}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-savage-white/60">
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
        </motion.div>
      </div>

      <style jsx global>{`
        .savage-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 2px;
          outline: none;
        }
        .savage-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ffc007;
          cursor: pointer;
          border: 3px solid #0e0c0a;
          box-shadow: 0 0 0 2px #ffc007;
        }
        .savage-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ffc007;
          cursor: pointer;
          border: 3px solid #0e0c0a;
          box-shadow: 0 0 0 2px #ffc007;
        }
      `}</style>
    </motion.div>
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
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (status !== "sent") return;
    if (countdown <= 0) return;
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [status, countdown]);

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

      const token = crypto.randomUUID().split("-")[0];
      try {
        sessionStorage.setItem(
          `savage_lead_${token}`,
          JSON.stringify({ names, email, phone, date, venue, vibe, extendHours }),
        );
      } catch {}

      setStatus("sent");
      setCountdown(3);
      setTimeout(() => router.push(`/my-show/${token}`), 3200);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Send failed");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-savage-yellow bg-savage-yellow/5 p-6"
      >
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-yellow">
          You&apos;re in the system
        </p>
        <p className="font-display uppercase text-xl sm:text-2xl md:text-3xl mt-3 leading-[1.05]">
          We&apos;ll reply within 24h.
        </p>
        <p className="font-editorial italic mt-3 text-sm sm:text-base text-savage-cream">
          Taking you to your show planner in {countdown > 0 ? countdown : 0}…
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={() => {
              const token = crypto.randomUUID().split("-")[0];
              router.push(`/my-show/${token}`);
            }}
            className="rounded-full bg-savage-yellow px-5 py-2.5 text-sm font-semibold text-savage-ink hover:brightness-110 transition"
          >
            Go now →
          </button>
          <button
            onClick={onReset}
            className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-white/60 hover:text-savage-yellow"
          >
            ← Start over
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-savage-white/10 bg-savage-black/60 p-5 sm:p-6"
    >
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-yellow">
        Reserve your date
      </p>
      <p className="font-editorial italic mt-2 text-sm sm:text-base text-savage-cream/90">
        Drop your email and we&apos;ll send availability.
      </p>

      <label className="mt-4 sm:mt-5 block">
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

      <motion.button
        type="submit"
        disabled={!valid || status === "sending"}
        whileTap={{ scale: 0.98 }}
        className="mt-5 w-full rounded-full bg-savage-yellow px-6 py-3.5 sm:py-4 font-semibold text-savage-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "sending" ? "Sending…" : "Send me availability"}
      </motion.button>

      {status === "error" && (
        <p className="mt-3 text-sm text-savage-red">
          Something went wrong. {errorMsg}. Try again in a moment.
        </p>
      )}

      <button
        type="button"
        onClick={onReset}
        className="mt-4 block mx-auto text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-white/50 hover:text-savage-yellow"
      >
        ← Start over
      </button>
    </form>
  );
}

function formatDate(iso: string): { weekday: string; main: string } {
  if (!iso) return { weekday: "Saturday", main: "July 25 · 2028" };
  const d = new Date(iso);
  if (isNaN(d.getTime())) return { weekday: "Saturday", main: "July 25 · 2028" };
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();
  return {
    weekday,
    main: `${month} ${day} · ${year}`,
  };
}
