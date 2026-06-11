import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Calculator,
  Palette,
  BookOpen,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

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

        {/* Index / inhoudsopgave */}
        <section className="border-b border-border bg-surface">
          <div className="container mx-auto px-4 py-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Op deze pagina
            </h2>
            <nav className="mt-4">
              <ul className="flex flex-wrap gap-3">
                {subpages.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li key={p.to}>
                      <a
                        href={`#${p.to.replace("/", "")}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
                      >
                        <Icon className="h-4 w-4 text-accent" />
                        {p.title}
                      </a>
                    </li>
                  );
                })}
                <li>
                  <a
                    href="#faq"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
                  >
                    <ChevronRight className="h-4 w-4 text-accent" />
                    Veelgestelde vragen
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section>

        {/* Tools grid */}
        <section id="tools" className="container mx-auto px-4 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {subpages.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.to}
                  to={p.to}
                  id={p.to.replace("/", "")}
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

        {/* FAQ */}
        <section id="faq" className="border-t border-border bg-surface">
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
