import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What we do · DJ plus live band for destination weddings",
  description:
    "How Savage Party works: one DJ, three live musicians, three hours after dinner, no filler. Sax, guitar and drums leave the stage mid-show and play in the middle of your crowd.",
  alternates: { canonical: "/what-we-do" },
  openGraph: {
    title: "What we do · Savage Party",
    description:
      "DJ + three live musicians. Three hours, one continuous night. Sax, guitar and drums leave the stage.",
    url: "/what-we-do",
    type: "website",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Savage Party live at a destination wedding" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What we do · Savage Party",
    description: "DJ + live band for destination weddings.",
    images: ["/og-default.jpg"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://savageparty.es";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Savage Party · DJ plus live band",
  provider: {
    "@type": "MusicGroup",
    name: "Savage Party",
    url: SITE_URL,
  },
  areaServed: ["Spain", "Ibiza", "Mallorca", "France", "Italy", "Portugal"],
  description:
    "One DJ, three live musicians, three hours after dinner. Sax, guitar and drums leave the stage and play in the crowd.",
  url: `${SITE_URL}/what-we-do`,
};

export default function WhatWeDoPage() {
  return (
    <main className="min-h-screen bg-savage-black text-savage-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="flex items-center justify-between border-b border-savage-white/10 px-6 py-5 md:px-14">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-savage.png"
            alt="Savage Party"
            width={140}
            height={40}
            priority
          />
        </Link>
        <Link
          href="/build-your-show"
          className="text-xs uppercase tracking-[0.3em] text-savage-yellow hover:underline"
        >
          Build your show →
        </Link>
      </header>

      <section className="px-6 py-14 sm:py-18 md:px-14 md:py-22">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
          What we do
        </p>
        <h1 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.75rem] md:text-[4.5rem] leading-[0.9] uppercase max-w-4xl">
          A DJ. A live band.
          <br />
          <span className="text-savage-yellow">One continuous night.</span>
        </h1>
        <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 lg:grid-cols-2 max-w-5xl">
          <p className="text-base sm:text-lg md:text-xl text-savage-white/85 leading-relaxed">
            Savage Party is a DJ plus three live musicians, built for one job:
            turn your post-dinner hours into a concert your guests will talk
            about for years. Three hours straight, no filler. The DJ holds the
            groove, the band steps in and out, and when the sax, guitar and
            drums leave the stage, the dancefloor becomes the stage.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-savage-white/85 leading-relaxed">
            It&apos;s not a wedding band. It&apos;s not a DJ with add-ons.
            It&apos;s one act, one sound, one hundred percent customisable
            down to the last song, the last cue, the first dance. You tell us
            what you love. We do the rest.
          </p>
        </div>
      </section>

      <section className="border-t border-savage-white/10 bg-savage-cream text-savage-ink px-6 py-16 sm:py-18 md:px-14 md:py-22">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-ink/60">
          The night
        </p>
        <h2 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.5rem] md:text-[4rem] leading-[0.9] uppercase max-w-4xl">
          Three hours after dinner.
          <br />
          <span className="text-savage-red">No filler.</span>
        </h2>

        <div className="mt-10 sm:mt-12 grid gap-5 sm:gap-6 md:grid-cols-3">
          <TimelineCard
            time="23:00"
            title="Set 1 · Warm-up"
            body="DJ and band together. Groove heavy, floor filling. Motown to modern pop, disco, some reggaetón if it fits your crowd."
          />
          <TimelineCard
            time="00:00"
            title="Set 2 · Peak"
            body="The sax, guitar and drums leave the stage and roam the dancefloor. This is the moment everyone films."
            featured
          />
          <TimelineCard
            time="01:30"
            title="DJ · Late night"
            body="The DJ takes over, non-stop closer. Extend by 1 or 2 extra hours for a true Ibiza close."
          />
        </div>
      </section>

      <section className="border-t border-savage-white/10 px-6 py-16 sm:py-18 md:px-14 md:py-22">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
          Why us
        </p>
        <h2 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.5rem] md:text-[4rem] leading-[0.9] uppercase max-w-4xl">
          Five reasons
          <br />
          <span className="text-savage-yellow">it works.</span>
        </h2>

        <ul className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2 max-w-5xl">
          <Reason
            title="Interactive energy"
            body="Our musicians perform among your guests, turning everyone into part of the celebration."
          />
          <Reason
            title="Seamless flow"
            body="The DJ and musicians perform as one, ensuring continuous rhythm and zero downtime."
          />
          <Reason
            title="Premium performance"
            body="Experienced professionals with a polished, international sound."
          />
          <Reason
            title="Customizable setup"
            body="Adaptable to villas, ballrooms, outdoor venues or any event space."
          />
          <Reason
            title="Unforgettable impact"
            body="Every performance feels spontaneous, inclusive and 100% live."
          />
        </ul>
      </section>

      <section className="border-t border-savage-white/10 bg-savage-ink text-savage-cream px-6 py-16 sm:py-18 md:px-14 md:py-22">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
          How it works
        </p>
        <h2 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.5rem] md:text-[4rem] leading-[0.9] uppercase max-w-4xl">
          Three steps.
          <br />
          <span className="text-savage-yellow">No sales circus.</span>
        </h2>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-3">
          <HowStep
            n="01"
            title="Build a teaser"
            body="60 seconds in the planner. We show you the shape of your night. No signup."
          />
          <HowStep
            n="02"
            title="Lock the date"
            body="One call, one email. Contract plus reservation fee. Your date is yours."
          />
          <HowStep
            n="03"
            title="Customise the show"
            body="Private planner to tune setlist, do-not-plays, first dance and special moments."
          />
        </div>

        <div className="mt-10">
          <Link
            href="/build-your-show"
            className="inline-flex rounded-full bg-savage-yellow px-6 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-semibold text-savage-ink hover:brightness-110 transition"
          >
            Build your show →
          </Link>
        </div>
      </section>

      <footer className="border-t border-savage-white/10 px-6 py-10 md:px-14 mt-auto">
        <div className="flex flex-wrap items-center justify-between gap-6 text-xs uppercase tracking-[0.3em] text-savage-white/60">
          <span>© {new Date().getFullYear()} Savage Party · Barcelona</span>
          <Link href="/" className="hover:text-savage-yellow">
            Back home
          </Link>
        </div>
      </footer>
    </main>
  );
}

