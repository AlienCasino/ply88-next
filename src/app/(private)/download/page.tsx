import AppShell from "@/design-system/components/app-shell";
import { PrivateCasinoExperience } from "@/features/private-lobby";

export default function DownloadPage() {
  return (
    <AppShell>
      <PrivateCasinoExperience screen="download" />
    </AppShell>
  );
}
