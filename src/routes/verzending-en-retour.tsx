import { createFileRoute } from "@tanstack/react-router";
import { Truck, RotateCcw, ShieldCheck, Package } from "lucide-react";
import { PageLayout } from "@/components/site/PageLayout";

const SITE_URL = "https://cozy-check-hub.lovable.app";

export const Route = createFileRoute("/verzending-en-retour")({
  head: () => ({
    meta: [
      { title: "Verzending & retour | Nieuweverf" },
      { name: "description", content: "Alles over levertijden, verzendkosten en retourneren. Voor 23:00 besteld, morgen in huis." },
      { property: "og:title", content: "Verzending & retour | Nieuweverf" },
      { property: "og:description", content: "Snel geleverd, 14 dagen retourrecht." },
      { property: "og:url", content: `${SITE_URL}/verzending-en-retour` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/verzending-en-retour` }],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <PageLayout
      title="Verzending & retour"
      intro="Snel, veilig en flexibel. Hieronder alles wat je moet weten over levering, verzendkosten en retourneren."
      breadcrumb={[{ label: "Verzending & retour" }]}
    >
      <section className="grid gap-6 md:grid-cols-2">
        <Card icon={Truck} title="Verzendmethodes">
          <table className="mt-2 w-full text-sm">
            <tbody className="divide-y divide-border">
              <tr><td className="py-2 text-ink">Standaard NL — voor 23:00 besteld, morgen in huis</td><td className="py-2 text-right font-semibold text-ink">€5,95</td></tr>
              <tr><td className="py-2 text-ink">Avondbezorging NL (18:00 - 22:00)</td><td className="py-2 text-right font-semibold text-ink">€6,95</td></tr>
              <tr><td className="py-2 text-ink">België — 2 werkdagen</td><td className="py-2 text-right font-semibold text-ink">€8,95</td></tr>
              <tr><td className="py-2 text-ink">Afhalen Amsterdam — klaar binnen 2 uur</td><td className="py-2 text-right font-semibold text-accent">Gratis</td></tr>
            </tbody>
          </table>
          <p className="mt-3 text-xs text-ink-soft">Gratis verzending in NL vanaf €50. Pallets en bestellingen &gt;30 kg op afspraak.</p>
        </Card>
        <Card icon={RotateCcw} title="14 dagen retourrecht">
          <p>Niet tevreden? Geen probleem. Je hebt 14 dagen bedenktijd om je bestelling te retourneren — ongeopend en in originele verpakking.</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-soft">
            <li>Op kleur gemengde verf is uitgesloten van retour.</li>
            <li>Retourkosten zijn voor eigen rekening, tenzij het product defect was.</li>
            <li>Terugbetaling binnen 5 werkdagen na ontvangst.</li>
          </ul>
        </Card>
        <Card icon={Package} title="Trackingnummer">
          Je ontvangt een trackingnummer per e-mail zodra je bestelling onderweg is. Volg je pakket via PostNL of DPD.
        </Card>
        <Card icon={ShieldCheck} title="Veilig verpakt">
          Verfblikken worden verpakt in extra stevige dozen met PE-folie zodat lekken vrijwel onmogelijk is. Mocht er toch
          iets aankomen wat niet klopt, neem direct contact op en we sturen kosteloos opnieuw.
        </Card>
      </section>
    </PageLayout>
  );
}

function Card({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold text-ink">{title}</h2>
      </div>
      <div className="mt-3 text-sm text-ink-soft">{children}</div>
    </div>
  );
}
