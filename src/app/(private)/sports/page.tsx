import AppShell from "@/design-system/components/app-shell";
import { PrivateCasinoExperience } from "@/features/private-lobby";

export default function SportsPage() {
  return (
    <AppShell>
      <PrivateCasinoExperience screen="sports" />
    </AppShell>
  );
}
