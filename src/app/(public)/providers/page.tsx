import AppShell from "@/design-system/components/app-shell";
import { GameLibraryPage } from "@/features/game-library";

export default function ProvidersPage() {
  return (
    <AppShell>
      <GameLibraryPage />
    </AppShell>
  );
}
