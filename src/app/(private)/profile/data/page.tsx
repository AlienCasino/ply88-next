import AppShell from "@/design-system/components/app-shell";
import { DataSettingsScreen } from "@/features/profile-settings/components/profile-settings-screen";

export default function ProfileDataPage() {
  return (
    <AppShell>
      <DataSettingsScreen />
    </AppShell>
  );
}
