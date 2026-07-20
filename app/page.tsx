import AppShell from "@/design-system/components/app-shell";
import { LobbyHome } from "@/features/lobby";

export default function Home() {
  return (
    <AppShell>
      <LobbyHome />
    </AppShell>
  );
}
