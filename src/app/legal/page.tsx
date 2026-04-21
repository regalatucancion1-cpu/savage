import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice",
  description:
    "Legal notice for savageparty.es under Spanish LSSI-CE law. Owner, tax ID, contact and applicable terms.",
  alternates: { canonical: "/legal" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "21 April 2026";

export default function LegalPage() {
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
          Legal notice
        </span>
      </header>

      <section className="px-6 py-12 sm:py-16 md:px-14 md:py-20 max-w-3xl">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
          Legal
        </p>
        <h1 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.75rem] md:text-[4rem] leading-[0.9] uppercase">
          Legal Notice
        </h1>
        <p className="mt-6 text-sm text-savage-white/60">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-8 text-savage-white/85 leading-relaxed">
          <Block title="Site owner">
            <p>
              This website (savageparty.es) is owned and operated by Christian
              Pujol, self-employed (autónomo) under Spanish law, trading as
              Savage Party.
            </p>
            <ul className="mt-3 list-none space-y-1 text-sm">
              <li>Based in Barcelona, Spain.</li>
              <li>
                Tax ID (NIF): available on request for any client with a
                legitimate purpose.
              </li>
              <li>
                Email:{" "}
                <a
                  href="mailto:infosavageparty@gmail.com"
                  className="text-savage-yellow hover:underline"
                >
                  infosavageparty@gmail.com
                </a>
              </li>
              <li>
                Phone: +34 681 955 024 · +34 634 038 685
              </li>
            </ul>
          </Block>

          <Block title="Purpose of the site">
            <p>
              savageparty.es exists to present the Savage Party live band and
              DJ service, share our repertoire, and let couples request a
              quote or build a custom show for their wedding or private event.
            </p>
          </Block>

          <Block title="Applicable law">
            <p>
              This site operates under Spanish law, in particular Law 34/2002
              on Information Society Services and E-Commerce (LSSI-CE) and
              Regulation (EU) 2016/679 (GDPR), together with Organic Law
              3/2018 on Personal Data Protection (LOPDGDD).
            </p>
          </Block>

          <Block title="Intellectual property">
            <p>
              All content on this site, including text, logos, photos, videos,
              graphics and layout, is the property of Savage Party or its
              licensors and is protected by Spanish and international
              copyright, trademark and related rights laws.
            </p>
            <p className="mt-3">
              You may view and share the content for personal, non-commercial
              purposes. Any other use, including reproduction, distribution,
              adaptation or public performance, requires prior written
              permission. Song titles and artist names belong to their
              respective copyright holders and appear here purely for
              descriptive purposes.
            </p>
          </Block>

          <Block title="Liability">
            <p>
              We take reasonable care to keep the site accurate and working,
              but we make no warranty that it will always be available,
              complete or error-free. To the maximum extent allowed by law, we
              are not liable for any indirect or consequential damage arising
              from the use of the site.
            </p>
            <p className="mt-3">
              Any actual booking is governed by a separate written agreement
              signed by both parties, not by this site.
            </p>
          </Block>

          <Block title="Links">
            <p>
              This site may contain links to third-party websites. We are not
              responsible for their content or their own policies. Visiting
              them is at your own risk.
            </p>
          </Block>

          <Block title="Jurisdiction">
            <p>
              Any dispute relating to this site shall be resolved before the
              courts of Barcelona, Spain, unless mandatory consumer law
              indicates otherwise.
            </p>
          </Block>

          <Block title="Contact">
            <p>
              Write to{" "}
              <a
                href="mailto:infosavageparty@gmail.com"
                className="text-savage-yellow hover:underline"
              >
                infosavageparty@gmail.com
              </a>{" "}
              for any legal, data protection or copyright question.
            </p>
          </Block>
        </div>

        <div className="mt-12 border-t border-savage-white/10 pt-6 text-xs uppercase tracking-[0.3em] text-savage-white/50 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacy" className="hover:text-savage-yellow">
            Privacy
          </Link>
          <Link href="/cookies" className="hover:text-savage-yellow">
            Cookies
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
