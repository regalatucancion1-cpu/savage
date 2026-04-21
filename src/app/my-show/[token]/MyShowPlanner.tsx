"use client";

import { useState, useEffect } from "react";

const TOTAL_STEPS = 11;

const GENRES = [
  "Pop",
  "Rock",
  "Hip Hop / R&B",
  "Funk / Disco",
  "80's",
  "90's / 2000's Hits",
  "Current Hits",
  "Indie",
  "Electronic / Dance",
  "Latin (Reggaeton, Latin Pop)",
  "Classics Rock",
  "Soul / Motown",
];

const DECADES = [
  "70's · Disco, Funk, Classic Rock",
  "80's · Pop, New Wave, Hair Metal",
  "90's · Grunge, Pop, Hip Hop Golden Era",
  "2000's · Pop-Rock, R&B, Early EDM",
  "2010's · EDM, Pop, Trap",
  "2020's · Current Hits",
];

const FUNKY_CLASSICS = [
  "Play That Funky Music — Wild Cherry",
  "Sex Machine — James Brown",
  "Brick House — Commodores",
  "Hollaback Girl — Gwen Stefani",
  "Good Times + Lock It — Chic",
  "Never Too Much — Luther Vandross",
  "Le Freak — Chic",
  "I Wanna Be Your Lover — Prince",
  "Rock With You — Michael Jackson",
  "I Wanna Dance With Somebody — Whitney Houston",
  "Don't Stop 'Til You Get Enough — Michael Jackson",
  "You Should Be Dancing — Bee Gees",
  "September — Earth, Wind & Fire",
  "Gimme Gimme — ABBA",
  "YMCA — Village People",
  "Dancing Queen — ABBA",
  "Superstition — Stevie Wonder",
  "PYT — Michael Jackson",
];

const FEELGOOD = [
  "Finesse — Bruno Mars ft Cardi B",
  "Man I Need — Olivia Dean",
  "Water — Tyla",
  "About Damn Time — Lizzo (Remix)",
  "Let's Get It Started — Black Eyed Peas",
  "Espresso — Sabrina Carpenter",
  "Treasure — Bruno Mars",
  "Party in the USA — Miley Cyrus",
  "Unwritten — Natasha Bedingfield",
  "Gettin' Jiggy wit it — Will Smith",
  "Cuff It — Beyoncé",
  "Dance the Night — Dua Lipa",
  "Uptown Funk — Bruno Mars",
  "Don't Start Now — Dua Lipa",
  "Where Is My Husband — RAYE",
  "Blurred Lines — Robin Thicke",
  "Last Friday Night — Katy Perry",
  "Domino — Jessie J",
  "Juice — Lizzo",
];

const CROWD_PLEASERS = [
  "Moves Like Jagger — Maroon 5",
  "Starships — Nicki Minaj",
  "Right Round — Flo Rida",
  "Give Me Everything — Pitbull",
  "I Gotta Feeling — Black Eyed Peas",
  "Don't Stop Me Now — Queen",
];

const ROCK_ENERGY = [
  "All The Small Things + First Date — Blink-182",
  "Basket Case — Green Day",
  "All Star + I'm a Believer — Smash Mouth",
  "Last Resort — Papa Roach",
  "Mr. Brightside — The Killers",
];

const HIPHOP_RNB = [
  "Hot in Herre — Nelly",
  "Yeah! — Usher",
  "Crazy in Love — Beyoncé",
  "Get Busy — Sean Paul",
  "Hips Don't Lie — Shakira",
  "Titi Me Preguntó — Bad Bunny",
];

const PEAK_ENERGY = [
  "Freed From Desire — Gala",
  "Pepas — Farruko",
  "Fireball — Pitbull",
  "Temperature — Sean Paul",
];

const CROWD_OPTIONS = [
  "Mostly our age, same music taste",
  "Mix of generations",
  "Older crowd",
  "Young crowd mostly",
  "Super diverse",
];

const INVOLVEMENT_OPTIONS = [
  "Very involved · stick closely",
  "Somewhat involved · guide, feel free to adjust",
  "Balanced · mix preferences with pro judgment",
  "Trust the pros · we picked favorites, you know best",
];

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

