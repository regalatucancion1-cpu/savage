import Link from "next/link";
import Image from "next/image";
import { POSTS } from "@/content/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://savageparty.es";

const BLOG_TEASERS = POSTS.slice(0, 3).map((p) => ({
  slug: p.slug,
  category: p.category,
  title: p.title,
  excerpt: p.excerpt,
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
      member: [
        { "@type": "Person", name: "Christian Pujol", roles: "DJ" },
      ],
      areaServed: [
        { "@type": "Country", name: "Spain" },
        { "@type": "Place", name: "Ibiza" },
        { "@type": "Place", name: "Mallorca" },
        { "@type": "Place", name: "Costa Brava" },
        { "@type": "Country", name: "France" },
        { "@type": "Country", name: "Italy" },
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
      telephone: "+34",
      email: "chrislogz0@gmail.com",
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
          <div className="hidden md:flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-savage-yellow animate-pulse" />
            <span className="text-xs uppercase tracking-[0.3em] text-savage-white/80">
              Booking 2026 · 2027
            </span>
          </div>
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
          <p className="font-editorial italic mt-8 text-2xl md:text-3xl max-w-2xl text-savage-cream">
            DJ plus three musicians. Sax, guitar and drums off the stage, in the
            middle of your crowd. Three hours, no filler, no barrier.
          </p>

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
              Ibiza · Mallorca · Costa Brava · France · Italy
            </span>
            <span className="text-savage-yellow">Reply in 24h</span>
          </div>
        </div>
      </section>

      {/* ROAMING — the one thing to remember */}
      <section className="relative border-t border-savage-white/10 px-6 py-24 md:px-14 md:py-32 overflow-hidden">
        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.2fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
              01 · Leave the stage
            </p>
            <h2 className="font-display mt-6 text-[2rem] md:text-[4rem] leading-[0.9] uppercase">
              The band
              <br />
              doesn&apos;t stay
              <br />
              <span className="text-savage-yellow">on the stage.</span>
            </h2>
            <p className="font-editorial italic mt-6 text-xl md:text-2xl max-w-xl text-savage-cream">
              Mid-show, the sax, the guitar and the drums walk off. They play
              next to the couple. They circle the dancefloor. No barrier between
              band and guests. It&apos;s the moment everyone films.
            </p>
            <p className="mt-6 text-savage-white/70 max-w-xl">
              You&apos;ve seen saxophonists at weddings. You&apos;ve seen DJs.
              You probably haven&apos;t seen three musicians stepping off the
              stage, weaving through your guests, and turning your dancefloor
              into the stage. That&apos;s the Savage move.
            </p>
          </div>

          <div className="relative grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="/sp11.jpg"
                alt="Savage Party roaming"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover object-[center_25%]"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mt-10">
              <Image
                src="/sp8.jpg"
                alt="Savage Party live"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover object-[center_25%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section id="live" className="relative border-t border-savage-white/10 px-6 py-24 md:px-14 md:py-32">
        <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
          02 · Watch us live
        </p>
        <h2 className="font-display mt-6 text-[2rem] md:text-[4rem] leading-[0.9] uppercase max-w-4xl">
          The room, mid-song.
          <br />
          <span className="text-savage-yellow">Not a promo reel.</span>
        </h2>
        <p className="font-editorial italic mt-6 text-xl md:text-2xl max-w-2xl text-savage-cream">
          Unedited clips from real weddings. Different venues, different
          crowds, same move: the band walks off the stage.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {[
            { title: "Castell de Caramany", place: "Costa Brava · 2025" },
            { title: "Ca's Patró March", place: "Mallorca · 2024" },
            { title: "Hacienda Na Xamena", place: "Ibiza · 2024" },
            { title: "Finca El Patio", place: "Marbella · 2024" },
          ].map((v) => (
            <figure
              key={v.title}
              className="group relative aspect-video overflow-hidden rounded-2xl border border-savage-white/10 bg-savage-ink/60"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-savage-yellow/60 bg-savage-black/40 text-savage-yellow backdrop-blur-sm transition group-hover:scale-110">
                  ▶
                </span>
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-savage-black/90 to-transparent p-5">
                <span className="font-display uppercase text-lg">{v.title}</span>
                <span className="text-xs uppercase tracking-[0.3em] text-savage-white/70">
                  {v.place}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-savage-white/60">
          Video placeholders. Real clips dropping soon. Ask for private links
          with full songs and no watermarks.
        </p>
      </section>

      {/* WHAT WE DO — explanation + timeline */}
      <section className="relative border-t border-savage-white/10 bg-savage-cream text-savage-ink px-6 py-24 md:px-14 md:py-32">
        <p className="text-xs uppercase tracking-[0.4em] text-savage-ink/60">
          03 · What we do
        </p>
        <h2 className="font-display mt-6 text-[2rem] md:text-[4rem] leading-[0.9] uppercase max-w-4xl">
          A DJ. A live band.
          <br />
          <span className="text-savage-red">One continuous night.</span>
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <p className="text-lg md:text-xl text-savage-ink/85 leading-relaxed max-w-xl">
            Savage Party is a DJ plus three live musicians, built for one job:
            turn your post-dinner hours into a concert your guests will talk
            about for years. We play after dinner only, three hours straight, no
            filler. The DJ holds the groove, the band steps in and out. When
            the sax, guitar and drums leave the stage, the dancefloor becomes
            the stage.
          </p>
          <p className="text-lg md:text-xl text-savage-ink/85 leading-relaxed max-w-xl">
            It&apos;s not a wedding band. It&apos;s not a DJ with add-ons. It&apos;s
            one act, one sound, built around your taste and your crowd.
            One hundred percent customisable, down to the last song, the last
            cue, the first dance. You tell us what you love. We do the rest.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <TimelineCard
            time="23:00"
            title="Set 1 · Warm-up"
            body="DJ and band together. Groove heavy, floor filling. Motown to modern pop, disco, some reggaetón if it fits your crowd."
          />
          <TimelineCard
            time="00:00"
            title="Set 2 · Peak"
            body="The sax, guitar and drums leave the stage and roam the dancefloor. This is the moment everyone films. Where your night breaks open."
            featured
          />
          <TimelineCard
            time="01:30"
            title="DJ · Late night"
            body="The DJ takes over, non-stop closer. Extend by 1 or 2 extra hours for a true Ibiza close."
          />
        </div>
      </section>

      {/* REPERTOIRE */}
      <section className="relative border-t border-savage-white/10 px-6 py-24 md:px-14 md:py-32">
        <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
          04 · The repertoire
        </p>
        <h2 className="font-display mt-6 text-[2rem] md:text-[4rem] leading-[0.9] uppercase max-w-4xl">
          Hundreds of tracks.
          <br />
          <span className="text-savage-yellow">Yours, curated.</span>
        </h2>
        <p className="font-editorial italic mt-6 text-xl md:text-2xl max-w-2xl text-savage-cream">
          Six decades, six genres. Funk, disco, Motown, house, Latin, pop.
          Your setlist is built around what you love and what makes your crowd
          move, not around a fixed repertoire.
        </p>

        <ul className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Superstition — Stevie Wonder",
            "September — Earth, Wind & Fire",
            "Don't Stop Me Now — Queen",
            "Uptown Funk — Bruno Mars",
            "Dance the Night — Dua Lipa",
            "Get Lucky — Daft Punk",
            "Mr Brightside — The Killers",
            "Valerie — Amy Winehouse",
            "Blinding Lights — The Weeknd",
            "One Kiss — Calvin Harris",
            "Pepas — Farruko",
            "Bailando — Enrique Iglesias",
          ].map((song) => (
            <li
              key={song}
              className="rounded-xl border border-savage-white/10 bg-savage-ink/40 px-5 py-4 text-savage-white/90"
            >
              {song}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-4 text-savage-white/70">
          <span>·  Funk</span>
          <span>·  Disco</span>
          <span>·  Motown</span>
          <span>·  House</span>
          <span>·  Latin</span>
          <span>·  Pop &amp; rock</span>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative border-t border-savage-white/10 bg-savage-ink text-savage-cream px-6 py-24 md:px-14 md:py-32">
        <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
          05 · Couples say
        </p>
        <h2 className="font-display mt-6 text-[2rem] md:text-[4rem] leading-[0.9] uppercase max-w-4xl">
          Real nights.
          <br />
          <span className="text-savage-yellow">Real words.</span>
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Testimonial
            quote="The moment the sax walked off the stage and came to us, the whole room lost it. Half our guests are still texting us about it."
            name="Sarah &amp; James"
            venue="Ibiza · 2024"
          />
          <Testimonial
            quote="We wanted a DJ. We ended up with a show. Best decision of the whole wedding."
            name="Clara &amp; Marc"
            venue="Mallorca · 2024"
          />
          <Testimonial
            quote="No filler, no cringe speeches, no karaoke. Three hours, the floor never emptied. Exactly what we asked for."
            name="Anna &amp; Theo"
            venue="Costa Brava · 2025"
          />
        </div>

        <p className="mt-8 text-savage-cream/60 text-sm">
          Placeholder quotes until the 2025 season reviews land. Ask us for
          couple references, we&apos;ll put you directly in touch.
        </p>
      </section>

      {/* FEATURED IN / BRANDS */}
      <section className="relative border-t border-savage-white/10 px-6 py-24 md:px-14 md:py-32">
        <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
          06 · Featured in
        </p>
        <h2 className="font-display mt-6 text-[2rem] md:text-[4rem] leading-[0.9] uppercase max-w-4xl">
          Venues, brands
          <br />
          <span className="text-savage-yellow">and the press.</span>
        </h2>
        <p className="font-editorial italic mt-6 text-xl md:text-2xl max-w-2xl text-savage-cream">
          A handful of the partners, venues and publications we&apos;ve played
          with or been featured by.
        </p>

        <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            "Vogue España",
            "Tatler Spain",
            "Condé Nast Traveller",
            "Castell de Caramany",
            "Hacienda Na Xamena",
            "Ca's Patró March",
            "Finca El Patio",
            "Mas Marroch",
          ].map((brand) => (
            <li
              key={brand}
              className="flex items-center justify-center rounded-2xl border border-savage-white/10 bg-savage-ink/30 px-6 py-10 text-center text-sm uppercase tracking-[0.2em] text-savage-white/70"
            >
              {brand}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-savage-white/50 text-sm">
          Logos placeholder. Real marks go here once clearance confirmed.
        </p>
      </section>

      {/* WHERE — destinations */}
      <section className="relative border-t border-savage-white/10 px-6 py-24 md:px-14 md:py-32">
        <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
          07 · Where we play
        </p>
        <h2 className="font-display mt-6 text-[2rem] md:text-[4rem] leading-[0.9] uppercase max-w-4xl">
          Destination weddings,
          <br />
          <span className="text-savage-yellow">Mediterranean and beyond.</span>
        </h2>
        <p className="font-editorial italic mt-6 text-xl md:text-2xl max-w-2xl text-savage-cream">
          Based in Barcelona. We travel with full gear and in-ear monitors.
          Travel is transparent, we don&apos;t hide it in packages.
        </p>

        <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[
            "Barcelona",
            "Ibiza",
            "Mallorca",
            "Menorca",
            "Costa Brava",
            "Sitges",
            "Valencia",
            "Madrid",
            "Marbella",
            "South of France",
            "Italy",
            "Portugal",
          ].map((city) => (
            <li
              key={city}
              className="rounded-2xl border border-savage-white/10 px-5 py-4 text-lg"
            >
              {city}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-savage-white/60">
          Don&apos;t see your venue? Ask us anyway. If the plane flies there, we
          probably can too.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative border-t border-savage-white/10 bg-savage-ink text-savage-cream px-6 py-24 md:px-14 md:py-32">
        <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
          08 · How it works
        </p>
        <h2 className="font-display mt-6 text-[2rem] md:text-[4rem] leading-[0.9] uppercase max-w-4xl">
          Three steps.
          <br />
          <span className="text-savage-yellow">No sales circus.</span>
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <HowStep
            n="01"
            title="Build a teaser"
            body="60 seconds in the planner. We show you the shape of your night, six sample tracks, the timing. No signup."
          />
          <HowStep
            n="02"
            title="Lock the date"
            body="One call, one email. Contract plus reservation fee. Your date is yours, the band is out of the market."
          />
          <HowStep
            n="03"
            title="Customise the show"
            body="Private planner (not a form, a conversation with the band) to tune setlist, do-not-plays, first dance, special moments."
          />
        </div>
      </section>

      {/* BLOG */}
      <section className="relative border-t border-savage-white/10 px-6 py-24 md:px-14 md:py-32">
        <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
          09 · From the road
        </p>
        <h2 className="font-display mt-6 text-[2rem] md:text-[4rem] leading-[0.9] uppercase max-w-4xl">
          Notes for couples
          <br />
          <span className="text-savage-yellow">planning a destination wedding.</span>
        </h2>
        <p className="font-editorial italic mt-6 text-xl md:text-2xl max-w-2xl text-savage-cream">
          Short, honest writing on music, timings, venues and how to keep the
          dancefloor full. Read before you book anyone.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
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

        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-savage-white/40 px-6 py-3 text-sm uppercase tracking-[0.3em] text-savage-white hover:border-savage-yellow hover:text-savage-yellow transition"
          >
            Read the blog →
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative border-t border-savage-white/10 px-6 py-24 md:px-14 md:py-32">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
            Let&apos;s see if the date&apos;s free
          </p>
          <h2 className="font-display mt-6 text-[2rem] md:text-[5rem] leading-[0.9] uppercase">
            Your night,
            <br />
            <span className="text-savage-yellow">performed live.</span>
          </h2>
          <p className="font-editorial italic mt-6 text-xl md:text-2xl max-w-2xl text-savage-cream">
            The teaser takes 60 seconds. You&apos;ll see your timing, some
            sample tracks and who we are. Then, if it clicks, we talk.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/build-your-show"
              className="rounded-full bg-savage-yellow px-7 py-4 font-semibold text-savage-ink hover:brightness-110 transition"
            >
              Build your show →
            </Link>
            <a
              href="mailto:chrislogz0@gmail.com?subject=Savage%20Party%20booking%20inquiry"
              className="rounded-full border border-savage-white/40 px-7 py-4 text-savage-white hover:border-savage-yellow hover:text-savage-yellow transition"
            >
              Write us directly
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-savage-white/10 px-6 py-10 md:px-14">
        <div className="flex flex-wrap items-center justify-between gap-6 text-xs uppercase tracking-[0.3em] text-savage-white/60">
          <span>© {new Date().getFullYear()} Savage Party · Barcelona</span>
          <div className="flex gap-6">
            <Link href="/build-your-show" className="hover:text-savage-yellow">
              Build your show
            </Link>
            <Link href="/blog" className="hover:text-savage-yellow">
              Blog
            </Link>
            <Link
              href="/design-system"
              className="hover:text-savage-yellow opacity-60"
            >
              Design system
            </Link>
          </div>
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
    <figure className="rounded-3xl border border-savage-cream/10 bg-savage-black/40 p-8 flex flex-col">
      <p className="font-display text-4xl text-savage-yellow leading-none">&ldquo;</p>
      <blockquote
        className="mt-2 text-lg leading-relaxed text-savage-cream/90"
        dangerouslySetInnerHTML={{ __html: quote }}
      />
      <figcaption className="mt-6 pt-6 border-t border-savage-cream/10">
        <p
          className="font-display uppercase text-savage-cream"
          dangerouslySetInnerHTML={{ __html: name }}
        />
        <p className="text-xs uppercase tracking-[0.3em] text-savage-cream/60 mt-1">
          {venue}
        </p>
      </figcaption>
    </figure>
  );
}
