import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { routes } from "@/core/constants/routes";
import type { GameProvider } from "@/features/game-library/types";

export function TopProvidersSection({
  providers,
}: {
  providers: GameProvider[];
}) {
  return (
    <section className="mt-5 px-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="truncate text-[22px] font-semibold uppercase tracking-[0.04em] text-white/90">
          Top Providers
        </h2>
        <Link
          href={routes.providers}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold uppercase tracking-[0.03em] text-[#6e8ab7] transition hover:text-brand-gold"
        >
          See All
          <ChevronRight className="size-4" strokeWidth={2.1} />
        </Link>
      </div>

      <div className="a66-hidden-scrollbar flex snap-x gap-2 overflow-x-auto scroll-smooth pr-2">
        {providers.map((provider) => (
          <Link
            key={provider.id}
            href={`${routes.games}?providerName=${encodeURIComponent(provider.name)}`}
            className="group relative grid h-[64px] w-[132px] shrink-0 snap-start place-items-center overflow-hidden rounded-[9px] border border-[#344868]/75 bg-[#18202b]/72 px-3 shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_8px_16px_rgba(0,0,0,.18)] transition hover:border-brand-gold/60 hover:bg-[#222b39]"
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(143,172,217,.14),transparent_48%)] opacity-80" />
            {provider.imageUrl ? (
              <Image
                src={provider.imageUrl}
                alt={provider.name}
                width={104}
                height={36}
                sizes="104px"
                className="relative max-h-9 w-auto max-w-[104px] object-contain opacity-90 drop-shadow-[0_4px_8px_rgba(0,0,0,.3)] transition group-hover:opacity-100"
              />
            ) : (
              <span className="relative max-w-full truncate text-[18px] font-black uppercase tracking-wide text-white/85">
                {provider.name}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
