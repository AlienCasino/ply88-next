import AppShell from "@/design-system/components/app-shell";
import { PromotionsPage as PromotionsFeaturePage } from "@/features/promotions";

type PromotionsRouteProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PromotionsPage({
  searchParams,
}: PromotionsRouteProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <AppShell>
      <PromotionsFeaturePage
        category={asString(resolvedSearchParams?.category)}
      />
    </AppShell>
  );
}

function asString(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}
