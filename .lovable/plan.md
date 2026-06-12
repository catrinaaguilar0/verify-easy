# Plan: 5 nieuwe merken toevoegen aan Topmerken

## Wat ik ga doen

Vijf nieuwe merken toevoegen aan de Topmerken-strip op de homepage: **Farrow & Ball, Benjamin Moore, ProGold, Trimetal, Dulux**. (De andere 3 uploads — Sigma, Flexa, Sikkens — bestaan al en worden overgeslagen.)

De Topmerken-strip leest uit de `brands`-tabel met fallback naar lokale logo's. Ik kies voor de databaseroute zodat de logo's direct live verschijnen naast de bestaande 5.

## Stappen

1. **Logo's uploaden** naar de bestaande `brand-logos` storage bucket via de sandbox CLI (een per merk, .png/.webp/.jpeg zoals aangeleverd):
   - `farrow-ball.jpeg`, `benjamin-moore.jpeg`, `progold.webp`, `trimetal.webp`, `dulux.jpeg`
2. **Brand-rijen invoegen** in de `brands`-tabel met `visible=true`, oplopende `sort_order` (60, 70, 80, 90, 100), bijpassende categorie en `logo_path` naar de geüploade bestanden.
   - Slugs: `farrow-ball`, `benjamin-moore`, `progold`, `trimetal`, `dulux`
   - Categorie: `muurverf` (Farrow & Ball, Benjamin Moore, Dulux) / `lakverf` (ProGold, Trimetal) — uit bestaande `product_category` enum
3. **Merkpagina-content uitbreiden** zodat `/merk/{slug}` voor elk nieuw merk niet 404't:
   - `BRANDS` in `src/lib/catalog.ts` uitbreiden met de 5 nieuwe namen.
   - `BRAND_INFO` in `src/routes/merk.$slug.tsx` uitbreiden met een korte beschrijving + USP's per merk (lege productenlijst is OK — pagina toont dan alleen het merk-intro en geen producten).

## Resultaat

- Topmerken-strip op de homepage toont alle 10 logo's (5 bestaande + 5 nieuwe), gesorteerd op `sort_order`.
- Klikken op een nieuw logo gaat naar `/merk/{slug}` met merknaam, korte intro en lege productlijst.
- Geen aanpassingen aan `BrandsRow`/fallback-logica nodig — die werkt al generiek via signed URLs.

## Technisch

- Bucket `brand-logos` is privé; `getVisibleBrands` maakt jaar-geldige signed URLs aan — werkt direct.
- Geen schemawijziging nodig (alleen data-inserts via insert-tool + storage upload).
- `src/routes/index.tsx` blijft ongewijzigd.
