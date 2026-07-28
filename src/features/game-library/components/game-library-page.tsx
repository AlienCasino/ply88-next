import { getMiddleNavbarSliders } from "@/features/public-home/services/sliders.service";
import { getGameProviders } from "../services/providers.service";
import { GameLibraryScreen } from "./game-library-screen";

export async function GameLibraryPage() {
  const [categoryItems, initialProviderPage] = await Promise.all([
    getMiddleNavbarSliders(),
    getGameProviders(),
  ]);

  return (
    <GameLibraryScreen
      categoryItems={categoryItems}
      initialProviderPage={initialProviderPage}
    />
  );
}
