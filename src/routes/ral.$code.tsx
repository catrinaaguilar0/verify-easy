import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getRal, ralColors, type RalColor } from "@/lib/ral";
import { ArrowLeft } from "lucide-react";

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
    const title = `RAL ${ral.code} ${ral.name} — kleurinfo & toepassing | Verfwinkel`;
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
              <div
                className="aspect-square w-full rounded-2xl border border-border shadow-[var(--shadow-card)]"
                style={{ backgroundColor: ral.hex }}
                aria-label={`Kleurstaal van RAL ${ral.code} ${ral.name}`}
              />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-accent">
                  RAL {ral.code} · {ral.family}
                </div>
                <h1 className="mt-2 text-4xl font-extrabold leading-tight text-ink md:text-5xl">
                  {ral.name}
                </h1>
                <p className="mt-4 text-base text-ink-soft">{ral.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
                  <span className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-ink">
                    HEX {ral.hex.toUpperCase()}
                  </span>
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
                    <span
                      className="block aspect-square w-full rounded border border-border"
                      style={{ backgroundColor: c!.hex }}
                      aria-hidden
                    />
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
                  <span
                    className="h-10 w-10 shrink-0 rounded border border-border"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden
                  />
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
