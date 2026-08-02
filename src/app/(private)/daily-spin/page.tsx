import AppShell from "@/design-system/components/app-shell";
import { DailySpinPage as DailySpinFeaturePage } from "@/features/daily-spin";

export default function DailySpinPage() {
  return (
    <AppShell>
      <DailySpinFeaturePage />
    </AppShell>
  );
}
