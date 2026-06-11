import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Play, ArrowLeft, ExternalLink, Paintbrush, Lightbulb, ShieldCheck, Droplets, Roller, Brush, Sparkles, Hammer, Layers, Wind } from "lucide-react";

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
    icon: Roller,
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
          <h2 className="text-2xl font-bold text-ink md:text-3xl">
            Waar gaat het over?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {demos.map((d) => {
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
