# Plan: Klantbeoordeling in trust strip verplaatsen

## Wijziging
Op de homepage staat een trust strip met 5 elementen. De klantbeoordeling (9,2/10 · Kiyoh) staat nu links als eerste element. Deze wordt:

1. **Verplaatst** naar rechts van "Veilig betalen" (laatste positie in de strip)
2. **Kleiner gemaakt** — compactere opmaak zodat het visueel lichter oogt

## Bestand
- `src/routes/index.tsx` — de trust strip sectie aanpassen

## Huidige volgorde
1. Klantbeoordeling (9,2/10)
2. Gratis verzending
3. Voor 21:00 besteld
4. Gratis retourneren
5. Veilig betalen

## Nieuwe volgorde
1. Gratis verzending
2. Voor 21:00 besteld
3. Gratis retourneren
4. Veilig betalen
5. Klantbeoordeling (verkleind)