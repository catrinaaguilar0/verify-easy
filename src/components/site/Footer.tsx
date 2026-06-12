import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";

type FooterLink = { label: string; to?: string; params?: Record<string, string> };

const columns: { h: string; links: FooterLink[] }[] = [
  {
    h: "Klantenservice",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Veelgestelde vragen", to: "/faq" },
      { label: "Verzending", to: "/verzending-en-retour" },
      { label: "Retourneren", to: "/verzending-en-retour" },
      { label: "Betalen", to: "/verzending-en-retour" },
    ],
  },
  {
    h: "Advies & inspiratie",
    links: [
      { label: "Verfkeuze", to: "/kleuradvies" },
      { label: "Kleuradvies", to: "/kleuradvies" },
      { label: "Kluswijzer", to: "/hulp-en-advies" },
      { label: "Blogs & inspiratie", to: "/blog" },
      { label: "Video's", to: "/demonstraties" },
    ],
  },
  {
    h: "Over VerfOnlineWinkel",
    links: [
      { label: "Over ons", to: "/over-ons" },
      { label: "Zakelijk bestellen", to: "/contact" },
      { label: "Onze winkels", to: "/contact" },
      { label: "Vacatures", to: "/over-ons" },
      { label: "Algemene voorwaarden", to: "/algemene-voorwaarden" },
    ],
  },
  {
    h: "Merken",
    links: [
      { label: "Sikkens", to: "/merk/$slug", params: { slug: "sikkens" } },
      { label: "Sigma Coatings", to: "/merk/$slug", params: { slug: "sigma" } },
      { label: "Wijzonol", to: "/merk/$slug", params: { slug: "wijzonol" } },
      { label: "Flexa", to: "/merk/$slug", params: { slug: "flexa" } },
      { label: "Alle merken", to: "/merk/$slug", params: { slug: "histor" } },
    ],
  },
];

function PayBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex h-7 min-w-[44px] items-center justify-center rounded bg-white px-2 text-[10px] font-extrabold uppercase tracking-wider text-navy">
      {label}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-6">
        {columns.map((c) => (
          <div key={c.h}>
            <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wide">{c.h}</h4>
            <ul className="space-y-2 text-sm text-white/80">
              {c.links.map((l) => (
                <li key={l.label}>
                  {l.to ? (
                    <Link to={l.to} params={l.params as never} className="hover:text-cta">
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

        <div>
          <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wide">Volg ons</h4>
          <div className="flex items-center gap-2">
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy hover:bg-cta hover:text-cta-foreground">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy hover:bg-cta hover:text-cta-foreground">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy hover:bg-cta hover:text-cta-foreground">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wide">Betaal veilig met</h4>
          <div className="flex flex-wrap items-center gap-2">
            <PayBadge label="iDEAL" />
            <PayBadge label="Klarna" />
            <PayBadge label="VISA" />
            <PayBadge label="Master" />
            <PayBadge label="Pay" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-white/70">
          <span>© {new Date().getFullYear()} VerfOnlineWinkel.nl — Alle rechten voorbehouden</span>
          <span>KvK 12345678 · BTW NL000000000B01</span>
        </div>
      </div>
    </footer>
  );
}
