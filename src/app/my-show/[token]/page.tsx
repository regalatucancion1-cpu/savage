import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import MyShowPlanner from "./MyShowPlanner";

export const metadata = {
  title: "My Show · Savage Party",
  robots: { index: false, follow: false },
};

export default async function MyShowPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  if (!token || token.length < 4) {
    notFound();
  }

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
        <span className="text-xs uppercase tracking-[0.3em] text-savage-white/50">
          My show · private link
        </span>
      </header>

      <MyShowPlanner token={token} />
    </main>
  );
}
