import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readMin: number;
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
