import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Check } from "lucide-react";
import { PageLayout } from "@/components/site/PageLayout";

const SITE_URL = "https://cozy-check-hub.lovable.app";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | VerfOnlineWinkel" },
      { name: "description", content: "Neem contact op voor advies, bestellingen of klantenservice. Bereikbaar via telefoon, mail of formulier." },
      { property: "og:title", content: "Contact | VerfOnlineWinkel" },
      { property: "og:description", content: "Bereik ons via telefoon, e-mail of het contactformulier." },
      { property: "og:url", content: `${SITE_URL}/contact` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageLayout
      title="Contact"
      intro="Vragen over een bestelling, advies nodig of zoek je een specifieke kleur? Onze verfspecialisten staan klaar."
      breadcrumb={[{ label: "Contact" }]}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
        >
          <h2 className="text-lg font-bold text-ink">Stuur ons een bericht</h2>
          {sent ? (
            <div className="rounded-lg border border-accent/30 bg-accent/10 p-6 text-center">
              <Check className="mx-auto h-8 w-8 text-accent" />
              <p className="mt-2 text-sm font-semibold text-ink">Bedankt voor je bericht!</p>
              <p className="text-xs text-ink-soft">We reageren binnen 1 werkdag.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Naam"><input className={inputCls} required /></Field>
                <Field label="E-mail"><input type="email" className={inputCls} required /></Field>
              </div>
              <Field label="Onderwerp">
                <select className={inputCls}>
                  <option>Vraag over een bestelling</option>
                  <option>Productadvies</option>
                  <option>Kleuradvies</option>
                  <option>Retour of klacht</option>
                  <option>Zakelijk / vakman</option>
                  <option>Anders</option>
                </select>
              </Field>
              <Field label="Bericht"><textarea rows={5} className={inputCls} required /></Field>
              <button className="rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent-strong">
                Verstuur bericht
              </button>
            </>
          )}
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Direct contact</h3>
            <a href="tel:+31201234567" className="mt-4 flex items-center gap-3 rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold text-ink hover:border-accent">
              <Phone className="h-4 w-4 text-accent" /> 020 - 123 45 67
            </a>
            <a href="mailto:advies@verfonlinewinkel.nl" className="mt-2 flex items-center gap-3 rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold text-ink hover:border-accent">
              <Mail className="h-4 w-4 text-accent" /> advies@verfonlinewinkel.nl
            </a>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] text-sm text-ink-soft">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-accent" />
              <div>
                <div className="font-semibold text-ink">Bezoekadres</div>
                Verfstraat 12<br />1011 AB Amsterdam<br />Nederland
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-accent" />
              <div>
                <div className="font-semibold text-ink">Openingstijden</div>
                Ma-vr 08:00 - 18:00<br />Za 09:00 - 17:00<br />Zo gesloten
              </div>
            </div>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}
