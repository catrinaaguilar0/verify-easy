## Doel
In de "Shop per merk" sectie (`src/routes/index.tsx`) de tekst-tiles (Sikkens, Sigma, Wijzonol, Flexa, Histor) vervangen door echte merklogo's.

## Aanpak
1. **Logo's genereren** met `imagegen--generate_image` (premium, transparante PNG, op witte achtergrond) voor elk merk: Sikkens, Sigma Coatings, Wijzonol, Flexa, Histor. Opgeslagen als `src/assets/brand-{naam}.png`.
   - Let op: dit zijn AI-gegenereerde benaderingen van de logo's — niet officieel/merkrechtelijk gevalideerd. Als je échte officiële logo's wil, kun je die als uploads aanleveren en dan vervang ik ze daarmee.
2. **Sectie updaten** (regels 139-145): array vervangen door objecten `{ name, logo }`, en in de tile een `<img>` renderen i.p.v. de tekst, met juiste alt-tekst, `object-contain`, max hoogte, en behoud van hover-stijl (border accent).
3. Tile-achtergrond blijft `bg-background` zodat logo's goed leesbaar zijn; padding toegevoegd zodat logo's niet tegen de rand komen.

## Bestanden
- `src/routes/index.tsx` — imports + brands-array + JSX in BRANDS sectie
- nieuw: `src/assets/brand-sikkens.png`, `brand-sigma.png`, `brand-wijzonol.png`, `brand-flexa.png`, `brand-histor.png`

## Vraag
Wil je dat ik AI-gegenereerde logo-benaderingen maak, of upload je liever de officiële logo-bestanden zelf?
