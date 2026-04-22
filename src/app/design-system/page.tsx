import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design system · Savage Party",
  robots: { index: false, follow: false },
};

type Swatch = {
  name: string;
  hex: string;
  token: string;
  usage: string;
  textColor: "white" | "ink";
};

const palette: Swatch[] = [
  {
    name: "Savage Yellow",
    hex: "#FFC007",
    token: "bg-savage-yellow",
    usage: "Logo, headlines, primary CTAs, highlights",
    textColor: "ink",
  },
  {
    name: "Savage Red",
    hex: "#E63422",
    token: "bg-savage-red",
    usage: "Photo backdrop, feature sections, accents",
    textColor: "white",
  },
  {
    name: "Savage Black",
    hex: "#0E0C0A",
    token: "bg-savage-black",
    usage: "Global background (warm black, not pure)",
    textColor: "white",
  },
  {
    name: "Savage Cream",
    hex: "#F4E6CE",
    token: "bg-savage-cream",
    usage: "Secondary sections, text backgrounds",
    textColor: "ink",
  },
  {
    name: "Savage Ink",
    hex: "#2A1A0F",
    token: "bg-savage-ink",
    usage: "Body text on cream, deep warm brown",
    textColor: "white",
  },
  {
    name: "Savage White",
    hex: "#F8F4EA",
    token: "bg-savage-white",
    usage: "Body text on dark, warm off-white",
    textColor: "ink",
  },
];

const sampleTracks = [
  { title: "Don't Stop Me Now", artist: "Queen" },
  { title: "Titi Me Preguntó", artist: "Bad Bunny" },
  { title: "Pepas", artist: "Farruko" },
  { title: "September", artist: "Earth, Wind & Fire" },
  { title: "Dance the Night", artist: "Dua Lipa" },
  { title: "Freed From Desire", artist: "Gala" },
];

