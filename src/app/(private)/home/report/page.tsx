import AppShell from "@/design-system/components/app-shell";
import { AccountReportScreen } from "@/features/account-report/components/account-report-screen";

type ReportTabKey = "account" | "bets" | "report" | "recover";

type ReportPageProps = {
  searchParams?: Promise<{
    reportCurrent?: string | string[];
  }>;
};

export default async function ReportPage({ searchParams }: ReportPageProps) {
  const params = await searchParams;

  return (
    <AppShell>
      <AccountReportScreen activeTab={getReportTab(params?.reportCurrent)} />
    </AppShell>
  );
}

function getReportTab(reportCurrent?: string | string[]): ReportTabKey {
  const value = Array.isArray(reportCurrent) ? reportCurrent[0] : reportCurrent;

  if (value === "2") {
    return "bets";
  }

  if (value === "3") {
    return "account";
  }

  if (value === "4") {
    return "recover";
  }

  return "report";
}
