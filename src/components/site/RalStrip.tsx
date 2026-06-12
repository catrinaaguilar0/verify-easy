import { Link } from "@tanstack/react-router";
import { basicRalColors } from "@/lib/ral";

export function RalStrip() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="container mx-auto px-4 py-4">
        <ul
          className="flex flex-wrap items-center justify-center gap-2"
          aria-label="Basis RAL kleuren"
        >
          {basicRalColors.map((c) => (
            <li key={c.code}>
              <Link
                to="/ral/$code"
                params={{ code: c.code }}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 text-xs font-semibold text-ink transition hover:border-accent hover:text-accent"
                title={`RAL ${c.code} ${c.name}`}
                aria-label={`Bekijk RAL ${c.code}`}
              >
                <span
                  className="inline-block h-3 w-3 rounded-sm border border-border"
                  style={{ backgroundColor: c.hex }}
                  aria-hidden="true"
                />
                RAL {c.code}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
