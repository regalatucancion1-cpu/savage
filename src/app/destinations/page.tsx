import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { CITY_LANDINGS } from "@/content/cityLandings";

export const metadata: Metadata = {
  title: "Destinations · wedding DJ and live band across Spain",
  description:
    "Savage Party plays weddings across Barcelona, Valencia, Madrid and all across Spain, including the Balearic Islands. Destination weddings abroad on request.",
  alternates: { canonical: "/destinations" },
  openGraph: {
    title: "Destinations · Savage Party",
    description:
      "Weddings across Barcelona, Valencia, Madrid, Ibiza, Mallorca and all across Spain. Abroad on request.",
    url: "/destinations",
    type: "website",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Savage Party destination wedding" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Destinations · Savage Party",
    description: "Where we play weddings across Spain.",
    images: ["/og-default.jpg"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://savageparty.es";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Savage Party",
  url: `${SITE_URL}/destinations`,
  areaServed: [
    "Spain",
    "Barcelona",
    "Valencia",
    "Madrid",
    "Costa Brava",
    "Sitges",
    "Marbella",
    "Ibiza",
    "Mallorca",
    "Menorca",
  ],
};

const ON_REQUEST = [
  "Costa Brava",
  "Sitges",
  "Marbella",
  "Ibiza",
  "Mallorca",
  "Menorca",
  "South of France",
  "Italy",
  "Portugal",
];

export default function DestinationsPage() {
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
          Where we play
        </p>
        <h1 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.75rem] md:text-[4.5rem] leading-[0.9] uppercase max-w-4xl">
          Barcelona, Valencia,
          <br />
          <span className="text-savage-yellow">Madrid and beyond.</span>
        </h1>
        <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-savage-white/80 leading-relaxed max-w-2xl">
          Based in Barcelona. Pricing applies to weddings within 50 km of
          Barcelona. For venues further away, travel and logistics are priced
          transparently once we know the exact location.
        </p>
      </section>

      <section className="px-6 pb-16 sm:pb-20 md:px-14 md:pb-24 space-y-10 sm:space-y-12">
        <div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-yellow">
            Main destinations
          </p>
          <ul className="mt-4 grid gap-3 sm:gap-4 md:grid-cols-3">
            {CITY_LANDINGS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/destinations/${c.slug}`}
                  className="group block rounded-2xl border border-savage-yellow/40 bg-savage-yellow/5 px-5 sm:px-6 py-6 sm:py-8 transition hover:border-savage-yellow hover:bg-savage-yellow/10"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-savage-yellow/80">
                    {c.region}
                  </p>
                  <p className="mt-2 text-xl sm:text-2xl font-medium group-hover:text-savage-yellow transition">
                    {c.city} →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-white/50">
            Also on request
          </p>
          <ul className="mt-4 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {ON_REQUEST.map((city) => (
              <li
                key={city}
                className="rounded-xl border border-savage-white/10 px-5 py-4 text-savage-white/85"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-savage-white/60">
          Don&apos;t see your venue? Ask us anyway. If the plane flies there,
          we probably can too.
        </p>
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
