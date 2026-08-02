import "server-only";

import { z } from "zod";
import { serverFetch } from "@/core/services/server-fetch";
import type { Tournament, TournamentEntry, TournamentPrize } from "../types";

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
    tournamentId: z.string().nullable().optional(),
    optedInAt: z.string().nullable().optional(),
    totalPoints: z.number().nullable().optional(),
    betsPlaced: z.number().nullable().optional(),
    betsWon: z.number().nullable().optional(),
    betsLost: z.number().nullable().optional(),
    rank: z.number().nullable().optional(),
    prizeAmount: z.number().nullable().optional(),
  })
  .passthrough();

const tournamentSchema = z
  .object({
    _id: z.string(),
    title: z.string().nullable().optional(),
    type: z.string().nullable().optional(),
    gameIds: z.array(z.string()).nullable().optional(),
    categoryIds: z.array(z.string()).nullable().optional(),
    minBet: z.number().nullable().optional(),
    prizePool: z.array(prizeSchema).nullable().optional(),
    scheduledStartAt: z.string().nullable().optional(),
    scheduledEndAt: z.string().nullable().optional(),
    durationMinutes: z.number().nullable().optional(),
    status: z.string().nullable().optional(),
    minPlayersForValid: z.number().nullable().optional(),
    isOptedIn: z.boolean().nullable().optional(),
    myEntry: entrySchema.nullable().optional(),
  })
  .passthrough();

const tournamentListResponseSchema = z.object({
  tournaments: z.array(tournamentSchema).nullable().optional(),
});

export async function getTournaments(): Promise<Tournament[]> {
  const result = await serverFetch<z.infer<typeof tournamentListResponseSchema>>(
    "/tournament/list",
    {
      next: { revalidate: 60 },
      parse: (data) => tournamentListResponseSchema.parse(data),
    },
  );

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[tournament-list]", result.message);
    }

    return [];
  }

  return (result.data.tournaments ?? []).map(toTournament);
}

function toTournament(
  tournament: z.infer<typeof tournamentSchema>,
): Tournament {
  return {
    id: tournament._id,
    title: cleanText(tournament.title) || "Tournament",
    type: cleanText(tournament.type) || "tournament",
    gameIds: tournament.gameIds ?? [],
    categoryIds: tournament.categoryIds ?? [],
    minBet: tournament.minBet ?? 0,
    minPlayersForValid: tournament.minPlayersForValid ?? 0,
    durationMinutes: tournament.durationMinutes ?? 0,
    status: cleanText(tournament.status) || "upcoming",
    scheduledStartAt: tournament.scheduledStartAt ?? null,
    scheduledEndAt: tournament.scheduledEndAt ?? null,
    prizePool: toPrizePool(tournament.prizePool),
    isOptedIn: Boolean(tournament.isOptedIn),
    myEntry: tournament.myEntry ? toEntry(tournament.myEntry) : null,
  };
}

function toEntry(entry: z.infer<typeof entrySchema>): TournamentEntry {
  return {
    id:
      entry._id ??
      `${entry.tournamentId ?? "tournament"}-${entry.optedInAt ?? "entry"}`,
    tournamentId: cleanText(entry.tournamentId),
    optedInAt: entry.optedInAt ?? null,
    totalPoints: entry.totalPoints ?? 0,
    betsPlaced: entry.betsPlaced ?? 0,
    betsWon: entry.betsWon ?? 0,
    betsLost: entry.betsLost ?? 0,
    rank: entry.rank ?? null,
    prizeAmount: entry.prizeAmount ?? null,
  };
}

function toPrizePool(
  prizes: z.infer<typeof prizeSchema>[] | null | undefined,
): TournamentPrize[] {
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
