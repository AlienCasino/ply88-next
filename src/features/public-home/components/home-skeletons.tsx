import { Skeleton } from "@/design-system/primitives/skeleton";

const glassSkeleton =
  "border border-white/[0.035] bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,.045)]";

export function HeroSectionSkeleton() {
  return (
    <section className="px-2.5 pt-4" aria-hidden="true">
      <Skeleton
        className={`aspect-[1020/300] rounded-[10px] ${glassSkeleton}`}
      />
      <div className="mt-3 grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className={`aspect-[360/184] rounded-[6px] ${glassSkeleton}`}
          />
        ))}
      </div>
    </section>
  );
}

export function CategoryRailSkeleton() {
  return (
    <nav
      aria-label="Carregando categorias de jogos"
      className="relative mt-3 h-[74px] px-12"
    >
      <Skeleton
        className={`absolute left-2 top-1/2 size-7 -translate-y-1/2 rounded-full ${glassSkeleton}`}
      />
      <div className="flex h-full items-center gap-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex h-full w-[66px] shrink-0 flex-col items-center justify-center gap-1"
          >
            <Skeleton className={`size-9 rounded-full ${glassSkeleton}`} />
            <Skeleton
              className={`h-[13px] w-14 rounded-[4px] ${glassSkeleton}`}
            />
          </div>
        ))}
      </div>
      <Skeleton
        className={`absolute right-2 top-1/2 size-7 -translate-y-1/2 rounded-full ${glassSkeleton}`}
      />
    </nav>
  );
}

export function HomeGameSectionsSkeleton() {
  return (
    <>
      <GameSliderSectionSkeleton />
      <GameSliderSectionSkeleton />
      <GameSliderSectionSkeleton />
    </>
  );
}

function GameSliderSectionSkeleton() {
  return (
    <section className="mt-4 px-3" aria-hidden="true">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className={`size-6 rounded-full ${glassSkeleton}`} />
          <Skeleton className={`h-6 w-32 rounded-[5px] ${glassSkeleton}`} />
        </div>
        <div className="flex items-center gap-1.5">
          <Skeleton className={`h-4 w-16 rounded-[4px] ${glassSkeleton}`} />
          <Skeleton className={`size-7 rounded-full ${glassSkeleton}`} />
          <Skeleton className={`size-7 rounded-full ${glassSkeleton}`} />
        </div>
      </div>
      <div className="flex gap-3 overflow-hidden pr-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className={`aspect-[156/205] w-[31.5%] min-w-[136px] shrink-0 rounded-[13px] ${glassSkeleton}`}
          />
        ))}
      </div>
    </section>
  );
}
