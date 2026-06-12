## Wijzigingen footer

1. **RAL-kleuren kolom** — Verwijder de gekleurde swatch-blokjes (huidige 2-koloms grid met 10 items). Vervang door een platte `<ul>` lijst met 5 tekstlinks: `RAL {code} – {name}` als gewone linkjes zonder achtergrondkleur.

2. **Gelijke rijhoogte** — De vier bestaande kolommen hebben elk al 5 links. Door de RAL-kleuren kolook ook op 5 links te beperken (`slice(0, 5)`) staan alle 5 kolommen netjes op gelijke hoogte (5 rijen).

Aangepast bestand: `src/components/site/Footer.tsx`