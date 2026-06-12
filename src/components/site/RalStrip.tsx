import { Link } from "@tanstack/react-router";
import { ralColors } from "@/lib/ral";

export function RalStrip() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              RAL kleuren — laat elke tint mengen
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Klik op een RAL-kleur voor uitleg, toepassing en bijpassende combinaties.
              Wij mengen elke RAL-tint op maat in de verfsoort van jouw keuze.
            </p>
          </div>
          <Link
            to="/ral"
            className="text-sm font-semibold text-accent hover:underline"
          >
            Bekijk alle RAL-kleuren →
          </Link>
        </div>

        <ul
          className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          aria-label="Populaire RAL kleuren"
        >
          {ralColors.map((c) => (
            <li key={c.code}>
              <Link
                to="/ral/$code"
                params={{ code: c.code }}
                className="group block rounded-md border border-border bg-card px-3 py-2 transition hover:-translate-y-0.5 hover:border-accent"
                title={`RAL ${c.code} ${c.name}`}
                aria-label={`Bekijk RAL ${c.code} ${c.name}`}
              >
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-accent">
                  RAL {c.code}
                </span>
                <span className="block truncate text-xs font-bold text-ink group-hover:text-accent">
                  {c.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
