export type DailySpinSlice = {
  id: string;
  name: string;
  displayName: string;
  amount: number;
  imageUrl?: string | null;
};

export type DailySpinResult = {
  name: string;
  displayName: string;
  amount: number;
};
