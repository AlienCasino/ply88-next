"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Boxes,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CircleHelp,
  Goal,
  Grid2X2,
  MessageCircle,
  RefreshCw,
  Search,
  Send,
} from "lucide-react";
import { routes } from "@/core/constants/routes";

type ReportTabKey = "account" | "bets" | "report" | "recover";

type AccountReportScreenProps = {
  activeTab: ReportTabKey;
};

export const reportTabs: Array<{
  key: ReportTabKey;
  label: string;
  reportCurrent: number;
}> = [
  { key: "account", label: "Account", reportCurrent: 3 },
  { key: "bets", label: "Bets", reportCurrent: 2 },
  { key: "report", label: "Report", reportCurrent: 1 },
  { key: "recover", label: "Recover Balance", reportCurrent: 4 },
];

export function AccountReportScreen({ activeTab }: AccountReportScreenProps) {
  return (
    <main className="min-h-dvh bg-[#2b3342] text-white">
      <ReportTabs activeTab={activeTab} />
      {activeTab === "account" ? <AccountPanel /> : null}
      {activeTab === "bets" ? <BetsPanel /> : null}
      {activeTab === "report" ? <ReportPanel /> : null}
      {activeTab === "recover" ? <RecoverPanel /> : null}
    </main>
  );
}

