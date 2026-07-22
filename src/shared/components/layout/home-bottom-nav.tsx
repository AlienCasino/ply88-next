"use client";

import Link from "next/link";
import {
  CircleUserRound,
  DoorOpen,
  Gift,
  Home,
  Search,
  TicketPercent,
  WalletCards,
} from "lucide-react";
import { routes } from "@/core/constants/routes";

export function HomeBottomNav({
  authenticated,
  onDeposit,
}: {
  authenticated: boolean;
  onDeposit: () => void;
}) {
  const items = authenticated
    ? [
        { label: "Começar", icon: Home, href: routes.home, active: true },
        { label: "Ofertas", icon: Gift, href: routes.promotions },
        { label: "Depósito", icon: WalletCards, action: onDeposit },
        { label: "Saques", icon: TicketPercent, href: routes.wallet },
        { label: "Perfil", icon: CircleUserRound, href: routes.profile },
      ]
    : [
        { label: "Começar", icon: Home, href: routes.home, active: true },
        { label: "Ofertas", icon: Gift, href: routes.promotions },
        { label: "Login", icon: DoorOpen, href: routes.login },
        { label: "Registro", icon: CircleUserRound, href: routes.register },
        { label: "Perfil", icon: Search, href: routes.profile },
      ];

  return (
    <nav className="a66-bottom-nav fixed bottom-0 left-1/2 z-50 h-[calc(76px+env(safe-area-inset-bottom))] w-[var(--app-max-width)] -translate-x-1/2 overflow-visible border-t border-[#344868] bg-[#2d3541] pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_20px_rgba(0,0,0,.18)]">
      <div className="relative z-10 grid h-[76px] grid-cols-5">
        {items.map(({ label, icon: Icon, active, ...item }) => {
          const className = `relative flex min-w-0 flex-col items-center justify-center gap-[4px] pt-1 text-[13px] transition hover:text-white ${
            active ? "text-brand-gold" : "text-[#8facd9]"
          }`;
          const content = (
            <>
              <span className="relative grid h-7 place-items-center">
                <Icon className="size-[22px]" strokeWidth={active ? 2 : 1.65} />
                {label === "Registro" ? (
                  <span className="absolute -right-2 top-1 text-xs font-bold text-brand-gold">
                    +
                  </span>
                ) : null}
              </span>
              <span className="relative text-[13px] leading-none">{label}</span>
            </>
          );

          if ("action" in item) {
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
            <Link key={label} href={item.href} className={className}>
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
