# Plan: Verrijk categoriepagina's met beschrijvingen en kenmerken

## Doel
Elke categoriepagina (muurverf, lakverf, beits, grondverf, buitenverf, benodigdheden) krijgt — net als de merkpagina's — een eigen beschrijving, USP's en een informatieve sidebar. Hierdoor verschijnen de nieuwe producten in een rijkere context met SEO-vriendelijke tekst.

## Aanpak

### 1. Uitbreiden CATALOG in `src/lib/catalog.ts`
Toevoegen aan de export:

```typescript
export const CATEGORY_INFO: Record<string, { 
  description: string; 
  whenToUse: string[]; 
  tips: string[];
}> = {
  muurverf: {
    description: "...",
    whenToUse: ["...", "...", "..."],
    tips: ["...", "...", "..."]
  },
  // etc. voor alle 6 categorieën
}
```

### 2. Herbouw `src/routes/categorie.$slug.tsx`
- Vervang de huidige eenvoudige header door een rijkere layout zoals `merk.$slug.tsx`.
- Voeg een sidebar toe met:
  - Categoriebeschrijving
  - "Wanneer gebruik je ..." lijst
  - Tips voor het beste resultaat
  - Verfmengservice CTA
- Behoud het bestaande filter- en productgrid-gedrag.

### 3. SEO
Elke categorie krijgt een uniekere meta-description gebaseerd op de categorie-inhoud.

## Technische details
- Geen nieuwe dependencies.
- Hergebruik bestaande iconen (ShieldCheck, Lightbulb, Paintbrush, etc.).
- Layout: `lg:grid-cols-[1fr_320px]` (grid + sidebar), consistent met merkpagina.
