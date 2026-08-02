export type VipLevel = {
  id: string;
  level: number;
  name: string;
  levelProtection: number;
  totalDeposit: number;
  totalBets: number;
  cashbackOriginalGames: number;
  cashbackLiveCasino: number;
  rewardAmount: number;
  bonusMultiplier: number;
  requiredXp: number;
  currency: string;
};

export type VipLevelPageData = {
  levels: VipLevel[];
  averagePercentage: number;
};

export type VipProgress = {
  currentLevel: number;
  nextLevel: number;
  currentLevelTotalXp: number;
  totalXpRequiredForNextLevel: number;
  currentDeposit: number;
  currentBet: number;
  depositPercentage: number;
  betPercentage: number;
};
