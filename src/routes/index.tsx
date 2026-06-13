import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense } from "react";
import {
  ArrowRight,
  Star,
  ShoppingBag,
  Check,
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Sun,
  TreePine,
  Wrench,
  Truck,
  Clock,
  RotateCcw,
  ShieldCheck,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

import hero from "@/assets/hero-cans.jpg";
import inspColors from "@/assets/insp-colors.jpg";
import inspInterior from "@/assets/insp-interior.jpg";
import brandSikkens from "@/assets/brand-sikkens.png";
import brandSigma from "@/assets/brand-sigma.png";
import brandWijzonol from "@/assets/brand-wijzonol.png";
import brandFlexa from "@/assets/brand-flexa.png";
import brandHistor from "@/assets/brand-histor.png";
import catMuurverf from "@/assets/cat-muurverf.jpg";
import catBinnenlak from "@/assets/cat-binnenlak.jpg";
import catBuitenlak from "@/assets/cat-buitenlak.jpg";
import catBeits from "@/assets/cat-beits.jpg";
import catGrondverf from "@/assets/cat-grondverf.jpg";
import catBenodigdheden from "@/assets/cat-benodigdheden.jpg";

import { getVisibleBrands } from "@/lib/brands.functions";
import { PRODUCTS, formatPrice, type Product } from "@/lib/catalog";
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
      { title: "Nieuweverf — Professionele verf voor elke klus" },
      { name: "description", content: "Topmerken verf, kleur op maat en deskundig advies. Gratis verzending vanaf €50. Voor 21:00 besteld, morgen in huis." },
      { property: "og:title", content: "Nieuweverf — Professionele verf voor elke klus" },
      { property: "og:description", content: "Topmerken verf, kleur op maat en deskundig advies. Snel in huis." },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_URL}/og-home.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Home,
});

const klusKeuze = [
  { icon: HomeIcon, title: "Binnen", sub: "Muren, plafonds, houtwerk", color: "text-success", bg: "bg-success/10" },
  { icon: Sun, title: "Buiten", sub: "Gevels, kozijnen, schuttingen", color: "text-navy", bg: "bg-navy/10" },
  { icon: TreePine, title: "Hout beschermen", sub: "Beitsen en oliën", color: "text-rating", bg: "bg-rating/15" },
  { icon: Wrench, title: "Metaal & overig", sub: "Metaal, kunststof, beton", color: "text-ink", bg: "bg-surface" },
];

const klusBlokken = [
  { img: catMuurverf, title: "Muurverf", sub: "Voor muren en plafonds", slug: "muurverf" },
  { img: catBinnenlak, title: "Binnenlak", sub: "Voor deuren, kozijnen en meubels", slug: "lakverf" },
  { img: catBuitenlak, title: "Buitenlak", sub: "Weerbestendige lakken", slug: "buitenverf" },
  { img: catBeits, title: "Beits", sub: "Bescherming voor hout", slug: "beits" },
  { img: catGrondverf, title: "Grondverf", sub: "De perfecte basis", slug: "grondverf" },
  { img: catBenodigdheden, title: "Benodigdheden", sub: "Alles voor een strak resultaat", slug: "benodigdheden" },
] as const;


const trustItems = [
  { icon: Truck, title: "Gratis verzending", sub: "vanaf €50" },
  { icon: Clock, title: "Voor 21:00 besteld,", sub: "morgen in huis" },
  { icon: RotateCcw, title: "Gratis retourneren", sub: "binnen 30 dagen" },
  { icon: ShieldCheck, title: "Veilig betalen", sub: "zoals jij wilt" },
];

function TrustpilotStars() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="grid h-5 w-5 place-items-center bg-success">
          <Star className="h-3 w-3 fill-white text-white" />
        </span>
      ))}
    </div>
  );
}

