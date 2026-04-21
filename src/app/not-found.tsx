import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Not found · Savage Party",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-savage-black text-savage-white flex flex-col">
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
        <span className="hidden sm:inline text-[10px] uppercase tracking-[0.3em] text-savage-white/50">
          404 · off the setlist
        </span>
      </header>

      <section className="flex flex-1 flex-col justify-center px-6 py-16 sm:py-24 md:px-14">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
          404
        </p>
        <h1 className="font-display mt-4 sm:mt-5 text-[2.25rem] sm:text-[3rem] md:text-[5rem] leading-[0.9] uppercase max-w-4xl">
          This track
          <br />
          <span className="text-savage-yellow">isn&apos;t on our setlist.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base sm:text-lg text-savage-white/75 leading-relaxed">
          The page you&apos;re looking for has either moved or never existed.
          Let&apos;s get you back to the show.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
          <Link
            href="/"
            className="rounded-full bg-savage-yellow px-6 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-semibold text-savage-ink hover:brightness-110 transition"
          >
            Back to home →
          </Link>
          <Link
            href="/build-your-show"
            className="rounded-full border border-savage-white/40 px-6 sm:px-7 py-3 sm:py-4 text-sm sm:text-base text-savage-white hover:border-savage-yellow hover:text-savage-yellow transition"
          >
            Build your show
          </Link>
        </div>

        <div className="mt-16 border-t border-savage-white/10 pt-8 max-w-xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savage-white/50">
            Popular pages
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <li>
              <Link href="/what-we-do" className="text-savage-white/85 hover:text-savage-yellow">
                What we do
              </Link>
            </li>
            <li>
              <Link href="/repertoire" className="text-savage-white/85 hover:text-savage-yellow">
                Repertoire
              </Link>
            </li>
            <li>
              <Link href="/destinations" className="text-savage-white/85 hover:text-savage-yellow">
                Destinations
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-savage-white/85 hover:text-savage-yellow">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
