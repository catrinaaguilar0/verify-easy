## Doel

Blogs zichtbaar maken op de homepage en in de hoofdnavigatie, passend bij de bestaande referentie-stijl.

## Wijzigingen

### 1. Homepage — nieuwe sectie "Laatste artikelen" (`src/routes/index.tsx`)
- Geplaatst direct boven de trust-strip (onder de drie-koloms band).
- Sectiekop "Laatste artikelen" + sublabel + rechts link "Naar alle artikelen →" (naar `/blog`).
- 3 kaarten op desktop (1 op mobiel) met de 3 nieuwste posts uit `src/lib/blog.ts` (`posts.slice(0, 3)`):
  - aspect-[4/3] cover image (lazy-loaded)
  - categorie-label in accent-kleur
  - titel (font-bold, hover → accent)
  - 2-regelige excerpt (line-clamp-2)
  - datum + leestijd in ink-soft
- Hover-lift en border-accent op hover, consistent met de bestaande klusblokken/product-grid.

### 2. Hoofdnavigatie — "ADVIES & INSPIRATIE" aansluiten (`src/components/site/Header.tsx`)
- Het bestaande item "ADVIES & INSPIRATIE" in de witte navbar wordt een `<Link to="/blog">` (was een dropdown/placeholder).
- Geen nieuwe dropdown: één directe link naar de bloglijst, conform de stijl van de andere top-level items.

## Buiten scope
- Geen nieuwe blogposts of contentwijzigingen.
- Geen wijzigingen aan `/blog` of `/blog/$slug` zelf.
- Geen footer-wijziging (niet gekozen door gebruiker).
