import { createFileRoute } from "@tanstack/react-router";
import { Users, Truck, Palette, Award } from "lucide-react";
import { PageLayout } from "@/components/site/PageLayout";

const SITE_URL = "https://cozy-check-hub.lovable.app";

export const Route = createFileRoute("/over-ons")({
  head: () => ({
    meta: [
      { title: "Over ons | VerfOnlineWinkel" },
      { name: "description", content: "Al meer dan 25 jaar dé online specialist in professionele verf voor vakman en doe-het-zelver." },
      { property: "og:title", content: "Over ons | VerfOnlineWinkel" },
      { property: "og:description", content: "Onze missie, ons verhaal en het team achter VerfOnlineWinkel." },
      { property: "og:url", content: `${SITE_URL}/over-ons` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/over-ons` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageLayout
      title="Over VerfOnlineWinkel"
      intro="Sinds 1999 helpen we vakschilders en doe-het-zelvers aan de juiste verf, eerlijk advies en topservice. Niet de grootste — wél de beste in service."
      breadcrumb={[{ label: "Over ons" }]}
    >
      <section className="grid gap-6 md:grid-cols-4">
        {[
          { icon: Users, value: "150.000+", label: "Tevreden klanten" },
          { icon: Truck, value: "< 24u", label: "Gemiddelde levertijd" },
          { icon: Palette, value: "2.000+", label: "Mengbare kleuren" },
          { icon: Award, value: "9.4", label: "Klantbeoordeling" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)]">
            <s.icon className="mx-auto h-6 w-6 text-accent" />
            <div className="mt-3 text-3xl font-extrabold text-ink">{s.value}</div>
            <div className="text-xs uppercase tracking-wider text-ink-soft">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-extrabold text-ink">Ons verhaal</h2>
          <p className="mt-4 text-sm text-ink-soft">
            VerfOnlineWinkel begon in 1999 als een kleine winkel in Amsterdam-Noord. Geen showroom met flashy displays, maar
            een team van mensen die écht alles weten over verf. Klanten kwamen voor advies, en bleven voor de service.
          </p>
          <p className="mt-3 text-sm text-ink-soft">
            Toen het internet groeide, groeiden wij mee. Vandaag bedienen we duizenden vakschilders en particulieren door
            heel Nederland en België. Onze missie bleef hetzelfde: de juiste verf, eerlijk advies en altijd snel in huis.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-ink">Waar we voor staan</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink">
            {[
              { h: "Eerlijk advies", b: "We adviseren wat écht werkt, niet wat de hoogste marge oplevert." },
              { h: "Topkwaliteit", b: "Alleen A-merken zoals Sikkens, Sigma, Wijzonol, Flexa en Histor." },
              { h: "Service als vroeger", b: "Bel ons gewoon op. Een vakman aan de lijn binnen 1 minuut." },
              { h: "Duurzaam waar het kan", b: "We promoten verf op waterbasis en CO₂-gecompenseerde levering." },
            ].map((v) => (
              <li key={v.h} className="rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-card)]">
                <div className="font-semibold text-ink">{v.h}</div>
                <div className="mt-1 text-ink-soft">{v.b}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
