import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { PageLayout } from "@/components/site/PageLayout";
import { PRODUCTS, formatPrice } from "@/lib/catalog";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/verlanglijst")({
  head: () => ({
    meta: [
      { title: "Verlanglijst | VerfOnlineWinkel" },
      { name: "description", content: "Bewaar je favoriete producten en bestel ze later." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { ids, toggle, count } = useWishlist();
  const { add } = useCart();
  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <PageLayout title={`Verlanglijst${count > 0 ? ` (${count})` : ""}`} breadcrumb={[{ label: "Verlanglijst" }]}>
      {items.length === 0 ? (
        <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
          <Heart className="h-10 w-10 text-ink-soft" />
          <p className="mt-4 text-base font-semibold text-ink">Je verlanglijst is leeg</p>
          <p className="mt-1 text-sm text-ink-soft">Klik op het hartje bij een product om het hier te bewaren.</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent-strong">
            Producten ontdekken
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <article key={p.id} className="group relative rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
              <button
                aria-label="Verwijderen"
                onClick={() => toggle(p.id)}
                className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <Link to="/product/$slug" params={{ slug: p.slug }} className="block">
                <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                  <img src={p.image} alt={p.name} className="h-full w-full object-contain" />
                </div>
                <div className="mt-3 text-[11px] uppercase tracking-wider text-ink-soft">{p.brand}</div>
                <h2 className="line-clamp-2 text-sm font-semibold text-ink">{p.name}</h2>
                <div className="mt-1 text-base font-bold text-ink">{formatPrice(p.price)}</div>
              </Link>
              <button
                type="button"
                onClick={() => add(p)}
                disabled={!p.inStock}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-3 py-2 text-xs font-bold uppercase tracking-wider text-accent-foreground hover:bg-accent-strong disabled:opacity-50"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                {p.inStock ? "In winkelwagen" : "Niet leverbaar"}
              </button>
            </article>
          ))}
        </div>
      )}
    </PageLayout>
  );
}
