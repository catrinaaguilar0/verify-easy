import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { RoomVisualizer } from "@/components/ral/RoomVisualizer";
import { getRal, ralColors, type RalColor } from "@/lib/ral";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";

const baseUrl = "https://cozy-check-hub.lovable.app";

export const Route = createFileRoute("/ral/$code")({
  loader: ({ params }) => {
    const ral = getRal(params.code);
    if (!ral) throw notFound();
    return { ral };
  },
  head: ({ params, loaderData }) => {
    const ral = loaderData?.ral;
    const url = `${baseUrl}/ral/${params.code}`;
    if (!ral) return { meta: [{ title: "RAL kleur niet gevonden" }] };
    const title = `RAL ${ral.code} ${ral.name} — kleurinfo & toepassing | Nieuweverf`;
    const description = `${ral.description.slice(0, 150)}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: `RAL ${ral.code} ${ral.name}` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: `RAL ${ral.code} ${ral.name}` },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
              { "@type": "ListItem", position: 2, name: "RAL kleuren", item: `${baseUrl}/ral` },
              { "@type": "ListItem", position: 3, name: `RAL ${ral.code} ${ral.name}`, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-ink">RAL kleur niet gevonden</h1>
        <Link to="/ral" className="mt-4 inline-block text-accent hover:underline">
          ← Bekijk alle RAL kleuren
        </Link>
      </main>
      <Footer />
    </div>
  ),
  component: RalDetail,
});

function RalDetail() {
  const { ral } = Route.useLoaderData() as { ral: RalColor };
  const combos = ral.combinesWith.map((c: string) => getRal(c)).filter((x): x is RalColor => Boolean(x));
  const others = ralColors.filter((r: RalColor) => r.code !== ral.code).slice(0, 6);
  const [copied, setCopied] = useState(false);

  const copyHex = async () => {
    await navigator.clipboard.writeText(ral.hex.toUpperCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <header className="border-b border-border bg-surface">
          <div className="container mx-auto px-4 py-10">
            <nav className="text-xs text-ink-soft">
              <Link to="/" className="hover:text-accent">Home</Link>
              <span className="mx-1">/</span>
              <Link to="/ral" className="hover:text-accent">RAL kleuren</Link>
              <span className="mx-1">/</span>
              <span className="text-ink">RAL {ral.code}</span>
            </nav>
            <Link to="/ral" className="mt-4 inline-flex items-center gap-1 text-xs text-ink-soft hover:text-accent">
              <ArrowLeft className="h-3.5 w-3.5" /> Alle RAL kleuren
            </Link>

            <div className="mt-6 grid gap-8 md:grid-cols-[260px_1fr] md:items-center">
              <figure className="m-0">
                <div
                  className="aspect-square w-full rounded-2xl border border-border shadow-[var(--shadow-card)]"
                  style={{ backgroundColor: ral.hex }}
                  role="img"
                  aria-label={`Kleurstaal van RAL ${ral.code} ${ral.name} in ${ral.hex.toUpperCase()}`}
                />
                <figcaption className="sr-only">
                  Zichtbare kleurstaal weergegeven als gekleurd vlak in RAL {ral.code} {ral.name}
                </figcaption>
              </figure>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-accent">
                  RAL {ral.code} · {ral.family}
                </div>
                <h1 className="mt-2 text-4xl font-extrabold leading-tight text-ink md:text-5xl">
                  {ral.name}
                </h1>
                <p className="mt-4 text-base text-ink-soft">{ral.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
                  <button
                    onClick={copyHex}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 font-mono text-ink transition hover:border-accent hover:text-accent"
                    title="Klik om HEX-code te kopiëren"
                    aria-label={`Kopieer CSS-kleurcode ${ral.hex.toUpperCase()} naar klembord`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-600">Gekopieerd</span>
                      </>
                    ) : (
                      <span>HEX {ral.hex.toUpperCase()}</span>
                    )}
                  </button>
                  <span className="text-ink-soft">CSS: <code className="rounded bg-card px-1.5 py-0.5 font-mono text-ink">{ral.hex.toLowerCase()}</code></span>
                  <Link
                    to="/verfmengservice"
                    className="inline-flex items-center gap-1 rounded-md bg-accent px-4 py-1.5 font-semibold text-accent-foreground hover:opacity-90"
                  >
                    Laat RAL {ral.code} mengen →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="container mx-auto max-w-5xl px-4 py-12">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-ink">Toepassing van RAL {ral.code}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-ink-soft">
                {ral.usage.map((u: string) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-ink">Combineert mooi met</h2>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {combos.map((c) => (
                  <Link
                    key={c!.code}
                    to="/ral/$code"
                    params={{ code: c!.code }}
                    className="group rounded-lg border border-border bg-card p-3 transition hover:-translate-y-0.5 hover:border-accent"
                    aria-label={`Bekijk RAL ${c!.code} ${c!.name}`}
                  >
                    <figure className="m-0">
                      <span
                        className="block aspect-square w-full rounded border border-border"
                        style={{ backgroundColor: c!.hex }}
                        role="img"
                        aria-label={`Kleurstaal ${c!.name}: ${c!.hex.toUpperCase()}`}
                      />
                      <figcaption className="sr-only">{c!.name} swatch in {c!.hex.toUpperCase()}</figcaption>
                    </figure>
                    <span className="mt-2 block text-[10px] font-semibold uppercase tracking-wider text-accent">
                      RAL {c!.code}
                    </span>
                    <span className="block text-xs font-bold text-ink group-hover:text-accent">
                      {c!.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <RoomVisualizer hex={ral.hex} code={ral.code} name={ral.name} />



        <section className="border-t border-border">
          <div className="container mx-auto max-w-5xl px-4 py-12">
            <h2 className="text-xl font-bold text-ink">
              RAL {ral.code} {ral.name} in toepassing
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">
              Bekijk hoe RAL {ral.code} {ral.name} eruitziet binnenshuis op een muur én
              buiten op een gevel met kozijnen. De getoonde kleur is gerenderd op basis
              van de officiële HEX-waarde {ral.hex.toUpperCase()}.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {/* Binnen scene */}
              <figure className="m-0 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
                <div
                  className="relative h-56 w-full"
                  role="img"
                  aria-label={`Voorbeeld binnen: woonkamermuur geschilderd in RAL ${ral.code} ${ral.name}`}
                >
                  {/* wall */}
                  <div className="absolute inset-0" style={{ backgroundColor: ral.hex }} />
                  {/* floor */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-[#c9a87a] to-[#8c6a3f]" />
                  {/* skirting */}
                  <div className="absolute inset-x-0 bottom-16 h-1.5 bg-white/85" />
                  {/* frame on wall */}
                  <div className="absolute left-8 top-8 h-20 w-14 rounded-sm border-[3px] border-white/90 bg-white/10" />
                  {/* lamp */}
                  <div className="absolute right-10 top-0 h-10 w-px bg-white/40" />
                  <div className="absolute right-7 top-9 h-3 w-7 rounded-b-full bg-white/85" />
                  {/* sofa */}
                  <div className="absolute bottom-16 left-10 right-10 h-12 rounded-t-lg bg-[#f3ede3]" />
                  <div className="absolute bottom-20 left-14 h-6 w-8 rounded bg-[#d9c9a8]" />
                  <div className="absolute bottom-20 right-16 h-6 w-8 rounded bg-[#b89c70]" />
                </div>
                <figcaption className="border-t border-border px-4 py-3 text-xs text-ink-soft">
                  <span className="font-semibold text-ink">Binnen — woonkamermuur.</span>{" "}
                  Sfeerimpressie van RAL {ral.code} als wandkleur, gecombineerd met een
                  warme houten vloer en lichte meubels.
                </figcaption>
              </figure>

              {/* Buiten scene */}
              <figure className="m-0 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
                <div
                  className="relative h-56 w-full"
                  role="img"
                  aria-label={`Voorbeeld buiten: gevel en kozijnen geschilderd in RAL ${ral.code} ${ral.name}`}
                >
                  {/* sky */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#cfe3f0] to-[#eaf2f7]" />
                  {/* facade */}
                  <div className="absolute inset-x-0 bottom-0 top-10 bg-[#f4ede0]" />
                  {/* roof */}
                  <div
                    className="absolute inset-x-0 top-0 h-12"
                    style={{
                      background: `linear-gradient(180deg, ${ral.hex} 0%, ${ral.hex} 100%)`,
                      clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                    }}
                  />
                  {/* door */}
                  <div
                    className="absolute bottom-0 left-10 h-28 w-14 rounded-t-md border border-black/10 shadow-md"
                    style={{ backgroundColor: ral.hex }}
                  />
                  <div className="absolute bottom-12 left-[5.6rem] h-1 w-1 rounded-full bg-yellow-300" />
                  {/* windows with kozijn */}
                  <div className="absolute right-10 top-16 h-20 w-24 p-1.5" style={{ backgroundColor: ral.hex }}>
                    <div className="grid h-full w-full grid-cols-2 gap-1.5 bg-[#dbe7ef]">
                      <div className="bg-[#dbe7ef]" />
                      <div className="bg-[#cbd9e2]" />
                      <div className="bg-[#cbd9e2]" />
                      <div className="bg-[#dbe7ef]" />
                    </div>
                  </div>
                  {/* ground */}
                  <div className="absolute inset-x-0 bottom-0 h-3 bg-[#9aa097]" />
                </div>
                <figcaption className="border-t border-border px-4 py-3 text-xs text-ink-soft">
                  <span className="font-semibold text-ink">Buiten — gevel & kozijnen.</span>{" "}
                  Voorbeeld van RAL {ral.code} op kozijnen, voordeur en dakranden bij een
                  lichte gevel.
                </figcaption>
              </figure>
            </div>

            {/* Product links */}
            <div className="mt-10">
              <h3 className="text-lg font-bold text-ink">
                Producten in RAL {ral.code} {ral.name}
              </h3>
              <p className="mt-1 text-sm text-ink-soft">
                De volgende verfsoorten laten wij op maat mengen in exact deze RAL-tint.
                Bestel online of vraag advies aan onze kleurspecialist.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  to="/muurverf"
                  className="group rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-accent"
                  aria-label={`Muurverf laten mengen in RAL ${ral.code} ${ral.name}`}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                    Binnenmuurverf
                  </span>
                  <span className="mt-1 block text-sm font-bold text-ink group-hover:text-accent">
                    Muurverf in RAL {ral.code} {ral.name}
                  </span>
                  <span className="mt-1 block text-xs text-ink-soft">
                    Matte, dekkende muurverf op maat gemengd voor binnenmuren en plafonds.
                  </span>
                </Link>

                <Link
                  to="/verfmengservice"
                  className="group rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-accent"
                  aria-label={`Lakverf laten mengen in RAL ${ral.code} ${ral.name}`}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                    Lakverf binnen & buiten
                  </span>
                  <span className="mt-1 block text-sm font-bold text-ink group-hover:text-accent">
                    Hoogglans & zijdeglans lak in RAL {ral.code}
                  </span>
                  <span className="mt-1 block text-xs text-ink-soft">
                    Voor kozijnen, deuren en trappen — laten mengen via onze verfmengservice.
                  </span>
                </Link>

                <Link
                  to="/verfmengservice"
                  className="group rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-accent"
                  aria-label={`Buitenverf voor gevel en kozijnen laten mengen in RAL ${ral.code} ${ral.name}`}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                    Buitenverf
                  </span>
                  <span className="mt-1 block text-sm font-bold text-ink group-hover:text-accent">
                    Gevel- & houtverf in RAL {ral.code}
                  </span>
                  <span className="mt-1 block text-xs text-ink-soft">
                    Weersbestendige buitenverf in {ral.name.toLowerCase()} — op maat gemengd.
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface">
          <div className="container mx-auto max-w-5xl px-4 py-12">
            <h2 className="text-xl font-bold text-ink">Andere populaire RAL kleuren</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((c) => (
                <Link
                  key={c.code}
                  to="/ral/$code"
                  params={{ code: c.code }}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition hover:border-accent"
                >
                  <figure className="m-0 shrink-0">
                    <span
                      className="block h-10 w-10 rounded border border-border"
                      style={{ backgroundColor: c.hex }}
                      role="img"
                      aria-label={`Kleurstaal ${c.name}: ${c.hex.toUpperCase()}`}
                    />
                    <figcaption className="sr-only">{c.name} swatch in {c.hex.toUpperCase()}</figcaption>
                  </figure>
                  <span className="flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                      RAL {c.code}
                    </span>
                    <span className="text-sm font-bold text-ink group-hover:text-accent">{c.name}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
