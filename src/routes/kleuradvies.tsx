import { createFileRoute, Link } from "@tanstack/react-router";
import { Palette, Sparkles, Sun, Moon, Pipette } from "lucide-react";
import { PageLayout } from "@/components/site/PageLayout";

const SITE_URL = "https://cozy-check-hub.lovable.app";

export const Route = createFileRoute("/kleuradvies")({
  head: () => ({
    meta: [
      { title: "Kleuradvies — welke verfkleur past bij jou? | Nieuweverf" },
      { name: "description", content: "Persoonlijk kleuradvies, kleurtrends 2026 en tips om de perfecte verfkleur te kiezen voor elke ruimte." },
      { property: "og:title", content: "Kleuradvies — welke verfkleur past bij jou? | Nieuweverf" },
      { property: "og:description", content: "Kleuradvies voor elke ruimte: inspiratie, trends en praktische tips." },
      { property: "og:url", content: `${SITE_URL}/kleuradvies` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/kleuradvies` }],
  }),
  component: ColorAdvicePage,
});

const PALETTES = [
  {
    name: "Warme Aarde",
    desc: "Terracotta, klei en olijftinten voor een knusse, geaarde sfeer.",
    colors: ["#B8674A", "#D6B58A", "#7C6A4D", "#3F362E"],
    rooms: ["Woonkamer", "Hal", "Slaapkamer"],
  },
  {
    name: "Salie & Linnen",
    desc: "Zachte salie- en linnentinten — rustig, fris en tijdloos.",
    colors: ["#A8B89A", "#E7E1D4", "#7B8A6D", "#2E3A33"],
    rooms: ["Slaapkamer", "Werkkamer", "Badkamer"],
  },
  {
    name: "Diep Oceaan",
    desc: "Donkere blauwen en groenen voor een statige, theatrale uitstraling.",
    colors: ["#2E4756", "#173544", "#3B5C5B", "#F4ECDE"],
    rooms: ["Eetkamer", "Studeerkamer"],
  },
  {
    name: "Modern Mat Wit",
    desc: "Genuanceerde witten met een vleugje warmte. Tijdloos en licht.",
    colors: ["#F7F4EC", "#E7DFCF", "#CBC3B5", "#7E7669"],
    rooms: ["Plafond", "Hal", "Keuken"],
  },
];

const TIPS = [
  { icon: Sun, title: "Test bij daglicht én lamplicht", body: "Schilder altijd een teststaal en bekijk de kleur op verschillende momenten van de dag — kunstlicht maakt elke kleur warmer." },
  { icon: Moon, title: "Donkere kleuren maken klein én knus", body: "Een donkere wand verkleint een ruimte optisch, maar maakt hem ook intiemer. Combineer met een lichte tegenwand." },
  { icon: Palette, title: "Houd 60-30-10 in gedachten", body: "Gebruik 60% hoofdkleur, 30% secundaire kleur en 10% accentkleur — een klassieke regel voor balans." },
  { icon: Sparkles, title: "Begin bij de meubels", body: "Kies eerst je grote meubels en haal daar je palet uit. Verf is veel makkelijker te vervangen dan een bank." },
];

function ColorAdvicePage() {
  return (
    <PageLayout
      title="Kleuradvies"
      intro="Een kleur kiezen is meer dan een mooie tint prikken. We helpen je met palettes, trends en advies om de perfecte verfkleur te vinden — afgestemd op jouw ruimte en lichtinval."
      breadcrumb={[{ label: "Kleuradvies" }]}
    >
      {/* Hero cards */}
      <section className="grid gap-6 md:grid-cols-2">
        {PALETTES.map((p) => (
          <article key={p.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="flex h-32">
              {p.colors.map((c) => (
                <div key={c} className="flex-1" style={{ background: c }} />
              ))}
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-ink">{p.name}</h2>
              <p className="mt-2 text-sm text-ink-soft">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.rooms.map((r) => (
                  <span key={r} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink">
                    {r}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-ink-soft">
                {p.colors.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full border border-border" style={{ background: c }} />
                    {c.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Tips */}
      <section className="mt-12">
        <h2 className="text-2xl font-extrabold text-ink">Tips van onze kleurspecialisten</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {TIPS.map((t) => (
            <div key={t.title} className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                <t.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ink">{t.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 grid gap-6 rounded-2xl bg-primary p-8 text-primary-foreground md:grid-cols-[1fr_auto] md:items-center md:p-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
            <Pipette className="h-4 w-4" /> Persoonlijk kleuradvies
          </div>
          <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">Twijfel je tussen kleuren? Wij denken mee.</h2>
          <p className="mt-2 max-w-xl text-sm opacity-80">
            Onze kleurspecialisten geven gratis advies op basis van een foto van je ruimte. Binnen 24 uur reactie.
          </p>
        </div>
        <Link to="/verfmengservice" className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent-strong">
          Vraag advies aan
        </Link>
      </section>
    </PageLayout>
  );
}
