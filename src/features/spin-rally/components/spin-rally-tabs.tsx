"use client";

import Image from "next/image";
import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  Coins,
  Flag,
  History,
  Info,
  ListChecks,
  LockKeyhole,
  Medal,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/design-system/primitives/button";
import { cn } from "@/shared/lib/utils";
import type {
  SpinRally,
  SpinRallyCmsSection,
  SpinRallyHistoryItem,
  SpinRallyPointTable,
  SpinRallyPrize,
} from "../types";

type SpinRallyTab = "agenda" | "points" | "history";

const tabs: Array<{
  id: SpinRallyTab;
  label: string;
  icon: typeof CalendarClock;
}> = [
  { id: "agenda", label: "Agenda", icon: CalendarClock },
  { id: "points", label: "Points Rule", icon: ListChecks },
  { id: "history", label: "Histórico", icon: History },
];

export function SpinRallyTabs({
  rallies,
  pointTable,
  history,
}: {
  rallies: SpinRally[];
  pointTable: SpinRallyPointTable | null;
  history: SpinRallyHistoryItem[];
}) {
  const [activeTab, setActiveTab] = useState<SpinRallyTab>("agenda");
  const activeRallies = useMemo(
    () =>
      rallies.toSorted(
        (a, b) =>
          toTime(a.scheduledStartAt) - toTime(b.scheduledStartAt) ||
          a.title.localeCompare(b.title),
      ),
    [rallies],
  );

  return (
    <section className="mt-4">
      <div className="grid grid-cols-3 gap-2" role="tablist" aria-label="Spin Rally tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex h-[54px] cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border text-[12px] font-black transition active:scale-[.98]",
                active
                  ? "border-brand-gold bg-brand-gold text-[#1d222c] shadow-[0_10px_24px_rgba(255,207,84,.18)]"
                  : "border-[#344868] bg-[#263146] text-[#8facd9] hover:border-brand-gold/60 hover:text-white",
              )}
            >
              <Icon className="size-4" strokeWidth={2.2} />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3">
        {activeTab === "agenda" ? <AgendaPanel rallies={activeRallies} /> : null}
        {activeTab === "points" ? <PointsPanel pointTable={pointTable} /> : null}
        {activeTab === "history" ? <HistoryPanel history={history} /> : null}
      </div>
    </section>
  );
}

function AgendaPanel({ rallies }: { rallies: SpinRally[] }) {
  if (rallies.length === 0) {
    return (
      <EmptyState
        icon={Flag}
        title="No rallies are scheduled"
        description="New Spin Rally rounds will appear here as soon as they are available."
      />
    );
  }

  return (
    <div className="space-y-3">
      {rallies.map((rally) => (
        <RallyCard key={rally.id} rally={rally} />
      ))}
    </div>
  );
}

