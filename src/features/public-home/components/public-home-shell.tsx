"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dialog as DrawerPrimitive } from "radix-ui";
import { DepositDrawer } from "@/features/deposit/components/deposit-drawer";
import { FloatingPromos } from "@/shared/components/layout/floating-promos";
import { HomeBottomNav } from "@/shared/components/layout/home-bottom-nav";
import { HomeHeader } from "@/shared/components/layout/home-header";
import { HomeSideDrawer } from "@/shared/components/layout/home-side-drawer";
import type {
  AppViewer,
  HomeSidebarSliderContent,
} from "@/shared/components/layout/types";
import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "../data/home-drawer-content";

export function PublicHomeShell({
  viewer = null,
  children,
  sidebarContent = { items: [] },
}: {
  viewer?: AppViewer | null;
  children: ReactNode;
  sidebarContent?: HomeSidebarSliderContent;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = Boolean(viewer);
  const depositOpen = searchParams.has("deposit");

  const openDeposit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("deposit", "");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeDeposit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("deposit");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <DrawerPrimitive.Root>
      <div className="a66-home relative text-white">
        <div className="sticky top-0 z-40">
          <HomeHeader viewer={viewer} onDeposit={openDeposit} />
        </div>
        {children}
        <HomeSideDrawer
          categories={drawerCategories}
          actions={drawerActions}
          offers={drawerOffers}
          sliderContent={sidebarContent}
        />
        <FloatingPromos />
        <HomeBottomNav authenticated={isAuthenticated} onDeposit={openDeposit} />
        <DepositDrawer
          open={depositOpen}
          balance={viewer?.balance ?? "0,00"}
          onClose={closeDeposit}
        />
      </div>
    </DrawerPrimitive.Root>
  );
}
