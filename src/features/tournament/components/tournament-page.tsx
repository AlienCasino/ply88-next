import { Sparkles, Trophy } from "lucide-react";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "@/features/public-home/data/home-drawer-content";
import { CasinoPageShell } from "@/shared/components/layout";
import { getTournaments } from "../services/tournament.service";
import { TournamentTabs } from "./tournament-tabs";

export async function TournamentPage() {
  const [tournaments, sidebarContent] = await Promise.all([
    getTournaments(),
    getLeftSidebarSliders(),
  ]);
  const activeCount = tournaments.filter((tournament) =>
    isLiveOrUpcoming(tournament.status),
  ).length;
  const completedCount = tournaments.length - activeCount;

  return (
    <CasinoPageShell
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
    >
      <main className="px-3 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+20px)] pt-3">
        <section className="relative overflow-hidden rounded-[16px] border border-[#344868] bg-[#202733] shadow-[0_18px_42px_rgba(0,0,0,.28)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,207,84,.25),transparent_30%),radial-gradient(circle_at_88%_9%,rgba(70,191,255,.2),transparent_30%),linear-gradient(145deg,#263146_0%,#192232_67%,#101620_100%)]" />
          <div className="absolute right-3 top-4 grid size-20 place-items-center rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold/90">
            <Trophy className="size-10" strokeWidth={1.7} />
          </div>
          <div className="relative z-10 px-4 py-4">
            <p className="inline-flex h-7 items-center gap-1.5 rounded-full border border-brand-gold/30 bg-[#111722]/50 px-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-brand-gold">
              <Sparkles className="size-3.5" />
              Competition
            </p>
            <h1 className="mt-3 max-w-[250px] text-[28px] font-black leading-[1.04] text-white">
              Tournament
            </h1>
            <p className="mt-2 max-w-[250px] text-[12px] font-semibold leading-relaxed text-[#9fb8df]">
              Enter casino challenges, place eligible bets, and race for the top prize ranks.
            </p>
          </div>
          <div className="relative z-10 grid grid-cols-3 border-t border-[#344868]/80 bg-[#141b27]/70">
            <StatTile label="Active" value={String(activeCount)} />
            <StatTile label="Completed" value={String(completedCount)} />
            <StatTile label="Total" value={String(tournaments.length)} />
          </div>
        </section>

        <TournamentTabs tournaments={tournaments} />
      </main>
    </CasinoPageShell>
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

function isLiveOrUpcoming(status: string) {
  const normalized = status.toLowerCase();
  return normalized.includes("active") || normalized.includes("upcoming");
}
