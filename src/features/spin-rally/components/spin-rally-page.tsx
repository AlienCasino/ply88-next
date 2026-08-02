import { Flag, Sparkles } from "lucide-react";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "@/features/public-home/data/home-drawer-content";
import { CasinoPageShell } from "@/shared/components/layout";
import {
  getSpinRallies,
  getSpinRallyHistory,
  getSpinRallyPointTable,
} from "../services/spin-rally.service";
import { SpinRallyTabs } from "./spin-rally-tabs";

export async function SpinRallyPage() {
  const [rallies, pointTable, history, sidebarContent] = await Promise.all([
    getSpinRallies(),
    getSpinRallyPointTable(),
    getSpinRallyHistory(),
    getLeftSidebarSliders(),
  ]);

  return (
    <CasinoPageShell
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
    >
      <main className="px-3 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+20px)] pt-3">
        <section className="relative overflow-hidden rounded-[16px] border border-[#344868] bg-[#202733] shadow-[0_18px_42px_rgba(0,0,0,.28)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(70,191,255,.26),transparent_31%),radial-gradient(circle_at_88%_8%,rgba(255,207,84,.24),transparent_30%),linear-gradient(145deg,#263146_0%,#172130_58%,#101620_100%)]" />
          <div className="absolute right-3 top-4 grid size-20 place-items-center rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold/90">
            <Flag className="size-10" strokeWidth={1.7} />
          </div>
          <div className="relative z-10 px-4 py-4">
            <p className="inline-flex h-7 items-center gap-1.5 rounded-full border border-[#46bfff]/35 bg-[#0f1c2e]/55 px-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#6fd4ff]">
              <Sparkles className="size-3.5" />
              Tournament
            </p>
            <h1 className="mt-3 max-w-[250px] text-[28px] font-black leading-[1.04] text-white">
              Spin Rally
            </h1>
            <p className="mt-2 max-w-[248px] text-[12px] font-semibold leading-relaxed text-[#9fb8df]">
              Play eligible rounds, collect points, and climb the prize table before the rally ends.
            </p>
          </div>
          <div className="relative z-10 grid grid-cols-3 border-t border-[#344868]/80 bg-[#141b27]/70">
            <StatTile label="Rallies" value={String(rallies.length)} />
            <StatTile label="Rules" value={pointTable ? "Ready" : "Soon"} />
            <StatTile label="History" value={String(history.length)} />
          </div>
        </section>

        <SpinRallyTabs
          rallies={rallies}
          pointTable={pointTable}
          history={history}
        />
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
