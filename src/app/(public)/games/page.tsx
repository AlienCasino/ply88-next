import AppShell from "@/design-system/components/app-shell";
import { GameLibraryScreen } from "@/features/game-library";

export default function GamesPage() {
  return (
    <AppShell>
      <GameLibraryScreen />
    </AppShell>
  );
}
