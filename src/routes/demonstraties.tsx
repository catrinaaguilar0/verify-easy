import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Play, ArrowLeft, ExternalLink, Paintbrush, Lightbulb, ShieldCheck, Droplets, PaintRoller, Brush, Sparkles, Hammer, Layers, Wind, Clock } from "lucide-react";

export const Route = createFileRoute("/demonstraties")({
  head: () => ({
    meta: [
      { title: "Demonstraties — VerfOnlineWinkel" },
      {
        name: "description",
        content:
          "Bekijk professionele demonstratiefilms over verftechnieken, kleurkeuzes en duurzaam schilderen. Leer van de experts bij Sigma.",
      },
      { property: "og:title", content: "Demonstraties — VerfOnlineWinkel" },
      {
        property: "og:description",
        content:
          "Professionele demonstratiefilms: van verftechnieken tot kleuradvies. Leer de kneepjes van het vak.",
      },
    ],
  }),
  component: DemonstratiesPage,
});

const categories = [
  {
    title: "Verftechnieken",
    description:
      "Leer de juiste verftechnieken voor een strak resultaat. Van rollen tot spuiten en alles daartussen.",
    icon: Paintbrush,
  },
  {
    title: "Kleuradvies",
    description:
      "Ontdek hoe je de perfecte kleur kiest voor je ruimte. Tips over licht, ruimtegevoel en sfeer.",
    icon: Lightbulb,
  },
  {
    title: "Grondverf & Voorbehandeling",
    description:
      "Zie hoe je ondergronden correct voorbereidt voor een duurzaam en professioneel eindresultaat.",
    icon: ShieldCheck,
  },
  {
    title: "Duurzaam schilderen",
    description:
      "Bekijk demonstraties over milieubewust verven en duurzame verfoplossingen voor elk project.",
    icon: Droplets,
  },
];

const demoFilms = [
  {
    title: "Muren rollen als een pro",
    description:
      "Stap-voor-stap demonstratie van de juiste rol-techniek voor een egaal en streeploos eindresultaat op grote muurvlakken.",
    duration: "4 min",
    category: "Verftechnieken",
    icon: PaintRoller,
    source: "Sigma Coatings",
    sourceUrl: "https://www.sigma.nl/diensten/trainingen/demonstratiefilms",
  },
  {
    title: "Snijden langs plafond en plinten",
    description:
      "Leer met een goede kwast strakke randen aftrekken zonder masking tape. Tips voor houvast, doseren en doorhalen.",
    duration: "3 min",
    category: "Verftechnieken",
    icon: Brush,
    source: "Sigma Coatings",
    sourceUrl: "https://www.sigma.nl/diensten/trainingen/demonstratiefilms",
  },
  {
    title: "Hout schilderen: lakwerk binnen",
    description:
      "Van schuren tot aflakken. Bekijk hoe je deuren, kozijnen en plinten een professionele finish geeft met watergedragen lak.",
    duration: "6 min",
    category: "Verftechnieken",
    icon: Hammer,
    source: "Sigma Coatings",
    sourceUrl: "https://www.sigma.nl/diensten/trainingen/demonstratiefilms",
  },
  {
    title: "Kleur kiezen voor je woonkamer",
    description:
      "Praktische kleuradvies-demo: hoe lichtinval, ruimte en stijl je kleurkeuze bepalen. Inclusief uitprobeer-tips.",
    duration: "5 min",
    category: "Kleuradvies",
    icon: Sparkles,
    source: "Sigma Coatings",
    sourceUrl: "https://www.sigma.nl/diensten/trainingen/demonstratiefilms",
  },
  {
    title: "Grondverf: wanneer en welke?",
    description:
      "Overzicht van primers voor hout, metaal, gips en probleemondergronden. Voorkom hechtingsproblemen met de juiste basis.",
    duration: "4 min",
    category: "Grondverf & Voorbehandeling",
    icon: Layers,
    source: "Sigma Coatings",
    sourceUrl: "https://www.sigma.nl/diensten/trainingen/demonstratiefilms",
  },
  {
    title: "Buitenwerk voorbereiden",
    description:
      "Demonstratie van reinigen, schuren, plamuren en isoleren van houten buitenkozijnen voor langdurig resultaat.",
    duration: "7 min",
    category: "Grondverf & Voorbehandeling",
    icon: ShieldCheck,
    source: "Sigma Coatings",
    sourceUrl: "https://www.sigma.nl/diensten/trainingen/demonstratiefilms",
  },
  {
    title: "Duurzaam schilderen binnen",
    description:
      "Hoe kies je verf met lage emissies en goede milieuprestaties? Praktische uitleg over keurmerken en watergedragen systemen.",
    duration: "5 min",
    category: "Duurzaam schilderen",
    icon: Droplets,
    source: "Sigma Coatings",
    sourceUrl: "https://www.sigma.nl/diensten/trainingen/demonstratiefilms",
  },
  {
    title: "Spuiten met airless",
    description:
      "Introductie tot airless spuiten: voorbereiding, afplakken, juiste druk en spuittechniek voor een vlakke afwerking.",
    duration: "8 min",
    category: "Verftechnieken",
    icon: Wind,
    source: "Sigma Coatings",
    sourceUrl: "https://www.sigma.nl/diensten/trainingen/demonstratiefilms",
  },
];


function DemonstratiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border bg-surface">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <Link
              to="/hulp-en-advies"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Terug naar Hulp & Advies
            </Link>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-accent">
              Demonstraties
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Leer van de professionals
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-soft">
              Professionele demonstratiefilms vol praktische tips over verftechnieken, kleurkeuzes en duurzaam schilderen. Ontwikkel door Sigma.
            </p>
            <a
              href="https://www.sigma.nl/diensten/trainingen/demonstratiefilms"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              <Play className="h-4 w-4" />
              Bekijk alle films op Sigma.nl
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-ink md:text-3xl">
                Demonstratiefilms in het overzicht
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-ink-soft">
                Een selectie van praktische demonstraties, geordend per onderwerp. Bekijk de volledige film op de Sigma-website.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {demoFilms.map((film) => {
              const Icon = film.icon;
              return (
                <article
                  key={film.title}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition hover:border-accent hover:shadow-md"
                >
                  <a
                    href={film.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Bekijk video: ${film.title}`}
                    className="relative block aspect-video overflow-hidden bg-gradient-to-br from-accent/90 via-accent to-primary"
                  >
                    <Icon
                      className="absolute -right-4 -bottom-4 h-28 w-28 text-white/15"
                      aria-hidden="true"
                    />
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-primary shadow-lg transition group-hover:scale-110">
                        <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                      </span>
                    </span>
                    <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      <Clock className="h-3 w-3" />
                      {film.duration}
                    </span>
                    <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      {film.category}
                    </span>
                  </a>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-ink">{film.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-ink-soft">
                      {film.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <span className="text-xs text-ink-soft">
                        Bron: <span className="font-medium text-ink">{film.source}</span>
                      </span>
                      <a
                        href={film.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                      >
                        Bekijk
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <h2 className="mt-16 text-2xl font-bold text-ink md:text-3xl">
            Waar gaat het over?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="flex flex-col rounded-xl border border-border bg-background p-6 transition hover:border-accent hover:shadow-md"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{d.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">
                    {d.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="border-t border-border bg-surface">
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-2xl rounded-xl border border-border bg-background p-8 text-center">
              <h2 className="text-xl font-bold text-ink">
                Direct aan de slag?
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                Bekijk nu alle professionele demonstratiefilms van Sigma en word zelf een verfexpert.
              </p>
              <a
                href="https://www.sigma.nl/diensten/trainingen/demonstratiefilms"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <Play className="h-4 w-4" />
                Naar Sigma Demonstratiefilms
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
