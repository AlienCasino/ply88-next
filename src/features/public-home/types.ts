import type { CSSProperties } from "react";

export type HomeGame = [
  name: string,
  brand: string,
  colorA: string,
  colorB: string,
  colorC: string,
  mark?: string,
];

export type HomeSportCard = [name: string, brand: string, color: string];

export type HomeGameCard = {
  id: string;
  name: string;
  brand: string;
  href: string;
  imageUrl: string | null;
  colors: [string, string, string];
  mark: string;
};

export type HomeGameCategorySection = {
  id: string;
  title: string;
  iconUrl: string | null;
  games: HomeGameCard[];
};

export type HomeHeroBanner = {
  id: string;
  imageUrl: string;
  href: string | null;
  alt: string;
};

export type HomeCategoryRailItem = {
  id: string;
  label: string;
  href: string;
  iconText?: string;
  iconUrl?: string | null;
};

export type HomeGameCardStyle = CSSProperties & {
  "--card-a": string;
  "--card-b": string;
  "--card-c": string;
  "--mark": string;
};
