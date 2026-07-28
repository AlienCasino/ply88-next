import "server-only";

import { z } from "zod";
import { serverEnv } from "@/core/env/env";
import { localizeFrontendHref } from "@/core/services/frontend-url";
import { serverFetch } from "@/core/services/server-fetch";
import type { HomeSidebarSliderContent } from "@/shared/components/layout/types";
import type { HomeCategoryRailItem } from "../types";

const sliderSubCategorySchema = z.object({
  gameSubCategoryId: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  orderNo: z.number().nullable().optional(),
  icon: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
});

const sliderSchema = z.object({
  type: z.string().nullable().optional(),
  isSubCategory: z.boolean().optional(),
  gameCategoryId: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  eventImage: z.string().nullable().optional(),
  eventRedirectionLink: z.string().nullable().optional(),
  directUrl: z.string().nullable().optional(),
  externalApiUrl: z.string().nullable().optional(),
  orderNo: z.number().nullable().optional(),
  providers: z.array(z.unknown()).optional(),
  gameSubCategory: z.array(sliderSubCategorySchema).optional(),
  name: z.string(),
});

const sliderListSchema = z.array(sliderSchema);

export async function getLeftSidebarSliders(): Promise<HomeSidebarSliderContent> {
  const result = await fetchSlidersByType("left-sidebar");

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[left-sidebar-sliders]", result.message);
    }
    return { items: [] };
  }

  const sortedItems = sortSliders(result.data);

  return {
    items: sortedItems
      .map((item, index) => ({
        id: `${item.gameCategoryId ?? item.directUrl ?? item.name}-${index}`,
        label: item.name,
        iconUrl: resolveAssetUrl(item.icon),
        href: resolveSliderHref(item),
      })),
  };
}

export async function getMiddleNavbarSliders(): Promise<
  HomeCategoryRailItem[]
> {
  const result = await fetchSlidersByType("middle-navbar");

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[middle-navbar-sliders]", result.message);
    }
    return [];
  }

  return sortSliders(result.data).map((item, index) => ({
    id: `${item.gameCategoryId ?? item.directUrl ?? item.name}-${index}`,
    label: item.name,
    iconUrl: resolveAssetUrl(item.icon),
    href: resolveSliderHref(item),
  }));
}

function fetchSlidersByType(sliderType: "left-sidebar" | "middle-navbar") {
  return serverFetch<z.infer<typeof sliderListSchema>>(
    `/sliders?sliderType=${sliderType}`,
    {
      next: { revalidate: 300 },
      parse: (data) => sliderListSchema.parse(data),
    },
  );
}

function sortSliders(items: z.infer<typeof sliderListSchema>) {
  return items.toSorted((a, b) => (a.orderNo ?? 0) - (b.orderNo ?? 0));
}

function resolveSliderHref(item: z.infer<typeof sliderSchema>) {
  if (item.directUrl) {
    return localizeFrontendHref(item.directUrl) ?? "/";
  }

  const firstSubCategory = item.gameSubCategory?.[0];
  if (firstSubCategory?.url) {
    return localizeFrontendHref(firstSubCategory.url) ?? "/";
  }

  if (item.gameCategoryId) {
    return `/games?categoryId=${encodeURIComponent(item.gameCategoryId)}`;
  }

  return "/";
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
