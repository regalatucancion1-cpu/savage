"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "sp-cookie-consent-v1";

type Consent = "accepted" | "rejected";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function decide(value: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      localStorage.setItem(`${STORAGE_KEY}-at`, new Date().toISOString());
    } catch {}
    try {
      window.dispatchEvent(new Event("sp-consent-change"));
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-6 z-50 mx-auto max-w-3xl rounded-2xl border border-savage-white/15 bg-savage-black/95 backdrop-blur-md shadow-2xl"
    >
      <div className="p-5 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-savage-white/85 max-w-xl">
          We use essential cookies to run this site and, if you accept, a few
          analytics cookies to understand what works. Read our{" "}
          <Link
            href="/cookies"
            className="underline decoration-savage-yellow/60 hover:text-savage-yellow"
          >
            cookie policy
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline decoration-savage-yellow/60 hover:text-savage-yellow"
          >
            privacy policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="rounded-full border border-savage-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-savage-white hover:border-savage-yellow hover:text-savage-yellow transition"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-full bg-savage-yellow px-4 py-2 text-xs uppercase tracking-[0.2em] font-semibold text-savage-ink hover:brightness-110 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
