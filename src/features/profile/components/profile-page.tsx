import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Shield,
  WalletCards,
} from "lucide-react";
import { routes } from "@/core/constants/routes";
import { DepositTrigger } from "@/features/deposit";
import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "@/features/public-home/data/home-drawer-content";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import { CasinoPageShell } from "@/shared/components/layout";
import {
  profilePreview,
  profilePrimaryItems,
  profileQuickStats,
} from "../data/profile-content";

const profileViewer = {
  balance: profilePreview.balance.total,
};

export async function ProfilePage() {
  const sidebarContent = await getLeftSidebarSliders();

  return (
    <CasinoPageShell
      viewer={profileViewer}
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
    >
      <main className="px-3 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+22px)] pt-3">
        <section className="overflow-hidden rounded-[16px] border border-[#344868] bg-[#202733] shadow-[0_18px_42px_rgba(0,0,0,.28)]">
          <div className="relative overflow-hidden px-3 py-3">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(255,207,84,.18),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(143,172,217,.14),transparent_30%),linear-gradient(145deg,#263146_0%,#1d2532_66%,#151b25_100%)]" />
            <div className="relative flex items-start gap-3">
              <div className="relative size-[58px] shrink-0 rounded-[14px] bg-gradient-to-br from-brand-gold via-[#ffb431] to-[#263146] p-[2px] shadow-[0_0_22px_rgba(255,207,84,.18)]">
                <Image
                  src="/a66/icon.png"
                  alt=""
                  width={58}
                  height={58}
                  className="size-full rounded-[12px] border-2 border-[#151b25] object-cover"
                />
                <span className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full border border-brand-gold/35 bg-[#1d222c]">
                  <BadgeCheck className="size-3.5 text-brand-gold" />
                </span>
              </div>

              <div className="min-w-0 flex-1 pt-1">
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <h1 className="truncate text-[16px] font-black leading-tight text-white">
                      {profilePreview.username}
                    </h1>
                    <p className="mt-1 text-[11px] font-black uppercase tracking-[0.1em] text-brand-gold">
                      Perfil da conta
                    </p>
                  </div>
                  <Link
                    href={routes.vipLevel}
                    className="grid h-9 shrink-0 place-items-center rounded-[8px] border border-brand-gold/35 bg-brand-gold/10 px-3 text-xs font-black text-brand-gold transition hover:bg-brand-gold/15"
                    aria-label="View VIP level"
                  >
                    VIP
                  </Link>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-[9px] bg-[#151b25] text-brand-gold shadow-[inset_0_0_0_1px_rgba(255,207,84,.18)]">
                      <Shield className="size-[18px]" />
                    </span>
                    <span className="truncate text-[22px] font-black leading-none text-white">
                      {profilePreview.level}
                    </span>
                  </div>
                  <div className="min-w-[54px] rounded-full border border-[#344868] bg-[#151b25]/75 px-2 py-1 text-center text-[12px] font-black text-[#8facd9]">
                    {profilePreview.progress}% XP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3 overflow-hidden rounded-[16px] border border-[#344868] bg-[#202733] p-3 shadow-[0_14px_32px_rgba(0,0,0,.24)]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-[12px] font-black uppercase tracking-[0.11em] text-[#8facd9]">
              Saldo total
            </span>
            <span className="flex items-center gap-1 text-[25px] font-black leading-none text-brand-gold">
              <CoinIcon />
              {profilePreview.balance.total}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <BalanceLine label="Actual" value={profilePreview.balance.actual} />
            <BalanceLine label="Bonus" value={profilePreview.balance.bonus} />
          </div>
          <DepositTrigger
            className="mt-3 flex h-11 w-full appearance-none items-center justify-center gap-2 rounded-[10px] border-0 bg-brand-gold text-[16px] font-black text-[#1d222c] shadow-[inset_0_-2px_0_rgba(0,0,0,.1)] transition hover:brightness-105"
          >
            <WalletCards className="size-5" />
            Deposit
          </DepositTrigger>
        </section>

        <section className="mt-3 grid grid-cols-3 gap-2">
          {profileQuickStats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-[10px] border border-[#344868] bg-[#263146] px-2 py-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,.04)]"
            >
              <Icon className="mx-auto size-5 text-brand-gold" />
              <p className="mt-1 truncate text-[11px] text-[#8facd9]">{label}</p>
              <p className="mt-0.5 truncate text-sm font-black text-white">
                {value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-3 space-y-2">
          {profilePrimaryItems.map(({ label, icon: Icon, badge, suffixIcon: SuffixIcon }) => (
            <button
              key={label}
              type="button"
              className="flex h-[54px] w-full items-center gap-3 rounded-[10px] border border-[#344868] bg-[#202733] px-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,.04)] transition hover:border-brand-gold/35 hover:bg-[#263146]"
            >
              <Icon className="size-5 shrink-0 text-[#9fc0f4]" strokeWidth={1.9} />
              <span className="min-w-0 flex-1 truncate text-[15px] font-bold text-white">
                {label}
              </span>
              {badge ? (
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-gold text-[11px] font-black text-[#1d222c]">
                  {badge}
                </span>
              ) : null}
              {SuffixIcon ? (
                <SuffixIcon className="size-5 shrink-0 text-[#8facd9]" />
              ) : (
                <ArrowRight className="size-5 shrink-0 text-[#476792]" />
              )}
            </button>
          ))}
        </section>
      </main>
    </CasinoPageShell>
  );
}

function BalanceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[9px] border border-[#344868]/80 bg-[#151b25]/70 px-2.5 py-2">
      <span className="block truncate text-[11px] font-bold text-[#8facd9]">{label}</span>
      <span className="mt-1 flex items-center gap-1 text-[15px] font-black text-white">
        <CoinIcon />
        {value}
      </span>
    </div>
  );
}

function CoinIcon() {
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#ffac20] text-[10px] font-black text-white shadow-[inset_0_0_0_2px_rgba(255,255,255,.34)]">
      R$
    </span>
  );
}
