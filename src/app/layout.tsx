import type { Metadata } from "next";
import { Archivo_Black, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://savageparty.es";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Savage Party · DJ + Live Band for Destination Weddings",
    template: "%s · Savage Party",
  },
  description:
    "DJ plus live band for destination weddings in Spain, Ibiza, Mallorca and the Mediterranean. Sax, guitar and drums off the stage, roaming into the crowd. Your night, performed live.",
  keywords: [
    "destination wedding band",
    "wedding DJ Spain",
    "live wedding band Barcelona",
    "Ibiza wedding band",
    "Mallorca wedding DJ",
    "Costa Brava wedding band",
    "DJ plus live band wedding",
    "wedding saxophone",
    "wedding musicians Spain",
    "Savage Party",
  ],
  authors: [{ name: "Savage Party" }],
  creator: "Savage Party",
  publisher: "Savage Party",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Savage Party",
    title: "Savage Party · DJ + Live Band for Destination Weddings",
    description:
      "We don't play weddings. We perform them. DJ plus sax, guitar and drums, off the stage, in the middle of your crowd.",
    images: [
      {
        url: "/sp1.jpg",
        width: 1200,
        height: 630,
        alt: "Savage Party live",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savage Party · DJ + Live Band for Destination Weddings",
    description:
      "We don't play weddings. We perform them. DJ plus sax, guitar and drums, off the stage, in the middle of your crowd.",
    images: ["/sp1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${instrumentSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-savage-black text-savage-white">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
