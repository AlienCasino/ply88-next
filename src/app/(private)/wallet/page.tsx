import AppShell from "@/design-system/components/app-shell";
import { PrivateCasinoExperience } from "@/features/private-lobby";

export default function WalletPage() {
  return (
    <AppShell>
      <PrivateCasinoExperience screen="wallet" />
    </AppShell>
  );
}
