"use client";

import Image from "next/image";
import {
  BadgeDollarSign,
  ChevronRight,
  CircleHelp,
  Download,
  Gift,
  Headphones,
  History,
  Loader2,
  Search,
  ShieldCheck,
  Smartphone,
  Ticket,
  Trophy,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  accountMenu,
  accountSummary,
  banners,
  bottomNavigation,
  categories,
  games,
  promotions,
  providers,
  vipLevels,
  walletActions,
  type ScreenSlug,
} from "@/data";
import {
  AccountStrip,
  BottomNavigation,
  CasinoHeader,
  GameGrid,
  NoticeBar,
  RatingBadge,
  SearchBox,
  SectionHeader,
} from "@/features/lobby/components/ui-pieces";
import { AuthPanel } from "@/features/lobby/components/auth-panel";
import { Button } from "@/design-system/primitives/button";
import { cn } from "@/shared/lib/utils";

interface CasinoExperienceProps {
  screen?: ScreenSlug;
}

export function CasinoExperience({ screen = "home" }: CasinoExperienceProps) {
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [walletSheet, setWalletSheet] = useState(false);

  const navActive =
    bottomNavigation.find((item) => item.screen === screen)?.screen ?? "home";

  return (
    <div className="min-h-dvh bg-[#222832] text-white">
      <CasinoHeader
        onOpenAuth={setAuthMode}
        onOpenMenu={() => setDrawerOpen(true)}
      />
      <main className="space-y-3 px-3 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+18px)] pt-3">
        {screen === "home" ? <HomeScreen onWallet={() => setWalletSheet(true)} /> : null}
        {screen === "games" ? <GamesScreen /> : null}
        {screen === "promotions" ? <PromotionsScreen /> : null}
        {screen === "sports" ? <SportsScreen /> : null}
        {screen === "wallet" ? <WalletScreen onWallet={() => setWalletSheet(true)} /> : null}
        {screen === "vip" ? <VipScreen /> : null}
        {screen === "download" ? <DownloadScreen /> : null}
        {screen === "profile" ? <ProfileScreen onAuth={setAuthMode} /> : null}
      </main>
      <button
        type="button"
        onClick={() => setSupportOpen(true)}
        className="fixed bottom-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+16px)] right-[max(14px,calc((100vw-var(--app-max-width))/2+14px))] z-30 grid size-12 place-items-center rounded-full bg-brand-gold text-[#1d222c] shadow-lg outline-none ring-brand-gold/40 active:scale-95 focus-visible:ring-2"
        aria-label="Atendimento ao cliente"
      >
        <Headphones className="size-6" />
      </button>
      <BottomNavigation active={navActive} />
      {authMode ? <AuthPanel initialMode={authMode} onClose={() => setAuthMode(null)} /> : null}
      {supportOpen ? <SupportDialog onClose={() => setSupportOpen(false)} /> : null}
      {walletSheet ? <WalletSheet onClose={() => setWalletSheet(false)} /> : null}
      {drawerOpen ? <MenuDrawer onClose={() => setDrawerOpen(false)} /> : null}
    </div>
  );
}

function HomeScreen({ onWallet }: { onWallet: () => void }) {
  const [activeCategory, setActiveCategory] = useState("hot");
  const [activeProvider, setActiveProvider] = useState("all");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState(
    () => new Set(games.filter((game) => game.isFavorite).map((game) => game.id)),
  );

  const visibleGames = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return games.filter((game) => {
      const categoryMatch =
        activeCategory === "hot"
          ? game.isPopular
          : activeCategory === "favorite"
            ? favorites.has(game.id)
            : activeCategory === "pg"
              ? game.provider === "pg"
              : game.category === activeCategory;
      const providerMatch = activeProvider === "all" || game.provider === activeProvider;
      const queryMatch = !normalized || game.name.toLowerCase().includes(normalized);
      return categoryMatch && providerMatch && queryMatch;
    });
  }, [activeCategory, activeProvider, favorites, query]);

  return (
    <>
      <AccountStrip onWallet={onWallet} />
      <NoticeBar onClick={onWallet} />
      <BannerCarousel />
      <QuickActions />
      <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
      <SearchBox query={query} onQueryChange={setQuery} />
      <ProviderFilters active={activeProvider} onChange={setActiveProvider} />
      <SectionHeader title="Popular" action="Todos" />
      <GameGrid
        games={visibleGames}
        favorites={favorites}
        onToggleFavorite={(id) =>
          setFavorites((current) => {
            const next = new Set(current);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
          })
        }
      />
      <RankingSection />
      <AppDownloadBand />
    </>
  );
}

