import prodSikkens from "@/assets/prod-sikkens.jpg";
import prodSigma from "@/assets/prod-sigma.jpg";
import prodWijzonol from "@/assets/prod-wijzonol.jpg";
import prodFlexa from "@/assets/prod-flexa.jpg";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "muurverf" | "lakverf" | "beits" | "grondverf" | "buitenverf" | "benodigdheden";
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  bestseller?: boolean;
  applications: string[]; // binnen / buiten / hout / metaal / muur
  finish?: "mat" | "zijdeglans" | "hoogglans" | "satijn";
  volume?: string; // "2,5 L"
  coverage?: number; // m² per liter
  shortDescription: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "p-001",
    slug: "sikkens-alphacryl-pure-mat-sf-2-5l",
    name: "Sikkens Alphacryl Pure Mat SF",
    brand: "Sikkens",
    category: "muurverf",
    price: 44.95,
    oldPrice: 52.0,
    image: prodSikkens,
    rating: 4.8,
    reviews: 128,
    inStock: true,
    bestseller: true,
    applications: ["binnen", "muur", "plafond"],
    finish: "mat",
    volume: "2,5 L",
    coverage: 10,
    shortDescription: "Professionele muurverf met diepmatte afwerking en perfecte dekking.",
  },
  {
    id: "p-002",
    slug: "sigma-s2u-allure-gloss-2-5l",
    name: "Sigma S2U Allure Gloss",
    brand: "Sigma",
    category: "lakverf",
    price: 49.95,
    image: prodSigma,
    rating: 4.7,
    reviews: 96,
    inStock: true,
    bestseller: true,
    applications: ["binnen", "buiten", "hout", "metaal"],
    finish: "hoogglans",
    volume: "2,5 L",
    coverage: 12,
    shortDescription: "Hoogwaardige hoogglans lakverf voor binnen- en buitenwerk.",
  },
  {
    id: "p-003",
    slug: "wijzonol-lbh-sdt-ultra-hoogglans-2-5l",
    name: "Wijzonol LBH SDT Ultra Hoogglans",
    brand: "Wijzonol",
    category: "lakverf",
    price: 39.5,
    image: prodWijzonol,
    rating: 4.6,
    reviews: 74,
    inStock: true,
    bestseller: true,
    applications: ["binnen", "hout"],
    finish: "hoogglans",
    volume: "2,5 L",
    coverage: 12,
    shortDescription: "Strakke hoogglanslak met uitstekende vloei en duurzaamheid.",
  },
  {
    id: "p-004",
    slug: "flexa-powerdek-muurverf-mat-2-5l",
    name: "Flexa Powerdek Muurverf Mat",
    brand: "Flexa",
    category: "muurverf",
    price: 42.95,
    image: prodFlexa,
    rating: 4.5,
    reviews: 85,
    inStock: true,
    bestseller: true,
    applications: ["binnen", "muur"],
    finish: "mat",
    volume: "2,5 L",
    coverage: 10,
    shortDescription: "Extra dekkende muurverf — vaak in één laag klaar.",
  },
  {
    id: "p-005",
    slug: "sikkens-rubbol-bl-rezisto-satin-1l",
    name: "Sikkens Rubbol BL Rezisto Satin",
    brand: "Sikkens",
    category: "lakverf",
    price: 34.5,
    image: prodSikkens,
    rating: 4.7,
    reviews: 52,
    inStock: true,
    isNew: true,
    applications: ["binnen", "hout", "metaal"],
    finish: "satijn",
    volume: "1 L",
    coverage: 11,
    shortDescription: "Krasvaste satijnlak voor intensief gebruikte oppervlakken.",
  },
  {
    id: "p-006",
    slug: "sigma-perfect-matt-5l",
    name: "Sigma Perfect Matt",
    brand: "Sigma",
    category: "muurverf",
    price: 64.95,
    image: prodSigma,
    rating: 4.6,
    reviews: 41,
    inStock: true,
    isNew: true,
    applications: ["binnen", "muur", "plafond"],
    finish: "mat",
    volume: "5 L",
    coverage: 11,
    shortDescription: "Diepmatte muurverf met fluweelzachte uitstraling.",
  },
  {
    id: "p-007",
    slug: "wijzonol-grondverf-universeel-2-5l",
    name: "Wijzonol Universele Grondverf",
    brand: "Wijzonol",
    category: "grondverf",
    price: 28.95,
    image: prodWijzonol,
    rating: 4.4,
    reviews: 33,
    inStock: true,
    applications: ["binnen", "buiten", "hout", "metaal"],
    volume: "2,5 L",
    coverage: 9,
    shortDescription: "Hechtende grondverf voor vrijwel alle ondergronden.",
  },
  {
    id: "p-008",
    slug: "flexa-buitenlak-zijdeglans-2-5l",
    name: "Flexa Buitenlak Zijdeglans",
    brand: "Flexa",
    category: "buitenverf",
    price: 46.95,
    image: prodFlexa,
    rating: 4.5,
    reviews: 28,
    inStock: true,
    applications: ["buiten", "hout"],
    finish: "zijdeglans",
    volume: "2,5 L",
    coverage: 11,
    shortDescription: "Weerbestendige zijdeglanslak voor buitenwerk.",
  },
  {
    id: "p-009",
    slug: "sigma-decor-beits-transparant-2-5l",
    name: "Sigma Decor Beits Transparant",
    brand: "Sigma",
    category: "beits",
    price: 36.5,
    image: prodSigma,
    rating: 4.3,
    reviews: 19,
    inStock: false,
    applications: ["buiten", "hout"],
    volume: "2,5 L",
    coverage: 10,
    shortDescription: "Transparante beits die de houtnerf prachtig laat uitkomen.",
  },
  {
    id: "p-010",
    slug: "sikkens-cetol-thb-plus-1l",
    name: "Sikkens Cetol THB Plus",
    brand: "Sikkens",
    category: "beits",
    price: 31.95,
    image: prodSikkens,
    rating: 4.7,
    reviews: 64,
    inStock: true,
    applications: ["buiten", "hout"],
    volume: "1 L",
    coverage: 14,
    shortDescription: "Dekkende beits met topbescherming tegen weer en wind.",
  },
];

