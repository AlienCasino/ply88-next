"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
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
  const [depositOpen, setDepositOpen] = useState(false);
  const isAuthenticated = Boolean(viewer);

  useEffect(() => {
    const syncDepositRoute = () => {
      setDepositOpen(new URLSearchParams(window.location.search).has("deposit"));
    };

    syncDepositRoute();
    window.addEventListener("popstate", syncDepositRoute);

    return () => window.removeEventListener("popstate", syncDepositRoute);
  }, []);

  const openDeposit = () => {
    setDepositOpen(true);
    const url = new URL(window.location.href);
    url.searchParams.set("deposit", "");
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const closeDeposit = () => {
    setDepositOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("deposit");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
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
