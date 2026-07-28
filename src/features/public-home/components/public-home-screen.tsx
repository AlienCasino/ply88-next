import { Suspense } from "react";
import { PublicSiteFooter } from "@/shared/components/layout/public-site-footer";
import type { AppViewer } from "@/shared/components/layout/types";
import { getGameProviders } from "@/features/game-library/services/providers.service";
import { getHeroBanners } from "../services/banner.service";
import { getHomeGameSections } from "../services/home-games.service";
import {
  getLeftSidebarSliders,
  getMiddleNavbarSliders,
} from "../services/sliders.service";
import { CategoryRail } from "./category-rail";
import { HomeGameSections } from "./home-game-sections";
import {
  CategoryRailSkeleton,
  HeroSectionSkeleton,
  HomeGameSectionsSkeleton,
} from "./home-skeletons";
import { HeroSection } from "./hero-section";
import { NoticeStrip } from "./notice-strip";
import { PublicHomeShell } from "./public-home-shell";
import { TopProvidersSection } from "./top-providers-section";
import {
  categoryRailItems,
  fallbackGameSections,
  footerLinks,
  miniBanners,
} from "../data/home-content";

export async function PublicHomeScreen({
  viewer = null,
}: {
  viewer?: AppViewer | null;
}) {
  const sidebarContent = await getLeftSidebarSliders();

  return (
    <PublicHomeShell viewer={viewer} sidebarContent={sidebarContent}>
      <main className="pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom))]">
        <Suspense fallback={<HeroSectionSkeleton />}>
          <HomeHeroSection />
        </Suspense>
        <NoticeStrip />
        <Suspense fallback={<CategoryRailSkeleton />}>
          <HomeCategoryRail />
        </Suspense>
        <Suspense fallback={<HomeGameSectionsSkeleton />}>
          <HomeGames />
        </Suspense>
        <Suspense fallback={null}>
          <HomeTopProviders />
        </Suspense>
        <PublicSiteFooter links={footerLinks} />
      </main>
    </PublicHomeShell>
  );
}

async function HomeHeroSection() {
  const heroBanners = await getHeroBanners();

  return (
    <div className="a66-content-reveal">
      <HeroSection heroBanners={heroBanners} miniBanners={miniBanners} />
    </div>
  );
}

async function HomeCategoryRail() {
  const middleNavbarItems = await getMiddleNavbarSliders();
  const categoryItems =
    middleNavbarItems.length > 0 ? middleNavbarItems : categoryRailItems;

  return (
    <div className="a66-content-reveal">
      <CategoryRail items={categoryItems} />
    </div>
  );
}

async function HomeGames() {
  const gameSections = await getHomeGameSections();
  const renderedGameSections =
    gameSections.length > 0 ? gameSections : fallbackGameSections;

  return (
    <div className="a66-content-reveal">
      <HomeGameSections sections={renderedGameSections} />
    </div>
  );
}

async function HomeTopProviders() {
  const providerPage = await getGameProviders({ limit: 12 });

  if (providerPage.providers.length === 0) {
    return null;
  }

  return (
    <div className="a66-content-reveal">
      <TopProvidersSection providers={providerPage.providers} />
    </div>
  );
}
