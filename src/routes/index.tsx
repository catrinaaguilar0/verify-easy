import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { ArrowRight, Heart, Star, ShoppingBag, Sparkles, Check, ChevronDown, ChevronUp, Quote } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import hero from "@/assets/hero-cans.jpg";
import catMuur from "@/assets/cat-muurverf2.jpg";
import catLak from "@/assets/cat-lakverf2.jpg";
import catBeits from "@/assets/cat-beits2.jpg";
import catGrond from "@/assets/cat-grondverf2.jpg";
import brandSikkens from "@/assets/brand-sikkens.png";
import brandSigma from "@/assets/brand-sigma.png";
import brandWijzonol from "@/assets/brand-wijzonol.png";
import brandFlexa from "@/assets/brand-flexa.png";
import brandHistor from "@/assets/brand-histor.png";
import inspInterior from "@/assets/insp-interior.jpg";
import inspColors from "@/assets/insp-colors.jpg";
import { getVisibleBrands } from "@/lib/brands.functions";
import { categoryLabel } from "@/lib/brand-categories";
import { PRODUCTS, POPULAR_RAL, formatPrice, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

const brandFallback: Record<string, string> = {
  sikkens: brandSikkens,
  sigma: brandSigma,
  wijzonol: brandWijzonol,
  flexa: brandFlexa,
  histor: brandHistor,
};

const brandsQueryOptions = queryOptions({
  queryKey: ["visible-brands"],
  queryFn: () => getVisibleBrands(),
});

const SITE_URL = "https://cozy-check-hub.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VerfOnlineWinkel — Professionele verf voor elk project" },
      { name: "description", content: "De beste kwaliteit verf en materialen voor vakman en doe-het-zelver. Sikkens, Sigma, Wijzonol, Flexa en Histor — gratis verzending vanaf €50." },
      { property: "og:title", content: "VerfOnlineWinkel — Professionele verf voor elk project" },
      { property: "og:description", content: "Topmerken verf, kleur op maat en deskundig advies. Snel in huis." },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_URL}/og-home.jpg` },
      { name: "twitter:title", content: "VerfOnlineWinkel — Professionele verf voor elk project" },
      { name: "twitter:description", content: "Topmerken verf, kleur op maat en deskundig advies." },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
    ],
  }),
  component: Home,
});

const categories = [
  { title: "MUURVERF", sub: "Binnen en buiten", img: catMuur },
  { title: "LAKVERF", sub: "Voor hout en metaal", img: catLak },
  { title: "BEITS", sub: "Transparant en dekkend", img: catBeits },
  { title: "GRONDVERF", sub: "Voorbehandeling", img: catGrond },
];

const bestsellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 4);
const newProducts = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

const reviews = [
  { name: "Erik J.", role: "Schilder", text: "Snel geleverd en perfect gemengd. Mijn vaste leverancier voor projecten.", rating: 5 },
  { name: "Marleen K.", role: "DHZ-er", text: "Goed advies via de chat, de muurverf dekte in één laag. Top!", rating: 5 },
  { name: "Joost van D.", role: "Vakman", text: "Zeer scherpe prijzen op Sikkens. Volgende dag binnen, netjes verpakt.", rating: 5 },
];

const faq = [
  {
    q: "Hoeveel verf heb ik nodig voor mijn project?",
    a: "Gebruik onze verfcalculator: vul je oppervlakte, type verf en het aantal lagen in en wij berekenen exact het aantal liters dat je nodig hebt.",
  },
  {
    q: "Wat zijn de levertijden?",
    a: "Voor 23:00 besteld is de volgende werkdag in huis. Op zaterdag voor 16:00 besteld leveren we de eerstvolgende werkdag.",
  },
  {
    q: "Kan ik kleur op maat laten mengen?",
    a: "Ja. Wij mengen elke RAL-, NCS- of merkkleur op bestelling. Maatwerkkleuren worden binnen 1-2 werkdagen verzonden.",
  },
  {
    q: "Hoe werkt retourneren?",
    a: "Ongeopende blikken kun je binnen 14 dagen kosteloos retourneren. Op maat gemengde verf is uitgesloten van retour.",
  },
];

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex items-center gap-0.5 text-rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < n ? "fill-current" : "opacity-30"}`} />
      ))}
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent">
      {p.isNew && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
          Nieuw
        </span>
      )}
      {p.oldPrice && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
          Sale
        </span>
      )}
      <button aria-label="Bewaar" className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-ink-soft transition hover:text-accent">
        <Heart className="h-4 w-4" />
      </button>
      <Link to="/product/$slug" params={{ slug: p.slug }} className="block">
        <div className="aspect-square overflow-hidden rounded-lg bg-surface">
          <img src={p.image} alt={p.name} width={800} height={800} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="mt-3 text-[11px] uppercase tracking-wider text-ink-soft">{p.brand}</div>
        <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold text-ink">{p.name}</h3>
        <div className="mt-1 text-xs text-ink-soft">{p.volume}</div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-ink">{formatPrice(p.price)}</span>
          {p.oldPrice && <span className="text-xs text-ink-soft line-through">{formatPrice(p.oldPrice)}</span>}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <Stars n={Math.round(p.rating)} />
          <span className="text-xs text-ink-soft">({p.reviews})</span>
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
  );
}