const INITIAL: PlanState = {
  names: "",
  eventDate: "",
  venue: "",
  phone: "",
  genres: [],
  favoriteArtists: "",
  decades: [],
  bandSongs: [],
  wishlistSongs: "",
  dropEverythingSong: "",
  crowd: "",
  guestWeight: 5,
  mustPlay: "",
  reference: "",
  specialMoments: "",
  doNotPlay: "",
  anythingElse: "",
  involvement: "",
};

export default function MyShowPlanner({ token }: { token: string }) {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<PlanState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const key = `my-show-${token}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        setPlan({ ...INITIAL, ...JSON.parse(raw) });
      } catch {
        // ignore malformed draft
      }
    }
  }, [token]);

  useEffect(() => {
    const key = `my-show-${token}`;
    localStorage.setItem(key, JSON.stringify(plan));
  }, [plan, token]);

  function update<K extends keyof PlanState>(k: K, v: PlanState[K]) {
    setPlan((prev) => ({ ...prev, [k]: v }));
  }

  function toggleInArray(k: "genres" | "decades" | "bandSongs", value: string) {
    setPlan((prev) => {
      const current = prev[k];
      const next = current.includes(value)
        ? current.filter((x) => x !== value)
        : [...current, value];
      return { ...prev, [k]: next };
    });
  }

  async function submit() {
    setStatus("sending");
    setErrorMsg(null);
    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
      if (!accessKey) throw new Error("Form not configured");

      const formatList = (items: string[]) =>
        !items || items.length === 0
          ? "  (none)"
          : items.map((i, idx) => `  ${String(idx + 1).padStart(2, "0")}. ${i}`).join("\n");
      const block = (s: string) =>
        !s || !s.trim() ? "  (empty)" : s.split("\n").map((l) => `  ${l}`).join("\n");

      const prettyDate = (() => {
        if (!plan.eventDate) return "(not set)";
        const d = new Date(plan.eventDate);
        if (isNaN(d.getTime())) return plan.eventDate;
        return d.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      })();

      const message = [
        `SAVAGE PARTY · MY SHOW SUBMISSION`,
        `==================================`,
        ``,
        `QUICK SUMMARY`,
        `  Couple:    ${plan.names}`,
        `  Date:      ${prettyDate}`,
        `  Venue:     ${plan.venue}`,
        `  Phone:     ${plan.phone || "(not provided)"}`,
        `  Genres:    ${plan.genres.length ? plan.genres.join(", ") : "(none)"}`,
        `  Decades:   ${plan.decades.length ? plan.decades.join(", ") : "(none)"}`,
        `  Band songs picked: ${plan.bandSongs.length}`,
        `  Guest weight (0 their taste, 10 ours): ${plan.guestWeight}`,
        `  Involvement: ${plan.involvement || "(empty)"}`,
        ``,
        ``,
        `01 · BASICS`,
        `-----------`,
        `  Names:     ${plan.names}`,
        `  Date:      ${prettyDate}`,
        `  Venue:     ${plan.venue}`,
        `  Phone:     ${plan.phone || "(not provided)"}`,
        ``,
        `02 · MUSICAL TASTE`,
        `------------------`,
        `  Genres:`,
        formatList(plan.genres),
        ``,
        `  Favorite artists / bands:`,
        block(plan.favoriteArtists),
        ``,
        `  Decades:`,
        formatList(plan.decades),
        ``,
        `03 · BAND SONGS PICKED (${plan.bandSongs.length})`,
        `-----------------------`,
        formatList(plan.bandSongs),
        ``,
        `04 · WISHLIST`,
        `-------------`,
        `  Extra song wishes:`,
        block(plan.wishlistSongs),
        ``,
        `  Drop-everything song:`,
        block(plan.dropEverythingSong),
        ``,
        `05 · CROWD`,
        `----------`,
        `  Vibe:`,
        block(plan.crowd),
        `  Guest weight (0 their taste, 10 ours): ${plan.guestWeight}`,
        ``,
        `06 · MUST PLAY`,
        `--------------`,
        block(plan.mustPlay),
        ``,
        `07 · REFERENCE NIGHT / ARTIST`,
        `-----------------------------`,
        block(plan.reference),
        ``,
        `08 · SPECIAL MOMENTS`,
        `--------------------`,
        block(plan.specialMoments),
        ``,
        `09 · DO NOT PLAY`,
        `----------------`,
        block(plan.doNotPlay),
        ``,
        `10 · ANYTHING ELSE`,
        `------------------`,
        block(plan.anythingElse),
        ``,
        `11 · INVOLVEMENT LEVEL`,
        `----------------------`,
        `  ${plan.involvement || "(empty)"}`,
        ``,
        `==================================`,
        `  Token:  ${token}`,
        `  Source: savageparty.es/my-show/${token}`,
      ].join("\n");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `My Show · ${plan.names} · ${prettyDate} · ${plan.venue}`,
          from_name: "Savage Party · planner",
          name: plan.names,
          email: "no-reply@savageparty.es",
          phone: plan.phone || "(not provided)",
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data?.message ?? "Submit failed");
      }
      setStatus("sent");
      localStorage.removeItem(`my-show-${token}`);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submit failed");
    }
  }

  if (status === "sent") {
    return <SentScreen />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Progress step={step} />

      <div className="flex flex-1 flex-col px-6 py-12 md:px-14 md:py-20">
        <div className="w-full max-w-3xl mx-auto">
          {step === 1 && <Step1 onNext={() => setStep(2)} />}
          {step === 2 && (
            <Step2 onNext={() => setStep(3)} onBack={() => setStep(1)} />
          )}
          {step === 3 && (
            <Step3
              plan={plan}
              update={update}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <Step4
              plan={plan}
              toggleInArray={toggleInArray}
              update={update}
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
            />
          )}
          {step === 5 && (
            <Step5
              plan={plan}
              toggleInArray={toggleInArray}
              onNext={() => setStep(6)}
              onBack={() => setStep(4)}
            />
          )}
          {step === 6 && (
            <Step6
              plan={plan}
              toggleInArray={toggleInArray}
              onNext={() => setStep(7)}
              onBack={() => setStep(5)}
            />
          )}
          {step === 7 && (
            <Step7
              plan={plan}
              update={update}
              onNext={() => setStep(8)}
              onBack={() => setStep(6)}
            />
          )}
          {step === 8 && (
            <Step8
              plan={plan}
              update={update}
              onNext={() => setStep(9)}
              onBack={() => setStep(7)}
            />
          )}
          {step === 9 && (
            <Step9
              plan={plan}
              update={update}
              onNext={() => setStep(10)}
              onBack={() => setStep(8)}
            />
          )}
          {step === 10 && (
            <Step10 onNext={() => setStep(11)} onBack={() => setStep(9)} />
          )}
          {step === 11 && (
            <Step11
              plan={plan}
              update={update}
              onBack={() => setStep(10)}
              onSubmit={submit}
              status={status}
              errorMsg={errorMsg}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <div className="px-5 sm:px-6 pt-5 sm:pt-6 md:px-14">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-savage-white/50">
        <span>Your setlist · {String(step).padStart(2, "0")} of {TOTAL_STEPS}</span>
        <span className="text-savage-yellow">
          {Math.round((step / TOTAL_STEPS) * 100)}%
        </span>
      </div>
      <div className="mt-3 flex gap-1">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i + 1 <= step ? "bg-savage-yellow" : "bg-savage-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Shell({
  overline,
  title,
  subtitle,
  children,
  heroTitle,
}: {
  overline: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  heroTitle?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
        {overline}
      </p>
      {heroTitle ? (
        <h1 className="font-display uppercase mt-3 sm:mt-4 text-[2rem] sm:text-[2.75rem] md:text-[4.25rem] leading-[0.9] text-savage-white max-w-4xl">
          {title}
        </h1>
      ) : (
        <h1 className="font-display uppercase mt-3 sm:mt-4 text-[1.75rem] sm:text-[2.25rem] md:text-[3rem] leading-[0.95] text-savage-white max-w-3xl">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="font-editorial italic mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-savage-cream/90 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="mt-8 sm:mt-10">{children}</div>
    </div>
  );
}

function Nav({
  onBack,
  onNext,
  nextLabel = "Next →",
  nextDisabled,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-12 flex items-center justify-between gap-4">
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
      {onNext && (
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="rounded-full bg-savage-yellow px-7 py-4 font-semibold text-savage-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.3em] text-savage-white/60">
        {label}
        {required && " *"}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-savage-white/20 bg-savage-black px-5 py-4 text-lg text-savage-white outline-none placeholder:text-savage-white/30 focus:border-savage-yellow"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.3em] text-savage-white/60">
        {label}
        {required && " *"}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="mt-2 w-full rounded-xl border border-savage-white/20 bg-savage-black px-5 py-4 text-lg text-savage-white outline-none placeholder:text-savage-white/30 focus:border-savage-yellow resize-y"
      />
    </label>
  );
}

function CheckboxGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title?: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      {title && (
        <p className="text-lg font-medium text-savage-white mb-4">
          {title}
        </p>
      )}
      <div className="grid gap-2 md:grid-cols-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`text-left rounded-xl border px-4 py-3 transition text-sm ${
                active
                  ? "border-savage-yellow bg-savage-yellow/10 text-savage-yellow"
                  : "border-savage-white/20 text-savage-white hover:border-savage-white/50"
              }`}
            >
              <span className="mr-2">{active ? "✓" : "○"}</span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-3">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`text-left rounded-2xl border px-5 py-4 transition ${
              active
                ? "border-savage-yellow bg-savage-yellow/10"
                : "border-savage-white/20 hover:border-savage-white/50"
            }`}
          >
            <span
              className={`text-base font-medium ${
                active ? "text-savage-yellow" : "text-savage-white"
              }`}
            >
              {opt}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ---------------- STEPS ----------------

function Step1({ onNext }: { onNext: () => void }) {
  return (
    <Shell
      overline="Welcome · The crew"
      heroTitle
      title={
        <>
          You&apos;re in.
          <br />
          <span className="text-savage-yellow">Welcome to the band.</span>
        </>
      }
      subtitle="This is where you step into the lineup. Everything you write here lands straight in our rehearsal room, no forms team, no middle man. From here on, your taste is ours too."
    >
      <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
        <ManifestoCard
          n="01"
          title="It's your night"
          body="Every song, every moment. The dancefloor answers to you."
        />
        <ManifestoCard
          n="02"
          title="We are your accomplices"
          body="We read the room so you don't have to. You give us the direction, we make it happen."
          featured
        />
        <ManifestoCard
          n="03"
          title="Nothing leaves the band"
          body="This link is private. Only Christian and the crew read your answers."
        />
      </div>

      <div className="mt-8 sm:mt-10 rounded-3xl border border-savage-yellow/40 bg-gradient-to-br from-savage-yellow/10 to-transparent p-6 sm:p-7">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-yellow">
          Before we start
        </p>
        <ul className="mt-4 space-y-2.5 text-savage-white/85 leading-relaxed text-sm sm:text-base">
          <li>· Takes about 10 minutes. Your progress saves automatically.</li>
          <li>· There are no wrong answers. If you hesitate, skip it.</li>
          <li>· The more honest you are, the more the night feels like you.</li>
        </ul>
      </div>
      <Nav onNext={onNext} nextLabel="Step into rehearsal →" />
    </Shell>
  );
}

function ManifestoCard({
  n,
  title,
  body,
  featured,
}: {
  n: string;
  title: string;
  body: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-5 sm:p-6 ${
        featured
          ? "border-savage-yellow bg-savage-yellow/10"
          : "border-savage-white/10 bg-savage-black/60"
      }`}
    >
      <p
        className={`font-display text-2xl sm:text-3xl ${
          featured ? "text-savage-yellow" : "text-savage-white/40"
        }`}
      >
        {n}
      </p>
      <p
        className={`font-display uppercase mt-3 sm:mt-4 text-lg sm:text-xl ${
          featured ? "text-savage-yellow" : "text-savage-white"
        }`}
      >
        {title}
      </p>
      <p className="mt-2 text-sm text-savage-white/70 leading-relaxed">
        {body}
      </p>
    </div>
  );
}

