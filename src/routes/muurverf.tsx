import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Star, ChevronDown, Pipette, Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import prodSikkens from "@/assets/prod-sikkens.jpg";
import prodSigma from "@/assets/prod-sigma.jpg";
import prodWijzonol from "@/assets/prod-wijzonol.jpg";
import prodFlexa from "@/assets/prod-flexa.jpg";

export const Route = createFileRoute("/muurverf")({
  head: () => ({
    meta: [
      { title: "Muurverf — Verfwinkel" },
      { name: "description", content: "Muurverf voor binnenmuren en plafonds. Kies uit ons ruime assortiment muurverf met topkwaliteit voor een perfect en duurzaam resultaat." },
    ],
  }),
  component: MuurverfPage,
});

const colorOptions = [
  { name: "Wit RAL 9010", hex: "#F7F4EC" },
  { name: "Warm Zand", hex: "#E7D9BE" },
  { name: "Salie Groen", hex: "#A8B89A" },
  { name: "Diep Oceaan", hex: "#2E4756" },
  { name: "Terracotta", hex: "#B8674A" },
  { name: "Antraciet", hex: "#3A3A3C" },
];

const products = [
  { name: "Sikkens Alphacryl Pure Mat SF", price: "€44,95", reviews: 128, img: prodSikkens },
  { name: "Sigma Perfect Matt", price: "€38,95", reviews: 96, img: prodSigma },
  { name: "Wijzonol Muurverf Extra Mat", price: "€36,50", reviews: 74, img: prodWijzonol },
  { name: "Flexa Powerdek Muurverf Mat", price: "€42,95", reviews: 85, img: prodFlexa },
  { name: "Sikkens Alphacryl Pure Mat", price: "€40,95", reviews: 40, img: prodSikkens },
  { name: "Sigma S2U Allure Matt", price: "€46,95", reviews: 48, img: prodSigma },
];

const filterGroups = [
  { title: "Categorie", items: [["Binnen", 120], ["Buiten", 14]] },
  { title: "Merk", items: [["Sikkens", 32], ["Sigma", 28], ["Wijzonol", 24], ["Flexa", 22], ["Histor", 18]] },
  { title: "Afwerking", items: [["Mat", 58], ["Extra Mat", 34], ["Zijdeglans", 22], ["Hoogglans", 6]] },
  { title: "Inhoud", items: [["1 liter", 45], ["2,5 liter", 68], ["5 liter", 25], ["10 liter", 8]] },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-rating">
      {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-3.5 w-3.5 fill-current" />))}
    </div>
  );
}

function MuurverfPage() {
  const [activeColor, setActiveColor] = useState(colorOptions[0]);
  const [perProduct, setPerProduct] = useState<Record<string, string>>({});
  const [customHex, setCustomHex] = useState("#A8B89A");
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <nav className="text-xs text-ink-soft">
          <a href="/" className="hover:text-accent">Home</a> <span className="mx-1">/</span> <span className="text-ink">Muurverf</span>
        </nav>

        <header className="mt-4 max-w-2xl">
          <h1 className="text-3xl font-extrabold text-ink md:text-4xl">Muurverf</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Voor binnenmuren en plafonds. Kies uit ons ruime assortiment muurverf met topkwaliteit voor een perfect en duurzaam resultaat.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Voor binnen", "Diverse afwerkingen", "Hoog rendement", "Uitstekend dekkend"].map((t) => (
              <span key={t} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink">{t}</span>
            ))}
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px,1fr]">
          {/* filters */}
          <aside className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-ink">Filter</h2>
              <button className="text-xs text-accent hover:underline">Wissen</button>
            </div>
            {filterGroups.map((g) => (
              <div key={g.title} className="border-t border-border pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">{g.title}</span>
                  <ChevronDown className="h-4 w-4 text-ink-soft" />
                </div>
                <ul className="space-y-2 text-sm">
                  {g.items.map(([label, count]) => (
                    <li key={label as string} className="flex items-center gap-2 text-ink-soft">
                      <input type="checkbox" className="h-4 w-4 rounded border-border accent-accent" />
                      <span className="flex-1">{label}</span>
                      <span className="text-xs">({count})</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          {/* grid */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm text-ink-soft"><strong className="text-ink">125</strong> producten</span>
              <label className="flex items-center gap-2 text-sm text-ink-soft">
                Sorteren op:
                <select className="rounded border border-border bg-background px-2 py-1.5 text-sm text-ink">
                  <option>Meest populair</option>
                  <option>Prijs oplopend</option>
                  <option>Prijs aflopend</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
              {products.map((p) => (
                <article key={p.name} className="group relative rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent">
                  <button aria-label="Bewaar" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-ink-soft hover:text-accent">
                    <Heart className="h-4 w-4" />
                  </button>
                  <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                    <img src={p.img} alt={p.name} width={800} height={800} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="mt-4 line-clamp-2 text-sm font-semibold text-ink">{p.name}</h3>
                  <div className="mt-1 text-xs text-ink-soft">Vanaf</div>
                  <div className="text-base font-bold text-ink">{p.price}</div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Stars />
                    <span className="text-xs text-ink-soft">({p.reviews})</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex justify-center gap-1 text-sm">
              {[1, 2, 3, "…", 9].map((n, i) => (
                <button key={i} className={`h-9 min-w-9 rounded border border-border px-3 ${n === 1 ? "bg-primary text-primary-foreground" : "bg-background text-ink hover:border-accent"}`}>
                  {n}
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
