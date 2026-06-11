import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { posts, getPost } from "@/lib/blog";
import { Clock, User, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    return {
      meta: post
        ? [
            { title: `${post.title} | Blog Verfwinkel` },
            { name: "description", content: post.excerpt },
            { property: "og:title", content: post.title },
            { property: "og:description", content: post.excerpt },
            { property: "og:image", content: post.image },
          ]
        : [{ title: "Artikel niet gevonden" }],
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
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

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
          </div>
        </article>

        <section className="border-t border-border bg-surface">
          <div className="container mx-auto max-w-3xl px-4 py-12">
            <h2 className="text-xl font-bold text-ink">Lees ook</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {related.map((p) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group rounded-xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-accent">
                  <div className="text-[10px] uppercase tracking-wider text-accent">{p.category}</div>
                  <h3 className="mt-2 text-base font-bold text-ink group-hover:text-accent">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
