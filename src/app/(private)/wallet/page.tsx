import {
  BadgeDollarSign,
  Clock3,
  Gift,
  History,
  type LucideIcon,
  WalletCards,
} from "lucide-react";
import { DepositTrigger } from "@/features/deposit";
import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "@/features/public-home/data/home-drawer-content";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import { CasinoPageShell } from "@/shared/components/layout";

const walletViewer = {
  balance: "0,00",
};

const walletActions = [
  { label: "Depositar", detail: "R$ 20+", icon: BadgeDollarSign },
  { label: "Saque", detail: "R$ 50+", icon: WalletCards },
  { label: "Bônus", detail: "Cupons e giros disponíveis", icon: Gift },
  { label: "Histórico", detail: "Transações recentes", icon: History },
];

export default async function WalletPage() {
  const sidebarContent = await getLeftSidebarSliders();

  return (
    <CasinoPageShell
      viewer={walletViewer}
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
    >
      <main className="px-3 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+22px)] pt-3">
        <section className="overflow-hidden rounded-[16px] border border-[#344868] bg-[#202733] p-4 shadow-[0_16px_36px_rgba(0,0,0,.24)]">
          <p className="text-[12px] font-bold text-[#8facd9]">Saldo total</p>
          <h1 className="mt-1 text-[34px] font-black leading-none text-white">
            R$ 0,00
          </h1>
          <DepositTrigger className="mt-5 flex h-11 w-full appearance-none items-center justify-center gap-2 rounded-[10px] border-0 bg-brand-gold text-[16px] font-black text-[#1d222c] shadow-[inset_0_-2px_0_rgba(0,0,0,.1)] transition hover:brightness-105">
            <WalletCards className="size-5" />
            Depositar agora
          </DepositTrigger>
        </section>

        <section className="mt-3 grid grid-cols-2 gap-2">
          {walletActions.map(({ label, detail, icon: Icon }) => (
            label === "Depositar" ? (
              <DepositTrigger
                key={label}
                className="min-h-[94px] appearance-none rounded-[12px] border border-[#344868] bg-[#263146] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,.04)] transition hover:border-brand-gold/35 hover:bg-[#2b3546]"
              >
                <WalletActionContent label={label} detail={detail} icon={Icon} />
              </DepositTrigger>
            ) : (
              <button
                key={label}
                type="button"
                className="min-h-[94px] cursor-pointer rounded-[12px] border border-[#344868] bg-[#263146] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,.04)] transition hover:border-brand-gold/35 hover:bg-[#2b3546]"
              >
                <WalletActionContent label={label} detail={detail} icon={Icon} />
              </button>
            )
          ))}
        </section>

        <section className="mt-3 grid min-h-[145px] place-items-center rounded-[14px] border border-dashed border-[#3d5882] bg-[#1d222c]/70 p-4 text-center">
          <div>
            <Clock3 className="mx-auto size-7 text-[#4d72a5]" />
            <h2 className="mt-3 text-[15px] font-black text-white">
              Nenhuma transação
            </h2>
            <p className="mt-1 text-[12px] font-medium text-[#8facd9]">
              Seu histórico aparecerá aqui quando houver movimentações.
            </p>
          </div>
        </section>
      </main>
    </CasinoPageShell>
  );
}

function WalletActionContent({
  label,
  detail,
  icon: Icon,
}: {
  label: string;
  detail: string;
  icon: LucideIcon;
}) {
  return (
    <>
      <Icon className="mb-3 size-5 text-brand-gold" />
      <span className="block text-[14px] font-black text-white">{label}</span>
      <span className="mt-1 block text-[11px] font-semibold text-[#8facd9]">
        {detail}
      </span>
    </>
  );
}
