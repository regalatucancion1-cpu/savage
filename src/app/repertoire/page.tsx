import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { REPERTOIRE_CATEGORIES } from "@/content/repertoire";

export const metadata: Metadata = {
  title: "Repertoire · the 2027 set list",
  description:
    "The Savage Party 2027 set list for weddings. Seven blocks: chill vibing, funky + 80's, international hits, rock & classic, drums show, hip hop & R&B, DJ selection.",
  alternates: { canonical: "/repertoire" },
};

export default function RepertoirePage() {
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

      <section className="px-6 py-16 md:px-14 md:py-24">
        <p className="text-xs uppercase tracking-[0.4em] text-savage-yellow">
          The repertoire
        </p>
        <h1 className="font-display mt-6 text-[2rem] md:text-[4.5rem] leading-[0.9] uppercase max-w-4xl">
          The 2027 set list.
          <br />
          <span className="text-savage-yellow">Seven blocks, one night.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-savage-white/80 leading-relaxed max-w-2xl">
          This is our current set list. Every show is built from these blocks
          and tuned to your crowd. Pick what you love, flag what you don&apos;t
          want, and we&apos;ll handle the order.
        </p>
      </section>

      <section className="px-6 pb-24 md:px-14 md:pb-32">
        <div className="grid gap-6 md:grid-cols-2">
          {REPERTOIRE_CATEGORIES.map((cat, i) => (
            <div
              key={cat.id}
              className="rounded-3xl border border-savage-white/10 bg-savage-ink/30 p-7"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl text-savage-yellow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-lg md:text-xl font-medium text-savage-white">
                  {cat.title}
                </h2>
              </div>
              <ul className="mt-5 space-y-2 text-savage-white/80 leading-relaxed">
                {cat.songs.map((song) => (
                  <li key={song} className="text-sm md:text-base">
                    {song}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-savage-white/60 text-sm max-w-2xl">
          The DJ selection can be extended with your suggestions. Between
          blocks, the DJ keeps the room moving so the night never drops.
        </p>

        <div className="mt-10">
          <Link
            href="/build-your-show"
            className="inline-flex rounded-full bg-savage-yellow px-7 py-4 font-semibold text-savage-ink hover:brightness-110 transition"
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
