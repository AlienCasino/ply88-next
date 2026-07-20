import AppShell from "@/design-system/components/app-shell";
import { AuthPanel } from "@/features/lobby";

export default function RegisterPage() {
  return (
    <AppShell>
      <AuthPanel initialMode="register" asPage />
    </AppShell>
  );
}
