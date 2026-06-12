import { Link, useNavigate } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Check, Menu, X, ArrowRight, Heart } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { searchCatalog, formatPrice } from "@/lib/catalog";

const trust = [
  "Gratis verzending vanaf €50",
  "Voor 23:00 besteld, morgen in huis",
  "Deskundig advies",
  "Achteraf betalen",
];

const nav = [
  { label: "Muurverf", to: "/categorie/$slug" as const, params: { slug: "muurverf" } },
  { label: "Lakverf", to: "/categorie/$slug" as const, params: { slug: "lakverf" } },
  { label: "Beits", to: "/categorie/$slug" as const, params: { slug: "beits" } },
  { label: "Grondverf", to: "/categorie/$slug" as const, params: { slug: "grondverf" } },
  { label: "Buitenverf", to: "/categorie/$slug" as const, params: { slug: "buitenverf" } },
  { label: "Kleuradvies", to: "/kleuradvies" as const, params: undefined },
  { label: "RAL kleuren", to: "/ral" as const, params: undefined },
  { label: "Hulp & Advies", to: "/hulp-en-advies" as const, params: undefined },
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
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      {/* trust bar */}
      <div className="bg-orange">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-1 px-4 py-2 text-xs text-ink">
          {trust.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-accent" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* main */}
      <div className="container mx-auto flex items-center gap-3 px-4 py-3 md:gap-4">
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border text-ink md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
            V
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-base font-extrabold tracking-tight text-ink">VERFONLINEWINKEL</span>
            <span className="text-[9px] uppercase tracking-wider text-ink-soft">
              Alles voor het perfecte resultaat
            </span>
          </span>
        </Link>

        {/* search */}
        <div ref={wrapRef} className="relative flex-1">
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
              placeholder="Zoek op product, merk, RAL-code of toepassing…"
              className="h-10 w-full rounded-md border border-border bg-background pl-3 pr-12 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              aria-label="Zoek in de webshop"
            />
            <button
              type="submit"
              aria-label="Zoeken"
              className="absolute right-1 top-1 grid h-8 w-10 place-items-center rounded bg-accent text-accent-foreground transition hover:bg-accent-strong"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {open && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-border bg-background shadow-[var(--shadow-soft)]">
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
                        className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink hover:border-accent hover:text-accent"
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
                      <div className="px-2 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                        Merken
                      </div>
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
                      <div className="px-2 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                        RAL kleuren
                      </div>
                      {results.ral.map((r) => (
                        <button
                          key={r.code}
                          type="button"
                          onClick={() => submitSearch(r.code)}
                          className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm text-ink hover:bg-surface"
                        >
                          <span
                            className="h-5 w-5 shrink-0 rounded border border-border"
                            style={{ backgroundColor: r.hex }}
                          />
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

        <nav className="hidden items-center gap-4 text-sm md:flex">
          <Link to="/verlanglijst" className="relative flex flex-col items-center text-ink hover:text-accent">
            <span className="relative">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-1 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {wishlistCount}
                </span>
              )}
            </span>
            <span className="mt-0.5 text-[10px]">Wensen</span>
          </Link>
          <Link to="/account" className="flex flex-col items-center text-ink hover:text-accent">
            <User className="h-5 w-5" />
            <span className="mt-0.5 text-[10px]">Account</span>
          </Link>
          <Link to="/winkelwagen" className="relative flex flex-col items-center text-ink hover:text-accent">
            <span className="relative">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-2 -top-1 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {count}
                </span>
              )}
            </span>
            <span className="mt-0.5 text-[10px]">Winkelwagen</span>
          </Link>
        </nav>

        <Link
          to="/winkelwagen"
          className="relative grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border text-ink md:hidden"
          aria-label="Winkelwagen"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
              {count}
            </span>
          )}
        </Link>
      </div>

      {/* category nav — desktop */}
      <div className="hidden border-t border-border md:block">
        <div className="container mx-auto flex flex-wrap items-center gap-x-5 gap-y-1 px-4 py-2 text-[13px] font-medium">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              params={n.params as never}
              className="text-ink hover:text-accent transition"
              activeProps={{ className: "text-accent" }}
            >
              {n.label}
            </Link>
          ))}
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
                className="border-b border-border py-3 text-ink last:border-0"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
