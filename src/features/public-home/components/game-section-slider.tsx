"use client";

import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import { GameTile } from "./game-section";
import type { HomeGameCard } from "../types";

export function GameSectionSlider({
  title,
  icon,
  games,
}: {
  title: string;
  icon?: string;
  games: HomeGameCard[];
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const remaining = rail.scrollWidth - rail.clientWidth - rail.scrollLeft;
    if (remaining <= 8) {
      rail.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    rail.scrollBy({
      left: Math.round(rail.clientWidth * 0.78),
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-4 px-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex min-w-0 items-center gap-2 text-[22px] font-medium">
          {icon ? <span className="text-xl">{icon}</span> : null}
          <span className="truncate">{title}</span>
        </h2>
        <button
          type="button"
          onClick={scrollNext}
          className="inline-flex shrink-0 items-center gap-1 text-sm text-brand-gold"
        >
          Mais
          <ChevronRight className="size-4" />
        </button>
      </div>
      <div
        ref={railRef}
        className="a66-hidden-scrollbar flex snap-x gap-3 overflow-x-auto scroll-smooth pr-2"
      >
        {games.map((game) => (
          <div
            key={game.id}
            className="w-[31.5%] min-w-[136px] shrink-0 snap-start"
          >
            <GameTile
              name={game.name}
              brand={game.brand}
              href={game.href}
              imageUrl={game.imageUrl}
              colors={game.colors}
              mark={game.mark}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
