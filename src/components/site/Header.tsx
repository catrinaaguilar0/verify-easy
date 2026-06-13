import { Link, useNavigate } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X, ArrowRight, Heart, Truck, Clock, Palette, Headphones, Briefcase, ChevronDown, PaintBucket } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { searchCatalog, formatPrice } from "@/lib/catalog";

const usps = [
  { icon: Truck, label: "Gratis verzending vanaf €50" },
  { icon: Clock, label: "Voor 21:00 besteld, morgen in huis" },
  { icon: Palette, label: "50.000+ kleuren mengbaar" },
  { icon: Headphones, label: "Deskundig verfadvies" },
  { icon: Briefcase, label: "Zakelijk bestellen" },
];

const nav = [
  { label: "VERF", to: "/categorie/$slug" as const, params: { slug: "muurverf" }, dropdown: true },
  { label: "LAK", to: "/categorie/$slug" as const, params: { slug: "lakverf" }, dropdown: true },
  { label: "BEITS", to: "/categorie/$slug" as const, params: { slug: "beits" }, dropdown: true },
  { label: "GRONDVERF", to: "/categorie/$slug" as const, params: { slug: "grondverf" }, dropdown: true },
  { label: "BENODIGDHEDEN", to: "/categorie/$slug" as const, params: { slug: "benodigdheden" }, dropdown: false },
  { label: "MERKEN", to: "/merk/$slug" as const, params: { slug: "sikkens" }, dropdown: false },
  { label: "ADVIES & INSPIRATIE", to: "/blog" as const, params: undefined, dropdown: false },
];

const popularSearches = ["muurverf wit", "Sikkens", "RAL 9010", "hoogglans lak", "buitenverf"];

