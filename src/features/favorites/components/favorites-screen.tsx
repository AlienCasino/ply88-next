"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Heart,
  Loader2,
  Search,
  Sparkles,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { routes } from "@/core/constants/routes";
import { LoadMoreButton } from "@/shared/components/load-more-button";
import { cn } from "@/shared/lib/utils";
import { loadFavoriteGames } from "../actions/favorite-game-actions";
import {
  FAVORITES_PAGE_LIMIT,
  type FavoriteGame,
  type FavoriteGamesPage,
} from "../types";

type FavoritesScreenProps = {
  initialFavoritesPage: FavoriteGamesPage;
};

export function FavoritesScreen({ initialFavoritesPage }: FavoritesScreenProps) {
  const [search, setSearch] = useState("");
  const [favoritesPage, setFavoritesPage] = useState(initialFavoritesPage);
  const [autoLoadEnabled, setAutoLoadEnabled] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isPending, startTransition] = useTransition();
  const requestSequence = useRef(0);
  const isLoadingMoreRef = useRef(false);
  const loadMoreSentinelRef = useRef<HTMLDivElement>(null);

  const searchQuery = useMemo(() => search.trim(), [search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const requestId = requestSequence.current + 1;
      requestSequence.current = requestId;

      startTransition(async () => {
        const nextPage = await loadFavoriteGames({
          skip: 0,
          limit: FAVORITES_PAGE_LIMIT,
          search: searchQuery,
        });

        if (requestSequence.current === requestId) {
          setAutoLoadEnabled(false);
          setFavoritesPage(nextPage);
        }
      });
    }, 320);

    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  const loadNextFavoritePage = useCallback(async () => {
    if (isLoadingMoreRef.current || !favoritesPage.hasMore) {
      return;
    }

    isLoadingMoreRef.current = true;
    setIsLoadingMore(true);

    const requestId = requestSequence.current + 1;
    requestSequence.current = requestId;

    try {
      const nextPage = await loadFavoriteGames({
        skip: favoritesPage.nextSkip,
        limit: FAVORITES_PAGE_LIMIT,
        search: searchQuery,
      });

      if (requestSequence.current === requestId) {
        setFavoritesPage((current) => ({
          games: [...current.games, ...nextPage.games],
          totalCount: nextPage.totalCount,
          nextSkip: nextPage.nextSkip,
          hasMore: nextPage.hasMore,
        }));
      }
    } finally {
      isLoadingMoreRef.current = false;
      setIsLoadingMore(false);
    }
  }, [favoritesPage.hasMore, favoritesPage.nextSkip, searchQuery]);

  const loadMore = () => {
    setAutoLoadEnabled(true);
    void loadNextFavoritePage();
  };

  useEffect(() => {
    if (!autoLoadEnabled || !favoritesPage.hasMore) {
      return;
    }

    const sentinel = loadMoreSentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void loadNextFavoritePage();
        }
      },
      {
        rootMargin: "360px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [autoLoadEnabled, favoritesPage.hasMore, loadNextFavoritePage]);

  return (
    <main className="px-3 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+22px)] pt-3">
      <section className="relative overflow-hidden rounded-[16px] border border-[#344868] bg-[#202733] shadow-[0_18px_42px_rgba(0,0,0,.28)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(255,207,84,.22),transparent_32%),radial-gradient(circle_at_90%_0%,rgba(255,77,125,.13),transparent_30%),linear-gradient(145deg,#263146_0%,#1d2532_66%,#151b25_100%)]" />
        <div className="absolute right-3 top-4 grid size-20 place-items-center rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold/90">
          <Heart className="size-10 fill-brand-gold/25" strokeWidth={1.7} />
        </div>
        <div className="relative z-10 px-4 py-4">
          <Link
            href={routes.home}
            className="mb-3 grid size-9 place-items-center rounded-[10px] border border-[#344868] bg-[#151b25]/75 text-brand-gold outline-none ring-brand-gold/40 transition hover:bg-[#263146] focus-visible:ring-2"
            aria-label="Voltar"
          >
            <ChevronLeft className="size-5" strokeWidth={2.1} />
          </Link>
          <p className="inline-flex h-7 items-center gap-1.5 rounded-full border border-brand-gold/30 bg-[#111722]/50 px-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-brand-gold">
            <Sparkles className="size-3.5" />
            Saved games
          </p>
          <h1 className="mt-3 max-w-[240px] text-[28px] font-black leading-[1.04] text-white">
            Favorites
          </h1>
          <p className="mt-2 max-w-[245px] text-[12px] font-semibold leading-relaxed text-[#9fb8df]">
            Your saved games stay here for quick access whenever you return.
          </p>
        </div>
      </section>

      <label className="mt-3 flex h-12 items-center gap-3 rounded-[14px] border border-[#496592] bg-[#263146] px-4 text-[#6e8ab7] focus-within:border-brand-gold">
        <span className="sr-only">Search favorite games</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search favorites"
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
          <h2 className="text-[19px] font-semibold text-white">Favorite games</h2>
          <span className="rounded-full border border-[#344868] bg-[#263146] px-2.5 py-1 text-[11px] font-bold text-[#8facd9]">
            {favoritesPage.totalCount} total
          </span>
        </div>

        {favoritesPage.games.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {favoritesPage.games.map((game) => (
              <FavoriteGameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <EmptyFavoritesState searching={Boolean(searchQuery)} />
        )}

        {favoritesPage.hasMore && !autoLoadEnabled ? (
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
          {autoLoadEnabled && favoritesPage.hasMore ? (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#8facd9]">
              <Loader2 className={cn("size-4", isLoadingMore && "animate-spin")} />
              Loading more
            </span>
          ) : null}
        </div>
      </section>
    </main>
  );
}

function FavoriteGameCard({ game }: { game: FavoriteGame }) {
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
      <span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-white/35 text-brand-gold">
        <Heart className="size-3.5 fill-brand-gold" />
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/32 to-transparent px-2 pb-3 pt-10">
        <p className="truncate text-[13px] font-black leading-tight text-white drop-shadow">
          {game.name}
        </p>
        <p className="mt-1 truncate text-[11px] font-semibold leading-none text-white/75">
          {game.providerName}
        </p>
      </div>
    </Link>
  );
}

function EmptyFavoritesState({ searching }: { searching: boolean }) {
  return (
    <div className="grid min-h-56 place-items-center rounded-[14px] border border-dashed border-[#344868] bg-[#1d222c]/84 px-5 text-center">
      <div>
        <span className="mx-auto grid size-14 place-items-center rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
          <Heart className="size-7" />
        </span>
        <h3 className="mt-4 text-lg font-black text-white">
          {searching ? "No favorites found" : "No favorites yet"}
        </h3>
        <p className="mx-auto mt-2 max-w-[250px] text-sm font-semibold leading-relaxed text-[#8facd9]">
          {searching
            ? "Try another game or provider name."
            : "Tap the star on a game card and it will appear here."}
        </p>
      </div>
    </div>
  );
}
