# Homepage 1-op-1 namaken naar de referentie

Doel: de homepage (en de gedeelde Header) zo nauwkeurig mogelijk laten matchen met de geüploade afbeelding. Copy/producten blijven uit de bestaande catalogus.

## Volgorde van secties

1. **USP-topbalk** — donkerblauwe band, witte mini-tekst met iconen: Gratis verzending vanaf €50 · Voor 21:00 besteld, morgen in huis · 50.000+ kleuren mengbaar · Deskundig verfadvies · Zakelijk bestellen · Klantenservice.
2. **Header (donkerblauw)** — geel logo-vierkant met penseel + "VerfOnlineWinkel.nl" wit + tagline; brede witte zoekbalk met gele zoekknop; rechts "Mijn account / Inloggen | Registreren" en "Winkelwagen" met gele badge.
3. **Hoofdnavigatie (wit)** — VERF ▾ · LAK ▾ · BEITS ▾ · GRONDVERF ▾ · BENODIGDHEDEN · MERKEN · ADVIES & INSPIRATIE · rechts gele **AANBIEDINGEN**-pill.
4. **Hero** — bestaand hero-beeld, links donkere headline "Professionele verf, snel in huis" + subcopy + 2 CTA's ("Shop op klus" geel, "Bekijk alle producten" wit/outline). Daaronder Trustpilot-stijl rating-strip (groene sterren · 9,2/10 · Uitstekend · 12.500+ reviews). Rechts overlay-kaart **"Waar ga je mee aan de slag?"** met 4 klikbare rijen (Binnen / Buiten / Hout beschermen / Metaal & overig), elke rij icoon-badge + titel + sublabel, footerlink "Naar keuzehulp →".
5. **Klusblokken** — 6 kaarten op één rij: Muurverf · Binnenlak · Buitenlak · Beits · Grondverf · Benodigdheden. Icoon-badge linksboven, titel, korte sub, productbeeld erachter, hover-lift.
6. **Topmerken-strip** — label "Topmerken" + horizontale logoreeks (Sikkens, Sigma, Wijzonol, Flexa, Histor, +2 extra) met chevron rechts, klikbaar naar `/merk/$slug`.
7. **Meest verkocht** — sectiekop + "Bekijk alles" + prev/next chevrons; 6 productkaarten met ACTIE/POPULAIR-badge, naam, korte sub, prijs (doorgehaalde oude prijs bij actie), groene "Op voorraad", klein cart-icoon rechtsonder.
8. **Drie-koloms band** — **Kies je kleur** (kleurwaaier-beeld, CTA "Naar kleurkiezer") · **Verfadvies nodig?** (foto adviseur, bullets, CTA "Vraag advies") · **Nieuwsbrief** (e-mailinput + pijlknop, micro-copy).
9. **Trust-strip (lichtgrijs)** — Klantbeoordeling 9,2/10 (Kiyoh) · Gratis verzending vanaf €50 · Voor 21:00 besteld · Gratis retourneren binnen 30 dagen · Veilig betalen.
10. **Footer (donkerblauw)** — 4 kolommen (Klantenservice · Advies & inspiratie · Over VerfOnlineWinkel · Merken) + Volg ons (social) + Betaal veilig met (iDEAL, Klarna, Visa, Mastercard, Apple Pay) + copyright.

## Visuele tokens (`src/styles.css`)

Nieuwe semantische tokens (bestaande accent-green blijft voor "Op voorraad"):
- `--navy` / `--navy-soft` voor header- en footer-band
- `--cta` (geel) + `--cta-foreground` (donker) + `--cta-strong` voor knoppen, AANBIEDINGEN-pill, badges
- `--success` (groen) voor voorraad-check

## Bestanden

- **Edit** `src/styles.css` — extra tokens (navy, cta, success).
- **Rewrite** `src/components/site/Header.tsx` — USP-bar + donker headerblok + witte navbar met gele AANBIEDINGEN-pill. Bestaande zoek-/account-/cart-/wishlist-functionaliteit blijft 1:1 werken.
- **Rewrite homepage in** `src/routes/index.tsx` — secties 4 t/m 9 vervangen door de structuur hierboven; bestaande catalogus, RAL-data, assets en `BrandsGrid` hergebruiken. FAQ/reviews verdwijnen van de homepage (passen niet bij referentie).
- **Light edit** `src/components/site/Footer.tsx` — kolommen herschikken en betaal-iconen toevoegen.

## Buiten scope

- Geen wijzigingen aan andere routes/pagina's.
- Geen backend- of data-wijzigingen, geen nieuwe routes.
- Geen nieuwe productfoto's; alleen kleine inline SVG-betaalpictogrammen indien nodig.
