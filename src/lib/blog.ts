import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blogGlas from "@/assets/blog-glas-verven.jpg";
import prodSikkens from "@/assets/prod-sikkens.jpg";
import prodSigma from "@/assets/prod-sigma.jpg";
import prodWijzonol from "@/assets/prod-wijzonol.jpg";
import prodFlexa from "@/assets/prod-flexa.jpg";

export type RelatedProduct = {
  slug: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  // Descriptive anchor text used to link to the product from a blog post
  anchor: string;
  // Where the product currently lives on the site
  to: "/muurverf" | "/verfmengservice";
};

export const productsCatalog: Record<string, RelatedProduct> = {
  "sikkens-alphacryl-pure-mat": {
    slug: "sikkens-alphacryl-pure-mat",
    name: "Sikkens Alphacryl Pure Mat",
    brand: "Sikkens",
    price: "€40,95",
    image: prodSikkens,
    anchor: "Sikkens Alphacryl Pure Mat — fluweelmatte muurverf voor woon- en slaapkamer",
    to: "/muurverf",
  },
  "sigma-perfect-matt": {
    slug: "sigma-perfect-matt",
    name: "Sigma Perfect Matt",
    brand: "Sigma",
    price: "€38,95",
    image: prodSigma,
    anchor: "Sigma Perfect Matt — warme aardetinten op een matte muur",
    to: "/muurverf",
  },
  "wijzonol-muurverf-extra-mat": {
    slug: "wijzonol-muurverf-extra-mat",
    name: "Wijzonol Muurverf Extra Mat",
    brand: "Wijzonol",
    price: "€36,50",
    image: prodWijzonol,
    anchor: "Wijzonol Muurverf Extra Mat — diepe dekking voor terracotta en oker",
    to: "/muurverf",
  },
  "flexa-powerdek-mat": {
    slug: "flexa-powerdek-mat",
    name: "Flexa Powerdek Muurverf Mat",
    brand: "Flexa",
    price: "€42,95",
    image: prodFlexa,
    anchor: "Flexa Powerdek Muurverf Mat — koele tinten en strakke afwerking",
    to: "/muurverf",
  },
  "verfmengservice": {
    slug: "verfmengservice",
    name: "Verfmengservice op maat",
    brand: "Nieuweverf",
    price: "Gratis advies",
    image: blog1,
    anchor: "Laat jouw kleur gratis mengen met onze verfmengservice",
    to: "/verfmengservice",
  },
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readMin: number;
  tags: string[];
  relatedProductSlugs: string[];
  body: { type: "p" | "h2" | "ul"; text?: string; items?: string[] }[];
  sourceUrl?: string;
  sourceLabel?: string;
  mixCta?: { label: string; description?: string };
};