function ProductCardSmall({ p }: { p: Product }) {
  const { add } = useCart();
  const hasSale = !!p.oldPrice;
  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-cta">
      {hasSale && (
        <span className="absolute left-0 top-3 z-10 rounded-r bg-destructive px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-destructive-foreground">
          ACTIE
        </span>
      )}
      {!hasSale && p.bestseller && (
        <span className="absolute left-0 top-3 z-10 rounded-r bg-cta px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-cta-foreground">
          POPULAIR
        </span>
      )}
      <Link to="/product/$slug" params={{ slug: p.slug }} className="block">
        <div className="aspect-square overflow-hidden rounded-md bg-surface">
          <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
        </div>
        <h3 className="mt-3 line-clamp-1 text-sm font-bold text-ink">{p.name}</h3>
        <div className="mt-0.5 line-clamp-1 text-xs text-ink-soft">{p.shortDescription}</div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className={`text-base font-extrabold ${hasSale ? "text-destructive" : "text-ink"}`}>€ {p.price.toFixed(2).replace(".", ",")}</span>
          {p.oldPrice && <span className="text-xs text-ink-soft line-through">€{p.oldPrice.toFixed(2).replace(".", ",")}</span>}
        </div>
        <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-success">
          <Check className="h-3 w-3" /> Op voorraad
        </div>
      </Link>
      <button
        type="button"
        onClick={() => add(p)}
        disabled={!p.inStock}
        aria-label="In winkelwagen"
        className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-md bg-navy text-navy-foreground transition hover:bg-cta hover:text-cta-foreground disabled:opacity-40"
      >
        <ShoppingBag className="h-4 w-4" />
      </button>
    </article>
  );
}

