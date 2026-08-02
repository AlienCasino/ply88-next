import {
  BadgeDollarSign,
  ChevronDown,
  Clock3,
  Gift,
  SquareUserRound,
  UserRoundPlus,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

export const profilePreview = {
  username: "test user",
  level: "Level 0",
  progress: 0,
  balance: {
    actual: "79.47",
    bonus: "21.38",
    total: "100.85",
  },
};

type ProfileMenuItem = {
  label: string;
  icon: LucideIcon;
  badge?: string;
  suffixIcon?: LucideIcon;
};

export const profilePrimaryItems: ProfileMenuItem[] = [
  { label: "Box", icon: WalletCards, suffixIcon: ChevronDown },
  { label: "My Bonuses", icon: Gift, badge: "1" },
  { label: "Account Details", icon: SquareUserRound },
  { label: "Indication", icon: UserRoundPlus },
  { label: "Game History", icon: Clock3 },
];

export const profileQuickStats = [
  { label: "Cashback", value: "0.00", icon: BadgeDollarSign },
  { label: "Coupons", value: "1", icon: Gift },
  { label: "History", value: "0", icon: Clock3 },
] as const;
