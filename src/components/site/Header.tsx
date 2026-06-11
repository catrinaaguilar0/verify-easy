import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Check } from "lucide-react";

const trust = [
  "Gratis verzending vanaf €50",
  "Voor 23:00 besteld, morgen in huis",
  "Deskundig advies",
  "Achteraf betalen",
];

const nav = [
  { label: "Muurverf", to: "/muurverf" },
  { label: "Lakverf", to: "/" },
  { label: "Beits", to: "/" },
  { label: "Grondverf", to: "/" },
  { label: "Buitenverf", to: "/" },
  { label: "Verfbenodigdheden", to: "/" },
  { label: "RAL kleuren", to: "/ral" },
  { label: "Hulp & Advies", to: "/hulp-en-advies" },
];

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      {/* trust bar */}
      <div className="bg-surface">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-1 px-4 py-2 text-xs text-ink-soft">
          {trust.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-accent" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* main */}
      <div className="container mx-auto flex items-center gap-8 px-4 py-5">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground font-bold">
            V
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-ink">VERFONLINEWINKEL</span>
            <span className="text-[10px] uppercase tracking-wider text-ink-soft">
              Alles voor het perfecte resultaat
            </span>
          </span>
        </Link>

        <div className="hidden flex-1 md:block">
          <div className="relative">
            <input
              type="search"
              placeholder="Zoek op verf, kleur, merk, product…"
              className="h-11 w-full rounded-md border border-border bg-background pl-4 pr-12 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
            <button
              aria-label="Zoeken"
              className="absolute right-1 top-1 grid h-9 w-10 place-items-center rounded text-ink-soft hover:text-ink"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <a href="#" className="flex flex-col items-center text-ink hover:text-accent">
            <User className="h-5 w-5" />
            <span className="mt-0.5 text-xs">Account</span>
          </a>
          <a href="#" className="relative flex flex-col items-center text-ink hover:text-accent">
            <span className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-2 -top-1 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                0
              </span>
            </span>
            <span className="mt-0.5 text-xs">Winkelwagen</span>
          </a>
        </nav>
      </div>

      {/* category nav */}
      <div className="border-t border-border">
        <div className="container mx-auto flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 text-sm font-medium">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="text-ink hover:text-accent transition"
              activeProps={{ className: "text-accent" }}
            >
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
