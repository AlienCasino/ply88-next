import AppShell from "@/design-system/components/app-shell";
import { AuthPanel } from "@/features/auth";

export default function RegisterPage() {
  return (
    <AppShell>
      <AuthPanel initialMode="register" asPage />
    </AppShell>
  );
}
