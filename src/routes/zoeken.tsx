import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { Search, Heart, ShoppingBag } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PRODUCTS, formatPrice } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/zoeken")({
  validateSearch: zodValidator(searchSchema),
  head: ({ search }) => ({
    meta: [
      { title: `Zoekresultaten${search.q ? ` voor "${search.q}"` : ""} | VerfOnlineWinkel` },
      { name: "description", content: "Zoek in onze webshop op product, merk, RAL-kleur of toepassing." },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const { add } = useCart();
  const query = q.trim().toLowerCase();

  const matches = !query
    ? []
    : PRODUCTS.filter((p) =>
        [p.name, p.brand, p.category, ...p.applications].some((v) =>
          v.toLowerCase().includes(query),
        ),
      );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <nav className="text-xs text-ink-soft">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-1">/</span>
          <span className="text-ink">Zoeken</span>
        </nav>

        <header className="mt-4 flex items-center gap-3">
          <Search className="h-5 w-5 text-accent" />
          <h1 className="text-2xl font-extrabold text-ink md:text-3xl">
            {q ? <>Zoekresultaten voor "{q}"</> : <>Zoeken</>}
          </h1>
        </header>
        <p className="mt-1 text-sm text-ink-soft">
          {q ? `${matches.length} ${matches.length === 1 ? "resultaat" : "resultaten"}` : "Vul een zoekterm in om te beginnen."}
        </p>

        {matches.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {matches.map((p) => (
              <article key={p.id} className="group relative rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent">
                <button aria-label="Bewaar" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-ink-soft hover:text-accent">
                  <Heart className="h-4 w-4" />
                </button>
                <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                  <img src={p.image} alt={p.name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="mt-3 text-[11px] uppercase tracking-wider text-ink-soft">{p.brand}</div>
                <h2 className="mt-0.5 line-clamp-2 text-sm font-semibold text-ink">{p.name}</h2>
                <div className="mt-1 text-xs text-ink-soft">{p.volume}</div>
                <div className="mt-1 text-base font-bold text-ink">{formatPrice(p.price)}</div>
                <button
                  type="button"
                  onClick={() => add(p)}
                  disabled={!p.inStock}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-3 py-2 text-xs font-bold uppercase tracking-wider text-accent-foreground transition hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  {p.inStock ? "In winkelwagen" : "Niet leverbaar"}
                </button>
              </article>
            ))}
          </div>
        ) : q ? (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-surface p-10 text-center">
            <p className="text-sm text-ink">Geen producten gevonden voor "{q}".</p>
            <p className="mt-1 text-xs text-ink-soft">Probeer een ander woord, een merk of een RAL-code.</p>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
