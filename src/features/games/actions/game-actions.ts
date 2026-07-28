"use server";

import { getCasinoGames } from "../services/games.service";
import type { GamesQueryParams } from "../types";

export async function loadCasinoGames(query: GamesQueryParams) {
  return getCasinoGames(query);
}
