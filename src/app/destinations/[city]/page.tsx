import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CITY_LANDINGS, getCityBySlug } from "@/content/cityLandings";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://savageparty.es";

export function generateStaticParams() {
  return CITY_LANDINGS.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const landing = getCityBySlug(city);
  if (!landing) return { title: "Not found" };
  return {
    title: landing.seoTitle,
    description: landing.seoDescription,
    alternates: { canonical: `/destinations/${landing.slug}` },
    openGraph: {
      title: landing.seoTitle,
      description: landing.seoDescription,
      url: `/destinations/${landing.slug}`,
      type: "website",
      images: [
        {
          url: "/og-default.jpg",
          width: 1200,
          height: 630,
          alt: `Savage Party wedding in ${landing.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: landing.seoTitle,
      description: landing.seoDescription,
      images: ["/og-default.jpg"],
    },
  };
}

export default async function CityLandingPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const landing = getCityBySlug(city);
  if (!landing) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Savage Party",
    url: `${SITE_URL}/destinations/${landing.slug}`,
    areaServed: [landing.city, landing.region],
    description: landing.seoDescription,
  };

  const others = CITY_LANDINGS.filter((c) => c.slug !== landing.slug);

  return (
    <main className="min-h-screen bg-savage-black text-savage-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
          href="/destinations"
          className="text-xs uppercase tracking-[0.3em] text-savage-white/70 hover:text-savage-yellow"
        >
          ← All destinations
        </Link>
      </header>

      <section className="px-6 py-14 sm:py-18 md:px-14 md:py-22 max-w-4xl">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
          {landing.region}
        </p>
        <h1 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.75rem] md:text-[4.5rem] leading-[0.9] uppercase">
          {landing.h1Lead}
          <br />
          <span className="text-savage-yellow">{landing.h1Highlight}</span>
        </h1>
        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-savage-white/85 leading-relaxed">
          {landing.intro}
        </p>
      </section>

      <section className="px-6 pb-16 sm:pb-20 md:px-14 md:pb-24 max-w-4xl space-y-10 sm:space-y-12">
        {landing.sections.map((s) => (
          <div key={s.title}>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-yellow">
              {s.title}
            </p>
            <p className="mt-3 text-base sm:text-lg text-savage-white/80 leading-relaxed">
              {s.body}
            </p>
          </div>
        ))}
      </section>

      <section className="border-t border-savage-white/10 bg-savage-ink text-savage-cream px-6 py-14 sm:py-16 md:px-14 md:py-20">
        <div className="max-w-3xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
            Ready?
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
              href={`mailto:contact@savageparty.es?subject=Savage%20Party%20${encodeURIComponent(landing.city)}%20wedding`}
              className="rounded-full border border-savage-cream/40 px-6 sm:px-7 py-3 sm:py-4 text-sm sm:text-base text-savage-cream hover:border-savage-yellow hover:text-savage-yellow transition"
            >
              Ask a question
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-savage-white/10 px-6 py-14 md:px-14 md:py-20">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-yellow">
          Other destinations
        </p>
        <ul className="mt-6 grid gap-3 grid-cols-2 md:grid-cols-4">
          {others.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/destinations/${c.slug}`}
                className="block rounded-xl border border-savage-white/10 px-4 py-3 text-savage-white/85 hover:border-savage-yellow hover:text-savage-yellow transition"
              >
                {c.city}
              </Link>
            </li>
          ))}
        </ul>
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