function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <Shell
      overline="How we work · Together"
      heroTitle
      title={
        <>
          Two sides.
          <br />
          <span className="text-savage-yellow">One band.</span>
        </>
      }
      subtitle="A wedding with us isn&rsquo;t a vendor job. You bring the people, the room and the story. We bring the band, the DJ and the know-how. The show we build together is the thing none of us could pull off alone."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-savage-white/10 bg-savage-black/60 p-6 sm:p-7">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-yellow">
            Our side
          </p>
          <p className="font-display uppercase mt-3 text-xl sm:text-2xl">
            One DJ. Three musicians. No filler.
          </p>
          <p className="mt-3 text-sm sm:text-base text-savage-white/80 leading-relaxed">
            Sax, guitar and drums that leave the stage mid-show and play right
            inside your crowd. Three hours locked with the DJ, no dead air,
            no awkward transitions.
          </p>
        </div>
        <div className="rounded-3xl border border-savage-yellow/40 bg-gradient-to-br from-savage-yellow/10 to-transparent p-6 sm:p-7">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-yellow">
            Your side
          </p>
          <p className="font-display uppercase mt-3 text-xl sm:text-2xl">
            Your taste. Your must-plays. Your story.
          </p>
          <p className="mt-3 text-sm sm:text-base text-savage-white/90 leading-relaxed">
            The next 10 minutes shape your setlist. Everything you mark is a
            note we take to rehearsal. Everything you veto, we drop.
          </p>
        </div>
      </div>

      <p className="mt-8 font-editorial italic text-base sm:text-lg text-savage-cream/80 max-w-2xl">
        &ldquo;Our favourite nights are the ones where we&rsquo;re playing for
        friends. By the time we meet on the dancefloor, we want that to be
        you.&rdquo;
        <span className="block mt-2 text-xs not-italic uppercase tracking-[0.3em] text-savage-yellow">
          — Christian, Savage Party
        </span>
      </p>

      <Nav onBack={onBack} onNext={onNext} nextLabel="Start the setlist →" />
    </Shell>
  );
}

