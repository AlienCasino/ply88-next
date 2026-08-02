export const FAVORITES_PAGE_LIMIT = 24;

export type FavoriteGame = {
  id: string;
  gameId: string;
  name: string;
  providerName: string;
  providerImageUrl: string | null;
  imageUrl: string | null;
  isFavorite: boolean;
};

export type FavoriteGamesPage = {
  games: FavoriteGame[];
  totalCount: number;
  nextSkip: number;
  hasMore: boolean;
};

export type FavoriteGamesQueryParams = {
  skip?: number;
  limit?: number;
  search?: string;
};
