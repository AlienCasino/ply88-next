"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HomeCategoryRailItem } from "../types";

export function CategoryRail({ items }: { items: HomeCategoryRailItem[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    setCanScrollLeft(rail.scrollLeft > 4);
    setCanScrollRight(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    updateScrollState();
    rail.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [items.length, updateScrollState]);

  const scrollRail = (direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const distance = Math.round(rail.clientWidth * 0.62);
    rail.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <nav
      aria-label="Categorias de jogos"
      className="relative mt-3 h-[74px] text-[#6e8ab7]"
    >
      <button
        type="button"
        onClick={() => scrollRail("left")}
        disabled={!canScrollLeft}
        aria-label="Ver categorias anteriores"
        className="absolute left-2 top-1/2 z-20 grid size-7 -translate-y-1/2 place-items-center rounded-full border border-[#344868] bg-[#263146]/95 text-[#8facd9] shadow-[0_4px_10px_rgba(0,0,0,.25)] transition hover:border-brand-gold hover:text-brand-gold disabled:pointer-events-none disabled:opacity-0"
      >
        <ChevronLeft className="size-4" strokeWidth={2.2} />
      </button>
      <div
        ref={railRef}
        className="a66-hidden-scrollbar flex h-full snap-x items-center gap-4 overflow-x-auto scroll-smooth px-12"
      >
        {items.map((item, index) => (
          <a
            key={item.id}
            href={item.href}
            className="flex h-full w-[66px] shrink-0 snap-start flex-col items-center justify-center text-center text-[13px] leading-none transition hover:text-white"
          >
            <span
              className="mb-1 grid h-10 w-full place-items-center bg-contain bg-center bg-no-repeat text-[25px] font-black text-[#74a5d9]"
              style={{
                backgroundImage: item.iconUrl
                  ? `url("${item.iconUrl}")`
                  : undefined,
              }}
              aria-hidden={Boolean(item.iconUrl)}
            >
              {item.iconUrl ? null : item.iconText}
            </span>
            <span
              className={`max-w-full truncate ${index === 0 ? "text-brand-gold" : ""}`}
            >
              {item.label}
            </span>
          </a>
        ))}
      </div>
      <button
        type="button"
        onClick={() => scrollRail("right")}
        disabled={!canScrollRight}
        aria-label="Ver mais categorias"
        className="absolute right-2 top-1/2 z-20 grid size-7 -translate-y-1/2 place-items-center rounded-full border border-[#344868] bg-[#263146]/95 text-[#8facd9] shadow-[0_4px_10px_rgba(0,0,0,.25)] transition hover:border-brand-gold hover:text-brand-gold disabled:pointer-events-none disabled:opacity-0"
      >
        <ChevronRight className="size-4" strokeWidth={2.2} />
      </button>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#222832] via-[#222832]/80 to-transparent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#222832] via-[#222832]/80 to-transparent"
      />
    </nav>
  );
}
