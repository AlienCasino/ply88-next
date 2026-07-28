import "server-only";

import { z } from "zod";
import { serverEnv } from "@/core/env/env";
import { localizeFrontendHref } from "@/core/services/frontend-url";
import { serverFetch } from "@/core/services/server-fetch";
import type { HomeHeroBanner } from "../types";

const bannerSchema = z.object({
  orderNo: z.number().nullable().optional(),
  bannerType: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
  image: z.string(),
  heading: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  subContent: z.string().nullable().optional(),
  buttonText: z.string().nullable().optional(),
});

const bannerListSchema = z.array(bannerSchema);

export async function getHeroBanners(): Promise<HomeHeroBanner[]> {
  const result = await serverFetch<z.infer<typeof bannerListSchema>>(
    "/banner",
    {
      next: { revalidate: 300 },
      parse: (data) => bannerListSchema.parse(data),
    },
  );

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[hero-banners]", result.message);
    }
    return [];
  }

  return result.data
    .toSorted((a, b) => (a.orderNo ?? 0) - (b.orderNo ?? 0))
    .map((banner, index) => ({
      id: `${banner.image}-${index}`,
      imageUrl: resolveAssetUrl(banner.image),
      href: localizeFrontendHref(banner.link),
      alt:
        banner.heading?.trim() ||
        banner.content?.trim() ||
        `Promoção principal ${index + 1}`,
    }));
}

function resolveAssetUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (!serverEnv.apiUrl) {
    return path;
  }

  return new URL(path, serverEnv.apiUrl).toString();
}
