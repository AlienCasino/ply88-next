"use client";

import Link from "next/link";
import { ChevronDown, ChevronLeft, Flame, Search, Star } from "lucide-react";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { routes } from "@/core/constants/routes";
import { cn } from "@/shared/lib/utils";

type CardStyle = CSSProperties & {
  "--card-a": string;
  "--card-b": string;
  "--card-c": string;
  "--mark": string;
};

type LibraryCategory = {
  id: string;
  label: string;
  icon: string;
};

type ProviderItem = {
  id: string;
  label: string;
  mark: string;
};

type LibraryGame = {
  id: string;
  name: string;
  provider: string;
  colors: [string, string, string];
  mark?: string;
  recent?: boolean;
  favorite?: boolean;
};

const categories: LibraryCategory[] = [
  { id: "popular", label: "Popular", icon: "flame" },
  { id: "slots", label: "Slots", icon: "777" },
  { id: "fishery", label: "Fishery", icon: "dolphin" },
  { id: "minigames", label: "Minigames", icon: "diamond" },
  { id: "letters", label: "Letters", icon: "cards" },
  { id: "sports", label: "Sports", icon: "ball" },
  { id: "live", label: "Ao Vivo", icon: "live" },
];

const providers: ProviderItem[] = [
  { id: "all", label: "Popular", mark: "flame" },
  { id: "pg", label: "PG", mark: "PG" },
  { id: "wg", label: "WG", mark: "WG" },
  { id: "pp", label: "PP", mark: "PLAY" },
  { id: "jdb", label: "JDB", mark: "JDB" },
  { id: "tada", label: "TADA", mark: "TaDa" },
  { id: "cp", label: "CP", mark: "CP" },
  { id: "fc", label: "FC", mark: "FC" },
];

const games: LibraryGame[] = [
  { id: "fortune-tiger-pg", name: "Fortune Tiger", provider: "pg", colors: ["#f05a2a", "#f8bd3d", "#b71935"], mark: "PG", favorite: true },
  { id: "fortune-rabbit-pg", name: "Fortune Rabbit", provider: "pg", colors: ["#f1608f", "#ffc66a", "#c8264d"], mark: "PG", recent: true },
  { id: "fortune-mouse-pg", name: "Fortune Mouse", provider: "pg", colors: ["#ff8d45", "#ffd65b", "#e0383e"], mark: "PG", favorite: true },
  { id: "fortune-horse-wg", name: "Fortune Horse", provider: "wg", colors: ["#ff8b1f", "#ffcb4a", "#c74813"], mark: "WG", recent: true },
  { id: "fortune-rabbit-wg", name: "Fortune Rabbit", provider: "wg", colors: ["#2c8cff", "#b93fff", "#fa68a8"], mark: "WG" },
  { id: "fortune-rabbit-2-wg", name: "Fortune Rabbit 2", provider: "wg", colors: ["#ff58a8", "#f46dff", "#6b38c8"], mark: "WG", favorite: true },
  { id: "fortune-tiger-wg", name: "Fortune Tiger", provider: "wg", colors: ["#21a7ff", "#ff5a97", "#f7b33f"], mark: "WG", recent: true },
  { id: "fortune-horse-pg", name: "Fortune Horse", provider: "pg", colors: ["#7c3ce7", "#f05a9b", "#ff8f32"], mark: "PG" },
  { id: "fortune-ox-wg", name: "Fortune Ox", provider: "wg", colors: ["#1fbf83", "#f6d04c", "#e88922"], mark: "WG", recent: true },
  { id: "fortune-mouse-wg", name: "Fortune Mouse", provider: "wg", colors: ["#49c6ff", "#efb531", "#b82537"], mark: "WG" },
  { id: "fortune-snake-wg", name: "Fortune Snake", provider: "wg", colors: ["#f94827", "#e8378e", "#7c2ad8"], mark: "WG", favorite: true },
  { id: "fortune-snake-pg", name: "Fortune Snake", provider: "pg", colors: ["#fe69c9", "#af35ec", "#382dd1"], mark: "PG", recent: true },
  { id: "fortune-dragon-pg", name: "Fortune Dragon", provider: "pg", colors: ["#8b54ff", "#35d7ff", "#28b05a"], mark: "PG" },
  { id: "fortune-ox-pg", name: "Fortune Ox", provider: "pg", colors: ["#ff4a22", "#ffb129", "#a5231a"], mark: "PG" },
  { id: "tigre-sortudo-pp", name: "Tigre Sortudo", provider: "pp", colors: ["#f5e1a8", "#ed8932", "#b91c2f"], mark: "PLAY", favorite: true },
  { id: "crazy-777-jdb", name: "Crazy 777", provider: "jdb", colors: ["#1c82ff", "#49d5ff", "#143f9c"], mark: "JDB", recent: true },
  { id: "super-ace-jdb", name: "Super Ace", provider: "jdb", colors: ["#8247ff", "#ed3cb7", "#541d95"], mark: "JDB" },
  { id: "charge-buffalo-tada", name: "Charge Buffalo", provider: "tada", colors: ["#ff8745", "#ffd45d", "#87380f"], mark: "TaDa" },
];

