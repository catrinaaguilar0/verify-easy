# Plan: Categorie-blokken — foto-achtergrond i.p.v. iconen

## Wijziging
De 6 categorie-blokken (Muurverf, Binnenlak, Buitenlak, Beits, Grondverf, Benodigdheden) krijgen een fotoachtergrond. Het kleine icoon-vakje linksboven verdwijnt.

## Aanpak
1. Voor elke categorie genereren we een passende foto (1024×768, fast):
   - **Muurverf** — strak gestuukte witte muur met verfroller
   - **Binnenlak** — close-up van wit gelakte deur / kozijn
   - **Buitenlak** — gevel met geverfde houten kozijnen
   - **Beits** — donker gebeitst houten tuinhek / terras
   - **Grondverf** — houten plank met grijze grondverf en kwast
   - **Benodigdheden** — verfkwasten, rollers en afplaktape op werkbank

2. `klusBlokken` array uitbreiden met `img`-veld i.p.v. `icon/tint/icoTint`.

3. Kaart-rendering aanpassen:
   - Foto vult de hele kaart (`absolute inset-0 object-cover`)
   - Donkere gradient onderaan voor leesbaarheid
   - Titel + subtekst in wit onderaan
   - Hoogte iets verhogen naar `h-44` voor betere fotopresentatie
   - Hover: lichte zoom op de foto

## Bestand
- `src/routes/index.tsx` — imports, `klusBlokken` array, en de render-loop bij regel 229-244
- 6 nieuwe assets in `src/assets/category-*.jpg`

## Technisch
- `lucide-react` icons (`PaintRoller`, `Brush`, `Building2`, `Layers`, `PaintBucket`) blijven beschikbaar voor andere onderdelen (geen import-cleanup nodig in deze stap).
- Foto's worden gegenereerd met `imagegen` op `fast` quality.