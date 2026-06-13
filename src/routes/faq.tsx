import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { PageLayout } from "@/components/site/PageLayout";

const SITE_URL = "https://cozy-check-hub.lovable.app";

const FAQS = [
  {
    cat: "Bestellen",
    items: [
      { q: "Wanneer wordt mijn bestelling geleverd?", a: "Voor 23:00 op werkdagen besteld, in de meeste gevallen de volgende werkdag in huis. Voor België en buitengebieden geldt 2 werkdagen." },
      { q: "Kan ik mijn bestelling wijzigen of annuleren?", a: "Zolang je bestelling nog niet is verzonden, kan dat. Bel of mail ons zo snel mogelijk." },
      { q: "Hoe weet ik wanneer mijn bestelling onderweg is?", a: "Je ontvangt een trackingnummer per e-mail zodra de bestelling onze loods verlaat." },
    ],
  },
  {
    cat: "Kleur & advies",
    items: [
      { q: "Kunnen jullie een kleur op maat mengen?", a: "Ja. We mengen elke RAL-, NCS- of merkkleur in het door jou gekozen product. Bestel via de verfmengservice op de productpagina." },
      { q: "Krijg ik gratis kleuradvies?", a: "Ja, stuur ons een foto van je ruimte met je vraag en we reageren binnen 24 uur." },
      { q: "Hoe weet ik hoeveel verf ik nodig heb?", a: "Gebruik onze verfcalculator. Reken op gemiddeld 10-12 m² per liter, afhankelijk van het product en de ondergrond." },
    ],
  },
  {
    cat: "Retour & garantie",
    items: [
      { q: "Kan ik op kleur gemengde verf retourneren?", a: "Op maat gemengde verf is helaas uitgesloten van retour, omdat deze speciaal voor jou is gemaakt." },
      { q: "Wat als mijn bestelling beschadigd aankomt?", a: "Neem direct contact op (binnen 48 uur). Wij sturen kosteloos een vervangend product." },
      { q: "Hoe lang heb ik bedenktijd?", a: "14 dagen vanaf de dag van ontvangst, mits het product ongeopend en in originele verpakking is." },
    ],
  },
  {
    cat: "Account & betalen",
    items: [
      { q: "Welke betaalmethodes accepteren jullie?", a: "iDEAL, Bancontact, creditcard, PayPal en achteraf betalen via Klarna." },
      { q: "Heb ik een account nodig om te bestellen?", a: "Nee, je kunt ook afrekenen als gast. Een account is wel handig voor het volgen van je bestellingen." },
    ],
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Veelgestelde vragen | Nieuweverf" },
      { name: "description", content: "Antwoorden op vragen over bestellen, levering, kleur op maat en retourneren." },
      { property: "og:title", content: "Veelgestelde vragen | Nieuweverf" },
      { property: "og:url", content: `${SITE_URL}/faq` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.flatMap((g) =>
            g.items.map((it) => ({
              "@type": "Question",
              name: it.q,
              acceptedAnswer: { "@type": "Answer", text: it.a },
            })),
          ),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <PageLayout
      title="Veelgestelde vragen"
      intro="Antwoord op de meeste vragen over bestellen, levertijden, kleur op maat en retourneren. Staat je vraag er niet bij? Neem gerust contact op."
      breadcrumb={[{ label: "FAQ" }]}
    >
      <div className="space-y-8">
        {FAQS.map((group) => (
          <section key={group.cat}>
            <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
              <HelpCircle className="h-4 w-4 text-accent" /> {group.cat}
            </h2>
            <div className="mt-3 space-y-2">
              {group.items.map((it, i) => (
                <FaqItem key={it.q} q={it.q} a={it.a} defaultOpen={i === 0} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-ink hover:bg-surface"
      >
        <span>{q}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="border-t border-border px-5 py-4 text-sm text-ink-soft">{a}</div>}
    </div>
  );
}
