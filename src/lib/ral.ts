export type RalColor = {
  code: string; // e.g. "7039"
  name: string;
  hex: string;
  family: "Grijs" | "Zwart" | "Wit" | "Beige" | "Geel";
  description: string;
  usage: string[];
  combinesWith: string[]; // RAL codes
};

export const ralColors: RalColor[] = [
  {
    code: "7039",
    name: "Kwartsgrijs",
    hex: "#6C6960",
    family: "Grijs",
    description:
      "RAL 7039 Kwartsgrijs is een warme, gedempte grijstint met een subtiele bruine ondertoon. Een veelzijdige kleur die zowel binnen als buiten prachtig staat en perfect aansluit bij moderne, natuurlijke interieurs.",
    usage: [
      "Kozijnen, deuren en garagepoorten",
      "Moderne gevels in combinatie met hout",
      "Strakke woonkamers met natuurlijke materialen",
    ],
    combinesWith: ["9010", "1019", "9001"],
  },
  {
    code: "9011",
    name: "Grafietzwart",
    hex: "#1C1F22",
    family: "Zwart",
    description:
      "RAL 9011 Grafietzwart is een diepe, ingetogen zwarttint met een zachte grijze ondertoon. Iets minder hard dan zuiver zwart en daardoor ideaal voor strakke, hedendaagse projecten.",
    usage: [
      "Stalen kozijnen en binnendeuren",
      "Industriële keukens en trappenhuizen",
      "Buitenschilderwerk van moderne villa's",
    ],
    combinesWith: ["9016", "7039", "1013"],
  },
  {
    code: "1013",
    name: "Parelwit",
    hex: "#EAE6CA",
    family: "Wit",
    description:
      "RAL 1013 Parelwit is een warme, romige witte tint met een lichte gele ondertoon. Geeft een ruimte direct een klassieke, uitnodigende sfeer zonder koel aan te doen.",
    usage: [
      "Plafonds en wanden in klassieke interieurs",
      "Binnendeuren en plinten",
      "Houten kozijnen in landelijke stijl",
    ],
    combinesWith: ["7006", "1019", "9001"],
  },
  {
    code: "7006",
    name: "Beigegrijs",
    hex: "#6A5F4B",
    family: "Grijs",
    description:
      "RAL 7006 Beigegrijs combineert grijs met een warme beige toon. Een aardse, rustige kleur die zowel monumentaal als modern werkt.",
    usage: [
      "Buitenkozijnen van karakteristieke panden",
      "Tuinhuizen en schuttingen",
      "Donkere accentwanden binnen",
    ],
    combinesWith: ["1013", "9001", "9010"],
  },
  {
    code: "9010",
    name: "Zuiver wit",
    hex: "#F1ECE1",
    family: "Wit",
    description:
      "RAL 9010 Zuiver wit is de meest gebruikte witte tint in Nederland. Een licht warme, neutrale wit die altijd past en standaard veel gekozen wordt voor binnenwerk.",
    usage: [
      "Binnendeuren, kozijnen en plafonds",
      "Plinten en lambriseringen",
      "Witte basis voor elk interieur",
    ],
    combinesWith: ["7016", "7039", "9005"],
  },
  {
    code: "9016",
    name: "Verkeerswit",
    hex: "#F1F0EA",
    family: "Wit",
    description:
      "RAL 9016 Verkeerswit is een helder, koel wit met een hoge lichtreflectie. Perfect voor moderne, minimalistische interieurs waar je optimaal licht wilt.",
    usage: [
      "Strakke, lichte interieurs",
      "Stalen kozijnen en deuren",
      "Combinatie met antraciet RAL 7016",
    ],
    combinesWith: ["7016", "9011", "9005"],
  },
  {
    code: "7016",
    name: "Antracietgrijs",
    hex: "#293133",
    family: "Grijs",
    description:
      "RAL 7016 Antracietgrijs is dé moderne klassieker. Een diepe, donkere grijstint die strak en tijdloos oogt en de standaard is geworden voor hedendaagse kozijnen en gevels.",
    usage: [
      "Kunststof en aluminium kozijnen",
      "Voordeuren en garagedeuren",
      "Stalen taatsdeuren binnen",
    ],
    combinesWith: ["9016", "9010", "1019"],
  },
  {
    code: "9005",
    name: "Gitzwart",
    hex: "#0A0A0A",
    family: "Zwart",
    description:
      "RAL 9005 Gitzwart is het diepste, meest pure zwart in het RAL-palet. Krachtig, dramatisch en grafisch — ideaal voor statementaccenten.",
    usage: [
      "Stalen binnendeuren en pui",
      "Buitenschilderwerk voor strak contrast",
      "Meubels en accenten",
    ],
    combinesWith: ["9016", "9010", "7016"],
  },
  {
    code: "9001",
    name: "Crèmewit",
    hex: "#EFEBDC",
    family: "Wit",
    description:
      "RAL 9001 Crèmewit is een zachte, warme witte tint met een duidelijke crèmekleurige ondertoon. Een populaire keuze voor klassieke en landelijke woningen.",
    usage: [
      "Klassieke binnendeuren en kozijnen",
      "Landelijke en jaren '30 interieurs",
      "Plafonds in warme woonkamers",
    ],
    combinesWith: ["7039", "7006", "1019"],
  },
  {
    code: "7021",
    name: "Zwartgrijs",
    hex: "#2F3234",
    family: "Grijs",
    description:
      "RAL 7021 Zwartgrijs is een zeer donkere grijstint die net iets zachter is dan zwart. Geeft diepte zonder hard te worden.",
    usage: [
      "Buitenkozijnen en voordeuren",
      "Strakke accentwanden",
      "Stalen constructies",
    ],
    combinesWith: ["9016", "9010", "1013"],
  },
  {
    code: "1019",
    name: "Grijsbeige",
    hex: "#9D8E73",
    family: "Beige",
    description:
      "RAL 1019 Grijsbeige is een warme, aardse tint die het beste van grijs en beige combineert. Past prachtig bij natuurlijke materialen en moderne aardetinten.",
    usage: [
      "Trendy woonkamers in aardetinten",
      "Buitenkozijnen van karakteristieke woningen",
      "Combinatie met hout en linnen",
    ],
    combinesWith: ["9010", "1013", "7039"],
  },
];

export const getRal = (code: string) => ralColors.find((r) => r.code === code);
