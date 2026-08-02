import {
  BadgePercent,
  Crown,
  Gem,
  Gift,
  LockKeyhole,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "@/features/public-home/data/home-drawer-content";
import { CasinoPageShell } from "@/shared/components/layout";
import { getVipLevels } from "../services/vip-level.service";
import type { VipLevel, VipProgress } from "../types";

const fallbackProgress: VipProgress = {
  currentLevel: 0,
  nextLevel: 1,
  currentLevelTotalXp: 0,
  totalXpRequiredForNextLevel: 500,
  currentDeposit: 0,
  currentBet: 0,
  depositPercentage: 0,
  betPercentage: 0,
};

export async function VipLevelPage() {
  const [vipData, sidebarContent] = await Promise.all([
    getVipLevels(),
    getLeftSidebarSliders(),
  ]);
  const levels = vipData.levels;
  const highlightedLevel =
    levels.find((level) => level.level === fallbackProgress.nextLevel) ??
    levels[1] ??
    levels[0] ??
    null;

  return (
    <CasinoPageShell
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
    >
      <main className="px-3 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+20px)] pt-3">
        <section className="relative overflow-hidden rounded-[16px] border border-[#344868] bg-[#202733] shadow-[0_18px_42px_rgba(0,0,0,.28)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,207,84,.28),transparent_30%),radial-gradient(circle_at_88%_9%,rgba(209,87,255,.2),transparent_30%),linear-gradient(145deg,#2b344b_0%,#1a2230_64%,#101620_100%)]" />
          <div className="absolute right-3 top-4 grid size-20 place-items-center rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold/90">
            <Crown className="size-10" strokeWidth={1.7} />
          </div>
          <div className="relative z-10 px-4 py-4">
            <p className="inline-flex h-7 items-center gap-1.5 rounded-full border border-brand-gold/30 bg-[#111722]/50 px-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-brand-gold">
              <Sparkles className="size-3.5" />
              VIP Club
            </p>
            <h1 className="mt-3 max-w-[250px] text-[28px] font-black leading-[1.04] text-white">
              VIP Level
            </h1>
            <p className="mt-2 max-w-[250px] text-[12px] font-semibold leading-relaxed text-[#9fb8df]">
              Level up with eligible play and unlock richer cashback, rewards, and bonus boosts.
            </p>
          </div>
          <div className="relative z-10 grid grid-cols-3 border-t border-[#344868]/80 bg-[#141b27]/70">
            <StatTile label="Levels" value={String(levels.length)} />
            <StatTile
              label="Next"
              value={`VIP ${fallbackProgress.nextLevel}`}
            />
            <StatTile
              label="Boost"
              value={`${highlightedLevel?.bonusMultiplier ?? 0}x`}
            />
          </div>
        </section>

        <VipProgressCard progress={fallbackProgress} />

        {levels.length > 0 ? (
          <>
            <section className="mt-4">
              <div className="mb-3 flex min-h-7 items-center justify-between">
                <h2 className="text-[19px] font-semibold text-white">VIP tiers</h2>
                <span className="rounded-full border border-[#344868] bg-[#263146] px-2.5 py-1 text-[11px] font-bold text-[#8facd9]">
                  {levels.length} total
                </span>
              </div>
              <div className="a66-hidden-scrollbar -mx-3 flex gap-3 overflow-x-auto px-3 pb-1">
                {levels.map((level) => (
                  <VipLevelCard
                    key={level.id}
                    level={level}
                    active={level.level === fallbackProgress.currentLevel}
                  />
                ))}
              </div>
            </section>

            <section className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <Gem className="size-5 text-brand-gold" />
                <h2 className="text-[19px] font-semibold text-white">
                  Level benefits
                </h2>
              </div>
              {levels.map((level) => (
                <BenefitRow key={level.id} level={level} />
              ))}
            </section>
          </>
        ) : (
          <EmptyState />
        )}
      </main>
    </CasinoPageShell>
  );
}

function VipProgressCard({ progress }: { progress: VipProgress }) {
  const xpProgress = getPercentage(
    progress.currentLevelTotalXp,
    progress.totalXpRequiredForNextLevel,
  );

  return (
    <section className="mt-4 rounded-[14px] border border-[#344868] bg-[#202733] p-3 shadow-[0_12px_28px_rgba(0,0,0,.22)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.1em] text-brand-gold">
            Current progress
          </p>
          <h2 className="mt-1 text-[20px] font-black text-white">
            VIP {progress.currentLevel} to VIP {progress.nextLevel}
          </h2>
          <p className="mt-1 text-[12px] font-semibold leading-relaxed text-[#8facd9]">
            Sign in later to replace this preview with your live VIP progress.
          </p>
        </div>
        <div className="grid size-11 shrink-0 place-items-center rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
          <LockKeyhole className="size-5" />
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-[11px] font-black text-[#9fb8df]">
          <span>XP progress</span>
          <span>
            {formatCompact(progress.currentLevelTotalXp)} /{" "}
            {formatCompact(progress.totalXpRequiredForNextLevel)}
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-[#151c28]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-gold to-[#ff9d2e] shadow-[0_0_14px_rgba(255,207,84,.3)]"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <ProgressMetric
          label="Deposit"
          value={formatMoney(progress.currentDeposit)}
          percentage={progress.depositPercentage}
        />
        <ProgressMetric
          label="Bets"
          value={formatMoney(progress.currentBet)}
          percentage={progress.betPercentage}
        />
      </div>
    </section>
  );
}

function VipLevelCard({
  level,
  active,
}: {
  level: VipLevel;
  active: boolean;
}) {
  return (
    <article className="relative min-w-[188px] overflow-hidden rounded-[14px] border border-[#344868] bg-[#202733] p-3 shadow-[0_12px_28px_rgba(0,0,0,.2)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(255,207,84,.2),transparent_26%),linear-gradient(145deg,rgba(255,207,84,.12),rgba(70,191,255,.08)_45%,transparent)]" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="grid size-12 place-items-center rounded-[12px] border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
            <Crown className="size-6" />
          </div>
          {active ? (
            <span className="rounded-full bg-[#39d98a]/15 px-2 py-1 text-[10px] font-black uppercase text-[#67f5ad]">
              Current
            </span>
          ) : null}
        </div>
        <p className="mt-4 text-[11px] font-black uppercase tracking-[0.12em] text-brand-gold">
          VIP {level.level}
        </p>
        <h3 className="mt-1 truncate text-[19px] font-black text-white">
          {level.name}
        </h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <MiniBenefit icon={Gift} label="Reward" value={formatMoney(level.rewardAmount)} />
          <MiniBenefit
            icon={BadgePercent}
            label="Cashback"
            value={`${level.cashbackOriginalGames}%`}
          />
        </div>
      </div>
    </article>
  );
}

function BenefitRow({ level }: { level: VipLevel }) {
  return (
    <article className="rounded-[13px] border border-[#344868] bg-[#202733] p-3 shadow-[0_10px_24px_rgba(0,0,0,.18)]">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.1em] text-brand-gold">
            VIP {level.level}
          </p>
          <h3 className="truncate text-[16px] font-black text-white">
            {level.name}
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-[#344868] bg-[#1d222c] px-2.5 py-1 text-[11px] font-black text-[#9fb8df]">
          {formatCompact(level.requiredXp)} XP
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Metric label="Deposit" value={formatMoney(level.totalDeposit)} />
        <Metric label="Bets" value={formatMoney(level.totalBets)} />
        <Metric label="Original cashback" value={`${level.cashbackOriginalGames}%`} />
        <Metric label="Live cashback" value={`${level.cashbackLiveCasino}%`} />
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="mt-4 grid min-h-[260px] place-items-center rounded-[16px] border border-[#344868] bg-[radial-gradient(circle_at_50%_0%,rgba(255,207,84,.1),transparent_42%),linear-gradient(180deg,#202733,#161d27)] px-5 text-center shadow-[0_12px_28px_rgba(0,0,0,.22)]">
      <div>
        <div className="mx-auto grid size-16 place-items-center rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
          <Crown className="size-8" />
        </div>
        <h2 className="mt-4 text-[18px] font-black text-white">
          VIP levels are unavailable
        </h2>
        <p className="mx-auto mt-2 max-w-[285px] text-[12px] font-semibold leading-relaxed text-[#8facd9]">
          The level table could not be loaded right now. Please check again shortly.
        </p>
      </div>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 px-3 py-3 text-center">
      <p className="truncate text-[10px] font-black uppercase tracking-[0.08em] text-[#6e8ab7]">
        {label}
      </p>
      <p className="mt-0.5 truncate text-[13px] font-black text-white">{value}</p>
    </div>
  );
}

function ProgressMetric({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: number;
}) {
  return (
    <div className="rounded-[10px] border border-[#344868] bg-[#263146] p-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-black uppercase text-[#6e8ab7]">{label}</p>
        <p className="text-[11px] font-black text-brand-gold">
          {Math.round(clamp(percentage, 0, 100))}%
        </p>
      </div>
      <p className="mt-1 truncate text-[13px] font-black text-white">{value}</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#151c28]">
        <div
          className="h-full rounded-full bg-[#6fd4ff]"
          style={{ width: `${clamp(percentage, 0, 100)}%` }}
        />
      </div>
    </div>
  );
}

function MiniBenefit({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Gift;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-[9px] bg-[#1d222c]/78 p-2">
      <Icon className="mb-1 size-4 text-brand-gold" />
      <p className="truncate text-[10px] font-black uppercase text-[#6e8ab7]">
        {label}
      </p>
      <p className="truncate text-[12px] font-black text-white">{value}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-[9px] bg-[#1d222c] px-2.5 py-2">
      <div className="mb-1 flex items-center gap-1.5 text-[#6e8ab7]">
        <TrendingUp className="size-3.5" />
        <p className="truncate text-[10px] font-black uppercase">{label}</p>
      </div>
      <p className="truncate text-[13px] font-black text-white">{value}</p>
    </div>
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

function formatCompact(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    notation: value >= 10000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function getPercentage(current: number, total: number) {
  if (!total) {
    return 0;
  }

  return clamp((current / total) * 100, 0, 100);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
