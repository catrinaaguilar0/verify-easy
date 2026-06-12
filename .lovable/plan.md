## Doel
De RAL-strook boven de footer compacter en minimalistischer maken.

## Wijzigingen

### 1. `src/lib/ral.ts` — basis RAL-kleuren selectie
Voeg een `basicRalCodes` array toe met de 10 meest populaire / basis RAL-kleuren:
9010, 9002, 7016, 7039, 9016, 9005, 1019, 8017, 6005, 9011.

### 2. `src/components/site/RalStrip.tsx` — volledige herontwerp
- **Titel + uitleg + "Bekijk alle" link**: verwijderen.
- **Swatches terug**: kleine gekleurde vierkantjes (inline, ca. 1em hoog) naast het RAL-nummer.
- **Alleen RAL-nummer**: geen kleurnaam meer.
- **Alleen basis kleuren**: toon maximaal 10 items uit `basicRalCodes`.
- **Compact grid**: items als kleine tags/pills naast elkaar, minimalistisch.

## Technisch
Geen nieuwe dependencies. Alleen bewerking op bestaande `RalStrip.tsx` en toevoeging in `ral.ts`.