function Step3({
  plan,
  update,
  onNext,
  onBack,
}: {
  plan: PlanState;
  update: <K extends keyof PlanState>(k: K, v: PlanState[K]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canNext =
    plan.names.trim() &&
    plan.eventDate &&
    plan.venue.trim() &&
    plan.phone.trim();
  return (
    <Shell
      overline="Step 01 · The basics"
      title="Who we&rsquo;re playing for."
      subtitle="We confirm these against the contract. No surprises, just the facts the crew needs on the night."
    >
      <div className="grid gap-5">
        <Input
          label="Your names"
          value={plan.names}
          onChange={(v) => update("names", v)}
          required
          placeholder="e.g. Sarah & James"
        />
        <Input
          label="Event date"
          type="date"
          value={plan.eventDate}
          onChange={(v) => update("eventDate", v)}
          required
        />
        <Input
          label="Venue name"
          value={plan.venue}
          onChange={(v) => update("venue", v)}
          required
          placeholder="e.g. Castell de Caramany"
        />
        <Input
          label="Phone / WhatsApp"
          type="tel"
          value={plan.phone}
          onChange={(v) => update("phone", v)}
          required
        />
      </div>
      <Nav onBack={onBack} onNext={onNext} nextDisabled={!canNext} />
    </Shell>
  );
}

function Step4({
  plan,
  toggleInArray,
  update,
  onNext,
  onBack,
}: {
  plan: PlanState;
  toggleInArray: (k: "genres" | "decades" | "bandSongs", v: string) => void;
  update: <K extends keyof PlanState>(k: K, v: PlanState[K]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canNext =
    plan.genres.length > 0 && plan.decades.length > 0 && plan.favoriteArtists.trim();
  return (
    <Shell
      overline="Step 02 · Your world"
      title="What does your playlist look like?"
      subtitle="Pick what you actually listen to, not what you think a wedding should sound like. This is what tells us where the night lives."
    >
      <div className="space-y-10">
        <div>
          <p className="text-lg font-medium text-savage-white">
            Genres you love
          </p>
          <p className="text-savage-white/60 text-sm mt-1">Pick as many as you want.</p>
          <div className="mt-4">
            <CheckboxGroup
              options={GENRES}
              selected={plan.genres}
              onToggle={(v) => toggleInArray("genres", v)}
            />
          </div>
        </div>

        <Textarea
          label="Favourite artists"
          value={plan.favoriteArtists}
          onChange={(v) => update("favoriteArtists", v)}
          placeholder="List 3-8 artists that define your taste."
          required
          rows={4}
        />

        <div>
          <p className="text-lg font-medium text-savage-white">
            Music decades that define you
          </p>
          <div className="mt-4">
            <CheckboxGroup
              options={DECADES}
              selected={plan.decades}
              onToggle={(v) => toggleInArray("decades", v)}
            />
          </div>
        </div>
      </div>
      <Nav onBack={onBack} onNext={onNext} nextDisabled={!canNext} />
    </Shell>
  );
}

function Step5({
  plan,
  toggleInArray,
  onNext,
  onBack,
}: {
  plan: PlanState;
  toggleInArray: (k: "genres" | "decades" | "bandSongs", v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <Shell
      overline="Step 03 · The setlist · I"
      title="Which of these would you love live?"
      subtitle="Tick what you love. Don&rsquo;t stress about choosing everything, we read the room and keep the party going."
    >
      <div className="space-y-10">
        <CheckboxGroup
          title="Ready to get funky? Pick your classics."
          options={FUNKY_CLASSICS}
          selected={plan.bandSongs}
          onToggle={(v) => toggleInArray("bandSongs", v)}
        />
        <CheckboxGroup
          title="Feel-good hits to start the party."
          options={FEELGOOD}
          selected={plan.bandSongs}
          onToggle={(v) => toggleInArray("bandSongs", v)}
        />
      </div>
      <Nav onBack={onBack} onNext={onNext} />
    </Shell>
  );
}

function Step6({
  plan,
  toggleInArray,
  onNext,
  onBack,
}: {
  plan: PlanState;
  toggleInArray: (k: "genres" | "decades" | "bandSongs", v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <Shell
      overline="Step 04 · The setlist · II"
      title="More of what we can fire live."
      subtitle="Pick the ones that pull you onto the dancefloor. These are the bullets we load before the night starts."
    >
      <div className="space-y-10">
        <CheckboxGroup
          title="Guaranteed crowd pleasers"
          options={CROWD_PLEASERS}
          selected={plan.bandSongs}
          onToggle={(v) => toggleInArray("bandSongs", v)}
        />
        <CheckboxGroup
          title="Want some rock energy?"
          options={ROCK_ENERGY}
          selected={plan.bandSongs}
          onToggle={(v) => toggleInArray("bandSongs", v)}
        />
        <CheckboxGroup
          title="Hip Hop and R&B vibezzz"
          options={HIPHOP_RNB}
          selected={plan.bandSongs}
          onToggle={(v) => toggleInArray("bandSongs", v)}
        />
        <CheckboxGroup
          title="Peak energy"
          options={PEAK_ENERGY}
          selected={plan.bandSongs}
          onToggle={(v) => toggleInArray("bandSongs", v)}
        />
      </div>
      <Nav onBack={onBack} onNext={onNext} />
    </Shell>
  );
}

function Step7({
  plan,
  update,
  onNext,
  onBack,
}: {
  plan: PlanState;
  update: <K extends keyof PlanState>(k: K, v: PlanState[K]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <Shell
      overline="Step 05 · The wishlist"
      title="A song we don&rsquo;t have, but you love?"
      subtitle="If there&rsquo;s something you&rsquo;re dying to hear live that isn&rsquo;t in our list, drop it here. No promises, we&rsquo;ll try. Max 5 suggestions."
    >
      <Textarea
        label="Songs not in our setlist"
        value={plan.wishlistSongs}
        onChange={(v) => update("wishlistSongs", v)}
        placeholder={"One per line.\nMax 5."}
        rows={6}
      />
      <Nav onBack={onBack} onNext={onNext} />
    </Shell>
  );
}

function Step8({
  plan,
  update,
  onNext,
  onBack,
}: {
  plan: PlanState;
  update: <K extends keyof PlanState>(k: K, v: PlanState[K]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canNext = plan.crowd.length > 0;
  return (
    <Shell
      overline="Step 06 · The crowd"
      title="Who&rsquo;s going to be dancing?"
      subtitle="Helps us balance what to play for you versus what to play for everyone. No floor stays empty on our watch."
    >
      <div className="space-y-10">
        <Textarea
          label="What song makes you drop everything and run to the dancefloor?"
          value={plan.dropEverythingSong}
          onChange={(v) => update("dropEverythingSong", v)}
          placeholder="Optional. One title is enough."
          rows={2}
        />

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-savage-white/60 mb-3">
            What&apos;s your crowd like? *
          </p>
          <RadioGroup
            options={CROWD_OPTIONS}
            value={plan.crowd}
            onChange={(v) => update("crowd", v)}
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-savage-white/60">
            How much weight should we give to your guests&apos; tastes? *
          </p>
          <p className="text-savage-white/50 text-sm mt-1">
            0 = 100% for you · 10 = everyone enjoys equally
          </p>
          <div className="mt-5 flex items-center gap-4">
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={plan.guestWeight}
              onChange={(e) => update("guestWeight", Number(e.target.value))}
              className="flex-1 accent-savage-yellow"
            />
            <span className="font-display text-3xl text-savage-yellow w-12 text-right">
              {plan.guestWeight}
            </span>
          </div>
        </div>
      </div>
      <Nav onBack={onBack} onNext={onNext} nextDisabled={!canNext} />
    </Shell>
  );
}

function Step9({
  plan,
  update,
  onNext,
  onBack,
}: {
  plan: PlanState;
  update: <K extends keyof PlanState>(k: K, v: PlanState[K]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canNext = plan.specialMoments.trim().length > 0;
  return (
    <Shell
      overline="Step 07 · Must-plays"
      title="What you can&rsquo;t imagine not hearing."
      subtitle="Be selective. 10-20 songs max. This is the short list we tattoo onto the setlist, the songs the night cannot end without."
    >
      <div className="space-y-8">
        <Textarea
          label="Must play · non-negotiables (max 20)"
          value={plan.mustPlay}
          onChange={(v) => update("mustPlay", v)}
          placeholder="One per line."
          rows={6}
        />
        <Textarea
          label="Reference · your full musical world"
          value={plan.reference}
          onChange={(v) => update("reference", v)}
          placeholder="Spotify playlists, albums, artists, eras."
          rows={4}
        />
        <Textarea
          label="Special moments"
          value={plan.specialMoments}
          onChange={(v) => update("specialMoments", v)}
          placeholder="First dance, cake cutting, bouquet toss, surprise dedication, etc."
          required
          rows={4}
        />
      </div>
      <Nav onBack={onBack} onNext={onNext} nextDisabled={!canNext} />
    </Shell>
  );
}

function Step10({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <Shell
      overline="Step 08 · How the DJ closes"
      title="How the DJ carries you home."
      subtitle="Two live sets plus DJ before, between and after. The transitions are invisible. You won&rsquo;t feel the band leaving the stage, because the DJ is already there."
    >
      <div className="rounded-3xl border border-savage-white/10 bg-savage-black/60 p-6 sm:p-7 space-y-4 text-savage-white/85 leading-relaxed text-sm sm:text-base">
        <p>
          When the band takes its 5-minute break mid-show, the DJ bridges it
          without breaking the energy. Same tone, same BPM range, same room.
          You stay on the floor.
        </p>
        <p>
          Once the band wraps, the DJ closes the night solo. That&rsquo;s where
          we take deeper requests from the room and let the end feel earned.
          Any extra hours are the ones you book on top in the contract.
        </p>
        <p className="font-editorial italic text-savage-yellow">
          Tell us the weird stuff on the next page. The songs you love that no
          one else in the room will know. That&rsquo;s where the magic lives.
        </p>
      </div>
      <Nav onBack={onBack} onNext={onNext} nextLabel="Last step →" />
    </Shell>
  );
}

function Step11({
  plan,
  update,
  onBack,
  onSubmit,
  status,
  errorMsg,
}: {
  plan: PlanState;
  update: <K extends keyof PlanState>(k: K, v: PlanState[K]) => void;
  onBack: () => void;
  onSubmit: () => void;
  status: "idle" | "sending" | "sent" | "error";
  errorMsg: string | null;
}) {
  const canSubmit =
    plan.doNotPlay.trim() && plan.anythingElse.trim() && plan.involvement.length > 0;
  return (
    <Shell
      overline="Step 09 · Last round"
      heroTitle
      title={
        <>
          One last pass
          <br />
          <span className="text-savage-yellow">and we&rsquo;re in.</span>
        </>
      }
      subtitle="Tell us what you really don&rsquo;t want to hear, anything else we should know, and how involved you want to be. Then send it our way."
    >
      <div className="space-y-8">
        <Textarea
          label="Songs or artists you DON'T want to hear"
          value={plan.doNotPlay}
          onChange={(v) => update("doNotPlay", v)}
          placeholder="Be honest. Every veto saves a moment."
          required
          rows={4}
        />
        <Textarea
          label="Anything else we should know"
          value={plan.anythingElse}
          onChange={(v) => update("anythingElse", v)}
          placeholder="Family drama on the dancefloor? Aunt's favourite song? The surprise you're planning?"
          required
          rows={4}
        />
        <div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-white/60 mb-3">
            How involved do you want to be? *
          </p>
          <RadioGroup
            options={INVOLVEMENT_OPTIONS}
            value={plan.involvement}
            onChange={(v) => update("involvement", v)}
          />
        </div>
      </div>

      <div className="mt-10 sm:mt-12 rounded-3xl border border-savage-yellow/40 bg-gradient-to-br from-savage-yellow/10 to-transparent p-6 sm:p-7">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-yellow">
          Before you hit send
        </p>
        <p className="font-editorial italic mt-3 text-base sm:text-lg text-savage-cream/90 leading-relaxed">
          From here it goes straight to the band. If the music of your wedding
          was making you nervous, it doesn&rsquo;t have to anymore. We&rsquo;ve
          got it from here.
        </p>
      </div>

      <div className="mt-10 sm:mt-12 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-white/60 hover:text-savage-yellow"
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit || status === "sending"}
          className="rounded-full bg-savage-yellow px-7 sm:px-9 py-4 sm:py-5 text-base sm:text-lg font-semibold text-savage-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 uppercase tracking-[0.2em]"
        >
          {status === "sending" ? "Sending to the band…" : "Send it to the band →"}
        </button>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-savage-red">
          Something went wrong. {errorMsg}. Your draft is saved, try again in a
          moment.
        </p>
      )}
    </Shell>
  );
}

function SentScreen() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-20 sm:py-24 md:py-32">
      <div className="max-w-2xl text-center">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
          Got it
        </p>
        <h1 className="font-display uppercase mt-5 sm:mt-6 text-[2.25rem] sm:text-[3rem] md:text-[5rem] leading-[0.9]">
          You&rsquo;re officially
          <br />
          <span className="text-savage-yellow">part of the band.</span>
        </h1>
        <p className="font-editorial italic mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-savage-cream leading-[1.35]">
          We&rsquo;ve got your setlist on the board. From here on we&rsquo;re
          building your night together, song by song.
        </p>
        <div className="mt-8 sm:mt-10 rounded-3xl border border-savage-yellow/40 bg-savage-yellow/5 p-5 sm:p-6 text-left">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-yellow">
            What happens next
          </p>
          <ul className="mt-3 space-y-2 text-sm sm:text-base text-savage-white/85">
            <li>
              <span className="text-savage-yellow">01 ·</span> Within 48h we
              come back to you with the first draft of your show.
            </li>
            <li>
              <span className="text-savage-yellow">02 ·</span> We tweak it
              together until it feels like yours, as many rounds as you need.
            </li>
            <li>
              <span className="text-savage-yellow">03 ·</span> On the night,
              we play the wedding the three of us built.
            </li>
          </ul>
        </div>
        <p className="mt-8 sm:mt-10 text-sm sm:text-base text-savage-white/60">
          See you at soundcheck.
          <br />
          <span className="font-editorial italic text-savage-cream">
            Christian, on behalf of the band.
          </span>
        </p>
      </div>
    </div>
  );
}
