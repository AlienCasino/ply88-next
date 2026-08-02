"use client";

import type { ComponentProps, ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  children: ReactNode;
};

export function CasinoPageShell({
  viewer = null,
  sidebarContent = { items: [] },
  categories,
  actions,
  offers,
  children,
}: CasinoPageShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
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
      <AppShell>
        <div className="a66-home relative min-h-dvh text-white">
          <div className="sticky top-0 z-40">
            <HomeHeader viewer={viewer} onDeposit={openDeposit} />
          </div>
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
