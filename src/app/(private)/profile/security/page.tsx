import AppShell from "@/design-system/components/app-shell";
import { SecuritySettingsScreen } from "@/features/profile-settings/components/profile-settings-screen";

export default function ProfileSecurityPage() {
  return (
    <AppShell>
      <SecuritySettingsScreen />
    </AppShell>
  );
}
