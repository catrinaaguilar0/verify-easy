import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ralColors } from "@/lib/ral";

const baseUrl = "https://cozy-check-hub.lovable.app";

export const Route = createFileRoute("/ral")({
  head: () => ({
    meta: [
      { title: "RAL kleuren — overzicht & inspiratie | Verfwinkel" },
      {
        name: "description",
        content:
          "Bekijk populaire RAL-kleuren met uitleg, toepassing en combinatietips. Laat jouw RAL-kleur gratis mengen met onze verfmengservice.",
      },
      { property: "og:title", content: "RAL kleuren — overzicht | Verfwinkel" },
      { property: "og:description", content: "Populaire RAL-kleuren met inspiratie en advies." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${baseUrl}/ral` },
    ],
    links: [{ rel: "canonical", href: `${baseUrl}/ral` }],
  }),
  component: RalLayout,
});

function RalLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/ral/$code");
  if (isChild) return <Outlet />;
  return <RalIndex />;
}

function RalIndex() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <nav className="text-xs text-ink-soft">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-1">/</span>
          <span className="text-ink">RAL kleuren</span>
        </nav>
        <header className="mt-4 max-w-2xl">
          <h1 className="text-4xl font-extrabold text-ink md:text-5xl">RAL kleuren</h1>
          <p className="mt-3 text-sm text-ink-soft">
            De meest gekozen RAL-tinten voor binnen en buiten. Klik op een kleur voor uitleg, toepassing
            en bijpassende combinaties. Elke RAL-kleur kunnen wij voor je laten mengen in jouw verf naar keuze.
          </p>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ralColors.map((c) => (
            <Link
              key={c.code}
              to="/ral/$code"
              params={{ code: c.code }}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-accent"
              title={`RAL ${c.code} ${c.name}`}
              aria-label={`Bekijk RAL ${c.code} ${c.name}`}
            >
              <figure className="m-0 shrink-0">
                <span
                  className="block h-16 w-16 rounded-lg border border-border"
                  style={{ backgroundColor: c.hex }}
                  role="img"
                  aria-label={`Kleurstaal RAL ${c.code} ${c.name}: ${c.hex.toUpperCase()}`}
                />
                <figcaption className="sr-only">RAL {c.code} {c.name} swatch in {c.hex.toUpperCase()}</figcaption>
              </figure>
              <span className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  RAL {c.code}
                </span>
                <span className="text-base font-bold text-ink group-hover:text-accent">{c.name}</span>
                <span className="text-xs text-ink-soft">{c.family} · {c.hex.toUpperCase()}</span>
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
