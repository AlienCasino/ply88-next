import AppShell from "@/design-system/components/app-shell";
import { CasinoExperience } from "@/features/lobby";

export default function GamesPage() {
  return (
    <AppShell>
      <CasinoExperience screen="games" />
    </AppShell>
  );
}
