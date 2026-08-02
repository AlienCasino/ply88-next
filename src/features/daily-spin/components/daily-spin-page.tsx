import { ChevronLeft, Clock3, Gift, ShieldCheck, Trophy } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { routes } from "@/core/constants/routes";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import { CasinoPageShell } from "@/shared/components/layout";
import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "@/features/public-home/data/home-drawer-content";
import { fallbackDailySpinSlices } from "../data/daily-spin-content";
import { DailySpinWheel } from "./daily-spin-wheel";

export async function DailySpinPage() {
  const sidebarContent = await getLeftSidebarSliders();

  return (
    <CasinoPageShell
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
    >
      <main className="px-3 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+20px)] pt-3">
        <div className="mb-3 flex items-center gap-2">
          <Link
            href={routes.home}
            className="grid size-9 place-items-center rounded-full border border-[#344868] bg-[#263146] text-[#8facd9] transition hover:text-white"
            aria-label="Voltar para inicio"
          >
            <ChevronLeft className="size-5" />
          </Link>
          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-brand-gold">
              Daily Reward
            </p>
            <h1 className="truncate text-[22px] font-black leading-tight text-white">
              Roda da Sorte
            </h1>
          </div>
        </div>

        <section className="mb-4 overflow-hidden rounded-[16px] border border-[#344868] bg-[#202733] shadow-[0_14px_34px_rgba(0,0,0,.26)]">
          <div className="relative min-h-[128px] overflow-hidden bg-[radial-gradient(circle_at_20%_12%,rgba(255,207,84,.26),transparent_28%),radial-gradient(circle_at_92%_10%,rgba(57,217,138,.24),transparent_32%),linear-gradient(145deg,#263146_0%,#1d222c_60%,#141922_100%)] px-4 py-4">
            <div className="absolute right-3 top-3 grid size-20 place-items-center rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold/90">
              <Trophy className="size-10" strokeWidth={1.7} />
            </div>
            <p className="relative z-10 inline-flex h-7 items-center gap-1.5 rounded-full border border-brand-gold/30 bg-[#111722]/45 px-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-gold">
              <Gift className="size-3.5" />
              Bonus diario
            </p>
            <h2 className="relative z-10 mt-3 max-w-[245px] text-[25px] font-black leading-[1.06] text-white">
              Gire uma vez e descubra seu premio
            </h2>
            <p className="relative z-10 mt-2 max-w-[245px] text-[12px] font-medium leading-relaxed text-[#9fb8df]">
              Uma experiencia pronta para conectar ao resultado real quando a API estiver disponivel.
            </p>
          </div>
          <div className="grid grid-cols-2 border-t border-[#344868] bg-[#1b212b]/85">
            <InfoTile icon={<Clock3 className="size-4" />} label="Atualiza" value="Diariamente" />
            <InfoTile icon={<ShieldCheck className="size-4" />} label="Status" value="Demo ativa" />
          </div>
        </section>

        <DailySpinWheel slices={fallbackDailySpinSlices} />
      </main>
    </CasinoPageShell>
  );
}

function InfoTile({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-3">
      <span className="grid size-8 place-items-center rounded-full bg-brand-gold/10 text-brand-gold">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase text-[#6e8ab7]">{label}</p>
        <p className="truncate text-[12px] font-black text-white">{value}</p>
      </div>
    </div>
  );
}
