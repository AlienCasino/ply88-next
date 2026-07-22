import Image from "next/image";
import { HeroSlider } from "./hero-slider";
import type { HomeHeroBanner } from "../types";

export function HeroSection({
  heroBanners,
  miniBanners,
}: {
  heroBanners: HomeHeroBanner[];
  miniBanners: string[];
}) {
  return (
    <section className="px-2.5 pt-4">
      <div className="a66-hero-frame overflow-hidden rounded-[10px] bg-[#111821] shadow-[0_4px_10px_rgba(0,0,0,.22),inset_0_0_0_1px_rgba(255,255,255,.05)]">
        <HeroSlider banners={heroBanners} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {miniBanners.map((src, index) => (
          <div
            key={src}
            className="a66-mini-card relative aspect-[360/184] overflow-hidden rounded-[6px] border border-[#2ff461] bg-[#111821] shadow-[0_4px_8px_rgba(0,0,0,.2)]"
          >
            <Image
              src={src}
              alt={`Promoção ${index + 1}`}
              fill
              sizes="168px"
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}
