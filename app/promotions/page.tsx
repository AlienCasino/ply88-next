import AppShell from "@/design-system/components/app-shell";
import { CasinoExperience } from "@/features/lobby";

export default function PromotionsPage() {
  return (
    <AppShell>
      <CasinoExperience screen="promotions" />
    </AppShell>
  );
}