export const BRANDS = ["Sikkens", "Sigma", "Wijzonol", "Flexa", "Histor"] as const;

export const CATEGORIES: { key: Product["category"]; label: string }[] = [
  { key: "muurverf", label: "Muurverf" },
  { key: "lakverf", label: "Lakverf" },
  { key: "beits", label: "Beits" },
  { key: "grondverf", label: "Grondverf" },
  { key: "buitenverf", label: "Buitenverf" },
  { key: "benodigdheden", label: "Verfbenodigdheden" },
];

export const POPULAR_RAL = [
  { code: "RAL 9010", name: "Zuiver wit", hex: "#F1ECE0" },
  { code: "RAL 9016", name: "Verkeerswit", hex: "#F1F1F1" },
  { code: "RAL 7016", name: "Antracietgrijs", hex: "#293133" },
  { code: "RAL 9005", name: "Gitzwart", hex: "#0A0A0A" },
  { code: "RAL 7035", name: "Lichtgrijs", hex: "#CBD0CC" },
  { code: "RAL 6005", name: "Mosgroen", hex: "#2F4538" },
];

export function formatPrice(n: number) {
  return `€${n.toFixed(2).replace(".", ",")}`;
}

export function searchCatalog(q: string, limit = 8) {
  const query = q.trim().toLowerCase();
  if (!query) return { products: [], brands: [], categories: [], ral: [] };

  const products = PRODUCTS.filter((p) =>
    [p.name, p.brand, p.category, ...p.applications].some((v) =>
      v.toLowerCase().includes(query),
    ),
  ).slice(0, limit);

  const brands = BRANDS.filter((b) => b.toLowerCase().includes(query)).slice(0, 4);

  const categories = CATEGORIES.filter(
    (c) => c.label.toLowerCase().includes(query) || c.key.includes(query),
  ).slice(0, 4);

  const ral = POPULAR_RAL.filter(
    (r) => r.code.toLowerCase().includes(query) || r.name.toLowerCase().includes(query),
  ).slice(0, 4);

  return { products, brands, categories, ral };
}
