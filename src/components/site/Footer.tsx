import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { basicRalColors } from "@/lib/ral";

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

function PayBadge({ label, bg, text }: { label: string; bg: string; text: string }) {
  return (
    <span
      className="inline-flex h-5 items-center rounded px-1.5 text-[9px] font-extrabold uppercase tracking-wider"
      style={{ backgroundColor: bg, color: text }}
    >
      {label}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container mx-auto grid gap-8 px-4 py-8 md:grid-cols-2 lg:grid-cols-5">
        {columns.map((c) => (
          <div key={c.h}>
            <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wide">{c.h}</h4>
            <ul className="space-y-1 text-sm text-white/80">
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
          <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wide">RAL-kleuren</h4>
          <div className="grid grid-cols-2 gap-1">
            {basicRalColors.map((c) => (
              <Link
                key={c.code}
                to="/ral/$code"
                params={{ code: c.code }}
                className="flex h-8 items-center justify-center rounded-sm text-xs font-bold text-white transition hover:opacity-90"
                style={{
                  backgroundColor: c.hex,
                  textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                }}
                title={`RAL ${c.code} ${c.name}`}
                aria-label={`Bekijk RAL ${c.code}`}
              >
                RAL {c.code}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-xs text-white/70">
          <span>&copy; {new Date().getFullYear()} VerfOnlineWinkel.nl</span>

          <div className="flex flex-wrap items-center gap-2">
            <PayBadge label="iDEAL" bg="#FF6B00" text="#fff" />
            <PayBadge label="Klarna" bg="#FFB3C7" text="#0A0B09" />
            <PayBadge label="VISA" bg="#1A1F71" text="#fff" />
            <PayBadge label="Master" bg="#EB001B" text="#fff" />
            <PayBadge label="Pay" bg="#000" text="#fff" />
          </div>

          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="text-white/60 hover:text-cta">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="text-white/60 hover:text-cta">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="text-white/60 hover:text-cta">
              <Youtube className="h-4 w-4" />
            </a>
            <span className="ml-2 text-white/50">KvK 12345678 &middot; BTW NL000000000B01</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
