## Naam wijzigen naar Nieuweverf.nl

Vervang alle voorkomens van "VerfOnlineWinkel" / "verfonlinewinkel" door "Nieuweverf" / "nieuweverf" in de hele codebase.

### Wijzigingen

- **Header logo** (`src/components/site/Header.tsx`): `VerfOnlineWinkel.nl` → `Nieuweverf.nl` (met `.nl` in cta-kleur, zoals nu)
- **Footer** (`src/components/site/Footer.tsx`): bedrijfsnaam, copyright, e-mailadressen
- **Root SEO** (`src/routes/__root.tsx`): `SITE_NAME`, titel, og:title, twitter:title, descriptions, JSON-LD Organization
- **Alle routebestanden** (28 bestanden): vervang merknaam in titles, meta descriptions, og-tags, broodtekst, e-mailadressen (`info@verfonlinewinkel.nl` → `info@nieuweverf.nl`), Twitter handle (`@verfonlinewinkel` → `@nieuweverf`)
- **Blog content** (`src/lib/blog.ts`): merknaam in tekst

### Niet wijzigen

- `SITE_URL` in `__root.tsx` (`cozy-check-hub.lovable.app`) — dat is de Lovable preview-URL, geen merknaam
- Productdata/merken in catalogus (Sikkens, Sigma, etc.)
- Auto-gegenereerde bestanden (`routeTree.gen.ts`, Supabase integratie)

### Aanpak

Eén globale find/replace ronde (case-sensitive variaties: `VerfOnlineWinkel`, `verfonlinewinkel`) over alle 30 gevonden bestanden, daarna verificatie met `rg` dat er geen oude verwijzingen meer zijn.
