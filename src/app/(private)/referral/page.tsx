import { Copy, Gift, Share2, UsersRound } from "lucide-react";
import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "@/features/public-home/data/home-drawer-content";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import { CasinoPageShell } from "@/shared/components/layout";

const referralViewer = {
  balance: "0,00",
};

export default async function ReferralPage() {
  const sidebarContent = await getLeftSidebarSliders();

  return (
    <CasinoPageShell
      viewer={referralViewer}
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
    >
      <main className="px-3 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+22px)] pt-3">
        <section className="overflow-hidden rounded-[16px] border border-[#344868] bg-[#202733] shadow-[0_16px_36px_rgba(0,0,0,.24)]">
          <div className="relative p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_5%,rgba(255,207,84,.2),transparent_28%),linear-gradient(145deg,#263146,#1d222c)]" />
            <div className="relative z-10">
              <div className="grid size-12 place-items-center rounded-[12px] bg-brand-gold/12 text-brand-gold">
                <UsersRound className="size-7" />
              </div>
              <h1 className="mt-4 text-[24px] font-black leading-tight text-white">
                Convide e ganhe
              </h1>
              <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#9fb8df]">
                Compartilhe seu link e acompanhe suas recompensas em breve.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-3 rounded-[14px] border border-[#344868] bg-[#202733] p-3">
          <p className="text-[12px] font-black uppercase tracking-[0.1em] text-[#8facd9]">
            Link de convite
          </p>
          <div className="mt-2 flex h-11 items-center gap-2 rounded-[10px] border border-[#344868] bg-[#151b25] px-3">
            <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-white">
              a66bet.local/ref/test-user
            </span>
            <button
              type="button"
              className="grid size-8 cursor-pointer place-items-center rounded-[8px] bg-brand-gold text-[#1d222c]"
              aria-label="Copiar link de convite"
            >
              <Copy className="size-4" />
            </button>
          </div>
        </section>

        <section className="mt-3 grid grid-cols-2 gap-2">
          {[
            { label: "Compartilhar", icon: Share2 },
            { label: "Recompensas", icon: Gift },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className="flex min-h-[86px] cursor-pointer flex-col justify-between rounded-[12px] border border-[#344868] bg-[#263146] p-3 text-left"
            >
              <Icon className="size-5 text-brand-gold" />
              <span className="text-[14px] font-black text-white">{label}</span>
            </button>
          ))}
        </section>
      </main>
    </CasinoPageShell>
  );
}
