import { CasinoPageShell } from "@/shared/components/layout";
import type { HomeSidebarSliderContent } from "@/shared/components/layout/types";
import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "@/features/public-home/data/home-drawer-content";

export function PromotionsChrome({
  children,
  sidebarContent = { items: [] },
}: {
  children: React.ReactNode;
  sidebarContent?: HomeSidebarSliderContent;
}) {
  return (
    <CasinoPageShell
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
    >
      {children}
    </CasinoPageShell>
  );
}
