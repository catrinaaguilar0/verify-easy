import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calculator, Heart, Star, ArrowRight, ChevronDown, ChevronUp, Paintbrush, Layers, Ruler } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import prodSikkens from "@/assets/prod-sikkens.jpg";
import prodSigma from "@/assets/prod-sigma.jpg";
import prodWijzonol from "@/assets/prod-wijzonol.jpg";
import prodFlexa from "@/assets/prod-flexa.jpg";

const SITE_URL = "https://cozy-check-hub.lovable.app";

export const Route = createFileRoute("/verfcalculator")({
  head: () => ({
    meta: [
      { title: "Verfcalculator: bereken hoeveel verf je nodig hebt | Nieuweverf" },
      { name: "description", content: "Bereken in seconden hoeveel liter verf je nodig hebt. Vul je oppervlakte in, kies je type verf en ontdek exact het aantal liters inclusief dekking en lagen." },
      { property: "og:title", content: "Verfcalculator: bereken hoeveel verf je nodig hebt | Nieuweverf" },
      { property: "og:description", content: "Bereken snel het aantal liters verf dat je nodig hebt op basis van oppervlakte, type verf en aantal lagen." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/verfcalculator` },
      { name: "twitter:title", content: "Verfcalculator: bereken hoeveel verf je nodig hebt" },
      { name: "twitter:description", content: "Bereken snel het aantal liters verf dat je nodig hebt." },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/verfcalculator` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Verfcalculator", item: `${SITE_URL}/verfcalculator` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Hoeveel m2 kan ik schilderen met 1 liter verf?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Dat hangt af van het type verf. Muurverf dekt ongeveer 10 m2 per liter, lakverf ongeveer 12 m2 per liter, grondverf ongeveer 8 m2 per liter en buitenverf ongeveer 9 m2 per liter.",
              },
            },
            {
              "@type": "Question",
              name: "Hoeveel lagen verf heb ik nodig?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Voor een perfect resultaat adviseren wij 2 lagen. Bij een lichte kleur over een donkere ondergrond of bij buitenwerk kan 3 lagen nodig zijn. Bij grondverf volstaat meestal 1 laag als basis.",
              },
            },
            {
              "@type": "Question",
              name: "Moet ik altijd grondverf gebruiken?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Grondverf is niet altijd nodig, maar wel aan te raden bij nieuw hout, metaal of poreuze ondergronden. Het zorgt voor betere hechting, een egaler resultaat en beschermt tegen vocht.",
              },
            },
            {
              "@type": "Question",
              name: "Hoe bereken ik verf voor muren en plafonds?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Meet de lengte en breedte van elke muur of het plafond in meters. Vermenigvuldig lengte maal breedte om het oppervlakte in vierkante meters te krijgen. Tel alle oppervlakten bij elkaar op, trek deuren en ramen af, en vul het totaal in de verfcalculator in.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: VerfcalculatorPage,
});

type PaintType = "muurverf" | "lakverf" | "grondverf" | "buitenverf";

const paintTypes: { key: PaintType; label: string; coverage: number; description: string }[] = [
  { key: "muurverf", label: "Muurverf", coverage: 10, description: "Voor muren en plafonds binnen" },
  { key: "lakverf", label: "Lakverf", coverage: 12, description: "Voor hout en metaal" },
  { key: "grondverf", label: "Grondverf", coverage: 8, description: "Voorbehandeling en primer" },
  { key: "buitenverf", label: "Buitenverf", coverage: 9, description: "Duurzaam en weerbestendig" },
];

function roundUpHalf(value: number): number {
  return Math.ceil(value * 2) / 2;
}

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" />
      ))}
    </div>
  );
}

const recommendedProducts = [
  { name: "Sikkens Alphacryl Pure Mat SF", price: "€44,95", reviews: 128, img: prodSikkens, tags: ["muurverf", "binnen"] },
  { name: "Sigma Perfect Matt", price: "€38,95", reviews: 96, img: prodSigma, tags: ["muurverf", "binnen"] },
  { name: "Wijzonol Muurverf Extra Mat", price: "€36,50", reviews: 74, img: prodWijzonol, tags: ["muurverf", "binnen"] },
  { name: "Flexa Powerdek Muurverf Mat", price: "€42,95", reviews: 85, img: prodFlexa, tags: ["muurverf", "binnen"] },
];

