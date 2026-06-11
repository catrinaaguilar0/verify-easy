import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { posts } from "@/lib/blog";
import { Clock, User } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — kleurinspiratie, advies en doe-het-zelf | Verfwinkel" },
      { name: "description", content: "Lees onze laatste artikelen over kleurtrends, schildertechnieken en praktisch advies van onze kleurspecialisten." },
      { property: "og:title", content: "Blog — Verfwinkel" },
      { property: "og:description", content: "Kleurinspiratie, advies en doe-het-zelf tips." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [featured, ...rest] = posts;
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <nav className="text-xs text-ink-soft">
          <Link to="/" className="hover:text-accent">Home</Link> <span className="mx-1">/</span> <span className="text-ink">Blog</span>
        </nav>
        <header className="mt-4 max-w-2xl">
          <h1 className="text-4xl font-extrabold text-ink md:text-5xl">Blog</h1>
          <p className="mt-3 text-sm text-ink-soft">Inspiratie, kleurtrends, advies en doe-het-zelf tips van onze kleurspecialisten.</p>
        </header>

        <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group mt-8 grid overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] md:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden md:aspect-auto">
            <img src={featured.image} alt={featured.title} width={1024} height={1024} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center gap-3 p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">{featured.category} · Uitgelicht</span>
            <h2 className="text-2xl font-extrabold text-ink group-hover:text-accent md:text-3xl">{featured.title}</h2>
            <p className="text-sm text-ink-soft">{featured.excerpt}</p>
            <div className="mt-2 flex items-center gap-4 text-xs text-ink-soft">
              <span className="inline-flex items-center gap-1"><User className="h-3.5 w-3.5" /> {featured.author}</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.readMin} min lezen</span>
              <span>{featured.date}</span>
            </div>
          </div>
        </Link>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.title} width={1024} height={1024} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">{p.category}</span>
                <h3 className="text-lg font-bold text-ink group-hover:text-accent">{p.title}</h3>
                <p className="line-clamp-2 text-sm text-ink-soft">{p.excerpt}</p>
                <div className="mt-auto flex items-center gap-3 pt-3 text-xs text-ink-soft">
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.readMin} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
