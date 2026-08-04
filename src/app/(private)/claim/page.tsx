import AppShell from "@/design-system/components/app-shell";
import { ClaimScreen } from "@/features/claim/components/claim-screen";
import type { ClaimTabKey } from "@/features/claim/components/claim-screen";

type ClaimPageProps = {
  searchParams?: Promise<{
    active?: string | string[];
  }>;
};

export default async function ClaimPage({ searchParams }: ClaimPageProps) {
  const params = await searchParams;

  return (
    <AppShell>
      <ClaimScreen activeTab={getClaimTab(params?.active)} />
    </AppShell>
  );
}

function getClaimTab(active?: string | string[]): ClaimTabKey {
  const value = Array.isArray(active) ? active[0] : active;

  if (value === "1") {
    return "receive";
  }

  if (value === "2") {
    return "rules";
  }

  return "request";
}