const faqItems = [
  {
    q: "Hoeveel m2 kan ik schilderen met 1 liter verf?",
    a: "Dat hangt af van het type verf. Muurverf dekt ongeveer 10 m² per liter, lakverf ongeveer 12 m² per liter, grondverf ongeveer 8 m² per liter en buitenverf ongeveer 9 m² per liter. Deze waarden gelden voor gladde, voorbereide ondergronden. Bij ruwere oppervlakken kan het verbruik hoger liggen.",
  },
  {
    q: "Hoeveel lagen verf heb ik nodig?",
    a: "Voor een perfect resultaat adviseren wij 2 lagen. Bij een lichte kleur over een donkere ondergrond of bij buitenwerk kan 3 lagen nodig zijn. Bij grondverf volstaat meestal 1 laag als basis voor de afwerklaag. Zorg altijd dat de ondergrond schoon, droog en vetvrij is voordat je begint.",
  },
  {
    q: "Moet ik altijd grondverf gebruiken?",
    a: "Grondverf is niet altijd nodig, maar wel aan te raden bij nieuw hout, metaal of poreuze ondergronden. Het zorgt voor betere hechting, een egaler resultaat en beschermt tegen vocht. Bij eerder geschilderde en goed hechtende ondergronden kun je vaak direct met de afwerkverf beginnen.",
  },
  {
    q: "Hoe bereken ik verf voor muren en plafonds?",
    a: "Meet de lengte en breedte van elke muur of het plafond in meters. Vermenigvuldig lengte maal breedte om het oppervlakte in vierkante meters te krijgen. Tel alle oppervlakten bij elkaar op, trek deuren en ramen af, en vul het totaal in de verfcalculator in. Vergeet niet om de plafonds mee te tellen als je die ook gaat schilderen.",
  },
];

