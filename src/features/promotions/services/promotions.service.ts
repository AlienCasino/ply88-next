import "server-only";

import { z } from "zod";
import { serverEnv } from "@/core/env/env";
import { serverFetch } from "@/core/services/server-fetch";
import type {
  PromotionCard,
  PromotionCategory,
  PromotionDetail,
  PromotionSection,
} from "../types";

const promotionRuleSchema = z
  .object({
    title: z.string().nullable().optional(),
    content: z.string().nullable().optional(),
  })
  .passthrough();

const promotionSectionSchema = z
  .object({
    _id: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    content: z.string().nullable().optional(),
    order: z.number().nullable().optional(),
    isVisible: z.boolean().nullable().optional(),
  })
  .passthrough();

const promotionSchema = z
  .object({
    _id: z.string(),
    slug: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    createdAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
    scheduling: z
      .object({
        publishAt: z.string().nullable().optional(),
        timezone: z.string().nullable().optional(),
      })
      .passthrough()
      .nullable()
      .optional(),
    hero: z
      .object({
        title: z.string().nullable().optional(),
        subtitle: z.string().nullable().optional(),
        badge: z.string().nullable().optional(),
        backgroundImage: z.string().nullable().optional(),
        mobileBackgroundImage: z.string().nullable().optional(),
        cta: z
          .object({
            text: z.string().nullable().optional(),
            link: z.string().nullable().optional(),
          })
          .passthrough()
          .nullable()
          .optional(),
      })
      .passthrough()
      .nullable()
      .optional(),
    terms: z
      .object({
        version: z.string().nullable().optional(),
        shortVersion: z.string().nullable().optional(),
        autoRules: z.array(promotionRuleSchema).nullable().optional(),
        lastUpdated: z.string().nullable().optional(),
      })
      .passthrough()
      .nullable()
      .optional(),
    display: z
      .object({
        badge: z.string().nullable().optional(),
        priority: z.number().nullable().optional(),
      })
      .passthrough()
      .nullable()
      .optional(),
    primaryBonusId: z
      .object({
        name: z.string().nullable().optional(),
        type: z.string().nullable().optional(),
        triggerEvent: z.string().nullable().optional(),
        status: z.string().nullable().optional(),
        displayText: z.string().nullable().optional(),
      })
      .passthrough()
      .nullable()
      .optional(),
    sections: z.array(promotionSectionSchema).nullable().optional(),
  })
  .passthrough();

const promotionListSchema = z.array(promotionSchema);

type ApiPromotion = z.infer<typeof promotionSchema>;

export async function getPromotions({
  category = "",
}: {
  category?: PromotionCategory | string;
} = {}): Promise<PromotionCard[]> {
  const result = await serverFetch<z.infer<typeof promotionListSchema>>(
    getPromotionListEndpoint(category),
    {
      next: { revalidate: 120 },
      parse: (data) => promotionListSchema.parse(data),
    },
  );

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[promotions-list]", result.message);
    }

    return [];
  }

  return result.data
    .toSorted((a, b) => (a.display?.priority ?? 0) - (b.display?.priority ?? 0))
    .map(toPromotionCard);
}

export async function getPromotionById(
  promotionId: string,
): Promise<PromotionDetail | null> {
  const result = await serverFetch<ApiPromotion>(
    `/promotion/${encodeURIComponent(promotionId)}`,
    {
      next: { revalidate: 120 },
      parse: (data) => promotionSchema.parse(data),
    },
  );

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[promotion-detail]", result.message);
    }

    return null;
  }

  return toPromotionDetail(result.data);
}

export function getPromotionListEndpoint(category: string) {
  const normalizedCategory = category.trim();

  if (!normalizedCategory) {
    return "/promotion/list";
  }

  return `/promotion/list?category=${encodeURIComponent(normalizedCategory)}`;
}

function toPromotionCard(promotion: ApiPromotion): PromotionCard {
  const title =
    cleanText(promotion.hero?.title) ||
    cleanText(promotion.primaryBonusId?.name) ||
    promotion.sections?.find((section) => cleanText(section.title))?.title ||
    startCase(promotion.slug) ||
    "Promotion";
  const subtitle =
    cleanText(promotion.hero?.subtitle) ||
    cleanText(promotion.terms?.shortVersion) ||
    cleanText(promotion.primaryBonusId?.displayText) ||
    getFirstRuleSummary(promotion) ||
    "Unlock this reward and enjoy more ways to play.";
  const category = resolvePromotionCategory(promotion);

  return {
    id: promotion._id,
    slug: promotion.slug ?? promotion._id,
    title,
    subtitle: stripMarkup(subtitle),
    category,
    badge:
      cleanText(promotion.display?.badge) ||
      cleanText(promotion.hero?.badge) ||
      category,
    imageUrl: resolveAssetUrl(
      promotion.hero?.mobileBackgroundImage ?? promotion.hero?.backgroundImage,
    ),
    ctaText: cleanText(promotion.hero?.cta?.text) || "Get Bonus Now",
    publishedAt: promotion.scheduling?.publishAt ?? promotion.createdAt ?? null,
  };
}

function toPromotionDetail(promotion: ApiPromotion): PromotionDetail {
  const card = toPromotionCard(promotion);

  return {
    ...card,
    status: promotion.status ?? "published",
    termsVersion: promotion.terms?.version ?? "1.0",
    updatedAt: promotion.terms?.lastUpdated ?? promotion.updatedAt ?? null,
    rules:
      promotion.terms?.autoRules
        ?.map((rule) => ({
          title: cleanText(rule.title) || "Term",
          content: stripMarkup(cleanText(rule.content)),
        }))
        .filter((rule) => rule.content) ?? [],
    sections: toVisibleSections(promotion.sections),
  };
}

function toVisibleSections(
  sections: z.infer<typeof promotionSectionSchema>[] | null | undefined,
): PromotionSection[] {
  return (
    sections
      ?.filter((section) => section.isVisible !== false)
      .toSorted((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((section, index) => ({
        id: section._id ?? `${section.title ?? "section"}-${index}`,
        title: cleanText(section.title) || "Promotion details",
        content: stripMarkup(cleanText(section.content)),
        order: section.order ?? index,
      }))
      .filter((section) => section.content || section.title) ?? []
  );
}

function resolvePromotionCategory(promotion: ApiPromotion) {
  const source = [
    promotion.primaryBonusId?.triggerEvent,
    promotion.primaryBonusId?.type,
    promotion.slug,
  ]
    .map((value) => value?.toLowerCase() ?? "")
    .join(" ");

  if (source.includes("sport") || source.includes("event")) {
    return "Sport";
  }

  if (source.includes("casino") || source.includes("welcome")) {
    return "Casino";
  }

  return "Specials";
}

function getFirstRuleSummary(promotion: ApiPromotion) {
  return promotion.terms?.autoRules?.find((rule) => cleanText(rule.content))
    ?.content;
}

function cleanText(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function stripMarkup(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\r?\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function startCase(value: string | null | undefined) {
  return cleanText(value)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
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
