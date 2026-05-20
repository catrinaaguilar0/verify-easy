import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, User, Palette, Truck, Clock, Check, MessageCircle } from "lucide-react";

const nav = [
  "Verf", "Schildersbenodigdheden", "Merken", "Sigma", "Sikkens",
  "Wijzonol", "Jotun", "Verfkleuren", "Aanbiedingen", "Vestigingen",
];

export function Header() {
  return (
    <header className="w-full">
      {/* Top utility bar */}
      <div className="bg-primary text-primary-foreground text-sm">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-2">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <li className="flex items-center gap-2"><Truck className="h-4 w-4" /> Gratis verzending v.a. €50,-</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4" /> Voor 23:59 uur besteld, morgen in huis*</li>
            <li className="hidden md:flex items-center gap-2"><Check className="h-4 w-4" /> Keuze uit 50.000+ kleuren</li>
            <li className="hidden lg:flex items-center gap-2"><MessageCircle className="h-4 w-4" /> Advies online of bij servicepunten</li>
          </ul>
          <ul className="flex items-center gap-5">
            <li><a href="#" className="hover:underline">Kleurgarantie</a></li>
            <li><a href="#" className="hover:underline">Advies</a></li>
            <li><a href="#" className="hover:underline">Klantenservice</a></li>
            <li><a href="#" className="inline-flex items-center gap-1 hover:underline"><User className="h-4 w-4" />Inloggen</a></li>
            <li><a href="#" className="inline-flex items-center gap-1 hover:underline"><ShoppingCart className="h-4 w-4" />Winkelmand</a></li>
          </ul>
        </div>
      </div>

      {/* Logo + search */}
      <div className="container mx-auto flex items-center gap-6 px-4 py-5">
        <Link to="/" className="flex items-center gap-1">
          <span className="rounded-md bg-primary px-3 py-1.5 text-lg font-extrabold tracking-tight text-primary-foreground">
            ONLINE
          </span>
          <span className="-ml-1 rounded-md bg-accent px-3 py-1.5 text-lg font-extrabold tracking-tight text-accent-foreground">
            VERF<span className="text-xs align-top">.nl</span>
          </span>
        </Link>

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Waar ben je naar op zoek?"
            className="h-12 w-full rounded-full border border-border bg-muted/40 pl-12 pr-5 text-sm outline-none transition focus:border-primary focus:bg-background"
          />
        </div>

        <button className="hidden md:inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium hover:border-primary">
          <span className="inline-block h-5 w-5 rounded-full bg-[conic-gradient(from_0deg,#ef4444,#f59e0b,#22c55e,#3b82f6,#a855f7,#ef4444)]" />
          <Palette className="h-4 w-4" />
          Vind jouw kleur
        </button>
      </div>

      {/* Category nav */}
      <nav className="border-y border-border bg-muted/40">
        <ul className="container mx-auto flex flex-wrap items-center gap-x-7 gap-y-2 px-4 py-3 text-sm font-medium text-foreground">
          {nav.map((n) => (
            <li key={n}>
              <a href="#" className="hover:text-primary">{n}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Promo strip */}
      <div className="text-primary-foreground" style={{ background: "var(--gradient-promo)" }}>
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-4 px-4 py-3 text-sm md:text-base">
          <span><strong>Pinksterkorting:</strong> 10% extra korting op alles*</span>
          <span className="rounded-md border border-white/60 px-3 py-1 font-mono tracking-widest">CODE: PINKSTEREN</span>
          <a href="#" className="rounded-md bg-white px-4 py-1.5 font-semibold text-accent-strong hover:bg-white/90">Bekijk actie ›</a>
        </div>
      </div>
    </header>
  );
}