export function Header() {
  const { count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => searchCatalog(query, 6), [query]);
  const hasResults =
    results.products.length + results.brands.length + results.categories.length + results.ral.length > 0;

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function submitSearch(q: string) {
    const term = q.trim();
    if (!term) return;
    setOpen(false);
    setMobileOpen(false);
    navigate({ to: "/zoeken", search: { q: term } });
  }

  return (
    <header className="sticky top-0 z-40">
      {/* USP top bar */}
      <div className="bg-navy text-navy-foreground">
        <div className="container mx-auto hidden flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-1.5 text-[11px] md:flex">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {usps.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 opacity-90">
                <Icon className="h-3.5 w-3.5 text-cta" />
                {label}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-5 opacity-90">
            <Link to="/contact" className="hover:text-cta">Klantenservice</Link>
          </div>
        </div>
      </div>

      {/* Main header (navy) */}
      <div className="bg-navy text-navy-foreground">
        <div className="container mx-auto flex items-center gap-3 px-4 py-4 md:gap-6">
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/20 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link to="/" className="flex shrink-0 items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-cta text-cta-foreground">
              <PaintBucket className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold tracking-tight">
                VerfOnlineWinkel<span className="text-cta">.nl</span>
              </span>
              <span className="hidden text-[10px] uppercase tracking-wider text-white/70 sm:block">
                Professionele verf voor elke klus
              </span>
            </span>
          </Link>

          {/* search */}
          <div ref={wrapRef} className="relative ml-2 hidden flex-1 md:block">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitSearch(query);
              }}
            >
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="Zoek op verf, merk, kleur of artikel…"
                className="h-11 w-full rounded-md border border-white/10 bg-background pl-4 pr-14 text-sm text-ink outline-none transition focus:border-cta focus:ring-2 focus:ring-cta/30"
                aria-label="Zoek in de webshop"
              />
              <button
                type="submit"
                aria-label="Zoeken"
                className="absolute right-1 top-1 grid h-9 w-12 place-items-center rounded bg-cta text-cta-foreground transition hover:bg-cta-strong"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            {open && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-border bg-background text-ink shadow-[var(--shadow-soft)]">
                {!query.trim() ? (
                  <div className="p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                      Populaire zoekopdrachten
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {popularSearches.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => submitSearch(s)}
                          className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink hover:border-cta hover:text-cta-foreground"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : hasResults ? (
                  <div className="max-h-[70vh] overflow-y-auto">
                    {results.products.length > 0 && (
                      <div className="p-2">
                        <div className="px-2 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                          Producten
                        </div>
                        <ul>
                          {results.products.map((p) => (
                            <li key={p.id}>
                              <button
                                type="button"
                                onClick={() => submitSearch(p.name)}
                                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-surface"
                              >
                                <img src={p.image} alt="" className="h-10 w-10 shrink-0 rounded object-contain" />
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-sm font-semibold text-ink">{p.name}</span>
                                  <span className="block text-xs text-ink-soft">
                                    {p.brand} · {p.volume}
                                  </span>
                                </span>
                                <span className="shrink-0 text-sm font-bold text-ink">{formatPrice(p.price)}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {results.categories.length > 0 && (
                      <div className="border-t border-border p-2">
                        <div className="px-2 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                          Categorieën
                        </div>
                        {results.categories.map((c) => (
                          <button
                            key={c.key}
                            type="button"
                            onClick={() => submitSearch(c.label)}
                            className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm text-ink hover:bg-surface"
                          >
                            <span>{c.label}</span>
                            <ArrowRight className="h-3.5 w-3.5 text-ink-soft" />
                          </button>
                        ))}
                      </div>
                    )}
                    {results.brands.length > 0 && (
                      <div className="border-t border-border p-2">
                        <div className="px-2 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wider text-ink-soft">Merken</div>
                        {results.brands.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => submitSearch(b)}
                            className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-ink hover:bg-surface"
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    )}
                    {results.ral.length > 0 && (
                      <div className="border-t border-border p-2">
                        <div className="px-2 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wider text-ink-soft">RAL kleuren</div>
                        {results.ral.map((r) => (
                          <button
                            key={r.code}
                            type="button"
                            onClick={() => submitSearch(r.code)}
                            className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm text-ink hover:bg-surface"
                          >
                            <span className="h-5 w-5 shrink-0 rounded border border-border" style={{ backgroundColor: r.hex }} />
                            <span className="font-semibold">{r.code}</span>
                            <span className="text-ink-soft">{r.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 text-sm text-ink-soft">
                    Geen resultaten voor <strong className="text-ink">"{query}"</strong>.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* account + cart */}
          <div className="ml-auto flex items-center gap-5 md:ml-0">
            <Link to="/verlanglijst" className="relative hidden items-center gap-2 hover:text-cta md:flex">
              <span className="relative">
                <Heart className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-cta px-1 text-[10px] font-bold text-cta-foreground">
                    {wishlistCount}
                  </span>
                )}
              </span>
            </Link>
            <Link to="/account" className="hidden items-center gap-2 hover:text-cta md:flex">
              <User className="h-6 w-6" />
              <span className="flex flex-col text-[11px] leading-tight">
                <span className="font-semibold">Mijn account</span>
                <span className="text-white/70">Inloggen / Registreren</span>
              </span>
            </Link>
            <Link to="/winkelwagen" className="flex items-center gap-2 hover:text-cta">
              <span className="relative">
                <ShoppingBag className="h-6 w-6" />
                {count > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-cta px-1 text-[10px] font-bold text-cta-foreground">
                    {count}
                  </span>
                )}
              </span>
              <span className="hidden text-[13px] font-semibold sm:block">Winkelwagen</span>
            </Link>
          </div>
        </div>

        {/* mobile search */}
        <div className="container mx-auto px-4 pb-3 md:hidden">
          <form onSubmit={(e) => { e.preventDefault(); submitSearch(query); }} className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek op verf, merk, kleur…"
              className="h-10 w-full rounded-md border border-white/10 bg-background pl-3 pr-12 text-sm text-ink outline-none"
            />
            <button type="submit" aria-label="Zoeken" className="absolute right-1 top-1 grid h-8 w-10 place-items-center rounded bg-cta text-cta-foreground">
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* main nav (white) */}
      <div className="hidden border-b border-border bg-background md:block">
        <div className="container mx-auto flex items-center gap-1 px-4">
          <div className="flex flex-1 items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                params={n.params as never}
                className="inline-flex items-center gap-1 px-4 py-3.5 text-[13px] font-bold tracking-wide text-ink transition hover:text-cta-foreground hover:bg-surface"
                activeProps={{ className: "text-cta-foreground" }}
              >
                {n.label}
                {n.dropdown && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </Link>
            ))}
          </div>
          <Link
            to="/categorie/$slug"
            params={{ slug: "muurverf" }}
            search={{ sort: "popular" } as never}
            className="my-2 inline-flex items-center gap-2 rounded-md bg-cta px-5 py-2.5 text-[13px] font-extrabold tracking-wide text-cta-foreground transition hover:bg-cta-strong"
          >
            AANBIEDINGEN
          </Link>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col px-4 py-2 text-sm">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                params={n.params as never}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center justify-between border-b border-border py-3 font-semibold text-ink"
              >
                <span>{n.label}</span>
                <ArrowRight className="h-4 w-4 text-ink-soft" />
              </Link>
            ))}
            <Link to="/account" onClick={() => setMobileOpen(false)} className="flex min-h-[44px] items-center gap-2 border-b border-border py-3 text-ink">
              <User className="h-4 w-4" /> Mijn account
            </Link>
            <Link to="/verlanglijst" onClick={() => setMobileOpen(false)} className="flex min-h-[44px] items-center gap-2 py-3 text-ink">
              <Heart className="h-4 w-4" /> Verlanglijst {wishlistCount > 0 && <span className="ml-auto rounded-full bg-cta px-2 py-0.5 text-[10px] font-bold text-cta-foreground">{wishlistCount}</span>}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
