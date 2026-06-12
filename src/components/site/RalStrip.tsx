import { Link } from "@tanstack/react-router";
import { basicRalColors } from "@/lib/ral";

export function RalStrip() {
  return (
    <section className="border-t border-border bg-surface">
      <ul
        className="flex w-full overflow-x-auto"
        aria-label="Basis RAL kleuren"
      >
        {basicRalColors.map((c) => (
          <li key={c.code} className="flex-1 min-w-[80px]">
            <Link
              to="/ral/$code"
              params={{ code: c.code }}
              className="flex h-14 w-full items-center justify-center text-sm font-bold text-white transition hover:opacity-90"
              style={{
                backgroundColor: c.hex,
                textShadow: "0 1px 2px rgba(0,0,0,0.6)",
              }}
              title={`RAL ${c.code} ${c.name}`}
              aria-label={`Bekijk RAL ${c.code}`}
            >
              RAL {c.code}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
