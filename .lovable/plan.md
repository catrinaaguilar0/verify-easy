Verklein de witruimte in de header op twee plekken in `src/components/site/Header.tsx`:

1. **Hoofdheader** (regel 38): `gap-8` → `gap-4` om logo, zoekbalk en iconen compacter te plaatsen.
2. **Account/Winkelwagen nav** (regel 67): `gap-6` → `gap-4`.
3. **Categorie-navigatie** (regel 86): `gap-x-6` → `gap-x-3` om de categorie-links dichter op elkaar te zetten.

Eventueel ook de verticale padding in de categoriebalk (regel 86 `py-3` → `py-2`) verkleinen voor een nog compactere look.