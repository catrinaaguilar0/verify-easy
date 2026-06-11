import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Pipette, Check, Palette, Clock, Sparkles, ShieldCheck, ChevronDown, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import mixHero from "@/assets/mix-hero.jpg";
import mixSwatches from "@/assets/mix-swatches.jpg";

const SITE_URL = "https://cozy-check-hub.lovable.app";

export const Route = createFileRoute("/verfmengservice")({
  head: () => ({
    meta: [
      { title: "Verfmengservice — laat jouw kleur op maat mengen | VerfOnlineWinkel" },
      { name: "description", content: "Onze verfmengservice mengt iedere kleur op maat uit RAL, NCS, Sikkens, Flexa, Histor, Farrow & Ball en meer. Snel, exact en in elke verfsoort." },
      { property: "og:title", content: "Verfmengservice — kleur op maat | VerfOnlineWinkel" },
      { property: "og:description", content: "Iedere kleur, iedere verfsoort. Op maat gemengd door onze kleurspecialisten." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/verfmengservice` },
      { property: "og:image", content: `${SITE_URL}${mixHero}` },
      { name: "twitter:title", content: "Verfmengservice | VerfOnlineWinkel" },
      { name: "twitter:description", content: "Iedere kleur, op maat gemengd." },
      { name: "twitter:image", content: `${SITE_URL}${mixHero}` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/verfmengservice` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Verfmengservice",
          provider: { "@type": "Organization", name: "VerfOnlineWinkel", url: SITE_URL },
          areaServed: "NL",
          serviceType: "Kleur op maat mengen",
          description: "Iedere kleur uit RAL, NCS, Sikkens, Flexa, Histor en Farrow & Ball, op maat gemengd in elke verfsoort.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Verfmengservice", item: `${SITE_URL}/verfmengservice` },
          ],
        }),
      },
    ],
  }),
  component: VerfmengservicePage,
});


const collections = [
  { name: "RAL Classic", count: 213 },
  { name: "RAL Design", count: 1825 },
  { name: "NCS", count: 1950 },
  { name: "Sikkens 5051", count: 2071 },
  { name: "Flexa Creations", count: 1200 },
  { name: "Histor Symphony", count: 980 },
  { name: "Farrow & Ball", count: 132 },
  { name: "Pure & Original", count: 270 },
];

const steps = [
  { icon: Palette, title: "1. Kies je kleur", text: "Pak een kleurcode uit RAL, NCS of een merkenwaaier — of stuur ons een staal of foto voor een kleuradvies op maat." },
  { icon: Pipette, title: "2. Wij mengen exact", text: "Onze gecertificeerde colorist meet en mengt jouw kleur met een spectrofotometer voor een afwijking van minder dan ΔE 1." },
  { icon: ShieldCheck, title: "3. Controle & garantie", text: "Iedere blik krijgt een controlestaal en kleurlabel. Niet 100% tevreden? Wij mengen kosteloos opnieuw." },
  { icon: Clock, title: "4. Snel in huis", text: "Voor 15:00 besteld? Vandaag gemengd en morgen bij je thuisbezorgd — of haal het op in onze winkel." },
];

const faqs = [
  { q: "Welke verfsoorten kunnen jullie mengen?", a: "Vrijwel alles: muurverf (mat, zijdemat, satin), lakverf op water- en terpentinebasis, beits, primers, betonverf en buitenverf. Geef bij je bestelling de gewenste afwerking en het merk door." },
  { q: "Is een gemengde kleur exact gelijk aan de waaier?", a: "Wij mengen met een spectrofotometer en werken binnen een tolerantie van ΔE 1 — voor het menselijk oog niet van origineel te onderscheiden. Pigment- en ondergrondverschillen kunnen minimale nuances geven." },
  { q: "Kan ik een eigen kleur laten namengen?", a: "Ja. Stuur een verfstaal van minimaal 3×3 cm op, of breng het langs in de winkel. Foto's gebruiken we als referentie, maar geven nooit een exact resultaat." },
  { q: "Hoeveel kost de verfmengservice?", a: "Het mengen zelf is gratis vanaf 1 liter. Je betaalt alleen de gekozen verf. Speciale collecties (Farrow & Ball, Pure & Original) hebben een meerprijs van €2,50 per liter." },
  { q: "Kan ik gemengde verf retourneren?", a: "Op maat gemengde verf is een maatwerkproduct en kunnen we niet terugnemen. Twijfel je over de kleur? Bestel eerst een testpotje van 100 ml." },
];