function ReportTabs({ activeTab }: { activeTab: ReportTabKey }) {
  return (
    <header className="sticky top-0 z-10 border-b border-[#3a4c68] bg-[#1d232d]">
      <div className="flex h-[56px] items-end">
        <Link
          href={routes.home}
          aria-label="Back to home"
          className="grid h-full w-12 shrink-0 place-items-center text-[#9ab7e4] transition hover:text-white"
        >
          <ChevronLeft className="size-6" strokeWidth={2} />
        </Link>
        <nav
          className="grid min-w-0 flex-1 overflow-hidden"
          style={{
            gridTemplateColumns: "72px 84px 92px minmax(160px, 1fr)",
          }}
        >
          {reportTabs.map((tab) => {
            const isActive = tab.key === activeTab;

            return (
              <Link
                key={tab.key}
                href={`${routes.report}?reportCurrent=${tab.reportCurrent}`}
                className={`relative grid h-[56px] min-w-0 place-items-center px-1 text-center text-[15px] font-medium leading-tight transition ${
                  isActive ? "text-brand-gold" : "text-white"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="whitespace-nowrap">{tab.label}</span>
                {isActive ? (
                  <span className="absolute bottom-0 h-[2px] w-[calc(100%-18px)] rounded-full bg-brand-gold" />
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function ReportPanel() {
  const [date, setDate] = useState("Today");
  const [sort, setSort] = useState("wins/losses");

  return (
    <section className="min-h-[calc(100dvh-57px)] bg-[#2b3342]">
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 bg-[#1f2530] px-4 py-3">
        <Metric label="Total W/D" value="0.00" valueClassName="text-[#ff4c43]" />
        <Metric label="Total Bet" value="0.00" />
        <Metric label="Total Valid Bets" value="0.00" />
        <Metric label="Total Bets" value="0" />
      </div>
      <div className="flex items-start justify-between px-4 pt-3">
        <FilterSelect
          value={date}
          onChange={setDate}
          options={["Today", "Yesterday", "Last 7 days", "This month"]}
          className="w-[84px]"
        />
        <label className="relative block w-[112px] text-[#5878ae]">
          <span className="sr-only">Sort report records</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="h-[38px] w-full appearance-none border-0 bg-transparent pr-5 text-right text-[12px] leading-[14px] outline-none"
          >
            <option value="wins/losses">Sort by wins/losses</option>
            <option value="newest">Sort by newest</option>
            <option value="oldest">Sort by oldest</option>
          </select>
          <ChevronsUpDown className="pointer-events-none absolute right-0 top-2.5 size-4" />
        </label>
      </div>
      <EmptyState className="mt-[210px]" context={`${date} · ${sort}`} />
    </section>
  );
}

function BetsPanel() {
  const [date, setDate] = useState("Today");
  const [status, setStatus] = useState("All statuses");
  const [type, setType] = useState("All Types");
  const [game, setGame] = useState("All games");

  return (
    <section className="min-h-[calc(100dvh-57px)] bg-[#2b3342] px-4 pt-3">
      <div className="a66-hidden-scrollbar flex gap-2 overflow-x-auto pb-2">
        <FilterSelect
          value={date}
          onChange={setDate}
          options={["Today", "Yesterday", "Last 7 days", "This month"]}
          className="w-[100px]"
        />
        <FilterSelect
          value={status}
          onChange={setStatus}
          options={["All statuses", "Settled", "Pending", "Cancelled"]}
          className="w-[136px]"
        />
        <FilterSelect
          value={type}
          onChange={setType}
          options={["All Types", "Win", "Loss", "Refund"]}
          className="w-[132px]"
        />
        <FilterSelect
          value={game}
          onChange={setGame}
          options={["All games", "Fortune Tiger", "Fortune Rabbit", "FB"]}
          className="w-[124px]"
        />
      </div>
      <EmptyState
        className="mt-[278px]"
        context={`${date} · ${status} · ${type} · ${game}`}
      />
    </section>
  );
}

function AccountPanel() {
  const [date, setDate] = useState("Today");
  const [category, setCategory] = useState("All categories");
  const [detail, setDetail] = useState("Details");

  return (
    <section className="flex min-h-[calc(100dvh-57px)] flex-col bg-[#2b3342] px-4 pt-3">
      <div className="rounded-[5px] bg-[#1f2530] p-4 shadow-[inset_0_1px_0_rgb(255_255_255/.02)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[15px] text-[#5878ae]">Current Balance</p>
            <p className="inline-flex items-center gap-1 text-[20px] font-bold leading-none text-brand-gold">
              0.00
              <RefreshCw className="size-5 fill-brand-gold text-[#1d222c]" />
            </p>
          </div>
          <Link
            href={`${routes.report}?reportCurrent=4`}
            className="inline-flex items-center gap-2 text-[16px] font-medium text-brand-gold"
          >
            Recover lost balance
            <ChevronRight className="size-5 text-[#7899c7]" />
          </Link>
        </div>
        <div className="mt-3 flex gap-2 rounded-[6px] bg-[#3b3834] px-2.5 py-2 text-[13px] font-medium leading-[18px] text-[#9ab7e4]">
          <MessageCircle className="mt-0.5 size-4 shrink-0 fill-[#5878ae] text-[#5878ae]" />
          <p>
            If you lose your balance when entering or leaving the game, you can
            recover it using self-service balance recovery.
          </p>
        </div>
      </div>
      <div className="a66-hidden-scrollbar mt-3 flex gap-2 overflow-x-auto pb-2">
        <FilterSelect
          value={date}
          onChange={setDate}
          options={["Today", "Yesterday", "Last 7 days", "This month"]}
          className="w-[100px]"
        />
        <FilterSelect
          value={category}
          onChange={setCategory}
          options={["All categories", "Deposit", "Withdrawal", "Bonus"]}
          className="w-[154px]"
        />
        <FilterSelect
          value={detail}
          onChange={setDetail}
          options={["Details", "Summary", "Successful", "Failed"]}
          className="w-[110px]"
        />
      </div>
      <EmptyState
        className="mt-[178px]"
        context={`${date} · ${category} · ${detail}`}
      />
      <div className="-mx-4 mt-auto border-t border-[#3a4c68] bg-[#1f2530] px-4 py-3">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[13px] font-medium">
          <p className="text-[#5878ae]">
            Total Deposit <span className="ml-5 text-[#16c638]">0.00</span>
          </p>
          <p className="text-[#5878ae]">
            Total Withdrawals <span className="ml-4 text-[#ff4c43]">0.00</span>
          </p>
          <p className="text-[#5878ae]">
            Total Accumulated <span className="ml-3 text-[#f6a915]">0.00</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function RecoverPanel() {
  const [category, setCategory] = useState<"All" | "Sport">("All");
  const [query, setQuery] = useState("");
  const [recovered, setRecovered] = useState(false);
  const platforms = useMemo(() => [{ name: "FB", amount: "0.00" }], []);
  const visiblePlatforms = platforms.filter((platform) =>
    platform.name.toLowerCase().includes(query.toLowerCase().trim()),
  );

  return (
    <section className="min-h-[calc(100dvh-57px)] bg-[#2b3342] px-4 pt-3">
      <div className="rounded-[5px] bg-[#1f2530] p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[15px] text-[#5878ae]">
            Current Balance{" "}
            <span className="inline-flex items-center gap-1 align-middle font-bold text-brand-gold">
              0.00
              <RefreshCw className="size-5 fill-brand-gold text-[#1d222c]" />
            </span>
          </p>
          <button
            type="button"
            onClick={() => setRecovered(true)}
            className="min-h-9 rounded-[7px] bg-brand-gold px-3 text-[13px] font-bold leading-[15px] text-[#1d222c] shadow-[inset_0_-2px_0_rgba(0,0,0,.08)] transition hover:brightness-105"
          >
            {recovered ? "Recovered" : "Recover all"}
          </button>
        </div>
        <p className="mt-2 max-w-[360px] text-[13px] font-medium leading-[18px] text-[#5878ae]">
          Only whole multiples of the balance can be recovered, excluding the
          decimal point. If you still cannot recover your balance, contact{" "}
          <span className="text-brand-gold">customer support</span> for
          processing.
        </p>
      </div>
      <div className="mt-3 grid grid-cols-[92px_1fr] gap-3">
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setCategory("All")}
            className={`flex h-[48px] w-full items-center justify-center gap-2 rounded-[7px] text-[14px] font-medium transition ${
              category === "All"
                ? "bg-brand-gold text-[#1d222c]"
                : "bg-[#1f2530] text-[#8facd9]"
            }`}
          >
            <Grid2X2 className="size-5 fill-[#1d222c]" />
            All
          </button>
          <button
            type="button"
            onClick={() => setCategory("Sport")}
            className={`flex h-[42px] w-full items-center justify-center gap-2 rounded-[6px] text-[13px] font-medium transition ${
              category === "Sport"
                ? "bg-brand-gold text-[#1d222c]"
                : "bg-[#1f2530] text-[#8facd9]"
            }`}
          >
            <Goal className="size-5" />
            Sport
          </button>
        </div>
        <div className="min-w-0">
          <label className="flex h-[38px] items-center rounded-full border border-[#3a5882] bg-[#1f2530] px-3">
            <span className="sr-only">Search platform</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 flex-1 border-0 bg-transparent text-[13px] font-medium text-white outline-none placeholder:text-[#5878ae]"
              placeholder="Search platform"
            />
            <Search className="size-5 text-brand-gold" />
          </label>
          {visiblePlatforms.length > 0 ? (
            visiblePlatforms.map((platform) => (
              <button
                key={platform.name}
                type="button"
                className="mt-3 w-[160px] overflow-hidden rounded-[7px] bg-[#1f2530] text-left shadow-[0_2px_6px_rgba(0,0,0,.18)] transition hover:bg-[#242b38]"
              >
                <span className="flex h-[38px] items-center gap-2 border-b border-[#3a4c68] px-3 text-[15px]">
                  <CircleHelp className="size-3 text-brand-gold" />
                  {platform.name}
                </span>
                <span className="block px-3 py-2 text-[13px] text-[#5878ae]">
                  {platform.amount}
                </span>
              </button>
            ))
          ) : (
            <p className="mt-4 text-[13px] text-[#5878ae]">
              No platforms found.
            </p>
          )}
          {recovered ? (
            <p className="mt-3 text-[12px] font-medium text-brand-gold">
              Balance recovery request completed.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  valueClassName = "text-white",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div>
      <p className="text-[15px] leading-5 text-[#5878ae]">{label}</p>
      <p className={`text-[16px] leading-5 ${valueClassName}`}>{value}</p>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <label className={`relative block h-[34px] shrink-0 ${className}`}>
      <span className="sr-only">{value}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-full w-full appearance-none rounded-full border border-[#3a5882] bg-[#222a36] py-0 pl-4 pr-8 text-[13px] font-medium text-[#5878ae] outline-none transition hover:border-[#5073a8] focus:border-brand-gold"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#5878ae]" />
    </label>
  );
}

function EmptyState({
  className = "",
  context,
}: {
  className?: string;
  context?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative h-[118px] w-[150px] opacity-35">
        <div className="absolute bottom-0 left-1/2 h-[70px] w-[112px] -translate-x-1/2 rounded-b-[7px] rounded-t-[3px] bg-gradient-to-b from-[#586274] to-[#4c5667]" />
        <Boxes className="absolute bottom-8 left-1/2 size-11 -translate-x-1/2 text-[#323b4b]" />
        <Send className="absolute right-7 top-0 size-14 -rotate-12 fill-[#586274] text-[#586274]" />
      </div>
      <p className="mt-5 text-center text-[15px] font-medium text-[#5878ae]">
        No records today, but{" "}
        <button
          className="text-brand-gold transition hover:brightness-110"
          type="button"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Hide" : "See more"}
        </button>
      </p>
      {expanded ? (
        <p className="mt-2 max-w-[260px] text-center text-[12px] font-medium text-[#5878ae]">
          No earlier records match {context ?? "the selected filters"}.
        </p>
      ) : null}
    </div>
  );
}
