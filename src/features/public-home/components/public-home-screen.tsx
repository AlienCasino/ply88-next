import { PublicSiteFooter } from "@/shared/components/layout/public-site-footer";
import type { AppViewer } from "@/shared/components/layout/types";
import { getLeftSidebarSliders } from "../services/sidebar-sliders.service";
import { CategoryRail } from "./category-rail";
import { ExpandLine, GameSection } from "./game-section";
import { HeroSection } from "./hero-section";
import { NoticeStrip } from "./notice-strip";
import { PublicHomeShell } from "./public-home-shell";
import { SportsPreview } from "./sports-preview";
import { SportsSection } from "./sports-section";
import {
  categoryRailItems,
  footerLinks,
  miniBanners,
  popularGames,
  slotProviders,
  sportCards,
} from "../data/home-content";

export async function PublicHomeScreen({
  viewer = null,
}: {
  viewer?: AppViewer | null;
}) {
  const sidebarContent = await getLeftSidebarSliders();

  return (
    <PublicHomeShell viewer={viewer} sidebarContent={sidebarContent}>
      <main className="pb-[calc(76px+env(safe-area-inset-bottom))]">
        <HeroSection miniBanners={miniBanners} />
        <NoticeStrip />
        <SportsPreview />
        <CategoryRail items={categoryRailItems} />
        <GameSection title="Popular" games={popularGames} />
        <ExpandLine />
        <GameSection title="Slots" icon="🎰" games={slotProviders} />
        <SportsSection sports={sportCards} />
        <PublicSiteFooter links={footerLinks} />
      </main>
    </PublicHomeShell>
  );
}