const filterTabs = [
  { id: "all", label: "Tudo" },
  { id: "recent", label: "Recente" },
  { id: "favorites", label: "Favoritos" },
] as const;

export function GameLibraryScreen() {
  const [category, setCategory] = useState(categories[0]);
  const [provider, setProvider] = useState("all");
  const [filter, setFilter] = useState<(typeof filterTabs)[number]["id"]>("all");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleGames = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return games.filter((game) => {
      const providerMatch = provider === "all" || game.provider === provider;
      const filterMatch =
        filter === "all" ||
        (filter === "recent" && game.recent) ||
        (filter === "favorites" && game.favorite);
      const queryMatch = !normalized || game.name.toLowerCase().includes(normalized);

      return providerMatch && filterMatch && queryMatch;
    });
  }, [filter, provider, query]);

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
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-11 items-center gap-2 rounded-[8px] px-4 text-[20px] font-medium text-white outline-none ring-brand-gold/40 focus-visible:ring-2"
          >
            {category.label}
            <ChevronDown className={cn("size-5 text-[#6e8ab7] transition", menuOpen && "rotate-180")} />
          </button>
        </div>
        {menuOpen ? (
          <div className="absolute inset-x-3 top-[54px] z-50 rounded-[8px] border border-[#344868] bg-[#263146] p-2 shadow-[0_12px_30px_rgba(0,0,0,.36)]">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCategory(item);
                    setMenuOpen(false);
                  }}
                  className={cn(
                    "h-10 rounded-[7px] text-sm font-medium outline-none ring-brand-gold/40 focus-visible:ring-2",
                    category.id === item.id
                      ? "bg-brand-gold text-[#1d222c]"
                      : "bg-[#1d222c] text-[#8facd9]",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main className="px-3 pb-5 pt-3">
        <label className="flex h-12 items-center gap-3 rounded-[14px] border border-[#496592] bg-[#263146] px-4 text-[#6e8ab7] focus-within:border-brand-gold">
          <span className="sr-only">Pesquisar</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar"
            className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-[#496592]"
          />
          <Search className="size-5 shrink-0 text-brand-gold" />
        </label>

        <div className="mt-3 grid grid-cols-[86px_1fr] gap-3">
          <aside className="a66-hidden-scrollbar max-h-[calc(100dvh-140px)] overflow-y-auto pr-1">
            <div className="space-y-3">
              {providers.map((item) => {
                const active = provider === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProvider(item.id)}
                    className={cn(
                      "grid h-[70px] w-full place-items-center rounded-[10px] text-center shadow-[inset_0_1px_0_rgba(255,255,255,.04)] outline-none ring-brand-gold/40 transition focus-visible:ring-2",
                      active
                        ? "bg-brand-gold text-[#1d222c]"
                        : "bg-[#1a202a] text-[#8facd9]",
                    )}
                  >
                    <ProviderMark mark={item.mark} active={active} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-3 grid grid-cols-3 gap-2">
              {filterTabs.map((item) => {
                const active = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    className={cn(
                      "h-[38px] min-w-0 rounded-[8px] border px-2 text-sm font-medium outline-none ring-brand-gold/40 transition focus-visible:ring-2",
                      active
                        ? "border-brand-gold bg-brand-gold text-[#1d222c]"
                        : "border-[#344868] bg-[#1d222c] text-[#8facd9]",
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {visibleGames.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {visibleGames.map((game) => (
                  <LibraryGameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="grid min-h-48 place-items-center rounded-[10px] border border-dashed border-[#344868] bg-[#1d222c] px-4 text-center text-sm text-[#8facd9]">
                Nenhum jogo encontrado.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function ProviderMark({ mark, active }: { mark: string; active: boolean }) {
  if (mark === "flame") {
    return <Flame className={cn("size-6", active ? "fill-[#1d222c] text-[#1d222c]" : "fill-brand-gold text-brand-gold")} />;
  }

  return (
    <span
      className={cn(
        "text-[18px] font-black leading-none tracking-wide drop-shadow-[0_2px_0_rgba(0,0,0,.35)]",
        active ? "text-[#1d222c]" : "text-white",
      )}
    >
      {mark}
    </span>
  );
}

function LibraryGameCard({ game }: { game: LibraryGame }) {
  const style: CardStyle = {
    "--card-a": game.colors[0],
    "--card-b": game.colors[1],
    "--card-c": game.colors[2],
    "--mark": `"${game.mark ?? game.provider.toUpperCase()}"`,
  };

  return (
    <article className="relative aspect-[156/205] min-w-0 overflow-hidden rounded-[10px] bg-[#2c3445] shadow-[0_6px_12px_rgba(0,0,0,.24)]">
      <div className="a66-game-art absolute inset-0" style={style} />
      <span className="absolute left-1 top-1 grid size-5 place-items-center rounded-full bg-[#ffaa09] text-xs">
        👍
      </span>
      <span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-white/35 text-brand-gold">
        <Star className="size-3.5 fill-brand-gold" />
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-2 pb-3 pt-9">
        <p className="truncate text-[13px] font-black leading-tight text-white drop-shadow">
          {game.name}
        </p>
      </div>
    </article>
  );
}
