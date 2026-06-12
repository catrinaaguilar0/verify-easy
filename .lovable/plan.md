# RAL-kleuren in footer + uitgebreide RAL-bibliotheek

## Doel
Bezoekers vanaf elke pagina snel naar een RAL-kleurenpagina laten klikken (zoals `verfwinkel.nl/kleuren/ral/ral-7016-antracietgrijs`), met een rijker overzicht aan RAL-tinten.

## 1. RAL-bibliotheek uitbreiden (`src/lib/ral.ts`)
Huidig: 11 RAL-kleuren. Uitbreiden naar ~40 populaire RAL-codes, verdeeld over families:

- **Wit/crème**: 9001, 9002, 9003, 9010, 9016, 1013, 1015
- **Grijs**: 7001, 7004, 7006, 7016, 7021, 7022, 7035, 7037, 7039, 7040, 7044
- **Zwart**: 9004, 9005, 9011, 9017
- **Beige/bruin**: 1019, 8003, 8007, 8011, 8017, 8019, 8022, 8025
- **Groen**: 6005, 6009, 6021
- **Blauw**: 5008, 5011, 5014
- **Rood**: 3004, 3005, 3009

Elke kleur krijgt: `code`, `name`, `hex`, `family`, korte `description`, `usage` (3 toepassingen), `combinesWith` (3 RAL-codes). Family-type uitbreiden met `Bruin | Groen | Blauw | Rood`.

## 2. RAL-strook boven footer
Nieuw component `src/components/site/RalStrip.tsx`:

- Sectie met lichte achtergrond, container met titel "RAL kleuren — laat elke tint mengen" + korte intro-zin.
- Grid (8 kol desktop / 4 mobiel) van alle RAL-kleuren als kleine swatches:
  - vierkant met `backgroundColor: hex`, eronder `RAL {code}` en kleurnaam
  - hele kaart is `<Link to="/ral/$code" params={{ code }}>`
  - hover: lichte zoom + accentrand
- Onderaan een "Bekijk alle RAL-kleuren →" link naar `/ral`.

Toevoegen aan `src/components/site/Footer.tsx` boven het bestaande footer-blok (zodat hij site-breed verschijnt zonder elke route aan te passen).

## 3. RAL-detailpagina verrijken (`src/routes/ral.$code.tsx`)
Lichte uitbreiding zodat nieuwe codes nog steeds een rijke pagina hebben:
- Sectie "Toepassingen" (uit `usage`)
- Sectie "Combineert met" (links naar andere RAL-codes met swatches)
- SEO `head()` met titel `RAL {code} {naam} — uitleg & toepassing | VerfOnlineWinkel` en meta description uit `description`
- Canonical + JSON-LD blijven zoals nu

(Geen wijziging aan URL-structuur — blijft `/ral/{code}`; geen slug-vorm `ral-7016-antracietgrijs` toevoegen tenzij je dat wil.)

## 4. Sitemap
`src/routes/sitemap[.]xml.ts` gebruikt al `ralColors`, dus de nieuwe codes verschijnen automatisch.

## Te wijzigen bestanden
- `src/lib/ral.ts` — uitbreiden naar ~40 kleuren
- `src/components/site/RalStrip.tsx` — nieuw
- `src/components/site/Footer.tsx` — RalStrip erboven renderen
- `src/routes/ral.$code.tsx` — kleine SEO/UI-aanvulling

## Niet in scope
- Nieuwe URL-vorm `/kleuren/ral/ral-7016-antracietgrijs`
- Filters/zoek op de RAL-overzichtspagina
- Database-opslag van RAL-kleuren (blijven static in `src/lib/ral.ts`)
