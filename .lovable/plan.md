Op de Demonstraties pagina staat onder de filmkaarten een sectie "Waar gaat het over?" met vier categorie-kaarten (Verftechnieken, Kleuradvies, Grondverf & Voorbehandeling, Duurzaam schilderen). Deze sectie wordt verwijderd.

Wijzigingen in `src/routes/demonstraties.tsx`:

1. Verwijder de `categories` array (regels 26-51).
2. Verwijder de "Waar gaat het over?" heading en bijbehorende grid (regels 241-262).
3. Ruim ongebruikte imports op: `Lightbulb`, `ShieldCheck`, `Droplets` (alleen gebruikt door de categorie-kaarten).
   - `ShieldCheck` en `Droplets` worden ook elders in de pagina gebruikt (als `icon` in demoFilms entries), dus die moeten blijven. Alleen `Lightbulb` kan echt weg.

De rest van de pagina (hero, filmoverzicht, CTA-sectie) blijft ongewijzigd.