function VerfcalculatorPage() {
  const [surface, setSurface] = useState<string>("");
  const [layers, setLayers] = useState<number>(2);
  const [paintType, setPaintType] = useState<PaintType>("muurverf");
  const [result, setResult] = useState<{ liters: number; rawLiters: number; coverage: number } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const selectedPaint = paintTypes.find((p) => p.key === paintType)!;

  function handleCalculate() {
    const area = parseFloat(surface.replace(",", "."));
    if (!area || area <= 0) {
      setResult(null);
      return;
    }
    const rawLiters = (area * layers) / selectedPaint.coverage;
    const liters = roundUpHalf(rawLiters);
    setResult({ liters, rawLiters, coverage: selectedPaint.coverage });
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-ink-soft">
          <a href="/" className="hover:text-accent">Home</a>
          <span className="mx-1">/</span>
          <span className="text-ink">Verfcalculator</span>
        </nav>

        {/* Header */}
        <header className="mt-6 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
            <Calculator className="h-4 w-4" /> Verfcalculator
          </div>
          <h1 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">
            Verfcalculator: bereken hoeveel verf je nodig hebt
          </h1>
          <p className="mt-3 text-sm text-ink-soft leading-relaxed">
            Vul het oppervlakte in vierkante meters in, kies het type verf en het aantal lagen.
            Onze calculator rekent uit hoeveel liter verf je exact nodig hebt — afgerond naar boven op halve liters zodat je nooit te weinig hebt.
          </p>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,380px]">
          {/* Calculator Card */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
            <h2 className="text-lg font-bold text-ink">Jouw project</h2>
            <p className="mt-1 text-sm text-ink-soft">Vul de details in en klik op berekenen.</p>

            <div className="mt-6 space-y-5">
              {/* Surface area */}
              <div>
                <label htmlFor="surface" className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Ruler className="h-4 w-4 text-accent" /> Oppervlakte (m²)
                </label>
                <input
                  id="surface"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Bijvoorbeeld 25"
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <p className="mt-1 text-xs text-ink-soft">Tel alle wanden en plafonds op. Trek ramen en deuren af.</p>
              </div>

              {/* Layers */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Layers className="h-4 w-4 text-accent" /> Aantal lagen
                </label>
                <div className="mt-2 flex gap-2">
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      onClick={() => setLayers(n)}
                      className={`flex-1 rounded-md border py-2.5 text-sm font-semibold transition ${
                        layers === n
                          ? "border-accent bg-accent/10 text-ink"
                          : "border-border bg-background text-ink-soft hover:border-accent"
                      }`}
                    >
                      {n} {n === 1 ? "laag" : "lagen"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paint type */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Paintbrush className="h-4 w-4 text-accent" /> Type verf
                </label>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {paintTypes.map((pt) => (
                    <button
                      key={pt.key}
                      onClick={() => setPaintType(pt.key)}
                      className={`rounded-lg border p-3 text-left transition ${
                        paintType === pt.key
                          ? "border-accent bg-accent/10"
                          : "border-border bg-background hover:border-accent"
                      }`}
                    >
                      <div className="text-sm font-semibold text-ink">{pt.label}</div>
                      <div className="text-xs text-ink-soft">{pt.description}</div>
                      <div className="mt-1 text-xs font-medium text-accent">{pt.coverage} m² / liter</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground transition hover:bg-accent-strong"
              >
                <Calculator className="h-4 w-4" /> Bereken mijn verf
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-accent">Resultaat</div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-ink">{result.liters.toFixed(1).replace(".", ",")}</span>
                  <span className="text-sm font-semibold text-ink-soft">liter</span>
                </div>
                <p className="mt-2 text-sm text-ink">
                  Wij adviseren om <strong>{result.liters.toFixed(1).replace(".", ",")} liter {selectedPaint.label.toLowerCase()}</strong> te bestellen.
                </p>
                <p className="mt-1 text-xs text-ink-soft">
                  Gebaseerd op {surface} m² × {layers} {layers === 1 ? "laag" : "lagen"} met een dekking van {result.coverage} m² per liter.
                  Ruw resultaat: {result.rawLiters.toFixed(2).replace(".", ",")} liter — afgerond naar boven op 0,5 liter.
                </p>
              </div>
            )}

            {/* Empty state hint */}
            {!result && surface === "" && (
              <div className="mt-6 rounded-xl border border-dashed border-border bg-surface p-5 text-center text-sm text-ink-soft">
                Vul je oppervlakte in en klik op <strong className="text-ink">Bereken mijn verf</strong> om het resultaat te zien.
              </div>
            )}
          </section>

          {/* Sidebar tips */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Handige tips</h3>
              <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                <li className="flex gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-xs font-bold text-accent">1</span>
                  <span>Meet de lengte en hoogte van elke wand in meters.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-xs font-bold text-accent">2</span>
                  <span>Trek ramen en deuren af (ca. 1,5–2 m² per deur, 1–1,5 m² per raam).</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-xs font-bold text-accent">3</span>
                  <span>Vergeet plafonds niet — deze hebben vaak meer verf nodig dan gedacht.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-xs font-bold text-accent">4</span>
                  <span>Koop altijd iets meer dan de strikte berekening — een reserveblik voorkomt kleurverschil bij nabestelling.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Dekking per type</h3>
              <div className="mt-4 space-y-2 text-sm">
                {paintTypes.map((pt) => (
                  <div key={pt.key} className="flex items-center justify-between rounded-lg bg-surface px-3 py-2">
                    <span className="text-ink">{pt.label}</span>
                    <span className="font-semibold text-accent">{pt.coverage} m² / L</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Recommended products */}
        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-ink md:text-3xl">Aanbevolen producten</h2>
            <a href="/muurverf" className="text-xs font-bold uppercase tracking-wider text-accent hover:text-accent-strong">
              Bekijk alle <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {recommendedProducts.map((p) => (
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
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-surface px-2 py-0.5 text-[10px] uppercase tracking-wider text-ink-soft">{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold text-ink md:text-3xl">Veelgestelde vragen</h2>
          <div className="mt-6 space-y-3">
            {faqItems.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-ink">{item.q}</span>
                    {open ? <ChevronUp className="h-4 w-4 shrink-0 text-ink-soft" /> : <ChevronDown className="h-4 w-4 shrink-0 text-ink-soft" />}
                  </button>
                  {open && (
                    <div className="px-5 pb-4 text-sm leading-relaxed text-ink-soft">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
