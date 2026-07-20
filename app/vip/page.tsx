import AppShell from "@/design-system/components/app-shell";
import { CasinoExperience } from "@/features/lobby";

export default function VipPage() {
  return (
    <AppShell>
      <CasinoExperience screen="vip" />
    </AppShell>
  );
}
