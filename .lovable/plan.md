# Mobiele polish — net zo strak als desktop

Doel: het mobiele beeld (≤640px) gelijktrekken aan de kwaliteit van desktop. Geen functionele wijzigingen, alleen presentatie: typografie, spacing, grids, sticky elementen en touch-targets.

## Scope
- Homepage (`src/routes/index.tsx`)
- Categorie- en merkpagina's (`categorie.$slug.tsx`, `merk.$slug.tsx`)
- Productdetail (`product.$slug.tsx`)
- Gedeelde layout: `Header`, `Footer`, `RalStrip`, root container

Filteroverlay blijft zoals nu (knop opent overlay).

## Veranderingen per onderdeel

### 1. Globale basis
- Container padding mobiel naar `px-4`, desktop `md:px-6 lg:px-8` consequent overal.
- Sectie-verticale ritme: `py-8 md:py-12 lg:py-16` als standaard.
- Heading-schaal: `text-2xl sm:text-3xl md:text-4xl` voor H1's, `text-xl sm:text-2xl` voor H2's. Lichaamstekst min. `text-[15px]` op mobiel voor leesbaarheid.
- Knoppen/links min. 44px touch-target (`h-11` op mobiel).
- `min-w-0` + `truncate` op flex-rijen met tekst + icoon (header-rijen, breadcrumbs, productkaarten).

### 2. Header
- Logo en cart-icoon zichtbaar; zoekbalk volle breedte onder de logo-rij op mobiel.
- Hamburger menu opent slide-in met grote tap-targets en categorie/merk-links.
- Sticky header met subtiele shadow bij scroll.

### 3. Homepage
- Hero: tekst eerst, beeld eronder; CTA `w-full sm:w-auto`. Padding `pt-10 pb-14`.
- Categorie-tegels: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`, vierkante kaarten, kleinere iconen + labels passend.
- Merkenstrip: horizontaal scrollbaar (`overflow-x-auto snap-x`) i.p.v. afkappen.
- Uitgelichte producten: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` (compactere kaart op mobiel, identiek aan grid-pagina's).
- USP-/info-blokken: stapelen `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.

### 4. Categorie- en merkpagina's
- Info-blokken (whenToUse / tips): blijven `grid gap-4 md:grid-cols-2`, op mobiel iets compacter met `p-4`.
- Sticky toolbar op mobiel (filter-knop + sort + count) net onder de header met `sticky top-[var(--header-h)] z-30 bg-background/95 backdrop-blur`.
- Productgrid: `grid-cols-2 md:grid-cols-3` (2 per rij op mobiel — sluit aan op "alles", consistent met desktop-ritme).
- Filteroverlay: volledige hoogte, header met "Toon X producten"-CTA onderaan sticky.

### 5. Productdetailpagina
- Layout `grid-cols-1 lg:grid-cols-2`. Galerij eerst, info eronder.
- Galerij: hoofdafbeelding `aspect-square` full-width, thumbnails horizontaal scrollbaar.
- Prijs/CTA-blok sticky onderaan op mobiel (`fixed bottom-0 inset-x-0` bar met prijs + "In winkelwagen") zodat actie altijd bereikbaar.
- Tabs/secties (beschrijving, specs, reviews) als accordion op mobiel, tabs op desktop.
- Breadcrumb scrollbaar, niet wrappen.

### 6. Footer
- Kolommen stapelen `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, kopjes als accordion-headers op mobiel (optioneel), anders gewoon open.
- Betaal-/keurmerk-iconen wrap netjes met `gap-3`.

## Technische details
- Tailwind v4 utility-only; geen nieuwe tokens nodig. Geen JS-logic wijzigingen.
- Responsive-patroon uit project-guidelines: `grid-cols-[minmax(0,1fr)_auto]` + `min-w-0` + `shrink-0` op header-rijen.
- Sticky productbar op mobiel: `lg:hidden fixed bottom-0` met `pb-[env(safe-area-inset-bottom)]`.
- Geen wijzigingen aan data, routes, server functions of catalog.

## Out of scope
- Filter-UX wijzigen (blijft overlay)
- Nieuwe componenten of features
- Backend / SEO / content

Na implementatie controleer ik de preview op 375px en 414px breed.
