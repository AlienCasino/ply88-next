import AppShell from "@/design-system/components/app-shell";
import { PromotionDetailPage as PromotionDetailFeaturePage } from "@/features/promotions";

type PromotionDetailRouteProps = {
  params: Promise<{
    promotionId: string;
  }>;
};

export default async function PromotionDetailPage({
  params,
}: PromotionDetailRouteProps) {
  const { promotionId } = await params;

  return (
    <AppShell>
      <PromotionDetailFeaturePage promotionId={promotionId} />
    </AppShell>
  );
}
