import type {
  HomeCategoryRailItem,
  HomeGame,
  HomeGameCard,
  HomeGameCategorySection,
  HomeSportCard,
} from "../types";

export const miniBanners = [
  "/a66/home-small-partner.gif",
  "/a66/home-small-wheel.gif",
  "/a66/home-small-app.gif",
];

export const categoryRailItems: HomeCategoryRailItem[] = [
  { id: "popular", label: "Popular", href: "/games", iconText: "🔥" },
  { id: "slots", label: "Slots", href: "/games", iconText: "777" },
  { id: "fishery", label: "Pescaria", href: "/games", iconText: "🐬" },
  { id: "mini-games", label: "Minijogos", href: "/games", iconText: "💎" },
  { id: "cards", label: "Cartas", href: "/games", iconText: "🃏" },
];

export const popularGames: HomeGame[] = [
  ["Fortune Mouse", "PG", "#e55437", "#f2bf42", "#8b1d48", "PG"],
  ["Fortune Snake", "PG", "#f55c9d", "#ba2fe8", "#5d2cff", "PG"],
  ["Fortune Snake", "PG", "#fe69c9", "#ff9e54", "#6e30d8", "PG"],
  ["Fortune Dragon", "PG", "#31c082", "#3a8bff", "#f1cb58", "PG"],
  ["Fortune Ox", "PG", "#ff4024", "#ffb21f", "#7b180e", "PG"],
  ["Tigre Sortudo", "PP", "#f5e7c1", "#f28c2d", "#b0192b", "PLAY"],
];

export const slotProviders: HomeGame[] = [
  ["PG Slots", "PG", "#30bb60", "#96e665", "#1c7e4a"],
  ["TADA Slots", "TADA", "#d72b3a", "#ff5571", "#8f1b31"],
  ["PP Slots", "PP", "#ff9900", "#f9d259", "#a43a1b"],
  ["WG Slots", "WG", "#b897ff", "#a146ff", "#5424a8"],
  ["JDB Slots", "JDB", "#2e8efc", "#52d5ff", "#0857bc"],
  ["CP Slots", "CP", "#44beee", "#82e8ff", "#2b6994"],
];

export const fallbackGameSections: HomeGameCategorySection[] = [
  {
    id: "fallback-popular",
    title: "Popular",
    iconUrl: null,
    games: toFallbackCards(popularGames, "popular"),
  },
  {
    id: "fallback-slots",
    title: "Slots",
    iconUrl: null,
    games: toFallbackCards(slotProviders, "slots"),
  },
];

export const sportCards: HomeSportCard[] = [
  ["WG Esporte", "WG", "#2ec87f"],
  ["Poly Esporte", "POLY", "#155c45"],
  ["FB Esporte", "FB", "#4bdc88"],
];

export const footerLinks = [
  ["Cassino", "Esportes", "Minijogos", "Todos"],
  [
    "Jogos",
    "Popular",
    "Slots",
    "Pescaria",
    "Minijogos",
    "Cartas",
    "Ao Vivo",
    "Esporte",
  ],
  ["Suporte", "Suporte", "Bônus de Suporte", "A66BET"],
];

function toFallbackCards(games: HomeGame[], section: string): HomeGameCard[] {
  return games.map(([name, brand, a, b, c, mark], index) => ({
    id: `${section}-${name}-${brand}-${index}`,
    name,
    brand,
    href: "/games",
    imageUrl: null,
    colors: [a, b, c],
    mark: mark ?? brand,
  }));
}
