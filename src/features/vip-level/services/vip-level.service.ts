import "server-only";

import { z } from "zod";
import { serverFetch } from "@/core/services/server-fetch";
import type { VipLevel, VipLevelPageData } from "../types";

const levelSchema = z
  .object({
    _id: z.string(),
    level: z.number().nullable().optional(),
    name: z.string().nullable().optional(),
    levelProtection: z.number().nullable().optional(),
    totalDeposit: z.number().nullable().optional(),
    totalBets: z.number().nullable().optional(),
    cashbackOriginalGames: z.number().nullable().optional(),
    cashbackLiveCasino: z.number().nullable().optional(),
    rewardAmount: z.number().nullable().optional(),
    bonusMultiplier: z.number().nullable().optional(),
    requiredXp: z.number().nullable().optional(),
    currency: z.string().nullable().optional(),
  })
  .passthrough();

const levelResponseSchema = z.object({
  levelData: z.array(levelSchema).nullable().optional(),
  averagePercentage: z.number().nullable().optional(),
});

export async function getVipLevels(): Promise<VipLevelPageData> {
  const result = await serverFetch<z.infer<typeof levelResponseSchema>>("/level", {
    next: { revalidate: 300 },
    parse: (data) => levelResponseSchema.parse(data),
  });

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[vip-levels]", result.message);
    }

    return {
      levels: [],
      averagePercentage: 0,
    };
  }

  return {
    levels: (result.data.levelData ?? [])
      .map(toVipLevel)
      .toSorted((a, b) => a.level - b.level),
    averagePercentage: result.data.averagePercentage ?? 0,
  };
}

function toVipLevel(level: z.infer<typeof levelSchema>): VipLevel {
  const levelNumber = level.level ?? 0;
  const tierName = cleanText(level.name);

  return {
    id: level._id,
    level: levelNumber,
    name: tierName || `VIP ${levelNumber}`,
    levelProtection: level.levelProtection ?? 0,
    totalDeposit: level.totalDeposit ?? 0,
    totalBets: level.totalBets ?? 0,
    cashbackOriginalGames: level.cashbackOriginalGames ?? 0,
    cashbackLiveCasino: level.cashbackLiveCasino ?? 0,
    rewardAmount: level.rewardAmount ?? 0,
    bonusMultiplier: level.bonusMultiplier ?? 0,
    requiredXp: level.requiredXp ?? 0,
    currency: cleanText(level.currency) || "BRL",
  };
}

function cleanText(value: string | null | undefined) {
  return value?.trim() ?? "";
}
