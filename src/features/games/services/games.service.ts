import "server-only";

import { z } from "zod";
import { serverEnv } from "@/core/env/env";
import { serverFetch } from "@/core/services/server-fetch";
import {
  GAMES_PAGE_LIMIT,
  type CasinoGame,
  type CasinoGamePage,
  type GamesQueryParams,
} from "../types";

const apiGameSchema = z.object({
  _id: z.string(),
  customGameId: z.string().nullable().optional(),
  displayName: z.string().nullable().optional(),
  languageName: z.string().nullable().optional(),
  providerName: z.string().nullable().optional(),
  providerLanguageName: z.string().nullable().optional(),
  providerImageUrl: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  isFavorite: z.boolean().nullable().optional(),
});

const gamesResponseSchema = z.object({
  getgameList: z.array(apiGameSchema),
  totalRecords: z.number().nullable().optional(),
  totalPage: z.number().nullable().optional(),
});

type ApiGame = z.infer<typeof apiGameSchema>;

export async function getCasinoGames({
  skip = 0,
  limit = GAMES_PAGE_LIMIT,
  sort = "",
  userId = "",
  currencyId = "",
  isMobile = "true",
  categoryName = "",
  subcategoryName = "",
  providerName = "",
  gameFilter = "",
  search = "",
}: GamesQueryParams = {}): Promise<CasinoGamePage> {
  const result = await serverFetch<z.infer<typeof gamesResponseSchema>>(
    getGamesEndpoint({
      skip,
      limit,
      sort,
      userId,
      currencyId,
      isMobile,
      categoryName,
      subcategoryName,
      providerName,
      gameFilter,
      search,
    }),
    {
      next: { revalidate: 120 },
      parse: (data) => gamesResponseSchema.parse(data),
    },
  );

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[casino-games]", result.message);
    }

    return {
      games: [],
      totalCount: 0,
      totalPages: 0,
      nextSkip: skip,
      hasMore: false,
    };
  }

  const games = result.data.getgameList.map(toCasinoGame);
  const totalCount = result.data.totalRecords ?? games.length;
  const totalPages = result.data.totalPage ?? Math.ceil(totalCount / limit);
  const nextSkip = skip + games.length;

  return {
    games,
    totalCount,
    totalPages,
    nextSkip,
    hasMore: nextSkip < totalCount,
  };
}

export function buildGamesQuery({
  skip = 0,
  limit = GAMES_PAGE_LIMIT,
  sort = "",
  userId = "",
  currencyId = "",
  isMobile = "true",
  categoryName = "",
  subcategoryName = "",
  providerName = "",
  gameFilter = "",
  search = "",
}: GamesQueryParams = {}) {
  const params = new URLSearchParams({
    skip: String(skip),
    limit: String(limit),
    sort,
    userId,
    currencyId,
    isMobile,
    categoryName,
    subcategoryName,
    providerName,
    gameFilter,
    search: search.trim(),
  });

  return params.toString();
}

export function getGamesEndpoint(params?: GamesQueryParams) {
  return `/games?${buildGamesQuery(params)}`;
}

function toCasinoGame(game: ApiGame): CasinoGame {
  const name =
    decodeHtml(cleanText(game.displayName)) ||
    decodeHtml(cleanText(game.languageName)) ||
    "Untitled game";
  const providerName =
    cleanText(game.providerLanguageName) || cleanText(game.providerName) || "Game";
  const gameId = game.customGameId || game._id;

  return {
    id: game._id,
    gameId,
    name,
    providerName,
    providerImageUrl: resolveAssetUrl(game.providerImageUrl),
    imageUrl: resolveAssetUrl(game.imageUrl),
    isFavorite: Boolean(game.isFavorite),
  };
}

function cleanText(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function decodeHtml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#39;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
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
