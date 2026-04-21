import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookies and similar technologies used on savageparty.es, what they do, and how to control them.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "21 April 2026";

export default function CookiesPage() {
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
          Cookies
        </span>
      </header>

      <section className="px-6 py-12 sm:py-16 md:px-14 md:py-20 max-w-3xl">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
          Legal
        </p>
        <h1 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.75rem] md:text-[4rem] leading-[0.9] uppercase">
          Cookie Policy
        </h1>
        <p className="mt-6 text-sm text-savage-white/60">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-8 text-savage-white/85 leading-relaxed">
          <Block title="What are cookies">
            <p>
              Cookies are small text files a site stores on your browser.
              Similar technologies include local storage and tracking pixels.
              We use the minimum set needed to run the site and to remember the
              choices you make here.
            </p>
          </Block>

          <Block title="Cookies we use">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-savage-white/15 text-xs uppercase tracking-[0.2em] text-savage-white/60">
                  <tr>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Purpose</th>
                    <th className="py-2 pr-4">Type</th>
                    <th className="py-2">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-savage-white/10">
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs">
                      sp-cookie-consent-v1
                    </td>
                    <td className="py-3 pr-4">
                      Remembers your cookie choice so we don&apos;t ask again.
                    </td>
                    <td className="py-3 pr-4">Essential (local storage)</td>
                    <td className="py-3">12 months</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs">
                      Vercel / platform
                    </td>
                    <td className="py-3 pr-4">
                      Keeps the site running, balances traffic, protects from
                      abuse.
                    </td>
                    <td className="py-3 pr-4">Essential</td>
                    <td className="py-3">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-savage-white/75">
              We do not currently run analytics, advertising or social
              tracking cookies. If that changes, we will update this page and
              ask for your consent before loading them.
            </p>
          </Block>

          <Block title="Third-party content">
            <p>
              Parts of the site embed third-party content that may set their
              own cookies when you interact with it:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>YouTube (Google)</strong> — the video embeds load in
                privacy-enhanced mode and only set cookies if you press play.
                See{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-savage-yellow hover:underline"
                >
                  Google&apos;s privacy policy
                </a>
                .
              </li>
              <li>
                <strong>Web3Forms</strong> — used to deliver the booking form
                to our inbox. Their{" "}
                <a
                  href="https://web3forms.com/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-savage-yellow hover:underline"
                >
                  privacy policy
                </a>
                .
              </li>
            </ul>
          </Block>

          <Block title="How to control cookies">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Use the banner on your first visit to accept or reject
                non-essential cookies.
              </li>
              <li>
                Clear your browser&apos;s site data for savageparty.es to see
                the banner again.
              </li>
              <li>
                Most browsers let you block cookies globally or per site in
                their settings.
              </li>
            </ul>
            <p className="mt-3 text-sm text-savage-white/75">
              Blocking essential cookies may break parts of the site, like the
              booking flow.
            </p>
          </Block>

          <Block title="Contact">
            <p>
              For any question about cookies or your privacy, email{" "}
              <a
                href="mailto:infosavageparty@gmail.com"
                className="text-savage-yellow hover:underline"
              >
                infosavageparty@gmail.com
              </a>
              .
            </p>
          </Block>
        </div>

        <div className="mt-12 border-t border-savage-white/10 pt-6 text-xs uppercase tracking-[0.3em] text-savage-white/50 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacy" className="hover:text-savage-yellow">
            Privacy
          </Link>
          <Link href="/legal" className="hover:text-savage-yellow">
            Legal notice
          </Link>
          <Link href="/" className="hover:text-savage-yellow">
            ← Home
          </Link>
        </div>
      </section>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg sm:text-xl uppercase tracking-[0.05em] text-savage-yellow">
        {title}
      </h2>
      <div className="mt-3 text-[15px]">{children}</div>
    </div>
  );
}
