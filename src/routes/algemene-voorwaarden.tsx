import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/site/PageLayout";

const SITE_URL = "https://cozy-check-hub.lovable.app";

export const Route = createFileRoute("/algemene-voorwaarden")({
  head: () => ({
    meta: [
      { title: "Algemene voorwaarden | Nieuweverf" },
      { name: "description", content: "Algemene voorwaarden van Nieuweverf.nl voor bestellingen en levering." },
      { property: "og:title", content: "Algemene voorwaarden | Nieuweverf" },
      { property: "og:url", content: `${SITE_URL}/algemene-voorwaarden` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/algemene-voorwaarden` }],
  }),
  component: TermsPage,
});

const SECTIONS = [
  { h: "1. Algemeen", p: "Deze voorwaarden gelden voor elke aanbieding, bestelling en overeenkomst tussen Nieuweverf.nl en de klant. Door een bestelling te plaatsen ga je akkoord met deze voorwaarden." },
  { h: "2. Prijzen en betaling", p: "Alle prijzen zijn inclusief 21% btw en exclusief verzendkosten, tenzij anders vermeld. Betaling vindt plaats via de aangeboden betaalmethodes (iDEAL, Bancontact, creditcard, PayPal, achteraf via Klarna)." },
  { h: "3. Levering", p: "Voor 23:00 op werkdagen besteld, in de meeste gevallen de volgende werkdag in huis. Levertijden zijn indicatief; overschrijding geeft geen recht op schadevergoeding." },
  { h: "4. Herroepingsrecht", p: "Je hebt 14 dagen bedenktijd na ontvangst. Op kleur gemengde verf en geopende producten zijn uitgesloten van retour. Retourkosten zijn voor de klant, tenzij het product defect is." },
  { h: "5. Garantie en aansprakelijkheid", p: "Wij staan in voor de fabrieksgarantie op alle producten. Onze aansprakelijkheid is beperkt tot het factuurbedrag van de bestelling." },
  { h: "6. Privacy", p: "We behandelen je gegevens conform de AVG. Zie ons privacybeleid voor meer informatie." },
  { h: "7. Toepasselijk recht", p: "Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Amsterdam." },
];

function TermsPage() {
  return (
    <PageLayout
      title="Algemene voorwaarden"
      intro="Laatst bijgewerkt: juni 2026. Lees deze voorwaarden zorgvuldig door voordat je een bestelling plaatst."
      breadcrumb={[{ label: "Algemene voorwaarden" }]}
    >
      <article className="prose-vow space-y-6 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2 className="text-lg font-bold text-ink">{s.h}</h2>
            <p className="mt-2 text-sm text-ink-soft">{s.p}</p>
          </section>
        ))}
      </article>
    </PageLayout>
  );
}
