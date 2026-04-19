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
  "Dance — Cardi B ft Bruno Mars",
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
      const res = await fetch("/api/my-show/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, plan }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error ?? "Submit failed");
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
    <div className="px-6 pt-6 md:px-14">
      <div className="flex gap-1">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i + 1 <= step ? "bg-savage-yellow" : "bg-savage-white/10"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.3em] text-savage-white/50">
        {step} / {TOTAL_STEPS}
      </p>
    </div>
  );
}

function Shell({
  overline,
  title,
  subtitle,
  children,
}: {
  overline: string;
  title: string;
  subtitle?: string;
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
      {subtitle && (
        <p className="font-editorial italic mt-4 text-lg md:text-xl text-savage-cream max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="mt-10">{children}</div>
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
        <p className="font-display uppercase text-xl text-savage-yellow mb-4">
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
              className={`font-display uppercase ${
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
      overline="01 · Welcome"
      title="Let's plan your party soundtrack."
      subtitle="Hey. We're so excited to be part of your night. This isn't just a form, it's the starting point of something epic. Takes about 10 minutes: pick your favourite songs, tell us your vibe, and we'll handle the rest."
    >
      <div className="rounded-3xl border border-savage-white/10 bg-savage-black/60 p-6">
        <p className="font-display uppercase text-2xl text-savage-yellow">
          Heads up before we start
        </p>
        <ul className="mt-4 space-y-3 text-savage-cream/90 leading-relaxed">
          <li>· Your progress saves automatically on this device.</li>
          <li>· No wrong answers. If you&apos;re not sure, skip it.</li>
          <li>· The more honest your answers, the better your night.</li>
        </ul>
      </div>
      <Nav onNext={onNext} nextLabel="Let's go →" />
    </Shell>
  );
}

function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <Shell
      overline="02 · Welcome to the Savage team"
      title="You're in. Here's what we need."
      subtitle="We're a DJ plus a live band. Sax, guitar and drums step off the stage and play in the middle of your crowd. 100% interactive, 100% live, 100% yours."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-savage-white/10 bg-savage-black/60 p-6">
          <p className="font-display uppercase text-xl text-savage-yellow">
            What we bring
          </p>
          <p className="mt-3 text-savage-cream/90 leading-relaxed">
            DJ plus three live musicians, full PA, in-ear monitors, dancefloor
            lighting if your venue needs it. We arrive early, soundcheck, and
            the night runs on our cues.
          </p>
        </div>
        <div className="rounded-3xl border border-savage-white/10 bg-savage-black/60 p-6">
          <p className="font-display uppercase text-xl text-savage-yellow">
            What we need from you
          </p>
          <p className="mt-3 text-savage-cream/90 leading-relaxed">
            Your taste, your crowd, your must-plays and your don&apos;t-plays.
            Bring energy. There are no wrong answers, just the ones that make
            the night yours.
          </p>
        </div>
      </div>
      <Nav onBack={onBack} onNext={onNext} />
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
      overline="03 · First the basics"
      title="The boring but essential part."
      subtitle="We confirm these against the contract. No surprises."
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
      overline="04 · Your musical taste"
      title="What does your playlist look like?"
      subtitle="Pick what you actually listen to, not what you think a wedding should sound like."
    >
      <div className="space-y-10">
        <div>
          <p className="font-display uppercase text-xl text-savage-yellow">
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
          <p className="font-display uppercase text-xl text-savage-yellow">
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
      overline="05 · Songs for the band · part 1"
      title="Which of these would you love live?"
      subtitle="Tick what you love. Don't stress about choosing everything, we read the room and keep the party going."
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
      overline="06 · Songs for the band · part 2"
      title="More of the arsenal."
      subtitle="Pick the ones that pull you onto the dancefloor."
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
      overline="07 · Wishlist"
      title="A song we don't have, but you love?"
      subtitle="If there's something you're dying to hear live that isn't in our list, drop it here. No promises, we'll try. Max 5 suggestions."
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
      overline="08 · Your crowd"
      title="Who's going to be dancing?"
      subtitle="Helps us balance what to play for you versus what to play for everyone."
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
      overline="09 · Must play + reference"
      title="The non-negotiables and the deep cuts."
      subtitle="Be selective. 10-20 songs max on must-play. This is the short list of what you can't imagine NOT hearing."
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
      overline="10 · The DJ set"
      title="About the DJ coverage."
      subtitle="Two live sets plus DJ before, between and after. The transitions are seamless. You won't feel the band leaving the stage, because the DJ is already there."
    >
      <div className="rounded-3xl border border-savage-white/10 bg-savage-black/60 p-6 space-y-4 text-savage-cream/90 leading-relaxed">
        <p>
          When the band takes their 5-minute break mid-show, the DJ bridges it
          without breaking the energy. Same tone, same BPM range, same room.
        </p>
        <p>
          At 01:30 (or later if you extend) the DJ closes the night solo.
          That&apos;s when we take deeper requests from the room. The 1 or 2
          extra hours can be booked in the contract.
        </p>
        <p className="font-editorial italic text-savage-yellow text-xl">
          We want to know everything. Even the weird stuff.
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
      overline="11 · Final details"
      title="Almost there."
      subtitle="This last page is where you tell us what you really don't want and how involved you want to be."
    >
      <div className="space-y-8">
        <Textarea
          label="Songs or artists you DON'T want to hear"
          value={plan.doNotPlay}
          onChange={(v) => update("doNotPlay", v)}
          placeholder="Be honest. We won't judge."
          required
          rows={4}
        />
        <Textarea
          label="Anything else you'd like to tell us"
          value={plan.anythingElse}
          onChange={(v) => update("anythingElse", v)}
          placeholder="Family drama on the dancefloor? Aunt's favourite song? The surprise you're planning?"
          required
          rows={4}
        />
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-savage-white/60 mb-3">
            How involved do you want to be in music selection? *
          </p>
          <RadioGroup
            options={INVOLVEMENT_OPTIONS}
            value={plan.involvement}
            onChange={(v) => update("involvement", v)}
          />
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="text-xs uppercase tracking-[0.3em] text-savage-white/60 hover:text-savage-yellow"
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit || status === "sending"}
          className="rounded-full bg-savage-yellow px-8 py-4 font-semibold text-savage-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "sending" ? "Sending to the band…" : "Submit to the band →"}
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
    <div className="flex flex-1 items-center justify-center px-6 py-16 md:py-32">
      <div className="max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
          Received
        </p>
        <h1 className="font-display uppercase mt-6 text-[2.5rem] md:text-[5rem] leading-[0.9]">
          We&apos;re on it.
        </h1>
        <p className="font-editorial italic mt-8 text-xl md:text-2xl text-savage-cream">
          Your plan is with the band. We&apos;ll sit with it, then come back to
          you within 48h with a first draft of your night.
        </p>
        <p className="mt-10 text-savage-white/60">
          Welcome to the crew.
          <br />— Christian, Savage Party
        </p>
      </div>
    </div>
  );
}
