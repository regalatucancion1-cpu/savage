import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Savage Party collects, uses and protects personal data under the GDPR and Spanish data protection law.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "21 April 2026";

export default function PrivacyPage() {
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
          Privacy
        </span>
      </header>

      <section className="px-6 py-12 sm:py-16 md:px-14 md:py-20 max-w-3xl">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-savage-yellow">
          Legal
        </p>
        <h1 className="font-display mt-4 sm:mt-5 text-[2rem] sm:text-[2.75rem] md:text-[4rem] leading-[0.9] uppercase">
          Privacy Policy
        </h1>
        <p className="mt-6 text-sm text-savage-white/60">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-8 text-savage-white/85 leading-relaxed">
          <Block title="1. Who we are">
            <p>
              Savage Party is a musical project based in Barcelona, Spain,
              offering DJ and live band services for destination weddings and
              private events. The data controller for this website is Christian
              Pujol, operating as an individual freelancer (autónomo) under
              Spanish law.
            </p>
            <p className="mt-3">
              You can reach us at{" "}
              <a
                href="mailto:infosavageparty@gmail.com"
                className="text-savage-yellow hover:underline"
              >
                infosavageparty@gmail.com
              </a>{" "}
              for any question related to your data.
            </p>
          </Block>

          <Block title="2. What data we collect">
            <p>We only collect data you give us voluntarily:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Booking form (/build-your-show):</strong> your names,
                email, phone (optional), wedding date, venue, guest count and
                the musical vibe you pick.
              </li>
              <li>
                <strong>Show planner (/my-show):</strong> your selected songs,
                timings, first-dance details, guest surprises, and any notes
                you share with the band.
              </li>
              <li>
                <strong>Direct emails:</strong> anything you send us via
                infosavageparty@gmail.com.
              </li>
              <li>
                <strong>Technical data:</strong> basic logs (IP, browser,
                referrer) collected by our hosting provider (Vercel) for
                security and service delivery.
              </li>
            </ul>
          </Block>

          <Block title="3. Why we use it">
            <ul className="list-disc space-y-2 pl-5">
              <li>To reply to your booking enquiry and prepare a quote.</li>
              <li>
                To plan and deliver your show (setlist, timings, logistics).
              </li>
              <li>To issue invoices and comply with Spanish tax law.</li>
              <li>To keep the website secure and functional.</li>
            </ul>
            <p className="mt-3">
              We will never sell your data, rent it or share it with third
              parties for marketing.
            </p>
          </Block>

          <Block title="4. Legal basis (GDPR Art. 6)">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Contract:</strong> processing needed to prepare or
                perform our contract with you.
              </li>
              <li>
                <strong>Legal obligation:</strong> keeping invoices and tax
                records as required by Spanish law.
              </li>
              <li>
                <strong>Consent:</strong> for optional cookies and any
                marketing. You can withdraw it at any time.
              </li>
              <li>
                <strong>Legitimate interest:</strong> keeping the site secure
                and replying to enquiries you send us.
              </li>
            </ul>
          </Block>

          <Block title="5. Who has access">
            <p>We use a small set of trusted providers to run the service:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Vercel Inc.</strong> — hosting of this website
                (servers in the EU where possible).
              </li>
              <li>
                <strong>Web3Forms</strong> — form delivery, used to send your
                enquiry to our inbox.
              </li>
              <li>
                <strong>Google LLC</strong> — our contact inbox lives on Gmail.
              </li>
              <li>
                <strong>Hostinger</strong> — our domain registrar.
              </li>
            </ul>
            <p className="mt-3">
              Some of these providers are based outside the EU. In that case,
              transfers are covered by Standard Contractual Clauses or
              equivalent safeguards under GDPR Art. 46.
            </p>
          </Block>

          <Block title="6. How long we keep it">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Booking enquiries that don&apos;t become a client:</strong>{" "}
                up to 12 months, then deleted.
              </li>
              <li>
                <strong>Client contracts and show files:</strong> up to 2 years
                after the event.
              </li>
              <li>
                <strong>Invoices and tax data:</strong> 6 years (Spanish
                Commercial Code and LGT).
              </li>
            </ul>
          </Block>

          <Block title="7. Your rights">
            <p>
              Under the GDPR and the Spanish Organic Law 3/2018 (LOPDGDD) you
              can:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Access the data we hold about you.</li>
              <li>Ask us to correct or delete it.</li>
              <li>Restrict or object to the processing.</li>
              <li>Port it to another controller.</li>
              <li>Withdraw consent at any time.</li>
              <li>
                File a complaint with the Spanish Data Protection Authority
                (AEPD) at{" "}
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-savage-yellow hover:underline"
                >
                  aepd.es
                </a>
                .
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email{" "}
              <a
                href="mailto:infosavageparty@gmail.com"
                className="text-savage-yellow hover:underline"
              >
                infosavageparty@gmail.com
              </a>{" "}
              with the subject &quot;GDPR request&quot;. We will reply within
              30 days.
            </p>
          </Block>

          <Block title="8. Cookies">
            <p>
              This site uses a small set of cookies. Full details live in our{" "}
              <Link
                href="/cookies"
                className="text-savage-yellow hover:underline"
              >
                Cookie Policy
              </Link>
              .
            </p>
          </Block>

          <Block title="9. Children">
            <p>
              Our services are aimed at adults booking a wedding. We do not
              knowingly collect data from anyone under 16. If you believe a
              minor has sent us data, contact us and we will delete it.
            </p>
          </Block>

          <Block title="10. Changes">
            <p>
              We may update this policy. The &quot;last updated&quot; date at
              the top of the page will reflect any change. Material changes
              will be flagged on the homepage for a reasonable period.
            </p>
          </Block>
        </div>

        <div className="mt-12 border-t border-savage-white/10 pt-6 text-xs uppercase tracking-[0.3em] text-savage-white/50 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/legal" className="hover:text-savage-yellow">
            Legal notice
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
