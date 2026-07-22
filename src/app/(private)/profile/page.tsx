import AppShell from "@/design-system/components/app-shell";
import { PrivateCasinoExperience } from "@/features/private-lobby";

export default function ProfilePage() {
  return (
    <AppShell>
      <PrivateCasinoExperience screen="profile" />
    </AppShell>
  );
}
