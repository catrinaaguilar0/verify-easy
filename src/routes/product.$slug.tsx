import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  Check,
  Minus,
  Plus,
  Star,
  Clock,
  Package,
  Droplets,
  Info,
  ChevronRight,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PRODUCTS, formatPrice, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} ${p.volume ?? ""} | VerfOnlineWinkel` : "Product";
    const desc = p?.shortDescription ?? "Bestel professionele verf online.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(p?.image ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-extrabold text-ink">Product niet gevonden</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Dit product bestaat niet (meer). Bekijk onze andere producten.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent-strong"
        >
          Naar de homepage
        </Link>
      </main>
      <Footer />
    </div>
  ),
  component: ProductPage,
});

function getSpecs(p: Product) {
  return [
    { label: "Merk", value: p.brand },
    { label: "Categorie", value: p.category },
    p.finish ? { label: "Afwerking", value: p.finish } : null,
    p.volume ? { label: "Inhoud", value: p.volume } : null,
    p.coverage ? { label: "Rendement", value: `± ${p.coverage} m² per liter` } : null,
    { label: "Toepassing", value: p.applications.join(", ") },
    { label: "Droogtijd stofdroog", value: "± 1 uur (20 °C / 65% RV)" },
    { label: "Overschilderbaar", value: "Na 4–6 uur" },
    { label: "Verdunner", value: p.category === "lakverf" ? "Water (max. 5%)" : "Water" },
    { label: "Reiniging gereedschap", value: "Direct na gebruik met water en zeep" },
    { label: "VOS-gehalte", value: "Cat. A/a: max. 30 g/l (EU-grens 30 g/l)" },
    { label: "Houdbaarheid", value: "Min. 24 maanden, koel & vorstvrij bewaren" },
  ].filter(Boolean) as { label: string; value: string }[];
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"beschrijving" | "specs" | "gebruik" | "reviews">("beschrijving");
  const [surface, setSurface] = useState(20);
  const [layers, setLayers] = useState(2);

  const gallery = useMemo(() => [product.image, product.image, product.image], [product]);
  const [active, setActive] = useState(0);

  const litersNeeded = product.coverage
    ? Math.max(1, Math.ceil((surface * layers) / product.coverage * 10) / 10)
    : null;

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand),
  ).slice(0, 4);

  const specs = getSpecs(product);
  const savings = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <nav className="flex flex-wrap items-center gap-1 text-xs text-ink-soft">
          <Link to="/" className="hover:text-accent">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="capitalize">{product.category}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink">{product.brand}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Gallery */}
          <section>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="aspect-square">
                <img
                  src={gallery[active]}
                  alt={product.name}
                  className="h-full w-full object-contain p-8"
                />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-square overflow-hidden rounded-lg border bg-surface transition ${
                    active === i ? "border-accent ring-2 ring-accent/30" : "border-border hover:border-accent"
                  }`}
                  aria-label={`Bekijk afbeelding ${i + 1}`}
                >
                  <img src={src} alt="" className="h-full w-full object-contain p-2" />
                </button>
              ))}
            </div>
          </section>

          {/* Info */}
          <section className="flex flex-col">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">{product.brand}</div>
            <h1 className="mt-1 text-3xl font-extrabold leading-tight text-ink md:text-4xl">
              {product.name}
            </h1>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating) ? "fill-current" : "fill-none"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-ink">{product.rating.toFixed(1)}</span>
              <span className="text-ink-soft">({product.reviews} reviews)</span>
            </div>

            <p className="mt-4 text-base text-ink-soft">{product.shortDescription}</p>

            <div className="mt-6 flex items-end gap-3">
              <div className="text-4xl font-extrabold text-ink">{formatPrice(product.price)}</div>
              {product.oldPrice && (
                <>
                  <div className="pb-1 text-sm text-ink-soft line-through">
                    {formatPrice(product.oldPrice)}
                  </div>
                  <div className="pb-1 text-xs font-bold uppercase tracking-wider text-accent">
                    Bespaar {formatPrice(savings)}
                  </div>
                </>
              )}
            </div>
            <div className="text-xs text-ink-soft">Incl. btw, excl. verzendkosten</div>

            {/* Stock & delivery */}
            <div className="mt-5 grid gap-2 rounded-xl border border-border bg-card p-4 text-sm">
              <div className={`flex items-center gap-2 font-semibold ${product.inStock ? "text-accent" : "text-destructive"}`}>
                <Check className="h-4 w-4" />
                {product.inStock ? "Op voorraad" : "Tijdelijk uitverkocht"}
              </div>
              {product.inStock && (
                <>
                  <div className="flex items-center gap-2 text-ink">
                    <Truck className="h-4 w-4 text-accent" />
                    Voor 23:00 besteld, <strong className="ml-1">morgen in huis</strong>
                  </div>
                  <div className="flex items-center gap-2 text-ink-soft">
                    <Clock className="h-4 w-4" /> Levertijd 1–2 werkdagen
                  </div>
                </>
              )}
            </div>

            {/* Qty + CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-md border border-border">
                <button
                  aria-label="Minder"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-12 w-12 place-items-center text-ink hover:bg-surface"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-base font-bold text-ink">{qty}</span>
                <button
                  aria-label="Meer"
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-12 w-12 place-items-center text-ink hover:bg-surface"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => add(product, qty)}
                disabled={!product.inStock}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-bold uppercase tracking-wide text-accent-foreground transition hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingBag className="h-4 w-4" />
                {product.inStock ? "In winkelwagen" : "Niet leverbaar"}
              </button>
              <button
                aria-label="Bewaar"
                className="grid h-12 w-12 place-items-center rounded-md border border-border text-ink-soft hover:border-accent hover:text-accent"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <ul className="mt-6 grid gap-2 text-xs text-ink-soft sm:grid-cols-2">
              <li className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-accent" /> Originele kwaliteit, direct van de fabrikant</li>
              <li className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-accent" /> Gratis verzending vanaf €50</li>
              <li className="flex items-center gap-2"><Package className="h-3.5 w-3.5 text-accent" /> 30 dagen retourrecht</li>
              <li className="flex items-center gap-2"><Info className="h-3.5 w-3.5 text-accent" /> Persoonlijk verfadvies</li>
            </ul>
          </section>
        </div>

        {/* Coverage calculator */}
        {product.coverage && (
          <section className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-extrabold text-ink">Hoeveel verf heb ik nodig?</h2>
            </div>
            <p className="mt-1 text-sm text-ink-soft">
              Rendement van dit product: ± {product.coverage} m² per liter (bij goede ondergrond).
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <label className="block text-sm">
                <span className="font-semibold text-ink">Oppervlak (m²)</span>
                <input
                  type="number"
                  min={1}
                  value={surface}
                  onChange={(e) => setSurface(Math.max(1, Number(e.target.value) || 1))}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-ink focus:border-accent focus:outline-none"
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold text-ink">Aantal lagen</span>
                <select
                  value={layers}
                  onChange={(e) => setLayers(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-ink focus:border-accent focus:outline-none"
                >
                  <option value={1}>1 laag</option>
                  <option value={2}>2 lagen (aanbevolen)</option>
                  <option value={3}>3 lagen</option>
                </select>
              </label>
              <div className="rounded-md bg-surface p-4 text-sm">
                <div className="text-xs uppercase tracking-wider text-ink-soft">Je hebt nodig</div>
                <div className="mt-1 text-2xl font-extrabold text-ink">
                  ± {litersNeeded?.toFixed(1)} L
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tabs */}
        <section className="mt-12">
          <div className="flex flex-wrap gap-1 border-b border-border">
            {(
              [
                ["beschrijving", "Beschrijving"],
                ["specs", "Specificaties"],
                ["gebruik", "Gebruiksaanwijzing"],
                ["reviews", `Reviews (${product.reviews})`],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition ${
                  tab === key
                    ? "border-accent text-ink"
                    : "border-transparent text-ink-soft hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="py-8">
            {tab === "beschrijving" && (
              <div className="prose-sm grid gap-4 text-ink-soft md:max-w-3xl">
                <p>
                  De <strong className="text-ink">{product.name}</strong> van {product.brand} is een
                  professioneel product voor {product.applications.join(", ")}. {product.shortDescription}
                </p>
                <p>
                  Dankzij de geoptimaliseerde formulering verkrijg je een strakke, egale afwerking met
                  uitstekende dekking. Het product is geschikt voor zowel doe-het-zelvers als professionele
                  schilders en wordt gebruikt in nieuwbouw, renovatie en onderhoudsprojecten.
                </p>
                <ul className="ml-5 list-disc">
                  <li>Hoogwaardige {product.finish ?? "professionele"} afwerking</li>
                  <li>Goede vloei en gemakkelijk te verwerken met roller, kwast of spuit</li>
                  <li>Sneldrogend — binnen één dag overschilderbaar</li>
                  <li>Reukarm en op waterbasis</li>
                </ul>
              </div>
            )}

            {tab === "specs" && (
              <div className="overflow-hidden rounded-xl border border-border md:max-w-3xl">
                <table className="w-full text-sm">
                  <tbody>
                    {specs.map((s, i) => (
                      <tr key={s.label} className={i % 2 ? "bg-surface" : "bg-card"}>
                        <th scope="row" className="w-1/2 px-4 py-3 text-left font-semibold text-ink">
                          {s.label}
                        </th>
                        <td className="px-4 py-3 capitalize text-ink-soft">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "gebruik" && (
              <ol className="grid gap-3 text-sm text-ink-soft md:max-w-3xl">
                <li><strong className="text-ink">1. Voorbereiding —</strong> Ondergrond schoon, droog, stof- en vetvrij maken. Glanzende oppervlakken licht opschuren.</li>
                <li><strong className="text-ink">2. Grondlaag —</strong> Onbehandelde of zuigende ondergronden eerst voorzien van een geschikte grondverf.</li>
                <li><strong className="text-ink">3. Aanbrengen —</strong> Goed roeren en in 2 lagen aanbrengen met roller of kwast. Tussentijds 4–6 uur drogen.</li>
                <li><strong className="text-ink">4. Reiniging —</strong> Gereedschap direct na gebruik reinigen met water en zeep.</li>
                <li><strong className="text-ink">5. Bewaren —</strong> Goed gesloten, koel en vorstvrij bewaren.</li>
              </ol>
            )}

            {tab === "reviews" && (
              <div className="grid gap-4 md:max-w-3xl">
                {[
                  { name: "Mark V.", stars: 5, text: "Prima dekking in 2 lagen, mooie strakke afwerking. Aanrader." },
                  { name: "Sanne K.", stars: 5, text: "Snel geleverd, exact wat ik nodig had. Top kwaliteit." },
                  { name: "Peter D.", stars: 4, text: "Goede verf, droogt snel. Iets meer geur dan verwacht maar prima resultaat." },
                ].map((r) => (
                  <div key={r.name} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < r.stars ? "fill-current" : "fill-none"}`} />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-ink">{r.name}</span>
                    </div>
                    <p className="mt-2 text-sm text-ink-soft">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-extrabold text-ink">Vaak samen bekeken</h2>
            <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  className="group rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent"
                >
                  <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 text-[11px] uppercase tracking-wider text-ink-soft">{p.brand}</div>
                  <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold text-ink">{p.name}</h3>
                  <div className="mt-1 text-xs text-ink-soft">{p.volume}</div>
                  <div className="mt-1 text-base font-bold text-ink">{formatPrice(p.price)}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
