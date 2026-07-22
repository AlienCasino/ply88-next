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

export type HomeGameCardStyle = CSSProperties & {
  "--card-a": string;
  "--card-b": string;
  "--card-c": string;
  "--mark": string;
};
