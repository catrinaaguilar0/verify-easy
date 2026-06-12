## Wat we maken

Twee nieuwe interne blogpagina's (i.p.v. de huidige externe links) over de Kleur van het Jaar 2026 van Flexa en Sigma. Onder elke blog staat automatisch productadvies op merk + een CTA naar de verfmengservice. Daarnaast worden de twee blogs als kaarten getoond op `/hulp-en-advies`.

## Nieuwe interne pagina's

Beide pagina's hangen onder de bestaande route `/blog/$slug` (geen nieuwe route nodig — alleen data toevoegen).

### 1. `/blog/flexa-kleurfamilie-2026` — "Flexa Kleurfamilie 2026"
- Cover: Flexa hero (`CF26_Dulux-Consumer_C12_Hero-Banner_…png`)
- Korte intro + samenvatting van de Flexa-kleurfamilie 2026 (3–4 alinea's, NL).
- Externe bron-link naar `flexa.nl` onderaan.
- **Productadvies (automatisch op merk)**: alle Flexa-producten uit de catalogus (o.a. Flexa Powerdek Muurverf Mat) als productkaarten.
- **CTA-blok**: "Laat de Flexa Kleur van het Jaar mengen" → `/verfmengservice`.

### 2. `/blog/sigma-secret-safari-2026` — "Sigma Secret Safari — Kleur van het Jaar 2026"
- Cover: Sigma hero (`kleur-van-het-jaar-2026-secret-safari-hoofdbeeld.jpg`)
- Korte intro + uitleg over Secret Safari (PPG1110-4), het PARALLELS-thema en bijpassende tinten.
- Externe bron-link naar `sigma.nl` onderaan.
- **Productadvies (automatisch op merk)**: alle Sigma-producten uit de catalogus (o.a. Sigma Perfect Matt, Sigma S2U Allure) als productkaarten.
- **CTA-blok**: "Laat Secret Safari (PPG1110-4) mengen" → `/verfmengservice`.

## Wijzigingen op bestaande pagina's

### Homepage (`src/routes/index.tsx`)
De twee externe `<a target="_blank">` tegels (regels 248–282) worden vervangen door interne `<Link to="/blog/$slug">` naar de nieuwe slugs. Visueel blijft het identiek: 2 covers naast elkaar, alleen de foto, geen tekst.

### Hulp & Advies (`src/routes/hulp-en-advies.tsx`)
Onder de bestaande 4-tegel grid (Verfcalculator / Verfmengservice / Blog / Demonstraties) komt een nieuwe sectie **"Uitgelichte blogs"** met de twee covers + titel, elk linkend naar de interne blogpagina.

## Technische details

- In `src/lib/blog.ts` worden twee `BlogPost`-entries toegevoegd (slugs hierboven). Beide krijgen merk-tag (`flexa` / `sigma`) en passende `relatedProductSlugs`.
- Nieuwe veld op `BlogPost` is niet nodig: de bestaande `getRelatedProducts(slug)` levert al de productkaarten. Voor "automatisch op merk" vullen we `relatedProductSlugs` met alle catalogus-slugs van dat merk.
- De externe bron-URL slaan we op via een nieuw optioneel veld `sourceUrl?: string` op `BlogPost`, en tonen hem als "Bron: flexa.nl / sigma.nl" onderaan het artikel.
- De verfmengservice-CTA komt als nieuw blok in `src/routes/blog.$slug.tsx`, alleen zichtbaar als `BlogPost.mixCta` is gezet (`{ label, color? }`). Voor andere blogs verandert er niets.
- Voor de twee hero-afbeeldingen blijven we de externe URL's gebruiken (dezelfde die nu al op de homepage staan) — geen nieuwe assets nodig.
- SEO: elke nieuwe blog krijgt eigen `head()` met title, description, og:title, og:description en og:image (de cover).

## Wat we NIET aanpassen

- `/blog` listing, bestaande 4 blogposts en hun pagina's blijven ongewijzigd (de twee nieuwe verschijnen automatisch in de `/blog`-overzicht).
- Header-navigatie, routing config en `routeTree.gen.ts` blijven ongemoeid.
