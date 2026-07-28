import "server-only";

import { z } from "zod";
import { serverEnv } from "@/core/env/env";
import { serverFetch } from "@/core/services/server-fetch";
import {
  PROVIDERS_PAGE_LIMIT,
  type GameProvider,
  type GameProviderPage,
  type ProvidersQueryParams,
} from "../types";

const providerSchema = z.object({
  providerId: z.string().nullable().optional(),
  providerName: z.string().nullable().optional(),
  originalProviderName: z.string().nullable().optional(),
  totalGameCount: z.number().nullable().optional(),
  displayName: z.string().nullable().optional(),
  _id: z.string(),
  image: z.string().nullable().optional(),
});

const providersResponseSchema = z.object({
  providers: z.array(providerSchema),
  totalCount: z.number().nullable().optional(),
});

export async function getGameProviders({
  skip = 0,
  limit = PROVIDERS_PAGE_LIMIT,
  sort = "",
  categoryName = "",
  subcategoryName = "",
  requestPageType = "",
  search = "",
}: ProvidersQueryParams = {}): Promise<GameProviderPage> {
  const result = await serverFetch<z.infer<typeof providersResponseSchema>>(
    getProvidersEndpoint({
      skip,
      limit,
      sort,
      categoryName,
      subcategoryName,
      requestPageType,
      search,
    }),
    {
      next: { revalidate: 120 },
      parse: (data) => providersResponseSchema.parse(data),
    },
  );

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[game-providers]", result.message);
    }
    return {
      providers: [],
      totalCount: 0,
      nextSkip: skip,
      hasMore: false,
    };
  }

  const providers = result.data.providers.map(toGameProvider);
  const totalCount = result.data.totalCount ?? providers.length;
  const nextSkip = skip + providers.length;

  return {
    providers,
    totalCount,
    nextSkip,
    hasMore: nextSkip < totalCount,
  };
}

export function buildGetProvidersQuery({
  skip = 0,
  limit = PROVIDERS_PAGE_LIMIT,
  sort = "",
  categoryName = "",
  subcategoryName = "",
  requestPageType = "",
  search = "",
}: ProvidersQueryParams = {}) {
  const params = new URLSearchParams({
    skip: String(skip),
    limit: String(limit),
    sort,
    categoryName,
    subcategoryName,
    requestPageType,
    search: search.trim(),
  });

  return params.toString();
}

export function getProvidersEndpoint(params?: ProvidersQueryParams) {
  return `/getProviders?${buildGetProvidersQuery(params)}`;
}

function toGameProvider(provider: z.infer<typeof providerSchema>): GameProvider {
  const name =
    cleanText(provider.displayName) ||
    cleanText(provider.providerName) ||
    cleanText(provider.originalProviderName) ||
    "Provider";

  return {
    id: provider.providerId ?? provider._id,
    name,
    imageUrl: resolveAssetUrl(provider.image),
    totalGameCount: provider.totalGameCount ?? 0,
  };
}

function cleanText(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function resolveAssetUrl(path: string | null | undefined) {
  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (!serverEnv.apiUrl) {
    return path;
  }

  return new URL(path, serverEnv.apiUrl).toString();
}
