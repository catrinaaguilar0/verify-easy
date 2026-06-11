Nieuw blogartikel toevoegen over Sigma's trendkleuren 2026 (PARALLELS-thema), met bronvermelding naar https://www.sigma.nl/kleur/trendkleuren.

## Wijzigingen

**1. `src/lib/blog.ts` — nieuw blogpost object toevoegen aan `posts`-array**

- `slug`: `"sigma-parallels-trendkleuren-2026"`
- `title`: "PARALLELS: Sigma's trendkleuren voor 2026"
- `excerpt`: Korte intro over Authentic, Visionary en Expressive — de drie kleurenthema's van Sigma voor 2026.
- `image`: hergebruik `blog1` (kleurtrends-afbeelding die al in assets staat).
- `category`: "Inspiratie"
- `author`: "Lisa van der Berg"
- `date`: "5 juni 2026"
- `readMin`: 6
- `tags`: ["kleur", "trends", "sigma", "inspiratie"]
- `relatedProductSlugs`: ["sigma-perfect-matt", "verfmengservice"]
- `body`:
  - intro paragraaf over PARALLELS-thema
  - h2 "Authentic — balans en betekenis" + paragraaf
  - h2 "Visionary — vooruitkijken met lef" + paragraaf
  - h2 "Expressive — optimistisch en speels" + paragraaf
  - h2 "Kleur van het Jaar: Secret Safari (PPG1110-4)" + paragraaf
  - h2 "Een greep uit het palet" + ul met o.a. Auburn Tress, Roman Bath, Pinetop, Midnight River, Boudoir Blue, Hint Of Ginger
  - paragraaf met bronvermelding: "Bron: Sigma — https://www.sigma.nl/kleur/trendkleuren"

## Opmerking over bronlink

De huidige blog-renderer (`src/routes/blog.$slug.tsx`) toont paragrafen als platte tekst zonder klikbare links. De bron-URL verschijnt dus als zichtbare tekst, niet als hyperlink. Als je een echte klikbare bronlink wilt, kan ik in een vervolgstap het type-systeem van `BlogPost.body` uitbreiden met een `source`-blok — laat het me weten.