function GamesScreen() {
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("all");
  const [favorites, setFavorites] = useState(new Set<string>());
  const filtered = games.filter(
    (game) =>
      (provider === "all" || game.provider === provider) &&
      game.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <SearchBox query={query} onQueryChange={setQuery} />
      <ProviderFilters active={provider} onChange={setProvider} />
      <SectionHeader title="Todos os jogos" action={`${filtered.length} jogos`} />
      <GameGrid
        games={filtered}
        favorites={favorites}
        onToggleFavorite={(id) =>
          setFavorites((current) => {
            const next = new Set(current);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
          })
        }
      />
      <LoadingSkeleton />
    </>
  );
}

function PromotionsScreen() {
  return (
    <>
      <SectionHeader title="Promoção" />
      <div className="space-y-3">
        {promotions.map((promotion, index) => (
          <article key={promotion.id} className="overflow-hidden rounded-[8px] bg-[#2c3445]">
            <div className="relative aspect-[3.4/1]">
              <Image
                src={promotion.image}
                alt={promotion.title}
                fill
                priority={index === 0}
                sizes="408px"
                className="object-cover"
              />
              <span className="absolute right-2 top-2 rounded-[4px] bg-[#ffaa09] px-2 py-1 text-xs font-bold">
                {promotion.tag}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 p-3">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold">{promotion.title}</h2>
                <p className="mt-1 line-clamp-2 text-xs text-nav-muted">{promotion.description}</p>
              </div>
              <Button size="sm" className="h-8 rounded-[6px] bg-brand-gold text-xs text-brand-gold-foreground">
                Receber
              </Button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function SportsScreen() {
  const matches = [
    ["Brasil Série A", "Flamengo", "Palmeiras", "2.16", "3.10", "2.80"],
    ["Copa", "São Paulo", "Santos", "1.92", "3.25", "3.40"],
    ["Futebol Virtual", "Time A66", "Fortune FC", "2.05", "3.00", "2.95"],
  ];

  return (
    <>
      <SectionHeader title="Esporte" action="Ao vivo" />
      <div className="rounded-[8px] bg-[#2c3445] p-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black">Apostas esportivas</h1>
            <p className="text-xs text-nav-muted">Mercados demonstrativos, prontos para API futura.</p>
          </div>
          <Trophy className="size-10 text-brand-gold" />
        </div>
      </div>
      <div className="space-y-2">
        {matches.map(([league, home, away, one, draw, two]) => (
          <article key={`${home}-${away}`} className="rounded-[8px] bg-[#2c3445] p-3">
            <p className="text-[11px] text-brand-gold">{league}</p>
            <div className="mt-2 flex items-center justify-between gap-2 text-sm font-bold">
              <span className="truncate">{home}</span>
              <span className="text-xs text-nav-muted">VS</span>
              <span className="truncate text-right">{away}</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[one, draw, two].map((odd, index) => (
                <button key={odd} type="button" className="rounded-[6px] bg-[#1d222c] py-2 text-xs font-bold text-brand-gold active:bg-[#344868]">
                  {index === 0 ? "Casa" : index === 1 ? "Empate" : "Fora"} {odd}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function WalletScreen({ onWallet }: { onWallet: () => void }) {
  return (
    <>
      <div className="rounded-[8px] bg-[#2c3445] p-4">
        <p className="text-xs text-nav-muted">Saldo total</p>
        <h1 className="mt-1 text-3xl font-black">{accountSummary.balance}</h1>
        <Button onClick={onWallet} className="mt-4 h-10 w-full rounded-[7px] bg-brand-gold text-brand-gold-foreground">
          Depositar agora
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {walletActions.map((action) => (
          <button key={action.id} type="button" onClick={onWallet} className="rounded-[8px] bg-[#2c3445] p-3 text-left outline-none ring-brand-gold/40 active:bg-[#344868] focus-visible:ring-2">
            <WalletCards className="mb-3 size-5 text-brand-gold" />
            <p className="text-sm font-bold">{action.label}</p>
            <p className="mt-1 text-[11px] text-nav-muted">{action.amount ?? action.description}</p>
          </button>
        ))}
      </div>
      <EmptyPanel title="Nenhuma transação" text="Histórico demonstrativo vazio." />
    </>
  );
}

function VipScreen() {
  return (
    <>
      <div className="rounded-[8px] bg-gradient-to-r from-[#2c3445] to-[#1d222c] p-4">
        <p className="text-xs text-nav-muted">Clube VIP</p>
        <h1 className="mt-1 text-2xl font-black text-brand-gold">Recompensas A66BET</h1>
        <p className="mt-2 text-xs text-nav-muted">Níveis, cashback e benefícios estáticos para conexão futura.</p>
      </div>
      <div className="space-y-2">
        {vipLevels.map((level) => (
          <article key={level.id} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-[8px] bg-[#2c3445] p-3">
            <div>
              <h2 className="font-bold">{level.name}</h2>
              <p className="text-xs text-nav-muted">Apostas acumuladas: {level.wager}</p>
            </div>
            <span className="rounded-[6px] bg-[#1d222c] px-3 py-2 text-sm font-bold text-brand-gold">{level.rebate}</span>
          </article>
        ))}
      </div>
    </>
  );
}

function ProfileScreen({ onAuth }: { onAuth: (mode: "login" | "register") => void }) {
  const tiles = [
    { label: "Carteira", icon: WalletCards },
    { label: "Bônus", icon: Gift },
    { label: "Segurança", icon: ShieldCheck },
  ];

  return (
    <>
      <div className="rounded-[8px] bg-[#2c3445] p-3">
        <div className="flex items-center gap-3">
          <Image src="/a66/icon.png" alt="" width={52} height={52} className="size-[52px] rounded-[8px]" />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-black">{accountSummary.username}</h1>
            <p className="text-xs text-nav-muted">{accountSummary.vipLevel} · Conta demonstração</p>
          </div>
          <Button size="sm" onClick={() => onAuth("login")} className="h-8 rounded-[6px] bg-brand-gold text-xs text-brand-gold-foreground">
            Login
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {tiles.map(({ label, icon: Icon }) => (
          <button key={label} type="button" className="rounded-[8px] bg-[#2c3445] p-3 text-center text-xs font-bold">
            <Icon className="mx-auto mb-2 size-5 text-brand-gold" />
            {label}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-[8px] bg-[#2c3445]">
        {accountMenu.map((item) => (
          <button key={item} type="button" className="flex h-12 w-full items-center justify-between border-b border-[#344868] px-3 text-left text-sm last:border-b-0">
            {item}
            <ChevronRight className="size-4 text-nav-muted" />
          </button>
        ))}
      </div>
    </>
  );
}

function DownloadScreen() {
  return (
    <>
      <div className="rounded-[8px] bg-[#2c3445] p-5 text-center">
        <Image src="/a66/app-icon.png" alt="A66BET app" width={88} height={88} className="mx-auto rounded-[18px]" />
        <h1 className="mt-4 text-2xl font-black">Baixar APP</h1>
        <p className="mt-2 text-sm text-nav-muted">Atalho mobile com bônus e suporte 24/7.</p>
        <Button className="mt-5 h-10 w-full rounded-[7px] bg-brand-gold text-brand-gold-foreground">
          <Download className="size-4" />
          Baixar
        </Button>
      </div>
      <AppDownloadBand />
    </>
  );
}

function BannerCarousel() {
  const [active, setActive] = useState(0);
  const banner = banners[active] ?? banners[0];

  return (
    <section className="overflow-hidden rounded-[8px] bg-[#2c3445]">
      <button type="button" onClick={() => setActive((active + 1) % banners.length)} className="relative block aspect-[3.4/1] w-full overflow-hidden text-left">
        {banner ? <Image src={banner.image} alt={banner.title} fill priority sizes="408px" className="object-cover" /> : null}
      </button>
      <div className="flex items-center justify-center gap-1.5 py-2">
        {banners.map((item, index) => (
          <button key={item.id} type="button" onClick={() => setActive(index)} className={cn("h-1.5 rounded-full bg-[#496592]", index === active ? "w-5 bg-brand-gold" : "w-1.5")} aria-label={`Banner ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}

function QuickActions() {
  const actions = [
    { label: "Depositar", icon: BadgeDollarSign, href: "/wallet" },
    { label: "Saque", icon: WalletCards, href: "/wallet" },
    { label: "VIP", icon: Trophy, href: "/vip" },
    { label: "Convide", icon: Gift, href: "/promotions" },
    { label: "Suporte", icon: Headphones, href: "/profile" },
  ];

  return (
    <div className="grid grid-cols-5 gap-2">
      {actions.map(({ label, icon: Icon, href }) => (
        <a key={label} href={href} className="flex min-w-0 flex-col items-center gap-1 rounded-[8px] bg-[#2c3445] px-1 py-2 text-[11px] font-bold text-white active:bg-[#344868]">
          <Icon className="size-5 text-brand-gold" />
          <span className="max-w-full truncate">{label}</span>
        </a>
      ))}
    </div>
  );
}

function CategoryTabs({ active, onChange }: { active: string; onChange: (slug: string) => void }) {
  return (
    <div className="-mx-3 overflow-x-auto px-3 [scrollbar-width:none]">
      <div className="flex min-w-max gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const selected = active === category.slug;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.slug)}
              className={cn(
                "flex h-[58px] min-w-[64px] flex-col items-center justify-center gap-1 border-b-2 px-2 text-xs outline-none ring-brand-gold/40 focus-visible:ring-2",
                selected ? "border-brand-gold text-brand-gold" : "border-transparent text-nav-muted",
              )}
            >
              <Icon className="size-5" />
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProviderFilters({ active, onChange }: { active: string; onChange: (slug: string) => void }) {
  return (
    <div className="-mx-3 overflow-x-auto px-3 [scrollbar-width:none]">
      <div className="flex min-w-max gap-2">
        {providers.map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={() => onChange(provider.slug)}
            className={cn(
              "h-9 min-w-16 rounded-[6px] border px-3 text-xs font-bold outline-none ring-brand-gold/40 focus-visible:ring-2",
              active === provider.slug
                ? "border-brand-gold bg-brand-gold text-[#1d222c]"
                : "border-[#344868] bg-[#2c3445] text-nav-muted",
            )}
          >
            {provider.shortName}
          </button>
        ))}
      </div>
    </div>
  );
}

function RankingSection() {
  return (
    <section className="rounded-[8px] bg-[#2c3445] p-3">
      <SectionHeader title="Ranking" action="Mais" />
      <div className="mt-2 space-y-2">
        {games.filter((game) => game.isPopular).slice(0, 4).map((game, index) => (
          <div key={game.id} className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-full bg-[#1d222c] text-xs font-black text-brand-gold">{index + 1}</span>
            <span className="min-w-0 flex-1 truncate text-sm">{game.name}</span>
            <RatingBadge />
          </div>
        ))}
      </div>
    </section>
  );
}

function AppDownloadBand() {
  return (
    <a href="/download" className="flex items-center gap-3 rounded-[8px] bg-[#2c3445] p-3 active:bg-[#344868]">
      <Image src="/a66/app-icon.png" alt="A66BET app" width={44} height={44} className="rounded-[10px]" />
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-sm font-bold">Baixe o APP A66BET</h2>
        <p className="truncate text-xs text-nav-muted">Mais rápido, mais seguro, bônus exclusivos.</p>
      </div>
      <Smartphone className="size-5 text-brand-gold" />
    </a>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2" aria-label="Carregando">
      {[1, 2, 3].map((item) => (
        <div key={item} className="h-28 animate-pulse rounded-[8px] bg-[#2c3445]">
          <Loader2 className="m-auto mt-12 size-4 animate-spin text-[#496592]" />
        </div>
      ))}
    </div>
  );
}

function EmptyPanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="grid min-h-36 place-items-center rounded-[8px] border border-dashed border-[#344868] bg-[#1d222c] p-4 text-center">
      <div>
        <History className="mx-auto mb-2 size-6 text-[#496592]" />
        <h2 className="text-sm font-bold">{title}</h2>
        <p className="mt-1 text-xs text-nav-muted">{text}</p>
      </div>
    </div>
  );
}

function SupportDialog({ onClose }: { onClose: () => void }) {
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-6">
      <div className="w-full max-w-[360px] rounded-[8px] bg-[#2c3445] p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Atendimento ao cliente</h2>
          <button type="button" onClick={onClose} className="grid size-8 place-items-center rounded-full text-nav-muted" aria-label="Fechar">
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {["Chat 24/7", "Telegram", "Depósito", "Saque"].map((item) => (
            <button key={item} type="button" className="rounded-[7px] bg-[#1d222c] p-3 text-sm font-bold text-brand-gold">
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function WalletSheet({ onClose }: { onClose: () => void }) {
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-end justify-center bg-black/55">
      <div className="w-full max-w-[var(--app-max-width)] rounded-t-[10px] bg-[#222832] p-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Depósito</h2>
          <button type="button" onClick={onClose} className="grid size-8 place-items-center text-nav-muted" aria-label="Fechar">
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["R$ 20", "R$ 50", "R$ 100", "R$ 200", "R$ 500", "R$ 1000"].map((amount) => (
            <button key={amount} type="button" className="h-11 rounded-[7px] border border-[#344868] bg-[#2c3445] text-sm font-bold text-brand-gold active:border-brand-gold">
              {amount}
            </button>
          ))}
        </div>
        <Button className="mt-4 h-11 w-full rounded-[7px] bg-brand-gold text-brand-gold-foreground">Continuar</Button>
      </div>
    </div>
  );
}

function MenuDrawer({ onClose }: { onClose: () => void }) {
  const items = [
    { label: "Pesquisar", icon: Search, href: "/games" },
    { label: "Promoção", icon: Ticket, href: "/promotions" },
    { label: "VIP", icon: Trophy, href: "/vip" },
    { label: "Carteira", icon: WalletCards, href: "/wallet" },
    { label: "Perfil", icon: UserRound, href: "/profile" },
    { label: "Ajuda", icon: CircleHelp, href: "/profile" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/55">
      <aside className="h-full w-[82%] max-w-[340px] bg-[#1d222c] p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <Image src="/a66/logo.png" alt="A66BET" width={132} height={40} className="h-10 w-auto" />
          <button type="button" onClick={onClose} className="grid size-8 place-items-center text-nav-muted" aria-label="Fechar">
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-5 space-y-2">
          {items.map(({ label, icon: Icon, href }) => (
            <a key={label} href={href} className="flex h-12 items-center gap-3 rounded-[7px] bg-[#2c3445] px-3 text-sm font-bold">
              <Icon className="size-5 text-brand-gold" />
              {label}
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}
