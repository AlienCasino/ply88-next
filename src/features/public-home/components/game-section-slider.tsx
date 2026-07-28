"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { GameTile } from "./game-section";
import type { HomeGameCard } from "../types";

const filterHrefBySection = {
  top: "/games?gameFilter=isTop",
  trending: "/games?gameFilter=isTrending",
  new: "/games?gameFilter=isNew",
} as const;

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

  const scrollRail = (direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    rail.scrollBy({
      left:
        direction === "left"
          ? -Math.round(rail.clientWidth * 0.78)
          : Math.round(rail.clientWidth * 0.78),
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
        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            href={resolveSeeAllHref(title)}
            className="mr-1 text-sm font-medium text-[#6e8ab7] transition hover:text-brand-gold"
          >
            See All ({games.length})
          </Link>
          <button
            type="button"
            onClick={() => scrollRail("left")}
            className="grid size-7 place-items-center rounded-full border border-[#344868] bg-[#263146]/95 text-[#8facd9] shadow-[0_4px_10px_rgba(0,0,0,.22)] transition hover:border-brand-gold hover:text-brand-gold"
            aria-label={`Ver jogos anteriores em ${title}`}
          >
            <ChevronLeft className="size-4" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={() => scrollRail("right")}
            className="grid size-7 place-items-center rounded-full border border-[#344868] bg-[#263146]/95 text-[#8facd9] shadow-[0_4px_10px_rgba(0,0,0,.22)] transition hover:border-brand-gold hover:text-brand-gold"
            aria-label={`Ver mais jogos em ${title}`}
          >
            <ChevronRight className="size-4" strokeWidth={2.2} />
          </button>
        </div>
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

function resolveSeeAllHref(title: string) {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("trend")) {
    return filterHrefBySection.trending;
  }

  if (normalizedTitle.includes("new")) {
    return filterHrefBySection.new;
  }

  if (normalizedTitle.includes("slot")) {
    return "/games/slots";
  }

  if (normalizedTitle.includes("top")) {
    return filterHrefBySection.top;
  }

  return filterHrefBySection.top;
}
