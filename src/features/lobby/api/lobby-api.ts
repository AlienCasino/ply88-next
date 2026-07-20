import type { LobbySection } from "../types";

export async function getLobbySections(): Promise<LobbySection[]> {
  return [{ id: "popular", title: "Popular" }];
}
