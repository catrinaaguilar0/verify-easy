import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { Heart, ShoppingBag, Star, SlidersHorizontal, X, Lightbulb, ShieldCheck, Paintbrush, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PRODUCTS, CATEGORIES, CATEGORY_INFO, formatPrice, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

const SITE_URL = "https://cozy-check-hub.lovable.app";

const searchSchema = z.object({
  merk: fallback(z.array(z.string()), []).default([]),
  afwerking: fallback(z.array(z.string()), []).default([]),
  inhoud: fallback(z.array(z.string()), []).default([]),
  toepassing: fallback(z.array(z.string()), []).default([]),
  voorraad: fallback(z.boolean(), false).default(false),
  sort: fallback(z.enum(["populair", "prijs-laag", "prijs-hoog", "rating", "nieuw"]), "populair").default("populair"),
});

export const Route = createFileRoute("/categorie/$slug")({
  validateSearch: zodValidator(searchSchema),
  head: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.key === params.slug);
    const info = cat ? CATEGORY_INFO[cat.key] : undefined;
    const title = cat ? `${cat.label} kopen | VerfOnlineWinkel` : "Categorie | VerfOnlineWinkel";
    const desc = info?.metaDescription ?? (cat
      ? `${cat.label} van topmerken zoals Sikkens, Sigma en Flexa. Snel geleverd, op kleur gemengd, eerlijke prijs.`
      : "Bekijk onze categorieën.");
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product.group" },
        { property: "og:url", content: `${SITE_URL}/categorie/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/categorie/${params.slug}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { add } = useCart();
  const [mobileFilters, setMobileFilters] = useState(false);

  const category = CATEGORIES.find((c) => c.key === slug);
  if (!category) throw notFound();
  const catInfo = CATEGORY_INFO[category.key];

  const base = useMemo(() => PRODUCTS.filter((p) => p.category === slug), [slug]);

  const facetCount = <K extends keyof Product>(key: K, value: Product[K]) =>
    base.filter((p) => p[key] === value).length;

  const brandFacets = Array.from(new Set(base.map((p) => p.brand))).map((b) => ({
    label: b,
    count: facetCount("brand", b),
  }));
  const finishFacets = Array.from(new Set(base.map((p) => p.finish).filter(Boolean))).map((f) => ({
    label: f as string,
    count: facetCount("finish", f as Product["finish"]),
  }));
  const volumeFacets = Array.from(new Set(base.map((p) => p.volume).filter(Boolean))).map((v) => ({
    label: v as string,
    count: facetCount("volume", v as string),
  }));
  const applicationFacets = Array.from(new Set(base.flatMap((p) => p.applications))).map((a) => ({
    label: a,
    count: base.filter((p) => p.applications.includes(a)).length,
  }));

  const filtered = useMemo(() => {
    let list = base;
    if (search.merk.length) list = list.filter((p) => search.merk.includes(p.brand));
    if (search.afwerking.length) list = list.filter((p) => p.finish && search.afwerking.includes(p.finish));
    if (search.inhoud.length) list = list.filter((p) => p.volume && search.inhoud.includes(p.volume));
    if (search.toepassing.length) list = list.filter((p) => p.applications.some((a) => search.toepassing.includes(a)));
    if (search.voorraad) list = list.filter((p) => p.inStock);

    const sorted = [...list];
    switch (search.sort) {
      case "prijs-laag": sorted.sort((a, b) => a.price - b.price); break;
      case "prijs-hoog": sorted.sort((a, b) => b.price - a.price); break;
      case "rating": sorted.sort((a, b) => b.rating - a.rating); break;
      case "nieuw": sorted.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false)); break;
      default: sorted.sort((a, b) => Number(b.bestseller ?? false) - Number(a.bestseller ?? false));
    }
    return sorted;
  }, [base, search]);

  function toggle(key: "merk" | "afwerking" | "inhoud" | "toepassing", value: string) {
    const current = search[key] as string[];
    const next = current.includes(value) ? current.filter((v: string) => v !== value) : [...current, value];
    navigate({ search: (prev: typeof search) => ({ ...prev, [key]: next }) });
  }
  function clearAll() {
    navigate({ search: { merk: [], afwerking: [], inhoud: [], toepassing: [], voorraad: false, sort: "populair" } });
  }
  const activeCount =
    search.merk.length + search.afwerking.length + search.inhoud.length + search.toepassing.length + (search.voorraad ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <nav className="text-xs text-ink-soft">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-1">/</span>
          <span className="text-ink">{category.label}</span>
        </nav>

        <header className="mt-4 max-w-3xl">
          <h1 className="text-3xl font-extrabold text-ink md:text-4xl">{category.label}</h1>
          <p className="mt-3 text-base text-ink-soft">{catInfo.intro}</p>
          <p className="mt-2 text-sm text-ink-soft">
            <strong className="text-ink">{base.length} producten</strong> van topmerken. Voor 21:00 besteld, morgen in huis. Op kleur gemengd in onze verfmengservice.
          </p>
        </header>

        {/* Info-blokken */}
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2 text-sm font-bold text-ink">
              <Paintbrush className="h-4 w-4 text-accent" /> Wanneer kies je voor {category.label.toLowerCase()}?
            </div>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {catInfo.whenToUse.map((item) => (
                <li key={item} className="flex gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2 text-sm font-bold text-ink">
              <Lightbulb className="h-4 w-4 text-rating" /> Tips voor een strak resultaat
            </div>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {catInfo.tips.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/verfmengservice" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-cta-foreground">
              Naar verfmengservice <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>


        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Filters */}
          <aside className={`${mobileFilters ? "fixed inset-0 z-50 overflow-y-auto bg-background p-4" : "hidden"} space-y-6 lg:relative lg:block lg:p-0`}>
            <div className="flex items-center justify-between lg:hidden">
              <h2 className="text-base font-bold text-ink">Filter</h2>
              <button onClick={() => setMobileFilters(false)} className="grid h-9 w-9 place-items-center rounded-full border border-border">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="hidden items-center justify-between lg:flex">
              <h2 className="text-sm font-bold uppercase tracking-wider text-ink">Filter</h2>
              {activeCount > 0 && (
                <button onClick={clearAll} className="text-xs text-accent hover:underline">Wissen ({activeCount})</button>
              )}
            </div>

            <FilterGroup title="Voorraad">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={search.voorraad}
                  onChange={(e) => navigate({ search: (p: typeof search) => ({ ...p, voorraad: e.target.checked }) })}
                  className="h-4 w-4 rounded border-border accent-accent"
                />
                <span className="flex-1 text-ink">Direct leverbaar</span>
              </label>
            </FilterGroup>

            <FacetList title="Merk" facets={brandFacets} selected={search.merk} onToggle={(v) => toggle("merk", v)} />
            {finishFacets.length > 0 && (
              <FacetList title="Afwerking" facets={finishFacets} selected={search.afwerking} onToggle={(v) => toggle("afwerking", v)} capitalize />
            )}
            {volumeFacets.length > 0 && (
              <FacetList title="Inhoud" facets={volumeFacets} selected={search.inhoud} onToggle={(v) => toggle("inhoud", v)} />
            )}
            <FacetList title="Toepassing" facets={applicationFacets} selected={search.toepassing} onToggle={(v) => toggle("toepassing", v)} capitalize />
          </aside>

          {/* Grid */}
          <section>
            <div className="sticky top-[64px] z-20 -mx-4 mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background/95 px-4 py-3 backdrop-blur lg:static lg:mx-0 lg:mb-5 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
              <button
                onClick={() => setMobileFilters(true)}
                className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm font-semibold text-ink lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filter {activeCount > 0 && <span className="rounded-full bg-accent px-1.5 text-[10px] text-accent-foreground">{activeCount}</span>}
              </button>
              <span className="text-sm text-ink-soft">
                <strong className="text-ink">{filtered.length}</strong> {filtered.length === 1 ? "product" : "producten"}
              </span>
              <label className="flex items-center gap-2 text-sm text-ink-soft">
                <span className="hidden sm:inline">Sorteren:</span>
                <select
                  value={search.sort}
                  onChange={(e) => navigate({ search: (p: typeof search) => ({ ...p, sort: e.target.value as typeof search.sort }) })}
                  className="h-10 rounded border border-border bg-background px-2 text-sm text-ink"
                >
                  <option value="populair">Populair</option>
                  <option value="prijs-laag">Prijs ↑</option>
                  <option value="prijs-hoog">Prijs ↓</option>
                  <option value="rating">Beoordeling</option>
                  <option value="nieuw">Nieuw</option>
                </select>
              </label>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-ink-soft">
                Geen producten gevonden met deze filters.
                <div className="mt-3">
                  <button onClick={clearAll} className="text-xs text-accent hover:underline">Filters wissen</button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {filtered.map((p) => (
                  <article key={p.id} className="group relative rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent">
                    {p.isNew && (
                      <span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">Nieuw</span>
                    )}
                    {p.bestseller && !p.isNew && (
                      <span className="absolute left-3 top-3 z-10 rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background">Bestseller</span>
                    )}
                    <button aria-label="Bewaar" className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-ink-soft hover:text-accent">
                      <Heart className="h-4 w-4" />
                    </button>
                    <Link to="/product/$slug" params={{ slug: p.slug }} className="block">
                      <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                        <img src={p.image} alt={p.name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="mt-3 text-[11px] uppercase tracking-wider text-ink-soft">{p.brand}</div>
                      <h2 className="mt-0.5 line-clamp-2 text-sm font-semibold text-ink">{p.name}</h2>
                      <div className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
                        <Star className="h-3 w-3 fill-rating text-rating" />
                        <span>{p.rating.toFixed(1)}</span>
                        <span>({p.reviews})</span>
                        {p.volume && <span className="ml-auto">{p.volume}</span>}
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-base font-bold text-ink">{formatPrice(p.price)}</span>
                        {p.oldPrice && <span className="text-xs text-ink-soft line-through">{formatPrice(p.oldPrice)}</span>}
                      </div>
                    </Link>
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
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-4">
      <div className="mb-3 text-sm font-semibold text-ink">{title}</div>
      {children}
    </div>
  );
}

function FacetList({
  title,
  facets,
  selected,
  onToggle,
  capitalize,
}: {
  title: string;
  facets: { label: string; count: number }[];
  selected: string[];
  onToggle: (v: string) => void;
  capitalize?: boolean;
}) {
  return (
    <FilterGroup title={title}>
      <ul className="space-y-2 text-sm">
        {facets.map((f) => {
          const active = selected.includes(f.label);
          return (
            <li key={f.label}>
              <label className="flex cursor-pointer items-center gap-2 text-ink-soft">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => onToggle(f.label)}
                  className="h-4 w-4 rounded border-border accent-accent"
                />
                <span className={`flex-1 ${active ? "text-ink" : ""} ${capitalize ? "capitalize" : ""}`}>{f.label}</span>
                <span className="text-xs">({f.count})</span>
              </label>
            </li>
          );
        })}
      </ul>
    </FilterGroup>
  );
}