export const posts: BlogPost[] = [
  {
    slug: "sigma-parallels-trendkleuren-2026",
    title: "PARALLELS: Sigma's trendkleuren voor 2026",
    excerpt: "Sigma presenteert voor 2026 het trendthema PARALLELS met drie kleurenpaletten: Authentic, Visionary en Expressive. Wij vatten samen wat deze richtingen betekenen en welke tinten erbij horen.",
    image: blog1,
    category: "Inspiratie",
    author: "Lisa van der Berg",
    date: "5 juni 2026",
    readMin: 6,
    tags: ["kleur", "trends", "sigma", "inspiratie"],
    relatedProductSlugs: ["sigma-perfect-matt", "verfmengservice"],
    body: [
      { type: "p", text: "Authenticiteit, verbeelding en expressie — dat zijn volgens Sigma de kernwoorden voor 2026. Onder de noemer PARALLELS bundelt het merk drie kleurenthema's die laten zien hoe universele krachten ons verbinden, terwijl iedereen toch zijn eigen weg kiest. We zetten de drie richtingen op een rij." },
      { type: "h2", text: "Authentic — balans en betekenis" },
      { type: "p", text: "Echt en tijdloos. Authentic draait om duurzame keuzes, nostalgie en vakmanschap. Aardse tonen en vertrouwde accenten geven rust, warmte en geborgenheid — perfect voor wie zoekt naar een interieur dat blijft in plaats van verdwijnt." },
      { type: "h2", text: "Visionary — vooruitkijken met lef en verbeelding" },
      { type: "p", text: "Dit palet weerspiegelt onze behoefte aan bescherming én aan vrijheid. Contrasterende kleuren en innovatieve materialen creëren spanning en diepte. Van lichte, etherische tinten tot rijke donkere tonen: Visionary laat zien hoe toekomst en veiligheid hand in hand gaan." },
      { type: "h2", text: "Expressive — optimistisch, speels en verrassend" },
      { type: "p", text: "Expressive viert creativiteit en fantasie, geïnspireerd door humor, gaming en surrealistische vormen. Heldere, energieke kleuren en ongewone combinaties zorgen voor een vrolijke, dromerige sfeer die uitnodigt om grenzen te verleggen." },
      { type: "h2", text: "Kleur van het Jaar: Secret Safari (PPG1110-4)" },
      { type: "p", text: "Sigma kroont Secret Safari tot Kleur van het Jaar 2026: een subtiel olijf-limoengroen met een organische, minerale uitstraling. De tint brengt balans en optimisme, en combineert prachtig met natuurlijke materialen of glanzende metalen accenten." },
      { type: "h2", text: "Een greep uit het palet" },
      { type: "ul", items: [
        "Auburn Tress (PPG1070-6) — warme roodbruine accenttint",
        "Roman Bath (PPG1198-5) — gedempt grijsblauw",
        "Pinetop (PPG1125-7) — diep dennengroen",
        "Hint Of Ginger (PPG1077-2) — zachte gemberbeige",
        "Midnight River (PPG1035-7) — diep nachtblauw",
        "Boudoir Blue (PPG1244-4) — fluweelig pauwblauw",
      ] },
      { type: "p", text: "Alle PARALLELS-tinten zijn gebaseerd op de PPG-kleurcodes en kunnen wij voor je mengen in elk type muurverf — van mat tot zijdeglans. Lever de code aan en wij doen de rest." },
      { type: "p", text: "Bron: Sigma — https://www.sigma.nl/kleur/trendkleuren" },
    ],
  },
  {
    slug: "kleurtrends-2026",
    title: "De kleurtrends van 2026: aardetinten, salie en diep oceaanblauw",
    excerpt: "Warme aardetinten, zachte salie en diep oceaanblauw geven jouw interieur volgend seizoen rust en karakter. Wij zetten de belangrijkste tinten op een rij.",
    image: blog1,
    category: "Inspiratie",
    author: "Lisa van der Berg",
    date: "12 mei 2026",
    readMin: 5,
    tags: ["kleur", "trends", "muurverf", "inspiratie"],
    relatedProductSlugs: ["sigma-perfect-matt", "wijzonol-muurverf-extra-mat", "verfmengservice"],
    body: [
      { type: "p", text: "Na jaren van koele grijstinten en strakke witten gaat 2026 over warmte, textuur en natuurlijke verbinding. Interieurontwerpers wereldwijd kiezen voor kleuren die teruggrijpen op de natuur — denk aan klei, mos en avondlucht." },
      { type: "h2", text: "Warme aardetinten" },
      { type: "p", text: "Terracotta, klei en gebrande oker maken een grote comeback. Deze tinten werken prachtig in een woonkamer of hal en combineren naadloos met natuurlijke materialen als hout, linnen en jute. Tip: gebruik een matte muurverf voor een fluweelzachte uitstraling." },
      { type: "h2", text: "Salie en mosgroen" },
      { type: "p", text: "Groen blijft, maar verschuift van diepe smaragd naar zachte salie en gedempt mosgroen. Een ideale kleur voor de slaapkamer — rustgevend zonder somber te worden." },
      { type: "h2", text: "Diep oceaanblauw" },
      { type: "p", text: "Voor wie durft: een diep, bijna inktblauwe muur als statement in de eetkamer of studeerkamer. Combineer met warm messing en houtaccenten voor een tijdloze look." },
      { type: "ul", items: ["RAL 7034 Geelgrijs voor een warme basis", "NCS S 4020-G30Y voor zachte salie", "RAL 5004 Zwartblauw voor een durfdurfwand"] },
    ],
  },
  {
    slug: "muurverf-kiezen",
    title: "Welke muurverf past bij jouw kamer?",
    excerpt: "Mat, zijdemat of satin? Niet elke muurverf is geschikt voor elke ruimte. Een praktische gids voor woonkamer, slaapkamer, badkamer en hal.",
    image: blog2,
    category: "Advies",
    author: "Mark de Wit",
    date: "28 april 2026",
    readMin: 6,
    tags: ["muurverf", "advies", "glansgraad"],
    relatedProductSlugs: ["sikkens-alphacryl-pure-mat", "flexa-powerdek-mat", "sigma-perfect-matt"],
    body: [
      { type: "p", text: "De keuze voor het juiste type muurverf bepaalt voor een groot deel hoe je kamer er straks uitziet — en hoelang dat resultaat mooi blijft. Wij leggen het verschil uit." },
      { type: "h2", text: "Mat: rustig en stijlvol" },
      { type: "p", text: "Matte muurverf reflecteert nauwelijks licht en geeft kleuren extra diepte. Perfect voor woonkamers en slaapkamers, maar minder geschikt voor vochtige ruimtes of plekken waar veel afgenomen wordt." },
      { type: "h2", text: "Zijdemat: praktisch en mooi" },
      { type: "p", text: "De gulden middenweg. Zijdemat is iets reinigbaarder dan mat, met een subtiele glans. Ideaal voor halls, kinderkamers en keukens." },
      { type: "h2", text: "Satin en hoogglans" },
      { type: "p", text: "Goed afwasbaar en vochtbestendig — gebruik in badkamer of toilet. Let op: glans laat oneffenheden in de muur sneller zien." },
    ],
  },
  {
    slug: "deuren-en-kozijnen-lakken",
    title: "Deuren en kozijnen lakken: stap voor stap",
    excerpt: "Een strak gelakte deur tilt je hele interieur naar een hoger niveau. Wij laten zien hoe je het zelf perfect aanpakt — van voorbehandelen tot eindlaag.",
    image: blog3,
    category: "Doe-het-zelf",
    author: "Sanne Hoekstra",
    date: "15 april 2026",
    readMin: 8,
    tags: ["lak", "doe-het-zelf", "advies"],
    relatedProductSlugs: ["sikkens-alphacryl-pure-mat", "verfmengservice"],
    body: [
      { type: "p", text: "Lakken lijkt simpel, maar het verschil tussen een amateurklus en een vakmanschap-resultaat zit in de voorbereiding. Met dit stappenplan kom je heel ver." },
      { type: "h2", text: "1. Voorbereiding" },
      { type: "p", text: "Haal de deur uit de scharnieren en demonteer alle beslag. Schuur het oppervlak licht op met korrel 180 en ontvet met ammonia." },
      { type: "h2", text: "2. Grondverf" },
      { type: "p", text: "Een goede grondverf zorgt voor hechting en dekking. Kies een watergedragen primer voor binnendeuren — sneldrogend en reukarm." },
      { type: "h2", text: "3. Lak aanbrengen" },
      { type: "p", text: "Werk met een goede lakkwast of vooral met een vachtroller voor het strakste resultaat. Twee dunne lagen geven een mooier eindresultaat dan één dikke laag." },
      { type: "ul", items: ["Werk in een stofvrije ruimte", "Tussenschuren met korrel 240", "Tweede laag pas na 16 uur droging"] },
    ],
  },
  {
    slug: "flexa-kleurfamilie-2026",
    title: "Flexa Kleurfamilie 2026: warme, verbindende tinten voor je interieur",
    excerpt: "Flexa presenteert voor 2026 een kleurfamilie waarin warmte, verbinding en natuurlijke nuances centraal staan. We zetten de richting en bijpassende tinten op een rij.",
    image: "https://digital.brand.akzonobel.com/m/70c1676473bced0c/CF26_Dulux-Consumer_C12_Hero-Banner_1900x765_Desktop.png",
    category: "Inspiratie",
    author: "Nieuweverf-redactie",
    date: "10 juni 2026",
    readMin: 4,
    tags: ["kleur", "trends", "flexa", "inspiratie", "muurverf"],
    relatedProductSlugs: ["flexa-powerdek-mat", "verfmengservice"],
    sourceUrl: "https://www.flexa.nl/nl/flexa-kleurfamilie-van-2026",
    sourceLabel: "flexa.nl",
    mixCta: {
      label: "Laat de Flexa Kleur van het Jaar mengen",
      description: "Wij mengen elke tint uit de Flexa Kleurfamilie 2026 in jouw favoriete afwerking — gratis advies, scherp geprijsd.",
    },
    body: [
      { type: "p", text: "Met de Kleurfamilie van 2026 zet Flexa in op tinten die warmte en verbondenheid uitstralen. Geen koele grijzen meer als vanzelfsprekende basis, maar zachte, aardse nuances die ruimtes laten ademen en mensen samenbrengen." },
      { type: "h2", text: "De richting voor 2026" },
      { type: "p", text: "De kleurfamilie draait om balans tussen rust en karakter. Zachte beiges, romige witten en gedempte aardetinten vormen de basis; krachtigere accenten in terracotta, mosgroen en diepblauw geven elke ruimte een eigen verhaal." },
      { type: "h2", text: "Hoe je de kleuren combineert" },
      { type: "p", text: "Een matte afwerking versterkt het natuurlijke karakter van deze tinten. Combineer ze met hout, linnen en keramiek voor een tijdloos resultaat. Werk met één hoofdkleur op de grote muurvlakken en gebruik een accenttint op een nis, deur of kozijn." },
      { type: "h2", text: "Welke verf past hierbij?" },
      { type: "p", text: "Flexa Powerdek Muurverf Mat is de logische keuze voor de muren: hoge dekking, fluweelmatte afwerking en eenvoudig te verwerken. Wil je een specifieke kleur uit de Kleurfamilie 2026? Wij mengen elke tint in de verf en afwerking van jouw keuze." },
      { type: "p", text: "Meer inspiratie en het volledige verhaal lees je op de website van Flexa." },
    ],
  },
  {
    slug: "sigma-secret-safari-2026",
    title: "Sigma Secret Safari — Kleur van het Jaar 2026",
    excerpt: "Sigma kroont Secret Safari (PPG1110-4) tot Kleur van het Jaar 2026: een subtiel olijf-limoengroen uit het PARALLELS-thema dat balans en optimisme brengt.",
    image: "https://stcacnlsigmanlprd01.blob.core.windows.net/content/kleur-van-het-jaar-2026-secret-safari-hoofdbeeld.jpg",
    category: "Inspiratie",
    author: "Nieuweverf-redactie",
    date: "10 juni 2026",
    readMin: 5,
    tags: ["kleur", "trends", "sigma", "inspiratie", "muurverf"],
    relatedProductSlugs: ["sigma-perfect-matt", "verfmengservice"],
    sourceUrl: "https://www.sigma.nl/blog/secret-safari-sigma-kleur-van-het-jaar-2026",
    sourceLabel: "sigma.nl",
    mixCta: {
      label: "Laat Secret Safari (PPG1110-4) mengen",
      description: "We mengen Secret Safari en alle andere PARALLELS-tinten in elk Sigma-product — van mat tot zijdeglans.",
    },
    body: [
      { type: "p", text: "Sigma kiest voor 2026 een tint die rust en lichtheid combineert: Secret Safari (PPG1110-4), een zacht olijf-limoengroen met een minerale, organische uitstraling. De kleur past in het overkoepelende PARALLELS-thema dat draait om authenticiteit, verbeelding en expressie." },
      { type: "h2", text: "Waarom Secret Safari?" },
      { type: "p", text: "Secret Safari is een neutrale, kalme groentint die nét genoeg karakter heeft om een ruimte te dragen zonder te overheersen. Hij brengt de natuur naar binnen en werkt zowel in een woonkamer als in een werkruimte of slaapkamer." },
      { type: "h2", text: "Combineren met andere tinten" },
      { type: "p", text: "De kleur combineert prachtig met warme aardetinten, natuurlijke materialen als eikenhout en linnen, en glanzende metalen accenten in messing of brons. Voor een rustige basis: combineer met gebroken wit of een zachte beige. Voor meer spanning: een diepere groene of bruine accentkleur." },
      { type: "h2", text: "Een greep uit het PARALLELS-palet" },
      { type: "ul", items: [
        "Secret Safari (PPG1110-4) — Kleur van het Jaar 2026",
        "Auburn Tress (PPG1070-6) — warm roodbruin accent",
        "Roman Bath (PPG1198-5) — gedempt grijsblauw",
        "Pinetop (PPG1125-7) — diep dennengroen",
        "Hint Of Ginger (PPG1077-2) — zachte gemberbeige",
        "Boudoir Blue (PPG1244-4) — fluweelig pauwblauw",
      ] },
      { type: "h2", text: "Welke verf past hierbij?" },
      { type: "p", text: "Sigma Perfect Matt is een veelgekozen optie voor de muur: diep matte afwerking, hoge dekking en goed reinigbaar. Wij mengen Secret Safari en het volledige PPG-palet in elk Sigma-product van jouw keuze." },
      { type: "p", text: "Lees het volledige verhaal en bekijk meer beeld op de website van Sigma." },
    ],
  },
  {
    slug: "glas-verven-stappenplan",
    title: "Glas verven: stappenplan voor een strak resultaat",
    excerpt: "Glas schilderen vraagt om de juiste voorbereiding en een speciale primer. In dit stappenplan lees je hoe je ramen, glas-in-lood en decoratief glas duurzaam en strak verft.",
    image: blogGlas,
    category: "Doe-het-zelf",
    author: "Mark de Wit",
    date: "11 juni 2026",
    readMin: 7,
    tags: ["glas schilderen", "glas verven", "doe-het-zelf", "lak", "advies"],
    relatedProductSlugs: ["sikkens-alphacryl-pure-mat", "verfmengservice"],
    body: [
      { type: "p", text: "Glas verven is geen onmogelijke klus, maar het oppervlak is glad, niet-poreus en hecht niet vanzelf. Met de juiste voorbehandeling, een speciale glasprimer (zoals een multiprimer) en de juiste lak krijg je een strak en duurzaam resultaat — of het nu om een raam, een glazen deur of een decoratieve fles gaat." },
      { type: "h2", text: "Wat heb je nodig?" },
      { type: "ul", items: [
        "Multiprimer of glasprimer (essentieel voor hechting)",
        "Watergedragen of alkyd lak in gewenste kleur en glansgraad",
        "Ontvetter (ammonia of speciale glasreiniger)",
        "Schuurpapier korrel 240 en een fijn schuursponsje",
        "Fijne lakkwast en/of een vachtroller met korte pool",
        "Afplaktape (low-tack) en afdekfolie",
      ] },
      { type: "h2", text: "1. Voorbereiding: schoon en vetvrij" },
      { type: "p", text: "Reinig het glas grondig met een ontvetter of een oplossing van ammonia. Stof, vingerafdrukken en silicoonresten zorgen ervoor dat verf later loslaat. Plak randen, kozijnen en sponningen netjes af." },
      { type: "h2", text: "2. Licht opruwen" },
      { type: "p", text: "Schuur het glas heel licht op met een fijn schuursponsje of korrel 240. Je hoeft geen krassen aan te brengen — een mat oppervlak is genoeg om de primer beter te laten hechten. Veeg het schuurstof weg en ontvet opnieuw." },
      { type: "h2", text: "3. Multiprimer aanbrengen" },
      { type: "p", text: "Dit is de belangrijkste stap. Breng een dunne, gelijkmatige laag multiprimer of glasprimer aan met een fijne kwast of vachtroller. Een goede primer zoals een acryl multiprimer hecht op gladde oppervlakken én vormt een ideale ondergrond voor de eindlak. Laat drogen volgens de instructies op de verpakking — meestal 4 tot 6 uur." },
      { type: "h2", text: "4. Eerste laklaag" },
      { type: "p", text: "Werk met een goede lakkwast voor detailwerk en een vachtroller voor grotere vlakken. Breng dunne lagen aan — twee dunne lagen geven altijd een mooier resultaat dan één dikke. Werk in één richting voor een gelijkmatige structuur." },
      { type: "h2", text: "5. Tussenschuren en tweede laag" },
      { type: "p", text: "Laat de eerste laag minimaal 16 uur drogen. Schuur licht tussendoor met korrel 320 voor een fluweelzachte ondergrond. Stof afnemen en breng dan de tweede en laatste laag aan. Voor maximale slijtvastheid, vooral op deuren of buitenglas, kan een derde laag verstandig zijn." },
      { type: "h2", text: "Tips voor specifieke situaties" },
      { type: "ul", items: [
        "Glas-in-lood: gebruik een fijne kwast en werk in korte, gecontroleerde streken",
        "Buitenramen: kies een UV-bestendige buitenlak en behandel ook de kozijnranden",
        "Decoratief / hobby glas: glasverf met inbrandfunctie (oven) is een alternatief voor blijvend resultaat",
        "Spiegels en gehard glas: hechting blijft moeilijker — test eerst op een onopvallend deel",
      ] },
      { type: "h2", text: "Welke verf adviseren wij?" },
      { type: "p", text: "Voor binnentoepassingen is een watergedragen lak in combinatie met een acryl multiprimer een prima keuze: reukarm, snel droog en goed reinigbaar. Voor buiten of intensief gebruik kies je een alkyd lak voor extra slijtvastheid. Twijfel je over de juiste combinatie? Wij denken graag met je mee en mengen elke gewenste kleur via onze verfmengservice." },
    ],
  },
];







export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

// Returns related posts ranked by shared tag overlap (excludes the current post).
export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = getPost(slug);
  if (!current) return [];
  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

export function getRelatedProducts(slug: string): RelatedProduct[] {
  const post = getPost(slug);
  if (!post) return [];
  return post.relatedProductSlugs
    .map((s) => productsCatalog[s])
    .filter((p): p is RelatedProduct => Boolean(p));
}
