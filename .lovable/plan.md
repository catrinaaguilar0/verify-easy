# Plan: 3 producten per merk

## Huidige stand
- 10 merken in `BRANDS`, maar `PRODUCTS` bevat alleen Sikkens (3), Sigma (3), Wijzonol (2), Flexa (2). Histor, Farrow & Ball, Benjamin Moore, Dulux, ProGold en Trimetal hebben 0 producten — hun `/merk/<slug>`-pagina toont "Binnenkort verkrijgbaar".
- Doel: elk merk krijgt precies 3 realistische producten (totaal 30).

## Wat ik toevoeg

Per merk 3 producten met realistische naam, categorie, prijs, volume, dekking, applicaties, finish, korte beschrijving en rating/reviews. Mix per merk: minimaal 1 muurverf of lakverf zodat er variatie zit. Verdeling per merk (samenvatting):

- **Sikkens** — al 3, geen toevoegingen.
- **Sigma** — al 3, geen toevoegingen.
- **Wijzonol** — +1 (muurverf mat).
- **Flexa** — +1 (lakverf zijdeglans binnen).
- **Histor** — 3 nieuw: Perfect Base grondverf, Schone Muur muurverf mat, Cabinet Paint zijdeglans lak.
- **Farrow & Ball** — 3 nieuw: Estate Emulsion mat, Modern Eggshell zijdeglans, Exterior Masonry muurverf buiten.
- **Benjamin Moore** — 3 nieuw: Regal Select muurverf mat, Advance Satin lak, Aura Bath & Spa badkamer muurverf.
- **Dulux** — 3 nieuw: Diamond Matt muurverf, Weathershield buitenmuurverf, Quick Dry Satinwood lak.
- **ProGold** — 3 nieuw: Premium Muurverf Mat, Aqua Grondverf, Zijdeglans Lak Universeel.
- **Trimetal** — 3 nieuw: Polyurethane Satin lak, Décor Mat muurverf, Cryltane buitenlak.

Totaal: 20 nieuwe producten + 10 bestaande = 30.

## Beelden
Er zijn vier product-afbeeldingen beschikbaar (`prod-sikkens`, `prod-sigma`, `prod-wijzonol`, `prod-flexa`). Voor de 6 nieuwe merken hergebruik ik per merk één van deze foto's op basis van categorie (muurverf → sikkens/sigma, lakverf → wijzonol/flexa). Functioneel ziet de pagina er dan gevuld uit zonder dat ik 18 nieuwe foto's hoef te genereren.

> Wil je liever per nieuw merk een echte unieke productfoto laten genereren (6 extra afbeeldingen, één per merk), zeg het dan — dan voeg ik die stap toe.

## Technische details
- Bestand: `src/lib/catalog.ts` — `PRODUCTS`-array uitbreiden met 20 nieuwe entries (id `p-011` t/m `p-030`).
- Slugs blijven uniek (`<merk>-<product>-<volume>`).
- `BRAND_INFO` en sitemap (`PRODUCTS.map`) hoeven niet aangepast — pikken nieuwe entries automatisch op.
- Geen andere bestanden raken.
