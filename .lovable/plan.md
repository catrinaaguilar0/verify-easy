Zet de "RAL-kleuren" en "Merken" kolommen naast elkaar in één rij, vervang "Merken" door "Populaire producten" (5 items, 5 rijen totaal).

Wijzigingen in `src/components/site/Footer.tsx`:

1. **Verwijder** de bestaande "Merken" kolom uit het `columns`-array.
2. **Vervang** door een nieuwe kolom "Populaire producten" met 5 bestseller-producten uit `PRODUCTS` (filter op `bestseller: true`, neem de eerste 5). Elke link gaat naar `/product/$slug`.
3. **RAL-kleuren kolom** blijft een 2-koloms grid met 10 kleuren — dat is al 5 rijen.
4. De grid blijft `lg:grid-cols-5`: Klantenservice, Advies & inspiratie, Over VerfOnlineWinkel, Populaire producten, RAL-kleuren — waarbij "Populaire producten" en "RAL-kleuren" als laatste twee kolommen naast elkaar staan.

Resultaat: footer toont nu populaire producten naast het RAL-blok, beide 5 rijen hoog.