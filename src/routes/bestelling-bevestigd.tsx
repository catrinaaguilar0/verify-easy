import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { CheckCircle2, Mail, Package, Truck } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { formatPrice } from "@/lib/catalog";

const searchSchema = z.object({
  ref: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/bestelling-bevestigd")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Bestelling bevestigd | Nieuweverf" },
      { name: "description", content: "Bedankt voor je bestelling." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ConfirmPage,
});

type OrderSummary = {
  ref: string;
  email: string;
  name: string;
  address: string;
  shipping: string;
  payment: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  itemCount: number;
};

function ConfirmPage() {
  const { ref } = Route.useSearch();
  const [order, setOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("vow-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-ink md:text-4xl">Bedankt voor je bestelling!</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Je bestelling <strong className="text-ink">{ref || order?.ref || "—"}</strong> is succesvol geplaatst.
            We sturen je binnen enkele minuten een bevestiging per e-mail{order?.email && <> naar <strong className="text-ink">{order.email}</strong></>}.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4 text-center shadow-[var(--shadow-card)]">
            <Mail className="mx-auto h-5 w-5 text-accent" />
            <div className="mt-2 text-xs font-semibold text-ink">Bevestiging onderweg</div>
            <p className="text-[11px] text-ink-soft">Check ook je spamfolder.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center shadow-[var(--shadow-card)]">
            <Package className="mx-auto h-5 w-5 text-accent" />
            <div className="mt-2 text-xs font-semibold text-ink">Wij gaan inpakken</div>
            <p className="text-[11px] text-ink-soft">Bestelling wordt klaargemaakt.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center shadow-[var(--shadow-card)]">
            <Truck className="mx-auto h-5 w-5 text-accent" />
            <div className="mt-2 text-xs font-semibold text-ink">Track & trace</div>
            <p className="text-[11px] text-ink-soft">Je ontvangt een verzendlink.</p>
          </div>
        </div>

        {order && (
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-lg font-bold text-ink">Overzicht</h2>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Bezorgadres</dt>
                <dd className="mt-1 text-ink">{order.name}<br />{order.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Verzending</dt>
                <dd className="mt-1 text-ink">{order.shipping}</dd>
                <dt className="mt-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">Betaling</dt>
                <dd className="mt-1 text-ink">{order.payment}</dd>
              </div>
            </dl>
            <div className="mt-5 space-y-1 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-ink"><span>{order.itemCount} {order.itemCount === 1 ? "product" : "producten"}</span><span>{formatPrice(order.subtotal)}</span></div>
              <div className="flex justify-between text-ink"><span>Verzending</span><span>{order.shippingCost === 0 ? "Gratis" : formatPrice(order.shippingCost)}</span></div>
              <div className="flex items-baseline justify-between border-t border-border pt-3 text-ink">
                <span className="font-bold">Totaal betaald</span>
                <span className="text-2xl font-extrabold">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link to="/" className="rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent-strong">
            Verder winkelen
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
