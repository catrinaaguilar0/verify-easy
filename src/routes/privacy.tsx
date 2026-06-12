import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/site/PageLayout";

const SITE_URL = "https://cozy-check-hub.lovable.app";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacybeleid | VerfOnlineWinkel" },
      { name: "description", content: "Hoe wij omgaan met jouw persoonsgegevens, in lijn met de AVG." },
      { property: "og:title", content: "Privacybeleid | VerfOnlineWinkel" },
      { property: "og:url", content: `${SITE_URL}/privacy` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  { h: "Welke gegevens verzamelen we?", p: "Naam, adres, e-mail, telefoonnummer, bestelgeschiedenis en betaalgegevens — alleen wat nodig is om je bestelling uit te voeren en je een goede service te bieden." },
  { h: "Waarom verwerken we deze gegevens?", p: "Voor het verwerken van bestellingen, klantenservice, fraudepreventie en — indien je hiervoor toestemming geeft — voor het versturen van onze nieuwsbrief." },
  { h: "Hoe lang bewaren we gegevens?", p: "We bewaren je gegevens zo lang als nodig voor het doel waarvoor we ze verzamelden en voor wettelijke bewaartermijnen (zoals 7 jaar voor financiële administratie)." },
  { h: "Met wie delen we gegevens?", p: "Met onze logistieke partners (PostNL, DPD), betaaldienstverleners (Mollie, Stripe) en hostingpartners — uitsluitend om jouw bestelling mogelijk te maken." },
  { h: "Cookies", p: "Wij gebruiken functionele cookies (winkelwagen, login) en — met jouw toestemming — analytische en marketingcookies. Je kunt cookies altijd weigeren via je browser." },
  { h: "Jouw rechten", p: "Je hebt recht op inzage, correctie, verwijdering en bezwaar. Stuur een e-mail naar privacy@verfonlinewinkel.nl en we reageren binnen 14 dagen." },
];

function PrivacyPage() {
  return (
    <PageLayout
      title="Privacybeleid"
      intro="Jouw privacy is belangrijk voor ons. Hieronder leggen we uit hoe we met jouw gegevens omgaan."
      breadcrumb={[{ label: "Privacy" }]}
    >
      <article className="space-y-6 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
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
