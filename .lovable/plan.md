## Wijziging: Compacte 1-rij RAL-strip met volledige kleurachtergrond

### Doel
De RAL-kleurenstrip onderaan de pagina ombouwen tot een enkele horizontale rij waarbij elk blok de volledige achtergrondkleur toont (geen apart klein swatch-icoontje meer) en alleen het RAL-nummer als witte tekst bevat.

### Huidige situatie
- `RalStrip.tsx` toont 10 basis-RAL-kleuren als `flex-wrap` items.
- Elk item heeft een klein 3×3 px inline swatch-kvadratje + tekst "RAL {code}".
- Items wrappen over meerdere regels heen.

### Gewenste situatie
- Eén horizontale rij, geen wrapping.
- Elk item is een gelijkmatig verdeeld blok waarvan de **hele achtergrond** de RAL-kleur is.
- Tekst is wit, vet, met subtiele schaduw voor leesbaarheid op zowel lichte als donkere kleuren.
- Geen titel, beschrijving of extra links — alleen de 10 basis-RAL-items.
- Bij overflow: horizontaal scrollbaar op kleine schermen.

### Technische aanpak
1. **`src/components/site/RalStrip.tsx`** aanpassen:
   - Container: `flex overflow-x-auto` (geen wrap).
   - Items: `flex-1` (gelijke breedte), `min-w-[80px]`, `aspect-[3/2]` of vaste hoogte `h-14`.
   - Achtergrond: inline `style={{ backgroundColor: c.hex }}` op het hele item.
   - Tekst: alleen "RAL {code}", wit, vet, gecentreerd, met `text-shadow` of `drop-shadow` voor contrast.
   - Hover: lichte overlay of schaal-effect.
   - Behoud de `<Link>` naar `/ral/$code`.

2. **`src/lib/ral.ts`** hoeft **niet** gewijzigd te worden; `basicRalColors` bevat al de juiste 10 kleuren.

### Visueel resultaat
Een strakke, enkele horizontale balk met 10 gekleurde segmenten en witte RAL-nummers erop, direct boven de footer.