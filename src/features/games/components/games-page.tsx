import { getCasinoGames } from "../services/games.service";
import { getMiddleNavbarSliders } from "@/features/public-home/services/sliders.service";
import type { GamesQueryParams } from "../types";
import { GamesScreen } from "./games-screen";

type GamesPageProps = {
  categoryName?: string;
  searchParams?: GamesQueryParams;
};

export async function GamesPage({ categoryName, searchParams }: GamesPageProps) {
  const initialQuery = normalizeGamesQuery(searchParams, categoryName);
  const showCategoryDrawer = isFilterLanding(initialQuery.gameFilter);
  const [initialGamePage, categoryItems] = await Promise.all([
    getCasinoGames(initialQuery),
    showCategoryDrawer ? getMiddleNavbarSliders() : Promise.resolve([]),
  ]);

  return (
    <GamesScreen
      categoryItems={categoryItems}
      initialGamePage={initialGamePage}
      initialQuery={initialQuery}
      showCategoryDrawer={showCategoryDrawer}
    />
  );
}

function normalizeGamesQuery(
  searchParams: GamesQueryParams | undefined,
  routeCategoryName: string | undefined,
) {
  return {
    sort: asString(searchParams?.sort),
    categoryName: routeCategoryName ?? asString(searchParams?.categoryName),
    subcategoryName: asString(searchParams?.subcategoryName),
    providerName: asString(searchParams?.providerName),
    gameFilter: asString(searchParams?.gameFilter),
    search: asString(searchParams?.search),
  } satisfies GamesQueryParams;
}

function asString(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function isFilterLanding(gameFilter: string | undefined) {
  return (
    gameFilter === "isTop" ||
    gameFilter === "isTrending" ||
    gameFilter === "isNew"
  );
}
