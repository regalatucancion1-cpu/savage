import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ · booking Savage Party for a destination wedding",
  description:
    "Answers to the most common questions couples ask before booking Savage Party: how the DJ + live band show works, travel, pricing, customisation, what-if scenarios.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ · Savage Party",
    description:
      "Everything couples ask before booking Savage Party for a destination wedding in Spain.",
    url: "/faq",
    type: "website",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Savage Party FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ · Savage Party",
    description: "Common questions about booking Savage Party.",
    images: ["/og-default.jpg"],
  },
};

type FAQ = { q: string; a: string };
type FAQGroup = { title: string; eyebrow: string; items: FAQ[] };

const FAQ_GROUPS: FAQGroup[] = [
  {
    eyebrow: "The show",
    title: "How the night works",
    items: [
      {
        q: "What exactly is Savage Party?",
        a: "Savage Party is one act: a DJ plus three live musicians (sax, guitar, drums) built for destination weddings. It is not a wedding band with a DJ on the side and it is not a DJ with add-on musicians. It is a single, continuous show where the DJ holds the groove and the band weaves in and out, with roaming solos among your guests.",
      },
      {
        q: "How long is the show?",
        a: "Two hours of DJ + live band after dinner, plus 1 extra hour of DJ included right after, typically from around 23:00 to 02:00. You can extend the DJ for one or two more hours to close the night Ibiza-style.",
      },
      {
        q: "Do the musicians really leave the stage?",
        a: "Yes, this is the core of the format. During the peak of the night the sax, guitar and drums step off the stage and play in the middle of the dancefloor, next to your tables, between your guests. It is the moment everyone films.",
      },
      {
        q: "Do you play during dinner or ceremony?",
        a: "Our core show is the after-dinner fiesta. We sometimes cover the aperitivo or cocktail hour with a smaller line-up, but the heart of what we do is the post-dinner party.",
      },
      {
        q: "How customisable is the setlist?",
        a: "Fully. Once you book, you get a private show planner at savageparty.es/my-show where you pick your first dance, must-plays, do-not-plays, guest surprises and vibe references. We read the floor on the night, but the skeleton is yours.",
      },
    ],
  },
  {
    eyebrow: "Booking",
    title: "Dates, contracts, changes",
    items: [
      {
        q: "How far in advance should we book?",
        a: "Most couples book us 9 to 12 months ahead. If your date is closer than that, write to us anyway, we sometimes have late slots open.",
      },
      {
        q: "How do I reserve a date?",
        a: "Fill the short form at /build-your-show, we reply within 24h with availability and a custom quote. A signed contract locks the date, everything after that lives in your private show planner.",
      },
      {
        q: "What happens if we need to change the date?",
        a: "We do our best to relocate you to a new date. The exact terms are laid out in your contract.",
      },
      {
        q: "Do you sign a contract?",
        a: "Always. The contract covers start and end times, line-up, sound equipment, travel, cancellation terms and force majeure. Spanish law applies and the full legal notice lives at /legal.",
      },
    ],
  },
  {
    eyebrow: "Travel & venue",
    title: "Playing your venue",
    items: [
      {
        q: "Where do you play?",
        a: "We are based in Barcelona and play across Spain. Costa Brava, Sitges, Valencia, Madrid, Marbella, Ibiza, Mallorca and Menorca are our most common destinations. We have not played outside Spain yet but we are open to destination weddings abroad.",
      },
      {
        q: "Do you need a stage and sound system?",
        a: "Usually the venue's sound company provides the rig. If the venue does not have one, we can bring our own professional sound and light equipment, scaled to the guest count and space.",
      },
      {
        q: "What power and space do you need?",
        a: "One 16A power line and a speaker system powerful enough for the venue. We share the full venue-specific requirements once the date is confirmed.",
      },
      {
        q: "Can you play outdoors?",
        a: "Yes. Local noise curfews are the main thing to check with the venue.",
      },
    ],
  },
  {
    eyebrow: "Music",
    title: "Repertoire and requests",
    items: [
      {
        q: "What styles do you play?",
        a: "Disco, funk, Latin pop, R&B, hip hop, rock classics and house. The library leans party-first, with enough range to cover a mixed age group. Browse the full library at /repertoire.",
      },
      {
        q: "Can I request specific songs?",
        a: "Absolutely, the whole booking is built around it. You share your first dance, your must-play list, your do-not-play list and any guest surprises. We flag anything we cannot cover honestly before the night.",
      },
      {
        q: "Do you play in English and Spanish?",
        a: "Yes. Our repertoire is built around English and Spanish. Destination weddings in Spain usually mix both and the setlist follows the crowd.",
      },
    ],
  },
  {
    eyebrow: "Pricing",
    title: "What it costs",
    items: [
      {
        q: "How much does Savage Party cost?",
        a: "It depends on the venue, the date, travel and the line-up you pick. Every couple gets a custom quote, not a package price. Fill the short form at /build-your-show and you get a firm quote within 24h with everything broken down.",
      },
      {
        q: "What is included in the quote?",
        a: "Every wedding is different, which is why we don't publish packages. Each quote is personalized to your venue, guest count, line-up and logistics, and broken down line by line so you see exactly what's included.",
      },
    ],
  },
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://savageparty.es";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_GROUPS.flatMap((g) =>
    g.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    }))
  ),
  url: `${SITE_URL}/faq`,
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-savage-black text-savage-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="flex items-center justify-between border-b border-savage-white/10 px-5 sm:px-6 py-4 sm:py-5 md:px-14">
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

      <section className="px-6 py-12 sm:py-16 md:px-14 md:py-20 max-w-4xl">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
          FAQ
        </p>
        <h1 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.75rem] md:text-[4.5rem] leading-[0.9] uppercase">
          Everything couples ask
          <br />
          <span className="text-savage-yellow">before they book.</span>
        </h1>
        <p className="mt-5 sm:mt-6 max-w-2xl text-base sm:text-lg text-savage-white/75 leading-relaxed">
          Short, honest answers. If what you need is not here, write to{" "}
          <a
            href="mailto:contact@savageparty.es"
            className="text-savage-yellow hover:underline"
          >
            contact@savageparty.es
          </a>{" "}
          and we reply within 24h.
        </p>
      </section>

      <section className="px-6 pb-16 sm:pb-20 md:px-14 md:pb-24 max-w-4xl space-y-12 sm:space-y-14">
        {FAQ_GROUPS.map((g) => (
          <div key={g.title}>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
              {g.eyebrow}
            </p>
            <h2 className="font-display mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl uppercase leading-tight">
              {g.title}
            </h2>
            <ul className="mt-6 sm:mt-8 divide-y divide-savage-white/10 border-t border-savage-white/10">
              {g.items.map((item) => (
                <li key={item.q}>
                  <details className="group py-5 sm:py-6">
                    <summary className="flex cursor-pointer items-start gap-4 list-none">
                      <span className="flex-1 text-base sm:text-lg font-medium group-hover:text-savage-yellow transition">
                        {item.q}
                      </span>
                      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-savage-white/30 text-xs text-savage-white/70 group-open:rotate-45 group-open:border-savage-yellow group-open:text-savage-yellow transition">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-sm sm:text-base text-savage-white/80 leading-relaxed pr-10">
                      {item.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="border-t border-savage-white/10 bg-savage-ink text-savage-cream px-6 py-14 sm:py-16 md:px-14 md:py-20">
        <div className="max-w-3xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
            Still on the fence?
          </p>
          <h2 className="font-display mt-4 sm:mt-5 text-[1.75rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[0.95] uppercase">
            Let&apos;s see if the
            <br />
            <span className="text-savage-yellow">date&apos;s free.</span>
          </h2>
          <div className="mt-7 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/build-your-show"
              className="rounded-full bg-savage-yellow px-6 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-semibold text-savage-ink hover:brightness-110 transition"
            >
              Build your show →
            </Link>
            <a
              href="mailto:contact@savageparty.es?subject=Savage%20Party%20FAQ%20follow-up"
              className="rounded-full border border-savage-cream/40 px-6 sm:px-7 py-3 sm:py-4 text-sm sm:text-base text-savage-cream hover:border-savage-yellow hover:text-savage-yellow transition"
            >
              Ask a question
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
