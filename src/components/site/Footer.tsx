export function Footer() {
  const cols = [
    { title: "Klantenservice", items: ["Contact", "Verzending & levering", "Retourneren", "Veelgestelde vragen", "Kleurgarantie"] },
    { title: "Over OnlineVerf", title2: "", items: ["Over ons", "Servicepunten", "Vacatures", "Zakelijk", "Blog"] },
    { title: "Merken", items: ["Sigma", "Sikkens", "Wijzonol", "Jotun", "Flexa"] },
    { title: "Inspiratie", items: ["Kluswijzer", "Kleurenwaaier", "Verftips", "Trends 2026"] },
  ];
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="container mx-auto grid grid-cols-2 gap-10 px-4 py-14 md:grid-cols-4">
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">{c.title}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/85">
              {c.items.map((i) => (
                <li key={i}><a href="#" className="hover:text-white hover:underline">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/15">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-primary-foreground/75">
          <span>© {new Date().getFullYear()} OnlineVerf.nl — Alle rechten voorbehouden.</span>
          <span>KvK 12345678 · BTW NL000000000B00</span>
        </div>
      </div>
    </footer>
  );
}
