Verplaats de betaalopties (nu in gekleurde badges) en social media iconen naar de onderste copyright-balk van de footer, naast het KvK-nummer.

Wijzigingen:
1. **Verwijder** de "Betaal veilig met" + "Volg ons" kolom uit de footer grid.
2. **Pas het grid aan** van `lg:grid-cols-6` naar `lg:grid-cols-5` (5 kolommen: Klantenservice, Advies & inspiratie, Over VerfOnlineWinkel, Merken, RAL-kleuren).
3. **Update `PayBadge`**: maak een gekleurde variant met `bg` en `text` props — iDEAL oranje, Klarna roze, Visa blauw, Mastercard rood, Apple Pay zwart.
4. **Onderste balk**: voeg tussen copyright (links) en KvK (rechts) een rij toe met:
   - De gekleurde betaalbadges
   - Social iconen (Facebook, Instagram, YouTube) als kleine grijze iconen die oplichten bij hover

Het resultaat is een compacter footer-grid en een onderste balk die alle vertrouwens- en contact-elementen bevat.