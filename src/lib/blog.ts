import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
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
    brand: "VerfOnlineWinkel",
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
};

export const posts: BlogPost[] = [
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