function TimelineCard({
  time,
  title,
  body,
  featured,
}: {
  time: string;
  title: string;
  body: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl p-8 ${
        featured
          ? "bg-savage-ink text-savage-cream border border-savage-ink"
          : "bg-savage-white/60 border border-savage-ink/10"
      }`}
    >
      <p
        className={`font-display text-3xl ${
          featured ? "text-savage-yellow" : "text-savage-red"
        }`}
      >
        {time}
      </p>
      <p
        className={`text-xs uppercase tracking-[0.3em] mt-4 ${
          featured ? "text-savage-cream/60" : "text-savage-ink/60"
        }`}
      >
        {title}
      </p>
      <p
        className={`mt-3 leading-relaxed ${
          featured ? "text-savage-cream/90" : "text-savage-ink/80"
        }`}
      >
        {body}
      </p>
    </div>
  );
}

function HowStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-savage-cream/10 bg-savage-black/40 p-8">
      <p className="font-display text-3xl text-savage-yellow">{n}</p>
      <p className="font-display uppercase text-xl mt-4">{title}</p>
      <p className="mt-3 leading-relaxed text-savage-cream/80">{body}</p>
    </div>
  );
}

function Reason({ title, body }: { title: string; body: string }) {
  return (
    <li className="rounded-2xl border border-savage-white/10 bg-savage-ink/30 p-6">
      <p className="text-lg font-medium text-savage-yellow">{title}</p>
      <p className="mt-2 text-savage-white/80 leading-relaxed">{body}</p>
    </li>
  );
}
