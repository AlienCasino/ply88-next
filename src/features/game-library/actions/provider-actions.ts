"use server";

import { getGameProviders } from "../services/providers.service";
import type { ProvidersQueryParams } from "../types";

export async function loadGameProviders(query: ProvidersQueryParams) {
  return getGameProviders(query);
}
