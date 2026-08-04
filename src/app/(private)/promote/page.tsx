import AppShell from "@/design-system/components/app-shell";
import { PromoteScreen } from "@/features/promote/components/promote-screen";
import type { PromoteTabKey } from "@/features/promote/components/promote-screen";

type PromotePageProps = {
  searchParams?: Promise<{
    active?: string | string[];
  }>;
};

export default async function PromotePage({ searchParams }: PromotePageProps) {
  const params = await searchParams;

  return (
    <AppShell>
      <PromoteScreen activeTab={getPromoteTab(params?.active)} />
    </AppShell>
  );
}

function getPromoteTab(active?: string | string[]): PromoteTabKey {
  const value = Array.isArray(active) ? active[0] : active;

  if (
    value === "promoteShare" ||
    value === "myData" ||
    value === "performance" ||
    value === "proportion" ||
    value === "information"
  ) {
    return value;
  }

  return "index";
}
