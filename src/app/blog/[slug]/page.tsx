import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, POSTS } from "@/content/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://savageparty.es";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.seoDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.seoDescription,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.seoDescription,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Savage Party" },
    publisher: {
      "@type": "Organization",
      name: "Savage Party",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-savage.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: post.heroImage ? [`${SITE_URL}${post.heroImage}`] : undefined,
  };

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-savage-black text-savage-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

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
          href="/blog"
          className="text-xs uppercase tracking-[0.3em] text-savage-white/70 hover:text-savage-yellow"
        >
          ← All posts
        </Link>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-savage-yellow">
          <span>{post.category}</span>
          <span className="text-savage-white/40">·</span>
          <span className="text-savage-white/60">{post.readingTime}</span>
        </div>
        <h1 className="font-display uppercase mt-6 text-[2rem] md:text-[3.5rem] leading-[0.95]">
          {post.title}
        </h1>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-savage-white/50">
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {post.heroImage && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-savage-white/10">
            <Image
              src={post.heroImage}
              alt={post.heroAlt ?? post.title}
              fill
              sizes="(min-width: 1024px) 800px, 90vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mt-10 space-y-6 text-lg text-savage-white/85 leading-relaxed">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-savage-yellow/40 bg-savage-yellow/5 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-savage-yellow">
            Planning your night?
          </p>
          <p className="mt-3 text-lg text-savage-white/90 leading-relaxed">
            Build your teaser show in 60 seconds. No signup, no pressure. See
            the shape of your night before anyone calls you back.
          </p>
          <Link
            href="/build-your-show"
            className="mt-6 inline-flex rounded-full bg-savage-yellow px-7 py-3 font-semibold text-savage-ink hover:brightness-110 transition"
          >
            Build your show →
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-savage-white/10 px-6 py-20 md:px-14 md:py-24">
          <p className="text-xs uppercase tracking-[0.3em] text-savage-yellow">
            Keep reading
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-2xl border border-savage-white/10 bg-savage-ink/30 p-6 transition hover:border-savage-yellow/60"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-savage-yellow">
                  {p.category}
                </p>
                <h3 className="font-display uppercase text-xl mt-3 leading-tight group-hover:text-savage-yellow transition">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-savage-white/70 leading-relaxed">
                  {p.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

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
