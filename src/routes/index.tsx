import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense } from "react";
import { ArrowRight, Heart, Star } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import hero from "@/assets/hero-cans.jpg";
import catMuur from "@/assets/cat-muurverf2.jpg";
import catLak from "@/assets/cat-lakverf2.jpg";
import catBeits from "@/assets/cat-beits2.jpg";
import catGrond from "@/assets/cat-grondverf2.jpg";
import prodSikkens from "@/assets/prod-sikkens.jpg";
import prodSigma from "@/assets/prod-sigma.jpg";
import prodWijzonol from "@/assets/prod-wijzonol.jpg";
import prodFlexa from "@/assets/prod-flexa.jpg";
import brandSikkens from "@/assets/brand-sikkens.png";
import brandSigma from "@/assets/brand-sigma.png";
import brandWijzonol from "@/assets/brand-wijzonol.png";
import brandFlexa from "@/assets/brand-flexa.png";
import brandHistor from "@/assets/brand-histor.png";
import { getVisibleBrands } from "@/lib/brands.functions";
import { categoryLabel } from "@/lib/brand-categories";

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

import inspInterior from "@/assets/insp-interior.jpg";
import inspColors from "@/assets/insp-colors.jpg";

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

const bestsellers = [
  { name: "Sikkens Alphacryl Pure Mat SF", price: "€44,95", reviews: 128, img: prodSikkens },
  { name: "Sigma S2U Allure Gloss", price: "€49,95", reviews: 96, img: prodSigma },
  { name: "Wijzonol LBH SDT Ultra Hoogglans", price: "€39,50", reviews: 74, img: prodWijzonol },
  { name: "Flexa Powerdek Muurverf Mat", price: "€42,95", reviews: 85, img: prodFlexa },
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

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-surface">
          <div className="container mx-auto grid gap-8 px-4 py-14 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-10 md:py-20 lg:grid-cols-[1fr_1.55fr] lg:gap-14 lg:py-24">
            <div>
              <h1 className="text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
                Professionele verf<br />voor elk project
              </h1>
              <p className="mt-5 max-w-md text-base text-ink-soft md:text-lg">
                De beste kwaliteit verf en materialen voor vakman en doe-het-zelver. Bestel snel en voordelig online.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/muurverf" className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground transition hover:bg-accent-strong">
                  Shop verf <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#inspiratie" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:border-ink">
                  Kleuradvies
                </a>
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
          <h2 className="mb-8 text-2xl font-bold text-ink md:text-3xl">Shop per categorie</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {categories.map((c) => (
              <a key={c.title} href="#" className="group rounded-xl border border-border bg-card p-5 text-center shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent">
                <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                  <img src={c.img} alt={c.title} width={640} height={640} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="mt-4 text-sm font-bold tracking-wide text-ink">{c.title}</div>
                <div className="text-xs text-ink-soft">{c.sub}</div>
                <div className="mt-3 text-xs font-bold uppercase tracking-wider text-accent">Bekijk →</div>
              </a>
            ))}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {[
              { title: "BUITENVERF", sub: "Duurzaam en weerbestendig" },
              { title: "VERFBENODIGDHEDEN", sub: "Kwasten, rollers en meer" },
            ].map((c) => (
              <a key={c.title} href="#" className="group flex items-center justify-between rounded-xl border border-border bg-surface px-8 py-7 transition hover:border-accent">
                <div>
                  <div className="text-base font-bold tracking-wide text-ink">{c.title}</div>
                  <div className="text-sm text-ink-soft">{c.sub}</div>
                </div>
                <span className="text-sm font-bold uppercase tracking-wider text-accent">Bekijk →</span>
              </a>
            ))}
          </div>
        </section>

        {/* BRANDS */}
        <section className="border-y border-border bg-surface">
          <div className="container mx-auto px-4 py-12">
            <h2 className="mb-8 text-2xl font-bold text-ink md:text-3xl">Shop per merk</h2>
            <Suspense fallback={<div className="h-20 animate-pulse rounded-lg bg-background" />}>
              <BrandsGrid />
            </Suspense>

            <div className="mt-5 flex justify-center">
              <a href="#" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-ink hover:border-ink">
                Bekijk alle merken
              </a>
            </div>
          </div>
        </section>

        {/* BESTSELLERS */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-ink md:text-3xl">Bestsellers</h2>
            <a href="#" className="text-xs font-bold uppercase tracking-wider text-accent hover:text-accent-strong">Bekijk alle</a>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {bestsellers.map((p) => (
              <article key={p.name} className="group relative rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent">
                <button aria-label="Bewaar" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-ink-soft transition hover:text-accent">
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
