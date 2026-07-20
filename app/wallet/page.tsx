import AppShell from "@/design-system/components/app-shell";
import { CasinoExperience } from "@/features/lobby";

export default function WalletPage() {
  return (
    <AppShell>
      <CasinoExperience screen="wallet" />
    </AppShell>
  );
}
