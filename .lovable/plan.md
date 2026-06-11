## Verwijder homepage mini-trust sectie

### Wat er gebeurt
De 4-iconenrij direct onder de hero op de homepage wordt verwijderd. Dit betreft alleen de mini-trust sectie in `src/routes/index.tsx`.

De header trust-balk blijft onaangeroerd.

### Technisch
- Verwijder de `trustMini`-array en bijbehorende render-sectie (regels ~107-123) in `src/routes/index.tsx`.
- Verwijder ongebruikte imports (`Truck`, `Palette`, `Headphones`, `Check`) uit `src/routes/index.tsx` die alleen voor deze sectie werden gebruikt.

### Bestand
- `src/routes/index.tsx`