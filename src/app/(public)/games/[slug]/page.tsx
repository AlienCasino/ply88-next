import AppShell from "@/design-system/components/app-shell";
import { GamesPage as GamesFeaturePage } from "@/features/games";

type GamesCategoryRouteProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function GamesCategoryPage({
  params,
  searchParams,
}: GamesCategoryRouteProps) {
  const [{ slug }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  return (
    <AppShell>
      <GamesFeaturePage
        categoryName={toCategoryName(slug)}
        searchParams={resolvedSearchParams}
      />
    </AppShell>
  );
}

function toCategoryName(slug: string) {
  return decodeURIComponent(slug).replaceAll("-", " ");
}
