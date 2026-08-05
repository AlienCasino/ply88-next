import AppShell from "@/design-system/components/app-shell";
import { ProfileFaqScreen } from "@/features/profile-faq/components/profile-faq-screen";
import type { ProfileFaqTabKey } from "@/features/profile-faq/components/profile-faq-screen";

type ProfileFaqPageProps = {
  searchParams?: Promise<{
    tab?: string | string[];
  }>;
};

export default async function ProfileFaqPage({
  searchParams,
}: ProfileFaqPageProps) {
  const params = await searchParams;

  return (
    <AppShell>
      <ProfileFaqScreen activeTab={getFaqTab(params?.tab)} />
    </AppShell>
  );
}

function getFaqTab(tab?: string | string[]): ProfileFaqTabKey {
  const value = Array.isArray(tab) ? tab[0] : tab;

  if (
    value === "news" ||
    value === "notifications" ||
    value === "rolling" ||
    value === "suggestion"
  ) {
    return value;
  }

  return "support";
}
