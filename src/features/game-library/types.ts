export const PROVIDERS_PAGE_LIMIT = 25;

export type GameProvider = {
  id: string;
  name: string;
  imageUrl: string | null;
  totalGameCount: number;
};

export type GameProviderPage = {
  providers: GameProvider[];
  totalCount: number;
  nextSkip: number;
  hasMore: boolean;
};

export type ProvidersQueryParams = {
  skip?: number;
  limit?: number;
  sort?: string;
  categoryName?: string;
  subcategoryName?: string;
  requestPageType?: string;
  search?: string;
};
