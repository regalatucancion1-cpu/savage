import Link from "next/link";
import Image from "next/image";
import { POSTS } from "@/content/posts";
import { AudioPlayer } from "@/components/AudioPlayer";
import { LiteYouTube } from "@/components/LiteYouTube";
import { REPERTOIRE_CATEGORIES } from "@/content/repertoire";

const HORIZONTAL_VIDEOS: { id: string; title: string }[] = [
  { id: "lvhUTYOjDPU", title: "Highlights La Paloma · ESL Night" },
  { id: "FOGHvcF17Wo", title: "Savage Party 2025" },
];

const VERTICAL_VIDEOS: { id: string; title: string }[] = [
  { id: "fbNAAY5r4-M", title: "SP Live 2025" },
  { id: "tdIqG_vv7tM", title: "Savage Party 2026" },
  { id: "3ovpgXyN9Dc", title: "Savage Almanita 2025" },
  { id: "Iu85UvapaYA", title: "Savage Party · La Baronia" },
  { id: "KbYpB6_v2Nc", title: "Savage Party 2025" },
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://savageparty.es";

const BLOG_TEASERS = POSTS.slice(0, 3).map((p) => ({
  slug: p.slug,
  category: p.category,
  title: p.title,
  excerpt: p.excerpt,
  teaserImage: p.midImage ?? p.heroImage,
  teaserAlt: p.midImageAlt ?? p.heroAlt,
}));

const REPERTOIRE_TAGS = [
  "Funk",
  "Disco",
  "Latin pop",
  "Hip hop",
  "R&B",
  "Rock classics",
  "80's",
  "House",
];

void REPERTOIRE_CATEGORIES;

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
      sameAs: [
        "https://www.instagram.com/lasavageparty/",
        "https://www.youtube.com/@savageparty2686",
        "https://www.tiktok.com/@savageparty.es",
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
      sameAs: [
        "https://www.instagram.com/lasavageparty/",
        "https://www.youtube.com/@savageparty2686",
        "https://www.tiktok.com/@savageparty.es",
      ],
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
      <section className="relative flex min-h-[72vh] sm:min-h-[80vh] md:min-h-[85vh] flex-col overflow-hidden bg-savage-black">
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
            <Link href="/faq" className="hover:text-savage-yellow">
              FAQ
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

        <div className="relative mt-auto px-6 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-20 md:px-14 md:pb-12 md:pt-32 max-w-5xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
            DJ + Live band · destination weddings
          </p>
          <h1 className="font-display mt-5 sm:mt-6 text-[2rem] sm:text-[3rem] md:text-[5rem] leading-[0.9] uppercase">
            We don&apos;t
            <br />
            play weddings
            <br />
            <span className="text-savage-yellow">we perform them</span>
          </h1>

          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/build-your-show"
              className="rounded-full bg-savage-yellow px-6 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-semibold text-savage-ink hover:brightness-110 transition"
            >
              Build your show →
            </Link>
            <Link
              href="#live"
              className="rounded-full border border-savage-white/40 px-6 sm:px-7 py-3 sm:py-4 text-sm sm:text-base text-savage-white hover:border-savage-yellow hover:text-savage-yellow transition"
            >
              Watch us live
            </Link>
          </div>
        </div>

        <div className="relative border-t border-savage-white/10 bg-savage-black/60 px-6 py-3 sm:py-4 md:px-14 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-savage-white/70">
            <span>Based in Barcelona</span>
            <span className="hidden sm:inline">
              Barcelona · Valencia · Madrid
            </span>
            <span className="text-savage-yellow">Reply in 24h</span>
          </div>
        </div>
      </section>

      {/* LEAVE THE STAGE */}
      <section className="relative border-t border-savage-white/10 px-6 py-16 sm:py-20 md:px-14 md:py-24">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20 items-center max-w-6xl">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
              Leave the stage
            </p>
            <h2 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.75rem] md:text-[4.75rem] leading-[0.88] uppercase">
              The wedding
              <br />
              that feels
              <br />
              <span className="text-savage-yellow">like a festival</span>
            </h2>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-savage-white/90 leading-[1.4] max-w-xl font-medium">
              Three hours, one continuous set. DJ and live band locked
              together. Sax walks between your tables, drums roll through the
              crowd, guitar plays from the middle of the floor. The energy
              doesn&apos;t drop, the music doesn&apos;t stop, the dancefloor
              doesn&apos;t empty until you say so.
            </p>
            <Link
              href="/what-we-do"
              className="mt-7 sm:mt-8 inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-savage-yellow hover:underline"
            >
              How the night works →
            </Link>
          </div>

          <div className="relative aspect-[2/3] max-w-xs sm:max-w-sm w-full mx-auto overflow-hidden rounded-2xl bg-savage-ink/40">
            <Image
              src="/sp1-vintage.jpg"
              alt="Savage Party live band Spain, sax player in the crowd at a destination wedding"
              fill
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="object-contain object-center"
            />
          </div>
        </div>
      </section>

      {/* VIDEOS — live + top moments */}
      <section
        id="live"
        className="relative border-t border-savage-white/10 px-6 py-16 sm:py-20 md:px-14 md:py-24"
      >
        <div className="flex flex-wrap items-end justify-between gap-6 max-w-5xl">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
              Watch us live
            </p>
            <h2 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.5rem] md:text-[4rem] leading-[0.9] uppercase">
              Real weddings
              <br />
              <span className="text-savage-yellow">live on film</span>
            </h2>
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-white/50">
            Highlights
          </p>
          <div className="mt-4 sm:mt-5 grid gap-4 sm:gap-5 md:grid-cols-2">
            {HORIZONTAL_VIDEOS.map((v) => (
              <LiteYouTube
                key={v.id}
                videoId={v.id}
                title={v.title}
                orientation="landscape"
              />
            ))}
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-white/50">
            Top moments · shorts
          </p>
          <div className="mt-4 sm:mt-5 grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {VERTICAL_VIDEOS.map((v) => (
              <LiteYouTube
                key={v.id}
                videoId={v.id}
                title={v.title}
                orientation="portrait"
              />
            ))}
          </div>
        </div>
      </section>

      {/* REPERTOIRE — library/menu, not blocks */}
      <section className="relative border-t border-savage-white/10 bg-savage-ink text-savage-cream px-6 py-16 sm:py-20 md:px-14 md:py-24">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
          Repertoire
        </p>
        <h2 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.75rem] md:text-[4.5rem] leading-[0.9] uppercase max-w-4xl">
          Your songs
          <br />
          <span className="text-savage-yellow">your call</span>
        </h2>
        <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-savage-cream/85 leading-relaxed max-w-2xl">
          Hundreds of tracks from disco, funk, Latin pop, hip hop and classic
          rock. You mark what you love in the planner. We build the wedding
          night around it.
        </p>

        <ul className="mt-7 sm:mt-8 flex flex-wrap gap-2 max-w-3xl">
          {REPERTOIRE_TAGS.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-savage-cream/20 px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-savage-cream/80"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/repertoire"
            className="inline-flex items-center gap-2 rounded-full bg-savage-yellow px-5 sm:px-6 py-3 text-sm font-semibold text-savage-ink hover:brightness-110 transition"
          >
            Browse the full library →
          </Link>
          <Link
            href="/build-your-show"
            className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-cream/70 hover:text-savage-yellow"
          >
            Build your setlist
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative border-t border-savage-white/10 px-6 py-16 sm:py-20 md:px-14 md:py-24">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
          Couples say
        </p>
        <h2 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.5rem] md:text-[4rem] leading-[0.9] uppercase max-w-4xl">
          Real nights
          <br />
          <span className="text-savage-yellow">real words</span>
        </h2>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Testimonial
            quote="The moment the sax came off the stage and walked up to our table, my grandmother started dancing. Best thirty seconds of the whole wedding."
            name="Sarah &amp; Cory"
            venue="Villa Almanita"
          />
          <Testimonial
            quote="We'd seen other bands play this exact room. It was the first time the floor didn't empty once the whole night."
            name="Andrea &amp; Marc"
            venue="Castell de Caramany"
          />
          <Testimonial
            quote="Our friends still ask what the hell just happened. That's exactly the reaction we wanted."
            name="Tony &amp; Katie"
            venue="La Baronia"
          />
          <Testimonial
            quote="Flew half our guests over from Scotland. Every single one of them talks about the sax coming into the crowd."
            name="Eilidh &amp; Kyle"
            venue="Hotel Casa Fuster"
          />
          <Testimonial
            quote="They read the room better than the photographer did. Every single moment landed."
            name="Guille &amp; Tatiana"
            venue="Espai Can Page"
          />
          <Testimonial
            quote="Three hours, zero drops. The DJ and the band locked together like they'd played a thousand weddings."
            name="Christina &amp; Victor"
            venue="Casa Felix"
          />
        </div>
      </section>

      {/* FEATURED STRIP · marquee */}
      <section className="relative border-t border-savage-white/10 bg-savage-ink/40 py-10 sm:py-12">
        <p className="px-6 md:px-14 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-white/60">
          Played at
        </p>
        <div className="marquee mt-5 sm:mt-6">
          <div className="marquee-track">
            {[...Array(2)].map((_, loop) => (
              <ul
                key={loop}
                aria-hidden={loop === 1}
                className="flex shrink-0 items-center gap-14 pr-14 text-sm uppercase tracking-[0.2em] text-savage-white/75"
              >
                <li>La Baronia</li>
                <li>Castell de Caramany</li>
                <li>Casa Felix</li>
                <li>Villa Almanita</li>
                <li>Castell de L&apos;Empordà</li>
                <li>Masia Cabellut</li>
                <li>Espai Can Page</li>
                <li>La Paloma</li>
                <li>Hotel Casa Fuster</li>
                <li>Mas Torroella</li>
                <li>Molí del Ballestar</li>
                <li>Cigarral de las Mercedes</li>
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="relative border-t border-savage-white/10 px-6 py-16 sm:py-20 md:px-14 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5 max-w-5xl">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
              From the road
            </p>
            <h2 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.5rem] md:text-[4rem] leading-[0.9] uppercase">
              Notes for couples
              <br />
              <span className="text-savage-yellow">planning a wedding</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-savage-yellow hover:underline"
          >
            Read the blog →
          </Link>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-3">
          {BLOG_TEASERS.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col rounded-3xl border border-savage-white/10 bg-savage-ink/30 overflow-hidden transition hover:border-savage-yellow/60"
            >
              <div className="relative aspect-[16/10] border-b border-savage-white/5 bg-savage-ink overflow-hidden">
                {p.teaserImage ? (
                  <Image
                    src={p.teaserImage}
                    alt={p.teaserAlt ?? p.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 90vw"
                    className="object-cover object-[center_30%] transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-savage-white/20">
                    ■
                  </div>
                )}
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
      <section className="relative border-t border-savage-white/10 bg-savage-ink text-savage-cream px-6 py-16 sm:py-20 md:px-14 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <video
            src="/cta.mp4"
            poster="/cta-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-r from-savage-ink via-savage-ink/80 to-savage-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-savage-ink/90 via-transparent to-savage-ink/70" />
        </div>
        <div className="relative max-w-4xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
            Let&apos;s see if the date&apos;s free
          </p>
          <h2 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[3rem] md:text-[5rem] leading-[0.9] uppercase">
            Your night
            <br />
            <span className="text-savage-yellow">performed live</span>
          </h2>
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/build-your-show"
              className="rounded-full bg-savage-yellow px-6 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-semibold text-savage-ink hover:brightness-110 transition"
            >
              Build your show →
            </Link>
            <a
              href="mailto:contact@savageparty.es?subject=Savage%20Party%20booking%20inquiry"
              className="rounded-full border border-savage-cream/40 px-6 sm:px-7 py-3 sm:py-4 text-sm sm:text-base text-savage-cream hover:border-savage-yellow hover:text-savage-yellow transition"
            >
              Write us directly
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-savage-white/10 px-6 py-12 sm:py-14 md:px-14 md:py-16">
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
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.instagram.com/lasavageparty/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Savage Party on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-savage-white/20 text-savage-white/85 hover:border-savage-yellow hover:text-savage-yellow transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[18px] w-[18px]"
                  aria-hidden
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@savageparty2686"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Savage Party on YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-savage-white/20 text-savage-white/85 hover:border-savage-yellow hover:text-savage-yellow transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-[18px] w-[18px]"
                  aria-hidden
                >
                  <path d="M23 12s0-3.5-.45-5.18a2.8 2.8 0 0 0-1.97-1.98C18.9 4.4 12 4.4 12 4.4s-6.9 0-8.58.44A2.8 2.8 0 0 0 1.45 6.82C1 8.5 1 12 1 12s0 3.5.45 5.18a2.8 2.8 0 0 0 1.97 1.98c1.68.44 8.58.44 8.58.44s6.9 0 8.58-.44a2.8 2.8 0 0 0 1.97-1.98C23 15.5 23 12 23 12Zm-13.2 3.2V8.8L15.6 12l-5.8 3.2Z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@savageparty.es"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Savage Party on TikTok"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-savage-white/20 text-savage-white/85 hover:border-savage-yellow hover:text-savage-yellow transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-[18px] w-[18px]"
                  aria-hidden
                >
                  <path d="M19.6 7.6a6.4 6.4 0 0 1-3.7-1.2 6.4 6.4 0 0 1-1.6-1.8V15a5.4 5.4 0 1 1-5.4-5.4c.3 0 .6 0 .9.1v2.9a2.5 2.5 0 1 0 1.7 2.4V2h2.8c.1 1 .5 1.9 1.1 2.7a5.6 5.6 0 0 0 4.2 2.1v2.8Z" />
                </svg>
              </a>
            </div>
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
              <li>
                <Link href="/faq" className="hover:text-savage-yellow">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-savage-white/10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs uppercase tracking-[0.3em] text-savage-white/50">
          <span>© {new Date().getFullYear()} Savage Party · Barcelona</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/legal" className="hover:text-savage-yellow">
              Legal notice
            </Link>
            <Link href="/privacy" className="hover:text-savage-yellow">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-savage-yellow">
              Cookies
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Testimonial({
  quote,
  name,
  venue,
  image,
  imageAlt,
}: {
  quote: string;
  name: string;
  venue: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <figure className="rounded-3xl border border-savage-white/10 bg-savage-ink/30 overflow-hidden flex flex-col">
      {image && (
        <div className="relative aspect-[4/3] border-b border-savage-white/10">
          <Image
            src={image}
            alt={imageAlt ?? `${name.replace(/&amp;/g, "&")} at ${venue}`}
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-7 flex flex-col">
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
      </div>
    </figure>
  );
}