function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-surface">
          <div className="container mx-auto grid gap-8 px-4 py-14 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-10 md:py-20 lg:grid-cols-[1fr_1.55fr] lg:gap-14 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
                <Sparkles className="h-3 w-3" /> Vakwinkel sinds 1998
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                Professionele verf<br />voor elk project
              </h1>
              <p className="mt-5 max-w-md text-base text-ink-soft md:text-lg">
                De beste kwaliteit verf en materialen voor vakman en doe-het-zelver. Bestel snel en voordelig online.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/muurverf" className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground transition hover:bg-accent-strong">
                  Shop verf <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/verfcalculator" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:border-ink">
                  Verfcalculator
                </Link>
              </div>
              <div className="mt-7 flex items-center gap-4 text-xs text-ink-soft">
                <div className="flex items-center gap-1.5"><Stars /> <span className="font-semibold text-ink">4,8/5</span> (2.341 reviews)</div>
              </div>
            </div>
            <div className="md:-mr-4 lg:-mr-8">
              <img
                src={hero}
                alt="Sikkens, Sigma en Wijzonol professionele verfblikken"
                width={1600}
                height={1100}
                className="w-full rounded-xl object-cover shadow-[var(--shadow-soft)] aspect-[16/11] md:aspect-[4/3] lg:aspect-[16/11]"
              />
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-ink md:text-3xl">Shop per categorie</h2>
            <Link to="/muurverf" className="text-xs font-bold uppercase tracking-wider text-accent hover:text-accent-strong">Alle categorieën →</Link>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {categories.map((c) => (
              <Link key={c.title} to="/muurverf" className="group rounded-xl border border-border bg-card p-5 text-center shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent">
                <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                  <img src={c.img} alt={c.title} width={640} height={640} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="mt-4 text-sm font-bold tracking-wide text-ink">{c.title}</div>
                <div className="text-xs text-ink-soft">{c.sub}</div>
                <div className="mt-3 text-xs font-bold uppercase tracking-wider text-accent">Bekijk →</div>
              </Link>
            ))}
          </div>
        </section>

        {/* BESTSELLERS */}
        <section className="border-y border-border bg-surface">
          <div className="container mx-auto px-4 py-16">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-ink md:text-3xl">Bestsellers</h2>
                <p className="mt-1 text-sm text-ink-soft">De favorieten van onze klanten.</p>
              </div>
              <Link to="/muurverf" className="text-xs font-bold uppercase tracking-wider text-accent hover:text-accent-strong">Bekijk alle</Link>
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {bestsellers.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>

        {/* COLOR ADVICE */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
                Kleuradvies
              </span>
              <h2 className="mt-3 text-2xl font-bold text-ink md:text-3xl">Vind jouw perfecte kleur</h2>
              <p className="mt-3 text-sm text-ink-soft">
                Meer dan 2.000 RAL-, NCS- en merkkleuren op bestelling gemengd. Twijfel je nog? Bestel een
                kleurtester van 50 ml en kijk hoe de kleur in jouw ruimte valt.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/ral" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary-dark">
                  RAL kleurenkaart <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/verfmengservice" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-ink hover:border-ink">
                  Kleur laten mengen
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
              {POPULAR_RAL.map((r) => (
                <Link
                  key={r.code}
                  to="/ral/$code"
                  params={{ code: r.code.replace("RAL ", "") }}
                  className="group rounded-lg border border-border bg-card p-3 text-left transition hover:-translate-y-0.5 hover:border-accent"
                >
                  <div className="aspect-square w-full rounded-md border border-border" style={{ backgroundColor: r.hex }} />
                  <div className="mt-2 text-[11px] font-bold text-ink">{r.code}</div>
                  <div className="truncate text-[11px] text-ink-soft">{r.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NEW PRODUCTS */}
        {newProducts.length > 0 && (
          <section className="border-t border-border bg-surface">
            <div className="container mx-auto px-4 py-16">
              <div className="mb-8 flex items-end justify-between">
                <h2 className="text-2xl font-bold text-ink md:text-3xl">Nieuw in het assortiment</h2>
                <Link to="/muurverf" className="text-xs font-bold uppercase tracking-wider text-accent hover:text-accent-strong">Bekijk alle</Link>
              </div>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                {newProducts.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>
            </div>
          </section>
        )}

        {/* BRANDS */}
        <section className="border-t border-border">
          <div className="container mx-auto px-4 py-14">
            <h2 className="mb-8 text-2xl font-bold text-ink md:text-3xl">Shop per merk</h2>
            <Suspense fallback={<div className="h-20 animate-pulse rounded-lg bg-surface" />}>
              <BrandsGrid />
            </Suspense>
          </div>
        </section>

        {/* INSPIRATION */}
        <section id="inspiratie" className="border-y border-border bg-surface">
          <div className="container mx-auto px-4 py-16">
            <h2 className="mb-8 text-2xl font-bold text-ink md:text-3xl">Inspiratie & kleuradvies</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {[
                { img: inspInterior, h: "Kleurinspiratie voor elk interieur", cta: "Laat je inspireren" },
                { img: inspColors, h: "Vind de perfecte kleur voor jouw project", cta: "Bekijk kleuren" },
              ].map((c) => (
                <a key={c.h} href="#" className="group relative block aspect-[3/2] overflow-hidden rounded-xl">
                  <img src={c.img} alt={c.h} width={900} height={700} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
                  <div className="relative z-10 flex h-full flex-col justify-end p-8 text-primary-foreground">
                    <h3 className="max-w-xs text-2xl font-bold leading-tight">{c.h}</h3>
                    <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-md bg-background px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink transition group-hover:bg-accent group-hover:text-accent-foreground">
                      {c.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-ink md:text-3xl">Wat klanten zeggen</h2>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Stars /> <span className="font-bold text-ink">4,8 / 5</span>
                <span className="text-ink-soft">op basis van 2.341 reviews</span>
              </div>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((r) => (
              <article key={r.name} className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <Quote className="h-6 w-6 text-accent/40" />
                <p className="mt-3 text-sm leading-relaxed text-ink">"{r.text}"</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-ink">{r.name}</div>
                    <div className="text-xs text-ink-soft">{r.role}</div>
                  </div>
                  <Stars n={r.rating} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border bg-surface">
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-ink md:text-3xl">Veelgestelde vragen</h2>
              <div className="mt-6 space-y-3">
                {faq.map((item, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={item.q} className="overflow-hidden rounded-xl border border-border bg-background">
                      <button
                        onClick={() => setOpenFaq(open ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="text-sm font-semibold text-ink">{item.q}</span>
                        {open ? <ChevronUp className="h-4 w-4 shrink-0 text-ink-soft" /> : <ChevronDown className="h-4 w-4 shrink-0 text-ink-soft" />}
                      </button>
                      {open && <div className="px-5 pb-4 text-sm leading-relaxed text-ink-soft">{item.a}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Gratis verzending", s: "Vanaf €50 in heel NL" },
              { t: "Snel in huis", s: "Voor 23:00 = morgen" },
              { t: "14 dagen retour", s: "Ongeopend retourneren" },
              { t: "Veilig betalen", s: "iDEAL, Bancontact, AfterPay" },
            ].map((b) => (
              <div key={b.t} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <Check className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <div className="text-sm font-bold text-ink">{b.t}</div>
                  <div className="text-xs text-ink-soft">{b.s}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function BrandsGrid() {
  const { data: brands } = useSuspenseQuery(brandsQueryOptions);
  if (brands.length === 0) {
    return <p className="text-center text-sm text-ink-soft">Nog geen merken beschikbaar.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {brands.map((b) => {
        const src = b.logo_url ?? brandFallback[b.slug];
        return (
          <a
            key={b.id}
            href={b.link_url ?? "#"}
            title={`${b.name} — ${categoryLabel(b.category)}`}
            className="grid h-20 place-items-center rounded-lg border border-border bg-background px-4 transition hover:border-accent"
          >
            {src ? (
              <img
                src={src}
                alt={`${b.name} logo`}
                loading="lazy"
                className="max-h-12 w-auto object-contain"
              />
            ) : (
              <span className="text-sm font-bold tracking-tight text-ink">{b.name}</span>
            )}
          </a>
        );
      })}
    </div>
  );
}
