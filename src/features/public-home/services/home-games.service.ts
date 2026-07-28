import "server-only";

import { z } from "zod";
import { serverEnv } from "@/core/env/env";
import { serverFetch } from "@/core/services/server-fetch";
import type { HomeGameCard, HomeGameCategorySection } from "../types";

const apiGameSchema = z.object({
  _id: z.string(),
  orderNo: z.number().nullable().optional(),
  customGameId: z.string().nullable().optional(),
  displayName: z.string().nullable().optional(),
  languageName: z.string().nullable().optional(),
  providerName: z.string().nullable().optional(),
  providerLanguageName: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  isFavorite: z.boolean().optional(),
});

const apiCategorySchema = z.object({
  _id: z.string(),
  categoryName: z.string(),
  orderNo: z.number().nullable().optional(),
  categoryLanguageName: z.string().nullable().optional(),
  categoryImage: z.string().nullable().optional(),
  displayName: z.string().nullable().optional(),
  games: z.array(apiGameSchema).optional(),
});

const homeGameResponseSchema = z.array(apiCategorySchema);

type ApiGame = z.infer<typeof apiGameSchema>;
type ApiCategory = z.infer<typeof apiCategorySchema>;

const cardPalettes: Array<[string, string, string]> = [
  ["#e55437", "#f2bf42", "#8b1d48"],
  ["#f55c9d", "#ba2fe8", "#5d2cff"],
  ["#31c082", "#3a8bff", "#f1cb58"],
  ["#ff4024", "#ffb21f", "#7b180e"],
  ["#30bb60", "#96e665", "#1c7e4a"],
  ["#2e8efc", "#52d5ff", "#0857bc"],
];

export async function getHomeGameSections(): Promise<
  HomeGameCategorySection[]
> {
  const result = await serverFetch<z.infer<typeof homeGameResponseSchema>>(
    "/home/game",
    {
      next: { revalidate: 300 },
      parse: (data) => homeGameResponseSchema.parse(data),
    },
  );

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[home-game-sections]", result.message);
    }
    return [];
  }

  return toHomeGameSections(result.data);
}

function toHomeGameSections(categories: ApiCategory[]) {
  return categories
    .map((category, categoryIndex): HomeGameCategorySection => {
      const title =
        cleanText(category.displayName) ||
        cleanText(category.categoryLanguageName) ||
        cleanText(category.categoryName) ||
        "Games";

      return {
        id: `category-${slugify(category.categoryName || category._id)}-${categoryIndex}`,
        title,
        iconUrl: resolveAssetUrl(category.categoryImage),
        games: (category.games ?? []).map((game, gameIndex) =>
          toHomeGameCard(game, categoryIndex, gameIndex),
        ),
      };
    })
    .filter((section) => section.games.length > 0);
}

function toHomeGameCard(
  game: ApiGame,
  categoryIndex: number,
  gameIndex: number,
): HomeGameCard {
  const provider =
    cleanText(game.providerLanguageName) ||
    cleanText(game.providerName) ||
    "Game";
  const gameKey = game.customGameId ?? game._id;

  return {
    id: `${game._id}-${gameIndex}`,
    name:
      cleanText(game.displayName) ||
      cleanText(game.languageName) ||
      "Untitled game",
    brand: provider,
    href: `/game/${encodeURIComponent(gameKey)}`,
    imageUrl: resolveAssetUrl(game.imageUrl),
    colors: cardPalettes[(categoryIndex + gameIndex) % cardPalettes.length],
    mark: provider.slice(0, 4).toUpperCase(),
  };
}

function cleanText(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function slugify(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "games"
  );
}

function resolveAssetUrl(path: string | null | undefined) {
  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (!serverEnv.apiUrl) {
    return path;
  }

  return new URL(path, serverEnv.apiUrl).toString();
}
