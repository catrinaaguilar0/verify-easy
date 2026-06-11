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

type Undertone = "neutral" | "warm" | "cool" | "earth" | "dark";

const products: { name: string; price: string; reviews: number; img: string; undertones: Undertone[]; matchScore: number }[] = [
  { name: "Sikkens Alphacryl Pure Mat SF", price: "€44,95", reviews: 128, img: prodSikkens, undertones: ["neutral", "cool", "dark"], matchScore: 98 },
  { name: "Sigma Perfect Matt", price: "€38,95", reviews: 96, img: prodSigma, undertones: ["neutral", "warm", "earth"], matchScore: 95 },
  { name: "Wijzonol Muurverf Extra Mat", price: "€36,50", reviews: 74, img: prodWijzonol, undertones: ["warm", "earth"], matchScore: 92 },
  { name: "Flexa Powerdek Muurverf Mat", price: "€42,95", reviews: 85, img: prodFlexa, undertones: ["neutral", "cool"], matchScore: 90 },
  { name: "Sikkens Alphacryl Pure Mat", price: "€40,95", reviews: 40, img: prodSikkens, undertones: ["neutral", "warm", "cool", "earth", "dark"], matchScore: 99 },
  { name: "Sigma S2U Allure Matt", price: "€46,95", reviews: 48, img: prodSigma, undertones: ["cool", "dark"], matchScore: 94 },
];

function undertoneOf(hex: string): Undertone {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = (r + g + b) / 3;
  if (lum < 80) return "dark";
  if (r > g && r > b && r - b > 30) return "warm";
  if (b > r && b - r > 20) return "cool";
  if (g >= r && g >= b) return "earth";
  if (Math.abs(r - g) < 15 && Math.abs(g - b) < 15) return "neutral";
  return "warm";
}

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

        {/* Color match */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="grid gap-0 md:grid-cols-[1.1fr,1fr]">
            <div className="flex flex-col gap-4 p-6 md:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                <Pipette className="h-4 w-4" /> Color Match
              </div>
              <h2 className="text-2xl font-extrabold text-ink">Kies jouw kleur — wij mengen het in elke variant</h2>
              <p className="text-sm text-ink-soft">
                Selecteer een populaire tint of voer een eigen kleurcode in. De gekozen kleur wordt gekoppeld aan alle muurverf hieronder, zodat je per merk en afwerking dezelfde kleur kunt vergelijken.
              </p>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((c) => {
                  const active = activeColor.hex === c.hex;
                  return (
                    <button
                      key={c.hex}
                      onClick={() => setActiveColor(c)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${active ? "border-accent bg-accent/10 text-ink" : "border-border bg-background text-ink-soft hover:border-accent"}`}
                    >
                      <span className="h-4 w-4 rounded-full border border-border" style={{ background: c.hex }} />
                      {c.name}
                      {active && <Check className="h-3.5 w-3.5 text-accent" />}
                    </button>
                  );
                })}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                <label className="text-sm font-semibold text-ink">Eigen kleurcode:</label>
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => setCustomHex(e.target.value)}
                  className="h-9 w-12 cursor-pointer rounded border border-border bg-background"
                />
                <input
                  value={customHex.toUpperCase()}
                  onChange={(e) => setCustomHex(e.target.value)}
                  className="w-28 rounded border border-border bg-background px-2 py-1.5 text-sm text-ink"
                />
                <button
                  onClick={() => setActiveColor({ name: `Custom ${customHex.toUpperCase()}`, hex: customHex })}
                  className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground hover:opacity-90"
                >
                  Toepassen
                </button>
              </div>
            </div>
            <div className="relative min-h-48 md:min-h-full" style={{ background: activeColor.hex }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-md bg-background/90 px-3 py-2 text-xs">
                <div className="font-semibold text-ink">{activeColor.name}</div>
                <div className="text-ink-soft">{activeColor.hex.toUpperCase()}</div>
              </div>
            </div>
          </div>
        </section>

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
              {products.map((p) => {
                const selected = perProduct[p.name] ?? activeColor.hex;
                return (
                <article key={p.name} className="group relative rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent">
                  <button aria-label="Bewaar" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-ink-soft hover:text-accent">
                    <Heart className="h-4 w-4" />
                  </button>
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-surface">
                    <div className="absolute inset-0 transition-colors" style={{ background: selected, opacity: 0.35 }} />
                    <img src={p.img} alt={p.name} width={800} height={800} loading="lazy" className="relative h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="mt-4 line-clamp-2 text-sm font-semibold text-ink">{p.name}</h3>
                  <div className="mt-1 text-xs text-ink-soft">Vanaf</div>
                  <div className="text-base font-bold text-ink">{p.price}</div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Stars />
                    <span className="text-xs text-ink-soft">({p.reviews})</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <div className="flex items-center gap-1">
                      {colorOptions.slice(0, 5).map((c) => {
                        const active = selected === c.hex;
                        return (
                          <button
                            key={c.hex}
                            aria-label={`Kies ${c.name}`}
                            onClick={() => setPerProduct((s) => ({ ...s, [p.name]: c.hex }))}
                            className={`h-5 w-5 rounded-full border transition ${active ? "ring-2 ring-accent ring-offset-1 ring-offset-card border-transparent" : "border-border hover:scale-110"}`}
                            style={{ background: c.hex }}
                          />
                        );
                      })}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-ink-soft">Color match</span>
                  </div>
                </article>
                );
              })}
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
