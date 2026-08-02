import Image from "next/image";
import { Download, ShieldCheck, Smartphone, Zap } from "lucide-react";
import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "@/features/public-home/data/home-drawer-content";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import { CasinoPageShell } from "@/shared/components/layout";

const downloadViewer = {
  balance: "0,00",
};

const appHighlights = [
  { label: "Instalação rápida", icon: Zap },
  { label: "Experiência mobile", icon: Smartphone },
  { label: "Acesso protegido", icon: ShieldCheck },
];

export default async function DownloadPage() {
  const sidebarContent = await getLeftSidebarSliders();

  return (
    <CasinoPageShell
      viewer={downloadViewer}
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
    >
      <main className="px-3 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+22px)] pt-3">
        <section className="overflow-hidden rounded-[16px] border border-[#344868] bg-[#202733] p-5 text-center shadow-[0_18px_42px_rgba(0,0,0,.26)]">
          <Image
            src="/a66/app-icon.png"
            alt="A66BET app"
            width={88}
            height={88}
            className="mx-auto rounded-[20px] border border-brand-gold/30 shadow-[0_0_26px_rgba(255,207,84,.18)]"
          />
          <h1 className="mt-4 text-[25px] font-black leading-tight text-white">
            Baixar APP
          </h1>
          <p className="mx-auto mt-2 max-w-[280px] text-[13px] font-medium leading-relaxed text-[#9fb8df]">
            Tenha o A66BET sempre à mão com acesso rápido aos jogos, bônus e suporte.
          </p>
          <button
            type="button"
            className="mt-5 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-brand-gold text-[15px] font-black text-[#1d222c] transition hover:brightness-105"
          >
            <Download className="size-5" />
            Baixar agora
          </button>
        </section>

        <section className="mt-3 space-y-2">
          {appHighlights.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex h-[54px] items-center gap-3 rounded-[12px] border border-[#344868] bg-[#202733] px-4"
            >
              <Icon className="size-5 text-brand-gold" />
              <span className="text-[14px] font-bold text-white">{label}</span>
            </div>
          ))}
        </section>
      </main>
    </CasinoPageShell>
  );
}
