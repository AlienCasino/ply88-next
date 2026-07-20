import type { LucideIcon } from "lucide-react";

export type ScreenSlug =
  | "home"
  | "games"
  | "sports"
  | "promotions"
  | "wallet"
  | "vip"
  | "profile"
  | "download";

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
}

export interface Category {
  id: string;
  slug: string;
  label: string;
  icon: LucideIcon;
}

export interface Provider {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  featured?: boolean;
}

export interface Game {
  id: string;
  name: string;
  slug: string;
  provider: string;
  category: string;
  image: string;
  RTP: string;
  isPopular?: boolean;
  isNew?: boolean;
  isFavorite?: boolean;
}

export interface Promotion {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  screen: ScreenSlug;
  icon: LucideIcon;
}

export interface Notice {
  id: string;
  text: string;
}

export interface WalletAction {
  id: string;
  label: string;
  description: string;
  amount?: string;
}
