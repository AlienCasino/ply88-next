import type { Game } from "@/data/types";

const pgImage = "/a66/promo-3.png";
const blueImage = "/a66/promo-4.png";

export const games: Game[] = [
  { id: "fortune-tiger", name: "Fortune Tiger", slug: "fortune-tiger", provider: "pg", category: "slots", image: pgImage, RTP: "96.8%", isPopular: true, isFavorite: true },
  { id: "fortune-dragon", name: "Fortune Dragon", slug: "fortune-dragon", provider: "pg", category: "slots", image: "/a66/promo-1.png", RTP: "96.7%", isPopular: true },
  { id: "fortune-ox", name: "Fortune Ox", slug: "fortune-ox", provider: "pg", category: "slots", image: "/a66/promo-2.png", RTP: "96.6%", isPopular: true },
  { id: "fortune-rabbit", name: "Fortune Rabbit", slug: "fortune-rabbit", provider: "pg", category: "slots", image: pgImage, RTP: "96.7%", isNew: true },
  { id: "lucky-neko", name: "Lucky Neko", slug: "lucky-neko", provider: "pg", category: "slots", image: blueImage, RTP: "96.5%", isFavorite: true },
  { id: "big-bass", name: "Big Bass Bonanza", slug: "big-bass-bonanza", provider: "pp", category: "slots", image: "/a66/promo-1.png", RTP: "96.7%", isPopular: true },
  { id: "sweet-bonanza", name: "Sweet Bonanza", slug: "sweet-bonanza", provider: "pp", category: "slots", image: "/a66/promo-2.png", RTP: "96.5%" },
  { id: "dragon-hatch", name: "Dragon Hatch", slug: "dragon-hatch", provider: "pg", category: "slots", image: "/a66/promo-3.png", RTP: "96.9%" },
  { id: "aviator", name: "Aviator", slug: "aviator", provider: "tada", category: "crash", image: blueImage, RTP: "97.0%", isPopular: true },
  { id: "crazy-777", name: "Crazy 777", slug: "crazy-777", provider: "jdb", category: "slots", image: "/a66/promo-4.png", RTP: "96.1%", isNew: true },
  { id: "wild-bandito", name: "Wild Bandito", slug: "wild-bandito", provider: "pg", category: "slots", image: pgImage, RTP: "96.4%" },
  { id: "casino-live", name: "Roleta Brasileira", slug: "roleta-brasileira", provider: "evo", category: "live", image: blueImage, RTP: "97.3%" },
];
