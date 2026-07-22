import AppShell from "@/design-system/components/app-shell";
import { PrivateCasinoExperience } from "@/features/private-lobby";

export default function PromotionsPage() {
  return (
    <AppShell>
      <PrivateCasinoExperience screen="promotions" />
    </AppShell>
  );
}
