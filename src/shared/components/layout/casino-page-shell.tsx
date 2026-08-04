"use client";

import type { ComponentProps, ReactNode } from "react";
import { useEffect, useState } from "react";
import { Dialog as DrawerPrimitive } from "radix-ui";
import AppShell from "@/design-system/components/app-shell";
import { DepositDrawer } from "@/features/deposit";
import { HomeBottomNav } from "./home-bottom-nav";
import { HomeHeader } from "./home-header";
import { HomeSideDrawer } from "./home-side-drawer";
import type { AppViewer, HomeSidebarSliderContent } from "./types";

type CasinoPageShellProps = {
  viewer?: AppViewer | null;
  sidebarContent?: HomeSidebarSliderContent;
  categories: ComponentProps<typeof HomeSideDrawer>["categories"];
  actions: ComponentProps<typeof HomeSideDrawer>["actions"];
  offers: ComponentProps<typeof HomeSideDrawer>["offers"];
  showHeader?: boolean;
  children: ReactNode;
};

export function CasinoPageShell({
  viewer = null,
  sidebarContent = { items: [] },
  categories,
  actions,
  offers,
  showHeader = true,
  children,
}: CasinoPageShellProps) {
  const [depositOpen, setDepositOpen] = useState(false);

  useEffect(() => {
    const syncDepositRoute = () => {
      setDepositOpen(new URLSearchParams(window.location.search).has("deposit"));
    };
    const openDepositFromEvent = () => {
      setDepositOpen(true);
      pushDepositSearchParam();
    };

    syncDepositRoute();
    window.addEventListener("popstate", syncDepositRoute);
    window.addEventListener("a66:open-deposit", openDepositFromEvent);

    return () => {
      window.removeEventListener("popstate", syncDepositRoute);
      window.removeEventListener("a66:open-deposit", openDepositFromEvent);
    };
  }, []);

  const openDeposit = () => {
    setDepositOpen(true);
    pushDepositSearchParam();
  };

  const closeDeposit = () => {
    setDepositOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("deposit");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  return (
    <DrawerPrimitive.Root>
      <AppShell>
        <div className="a66-home relative min-h-dvh text-white">
          {showHeader ? (
            <div className="sticky top-0 z-40">
              <HomeHeader viewer={viewer} onDeposit={openDeposit} />
            </div>
          ) : null}
          {children}
          <HomeSideDrawer
            categories={categories}
            actions={actions}
            offers={offers}
            sliderContent={sidebarContent}
          />
          <HomeBottomNav authenticated={Boolean(viewer)} onDeposit={openDeposit} />
          <DepositDrawer
            open={depositOpen}
            balance={viewer?.balance ?? "0,00"}
            onClose={closeDeposit}
          />
        </div>
      </AppShell>
    </DrawerPrimitive.Root>
  );
}

function pushDepositSearchParam() {
  const url = new URL(window.location.href);
  if (url.searchParams.has("deposit")) {
    return;
  }
  url.searchParams.set("deposit", "");
  window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
}
