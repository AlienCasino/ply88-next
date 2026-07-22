"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleUserRound,
  DoorOpen,
  Gift,
  Home,
  type LucideIcon,
  Search,
  TicketPercent,
  WalletCards,
} from "lucide-react";
import { routes } from "@/core/constants/routes";

type HomeBottomNavItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  action?: () => void;
};

export function HomeBottomNav({
  authenticated,
  onDeposit,
}: {
  authenticated: boolean;
  onDeposit: () => void;
}) {
  const pathname = usePathname();
  const items: HomeBottomNavItem[] = authenticated
    ? [
        { label: "Começar", icon: Home, href: routes.home },
        { label: "Ofertas", icon: Gift, href: routes.promotions },
        { label: "Depósito", icon: WalletCards, action: onDeposit },
        { label: "Saques", icon: TicketPercent, href: routes.wallet },
        { label: "Perfil", icon: CircleUserRound, href: routes.profile },
      ]
    : [
        { label: "Começar", icon: Home, href: routes.home },
        { label: "Ofertas", icon: Gift, href: routes.promotions },
        { label: "Login", icon: DoorOpen, href: routes.login },
        { label: "Registro", icon: CircleUserRound, href: routes.register },
        { label: "Perfil", icon: Search, href: routes.profile },
      ];

  return (
    <nav className="a66-bottom-nav fixed inset-x-0 bottom-0 z-50 mx-auto h-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom))] max-w-[var(--app-max-width)] overflow-visible border-t border-[#344868] bg-[#2d3541] pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,.22)]">
      <div className="relative z-10 grid h-[var(--app-bottom-nav-height)] grid-cols-5">
        {items.map((item) => {
          const { label, icon: Icon } = item;
          const isActive = item.href
            ? item.href === routes.home
              ? pathname === routes.home
              : pathname.startsWith(item.href)
            : false;
          const className = `relative flex h-full min-w-0 appearance-none flex-col items-center justify-center gap-1 overflow-hidden px-1 pt-1 text-center text-[11px] font-medium leading-none outline-none transition-colors hover:text-white focus-visible:text-white ${
            isActive ? "text-brand-gold" : "text-[#8facd9]"
          }`;
          const content = (
            <>
              <span className="relative grid size-6 shrink-0 place-items-center">
                <Icon className="size-5 shrink-0" strokeWidth={1.85} />
                {label === "Registro" ? (
                  <span className="absolute right-0 top-0 grid size-2.5 place-items-center text-xs font-bold leading-none text-brand-gold">
                    +
                  </span>
                ) : null}
              </span>
              <span className="relative block h-[13px] max-w-full truncate px-1 text-[11px] leading-[13px]">
                {label}
              </span>
            </>
          );

          if (item.action) {
            return (
              <button
                key={label}
                type="button"
                onClick={item.action}
                className={className}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={label}
              href={item.href ?? routes.home}
              className={className}
              aria-current={isActive ? "page" : undefined}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
