import Link from "next/link";
import Image from "next/image";
import { POSTS } from "@/content/posts";
import { AudioPlayer } from "@/components/AudioPlayer";
import { REPERTOIRE_CATEGORIES } from "@/content/repertoire";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://savageparty.es";

const BLOG_TEASERS = POSTS.slice(0, 3).map((p) => ({
  slug: p.slug,
  category: p.category,
  title: p.title,
  excerpt: p.excerpt,
}));

const REPERTOIRE_TEASERS = REPERTOIRE_CATEGORIES.slice(0, 3).map((c) => ({
  title: c.title,
  songs: c.songs.slice(0, 4),
}));

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicGroup",
      "@id": `${SITE_URL}/#musicgroup`,
      name: "Savage Party",
      url: SITE_URL,
      image: `${SITE_URL}/sp1.jpg`,
      logo: `${SITE_URL}/logo-savage.png`,
      genre: ["Disco", "House", "Latin", "Funk", "Pop"],
      description:
        "DJ plus live band for destination weddings. Sax, guitar and drums off the stage, roaming into the crowd.",
      member: [{ "@type": "Person", name: "Christian Pujol", roles: "DJ" }],
      areaServed: [
        { "@type": "Place", name: "Barcelona" },
        { "@type": "Place", name: "Valencia" },
        { "@type": "Place", name: "Madrid" },
        { "@type": "Country", name: "Spain" },
        { "@type": "Place", name: "Ibiza" },
        { "@type": "Place", name: "Mallorca" },
        { "@type": "Place", name: "Costa Brava" },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Savage Party",
      url: SITE_URL,
      image: `${SITE_URL}/sp1.jpg`,
      priceRange: "€€€",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Barcelona",
        addressCountry: "ES",
      },
      telephone: ["+34681955024", "+34634038685"],
      email: "contact@savageparty.es",
    },
  ],
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-savage-black text-savage-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AudioPlayer src="/dj-mix.mp3" label="Savage · DJ Mix" />

      {/* HERO */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-savage-black">
        <div className="absolute inset-0">
          <video
            src="/hero.mp4"
            poster="/sp1.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            aria-label="Savage Party live"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-savage-black via-savage-black/70 to-savage-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-savage-black/80 via-savage-black/30 to-transparent" />
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

        <div className="relative flex items-center justify-between p-6 md:px-14 md:py-8">
          <Image
            src="/logo-savage.png"
            alt="Savage Party"
            width={180}
            height={50}
            priority
          />
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.3em] text-savage-white/80">
            <Link href="/what-we-do" className="hover:text-savage-yellow">
              What we do
            </Link>
            <Link href="/repertoire" className="hover:text-savage-yellow">
              Repertoire
            </Link>
            <Link href="/blog" className="hover:text-savage-yellow">
              Blog
            </Link>
            <Link
              href="/build-your-show"
              className="rounded-full bg-savage-yellow px-5 py-2 font-semibold normal-case tracking-normal text-savage-ink"
            >
              Book
            </Link>
          </nav>
        </div>

        <div className="relative mt-auto p-8 md:p-14 max-w-5xl">
          <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
            DJ + Live band · destination weddings
          </p>
          <h1 className="font-display mt-6 text-[2.25rem] leading-[0.9] md:text-[5rem] md:leading-[0.9] uppercase">
            We don&apos;t
            <br />
            play weddings.
            <br />
            <span className="text-savage-yellow">We perform them.</span>
          </h1>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/build-your-show"
              className="rounded-full bg-savage-yellow px-7 py-4 font-semibold text-savage-ink hover:brightness-110 transition"
            >
              Build your show →
            </Link>
            <Link
              href="#live"
              className="rounded-full border border-savage-white/40 px-7 py-4 text-savage-white hover:border-savage-yellow hover:text-savage-yellow transition"
            >
              Watch us live
            </Link>
          </div>
        </div>

        <div className="relative border-t border-savage-white/10 bg-savage-black/60 px-6 py-4 md:px-14 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-savage-white/70">
            <span>Based in Barcelona</span>
            <span className="hidden md:inline">
              Barcelona · Valencia · Madrid
            </span>
            <span className="text-savage-yellow">Reply in 24h</span>
          </div>
        </div>
      </section>

      {/* LEAVE THE STAGE — teaser */}
      <section className="relative border-t border-savage-white/10 px-6 py-24 md:px-14 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] items-center max-w-6xl">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
              Leave the stage
            </p>
            <h2 className="font-display mt-6 text-[2.25rem] md:text-[5rem] leading-[0.9] uppercase">
              Sax. Guitar. Drums.
              <br />
              <span className="text-savage-yellow">Right in your face.</span>
            </h2>
            <p className="mt-7 text-xl md:text-2xl text-savage-white/90 leading-[1.25] max-w-xl font-medium">
              Mid-show the stage empties. The band walks straight into the
              dancefloor and plays inches from your guests. Sweat, brass,
              strobes, zero distance.
            </p>
            <p className="mt-4 text-base md:text-lg text-savage-white/70 leading-relaxed max-w-xl">
              This is the three minutes everyone films. The reason the group
              chat won&apos;t shut up the next morning.
            </p>
            <Link
              href="/what-we-do"
              className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-savage-yellow hover:underline"
            >
              How the night works →
            </Link>
          </div>

          <div className="relative aspect-[4/5] max-w-sm w-full mx-auto overflow-hidden rounded-2xl">
            <Image
              src="/sp1-vintage.jpg"
              alt="Savage Party — the band"
              fill
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* VIDEOS — teaser */}
      <section
        id="live"
        className="relative border-t border-savage-white/10 px-6 py-24 md:px-14 md:py-32"
      >
        <div className="flex flex-wrap items-end justify-between gap-6 max-w-5xl">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
              Watch us live
            </p>
            <h2 className="font-display mt-6 text-[2rem] md:text-[4rem] leading-[0.9] uppercase">
              Real weddings.
              <br />
              <span className="text-savage-yellow">Unedited.</span>
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { title: "Castell de Caramany", place: "Costa Brava · 2025" },
            { title: "Ca's Patró March", place: "Mallorca · 2024" },
            { title: "Hacienda Na Xamena", place: "Ibiza · 2024" },
          ].map((v) => (
            <figure
              key={v.title}
              className="group relative aspect-video overflow-hidden rounded-2xl border border-savage-white/10 bg-savage-ink/60"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-savage-yellow/60 bg-savage-black/40 text-savage-yellow backdrop-blur-sm transition group-hover:scale-110">
                  ▶
                </span>
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-savage-black/90 to-transparent p-4">
                <span className="font-display uppercase text-sm">
                  {v.title}
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-savage-white/70">
                  {v.place}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* REPERTOIRE — teaser */}
      <section className="relative border-t border-savage-white/10 bg-savage-ink text-savage-cream px-6 py-24 md:px-14 md:py-32">
        <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
          Repertoire
        </p>
        <h2 className="font-display mt-6 text-[2rem] md:text-[4rem] leading-[0.9] uppercase max-w-4xl">
          Seven blocks.
          <br />
          <span className="text-savage-yellow">Yours, curated.</span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-savage-cream/80 leading-relaxed max-w-2xl">
          A taste of the 2027 set list. The full list lives on a separate page.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REPERTOIRE_TEASERS.map((cat, i) => (
            <div
              key={cat.title}
              className="rounded-3xl border border-savage-cream/10 bg-savage-black/30 p-7"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl text-savage-yellow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-medium text-savage-cream">
                  {cat.title}
                </h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-savage-cream/80 leading-relaxed">
                {cat.songs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/repertoire"
            className="inline-flex items-center gap-2 rounded-full border border-savage-cream/40 px-6 py-3 text-sm uppercase tracking-[0.3em] text-savage-cream hover:border-savage-yellow hover:text-savage-yellow transition"
          >
            See the full set list →
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative border-t border-savage-white/10 px-6 py-24 md:px-14 md:py-32">
        <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
          Couples say
        </p>
        <h2 className="font-display mt-6 text-[2rem] md:text-[4rem] leading-[0.9] uppercase max-w-4xl">
          Real nights.
          <br />
          <span className="text-savage-yellow">Real words.</span>
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Testimonial
            quote="The moment the sax walked off the stage and came to us, the whole room lost it."
            name="Sarah &amp; James"
            venue="Ibiza · 2024"
          />
          <Testimonial
            quote="We wanted a DJ. We ended up with a show. Best decision of the whole wedding."
            name="Clara &amp; Marc"
            venue="Mallorca · 2024"
          />
          <Testimonial
            quote="No filler, no cringe speeches, no karaoke. Three hours, the floor never emptied."
            name="Anna &amp; Theo"
            venue="Costa Brava · 2025"
          />
        </div>
      </section>

      {/* FEATURED STRIP */}
      <section className="relative border-t border-savage-white/10 bg-savage-ink/40 px-6 py-14 md:px-14">
        <p className="text-xs uppercase tracking-[0.3em] text-savage-white/60">
          Featured in
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4 text-sm uppercase tracking-[0.2em] text-savage-white/70">
          <li>Vogue España</li>
          <li>Tatler Spain</li>
          <li>Condé Nast Traveller</li>
          <li>Castell de Caramany</li>
          <li>Hacienda Na Xamena</li>
          <li>Mas Marroch</li>
        </ul>
      </section>

      {/* BLOG */}
      <section className="relative border-t border-savage-white/10 px-6 py-24 md:px-14 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6 max-w-5xl">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
              From the road
            </p>
            <h2 className="font-display mt-6 text-[2rem] md:text-[4rem] leading-[0.9] uppercase">
              Notes for couples
              <br />
              <span className="text-savage-yellow">planning a wedding.</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-savage-yellow hover:underline"
          >
            Read the blog →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BLOG_TEASERS.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col rounded-3xl border border-savage-white/10 bg-savage-ink/30 overflow-hidden transition hover:border-savage-yellow/60"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-savage-ink to-savage-black border-b border-savage-white/5 flex items-center justify-center text-savage-white/20">
                ■
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-savage-yellow">
                  {p.category}
                </p>
                <h3 className="font-display uppercase text-xl mt-3 leading-tight group-hover:text-savage-yellow transition">
                  {p.title}
                </h3>
                <p className="mt-3 text-savage-white/70 text-sm leading-relaxed">
                  {p.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative border-t border-savage-white/10 bg-savage-ink text-savage-cream px-6 py-24 md:px-14 md:py-32">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
            Let&apos;s see if the date&apos;s free
          </p>
          <h2 className="font-display mt-6 text-[2rem] md:text-[5rem] leading-[0.9] uppercase">
            Your night,
            <br />
            <span className="text-savage-yellow">performed live.</span>
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/build-your-show"
              className="rounded-full bg-savage-yellow px-7 py-4 font-semibold text-savage-ink hover:brightness-110 transition"
            >
              Build your show →
            </Link>
            <a
              href="mailto:contact@savageparty.es?subject=Savage%20Party%20booking%20inquiry"
              className="rounded-full border border-savage-cream/40 px-7 py-4 text-savage-cream hover:border-savage-yellow hover:text-savage-yellow transition"
            >
              Write us directly
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-savage-white/10 px-6 py-14 md:px-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Image
              src="/logo-savage.png"
              alt="Savage Party"
              width={140}
              height={40}
            />
            <p className="mt-4 text-sm text-savage-white/60 leading-relaxed max-w-xs">
              DJ + live band for destination weddings. Based in Barcelona.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-savage-yellow">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-savage-white/85">
              <li>
                <a
                  href="mailto:contact@savageparty.es"
                  className="hover:text-savage-yellow"
                >
                  contact@savageparty.es
                </a>
              </li>
              <li>
                <a href="tel:+34681955024" className="hover:text-savage-yellow">
                  +34 681 955 024
                </a>
              </li>
              <li>
                <a href="tel:+34634038685" className="hover:text-savage-yellow">
                  +34 634 038 685
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-savage-yellow">
              The show
            </p>
            <ul className="mt-4 space-y-2 text-savage-white/85">
              <li>
                <Link href="/what-we-do" className="hover:text-savage-yellow">
                  What we do
                </Link>
              </li>
              <li>
                <Link href="/repertoire" className="hover:text-savage-yellow">
                  Repertoire
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-savage-yellow">
                  Destinations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-savage-yellow">
              Explore
            </p>
            <ul className="mt-4 space-y-2 text-savage-white/85">
              <li>
                <Link
                  href="/build-your-show"
                  className="hover:text-savage-yellow"
                >
                  Build your show
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-savage-yellow">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-savage-white/10 text-xs uppercase tracking-[0.3em] text-savage-white/50">
          © {new Date().getFullYear()} Savage Party · Barcelona
        </div>
      </footer>
    </main>
  );
}

function Testimonial({
  quote,
  name,
  venue,
}: {
  quote: string;
  name: string;
  venue: string;
}) {
  return (
    <figure className="rounded-3xl border border-savage-white/10 bg-savage-ink/30 p-7 flex flex-col">
      <p className="font-display text-4xl text-savage-yellow leading-none">
        &ldquo;
      </p>
      <blockquote
        className="mt-2 text-lg leading-relaxed text-savage-white/90"
        dangerouslySetInnerHTML={{ __html: quote }}
      />
      <figcaption className="mt-6 pt-6 border-t border-savage-white/10">
        <p
          className="font-display uppercase text-savage-white"
          dangerouslySetInnerHTML={{ __html: name }}
        />
        <p className="text-xs uppercase tracking-[0.3em] text-savage-white/60 mt-1">
          {venue}
        </p>
      </figcaption>
    </figure>
  );
}
