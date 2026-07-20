import { BadgeDollarSign, CircleDot, Flame, Gamepad2, Heart, Rocket, Trophy } from "lucide-react";
import type { Category } from "@/data/types";

export const categories: Category[] = [
  { id: "hot", slug: "hot", label: "Popular", icon: Flame },
  { id: "slots", slug: "slots", label: "Slots", icon: CircleDot },
  { id: "pg", slug: "pg", label: "PG", icon: Trophy },
  { id: "live", slug: "live", label: "Ao vivo", icon: Gamepad2 },
  { id: "crash", slug: "crash", label: "Crash", icon: Rocket },
  { id: "bonus", slug: "bonus", label: "Bônus", icon: BadgeDollarSign },
  { id: "favorite", slug: "favorite", label: "Favoritos", icon: Heart },
];