function RallyCard({ rally }: { rally: SpinRally }) {
  const topPrize = rally.prizePool[0]?.amount ?? 0;

  return (
    <article className="overflow-hidden rounded-[14px] border border-[#344868] bg-[#202733] shadow-[0_12px_28px_rgba(0,0,0,.22)]">
      <div className="relative min-h-[118px] overflow-hidden bg-[radial-gradient(circle_at_17%_20%,rgba(70,191,255,.18),transparent_31%),radial-gradient(circle_at_92%_14%,rgba(255,207,84,.22),transparent_33%),linear-gradient(145deg,#253452_0%,#192232_70%,#111722_100%)] px-4 py-4">
        <div className="absolute right-3 top-3">
          <StatusBadge status={rally.status} />
        </div>
        <div className="absolute -right-8 bottom-[-30px] grid size-28 place-items-center rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
          <Trophy className="size-14" strokeWidth={1.7} />
        </div>
        <p className="relative z-10 text-[11px] font-black uppercase tracking-[0.12em] text-brand-gold">
          {rally.gameName || "Featured game"}
        </p>
        <h2 className="relative z-10 mt-2 max-w-[245px] text-[21px] font-black leading-tight text-white">
          {rally.title}
        </h2>
        <div className="relative z-10 mt-3 flex flex-wrap gap-2">
          <MiniPill icon={Coins} label={`Top ${formatMoney(topPrize)}`} />
          <MiniPill icon={Clock3} label={`${rally.durationMinutes || 0} min`} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px border-y border-[#344868] bg-[#344868]">
        <Metric label="Min bet" value={formatMoney(rally.minBet)} />
        <Metric label="Spins" value={String(rally.maxSpinsPerPlayer || "-")} />
        <Metric label="Starts" value={formatShortDate(rally.scheduledStartAt)} />
      </div>

      <div className="p-3">
        <PrizePodium prizes={rally.prizePool} />
        <Button
          disabled
          className="mt-3 h-9 w-full rounded-[9px] border border-[#496592] bg-[#2c3b56] text-[13px] font-black text-[#9fb8df] opacity-100"
        >
          <LockKeyhole className="size-4" />
          Login to join
        </Button>
      </div>
    </article>
  );
}

function PrizePodium({ prizes }: { prizes: SpinRallyPrize[] }) {
  const visiblePrizes = prizes.slice(0, 3);

  if (visiblePrizes.length === 0) {
    return (
      <div className="rounded-[10px] border border-dashed border-[#344868] bg-[#1d222c] px-3 py-3 text-center text-[12px] font-semibold text-[#8facd9]">
        Prize details will be announced soon.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {visiblePrizes.map((prize) => (
        <div
          key={prize.id}
          className="rounded-[10px] border border-[#344868] bg-[#263146] px-2.5 py-2 text-center"
        >
          <div className="mx-auto grid size-8 place-items-center rounded-full bg-brand-gold/12 text-brand-gold">
            <Medal className="size-4" />
          </div>
          <p className="mt-1 text-[10px] font-black uppercase text-[#6e8ab7]">
            Rank {prize.rank}
          </p>
          <p className="truncate text-[13px] font-black text-white">
            {formatMoney(prize.amount)}
          </p>
        </div>
      ))}
    </div>
  );
}

function PointsPanel({
  pointTable,
}: {
  pointTable: SpinRallyPointTable | null;
}) {
  if (!pointTable || pointTable.sections.length === 0) {
    return (
      <EmptyState
        icon={ListChecks}
        title="Point rules are coming soon"
        description="The scoring guide will be shown here once it is available."
      />
    );
  }

  return (
    <div className="space-y-3">
      {pointTable.sections.map((section) => (
        <RuleSection key={section.id} section={section} />
      ))}
    </div>
  );
}

function RuleSection({ section }: { section: SpinRallyCmsSection }) {
  return (
    <article className="rounded-[14px] border border-[#344868] bg-[#202733] p-3 shadow-[0_10px_24px_rgba(0,0,0,.18)]">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-[#46bfff]/10 text-[#6fd4ff]">
          <Info className="size-4" />
        </span>
        <div className="min-w-0">
          <h2 className="text-[16px] font-black leading-tight text-white">
            {section.sectionName}
          </h2>
          {section.description ? (
            <p className="mt-1 text-[12px] font-medium leading-relaxed text-[#9fb8df]">
              {section.description}
            </p>
          ) : null}
        </div>
      </div>

      {section.records.length > 0 ? (
        <div className="mt-3 grid gap-2">
          {section.records.map((record) => (
            <div
              key={record.id}
              className="flex min-h-[64px] items-center gap-3 rounded-[10px] border border-[#344868] bg-[#263146] px-3 py-2"
            >
              <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-[9px] bg-[#151c28]">
                {record.imageUrl ? (
                  <Image
                    src={record.imageUrl}
                    alt=""
                    width={44}
                    height={44}
                    sizes="44px"
                    className="max-h-9 w-auto max-w-9 object-contain"
                  />
                ) : (
                  <Sparkles className="size-5 text-brand-gold" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold leading-snug text-white">
                  {record.content || "Point reward"}
                </p>
                {record.points ? (
                  <p className="mt-1 text-[12px] font-black text-brand-gold">
                    {record.points}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function HistoryPanel({ history }: { history: SpinRallyHistoryItem[] }) {
  if (history.length === 0) {
    return (
      <EmptyState
        icon={History}
        title="No Spin Rally history yet"
        description="Your completed Spin Rally entries will appear here after you join and finish a round."
      />
    );
  }

  return (
    <div className="space-y-3">
      {history.map((item) => (
        <article
          key={item.id}
          className="rounded-[14px] border border-[#344868] bg-[#202733] p-3 shadow-[0_10px_24px_rgba(0,0,0,.18)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-[0.1em] text-brand-gold">
                {formatShortDate(item.rally?.scheduledStartAt ?? item.optedInAt)}
              </p>
              <h2 className="mt-1 truncate text-[16px] font-black text-white">
                {item.rally?.title ?? "Spin Rally"}
              </h2>
            </div>
            <StatusBadge status={item.rally?.status ?? "completed"} />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <Metric label="Points" value={String(item.totalPoints)} />
            <Metric label="Rank" value={item.rank ? `#${item.rank}` : "-"} />
            <Metric label="Prize" value={formatMoney(item.prizeAmount)} />
          </div>
        </article>
      ))}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Flag;
  title: string;
  description: string;
}) {
  return (
    <div className="grid min-h-[236px] place-items-center rounded-[16px] border border-[#344868] bg-[radial-gradient(circle_at_50%_0%,rgba(70,191,255,.12),transparent_42%),linear-gradient(180deg,#202733,#19202a)] px-5 text-center shadow-[0_12px_28px_rgba(0,0,0,.22)]">
      <div>
        <div className="mx-auto grid size-16 place-items-center rounded-full border border-[#46bfff]/30 bg-[#46bfff]/10 text-[#6fd4ff]">
          <Icon className="size-8" />
        </div>
        <h2 className="mt-4 text-[18px] font-black text-white">{title}</h2>
        <p className="mx-auto mt-2 max-w-[280px] text-[12px] font-semibold leading-relaxed text-[#8facd9]">
          {description}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const active = normalized.includes("active");
  const completed =
    normalized.includes("completed") || normalized.includes("sent");

  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1 rounded-full border px-2.5 text-[10px] font-black uppercase",
        active &&
          "border-[#39d98a]/45 bg-[#39d98a]/12 text-[#67f5ad]",
        completed &&
          "border-[#6e8ab7]/45 bg-[#263146] text-[#9fb8df]",
        !active &&
          !completed &&
          "border-brand-gold/45 bg-brand-gold/12 text-brand-gold",
      )}
    >
      {active ? <CheckCircle2 className="size-3.5" /> : null}
      {completed ? <ShieldCheck className="size-3.5" /> : null}
      {!active && !completed ? <Clock3 className="size-3.5" /> : null}
      {startCase(status)}
    </span>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-[9px] bg-[#1d222c] px-2.5 py-2 text-center">
      <p className="truncate text-[10px] font-black uppercase text-[#6e8ab7]">
        {label}
      </p>
      <p className="mt-0.5 truncate text-[13px] font-black text-white">{value}</p>
    </div>
  );
}

function MiniPill({
  icon: Icon,
  label,
}: {
  icon: typeof Coins;
  label: string;
}) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-[#344868] bg-[#111722]/65 px-2.5 text-[11px] font-black text-white">
      <Icon className="size-3.5 text-brand-gold" />
      {label}
    </span>
  );
}

function formatMoney(value: number) {
  if (!value) {
    return "-";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

function formatShortDate(value: string | null | undefined) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  })
    .format(date)
    .replace(".", "");
}

function toTime(value: string | null) {
  if (!value) {
    return Number.MAX_SAFE_INTEGER;
  }

  const time = new Date(value).getTime();
  return Number.isNaN(time) ? Number.MAX_SAFE_INTEGER : time;
}

function startCase(value: string) {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
