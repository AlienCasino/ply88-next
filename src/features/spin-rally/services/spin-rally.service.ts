import "server-only";

import { z } from "zod";
import { serverEnv } from "@/core/env/env";
import { serverFetch } from "@/core/services/server-fetch";
import type {
  SpinRally,
  SpinRallyCmsRecord,
  SpinRallyCmsSection,
  SpinRallyEntry,
  SpinRallyHistoryItem,
  SpinRallyPointTable,
  SpinRallyPrize,
} from "../types";

const prizeSchema = z
  .object({
    _id: z.string().nullable().optional(),
    rank: z.number().nullable().optional(),
    amount: z.number().nullable().optional(),
  })
  .passthrough();

const entrySchema = z
  .object({
    _id: z.string().nullable().optional(),
    rallyId: z.string().nullable().optional(),
    optedInAt: z.string().nullable().optional(),
    totalPoints: z.number().nullable().optional(),
    rank: z.number().nullable().optional(),
    prizeAmount: z.number().nullable().optional(),
  })
  .passthrough();

const rallySchema = z
  .object({
    _id: z.string(),
    title: z.string().nullable().optional(),
    gameName: z.string().nullable().optional(),
    minBet: z.number().nullable().optional(),
    maxSpinsPerPlayer: z.number().nullable().optional(),
    prizePool: z.array(prizeSchema).nullable().optional(),
    scheduledStartAt: z.string().nullable().optional(),
    scheduledEndAt: z.string().nullable().optional(),
    durationMinutes: z.number().nullable().optional(),
    status: z.string().nullable().optional(),
    isOptedIn: z.boolean().nullable().optional(),
    myEntry: entrySchema.nullable().optional(),
  })
  .passthrough();

const rallyListResponseSchema = z.object({
  rallies: z.array(rallySchema).nullable().optional(),
});

const cmsRecordSchema = z
  .object({
    _id: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    content: z.string().nullable().optional(),
    points: z.string().nullable().optional(),
  })
  .passthrough();

const cmsSectionSchema = z
  .object({
    _id: z.string().nullable().optional(),
    sectionName: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    records: z.array(cmsRecordSchema).nullable().optional(),
  })
  .passthrough();

const pointTableResponseSchema = z
  .object({
    id: z.string().nullable().optional(),
    _id: z.string().nullable().optional(),
    type: z.string().nullable().optional(),
    content: z.string().nullable().optional(),
    sections: z.array(cmsSectionSchema).nullable().optional(),
    updatedAt: z.string().nullable().optional(),
  })
  .passthrough();

const historyRallySchema = z
  .object({
    _id: z.string(),
    title: z.string().nullable().optional(),
    gameName: z.string().nullable().optional(),
    prizePool: z.array(prizeSchema).nullable().optional(),
    scheduledStartAt: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
  })
  .passthrough();

const historyItemSchema = entrySchema.extend({
  rally: historyRallySchema.nullable().optional(),
});

const historyResponseSchema = z.object({
  rallies: z.array(historyItemSchema).nullable().optional(),
});

export async function getSpinRallies(): Promise<SpinRally[]> {
  const result = await serverFetch<z.infer<typeof rallyListResponseSchema>>(
    "/spinRally/list",
    {
      next: { revalidate: 60 },
      parse: (data) => rallyListResponseSchema.parse(data),
    },
  );

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[spin-rally-list]", result.message);
    }

    return [];
  }

  return (result.data.rallies ?? []).map(toSpinRally);
}

export async function getSpinRallyPointTable(): Promise<SpinRallyPointTable | null> {
  const result = await serverFetch<z.infer<typeof pointTableResponseSchema>>(
    "/spinRally/cms?type=point_table",
    {
      next: { revalidate: 300 },
      parse: (data) => pointTableResponseSchema.parse(data),
    },
  );

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[spin-rally-point-table]", result.message);
    }

    return null;
  }

  return toPointTable(result.data);
}

