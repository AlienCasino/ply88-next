import AppShell from "@/design-system/components/app-shell";
import { AuthPanel } from "@/features/lobby";

export default function LoginPage() {
  return (
    <AppShell>
      <AuthPanel initialMode="login" asPage />
    </AppShell>
  );
}
