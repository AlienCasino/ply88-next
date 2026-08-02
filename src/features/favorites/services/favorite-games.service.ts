import "server-only";

import { z } from "zod";
import { serverEnv } from "@/core/env/env";
import { serverFetch } from "@/core/services/server-fetch";
import {
  FAVORITES_PAGE_LIMIT,
  type FavoriteGame,
  type FavoriteGamesPage,
  type FavoriteGamesQueryParams,
} from "../types";

const favoriteGameSchema = z
  .object({
    _id: z.string().optional(),
    id: z.string().optional(),
    gameId: z.string().optional(),
    customGameId: z.string().nullable().optional(),
    displayName: z.string().nullable().optional(),
    languageName: z.string().nullable().optional(),
    gameName: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    providerName: z.string().nullable().optional(),
    providerLanguageName: z.string().nullable().optional(),
    providerImageUrl: z.string().nullable().optional(),
    imageUrl: z.string().nullable().optional(),
    gameImage: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    isFavorite: z.boolean().nullable().optional(),
  })
  .passthrough();

const favoriteResponseSchema = z
  .object({
    getgameList: z.array(favoriteGameSchema).optional(),
    favouriteGames: z.array(favoriteGameSchema).optional(),
    favoriteGames: z.array(favoriteGameSchema).optional(),
    games: z.array(favoriteGameSchema).optional(),
    list: z.array(favoriteGameSchema).optional(),
    results: z.array(favoriteGameSchema).optional(),
    totalRecords: z.number().nullable().optional(),
    totalCount: z.number().nullable().optional(),
    count: z.number().nullable().optional(),
  })
  .passthrough();

type ApiFavoriteGame = z.infer<typeof favoriteGameSchema>;

export async function getFavoriteGames({
  skip = 0,
  limit = FAVORITES_PAGE_LIMIT,
  search = "",
}: FavoriteGamesQueryParams = {}): Promise<FavoriteGamesPage> {
  const result = await serverFetch<unknown>(getFavoriteGamesEndpoint({
    skip,
    limit,
    search,
  }), {
    next: { revalidate: 60 },
  });

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[favorite-games]", result.message);
    }

    return emptyFavoritePage(skip);
  }

  const parsed = parseFavoriteGamesResponse(result.data);
  const filteredGames = search
    ? parsed.games.filter((game) =>
        `${game.name} ${game.providerName}`
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
      )
    : parsed.games;
  const totalCount = parsed.totalCount ?? filteredGames.length;
  const nextSkip = skip + filteredGames.length;

  return {
    games: filteredGames,
    totalCount,
    nextSkip,
    hasMore: nextSkip < totalCount,
  };
}

export function buildFavoriteGamesQuery({
  skip = 0,
  limit = FAVORITES_PAGE_LIMIT,
  search = "",
}: FavoriteGamesQueryParams = {}) {
  const params = new URLSearchParams({
    skip: String(skip),
    limit: String(limit),
    search: search.trim(),
  });

  return params.toString();
}

export function getFavoriteGamesEndpoint(params?: FavoriteGamesQueryParams) {
  return `/getfavouriteGames?${buildFavoriteGamesQuery(params)}`;
}

function parseFavoriteGamesResponse(value: unknown) {
  const list = Array.isArray(value)
    ? value
    : getResponseList(value);
  const totalCount = Array.isArray(value) ? value.length : getResponseTotal(value);

  return {
    games: list
      .map((item) => favoriteGameSchema.safeParse(item))
      .filter((item): item is z.ZodSafeParseSuccess<ApiFavoriteGame> => item.success)
      .map((item) => toFavoriteGame(item.data)),
    totalCount,
  };
}

function getResponseList(value: unknown): unknown[] {
  const parsed = favoriteResponseSchema.safeParse(value);

  if (!parsed.success) {
    return [];
  }

  return (
    parsed.data.getgameList ??
    parsed.data.favouriteGames ??
    parsed.data.favoriteGames ??
    parsed.data.games ??
    parsed.data.list ??
    parsed.data.results ??
    []
  );
}

function getResponseTotal(value: unknown) {
  const parsed = favoriteResponseSchema.safeParse(value);

  if (!parsed.success) {
    return undefined;
  }

  return parsed.data.totalRecords ?? parsed.data.totalCount ?? parsed.data.count ?? undefined;
}

function toFavoriteGame(game: ApiFavoriteGame): FavoriteGame {
  const name =
    decodeHtml(cleanText(game.displayName)) ||
    decodeHtml(cleanText(game.languageName)) ||
    decodeHtml(cleanText(game.gameName)) ||
    decodeHtml(cleanText(game.name)) ||
    "Untitled game";
  const providerName =
    cleanText(game.providerLanguageName) || cleanText(game.providerName) || "Game";
  const id =
    game._id ??
    game.id ??
    game.customGameId ??
    game.gameId ??
    slugify(`${providerName}-${name}`);
  const gameId = game.customGameId ?? game.gameId ?? id;

  return {
    id,
    gameId,
    name,
    providerName,
    providerImageUrl: resolveAssetUrl(game.providerImageUrl),
    imageUrl: resolveAssetUrl(game.imageUrl ?? game.gameImage ?? game.image),
    isFavorite: game.isFavorite ?? true,
  };
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "favorite-game"
  );
}

function emptyFavoritePage(skip: number): FavoriteGamesPage {
  return {
    games: [],
    totalCount: 0,
    nextSkip: skip,
    hasMore: false,
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
