"use server";

import { getFavoriteGames } from "../services/favorite-games.service";
import type { FavoriteGamesQueryParams } from "../types";

export async function loadFavoriteGames(query: FavoriteGamesQueryParams) {
  return getFavoriteGames(query);
}
