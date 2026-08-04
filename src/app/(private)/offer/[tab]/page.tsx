import { CasinoPageShell } from "@/shared/components/layout";
import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "@/features/public-home/data/home-drawer-content";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import { OfferScreen, type OfferTabKey } from "@/features/offer/components/offer-screen";

type OfferPageProps = {
  params: Promise<{
    tab?: string;
  }>;
};

const offerViewer = {
  balance: "0,00",
};

export default async function OfferPage({ params }: OfferPageProps) {
  const [{ tab }, sidebarContent] = await Promise.all([
    params,
    getLeftSidebarSliders(),
  ]);

  return (
    <CasinoPageShell
      viewer={offerViewer}
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
      showHeader={false}
    >
      <OfferScreen activeTab={normalizeOfferTab(tab)} />
    </CasinoPageShell>
  );
}

function normalizeOfferTab(tab: string | undefined): OfferTabKey {
  if (
    tab === "mission" ||
    tab === "rewards" ||
    tab === "fund" ||
    tab === "history" ||
    tab === "vip" ||
    tab === "rebate" ||
    tab === "interest"
  ) {
    return tab;
  }

  return "events";
}
