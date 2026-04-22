import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import TeaserFlow from "./TeaserFlow";

export const metadata: Metadata = {
  title: "Build Your Show · Savage Party",
  description:
    "Sketch your night in 60 seconds. See the shape of your savage wedding: timing, vibe, sample tracks.",
  alternates: { canonical: "/build-your-show" },
  openGraph: {
    title: "Build Your Show · Savage Party",
    description:
      "Sketch your wedding night in 60 seconds. DJ + live band, timing, vibe, sample tracks.",
    url: "/build-your-show",
    type: "website",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Savage Party teaser show builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your Show · Savage Party",
    description:
      "Sketch your wedding night in 60 seconds. DJ + live band teaser.",
    images: ["/og-default.jpg"],
  },
};

export default function BuildYourShowPage() {
  return (
    <main className="min-h-screen bg-savage-black text-savage-white flex flex-col">
      {/* Top bar */}
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
          href="/"
          className="text-xs uppercase tracking-[0.3em] text-savage-white/60 hover:text-savage-yellow"
        >
          ← Back
        </Link>
      </header>

      <TeaserFlow />
    </main>
  );
}
