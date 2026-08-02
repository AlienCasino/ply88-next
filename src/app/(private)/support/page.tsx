import { Headphones, MessageCircle, ShieldQuestion } from "lucide-react";
import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "@/features/public-home/data/home-drawer-content";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import { CasinoPageShell } from "@/shared/components/layout";

const supportViewer = {
  balance: "0,00",
};

export default async function SupportPage() {
  const sidebarContent = await getLeftSidebarSliders();

  return (
    <CasinoPageShell
      viewer={supportViewer}
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
    >
      <main className="px-3 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+22px)] pt-3">
        <section className="rounded-[16px] border border-[#344868] bg-[#202733] p-4 shadow-[0_16px_36px_rgba(0,0,0,.24)]">
          <div className="grid size-12 place-items-center rounded-[12px] bg-brand-gold/12 text-brand-gold">
            <Headphones className="size-7" />
          </div>
          <h1 className="mt-4 text-[24px] font-black leading-tight text-white">
            Suporte ao cliente
          </h1>
          <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#9fb8df]">
            Canais de atendimento e ajuda ficarão disponíveis aqui.
          </p>
        </section>

        <section className="mt-3 grid grid-cols-2 gap-2">
          {[
            { label: "Chat", icon: MessageCircle },
            { label: "FAQ", icon: ShieldQuestion },
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
