import AppShell from "@/design-system/components/app-shell";
import { PrivateCasinoExperience } from "@/features/private-lobby";

export default function VipPage() {
  return (
    <AppShell>
      <PrivateCasinoExperience screen="vip" />
    </AppShell>
  );
}
