De gebruiker wil de RAL-strook boven de footer aanpassen zonder de gekleurde swatch-vlakken (de "foto's"). Concreet:

1. **`src/components/site/RalStrip.tsx`** — Verwijder het gekleurde vierkant (`<span>` met `backgroundColor: c.hex`) bij elk RAL-item. Behoud de link met alleen de tekstlabels: "RAL {code}" en de kleurnaam. Pas de layout aan zodat de tekst-links netjes in een responsive grid staan zonder visuele swatch.

2. **Geen andere wijzigingen** — De RAL-detailpagina's en de rest van de site blijven ongewijzigd.

Dit maakt de footer-strip compacter en tekst-georiënteerd, in lijn met het verzoek "zonder swatch foto".