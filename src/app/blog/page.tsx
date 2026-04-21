import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { POSTS } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog · notes for couples planning a destination wedding",
  description:
    "Short, honest writing from Savage Party on destination wedding music, timelines, venues in Spain, Ibiza and Mallorca, and how to build a night that doesn't end.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Savage Party · Blog",
    description:
      "Notes for couples planning a destination wedding in Spain. Music, timelines, venues and honest vendor advice.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/sp1.jpg",
        width: 1200,
        height: 630,
        alt: "Savage Party live at a destination wedding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savage Party · Blog",
    description:
      "Notes for couples planning a destination wedding in Spain.",
    images: ["/sp1.jpg"],
  },
};

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-savage-black text-savage-white flex flex-col">
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
          The blog
        </p>
        <h1 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.75rem] md:text-[4.5rem] leading-[0.9] uppercase max-w-4xl">
          Notes for couples
          <br />
          <span className="text-savage-yellow">planning a destination wedding.</span>
        </h1>
        <p className="mt-5 sm:mt-6 max-w-2xl text-base sm:text-lg text-savage-white/75 leading-relaxed">
          Short, honest writing from a vendor on the ground. Music, timelines,
          venues and the small decisions that decide whether your dancefloor
          fills or empties.
        </p>
      </section>

      <section className="px-6 pb-16 sm:pb-20 md:px-14 md:pb-24">
        <ul className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {POSTS.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-3xl border border-savage-white/10 bg-savage-ink/30 overflow-hidden transition hover:border-savage-yellow/60"
              >
                <div className="relative aspect-[16/10] border-b border-savage-white/5 bg-savage-ink overflow-hidden">
                  {post.heroImage ? (
                    <Image
                      src={post.heroImage}
                      alt={post.heroAlt ?? post.title}
                      fill
                      sizes="(min-width: 768px) 45vw, 90vw"
                      className="object-cover object-[center_30%] transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-savage-white/20">
                      ■
                    </div>
                  )}
                </div>
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-savage-yellow">
                    <span>{post.category}</span>
                    <span className="text-savage-white/40">·</span>
                    <span className="text-savage-white/60">
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="font-display uppercase text-xl sm:text-2xl md:text-3xl mt-3 sm:mt-4 leading-tight group-hover:text-savage-yellow transition">
                    {post.title}
                  </h2>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-savage-white/75 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <p className="mt-5 sm:mt-6 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-white/50">
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
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