function Home() {
  const featured = PRODUCTS.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-surface">
          <div className="container mx-auto px-4 py-4 md:py-10">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={hero}
                alt="Professionele verf in actie"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/40 md:bg-gradient-to-r md:from-background md:via-background/85 md:to-transparent" />
              <div className="relative grid gap-6 px-5 py-8 sm:px-6 md:grid-cols-[1.1fr_1fr] md:gap-8 md:px-10 md:py-16 lg:py-20">
                <div className="max-w-lg">
                  <h1 className="text-3xl font-extrabold leading-[1.1] text-ink sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                    Professionele verf,
                    <br />snel in huis
                  </h1>
                  <p className="mt-4 max-w-md text-[15px] text-ink-soft md:mt-5 md:text-base">
                    Kies eenvoudig op klus, merk of kleur. Voor binnen, buiten en professioneel gebruik.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-7">
                    <Link to="/kleuradvies" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cta px-7 text-sm font-extrabold uppercase tracking-wide text-cta-foreground transition hover:bg-cta-strong">
                      Shop op klus
                    </Link>
                    <Link to="/categorie/$slug" params={{ slug: "muurverf" }} className="inline-flex h-12 items-center justify-center gap-2 rounded-md border-2 border-ink bg-background px-7 text-sm font-extrabold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-background">
                      Bekijk alle producten
                    </Link>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-2 text-xs md:mt-8 md:gap-3">
                    <TrustpilotStars />
                    <span className="font-extrabold text-ink">9,2/10</span>
                    <span className="text-ink-soft">|</span>
                    <span className="font-semibold text-ink">Uitstekend</span>
                    <span className="hidden text-ink-soft sm:inline">|</span>
                    <span className="hidden text-ink-soft sm:inline">12.500+ reviews</span>
                  </div>
                </div>

                {/* Keuzehulp card */}
                <aside className="w-full self-center justify-self-stretch rounded-xl border border-border bg-background p-5 shadow-[var(--shadow-soft)] md:max-w-sm md:justify-self-end md:p-6">
                  <h2 className="text-lg font-extrabold text-ink md:text-xl">Waar ga je mee aan de slag?</h2>
                  <p className="mt-1 text-sm text-ink-soft">Vind snel de juiste verf voor jouw project.</p>
                  <ul className="mt-4 space-y-2 md:mt-5">
                    {klusKeuze.map(({ icon: Icon, title, sub, color, bg }) => (
                      <li key={title}>
                        <Link to="/kleuradvies" className="flex items-center gap-3 rounded-lg border border-border p-3 transition hover:border-cta hover:bg-surface">
                          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${bg} ${color}`}>
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-bold text-ink">{title}</span>
                            <span className="block truncate text-xs text-ink-soft">{sub}</span>
                          </span>
                          <ArrowRight className="h-4 w-4 shrink-0 text-ink-soft" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to="/kleuradvies" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-cta-foreground md:mt-5">
                    Naar keuzehulp <ArrowRight className="h-4 w-4" />
                  </Link>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* KLUSBLOKKEN */}
        <section className="container mx-auto px-4 py-6 md:py-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {klusBlokken.map(({ img, title, sub, slug }) => (
              <Link
                key={title}
                to="/categorie/$slug"
                params={{ slug }}
                className="group relative flex h-36 flex-col justify-end overflow-hidden rounded-xl border border-border shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-cta sm:h-40 md:h-44"
              >
                <img
                  src={img}
                  alt={title}
                  loading="lazy"
                  width={768}
                  height={576}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="relative p-4 text-white">
                  <div className="text-sm font-extrabold">{title}</div>
                  <div className="text-[11px] leading-tight text-white/80">{sub}</div>
                </div>
              </Link>
            ))}

          </div>
        </section>

        {/* UITGELICHTE BLOGS */}
        <section className="container mx-auto px-4 py-6 md:py-10">
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <Link
              to="/blog/$slug"
              params={{ slug: "flexa-kleurfamilie-2026" }}
              className="group relative block overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-cta"
              aria-label="Lees: Flexa Kleurfamilie 2026"
            >
              <div className="aspect-[16/9] overflow-hidden bg-surface">
                <img
                  src="https://digital.brand.akzonobel.com/m/70c1676473bced0c/CF26_Dulux-Consumer_C12_Hero-Banner_1900x765_Desktop.png"
                  alt="Flexa Kleurfamilie van 2026"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">Inspiratie</span>
                <h3 className="mt-1 text-lg font-extrabold text-white md:text-xl">Flexa Kleurfamilie 2026</h3>
              </div>
            </Link>
            <Link
              to="/blog/$slug"
              params={{ slug: "sigma-secret-safari-2026" }}
              className="group relative block overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-cta"
              aria-label="Lees: Sigma Secret Safari — Kleur van het Jaar 2026"
            >
              <div className="aspect-[16/9] overflow-hidden bg-surface">
                <img
                  src="https://stcacnlsigmanlprd01.blob.core.windows.net/content/kleur-van-het-jaar-2026-secret-safari-hoofdbeeld.jpg"
                  alt="Sigma Kleur van het Jaar 2026: Secret Safari"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">Inspiratie</span>
                <h3 className="mt-1 text-lg font-extrabold text-white md:text-xl">Sigma Secret Safari — Kleur van het Jaar 2026</h3>
              </div>
            </Link>
          </div>
        </section>



        {/* MEEST VERKOCHT */}
        <section className="container mx-auto px-4 py-6 md:py-10">
          <div className="mb-4 flex items-center justify-between gap-3 md:mb-5">
            <h2 className="text-xl font-extrabold text-ink md:text-2xl">Meest verkocht</h2>
            <div className="flex items-center gap-2 md:gap-3">
              <Link to="/categorie/$slug" params={{ slug: "muurverf" }} className="text-xs font-bold text-ink hover:text-cta-foreground">Bekijk alles</Link>
              <button aria-label="Vorige" className="hidden h-9 w-9 place-items-center rounded-full border border-border text-ink-soft hover:border-cta sm:grid">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button aria-label="Volgende" className="hidden h-9 w-9 place-items-center rounded-full border border-border text-ink-soft hover:border-cta sm:grid">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {featured.map((p) => <ProductCardSmall key={p.id} p={p} />)}
          </div>
        </section>

        {/* TRIO BAND */}
        <section className="container mx-auto px-4 pb-10">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Kies je kleur */}
            <article className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="min-w-0">
                <h3 className="text-lg font-extrabold text-ink">Kies je kleur</h3>
                <p className="mt-1 text-xs text-ink-soft">Laat jouw verf mengen in 50.000+ kleuren van bekende merken.</p>
                <Link to="/ral" className="mt-4 inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-navy-foreground hover:bg-navy-soft">
                  Naar kleurkiezer
                </Link>
              </div>
              <img src={inspColors} alt="Kleurwaaier" className="h-24 w-24 shrink-0 rounded-lg object-cover" />
            </article>

            {/* Verfadvies */}
            <article className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="grid grid-cols-[1fr_auto] items-start gap-3">
                <div className="min-w-0">
                  <h3 className="text-lg font-extrabold text-ink">Verfadvies nodig?</h3>
                  <p className="mt-1 text-xs text-ink-soft">Onze verfspecialisten helpen je graag met kleur, ondergrond en productkeuze.</p>
                  <ul className="mt-3 space-y-1 text-xs text-ink">
                    <li className="flex items-center gap-2"><Check className="h-3 w-3 text-success" /> Persoonlijk advies</li>
                    <li className="flex items-center gap-2"><Check className="h-3 w-3 text-success" /> WhatsApp, chat of telefoon</li>
                    <li className="flex items-center gap-2"><Check className="h-3 w-3 text-success" /> Snelle reactie</li>
                  </ul>
                  <Link to="/contact" className="mt-4 inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-navy-foreground hover:bg-navy-soft">
                    Vraag advies
                  </Link>
                </div>
                <img src={inspInterior} alt="Verfadviseur" className="h-28 w-24 shrink-0 rounded-lg object-cover" />
              </div>
            </article>

            {/* Nieuwsbrief */}
            <article className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold text-ink">Nieuwsbrief</h3>
              <p className="mt-1 text-xs text-ink-soft">Meld je aan en ontvang acties, verftips en inspiratie.</p>
              <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Jouw e-mailadres"
                  className="h-10 flex-1 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-cta focus:ring-2 focus:ring-cta/30"
                />
                <button className="grid h-10 w-10 place-items-center rounded-md bg-navy text-navy-foreground hover:bg-cta hover:text-cta-foreground" aria-label="Aanmelden">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-2 text-[11px] text-ink-soft">Je ontvangt max. 1 e-mail per week.</p>
            </article>
          </div>
        </section>

        {/* TOPMERKEN STRIP */}
        <section className="border-y border-border bg-background">
          <div className="container mx-auto flex items-center gap-6 px-4 py-5">
            <Suspense fallback={<div className="h-10 flex-1 animate-pulse rounded bg-surface" />}>
              <BrandsRow />
            </Suspense>
            <button aria-label="Volgende merken" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-ink-soft hover:border-cta hover:text-cta-foreground">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>


        {/* TRUST STRIP */}
        <section className="border-y border-border bg-surface">
          <div className="container mx-auto grid grid-cols-2 gap-3 px-4 py-5 sm:grid-cols-4 md:flex md:flex-wrap md:items-center md:gap-4">
            {trustItems.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-2.5 md:flex-1 md:min-w-[160px] md:gap-3">
                <Icon className="h-5 w-5 shrink-0 text-navy md:h-6 md:w-6" />
                <div className="min-w-0 text-[11px] leading-tight md:text-xs">
                  <div className="truncate font-extrabold text-ink">{title}</div>
                  <div className="truncate text-ink-soft">{sub}</div>
                </div>
              </div>
            ))}
            <div className="col-span-2 flex items-center justify-center gap-2 border-t border-border pt-3 sm:col-span-4 md:col-auto md:ml-auto md:border-0 md:pt-0">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-rating text-rating" />
                ))}
              </div>
              <div className="text-[11px] leading-tight">
                <div className="font-bold text-ink">9,2/10</div>
                <div className="text-ink-soft">12.500+ reviews</div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

function BrandsRow() {
  const { data: brands } = useSuspenseQuery(brandsQueryOptions);
  const items = brands.length > 0 ? brands : Object.keys(brandFallback).map((slug) => ({ id: slug, slug, name: slug, link_url: null, logo_url: null }));
  return (
    <div className="flex flex-1 snap-x snap-mandatory items-center gap-6 overflow-x-auto md:snap-none md:gap-8">
      {items.map((b) => {
        const src = b.logo_url ?? brandFallback[b.slug];
        return (
          <Link
            key={b.id}
            to="/merk/$slug"
            params={{ slug: b.slug }}
            className="grid h-12 shrink-0 snap-start place-items-center transition hover:opacity-80"
            aria-label={b.name}
          >
            <img src={src} alt={b.name} className="max-h-10 w-auto object-contain" />
          </Link>
        );
      })}
    </div>
  );
}

// Footer "Volg ons" icon set is referenced in Footer.tsx; kept here in case of reuse.
export const _icons = { Facebook, Instagram, Youtube };
