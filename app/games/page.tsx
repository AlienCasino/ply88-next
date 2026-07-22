import AppShell from "@/design-system/components/app-shell";
import { A66GameLibraryPage } from "@/features/lobby/components/a66-game-library-page";

export default function GamesPage() {
  return (
    <AppShell>
      <A66GameLibraryPage />
    </AppShell>
  );
}
