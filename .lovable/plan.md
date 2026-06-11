## Trust Bar Orange Achtergrond

### Doel
De bovenste trust bar in de header krijgt een fel oranje achtergrondkleur met donkere tekst voor goed contrast.

### Wijzigingen

1. **Design token toevoegen** (`src/styles.css`)
   - Voeg een nieuwe `--color-orange` variabele toe in `:root` (vibrant orange, bijv. `oklch(0.65 0.2 55)` of hex `#F97316`)
   - Registreer het in `@theme inline` als `--color-orange` zodat Tailwind `bg-orange` begrijpt

2. **Header component aanpassen** (`src/components/site/Header.tsx`)
   - Wijzig `bg-surface` → `bg-orange` op de trust bar wrapper
   - Wijzig `text-ink-soft` → `text-ink` (donkere tekst) op de trust bar tekst
   - Behoud het groene check-icoon (`text-accent`) voor consistentie met de rest van het design

### Resultaat
Een opvallende, fel oranje trust bar met donkere, goed leesbare tekst die direct de aandacht trekt bij het openen van de pagina.