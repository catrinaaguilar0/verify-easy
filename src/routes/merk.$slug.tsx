import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star, ShieldCheck, Award } from "lucide-react";
import { PageLayout } from "@/components/site/PageLayout";
import { PRODUCTS, BRANDS, formatPrice } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

const SITE_URL = "https://cozy-check-hub.lovable.app";

const BRAND_INFO: Record<string, { description: string; founded: string; usp: string[] }> = {
  Sikkens: {
    description:
      "Sikkens is wereldwijd hét premium merk voor professionele verf en houtbescherming. Bekend om diepe kleur, hoge dekking en duurzame technologie.",
    founded: "1792 — Sassenheim, Nederland",
    usp: ["Professionele kwaliteit", "Brede kleurwaaier", "Lange levensduur"],
  },
  Sigma: {
    description:
      "Sigma levert al meer dan 300 jaar betrouwbare verfproducten voor schilders. Bekend om uitstekende vloei, gemak en consistente resultaten.",
    founded: "1722 — Uithoorn, Nederland",
    usp: ["Vakman-favoriet", "Uitstekende vloei", "Eenvoudig in gebruik"],
  },
  Wijzonol: {
    description:
      "Wijzonol staat voor Nederlandse vakmanschap en sterke prijs-kwaliteit. Een vertrouwd merk voor binnen- en buitenwerk.",
    founded: "1916 — Zwolle, Nederland",
    usp: ["Sterke prijs-kwaliteit", "Nederlandse traditie", "Praktisch in gebruik"],
  },
  Flexa: {
    description:
      "Flexa maakt verven die net iets makkelijker werken: extra dekkend, snel droog en in honderden kleuren mengbaar.",
    founded: "1924 — Sassenheim, Nederland",
    usp: ["Extra dekkend", "Snel droog", "Honderden kleuren"],
  },
  Histor: {
    description:
      "Histor is generaties lang het vertrouwde merk voor schilders en doe-het-zelvers. Topkwaliteit lakken en muurverven.",
    founded: "1898 — Amsterdam, Nederland",
    usp: ["Klassiek merk", "Topkwaliteit lakken", "Breed assortiment"],
  },
};

export const Route = createFileRoute("/merk/$slug")({
  head: ({ params }) => {
    const brand = BRANDS.find((b) => b.toLowerCase() === params.slug.toLowerCase());
    const title = brand ? `${brand} kopen — alle producten | VerfOnlineWinkel` : "Merk | VerfOnlineWinkel";
    const desc = brand
      ? `Alle ${brand}-producten op één plek. Snel geleverd, op kleur gemengd, eerlijke prijs.`
      : "Bekijk onze merken.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `${SITE_URL}/merk/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/merk/${params.slug}` }],
    };
  },
  component: BrandPage,
});

function BrandPage() {
  const { slug } = Route.useParams();
  const { add } = useCart();
  const brand = BRANDS.find((b) => b.toLowerCase() === slug.toLowerCase());
  if (!brand) throw notFound();
  const info = BRAND_INFO[brand] ?? { description: "", founded: "", usp: [] };
  const products = PRODUCTS.filter((p) => p.brand === brand);

  return (
    <PageLayout
      title={brand}
      intro={info.description}
      breadcrumb={[{ label: "Merken" }, { label: brand }]}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section>
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm text-ink-soft">
              <strong className="text-ink">{products.length}</strong> {products.length === 1 ? "product" : "producten"}
            </span>
          </div>
          {products.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-ink-soft">
              Binnenkort verkrijgbaar.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
              {products.map((p) => (
                <article key={p.id} className="group relative rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent">
                  <button aria-label="Bewaar" className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-ink-soft hover:text-accent">
                    <Heart className="h-4 w-4" />
                  </button>
                  <Link to="/product/$slug" params={{ slug: p.slug }} className="block">
                    <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                      <img src={p.image} alt={p.name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <h2 className="mt-3 line-clamp-2 text-sm font-semibold text-ink">{p.name}</h2>
                    <div className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
                      <Star className="h-3 w-3 fill-rating text-rating" />
                      <span>{p.rating.toFixed(1)} ({p.reviews})</span>
                      {p.volume && <span className="ml-auto">{p.volume}</span>}
                    </div>
                    <div className="mt-2 text-base font-bold text-ink">{formatPrice(p.price)}</div>
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
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-accent/10 text-accent">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-soft">Officiële dealer</div>
                <div className="text-sm font-bold text-ink">100% origineel {brand}</div>
              </div>
            </div>
            <div className="mt-4 border-t border-border pt-4 text-sm text-ink-soft">
              <div className="font-semibold text-ink">Opgericht</div>
              <p>{info.founded}</p>
            </div>
          </div>
          <ul className="space-y-2 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] text-sm">
            {info.usp.map((u) => (
              <li key={u} className="flex items-center gap-2 text-ink">
                <ShieldCheck className="h-4 w-4 text-accent" /> {u}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </PageLayout>
  );
}
