import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Calculator, Palette, BookOpen, Play, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/hulp-en-advies")({
  head: () => ({
    meta: [
      { title: "Hulp & Advies — VerfOnlineWinkel" },
      {
        name: "description",
        content:
          "Alles om je verfklus te laten slagen: bereken hoeveel verf je nodig hebt, laat een kleur op maat mengen of lees onze blog vol tips en kleurinspiratie.",
      },
      { property: "og:title", content: "Hulp & Advies — VerfOnlineWinkel" },
      {
        property: "og:description",
        content:
          "Verfcalculator, verfmengservice en blog op één plek. Praktisch advies voor elk schilderproject.",
      },
    ],
  }),
  component: HulpEnAdviesPage,
});

const subpages = [
  {
    to: "/verfcalculator" as const,
    title: "Verfcalculator",
    description:
      "Bereken in seconden hoeveel liter verf je nodig hebt op basis van oppervlakte, type verf en aantal lagen.",
    icon: Calculator,
  },
  {
    to: "/verfmengservice" as const,
    title: "Verfmengservice",
    description:
      "Laat elke kleur — RAL, NCS of een eigen sample — exact mengen in jouw favoriete verfmerk en afwerking.",
    icon: Palette,
  },
  {
    to: "/blog" as const,
    title: "Blog",
    description:
      "Lees praktische tips, kleurtrends en stap-voor-stap-gidsen van onze verfspecialisten.",
    icon: BookOpen,
  },
  {
    to: "/demonstraties" as const,
    title: "Demonstraties",
    description:
      "Bekijk professionele demonstratiefilms over verftechnieken, kleurkeuzes en duurzaam schilderen.",
    icon: Play,
  },
];

const faqs = [
  {
    q: "Hoeveel verf heb ik nodig?",
    a: "Gebruik onze verfcalculator: vul oppervlakte, type verf en aantal lagen in en je krijgt direct het aantal liters.",
  },
  {
    q: "Kan ik een specifieke kleur laten mengen?",
    a: "Ja. Via onze verfmengservice mengen we elke RAL- of NCS-kleur, of een kleur van een sample, in het merk en de afwerking van jouw keuze.",
  },
  {
    q: "Welke verf past bij mijn project?",
    a: "Op de blog vind je gidsen per ruimte en ondergrond. Twijfel je nog? Neem contact op voor persoonlijk advies.",
  },
];

function HulpEnAdviesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border bg-surface">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Hulp & Advies
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Alles om je verfklus te laten slagen
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-soft">
              Van het berekenen van de juiste hoeveelheid verf tot het mengen
              van jouw droomkleur en inspiratie voor je volgende project — je
              vindt het hier.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {subpages.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.to}
                  to={p.to}
                  className="group flex flex-col rounded-xl border border-border bg-background p-6 transition hover:border-accent hover:shadow-md"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-xl font-bold text-ink">{p.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">
                    {p.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Bekijk {p.title.toLowerCase()}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-t border-border bg-background">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold text-ink md:text-3xl">Uitgelichte blogs</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">
              De nieuwste kleurtrends van topmerken, met direct passend productadvies en de optie om de tinten op maat te laten mengen.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Link
                to="/blog/$slug"
                params={{ slug: "flexa-kleurfamilie-2026" }}
                className="group block overflow-hidden rounded-xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:border-accent hover:shadow-md"
              >
                <div className="aspect-[16/9] overflow-hidden bg-surface">
                  <img
                    src="https://digital.brand.akzonobel.com/m/70c1676473bced0c/CF26_Dulux-Consumer_C12_Hero-Banner_1900x765_Desktop.png"
                    alt="Flexa Kleurfamilie van 2026"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-accent">Inspiratie · Flexa</div>
                  <h3 className="mt-2 text-lg font-bold text-ink group-hover:text-accent">
                    Flexa Kleurfamilie 2026
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">
                    Warme, verbindende tinten voor je interieur — met productadvies en mengservice.
                  </p>
                </div>
              </Link>
              <Link
                to="/blog/$slug"
                params={{ slug: "sigma-secret-safari-2026" }}
                className="group block overflow-hidden rounded-xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:border-accent hover:shadow-md"
              >
                <div className="aspect-[16/9] overflow-hidden bg-surface">
                  <img
                    src="https://stcacnlsigmanlprd01.blob.core.windows.net/content/kleur-van-het-jaar-2026-secret-safari-hoofdbeeld.jpg"
                    alt="Sigma Kleur van het Jaar 2026: Secret Safari"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-accent">Inspiratie · Sigma</div>
                  <h3 className="mt-2 text-lg font-bold text-ink group-hover:text-accent">
                    Sigma Secret Safari — Kleur van het Jaar 2026
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">
                    PPG1110-4 in het PARALLELS-thema, met passende Sigma-producten en mengservice.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface">

          <div className="container mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold text-ink md:text-3xl">
              Veelgestelde vragen
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {faqs.map((f) => (
                <div
                  key={f.q}
                  className="rounded-lg border border-border bg-background p-6"
                >
                  <h3 className="font-semibold text-ink">{f.q}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