export async function getSpinRallyHistory(): Promise<SpinRallyHistoryItem[]> {
  const result = await serverFetch<z.infer<typeof historyResponseSchema>>(
    "/spinRally-history",
    {
      cache: "no-store",
      parse: (data) => historyResponseSchema.parse(data),
    },
  );

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[spin-rally-history]", result.message);
    }

    return [];
  }

  return (result.data.rallies ?? []).map(toHistoryItem);
}

function toSpinRally(rally: z.infer<typeof rallySchema>): SpinRally {
  return {
    id: rally._id,
    title: cleanText(rally.title) || "Spin Rally",
    gameName: cleanText(rally.gameName),
    minBet: rally.minBet ?? 0,
    maxSpinsPerPlayer: rally.maxSpinsPerPlayer ?? 0,
    durationMinutes: rally.durationMinutes ?? 0,
    status: cleanText(rally.status) || "upcoming",
    scheduledStartAt: rally.scheduledStartAt ?? null,
    scheduledEndAt: rally.scheduledEndAt ?? null,
    prizePool: toPrizePool(rally.prizePool),
    isOptedIn: Boolean(rally.isOptedIn),
    myEntry: rally.myEntry ? toEntry(rally.myEntry) : null,
  };
}

function toPointTable(
  pointTable: z.infer<typeof pointTableResponseSchema>,
): SpinRallyPointTable {
  return {
    id: pointTable.id ?? pointTable._id ?? "point-table",
    type: cleanText(pointTable.type) || "point_table",
    content: stripMarkup(cleanText(pointTable.content)),
    sections: (pointTable.sections ?? []).map(toCmsSection),
    updatedAt: pointTable.updatedAt ?? null,
  };
}

function toCmsSection(
  section: z.infer<typeof cmsSectionSchema>,
  index: number,
): SpinRallyCmsSection {
  return {
    id: section._id ?? `${section.sectionName ?? "section"}-${index}`,
    sectionName: cleanText(section.sectionName) || "Points rule",
    description: stripMarkup(cleanText(section.description)),
    records: (section.records ?? []).map(toCmsRecord),
  };
}

function toCmsRecord(
  record: z.infer<typeof cmsRecordSchema>,
  index: number,
): SpinRallyCmsRecord {
  return {
    id: record._id ?? `${record.content ?? "record"}-${index}`,
    imageUrl: resolveAssetUrl(record.image),
    content: stripMarkup(cleanText(record.content)),
    points: stripMarkup(cleanText(record.points)),
  };
}

function toHistoryItem(
  item: z.infer<typeof historyItemSchema>,
): SpinRallyHistoryItem {
  return {
    ...toEntry(item),
    rally: item.rally
      ? {
          id: item.rally._id,
          title: cleanText(item.rally.title) || "Spin Rally",
          gameName: cleanText(item.rally.gameName),
          status: cleanText(item.rally.status) || "completed",
          scheduledStartAt: item.rally.scheduledStartAt ?? null,
          prizePool: toPrizePool(item.rally.prizePool),
        }
      : null,
  };
}

function toEntry(entry: z.infer<typeof entrySchema>): SpinRallyEntry {
  return {
    id: entry._id ?? `${entry.rallyId ?? "rally"}-${entry.optedInAt ?? "entry"}`,
    rallyId: cleanText(entry.rallyId),
    optedInAt: entry.optedInAt ?? null,
    totalPoints: entry.totalPoints ?? 0,
    rank: entry.rank ?? null,
    prizeAmount: entry.prizeAmount ?? 0,
  };
}

function toPrizePool(
  prizes: z.infer<typeof prizeSchema>[] | null | undefined,
): SpinRallyPrize[] {
  return (
    prizes
      ?.map((prize, index) => ({
        id: prize._id ?? `${prize.rank ?? index}-${prize.amount ?? 0}`,
        rank: prize.rank ?? index + 1,
        amount: prize.amount ?? 0,
      }))
      .toSorted((a, b) => a.rank - b.rank) ?? []
  );
}

function cleanText(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function stripMarkup(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
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