const blogPreview = [
  { slug: "kleurtrends-2026", title: "De kleurtrends van 2026", excerpt: "Warme aardetinten, diep oceaanblauw en zachte salie domineren het komende seizoen." },
  { slug: "muurverf-kiezen", title: "Welke muurverf past bij jouw kamer?", excerpt: "Mat, zijdemat of satin? Een praktische gids voor woonkamer, slaapkamer en badkamer." },
];

function VerfmengservicePage() {
  const [hex, setHex] = useState("#5B7C99");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-2 md:items-center md:py-16">
            <div>
              <nav className="text-xs text-ink-soft">
                <Link to="/" className="hover:text-accent">Home</Link>
                <span className="mx-1">/</span>
                <span>Service</span>
                <span className="mx-1">/</span>
                <span className="text-ink">Verfmengservice</span>
              </nav>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                <Sparkles className="h-3.5 w-3.5" /> Kleur op maat
              </div>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight text-ink md:text-5xl">
                Verfmengservice — <span className="text-accent">iedere kleur</span>, in elke verfsoort
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Meer dan 250.000 kleuren mengbaar uit RAL, NCS, Sikkens, Flexa, Histor, Farrow &amp; Ball en honderden andere collecties. Onze coloristen mengen jouw kleur exact — voor 15:00 besteld is morgen in huis.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#mengen" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90">
                  Start kleur kiezen <ArrowRight className="h-4 w-4" />
                </a>
                <Link to="/muurverf" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-ink hover:border-accent">
                  Bekijk muurverf
                </Link>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-ink">
                {["Spectrofotometrisch gemeten", "ΔE &lt; 1 nauwkeurig", "Gratis vanaf 1 liter", "100% kleurgarantie"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /><span dangerouslySetInnerHTML={{ __html: t }} /></li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img src={mixHero} alt="Verfmengmachine met op maat gemengde kleur" width={1024} height={1024} className="aspect-square w-full rounded-2xl object-cover shadow-[var(--shadow-card)]" />
              <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] md:block">
                <div className="text-[10px] uppercase tracking-wider text-ink-soft">Vandaag gemengd</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="h-8 w-8 rounded-md" style={{ background: "#A8B89A" }} />
                  <span className="h-8 w-8 rounded-md" style={{ background: "#2E4756" }} />
                  <span className="h-8 w-8 rounded-md" style={{ background: "#B8674A" }} />
                  <span className="h-8 w-8 rounded-md" style={{ background: "#E7D9BE" }} />
                </div>
                <div className="mt-2 text-xs font-semibold text-ink">1.842 kleuren deze maand</div>
              </div>
            </div>
          </div>
        </section>

        {/* USP */}
        <section className="border-b border-border bg-surface">
          <div className="container mx-auto grid gap-6 px-4 py-10 md:grid-cols-4">
            {[
              { n: "250.000+", l: "Kleuren mengbaar" },
              { n: "ΔE < 1", l: "Kleurnauwkeurigheid" },
              { n: "< 10 min", l: "Mengtijd per blik" },
              { n: "30+ jaar", l: "Ervaring in kleur" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-border bg-card p-5 text-center">
                <div className="text-3xl font-extrabold text-ink">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-ink-soft">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-ink">Zo werkt onze verfmengservice</h2>
            <p className="mt-3 text-sm text-ink-soft">Van kleurcode tot kant-en-klaar blik in vier stappen.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <article key={s.title} className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Mengen / color picker */}
        <section id="mengen" className="border-y border-border bg-surface">
          <div className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-[1fr,1.1fr] md:items-center">
            <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
              <div className="aspect-[4/3] w-full transition-colors" style={{ background: hex }} />
              <div className="flex items-center justify-between border-t border-border bg-card px-5 py-3 text-xs">
                <span className="font-semibold text-ink">Live preview</span>
                <span className="text-ink-soft">{hex.toUpperCase()}</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-accent">Probeer het direct</div>
              <h2 className="mt-2 text-3xl font-extrabold text-ink">Kies jouw kleur</h2>
              <p className="mt-3 text-sm text-ink-soft">
                Heb je al een kleurcode? Vul hem hieronder in. Geen idee? Speel met de kleurkiezer of vraag een gratis kleuradvies aan.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
                <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="h-12 w-16 cursor-pointer rounded border border-border bg-background" />
                <input value={hex.toUpperCase()} onChange={(e) => setHex(e.target.value)} className="w-32 rounded border border-border bg-background px-3 py-2 text-sm" />
                <input placeholder="of RAL/NCS code (bv. RAL 7016)" className="flex-1 min-w-[200px] rounded border border-border bg-background px-3 py-2 text-sm" />
                <button className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90">
                  Laat mengen
                </button>
              </div>

              <div className="mt-8">
                <div className="mb-3 text-sm font-semibold text-ink">Populaire collecties</div>
                <div className="flex flex-wrap gap-2">
                  {collections.map((c) => (
                    <button key={c.name} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-ink hover:border-accent">
                      {c.name} <span className="text-ink-soft">({c.count})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collections strip */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-ink">Alle topcollecties beschikbaar</h2>
              <p className="mt-2 text-sm text-ink-soft">Van industriële RAL-tinten tot de zachtste Farrow &amp; Ball nuances.</p>
            </div>
            <img src={mixSwatches} alt="Kleurenwaaier met palet" width={1024} height={1024} loading="lazy" className="hidden h-40 w-64 rounded-xl object-cover md:block" />
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {collections.map((c) => (
              <a key={c.name} href="#" className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition hover:border-accent">
                <div>
                  <div className="text-sm font-semibold text-ink">{c.name}</div>
                  <div className="text-xs text-ink-soft">{c.count} kleuren</div>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-soft transition group-hover:translate-x-1 group-hover:text-accent" />
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-y border-border bg-surface">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[1fr,1.5fr]">
            <div>
              <h2 className="text-3xl font-extrabold text-ink">Veelgestelde vragen</h2>
              <p className="mt-3 text-sm text-ink-soft">Alles wat je moet weten over onze verfmengservice. Andere vraag? Onze kleurspecialisten helpen je graag.</p>
              <a href="#" className="mt-4 inline-block text-sm font-semibold text-accent hover:underline">Neem contact op →</a>
            </div>
            <div className="space-y-3">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q} className="rounded-xl border border-border bg-card">
                    <button onClick={() => setOpenFaq(open ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                      <span className="text-sm font-semibold text-ink">{f.q}</span>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-ink-soft transition ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && <div className="border-t border-border px-5 py-4 text-sm text-ink-soft">{f.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Blog preview */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-extrabold text-ink">Inspiratie uit ons blog</h2>
            <Link to="/blog" className="text-sm font-semibold text-accent hover:underline">Alle artikelen →</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {blogPreview.map((b) => (
              <Link key={b.slug} to="/blog/$slug" params={{ slug: b.slug }} className="group rounded-xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent">
                <div className="text-xs uppercase tracking-wider text-accent">Blog</div>
                <h3 className="mt-2 text-lg font-bold text-ink group-hover:text-accent">{b.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{b.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