const timeline = [
  { time: "23:00", title: "DJ + BAND · SET 1", note: "The warm-up. Groove heavy, floor filling." },
  { time: "00:00", title: "DJ + BAND · SET 2", note: "Peak. Sax, guitar and drums leave the stage, into the crowd." },
  { time: "01:30", title: "DJ · LATE NIGHT", note: "Closer flow, non-stop to the end." },
  { time: "02:30", title: "SHUTDOWN", note: "" },
];

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-savage-black text-savage-white">
      {/* Top bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-savage-white/10 bg-savage-black/80 px-6 py-4 backdrop-blur">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-savage.png"
            alt="Savage Party"
            width={140}
            height={40}
          />
          <span className="hidden text-xs uppercase tracking-[0.3em] text-savage-white/60 md:inline">
            Design System · v0.1
          </span>
        </Link>
        <nav className="flex gap-6 text-xs uppercase tracking-[0.2em] text-savage-white/70">
          <a href="#palette" className="hover:text-savage-yellow">Palette</a>
          <a href="#type" className="hover:text-savage-yellow">Type</a>
          <a href="#hero" className="hover:text-savage-yellow">Hero</a>
          <a href="#teaser" className="hover:text-savage-yellow">Teaser</a>
          <a href="#insider" className="hover:text-savage-yellow">Insider</a>
        </nav>
      </header>

      {/* Intro */}
      <section className="px-6 py-24 md:px-16 md:py-32">
        <p className="mb-6 text-xs uppercase tracking-[0.4em] text-savage-yellow">
          Savage Party · 2026 Web Rebuild
        </p>
        <h1 className="font-display text-5xl md:text-8xl leading-[0.95]">
          <span className="italic">The visual system</span>
          <br />
          <span className="text-savage-yellow">for a live band</span>
          <br />
          <span className="italic">that behaves like a brand.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-savage-cream">
          This page is a live spec. Scroll through it to see the palette, typography,
          and two mockups: the public teaser (pre-sale) and the band-insider surface
          (post-sale). Everything is editable, this is how we iterate.
        </p>
      </section>

      {/* PALETTE */}
      <section id="palette" className="border-t border-savage-white/10 px-6 py-20 md:px-16 md:py-28">
        <SectionHeader overline="01" title="Palette" subtitle="Six colors, three modes." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {palette.map((s) => (
            <div
              key={s.hex}
              className={`relative flex h-56 flex-col justify-between overflow-hidden rounded-2xl border border-savage-white/10 p-6 ${s.token} ${
                s.textColor === "ink" ? "text-savage-ink" : "text-savage-white"
              }`}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em]">
                <span>{s.name}</span>
                <span className="opacity-70">{s.hex}</span>
              </div>
              <p className="text-sm leading-snug opacity-85">{s.usage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TYPOGRAPHY */}
      <section id="type" className="border-t border-savage-white/10 bg-savage-cream px-6 py-20 text-savage-ink md:px-16 md:py-28">
        <SectionHeader
          overline="02"
          title="Typography"
          subtitle="Poster display. Editorial italic. Clean body."
          tone="ink"
        />
        <div className="mt-12 grid gap-16 lg:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-savage-ink/60">
              Display · Archivo Black
            </p>
            <p className="font-display text-5xl md:text-6xl mt-4 leading-[0.85] uppercase">
              Your night.
              <br />
              Performed live.
            </p>
            <p className="font-display text-xl md:text-2xl mt-6 uppercase text-savage-ink/80 leading-tight">
              Headlines. Poster titles. Big statements.
            </p>
            <div className="mt-8 flex flex-wrap gap-2 text-xs text-savage-ink/70">
              <span className="rounded-full border border-savage-ink/20 px-3 py-1">Black, 900</span>
              <span className="rounded-full border border-savage-ink/20 px-3 py-1">Tight tracking</span>
              <span className="rounded-full border border-savage-ink/20 px-3 py-1">Uppercase</span>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-savage-ink/60">
              Editorial · Instrument Serif
            </p>
            <p className="font-editorial italic text-5xl md:text-6xl mt-4 leading-[0.95]">
              Not a DJ.
              <br />
              Not a band.
            </p>
            <p className="font-editorial italic text-xl md:text-2xl mt-6 text-savage-ink/80">
              Pull quotes. Sub-headlines. The human voice between the loud ones.
            </p>
            <div className="mt-8 flex flex-wrap gap-2 text-xs text-savage-ink/70">
              <span className="rounded-full border border-savage-ink/20 px-3 py-1">Italic, 400</span>
              <span className="rounded-full border border-savage-ink/20 px-3 py-1">Regular, 400</span>
              <span className="rounded-full border border-savage-ink/20 px-3 py-1">Editorial</span>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-savage-ink/60">
              Body · Inter
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              A great night doesn&apos;t happen by accident. Tell us who you are
              and what you love, we&apos;ll design the rest around a 2-hour live
              set plus a 1-hour DJ close. Extra DJ hours available, talk to us.
            </p>
            <p className="mt-6 text-base leading-relaxed text-savage-ink/80">
              Paragraphs, UI, captions. Neutral sans that stays out of the way.
            </p>
            <div className="mt-8 flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-savage-ink/70">
              <span className="rounded-full bg-savage-ink/10 px-3 py-1">LABEL</span>
              <span className="rounded-full bg-savage-ink/10 px-3 py-1">CAPTION</span>
              <span className="rounded-full bg-savage-ink px-3 py-1 text-savage-cream">META</span>
            </div>
          </div>
        </div>
      </section>

      {/* HERO MOCKUP */}
      <section id="hero" className="border-t border-savage-white/10 px-6 py-20 md:px-16 md:py-28">
        <SectionHeader
          overline="03"
          title="Hero mockup"
          subtitle="Full-bleed. Video-first. One message, no escape."
        />

        <div className="mt-12 relative overflow-hidden rounded-3xl border border-savage-white/10 bg-savage-black min-h-[720px] md:min-h-[820px] flex flex-col">
          {/* Background photo (placeholder for 15s loop video) */}
          <div className="absolute inset-0">
            <Image
              src="/sp1.jpg"
              alt="Savage Party live"
              fill
              priority
              className="object-cover object-[center_28%]"
              sizes="100vw"
            />
            {/* Legibility gradient: darker at bottom and left where copy lives */}
            <div className="absolute inset-0 bg-gradient-to-t from-savage-black via-savage-black/70 to-savage-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-savage-black/80 via-savage-black/30 to-transparent" />
            {/* Grain */}
            <div
              className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.6) 0.5px, transparent 0.5px)",
                backgroundSize: "3px 3px",
              }}
              aria-hidden
            />
          </div>

          {/* Top bar inside hero */}
          <div className="relative flex items-center justify-between p-6 md:p-10">
            <Image
              src="/logo-savage.png"
              alt="Savage Party"
              width={180}
              height={50}
            />
            <div className="hidden md:flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-savage-yellow animate-pulse" />
              <span className="text-xs uppercase tracking-[0.3em] text-savage-white/80">
                Booking 2026 · 2027
              </span>
            </div>
          </div>

          {/* Center / bottom copy */}
          <div className="relative mt-auto p-8 md:p-14 max-w-5xl">
            <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
              DJ + Live band · destination weddings
            </p>
            <h2 className="font-display mt-6 text-[2.25rem] leading-[0.9] md:text-[4.5rem] md:leading-[0.9] uppercase">
              We don&apos;t
              <br />
              play weddings.
              <br />
              <span className="text-savage-yellow">We perform them.</span>
            </h2>
            <p className="font-editorial italic mt-8 text-2xl md:text-3xl max-w-2xl text-savage-cream">
              DJ plus three musicians. Sax, guitar and drums off the stage, in the
              middle of your crowd. Three hours, no filler, no barrier.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-full bg-savage-yellow px-7 py-4 font-semibold text-savage-ink hover:brightness-110 transition">
                Build your show →
              </button>
              <button className="rounded-full border border-savage-white/40 px-7 py-4 text-savage-white hover:border-savage-yellow hover:text-savage-yellow transition">
                Watch us live
              </button>
            </div>
          </div>

          {/* Bottom meta strip */}
          <div className="relative border-t border-savage-white/10 bg-savage-black/60 px-6 py-4 md:px-14 backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-savage-white/70">
              <span>Based in Barcelona</span>
              <span className="hidden md:inline">Ibiza · Mallorca · Costa Brava · France · Italy</span>
              <span className="text-savage-yellow">Reply in 24h</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-savage-white/50">
          Note · the final hero swaps the photo for a 15s looping video, same framing.
        </p>
      </section>

      {/* TEASER RESULT MOCKUP */}
      <section id="teaser" className="border-t border-savage-white/10 bg-savage-red px-6 py-20 text-savage-white md:px-16 md:py-28 relative overflow-hidden">
        <div className="halftone absolute inset-0 opacity-10 pointer-events-none" aria-hidden />

        <SectionHeader
          overline="04"
          title="Teaser result poster"
          subtitle="What visitors see after 60 seconds of the pre-sale flow."
          tone="on-red"
        />

        <div className="relative mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Poster */}
          <div className="rounded-3xl bg-savage-black p-10 md:p-14 text-savage-white border border-savage-white/10">
            <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
              Sarah &amp; James · Savage Night Preview
            </p>
            <h3 className="font-display italic text-5xl md:text-7xl mt-4 leading-[0.95]">
              Saturday
              <br />
              <span className="text-savage-yellow not-italic">July 25 · 2028</span>
              <br />
              <span className="italic">Castell de Caramany</span>
            </h3>

            <div className="mt-10 divide-y divide-savage-white/15 border-y border-savage-white/15">
              {timeline.map((t) => (
                <div
                  key={t.time}
                  className="grid grid-cols-[90px_1fr] items-baseline gap-6 py-5"
                >
                  <span className="font-display italic text-3xl text-savage-yellow">
                    {t.time}
                  </span>
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em]">{t.title}</p>
                    {t.note && (
                      <p className="mt-1 text-savage-white/70">{t.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Extend hours */}
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.3em] text-savage-white/60">
                Extend your night
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="rounded-full border border-savage-yellow bg-savage-yellow/10 px-4 py-2 text-sm text-savage-yellow">
                  3h · Base
                </span>
                <span className="rounded-full border border-savage-white/30 px-4 py-2 text-sm">
                  +1h DJ = 4h
                </span>
                <span className="rounded-full border border-savage-white/30 px-4 py-2 text-sm">
                  +2h DJ = 5h · Ibiza mode
                </span>
              </div>
            </div>
          </div>

          {/* Side column: sample tracks + photo strip + CTAs */}
          <div className="flex flex-col gap-8">
            <div className="rounded-3xl bg-savage-black/80 p-6 border border-savage-white/10">
              <p className="text-xs uppercase tracking-[0.3em] text-savage-yellow">
                Six sample tracks from your night
              </p>
              <ul className="mt-4 space-y-3">
                {sampleTracks.map((t) => (
                  <li key={t.title} className="flex items-baseline justify-between gap-4 border-b border-savage-white/10 pb-2 last:border-0">
                    <span className="font-display italic text-lg">{t.title}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-savage-white/60">
                      {t.artist}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Photo strip */}
            <div className="grid grid-cols-3 gap-2">
              <Photo src="/sp1.jpg" />
              <Photo src="/sp8.jpg" />
              <Photo src="/sp11.jpg" />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-savage-white/70 text-center">
              Real weddings. No stock, no filters.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <button className="rounded-full bg-savage-yellow px-6 py-3 font-semibold text-savage-ink">
                Book a call
              </button>
              <button className="rounded-full border border-savage-white/40 px-6 py-3 text-savage-white">
                Send availability by email
              </button>
            </div>
          </div>
        </div>

        <p className="relative mt-8 max-w-2xl text-savage-white/80">
          <span className="italic font-display">
            &ldquo;This is just the shape of your night. The full setlist gets
            built with you after you book. We don&apos;t freestyle weddings.&rdquo;
          </span>
        </p>
      </section>

      {/* BAND-INSIDER MOCKUP */}
      <section id="insider" className="border-t border-savage-white/10 bg-savage-cream px-6 py-20 text-savage-ink md:px-16 md:py-28">
        <SectionHeader
          overline="05"
          title="Band-insider surface"
          subtitle="Post-sale. Clients become crew. Tone shifts."
          tone="ink"
        />

        <div className="mt-12 overflow-hidden rounded-3xl bg-savage-ink text-savage-cream">
          <div className="grid lg:grid-cols-[1fr_1.2fr]">
            <div className="relative min-h-[320px] lg:min-h-full">
              <Image
                src="/sp8.jpg"
                alt="Savage Party"
                fill
                className="object-cover object-[center_25%]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className="p-10 md:p-14">
              <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
                Welcome to the crew
              </p>
              <h3 className="font-display italic text-4xl md:text-6xl mt-4 leading-[1]">
                Sarah, we&apos;re in.
                <br />
                <span className="not-italic text-savage-yellow">
                  Let&apos;s build your night.
                </span>
              </h3>

              <p className="mt-8 text-lg leading-relaxed text-savage-cream/90">
                From this moment, you&apos;re part of the Savage family. No forms
                pretending to be friendly, no customer service voice. The
                planner you&apos;re about to open is a conversation with the
                band. Pick what you love. Say what you don&apos;t want. We&apos;ll
                build the rest.
              </p>

              <p className="mt-6 font-display italic text-2xl text-savage-yellow">
                &ldquo;Think of us as four more friends at your wedding, who
                happen to be holding instruments.&rdquo;
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-savage-cream/60">
                — Christian, Savage Party
              </p>

              <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-savage-yellow px-6 py-3 font-semibold text-savage-ink">
                Open your planner →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <InsiderCard
            label="Your show"
            title="2h live + 1h DJ"
            body="Your three-hour savage slot, locked in. Extend via DJ hours, we have your back for late-night."
          />
          <InsiderCard
            label="Your sound"
            title="Curated, not crowdsourced"
            body="You pick from our repertoire. No Santa-list of random requests. We keep the night intentional."
          />
          <InsiderCard
            label="Your people"
            title="The band is reachable"
            body="Email, WhatsApp, one-on-one calls if you need. You're not a ticket in a CRM."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-savage-white/10 px-6 py-10 md:px-16">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-savage-white/60">
          <span>Savage Party · Design System v0.1</span>
          <Link href="/" className="hover:text-savage-yellow">
            ← Back to home
          </Link>
        </div>
      </footer>
    </main>
  );
}

function SectionHeader({
  overline,
  title,
  subtitle,
  tone = "dark",
}: {
  overline: string;
  title: string;
  subtitle: string;
  tone?: "dark" | "ink" | "on-red";
}) {
  const overlineColor =
    tone === "ink"
      ? "text-savage-ink/60"
      : tone === "on-red"
        ? "text-savage-yellow"
        : "text-savage-yellow";
  const subtitleColor =
    tone === "ink"
      ? "text-savage-ink/80"
      : tone === "on-red"
        ? "text-savage-white/80"
        : "text-savage-white/70";
  return (
    <div className="flex flex-col gap-3">
      <p className={`text-xs uppercase tracking-[0.4em] ${overlineColor}`}>
        {overline} · {title}
      </p>
      <h2 className="font-display italic text-4xl md:text-6xl leading-[1]">
        {title}.
      </h2>
      <p className={`max-w-xl text-lg ${subtitleColor}`}>{subtitle}</p>
    </div>
  );
}

function Photo({ src }: { src: string }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-savage-white/10">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-[center_25%]"
        sizes="(min-width: 1024px) 16vw, 33vw"
      />
    </div>
  );
}

function InsiderCard({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-savage-ink/10 bg-savage-white p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-savage-ink/60">
        {label}
      </p>
      <p className="font-display italic text-2xl mt-2 text-savage-ink">
        {title}
      </p>
      <p className="mt-3 text-savage-ink/80">{body}</p>
    </div>
  );
}
