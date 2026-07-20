import AppShell from "@/design-system/components/app-shell";
import { CasinoExperience } from "@/features/lobby";

export default function DownloadPage() {
  return (
    <AppShell>
      <CasinoExperience screen="download" />
    </AppShell>
  );
}
