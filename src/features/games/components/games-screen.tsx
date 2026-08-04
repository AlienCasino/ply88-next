"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft, Loader2, Search, Star } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { routes } from "@/core/constants/routes";
import type { HomeCategoryRailItem } from "@/features/public-home/types";
import { LoadMoreButton } from "@/shared/components/load-more-button";
import { cn } from "@/shared/lib/utils";
import { loadCasinoGames } from "../actions/game-actions";
import {
  GAMES_PAGE_LIMIT,
  type CasinoGame,
  type CasinoGamePage,
  type GamesQueryParams,
} from "../types";

type GamesScreenProps = {
  categoryItems: HomeCategoryRailItem[];
  initialGamePage: CasinoGamePage;
  initialQuery: GamesQueryParams;
  showCategoryDrawer: boolean;
};

export function GamesScreen({
  categoryItems,
  initialGamePage,
  initialQuery,
  showCategoryDrawer,
}: GamesScreenProps) {
  const stableInitialQuery = useMemo(() => initialQuery, [initialQuery]);
  const [search, setSearch] = useState(stableInitialQuery.search ?? "");
  const [gamePage, setGamePage] = useState(initialGamePage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [autoLoadEnabled, setAutoLoadEnabled] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isPending, startTransition] = useTransition();
  const requestSequence = useRef(0);
  const isLoadingMoreRef = useRef(false);
  const loadMoreSentinelRef = useRef<HTMLDivElement>(null);

  const baseQuery = useMemo(
    () => ({
      sort: stableInitialQuery.sort ?? "",
      categoryName: stableInitialQuery.categoryName ?? "",
      subcategoryName: stableInitialQuery.subcategoryName ?? "",
      providerName: stableInitialQuery.providerName ?? "",
      gameFilter: stableInitialQuery.gameFilter ?? "",
    }),
    [stableInitialQuery],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const requestId = requestSequence.current + 1;
      requestSequence.current = requestId;

      startTransition(async () => {
        const nextPage = await loadCasinoGames({
          ...baseQuery,
          skip: 0,
          limit: GAMES_PAGE_LIMIT,
          search,
        });

        if (requestSequence.current === requestId) {
          setAutoLoadEnabled(false);
          setGamePage(nextPage);
        }
      });
    }, 320);

    return () => window.clearTimeout(timer);
  }, [baseQuery, search]);

  const loadNextGamePage = useCallback(async () => {
    if (isLoadingMoreRef.current || !gamePage.hasMore) {
      return;
    }

    isLoadingMoreRef.current = true;
    setIsLoadingMore(true);

    const requestId = requestSequence.current + 1;
    requestSequence.current = requestId;

    try {
      const nextPage = await loadCasinoGames({
        ...baseQuery,
        skip: gamePage.nextSkip,
        limit: GAMES_PAGE_LIMIT,
        search,
      });

      if (requestSequence.current === requestId) {
        setGamePage((current) => ({
          games: [...current.games, ...nextPage.games],
          totalCount: nextPage.totalCount,
          totalPages: nextPage.totalPages,
          nextSkip: nextPage.nextSkip,
          hasMore: nextPage.hasMore,
        }));
      }
    } finally {
      isLoadingMoreRef.current = false;
      setIsLoadingMore(false);
    }
  }, [baseQuery, gamePage.hasMore, gamePage.nextSkip, search]);

  const loadMore = () => {
    setAutoLoadEnabled(true);
    void loadNextGamePage();
  };

  useEffect(() => {
    if (!autoLoadEnabled || !gamePage.hasMore) {
      return;
    }

    const sentinel = loadMoreSentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void loadNextGamePage();
        }
      },
      {
        rootMargin: "360px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [autoLoadEnabled, gamePage.hasMore, loadNextGamePage]);

  return (
    <div className="min-h-dvh bg-[#222832] text-white">
      <header className="sticky top-0 z-40 border-b border-[#344868] bg-[#1d222c]">
        <div className="relative flex h-[62px] items-center justify-center px-3">
          <Link
            href={routes.home}
            className="absolute left-3 grid size-8 place-items-center rounded-full text-[#8facd9] outline-none ring-brand-gold/40 focus-visible:ring-2"
            aria-label="Voltar"
          >
            <ChevronLeft className="size-6" strokeWidth={1.8} />
          </Link>
          {showCategoryDrawer ? (
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-[8px] px-4 text-[20px] font-medium text-white outline-none ring-brand-gold/40 focus-visible:ring-2"
            >
              {getPageTitle(baseQuery)}
              <ChevronDown
                className={cn(
                  "size-5 text-[#6e8ab7] transition",
                  menuOpen && "rotate-180",
                )}
              />
            </button>
          ) : (
            <h1 className="text-[20px] font-medium text-white">
              {getPageTitle(baseQuery)}
            </h1>
          )}
        </div>
        {showCategoryDrawer && menuOpen ? (
          <div className="absolute inset-x-3 top-[54px] z-50 rounded-[8px] border border-[#344868] bg-[#263146] p-2 shadow-[0_12px_30px_rgba(0,0,0,.36)]">
            <div className="grid grid-cols-2 gap-2">
              {categoryItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 min-w-0 cursor-pointer items-center justify-center gap-2 rounded-[7px] bg-[#1d222c] px-2 text-sm font-medium text-[#8facd9] outline-none ring-brand-gold/40 transition hover:text-brand-gold focus-visible:ring-2"
                >
                  <CategoryMark item={item} />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main className="px-3 pb-6 pt-3">
        <label className="flex h-12 items-center gap-3 rounded-[14px] border border-[#496592] bg-[#263146] px-4 text-[#6e8ab7] focus-within:border-brand-gold">
          <span className="sr-only">Pesquisar jogos</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Pesquisar"
            className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-[#496592]"
          />
          {isPending ? (
            <Loader2 className="size-5 shrink-0 animate-spin text-brand-gold" />
          ) : (
            <Search className="size-5 shrink-0 text-brand-gold" />
          )}
        </label>

        <section className="mt-4">
          <div className="mb-3 flex min-h-7 items-center justify-between">
            <h2 className="text-[19px] font-semibold text-white">Games</h2>
            <span className="text-sm text-[#6e8ab7]">
              {gamePage.totalCount} total
            </span>
          </div>

          {gamePage.games.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {gamePage.games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="grid min-h-48 place-items-center rounded-[10px] border border-dashed border-[#344868] bg-[#1d222c] px-4 text-center text-sm text-[#8facd9]">
              Nenhum jogo encontrado.
            </div>
          )}

          {gamePage.hasMore && !autoLoadEnabled ? (
            <LoadMoreButton
              onClick={loadMore}
              loading={isLoadingMore}
              disabled={isLoadingMore}
            />
          ) : null}

          <div
            ref={loadMoreSentinelRef}
            className="grid min-h-12 place-items-center"
            aria-hidden={!autoLoadEnabled}
          >
            {autoLoadEnabled && gamePage.hasMore ? (
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#8facd9]">
                <Loader2
                  className={cn("size-4", isLoadingMore && "animate-spin")}
                />
                Loading more
              </span>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}

function GameCard({ game }: { game: CasinoGame }) {
  return (
    <Link
      href={`/game/${encodeURIComponent(game.gameId)}`}
      className="group relative block aspect-[156/205] overflow-hidden rounded-[12px] bg-[#2c3445] shadow-[0_7px_14px_rgba(0,0,0,.24)] transition hover:brightness-105"
    >
      {game.imageUrl ? (
        <Image
          src={game.imageUrl}
          alt={game.name}
          fill
          sizes="(max-width: 520px) 31vw, 148px"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(255,255,255,.18),transparent_23%),linear-gradient(145deg,#ffaa09,#5a73aa_48%,#1d222c)]" />
      )}
      <span className="absolute left-1 top-1 grid size-5 place-items-center rounded-full bg-[#ffaa09] text-xs">
        👍
      </span>
      <span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-white/35 text-brand-gold">
        <Star className="size-3.5 fill-brand-gold" />
      </span>
    </Link>
  );
}

function CategoryMark({ item }: { item: HomeCategoryRailItem }) {
  if (item.iconUrl) {
    return (
      <span
        aria-hidden="true"
        className="size-5 shrink-0 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${item.iconUrl}")` }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="grid size-5 shrink-0 place-items-center text-[16px] font-black leading-none text-brand-gold"
    >
      {item.iconText ?? "•"}
    </span>
  );
}

function getPageTitle(
  query: Pick<GamesQueryParams, "gameFilter" | "providerName" | "categoryName">,
) {
  if (query.providerName) {
    return query.providerName;
  }

  if (query.categoryName) {
    return toTitleCase(query.categoryName);
  }

  if (query.gameFilter === "isTrending") {
    return "Trending";
  }

  if (query.gameFilter === "isNew") {
    return "New Release";
  }

  if (query.gameFilter === "isTop") {
    return "Top games";
  }

  return "Games";
}

function toTitleCase(value: string) {
  return value
    .replaceAll("-", " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}
