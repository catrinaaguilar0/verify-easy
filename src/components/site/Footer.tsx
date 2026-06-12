import { Link } from "@tanstack/react-router";
import { Check, Palette, Headphones, ShieldCheck, Phone, Mail } from "lucide-react";

const services = [
  { icon: Check, title: "Gratis verzending", sub: "vanaf €50" },
  { icon: Palette, title: "Kleur op maat", sub: "gemaakt" },
  { icon: Headphones, title: "Deskundig advies", sub: "van specialisten" },
  { icon: ShieldCheck, title: "Veilig betalen", sub: "zoals jij wilt" },
];

type FooterLink = { label: string; to?: string; params?: Record<string, string> };

const columns: { h: string; links: FooterLink[] }[] = [
  {
    h: "Klantenservice",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Veelgestelde vragen", to: "/faq" },
      { label: "Verzending & retour", to: "/verzending-en-retour" },
      { label: "Mijn account", to: "/account" },
      { label: "Verlanglijst", to: "/verlanglijst" },
    ],
  },
  {
    h: "Over VerfOnlineWinkel",
    links: [
      { label: "Over ons", to: "/over-ons" },
      { label: "Demonstraties", to: "/demonstraties" },
      { label: "Blog", to: "/blog" },
      { label: "Algemene voorwaarden", to: "/algemene-voorwaarden" },
      { label: "Privacy", to: "/privacy" },
    ],
  },
  {
    h: "Merken",
    links: [
      { label: "Sikkens", to: "/merk/$slug", params: { slug: "sikkens" } },
      { label: "Sigma", to: "/merk/$slug", params: { slug: "sigma" } },
      { label: "Wijzonol", to: "/merk/$slug", params: { slug: "wijzonol" } },
      { label: "Flexa", to: "/merk/$slug", params: { slug: "flexa" } },
      { label: "Histor", to: "/merk/$slug", params: { slug: "histor" } },
    ],
  },
  {
    h: "Inspiratie",
    links: [
      { label: "Kleuradvies", to: "/kleuradvies" },
      { label: "RAL kleurenwaaier", to: "/ral" },
      { label: "Verfcalculator", to: "/verfcalculator" },
      { label: "Verfmengservice", to: "/verfmengservice" },
      { label: "Hulp & advies", to: "/hulp-en-advies" },
    ],
  },
];

export function Footer() {
  return (
    <footer>
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto grid gap-6 px-4 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3">
              <Icon className="h-6 w-6 text-accent" />
              <div className="text-sm">
                <div className="font-semibold">{title}</div>
                <div className="opacity-70">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-border bg-background">
        <div className="container mx-auto grid gap-8 px-4 py-10 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-bold text-ink">Altijd als eerste op de hoogte?</h3>
            <p className="mt-1 text-sm text-ink-soft">Ontvang verftips, inspiratie en exclusieve aanbiedingen.</p>
            <form className="mt-4 flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="E-mailadres"
                className="h-11 flex-1 rounded-md border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <button className="h-11 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-dark">
                AANMELDEN
              </button>
            </form>
          </div>
          <div className="md:justify-self-end">
            <h3 className="text-lg font-bold text-ink">Klantenservice</h3>
            <p className="mt-1 text-sm text-ink-soft">Wij helpen je graag verder. Bereik ons via telefoon of e-mail.</p>
            <div className="mt-4 flex flex-col gap-2">
              <a href="tel:+31201234567" className="inline-flex items-center gap-3 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent">
                <Phone className="h-4 w-4 text-accent" /> 020 - 123 45 67
              </a>
              <a href="mailto:advies@verfonlinewinkel.nl" className="inline-flex items-center gap-3 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent">
                <Mail className="h-4 w-4 text-accent" /> advies@verfonlinewinkel.nl
              </a>
            </div>
            <p className="mt-3 text-xs text-ink-soft">Ma-vr 08:00-18:00 · Za 09:00-17:00</p>
          </div>
        </div>
      </div>

      <div className="bg-surface">
        <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
          {columns.map((c) => (
            <div key={c.h}>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">{c.h}</h4>
              <ul className="space-y-2 text-sm text-ink-soft">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link to={l.to} params={l.params as never} className="hover:text-accent">
                        {l.label}
                      </Link>
                    ) : (
                      <span>{l.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-5 text-xs text-ink-soft">
            <span>© {new Date().getFullYear()} VerfOnlineWinkel.nl — Alle rechten voorbehouden</span>
            <span>KvK 12345678 · BTW NL000000000B01</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
