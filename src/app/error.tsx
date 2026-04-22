"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-savage-black text-savage-white flex flex-col justify-center px-6 py-16 sm:py-24 md:px-14">
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
        Something broke
      </p>
      <h1 className="font-display mt-4 sm:mt-5 text-[2.25rem] sm:text-[3rem] md:text-[4.5rem] leading-[0.9] uppercase max-w-3xl">
        The band hit a
        <br />
        <span className="text-savage-yellow">wrong note.</span>
      </h1>
      <p className="mt-6 max-w-xl text-base sm:text-lg text-savage-white/75 leading-relaxed">
        Something unexpected went wrong. Try again, and if it keeps happening
        drop us a line.
      </p>

      <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-savage-yellow px-6 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-semibold text-savage-ink hover:brightness-110 transition"
        >
          Try again →
        </button>
        <Link
          href="/"
          className="rounded-full border border-savage-white/40 px-6 sm:px-7 py-3 sm:py-4 text-sm sm:text-base text-savage-white hover:border-savage-yellow hover:text-savage-yellow transition"
        >
          Back home
        </Link>
        <a
          href="mailto:contact@savageparty.es?subject=Website%20error"
          className="rounded-full border border-savage-white/20 px-6 sm:px-7 py-3 sm:py-4 text-sm sm:text-base text-savage-white/80 hover:text-savage-yellow transition"
        >
          Report it
        </a>
      </div>
    </main>
  );
}
