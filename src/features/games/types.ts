export const GAMES_PAGE_LIMIT = 24;

export type CasinoGame = {
  id: string;
  gameId: string;
  name: string;
  providerName: string;
  providerImageUrl: string | null;
  imageUrl: string | null;
  isFavorite: boolean;
};

export type CasinoGamePage = {
  games: CasinoGame[];
  totalCount: number;
  totalPages: number;
  nextSkip: number;
  hasMore: boolean;
};

export type GamesQueryParams = {
  skip?: number;
  limit?: number;
  sort?: string;
  userId?: string;
  currencyId?: string;
  isMobile?: string;
  categoryName?: string;
  subcategoryName?: string;
  providerName?: string;
  gameFilter?: string;
  search?: string;
};
