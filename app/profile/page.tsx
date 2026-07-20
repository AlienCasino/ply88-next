import AppShell from "@/design-system/components/app-shell";
import { CasinoExperience } from "@/features/lobby";

export default function ProfilePage() {
  return (
    <AppShell>
      <CasinoExperience screen="profile" />
    </AppShell>
  );
}
