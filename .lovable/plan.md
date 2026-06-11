## Wijziging: review-rating vervangen door klantenservice-contact

In de footer-section "Altijd als eerste op de hoogte?" (nieuwsbrief + rating) wordt de rechterkolom (review-rating) vervangen door contactgegevens van de klantenservice.

### Huidige situatie
De footer heeft een 2-koloms grid:
- Links: nieuwsbrief-aanmelding (heading, omschrijving, e-mail + knop)
- Rechts: review-rating (9,4/10 tekst, sterren, badge)

### Gewenste situatie
- Links: nieuwsbrief-aanmelding (ongewijzigd)
- Rechts: klantenservice-contact met:
  - Telefoonnummer (klikbaar tel:-link) met Phone-icoon
  - E-mailadres (klikbaar mailto:-link) met Mail-icoon
  - Eventueel openingstijden/korte omschrijving

### Technische details
- Bestand: `src/components/site/Footer.tsx`
- `Phone` en `Mail` zijn al geïmporteerd vanuit `lucide-react`
- De rechterkolom-div (regels 73-84) wordt vervangen door de klantenservice-content
- Styling aansluiten bij bestaande design tokens (`text-ink`, `text-ink-soft`, `accent`, etc.)
- Geen wijzigingen in de linker nieuwsbrief-kolom