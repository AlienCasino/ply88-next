export type TournamentStatus =
  | "active"
  | "upcoming"
  | "completed"
  | "cancelled"
  | string;

export type TournamentPrize = {
  id: string;
  rank: number;
  amount: number;
};

export type TournamentEntry = {
  id: string;
  tournamentId: string;
  optedInAt: string | null;
  totalPoints: number;
  betsPlaced: number;
  betsWon: number;
  betsLost: number;
  rank: number | null;
  prizeAmount: number | null;
};

export type Tournament = {
  id: string;
  title: string;
  type: string;
  gameIds: string[];
  categoryIds: string[];
  minBet: number;
  minPlayersForValid: number;
  durationMinutes: number;
  status: TournamentStatus;
  scheduledStartAt: string | null;
  scheduledEndAt: string | null;
  prizePool: TournamentPrize[];
  isOptedIn: boolean;
  myEntry: TournamentEntry | null;
};
