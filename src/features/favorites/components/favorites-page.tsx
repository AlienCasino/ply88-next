import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "@/features/public-home/data/home-drawer-content";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import { CasinoPageShell } from "@/shared/components/layout";
import { getFavoriteGames } from "../services/favorite-games.service";
import { FavoritesScreen } from "./favorites-screen";

const favoritesViewer = {
  balance: "100.85",
};

export async function FavoritesPage() {
  const [initialFavoritesPage, sidebarContent] = await Promise.all([
    getFavoriteGames(),
    getLeftSidebarSliders(),
  ]);

  return (
    <CasinoPageShell
      viewer={favoritesViewer}
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
    >
      <FavoritesScreen initialFavoritesPage={initialFavoritesPage} />
    </CasinoPageShell>
  );
}
