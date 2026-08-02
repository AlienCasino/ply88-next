"use client";

import {
  CheckCircle2,
  Clock3,
  Coins,
  LockKeyhole,
  Medal,
  ShieldCheck,
  Trophy,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/design-system/primitives/button";
import { cn } from "@/shared/lib/utils";
import type { Tournament, TournamentPrize } from "../types";

type TournamentTab = "active" | "completed";

const tabs: Array<{
  id: TournamentTab;
  label: string;
  icon: LucideIcon;
}> = [
  { id: "active", label: "Ativos", icon: Trophy },
  { id: "completed", label: "Concluídos", icon: ShieldCheck },
];

export function TournamentTabs({
  tournaments,
}: {
  tournaments: Tournament[];
}) {
  const [activeTab, setActiveTab] = useState<TournamentTab>("active");
  const groups = useMemo(() => splitTournaments(tournaments), [tournaments]);
  const visibleTournaments =
    activeTab === "active" ? groups.active : groups.completed;

  return (
    <section className="mt-4">
      <div className="grid grid-cols-2 gap-2" role="tablist" aria-label="Tournament tabs">
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
                "flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-[999px] border px-3 text-[13px] font-black transition active:scale-[.98]",
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
        {visibleTournaments.length > 0 ? (
          <div className="space-y-3">
            {visibleTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        ) : (
          <EmptyState tab={activeTab} />
        )}
      </div>
    </section>
  );
}

function TournamentCard({ tournament }: { tournament: Tournament }) {
  const topPrize = tournament.prizePool[0]?.amount ?? 0;

  return (
    <article className="overflow-hidden rounded-[14px] border border-[#344868] bg-[#202733] shadow-[0_12px_28px_rgba(0,0,0,.22)]">
      <div className="relative min-h-[118px] overflow-hidden bg-[radial-gradient(circle_at_14%_18%,rgba(255,207,84,.2),transparent_30%),radial-gradient(circle_at_90%_15%,rgba(70,191,255,.18),transparent_34%),linear-gradient(145deg,#253452_0%,#192232_70%,#111722_100%)] px-4 py-4">
        <div className="absolute right-3 top-3">
          <StatusBadge status={tournament.status} />
        </div>
        <div className="absolute -bottom-7 right-4 grid size-24 place-items-center rounded-full border border-brand-gold/20 bg-brand-gold/10 text-brand-gold/80">
          <Trophy className="size-11" strokeWidth={1.7} />
        </div>
        <p className="relative z-10 text-[11px] font-black uppercase tracking-[0.12em] text-brand-gold">
          {startCase(tournament.type)}
        </p>
        <h2 className="relative z-10 mt-2 max-w-[245px] text-[21px] font-black leading-tight text-white">
          {tournament.title}
        </h2>
        <div className="relative z-10 mt-3 flex flex-wrap gap-2">
          <MiniPill icon={Coins} label={`Top ${formatMoney(topPrize)}`} />
          <MiniPill icon={UsersRound} label={`${tournament.minPlayersForValid || 0}+ players`} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px border-y border-[#344868] bg-[#344868]">
        <Metric label="Min bet" value={formatMoney(tournament.minBet)} />
        <Metric label="Duration" value={formatDuration(tournament.durationMinutes)} />
        <Metric label="Starts" value={formatShortDate(tournament.scheduledStartAt)} />
      </div>

      <div className="p-3">
        <PrizePodium prizes={tournament.prizePool} />
        {tournament.myEntry ? (
          <div className="mt-3 grid grid-cols-3 gap-2 rounded-[10px] border border-[#344868] bg-[#1d222c] p-2">
            <Metric label="Points" value={String(tournament.myEntry.totalPoints)} />
            <Metric
              label="Rank"
              value={tournament.myEntry.rank ? `#${tournament.myEntry.rank}` : "-"}
            />
            <Metric
              label="Prize"
              value={
                tournament.myEntry.prizeAmount
                  ? formatMoney(tournament.myEntry.prizeAmount)
                  : "-"
              }
            />
          </div>
        ) : null}
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

function PrizePodium({ prizes }: { prizes: TournamentPrize[] }) {
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

function EmptyState({ tab }: { tab: TournamentTab }) {
  const completed = tab === "completed";

  return (
    <div className="grid min-h-[310px] place-items-center rounded-[16px] border border-[#344868] bg-[radial-gradient(circle_at_50%_0%,rgba(255,207,84,.1),transparent_42%),linear-gradient(180deg,#202733,#161d27)] px-5 text-center shadow-[0_12px_28px_rgba(0,0,0,.22)]">
      <div>
        <div className="mx-auto grid size-16 place-items-center rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
          <Trophy className="size-8" />
        </div>
        <h2 className="mt-4 text-[18px] font-black text-white">
          {completed ? "No completed tournaments yet" : "No tournaments found"}
        </h2>
        <p className="mx-auto mt-2 max-w-[285px] text-[12px] font-semibold leading-relaxed text-[#8facd9]">
          {completed
            ? "Finished tournament results will appear here once challenges are completed."
            : "There are no active or upcoming tournaments right now. Check back soon for new challenges."}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const active = normalized.includes("active");
  const completed = normalized.includes("completed");

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
  icon: LucideIcon;
  label: string;
}) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-[#344868] bg-[#111722]/65 px-2.5 text-[11px] font-black text-white">
      <Icon className="size-3.5 text-brand-gold" />
      {label}
    </span>
  );
}

function splitTournaments(tournaments: Tournament[]) {
  const sorted = tournaments.toSorted(
    (a, b) =>
      toTime(a.scheduledStartAt) - toTime(b.scheduledStartAt) ||
      a.title.localeCompare(b.title),
  );

  return {
    active: sorted.filter((tournament) =>
      isLiveOrUpcoming(tournament.status),
    ),
    completed: sorted.filter(
      (tournament) => !isLiveOrUpcoming(tournament.status),
    ),
  };
}

function isLiveOrUpcoming(status: string) {
  const normalized = status.toLowerCase();
  return normalized.includes("active") || normalized.includes("upcoming");
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

function formatDuration(minutes: number) {
  if (!minutes) {
    return "-";
  }

  if (minutes >= 1440 && minutes % 1440 === 0) {
    return `${minutes / 1440}d`;
  }

  if (minutes >= 60 && minutes % 60 === 0) {
    return `${minutes / 60}h`;
  }

  return `${minutes}m`;
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
