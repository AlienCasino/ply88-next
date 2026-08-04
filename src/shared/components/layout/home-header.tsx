"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, PanelLeftClose } from "lucide-react";
import { Dialog as DrawerPrimitive } from "radix-ui";
import { routes } from "@/core/constants/routes";
import { BalancePill } from "./balance-pill";
import type { AppViewer } from "./types";

export function HomeHeader({
  viewer,
  onDeposit,
}: {
  viewer?: AppViewer | null;
  onDeposit: () => void;
}) {
  return (
    <header className="relative flex h-[62px] items-center border-b border-[#344868] bg-[#151b25] px-2">
      <DrawerPrimitive.Trigger asChild>
        <button
          className="mr-1 grid size-7 shrink-0 place-items-center text-[#8facd9] transition hover:text-white"
          aria-label="Abrir menu"
        >
          <PanelLeftClose className="size-6" strokeWidth={1.9} />
        </button>
      </DrawerPrimitive.Trigger>
      <Link
        href={routes.home}
        aria-label="A66BET home"
        className="inline-flex shrink-0 items-center rounded-[6px] outline-none ring-brand-gold/40 focus-visible:ring-2"
      >
        <Image
          src="/a66/logo-home.png"
          alt="A66BET"
          width={198}
          height={60}
          priority
          className="h-[39px] w-auto"
        />
      </Link>
      {viewer ? (
        <div className="ml-auto flex min-w-0 items-center gap-2">
          <Link
            href={`${routes.report}?reportCurrent=1`}
            aria-label="Open account report"
            className="rounded-full outline-none ring-brand-gold/40 focus-visible:ring-2"
          >
            <BalancePill balance={viewer.balance} />
          </Link>
          <button
            type="button"
            onClick={onDeposit}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[8px] bg-brand-gold px-3 text-sm font-medium text-[#1d222c] shadow-[inset_0_-2px_0_rgba(0,0,0,.08)] transition hover:brightness-105"
          >
            Depósito
            <ChevronDown className="size-4" />
          </button>
        </div>
      ) : (
        <div className="ml-auto flex items-center gap-2">
          <Link
            href={routes.login}
            className="grid h-9 min-w-[76px] place-items-center rounded-[8px] bg-brand-gold px-2 text-sm text-[#1d222c] shadow-[inset_0_-2px_0_rgba(0,0,0,.08)] transition hover:brightness-105"
          >
            Login
          </Link>
          <Link
            href={routes.register}
            className="grid h-9 min-w-[84px] place-items-center rounded-[8px] border border-brand-gold px-2 text-sm text-brand-gold transition hover:bg-brand-gold/10"
          >
            Registro
          </Link>
        </div>
      )}
    </header>
  );
}
