## Footer aanpassingen

Bestand: `src/components/site/Footer.tsx`

### 1. Kolomvolgorde
Nieuwe volgorde (5 kolommen, links → rechts):
1. **Populaire producten** (verplaatst naar voren)
2. Klantenservice
3. Advies & inspiratie
4. Over VerfOnlineWinkel
5. **Ralkleur**

### 2. Ralkleur-kolom
- Titel wijzigen: `RAL-kleuren` → `Ralkleur`
- Toon alleen de RAL-code (geen kleurnaam erachter), bv. `RAL 9010` i.p.v. `RAL 9010 – Zuiver wit`
- 4 RAL-codes uit `basicRalColors.slice(0, 4)`
- 5e regel = link `Alle RAL-kleuren` → `/ral`

### 3. Gelijke uitlijning
Alle kolommen krijgen exact 5 regels onder de titel, dezelfde tekstgrootte (`text-sm`) en spacing (`space-y-1`), zodat ze visueel op één lijn staan.

### Resultaat per kolom (5 items elk)
```
Populaire producten | Klantenservice | Advies & inspiratie | Over VOW         | Ralkleur
─────────────────── | ───────────── | ─────────────────── | ──────────────── | ──────────────────
Product 1           | Contact       | Verfkeuze           | Over ons         | RAL 9010
Product 2           | FAQ           | Kleuradvies         | Zakelijk         | RAL 9016
Product 3           | Verzending    | Kluswijzer          | Onze winkels     | RAL 7016
Product 4           | Retourneren   | Blogs               | Vacatures        | RAL 9005
Product 5           | Betalen       | Video's             | Voorwaarden      | Alle RAL-kleuren
```
