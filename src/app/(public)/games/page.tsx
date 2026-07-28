import AppShell from "@/design-system/components/app-shell";
import { GamesPage as GamesFeaturePage } from "@/features/games";

type GamesRouteProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function GamesPage({ searchParams }: GamesRouteProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <AppShell>
      <GamesFeaturePage searchParams={resolvedSearchParams} />
    </AppShell>
  );
}
