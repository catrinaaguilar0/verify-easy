import { Check, Palette, Headphones, ShieldCheck } from "lucide-react";

const services = [
  { icon: Check, title: "Gratis verzending", sub: "vanaf €50" },
  { icon: Palette, title: "Kleur op maat", sub: "gemaakt" },
  { icon: Headphones, title: "Deskundig advies", sub: "van specialisten" },
  { icon: ShieldCheck, title: "Veilig betalen", sub: "zoals jij wilt" },
];

export function Footer() {
  return (
    <footer>
      {/* service strip */}
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

      {/* newsletter + rating */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto grid gap-8 px-4 py-10 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-bold text-ink">Altijd als eerste op de hoogte?</h3>
            <p className="mt-1 text-sm text-ink-soft">Ontvang verftips, inspiratie en exclusieve aanbiedingen.</p>
            <form className="mt-4 flex max-w-md gap-2">
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
          <div className="flex items-center gap-4 md:justify-end">
            <div>
              <div className="text-sm font-semibold text-ink">Klanten beoordelen ons met een 9,4/10</div>
              <div className="mt-1 flex items-center gap-1 text-rating">
                {"★★★★★".split("").map((s, i) => (<span key={i}>{s}</span>))}
                <span className="ml-2 text-xs text-ink-soft">Gebaseerd op 2.345 reviews</span>
              </div>
            </div>
            <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-rating font-bold text-ink">
              9.4
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface">
        <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
          {[
            { h: "Klantenservice", links: ["Contact", "Veelgestelde vragen", "Verzending", "Retourneren", "Betalen"] },
            { h: "Over VerfOnlineWinkel", links: ["Over ons", "Vestigingen", "Werken bij", "Nieuws", "Algemene voorwaarden"] },
            { h: "Merken", links: ["Sikkens", "Sigma", "Wijzonol", "Flexa", "Histor"] },
            { h: "Inspiratie", links: ["Kleurinspiratie", "Verftips", "Kleuradvies", "Lookbook", "Blog"] },
          ].map((c) => (
            <div key={c.h}>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">{c.h}</h4>
              <ul className="space-y-2 text-sm text-ink-soft">
                {c.links.map((l) => (<li key={l}><a href="#" className="hover:text-accent">{l}</a></li>))}
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
