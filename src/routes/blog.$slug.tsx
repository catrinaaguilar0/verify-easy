import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getPost, getRelatedPosts, getRelatedProducts } from "@/lib/blog";
import { getRequestOrigin } from "@/lib/origin.functions";
import { Clock, User, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    const origin = await getRequestOrigin();
    return { post, origin };
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    const origin = loaderData?.origin ?? "https://cozy-check-hub.lovable.app";
    const url = `${origin}/blog/${params.slug}`;
    const image = post ? `${origin}${post.image}` : undefined;
    return {
      meta: post
        ? [
            { title: `${post.title} | Blog VerfOnlineWinkel` },
            { name: "description", content: post.excerpt },
            { property: "og:title", content: post.title },
            { property: "og:description", content: post.excerpt },
            { property: "og:type", content: "article" },
            { property: "og:url", content: url },
            { property: "og:image", content: image },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: post.title },
            { name: "twitter:description", content: post.excerpt },
            { name: "twitter:image", content: image },
          ]
        : [{ title: "Artikel niet gevonden" }],
      links: [
        { rel: "canonical", href: url },
      ],
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                description: post.excerpt,
                image: image,
                author: {
                  "@type": "Person",
                  name: post.author,
                },
                datePublished: post.date,
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": url,
                },
              }),
            },
          ]
        : undefined,
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-ink">Artikel niet gevonden</h1>
        <Link to="/blog" className="mt-4 inline-block text-accent hover:underline">← Terug naar blog</Link>
      </main>
      <Footer />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-ink">Er ging iets mis</h1>
        <p className="mt-2 text-sm text-ink-soft">{error.message}</p>
      </main>
      <Footer />
    </div>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const related = getRelatedPosts(post.slug, 3);
  const relatedProducts = getRelatedProducts(post.slug);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <article>
          <header className="border-b border-border bg-surface">
            <div className="container mx-auto max-w-3xl px-4 py-10">
              <Link to="/blog" className="inline-flex items-center gap-1 text-xs text-ink-soft hover:text-accent">
                <ArrowLeft className="h-3.5 w-3.5" /> Terug naar blog
              </Link>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent">{post.category}</div>
              <h1 className="mt-2 text-4xl font-extrabold leading-tight text-ink md:text-5xl">{post.title}</h1>
              <p className="mt-4 text-base text-ink-soft">{post.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-ink-soft">
                <span className="inline-flex items-center gap-1"><User className="h-3.5 w-3.5" /> {post.author}</span>
                <span>{post.date}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readMin} min lezen</span>
              </div>
            </div>
          </header>

          <div className="container mx-auto max-w-3xl px-4 py-10">
            <img src={post.image} alt={post.title} width={1024} height={1024} className="aspect-[16/9] w-full rounded-2xl object-cover shadow-[var(--shadow-card)]" />

            <div className="prose mt-10 max-w-none">
              {post.body.map((block: { type: string; text?: string; items?: string[] }, i: number) => {
                if (block.type === "h2") return <h2 key={i} className="mt-8 text-2xl font-bold text-ink">{block.text}</h2>;
                if (block.type === "ul") return (
                  <ul key={i} className="mt-4 list-disc space-y-1 pl-6 text-sm text-ink-soft">
                    {block.items?.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                );
                return <p key={i} className="mt-4 text-base leading-relaxed text-ink-soft">{block.text}</p>;
              })}
            </div>

            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Onderwerpen:</span>
                {post.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    to="/blog"
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-soft transition hover:border-accent hover:text-accent"
                    aria-label={`Bekijk meer artikelen over ${tag}`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </article>

        {relatedProducts.length > 0 && (
          <section className="border-t border-border bg-surface">
            <div className="container mx-auto max-w-5xl px-4 py-12">
              <h2 className="text-xl font-bold text-ink">Producten die bij dit artikel passen</h2>
              <p className="mt-2 text-sm text-ink-soft">Met deze producten breng je het advies uit dit artikel direct in de praktijk.</p>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {relatedProducts.map((p) => (
                  <Link
                    key={p.slug}
                    to={p.to}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent"
                    title={p.anchor}
                    aria-label={p.anchor}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-surface">
                      <img src={p.image} alt={`${p.name} — ${p.brand}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-accent">{p.brand}</div>
                      <h3 className="text-base font-bold text-ink group-hover:text-accent">{p.name}</h3>
                      <p className="line-clamp-2 text-xs text-ink-soft">{p.anchor}</p>
                      <div className="mt-auto pt-3 text-sm font-semibold text-ink">{p.price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="border-t border-border bg-background">
            <div className="container mx-auto max-w-5xl px-4 py-12">
              <h2 className="text-xl font-bold text-ink">Lees verder over {post.tags.slice(0, 2).join(" en ")}</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group rounded-xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-accent"
                    title={p.title}
                    aria-label={`Lees het artikel: ${p.title}`}
                  >
                    <div className="text-[10px] uppercase tracking-wider text-accent">{p.category}</div>
                    <h3 className="mt-2 text-base font-bold text-ink group-hover:text-accent">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{p.excerpt}</p>
                    <span className="mt-3 inline-block text-xs font-semibold text-accent">Lees het volledige artikel →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
