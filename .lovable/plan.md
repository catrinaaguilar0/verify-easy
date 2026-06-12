## Doel
Een nieuwe "Nieuwsbrief" kolom in de footer met e-mail invoerveld + aanmeldknop, en de Facebook/Instagram/YouTube icons direct daaronder. De aparte "Volg ons" kolom verdwijnt.

## Wijzigingen

### 1. Database (migration)
Nieuwe tabel `public.newsletter_subscribers`:
- `email` (text, uniek, niet-leeg)
- standaard timestamps

RLS aan. Policies:
- Iedereen (anon + authenticated) mag een nieuw e-mailadres toevoegen (INSERT).
- Alleen admins kunnen lezen/verwijderen.

GRANT INSERT aan anon + authenticated, GRANT ALL aan service_role, GRANT SELECT/DELETE aan authenticated (voor admin via RLS).

### 2. Server function
`src/lib/newsletter.functions.ts` — `subscribeNewsletter` createServerFn:
- Zod validatie (email, max 255 chars)
- Insert in `newsletter_subscribers` via `supabaseAdmin` (geladen binnen handler)
- Bij duplicate (unique violation): nette success-response teruggeven (geen foutmelding lekken)

### 3. Footer (`src/components/site/Footer.tsx`)
- Verwijder de aparte "Volg ons" kolom.
- Vervang door één "Nieuwsbrief" kolom met:
  - Korte tekst: "Ontvang acties en kleurinspiratie"
  - `<form>` met e-mailveld + "Aanmelden" knop (gebruikt `useServerFn` + toast voor feedback)
  - Daaronder de drie social icons (Facebook, Instagram, YouTube) in dezelfde witte ronde stijl als nu.
- Grid blijft `lg:grid-cols-6` (4 link-kolommen + Nieuwsbrief + Betaal veilig met).

## Technische details
- E-mail validatie client-side met Zod + server-side opnieuw.
- Geen PII gelogd.
- Toast via bestaande `sonner` integratie.
