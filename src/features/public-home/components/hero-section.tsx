import Image from "next/image";

export function HeroSection({ miniBanners }: { miniBanners: string[] }) {
  return (
    <section className="px-2.5 pt-4">
      <div className="a66-hero-frame overflow-hidden rounded-[10px] bg-[#111821] shadow-[0_4px_10px_rgba(0,0,0,.22),inset_0_0_0_1px_rgba(255,255,255,.05)]">
        <div className="a66-hero-slide relative aspect-[1020/300] overflow-hidden rounded-[10px]">
          <Image
            src="/a66/home-mini-1.png"
            alt="12 vezes ao dia, recompensa máxima R$888"
            fill
            priority
            sizes="(max-width: 520px) calc(100vw - 20px), 502px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-[7px]">
            <span className="h-[7px] w-[18px] rounded-full bg-white/85 shadow" />
            <span className="size-[7px] rounded-full bg-white/45" />
            <span className="size-[7px] rounded-full bg-white/45" />
            <span className="size-[7px] rounded-full bg-white/45" />
            <span className="size-[7px] rounded-full bg-white/45" />
            <span className="h-[7px] w-[18px] rounded-full bg-white/85 shadow" />
          </div>
        </div>
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
