"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { HomeHeroBanner } from "../types";

const SLIDE_INTERVAL_MS = 4_200;

export function HeroSlider({ banners }: { banners: HomeHeroBanner[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = useMemo(() => getRenderableSlides(banners), [banners]);

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  const normalizedIndex = activeIndex % slides.length;

  return (
    <div className="a66-hero-slide relative aspect-[1020/300] overflow-hidden rounded-[10px]">
      <div
        className="flex size-full transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `translate3d(-${normalizedIndex * 100}%, 0, 0)` }}
      >
        {slides.map((banner, index) => {
          const image = (
            <Image
              src={banner.imageUrl}
              alt={banner.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              sizes="(max-width: 520px) calc(100vw - 20px), 502px"
              className="object-cover"
            />
          );

          return (
            <div key={banner.id} className="relative h-full w-full shrink-0">
              {banner.href ? (
                <a href={banner.href} aria-label={banner.alt}>
                  {image}
                </a>
              ) : (
                image
              )}
            </div>
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-[7px]">
        {slides.map((banner, index) => (
          <span
            key={banner.id}
            className={
              index === normalizedIndex
                ? "h-[7px] w-[18px] rounded-full bg-white/85 shadow"
                : "size-[7px] rounded-full bg-white/45"
            }
          />
        ))}
      </div>
    </div>
  );
}

function getRenderableSlides(banners: HomeHeroBanner[]) {
  if (banners.length > 0) {
    return banners;
  }

  return [
    {
      id: "fallback-home-mini-1",
      imageUrl: "/a66/home-mini-1.png",
      href: null,
      alt: "12 vezes ao dia, recompensa máxima R$888",
    },
  ];
}
