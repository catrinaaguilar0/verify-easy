import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, Lock, Truck, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/catalog";

export const Route = createFileRoute("/winkelwagen")({
  head: () => ({
    meta: [
      { title: "Winkelwagen | VerfOnlineWinkel" },
      { name: "description", content: "Bekijk je winkelwagen en reken veilig af." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQuantity, remove, count } = useCart();
  const shippingFree = subtotal >= 50 || subtotal === 0;
  const shipping = shippingFree ? 0 : 5.95;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <nav className="text-xs text-ink-soft">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-1">/</span>
          <span className="text-ink">Winkelwagen</span>
        </nav>

        <h1 className="mt-4 text-3xl font-extrabold text-ink md:text-4xl">
          Winkelwagen {count > 0 && <span className="text-ink-soft text-lg font-bold">({count})</span>}
        </h1>

        {items.length === 0 ? (
          <div className="mt-10 grid place-items-center rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
            <ShoppingBag className="h-10 w-10 text-ink-soft" />
            <p className="mt-4 text-base font-semibold text-ink">Je winkelwagen is leeg</p>
            <p className="mt-1 text-sm text-ink-soft">Ontdek onze topmerken en bestel snel je verf.</p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent-strong"
            >
              Verder winkelen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <section className="space-y-4">
              {items.map((it) => (
                <div
                  key={it.productId}
                  className="grid grid-cols-[80px_1fr_auto] items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:grid-cols-[96px_1fr_auto_auto]"
                >
                  <div className="aspect-square w-20 overflow-hidden rounded-lg bg-surface sm:w-24">
                    <img src={it.image} alt={it.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-wider text-ink-soft">{it.brand}</div>
                    <div className="truncate text-sm font-semibold text-ink">{it.name}</div>
                    {it.volume && <div className="text-xs text-ink-soft">{it.volume}</div>}
                    <button
                      onClick={() => remove(it.productId)}
                      className="mt-1 inline-flex items-center gap-1 text-xs text-ink-soft hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" /> Verwijderen
                    </button>
                  </div>
                  <div className="col-span-3 flex items-center justify-between sm:col-span-1 sm:flex-col sm:items-end sm:justify-center">
                    <div className="inline-flex items-center rounded-md border border-border">
                      <button
                        aria-label="Minder"
                        onClick={() => setQuantity(it.productId, it.quantity - 1)}
                        className="grid h-8 w-8 place-items-center text-ink hover:bg-surface"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-ink">{it.quantity}</span>
                      <button
                        aria-label="Meer"
                        onClick={() => setQuantity(it.productId, it.quantity + 1)}
                        className="grid h-8 w-8 place-items-center text-ink hover:bg-surface"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="hidden text-right sm:block">
                    <div className="text-base font-bold text-ink">{formatPrice(it.price * it.quantity)}</div>
                    <div className="text-xs text-ink-soft">{formatPrice(it.price)} / stuk</div>
                  </div>
                </div>
              ))}
            </section>

            <aside className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] lg:sticky lg:top-32 lg:self-start">
              <h2 className="text-lg font-bold text-ink">Overzicht</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-ink">
                  <span>Subtotaal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink">
                  <span>Verzending</span>
                  <span className="font-semibold">{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
                </div>
                {!shippingFree && (
                  <p className="text-xs text-ink-soft">
                    Nog {formatPrice(50 - subtotal)} tot gratis verzending.
                  </p>
                )}
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-sm font-bold text-ink">Totaal</span>
                <span className="text-2xl font-extrabold text-ink">{formatPrice(total)}</span>
              </div>
              <button
                disabled
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground transition hover:bg-accent-strong disabled:opacity-60"
                title="Checkout volgt"
              >
                <Lock className="h-4 w-4" /> Naar afrekenen
              </button>
              <p className="mt-2 text-center text-[11px] text-ink-soft">Checkout-flow volgt in de volgende ronde.</p>

              <ul className="mt-5 space-y-2 text-xs text-ink-soft">
                <li className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-accent" /> Voor 23:00 besteld, morgen in huis</li>
                <li className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-accent" /> Veilig betalen met iDEAL, Bancontact &amp; meer</li>
              </ul>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
