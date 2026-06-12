## Wijziging

Vervang de "Laatste artikelen"-sectie op de homepage (`src/routes/index.tsx`, regels 248–283) door een eenvoudige sectie met **twee tegels naast elkaar** die alleen de coverfoto tonen en linken naar de externe blogs.

### Tegel 1 — Flexa Kleurfamilie 2026
- Link: https://www.flexa.nl/nl/flexa-kleurfamilie-van-2026 (target=_blank, rel=noopener)
- Cover-afbeelding (hero van Flexa): `https://digital.brand.akzonobel.com/m/70c1676473bced0c/CF26_Dulux-Consumer_C12_Hero-Banner_1900x765_Desktop.png`

### Tegel 2 — Sigma Kleur van het Jaar 2026: Secret Safari
- Link: https://www.sigma.nl/blog/secret-safari-sigma-kleur-van-het-jaar-2026 (target=_blank, rel=noopener)
- Cover-afbeelding (hero van Sigma): `https://stcacnlsigmanlprd01.blob.core.windows.net/content/kleur-van-het-jaar-2026-secret-safari-hoofdbeeld.jpg`

### Vormgeving
- Grid: `md:grid-cols-2` (op mobiel onder elkaar, op desktop naast elkaar).
- Elke tegel: `<a>` met afgeronde hoek, `aspect-[16/9]`, alleen het `<img>` met `object-cover` en lichte hover-zoom.
- **Geen titel, categorie, datum, leestijd of "Laatste artikelen"-kop** — puur de twee foto's.
- `alt`-attribuut blijft beschrijvend voor toegankelijkheid (geen zichtbare tekst).

### Opruimen
- Import `posts as blogPosts` uit `@/lib/blog` op regel 30 wordt niet meer gebruikt op deze pagina → verwijderen.
- Geen wijzigingen aan `/blog`-route of de header-link.
