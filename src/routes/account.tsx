import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, MapPin, CreditCard, User, Heart, LogIn } from "lucide-react";
import { PageLayout } from "@/components/site/PageLayout";
import { formatPrice } from "@/lib/catalog";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Mijn account | Nieuweverf" },
      { name: "description", content: "Bekijk je bestellingen, adressen en accountgegevens." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AccountPage,
});

const MOCK_ORDERS = [
  {
    ref: "VOW-7AB3X9",
    date: "12 juni 2026",
    status: "Onderweg",
    total: 89.9,
    items: 3,
  },
  {
    ref: "VOW-5KL2P1",
    date: "28 mei 2026",
    status: "Geleverd",
    total: 142.4,
    items: 5,
  },
  {
    ref: "VOW-3XR8M4",
    date: "14 april 2026",
    status: "Geleverd",
    total: 44.95,
    items: 1,
  },
];

const MOCK_ADDRESS = {
  name: "Jan de Vries",
  street: "Verfstraat 12",
  postal: "1011 AB Amsterdam",
  country: "Nederland",
};

function AccountPage() {
  return (
    <PageLayout title="Mijn account" breadcrumb={[{ label: "Account" }]}>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-1 rounded-2xl border border-border bg-card p-3 text-sm shadow-[var(--shadow-card)]">
          {[
            { icon: User, label: "Overzicht", active: true },
            { icon: Package, label: "Mijn bestellingen" },
            { icon: MapPin, label: "Adressen" },
            { icon: CreditCard, label: "Betaalmethodes" },
            { icon: Heart, label: "Verlanglijst", to: "/verlanglijst" as const },
          ].map((it) =>
            it.to ? (
              <Link
                key={it.label}
                to={it.to}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-ink-soft hover:bg-surface hover:text-ink"
              >
                <it.icon className="h-4 w-4" /> {it.label}
              </Link>
            ) : (
              <div
                key={it.label}
                className={`flex items-center gap-3 rounded-md px-3 py-2 ${it.active ? "bg-accent/10 font-semibold text-ink" : "text-ink-soft"}`}
              >
                <it.icon className="h-4 w-4" /> {it.label}
              </div>
            ),
          )}
          <Link
            to="/auth"
            className="mt-3 flex items-center gap-3 rounded-md border border-border px-3 py-2 text-xs text-ink-soft hover:text-accent"
          >
            <LogIn className="h-4 w-4" /> Inloggen / Registreren
          </Link>
        </aside>

        <section className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-ink">Hallo, {MOCK_ADDRESS.name.split(" ")[0]}!</h2>
                <p className="mt-1 text-sm text-ink-soft">Welkom terug. Hier vind je een overzicht van je account.</p>
              </div>
              <div className="hidden text-right sm:block">
                <div className="text-xs uppercase tracking-wider text-ink-soft">VOW-spaarpunten</div>
                <div className="text-2xl font-extrabold text-accent">487</div>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Open bestellingen", value: "1" },
                { label: "Bewaarde adressen", value: "1" },
                { label: "Producten in verlanglijst", value: "—" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-border bg-surface p-4 text-center">
                  <div className="text-2xl font-extrabold text-ink">{s.value}</div>
                  <div className="text-xs text-ink-soft">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between border-b border-border p-6">
              <h3 className="text-lg font-bold text-ink">Recente bestellingen</h3>
              <a href="#" className="text-xs text-accent hover:underline">Alle bestellingen</a>
            </div>
            <ul className="divide-y divide-border">
              {MOCK_ORDERS.map((o) => (
                <li key={o.ref} className="flex flex-wrap items-center justify-between gap-3 p-6">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-ink-soft">{o.date}</div>
                    <div className="text-sm font-semibold text-ink">Bestelling {o.ref}</div>
                    <div className="text-xs text-ink-soft">{o.items} {o.items === 1 ? "product" : "producten"}</div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      o.status === "Geleverd"
                        ? "bg-accent/10 text-accent"
                        : "bg-rating/10 text-rating"
                    }`}
                  >
                    {o.status}
                  </span>
                  <div className="text-right">
                    <div className="text-sm font-bold text-ink">{formatPrice(o.total)}</div>
                    <a href="#" className="text-xs text-accent hover:underline">Bekijk details</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-ink">Bezorgadres</h3>
                <a href="#" className="text-xs text-accent hover:underline">Bewerken</a>
              </div>
              <address className="mt-3 text-sm not-italic text-ink">
                {MOCK_ADDRESS.name}<br />
                {MOCK_ADDRESS.street}<br />
                {MOCK_ADDRESS.postal}<br />
                {MOCK_ADDRESS.country}
              </address>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-ink">Voorkeuren</h3>
                <a href="#" className="text-xs text-accent hover:underline">Wijzigen</a>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li>Nieuwsbrief: <span className="text-ink">Aan</span></li>
                <li>Taal: <span className="text-ink">Nederlands</span></li>
                <li>Valuta: <span className="text-ink">EUR (€)</span></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
