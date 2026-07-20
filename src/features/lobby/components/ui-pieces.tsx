"use client";

import Image from "next/image";
import { ChevronRight, Heart, Megaphone, Menu, Search, Star } from "lucide-react";
import { Button } from "@/design-system/primitives/button";
import { BrandMark } from "@/design-system/components/brand-mark";
import { accountSummary, bottomNavigation, notices, type Game, type NavItem } from "@/data";
import { cn } from "@/shared/lib/utils";

export function CasinoHeader({
  onOpenAuth,
  onOpenMenu,
}: {
  onOpenAuth: (mode: "login" | "register") => void;
  onOpenMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 h-[calc(var(--app-header-height)+env(safe-area-inset-top))] border-b border-app-header-border bg-app-header px-3 pt-[env(safe-area-inset-top)]">
      <div className="grid h-[var(--app-header-height)] grid-cols-[32px_1fr_auto] items-center gap-2">
        <button
          type="button"
          onClick={onOpenMenu}
          className="grid size-8 place-items-center rounded-full bg-[#2c3445] text-nav-muted outline-none ring-brand-gold/40 focus-visible:ring-2"
          aria-label="Abrir menu"
        >
          <Menu className="size-4" />
        </button>
        <BrandMark compact />
        <div className="flex min-w-0 items-center gap-2">
          <Button
            size="sm"
            onClick={() => onOpenAuth("login")}
            className="h-8 w-[52px] rounded-[6px] bg-[#2c3445] px-0 text-xs text-white hover:bg-[#344868]"
          >
            Login
          </Button>
          <Button
            size="sm"
            onClick={() => onOpenAuth("register")}
            className="h-8 w-[66px] rounded-[6px] bg-brand-gold px-0 text-xs font-bold text-brand-gold-foreground hover:bg-[#f6d26f]"
          >
            Registro
          </Button>
        </div>
      </div>
    </header>
  );
}

export function NoticeBar({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-9 w-full items-center gap-2 overflow-hidden rounded-[6px] bg-[#2c3445] px-3 text-left text-xs text-nav-muted outline-none ring-brand-gold/40 focus-visible:ring-2"
    >
      <Megaphone className="size-4 shrink-0 text-brand-gold" />
      <span className="min-w-0 flex-1 truncate">{notices[0]?.text}</span>
      <ChevronRight className="size-4 shrink-0" />
    </button>
  );
}

export function SearchBox({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <label className="flex h-10 items-center gap-2 rounded-[6px] border border-[#344868] bg-[#1d222c] px-3 text-sm text-nav-muted focus-within:border-brand-gold">
      <Search className="size-4 shrink-0" />
      <span className="sr-only">Pesquisar jogos</span>
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Pesquisar jogos"
        className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-[#496592]"
      />
    </label>
  );
}

export function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex min-h-8 items-center justify-between">
      <h2 className="text-[15px] font-bold text-white">{title}</h2>
      {action ? (
        <button type="button" className="text-xs text-nav-muted active:text-brand-gold">
          {action}
        </button>
      ) : null}
    </div>
  );
}

export function GameCard({
  game,
  favorite,
  onToggleFavorite,
}: {
  game: Game;
  favorite: boolean;
  onToggleFavorite: (id: string) => void;
}) {
  return (
    <article className="relative overflow-hidden rounded-[8px] bg-[#2c3445] shadow-[0_2px_8px_rgba(0,0,0,.22)]">
      <div className="relative aspect-[1.28/1] overflow-hidden bg-[#344868]">
        <Image src={game.image} alt={game.name} fill sizes="140px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        {(game.isNew || game.isPopular) && (
          <span className="absolute left-1 top-1 rounded-[4px] bg-[#ffaa09] px-1.5 py-0.5 text-[10px] font-bold text-white">
            {game.isNew ? "NOVO" : "HOT"}
          </span>
        )}
        <button
          type="button"
          onClick={() => onToggleFavorite(game.id)}
          className="absolute right-1 top-1 grid size-7 place-items-center rounded-full bg-black/35 text-white backdrop-blur outline-none ring-brand-gold/40 transition active:scale-95 focus-visible:ring-2"
          aria-label={favorite ? `Remover ${game.name} dos favoritos` : `Favoritar ${game.name}`}
        >
          <Heart className={cn("size-4", favorite && "fill-brand-gold text-brand-gold")} />
        </button>
      </div>
      <div className="space-y-1 px-2 py-2">
        <h3 className="truncate text-[12px] font-bold text-white">{game.name}</h3>
        <div className="flex items-center justify-between text-[10px] text-nav-muted">
          <span className="uppercase">{game.provider}</span>
          <span>{game.RTP}</span>
        </div>
      </div>
    </article>
  );
}

export function GameGrid({
  games,
  favorites,
  onToggleFavorite,
}: {
  games: Game[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}) {
  if (games.length === 0) {
    return (
      <div className="grid min-h-36 place-items-center rounded-[8px] border border-dashed border-[#344868] bg-[#1d222c] px-4 text-center text-sm text-nav-muted">
        Nenhum jogo encontrado.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          favorite={favorites.has(game.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export function BottomNavigation({ active }: { active: NavItem["screen"] }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto h-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom))] max-w-[var(--app-max-width)] border-t border-[#344868] bg-[#2d3541] pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,.22)]">
      <div className="grid h-[var(--app-bottom-nav-height)] grid-cols-5">
        {bottomNavigation.map((item) => {
          const Icon = item.icon;
          const selected = active === item.screen;

          return (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "flex min-w-0 flex-col items-center justify-center gap-1 text-[11px] font-medium outline-none ring-inset ring-brand-gold/40 transition active:bg-white/5 focus-visible:ring-2",
                selected ? "text-brand-gold" : "text-[#6e8ab7]",
              )}
            >
              <Icon className="size-5" />
              <span className="max-w-full truncate px-1">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export function AccountStrip({ onWallet }: { onWallet: () => void }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-[8px] bg-[#2c3445] p-2">
      <div className="flex min-w-0 items-center gap-2">
        <Image src="/a66/icon.png" alt="" width={32} height={32} className="size-8 rounded-full" />
        <div className="min-w-0">
          <p className="truncate text-xs text-nav-muted">{accountSummary.username}</p>
          <p className="text-sm font-bold text-white">{accountSummary.balance}</p>
        </div>
      </div>
      <Button
        size="sm"
        onClick={onWallet}
        className="h-8 rounded-[6px] bg-brand-gold px-3 text-xs font-bold text-brand-gold-foreground"
      >
        Depositar
      </Button>
    </div>
  );
}

export function RatingBadge() {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-[#1d222c] px-2 py-1 text-[11px] text-brand-gold">
      <Star className="size-3 fill-brand-gold" />
      24/7
    </div>
  );
}
