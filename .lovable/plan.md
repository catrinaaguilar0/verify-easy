## Hero Lavender Achtergrond

### Doel
De hero-sectie op de homepage krijgt een zachte lavender achtergrondkleur, geïnspireerd op Flexa Pure Lavender.

### Wijzigingen

1. **Design token toevoegen** (`src/styles.css`)
   - Voeg een nieuwe `--lavender` variabele toe in `:root` met een zachte paarse/lavender tint (`oklch(0.88 0.04 290)`)
   - Registreer het in `@theme inline` als `--color-lavender` zodat Tailwind `bg-lavender` begrijpt

2. **Hero component aanpassen** (`src/routes/index.tsx`)
   - Wijzig `bg-surface` → `bg-lavender` op de hero `<section>`

### Technische details
- De lavender kleur (`oklch(0.88 0.04 290)`) is een zachte, lichte paarse tint die goed contrasteert met de donkere tekst (`text-ink`) en het groene accent (`text-accent`)
- De kleur is subtiel genoeg om professioneel te blijven, maar geeft de hero een karakteristiek en herkenbaar uiterlijk
- Alle bestaande elementen (tekst, buttons, afbeelding) blijven ongewijzigd