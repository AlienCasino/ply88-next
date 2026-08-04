import Image from "next/image";
import Link from "next/link";
import {
  BadgeHelp,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Copy,
  Database,
  FileText,
  Headphones,
  Info,
  Landmark,
  Laptop,
  LogOut,
  MessageCircle,
  NotebookPen,
  PiggyBank,
  RefreshCw,
  ShieldCheck,
  WalletCards,
  WalletMinimal,
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
import { profilePreview } from "../data/profile-content";

const profileViewer = {
  balance: "0,00",
};

const walletActions = [
  { label: "Withdrawals", icon: WalletMinimal, href: routes.wallet },
  { label: "Deposit", icon: WalletCards, deposit: true },
  { label: "Interest", icon: PiggyBank, href: "/offer/interest", badge: "100%" },
  { label: "Fund", icon: Landmark, href: "/offer/fund", badge: "50%" },
];

const accountRows = [
  {
    label: "My Records",
    icon: FileText,
    iconClassName: "text-[#ffaa09]",
    detail: "Details, bets, reports, recover balance",
    href: `${routes.report}?reportCurrent=3`,
  },
  {
    label: "Withdrawal Management",
    icon: WalletCards,
    iconClassName: "text-[#ff5347]",
    href: routes.wallet,
  },
];

const menuRows = [
  {
    label: "Promotion",
    icon: CircleUserRound,
    iconClassName: "text-brand-gold",
    href: routes.promote,
  },
  {
    label: "Third-party platform guarantee",
    icon: ShieldCheck,
    iconClassName: "text-[#12d94c]",
    href: routes.claim,
  },
  {
    label: "Data",
    icon: Database,
    iconClassName: "text-brand-gold",
    href: routes.profileData,
  },
  {
    label: "Security",
    icon: ShieldCheck,
    iconClassName: "text-brand-gold",
    href: routes.profileSecurity,
  },
  {
    label: "FAQ",
    icon: BadgeHelp,
    iconClassName: "text-brand-gold",
  },
  {
    label: "Suggestion Bonus",
    icon: NotebookPen,
    iconClassName: "text-brand-gold",
  },
  {
    label: "Log in on device",
    icon: Laptop,
    iconClassName: "text-brand-gold",
  },
  {
    label: "About A66BET",
    icon: Info,
    iconClassName: "text-brand-gold",
  },
  {
    label: "Logout",
    icon: LogOut,
    iconClassName: "text-brand-gold",
  },
];

export async function ProfilePage() {
  const sidebarContent = await getLeftSidebarSliders();

  return (
    <CasinoPageShell
      viewer={profileViewer}
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
      showHeader={false}
    >
      <main className="min-h-dvh bg-[#1f2530] pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+8px)] text-white">
        <section className="relative overflow-hidden bg-[#353b44] px-4 pb-4 pt-1">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_-12%,rgba(255,255,255,.18),transparent_40%),radial-gradient(ellipse_at_85%_18%,rgba(255,255,255,.09),transparent_36%),repeating-radial-gradient(circle_at_84%_-20%,rgba(255,255,255,.12)_0_1px,transparent_1px_42px)]" />
          <div className="relative flex h-9 items-center justify-between">
            <Link
              href={routes.home}
              aria-label="Back home"
              className="grid size-8 place-items-center text-[#9ab7e4]"
            >
              <ChevronLeft className="size-6" />
            </Link>
            <div className="flex items-center gap-4 text-brand-gold">
              <Headphones className="size-6" />
              <MessageCircle className="size-6 fill-brand-gold/20" />
            </div>
          </div>

          <div className="relative mt-2 flex items-center gap-3">
            <div className="relative size-[58px] shrink-0 rounded-full bg-[#7d4bec] p-[2px] shadow-[0_6px_16px_rgba(0,0,0,.35)]">
              <Image
                src="/a66/bottom-mascot-right.png"
                alt=""
                width={58}
                height={58}
                className="size-full rounded-full bg-[#27303d] object-cover"
              />
              <span className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full bg-brand-gold text-[#1d222c]">
                <NotebookPen className="size-3.5" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-[15px] font-medium text-white">
                  {profilePreview.username}
                </span>
                <ChevronRight className="size-4 rotate-90 fill-[#5878ae] text-[#5878ae]" />
                <Copy className="size-4 text-brand-gold" />
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[17px] text-[#dbe5f4]">
                <span>ID: 826261745</span>
                <Copy className="size-4 text-brand-gold" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[18px] font-medium text-white">
              <span className="grid size-6 place-items-center rounded-full bg-[#2cab44] text-[10px] font-black text-brand-gold shadow-[inset_0_0_0_2px_#f0d04f]">
                BR
              </span>
              <span className="text-white underline decoration-brand-gold decoration-2 underline-offset-4">
                0,00
              </span>
              <RefreshCw className="size-5 fill-brand-gold text-[#1d222c]" />
            </div>
          </div>

          <div className="relative mt-5 grid grid-cols-4 gap-2 text-center">
            {walletActions.map(({ label, icon: Icon, href, deposit, badge }) => {
              const content = (
                <>
                  <span className="relative mx-auto grid size-8 place-items-center text-brand-gold">
                    <Icon className="size-7" strokeWidth={1.9} />
                    {badge ? (
                      <span
                        className={`absolute -right-2 -top-2 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none text-white ${
                          badge === "100%" ? "bg-[#18c928]" : "bg-[#ffaa09]"
                        }`}
                      >
                        {badge}
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 block truncate text-[13px] text-white">
                    {label}
                  </span>
                </>
              );

              if (deposit) {
                return (
                  <DepositTrigger
                    key={label}
                    className="appearance-none text-center"
                  >
                    {content}
                  </DepositTrigger>
                );
              }

              return (
                <Link key={label} href={href ?? routes.profile}>
                  {content}
                </Link>
              );
            })}
          </div>

          <Link
            href="/offer/vip"
            className="relative mt-3 block overflow-hidden rounded-[10px] bg-brand-gold px-4 py-3 text-[#1d222c] shadow-[0_8px_18px_rgba(0,0,0,.2)]"
          >
            <div className="absolute inset-0 opacity-35 [background:repeating-radial-gradient(circle_at_86%_120%,rgba(255,255,255,.7)_0_1px,transparent_1px_13px)]" />
            <div className="relative grid grid-cols-[44px_1fr_150px_20px] items-center gap-3">
              <ShieldCheck className="size-9 text-[#56d8cf]" />
              <div>
                <p className="text-[23px] font-black italic leading-none">V0</p>
                <div className="mt-4 space-y-1">
                  <ProgressLine label="0,00/100,00" />
                  <ProgressLine label="0,00/1.000,00" />
                </div>
              </div>
              <div className="text-[12px]">
                <p className="mb-5 text-[14px]">
                  Level Bonus <span className="ml-1 text-[16px]">1,00</span>
                </p>
                <p>
                  VIP requires <span className="underline">Deposit</span>{" "}
                  <b>100,00</b>
                </p>
                <p className="mt-1">
                  VIP requires <span className="underline">Bets</span>{" "}
                  <b>1.000,00</b>
                </p>
              </div>
              <ChevronRight className="size-6 text-[#6a5a1e]" />
            </div>
          </Link>
        </section>

        <section className="bg-[#1f2530] px-4 py-3">
          {accountRows.map((row) => (
            <ProfileRow key={row.label} {...row} />
          ))}
        </section>

        <section className="border-t-[12px] border-[#2b3342] bg-[#1f2530] px-4 py-3">
          {menuRows.map((row) => (
            <ProfileRow key={row.label} {...row} />
          ))}
        </section>
      </main>
    </CasinoPageShell>
  );
}

function ProfileRow({
  label,
  icon: Icon,
  iconClassName,
  detail,
  href = routes.profile,
}: {
  label: string;
  icon: typeof CircleUserRound;
  iconClassName: string;
  detail?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="flex min-h-[50px] items-center gap-3 rounded-[7px] px-3 transition hover:bg-[#263146]"
    >
      <Icon className={`size-6 shrink-0 ${iconClassName}`} strokeWidth={1.9} />
      <span className="min-w-0 flex-1 text-[15px] font-medium leading-tight text-white">
        {label}
      </span>
      {detail ? (
        <span className="max-w-[174px] truncate text-right text-[14px] leading-tight text-brand-gold">
          {detail}
        </span>
      ) : null}
      <ChevronRight className="size-5 shrink-0 text-[#5878ae]" />
    </Link>
  );
}

function ProgressLine({ label }: { label: string }) {
  return (
    <div className="relative h-3 overflow-hidden rounded-full bg-[#c9b554]">
      <div className="absolute inset-y-0 left-0 w-[4%] rounded-full bg-[#f4e496]" />
      <span className="absolute inset-0 grid place-items-center text-[11px] leading-none">
        {label}
      </span>
    </div>
  );
}
