export type RalFamily =
  | "Grijs"
  | "Zwart"
  | "Wit"
  | "Beige"
  | "Bruin"
  | "Geel"
  | "Groen"
  | "Blauw"
  | "Rood";

export type RalColor = {
  code: string; // e.g. "7039"
  name: string;
  hex: string;
  family: RalFamily;
  description: string;
  usage: string[];
  combinesWith: string[]; // RAL codes
};

const u = (
  inside: string,
  outside: string,
  accent: string,
): string[] => [inside, outside, accent];

export const ralColors: RalColor[] = [
  // ============ WIT / CRÈME ============
  {
    code: "9001",
    name: "Crèmewit",
    hex: "#EFEBDC",
    family: "Wit",
    description:
      "RAL 9001 Crèmewit is een zachte, warme witte tint met een duidelijke crèmekleurige ondertoon. Een populaire keuze voor klassieke en landelijke woningen.",
    usage: u(
      "Klassieke binnendeuren en kozijnen",
      "Landelijke en jaren '30 interieurs",
      "Plafonds in warme woonkamers",
    ),
    combinesWith: ["7039", "7006", "1019"],
  },
  {
    code: "9002",
    name: "Grijswit",
    hex: "#E7EBDA",
    family: "Wit",
    description:
      "RAL 9002 Grijswit is een neutrale, licht grijzige witte tint. Veel toegepast op gevels, kozijnen en sandwichpanelen waar een rustige, niet te felle witkleur gewenst is.",
    usage: u(
      "Gevelpanelen en buitenmuren",
      "Industriële kozijnen en deuren",
      "Plafonds in kantoren en winkels",
    ),
    combinesWith: ["7016", "7035", "9010"],
  },
  {
    code: "9003",
    name: "Signaalwit",
    hex: "#F4F4F4",
    family: "Wit",
    description:
      "RAL 9003 Signaalwit is een helder, neutraal wit zonder warme of koele ondertoon. Een veelgebruikte standaardkleur in industriële en moderne toepassingen.",
    usage: u(
      "Strak modern interieur",
      "Machines, kasten en meubels",
      "Plafonds en wanden",
    ),
    combinesWith: ["9005", "7016", "7035"],
  },
  {
    code: "9010",
    name: "Zuiver wit",
    hex: "#F1ECE1",
    family: "Wit",
    description:
      "RAL 9010 Zuiver wit is de meest gebruikte witte tint in Nederland. Een licht warme, neutrale wit die altijd past en standaard veel gekozen wordt voor binnenwerk.",
    usage: u(
      "Binnendeuren, kozijnen en plafonds",
      "Plinten en lambriseringen",
      "Witte basis voor elk interieur",
    ),
    combinesWith: ["7016", "7039", "9005"],
  },
  {
    code: "9016",
    name: "Verkeerswit",
    hex: "#F1F0EA",
    family: "Wit",
    description:
      "RAL 9016 Verkeerswit is een helder, koel wit met een hoge lichtreflectie. Perfect voor moderne, minimalistische interieurs waar je optimaal licht wilt.",
    usage: u(
      "Strakke, lichte interieurs",
      "Stalen kozijnen en deuren",
      "Combinatie met antraciet RAL 7016",
    ),
    combinesWith: ["7016", "9011", "9005"],
  },
  {
    code: "1013",
    name: "Parelwit",
    hex: "#EAE6CA",
    family: "Wit",
    description:
      "RAL 1013 Parelwit is een warme, romige witte tint met een lichte gele ondertoon. Geeft een ruimte direct een klassieke, uitnodigende sfeer zonder koel aan te doen.",
    usage: u(
      "Plafonds en wanden in klassieke interieurs",
      "Binnendeuren en plinten",
      "Houten kozijnen in landelijke stijl",
    ),
    combinesWith: ["7006", "1019", "9001"],
  },
  {
    code: "1015",
    name: "Licht ivoorkleurig",
    hex: "#E6D2B5",
    family: "Wit",
    description:
      "RAL 1015 Licht ivoor is een zachte, warme ivoorkleur met een subtiele beige ondertoon. Een tijdloze keuze voor klassieke kozijnen en deuren.",
    usage: u(
      "Klassieke houten kozijnen",
      "Landelijke binnendeuren",
      "Plafonds in warme interieurs",
    ),
    combinesWith: ["7006", "8003", "1019"],
  },

  // ============ GRIJS ============
  {
    code: "7001",
    name: "Zilvergrijs",
    hex: "#8F9695",
    family: "Grijs",
    description:
      "RAL 7001 Zilvergrijs is een lichtgrijze tint met een koele zilverglans. Veel toegepast op metalen en industriële constructies.",
    usage: u(
      "Stalen constructies en hekken",
      "Garagedeuren",
      "Moderne kozijnen",
    ),
    combinesWith: ["9010", "7016", "9005"],
  },
  {
    code: "7004",
    name: "Signaalgrijs",
    hex: "#9C9C9C",
    family: "Grijs",
    description:
      "RAL 7004 Signaalgrijs is een middelgrijze, neutrale tint. Een veilige keuze voor moderne, sobere projecten waar grijs centraal staat.",
    usage: u(
      "Industriële vloeren en wanden",
      "Machines en kasten",
      "Hekwerken en poorten",
    ),
    combinesWith: ["9010", "9005", "7016"],
  },
  {
    code: "7006",
    name: "Beigegrijs",
    hex: "#6A5F4B",
    family: "Grijs",
    description:
      "RAL 7006 Beigegrijs combineert grijs met een warme beige toon. Een aardse, rustige kleur die zowel monumentaal als modern werkt.",
    usage: u(
      "Buitenkozijnen van karakteristieke panden",
      "Tuinhuizen en schuttingen",
      "Donkere accentwanden binnen",
    ),
    combinesWith: ["1013", "9001", "9010"],
  },
  {
    code: "7016",
    name: "Antracietgrijs",
    hex: "#293133",
    family: "Grijs",
    description:
      "RAL 7016 Antracietgrijs is dé moderne klassieker. Een diepe, donkere grijstint die strak en tijdloos oogt en de standaard is geworden voor hedendaagse kozijnen en gevels.",
    usage: u(
      "Kunststof en aluminium kozijnen",
      "Voordeuren en garagedeuren",
      "Stalen taatsdeuren binnen",
    ),
    combinesWith: ["9016", "9010", "1019"],
  },
  {
    code: "7021",
    name: "Zwartgrijs",
    hex: "#2F3234",
    family: "Grijs",
    description:
      "RAL 7021 Zwartgrijs is een zeer donkere grijstint die net iets zachter is dan zwart. Geeft diepte zonder hard te worden.",
    usage: u(
      "Buitenkozijnen en voordeuren",
      "Strakke accentwanden",
      "Stalen constructies",
    ),
    combinesWith: ["9016", "9010", "1013"],
  },
  {
    code: "7022",
    name: "Ombergrijs",
    hex: "#4C4A44",
    family: "Grijs",
    description:
      "RAL 7022 Ombergrijs is een warm donkergrijs met bruinige ondertoon. Past mooi bij natuurlijke materialen zoals hout en baksteen.",
    usage: u(
      "Gevels en kozijnen",
      "Tuinhuizen en bergingen",
      "Houten vloeren en meubels",
    ),
    combinesWith: ["1013", "9001", "8017"],
  },
  {
    code: "7035",
    name: "Lichtgrijs",
    hex: "#CBD0CC",
    family: "Grijs",
    description:
      "RAL 7035 Lichtgrijs is de meest gebruikte lichtgrijze tint, bekend van schakelkasten en industriële apparatuur. Neutraal en tijdloos.",
    usage: u(
      "Schakelkasten en machines",
      "Plafonds en wanden in kantoren",
      "Industriële inrichting",
    ),
    combinesWith: ["7016", "9005", "9010"],
  },
  {
    code: "7037",
    name: "Stofgrijs",
    hex: "#7D8080",
    family: "Grijs",
    description:
      "RAL 7037 Stofgrijs is een neutrale middelgrijstint zonder warme of koele ondertoon. Een rustig grijs voor zakelijke en functionele projecten.",
    usage: u(
      "Kantoorinrichting",
      "Gevels en kozijnen",
      "Hekwerken",
    ),
    combinesWith: ["9010", "9016", "7016"],
  },
  {
    code: "7039",
    name: "Kwartsgrijs",
    hex: "#6C6960",
    family: "Grijs",
    description:
      "RAL 7039 Kwartsgrijs is een warme, gedempte grijstint met een subtiele bruine ondertoon. Een veelzijdige kleur die zowel binnen als buiten prachtig staat en perfect aansluit bij moderne, natuurlijke interieurs.",
    usage: u(
      "Kozijnen, deuren en garagepoorten",
      "Moderne gevels in combinatie met hout",
      "Strakke woonkamers met natuurlijke materialen",
    ),
    combinesWith: ["9010", "1019", "9001"],
  },
  {
    code: "7040",
    name: "Venstergrijs",
    hex: "#9DA1AA",
    family: "Grijs",
    description:
      "RAL 7040 Venstergrijs is een koel, licht blauwgrijs. Vaak gebruikt voor kozijnen waar een rustige, koele uitstraling gewenst is.",
    usage: u(
      "Kunststof kozijnen",
      "Moderne gevels",
      "Schuttingen en tuinhuizen",
    ),
    combinesWith: ["9016", "7016", "9010"],
  },
  {
    code: "7044",
    name: "Zijdegrijs",
    hex: "#CAC4B0",
    family: "Grijs",
    description:
      "RAL 7044 Zijdegrijs is een zachte, warme lichtgrijze tint met beige ondertoon. Geeft rust en elegantie aan zowel klassieke als moderne interieurs.",
    usage: u(
      "Wanden in slaapkamers",
      "Kozijnen in landelijke stijl",
      "Plafonds",
    ),
    combinesWith: ["9001", "1019", "1013"],
  },

  // ============ ZWART ============
  {
    code: "9004",
    name: "Signaalzwart",
    hex: "#282828",
    family: "Zwart",
    description:
      "RAL 9004 Signaalzwart is een diep, mat zwart met een licht grijze ondertoon. Een veelgebruikt zwart voor industriële en functionele toepassingen.",
    usage: u(
      "Stalen meubels",
      "Hekwerken",
      "Machines en apparatuur",
    ),
    combinesWith: ["9016", "9010", "7035"],
  },
  {
    code: "9005",
    name: "Gitzwart",
    hex: "#0A0A0A",
    family: "Zwart",
    description:
      "RAL 9005 Gitzwart is het diepste, meest pure zwart in het RAL-palet. Krachtig, dramatisch en grafisch — ideaal voor statementaccenten.",
    usage: u(
      "Stalen binnendeuren en pui",
      "Buitenschilderwerk voor strak contrast",
      "Meubels en accenten",
    ),
    combinesWith: ["9016", "9010", "7016"],
  },
  {
    code: "9011",
    name: "Grafietzwart",
    hex: "#1C1F22",
    family: "Zwart",
    description:
      "RAL 9011 Grafietzwart is een diepe, ingetogen zwarttint met een zachte grijze ondertoon. Iets minder hard dan zuiver zwart en daardoor ideaal voor strakke, hedendaagse projecten.",
    usage: u(
      "Stalen kozijnen en binnendeuren",
      "Industriële keukens en trappenhuizen",
      "Buitenschilderwerk van moderne villa's",
    ),
    combinesWith: ["9016", "7039", "1013"],
  },
  {
    code: "9017",
    name: "Verkeerszwart",
    hex: "#1E1E1E",
    family: "Zwart",
    description:
      "RAL 9017 Verkeerszwart is een neutraal, diep zwart vergelijkbaar met gitzwart maar met een iets warmere ondertoon. Standaard voor verkeers- en signalisatieprojecten.",
    usage: u(
      "Stalen constructies",
      "Voordeuren en kozijnen",
      "Hekwerken en lantaarnpalen",
    ),
    combinesWith: ["9016", "9010", "7016"],
  },

  // ============ BEIGE / BRUIN ============
  {
    code: "1019",
    name: "Grijsbeige",
    hex: "#9D8E73",
    family: "Beige",
    description:
      "RAL 1019 Grijsbeige is een warme, aardse tint die het beste van grijs en beige combineert. Past prachtig bij natuurlijke materialen en moderne aardetinten.",
    usage: u(
      "Trendy woonkamers in aardetinten",
      "Buitenkozijnen van karakteristieke woningen",
      "Combinatie met hout en linnen",
    ),
    combinesWith: ["9010", "1013", "7039"],
  },
  {
    code: "8003",
    name: "Leembruin",
    hex: "#7E4B26",
    family: "Bruin",
    description:
      "RAL 8003 Leembruin is een warme, roodbruine aardetint. Ideaal voor klassieke houten elementen en authentieke buitenprojecten.",
    usage: u(
      "Houten kozijnen en deuren",
      "Schuttingen en pergola's",
      "Authentieke boerderijen",
    ),
    combinesWith: ["1013", "9001", "1015"],
  },
  {
    code: "8007",
    name: "Reebruin",
    hex: "#5B3A29",
    family: "Bruin",
    description:
      "RAL 8007 Reebruin is een diepe, natuurlijke bruintint die doet denken aan boomschors. Warm en aards.",
    usage: u(
      "Houten gevels en kozijnen",
      "Tuinmeubilair",
      "Klassieke voordeuren",
    ),
    combinesWith: ["1013", "9001", "1015"],
  },
  {
    code: "8011",
    name: "Notenbruin",
    hex: "#5A341D",
    family: "Bruin",
    description:
      "RAL 8011 Notenbruin is een rijke, donkerbruine tint geïnspireerd op walnotenhout. Klassiek en warm.",
    usage: u(
      "Houten meubels en deuren",
      "Klassieke gevels",
      "Trappen en lambriseringen",
    ),
    combinesWith: ["1013", "9001", "1015"],
  },
  {
    code: "8017",
    name: "Chocoladebruin",
    hex: "#3B2A20",
    family: "Bruin",
    description:
      "RAL 8017 Chocoladebruin is een diepe, donkere bruintint die populair is geworden als alternatief voor zwart op kozijnen en gevels.",
    usage: u(
      "Aluminium en kunststof kozijnen",
      "Moderne gevelbekleding",
      "Voordeuren in landelijke stijl",
    ),
    combinesWith: ["9001", "1013", "1015"],
  },
  {
    code: "8019",
    name: "Grijsbruin",
    hex: "#3F3A3A",
    family: "Bruin",
    description:
      "RAL 8019 Grijsbruin is een zeer donkere bruin met grijze ondertoon. Een rustig alternatief voor antraciet met meer warmte.",
    usage: u(
      "Kozijnen en voordeuren",
      "Stalen meubels",
      "Buitenschilderwerk",
    ),
    combinesWith: ["9001", "1019", "7044"],
  },
  {
    code: "8022",
    name: "Zwartbruin",
    hex: "#211915",
    family: "Bruin",
    description:
      "RAL 8022 Zwartbruin is een zeer donkere, bijna zwarte bruintint. Sober en strak met een warme ondertoon.",
    usage: u(
      "Kozijnen en deuren",
      "Stalen constructies",
      "Tuinhuizen en schuttingen",
    ),
    combinesWith: ["9001", "1013", "9010"],
  },

  // ============ GROEN ============
  {
    code: "6005",
    name: "Mosgroen",
    hex: "#2F4538",
    family: "Groen",
    description:
      "RAL 6005 Mosgroen is een diepe, klassieke donkergroene tint. Veel toegepast op authentieke kozijnen, luiken en tuinhuizen.",
    usage: u(
      "Klassieke houten kozijnen en luiken",
      "Tuinhuizen en schuttingen",
      "Voordeuren in monumentale panden",
    ),
    combinesWith: ["9001", "1013", "1015"],
  },
  {
    code: "6009",
    name: "Dennengroen",
    hex: "#2D3A30",
    family: "Groen",
    description:
      "RAL 6009 Dennengroen is een zeer diepe, donkere groene tint. Krachtig en natuurlijk, ideaal voor authentieke buitenprojecten.",
    usage: u(
      "Tuinhuizen en schuttingen",
      "Klassieke luiken",
      "Houten gevels",
    ),
    combinesWith: ["9001", "1015", "1013"],
  },
  {
    code: "6021",
    name: "Bleekgroen",
    hex: "#86A47C",
    family: "Groen",
    description:
      "RAL 6021 Bleekgroen is een zachte, gedempte groene tint met een vintage uitstraling. Past mooi bij landelijke en brocante interieurs.",
    usage: u(
      "Binnendeuren in landelijke stijl",
      "Meubels en kasten",
      "Accentwanden",
    ),
    combinesWith: ["9001", "1013", "1015"],
  },

  // ============ BLAUW ============
  {
    code: "5008",
    name: "Grijsblauw",
    hex: "#26343F",
    family: "Blauw",
    description:
      "RAL 5008 Grijsblauw is een donkere, ingetogen blauwgrijze tint. Klassiek en elegant voor kozijnen en voordeuren.",
    usage: u(
      "Voordeuren en kozijnen",
      "Klassieke luiken",
      "Accentwanden",
    ),
    combinesWith: ["9001", "9010", "1013"],
  },
  {
    code: "5011",
    name: "Staalblauw",
    hex: "#1A2B3C",
    family: "Blauw",
    description:
      "RAL 5011 Staalblauw is een zeer donkere blauwtint die bijna zwart oogt. Sterk en industrieel.",
    usage: u(
      "Stalen kozijnen",
      "Moderne voordeuren",
      "Industriële inrichting",
    ),
    combinesWith: ["9016", "9010", "7035"],
  },
  {
    code: "5014",
    name: "Duifblauw",
    hex: "#6C7C98",
    family: "Blauw",
    description:
      "RAL 5014 Duifblauw is een zachte, gedempte blauwtint met een grijze ondertoon. Rustig en sereen.",
    usage: u(
      "Slaapkamerwanden",
      "Landelijke binnendeuren",
      "Meubels",
    ),
    combinesWith: ["9001", "1013", "7044"],
  },

  // ============ ROOD ============
  {
    code: "3004",
    name: "Purperrood",
    hex: "#732030",
    family: "Rood",
    description:
      "RAL 3004 Purperrood is een diepe, klassieke wijnrode tint. Krachtig en elegant voor accenten en authentieke projecten.",
    usage: u(
      "Voordeuren",
      "Accentwanden",
      "Meubels",
    ),
    combinesWith: ["9001", "1013", "9010"],
  },
  {
    code: "3005",
    name: "Wijnrood",
    hex: "#5E2028",
    family: "Rood",
    description:
      "RAL 3005 Wijnrood is een rijke, diepe rode tint met paarse ondertoon. Klassiek en warm.",
    usage: u(
      "Klassieke voordeuren",
      "Houten luiken",
      "Authentieke boerderijdeuren",
    ),
    combinesWith: ["9001", "1015", "9010"],
  },
  {
    code: "3009",
    name: "Oxiderood",
    hex: "#6D342D",
    family: "Rood",
    description:
      "RAL 3009 Oxiderood is een aardse, roestige rode tint. Veel toegepast op stalen daken en authentieke landelijke gebouwen.",
    usage: u(
      "Stalen dakplaten",
      "Schuren en tuinhuizen",
      "Houten gevels",
    ),
    combinesWith: ["9001", "1015", "9010"],
  },
];

export const getRal = (code: string) => ralColors.find((r) => r.code === code);
