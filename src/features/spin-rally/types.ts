export type SpinRallyStatus =
  | "active"
  | "upcoming"
  | "completed"
  | "prizes_sent"
  | string;

export type SpinRallyPrize = {
  id: string;
  rank: number;
  amount: number;
};

export type SpinRallyEntry = {
  id: string;
  rallyId: string;
  optedInAt: string | null;
  totalPoints: number;
  rank: number | null;
  prizeAmount: number;
};

export type SpinRally = {
  id: string;
  title: string;
  gameName: string;
  minBet: number;
  maxSpinsPerPlayer: number;
  durationMinutes: number;
  status: SpinRallyStatus;
  scheduledStartAt: string | null;
  scheduledEndAt: string | null;
  prizePool: SpinRallyPrize[];
  isOptedIn: boolean;
  myEntry: SpinRallyEntry | null;
};

export type SpinRallyCmsRecord = {
  id: string;
  imageUrl: string | null;
  content: string;
  points: string;
};

export type SpinRallyCmsSection = {
  id: string;
  sectionName: string;
  description: string;
  records: SpinRallyCmsRecord[];
};

export type SpinRallyPointTable = {
  id: string;
  type: string;
  content: string;
  sections: SpinRallyCmsSection[];
  updatedAt: string | null;
};

export type SpinRallyHistoryItem = SpinRallyEntry & {
  rally: {
    id: string;
    title: string;
    gameName: string;
    status: SpinRallyStatus;
    scheduledStartAt: string | null;
    prizePool: SpinRallyPrize[];
  } | null;
};
