import AppShell from "@/design-system/components/app-shell";
import { CasinoExperience } from "@/features/lobby";

export default function SportsPage() {
  return (
    <AppShell>
      <CasinoExperience screen="sports" />
    </AppShell>
  );
}
