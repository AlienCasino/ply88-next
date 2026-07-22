import AppShell from "@/design-system/components/app-shell";
import { PublicHomeScreen } from "@/features/public-home";

export default function Home() {
  return (
    <AppShell>
      <PublicHomeScreen />
    </AppShell>
  );
}
