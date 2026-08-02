import Link from "next/link";
import { ArrowRight, Gem, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { routes } from "@/core/constants/routes";
import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "@/features/public-home/data/home-drawer-content";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import { CasinoPageShell } from "@/shared/components/layout";

const vipViewer = {
  balance: "0,00",
};

const vipPerks = [
  { label: "Cashback", value: "Até 50%", icon: Sparkles },
  { label: "Proteção", value: "Conta segura", icon: ShieldCheck },
  { label: "Prêmios", value: "Eventos VIP", icon: Trophy },
];

export default async function VipPage() {
  const sidebarContent = await getLeftSidebarSliders();

  return (
    <CasinoPageShell
      viewer={vipViewer}
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
    >
      <main className="px-3 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+22px)] pt-3">
        <section className="overflow-hidden rounded-[16px] border border-[#344868] bg-[#202733] shadow-[0_18px_42px_rgba(0,0,0,.26)]">
          <div className="relative min-h-[170px] overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(255,207,84,.28),transparent_28%),radial-gradient(circle_at_90%_10%,rgba(80,143,255,.24),transparent_28%),linear-gradient(145deg,#263146_0%,#1d222c_62%,#151b25_100%)] p-4">
            <div className="absolute -right-4 bottom-4 grid size-24 place-items-center rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
              <Gem className="size-12" strokeWidth={1.8} />
            </div>
            <p className="relative z-10 text-[11px] font-black uppercase tracking-[0.14em] text-brand-gold">
              Clube VIP
            </p>
            <h1 className="relative z-10 mt-4 max-w-[250px] text-[27px] font-black leading-[1.05] text-white">
              Recompensas A66BET
            </h1>
            <p className="relative z-10 mt-2 max-w-[255px] text-[12px] font-medium leading-relaxed text-[#9fb8df]">
              Acompanhe níveis, benefícios e bônus exclusivos em um só lugar.
            </p>
          </div>
        </section>

        <section className="mt-3 grid grid-cols-3 gap-2">
          {vipPerks.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-[12px] border border-[#344868] bg-[#263146] px-2 py-3 text-center"
            >
              <Icon className="mx-auto size-5 text-brand-gold" />
              <p className="mt-2 truncate text-[11px] font-semibold text-[#8facd9]">
                {label}
              </p>
              <p className="mt-0.5 truncate text-[12px] font-black text-white">
                {value}
              </p>
            </div>
          ))}
        </section>

        <Link
          href={routes.vipLevel}
          className="mt-3 flex min-h-[58px] items-center justify-between rounded-[12px] border border-[#344868] bg-[#202733] px-4 text-white transition hover:border-brand-gold/35 hover:bg-[#263146]"
        >
          <span>
            <span className="block text-[15px] font-black">Ver níveis VIP</span>
            <span className="mt-1 block text-[12px] font-medium text-[#8facd9]">
              Confira sua progressão e metas de recompensa.
            </span>
          </span>
          <ArrowRight className="size-5 shrink-0 text-brand-gold" />
        </Link>
      </main>
    </CasinoPageShell>
  );
}
