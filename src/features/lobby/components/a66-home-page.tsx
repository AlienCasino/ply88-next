"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
  CircleUserRound,
  Clock3,
  Download,
  DoorOpen,
  Fish,
  Flame,
  Gamepad2,
  Gem,
  Gift,
  Headphones,
  Home,
  Info,
  Mail,
  PanelLeftClose,
  Search,
  Share2,
  Spade,
  Star,
  TicketPercent,
  Trophy,
  UsersRound,
  Volume2,
  WalletCards,
} from "lucide-react";
import { Dialog as DrawerPrimitive } from "radix-ui";
import { routes } from "@/core/constants/routes";
import { A66DepositDrawer, BalancePill } from "./a66-deposit-drawer";

const miniBanners = [
  "/a66/home-small-partner.gif",
  "/a66/home-small-wheel.gif",
  "/a66/home-small-app.gif",
];

const categories = [
  { label: "Popular", icon: "🔥" },
  { label: "Slots", icon: "777" },
  { label: "Pescaria", icon: "🐬" },
  { label: "Minijogos", icon: "💎" },
  { label: "Cartas", icon: "🃏" },
];

const drawerCategories = [
  { label: "Popular", icon: Flame },
  { label: "Slots", icon: TicketPercent },
  { label: "Pescaria", icon: Fish },
  { label: "Minijogos", icon: Gem },
  { label: "Cartas", icon: Spade },
  { label: "Ao Vivo", icon: UsersRound },
  { label: "Esporte", icon: Trophy },
  { label: "Demo", icon: Gamepad2 },
  { label: "Recente", icon: Clock3 },
  { label: "Favoritos", icon: Star },
];

const drawerActions = [
  { label: "Apostas", icon: WalletCards },
  { label: "Partilhar", icon: Share2 },
  { label: "Promoção", icon: UsersRound },
];

const drawerOffers = [
  {
    label: "Eventos",
    icon: "🎡",
    badge: "",
    className: "from-[#4aa1ff] to-[#276df3]",
  },
  {
    label: "Missão",
    icon: "🗒️",
    badge: "",
    className: "from-[#21d352] to-[#08a938]",
  },
  {
    label: "Taxa de\nRebate",
    icon: "🪙",
    badge: "",
    className: "from-[#ffb31c] to-[#ff8200]",
  },
  {
    label: "Juros",
    icon: "🐷",
    badge: "100%",
    className: "from-[#246cff] to-[#0a42c9]",
  },
  {
    label: "VIP",
    icon: "👑",
    badge: "",
    className: "from-[#4aa1ff] to-[#246cff]",
  },
  {
    label: "Fundo",
    icon: "👛",
    badge: "50%",
    className: "from-[#ff3a9b] to-[#dd1671]",
  },
  {
    label: "Recomp\nensas",
    icon: "🎁",
    badge: "",
    className: "from-[#c347ff] to-[#9e1ee9]",
  },
  {
    label: "Histórico",
    icon: "🎁",
    badge: "",
    className: "from-[#ffb02e] to-[#ff8a00]",
  },
];

const drawerHelpLinks = [
  { label: "Baixar App", icon: Download, href: routes.download },
  { label: "Suporte ao Cliente", icon: Headphones, href: routes.profile },
  { label: "FAQ", icon: CircleHelp, href: routes.profile },
  { label: "Sobrea66bet", icon: Info, href: routes.profile },
];

const popularGames = [
  ["Fortune Mouse", "PG", "#e55437", "#f2bf42", "#8b1d48", "PG"],
  ["Fortune Snake", "PG", "#f55c9d", "#ba2fe8", "#5d2cff", "PG"],
  ["Fortune Snake", "PG", "#fe69c9", "#ff9e54", "#6e30d8", "PG"],
  ["Fortune Dragon", "PG", "#31c082", "#3a8bff", "#f1cb58", "PG"],
  ["Fortune Ox", "PG", "#ff4024", "#ffb21f", "#7b180e", "PG"],
  ["Tigre Sortudo", "PP", "#f5e7c1", "#f28c2d", "#b0192b", "PLAY"],
];

const slotProviders = [
  ["PG Slots", "PG", "#30bb60", "#96e665", "#1c7e4a"],
  ["TADA Slots", "TADA", "#d72b3a", "#ff5571", "#8f1b31"],
  ["PP Slots", "PP", "#ff9900", "#f9d259", "#a43a1b"],
  ["WG Slots", "WG", "#b897ff", "#a146ff", "#5424a8"],
  ["JDB Slots", "JDB", "#2e8efc", "#52d5ff", "#0857bc"],
  ["CP Slots", "CP", "#44beee", "#82e8ff", "#2b6994"],
];

const sportCards = [
  ["WG Esporte", "WG", "#2ec87f"],
  ["Poly Esporte", "POLY", "#155c45"],
  ["FB Esporte", "FB", "#4bdc88"],
];

const footerLinks = [
  ["Cassino", "Esportes", "Minijogos", "Todos"],
  [
    "Jogos",
    "Popular",
    "Slots",
    "Pescaria",
    "Minijogos",
    "Cartas",
    "Ao Vivo",
    "Esporte",
  ],
  ["Suporte", "Suporte", "Bônus de Suporte", "A66BET"],
];

type CardStyle = React.CSSProperties & {
  "--card-a": string;
  "--card-b": string;
  "--card-c": string;
  "--mark": string;
};

type A66HomeViewer = {
  balance: string;
};

export function A66HomePage({ viewer = null }: { viewer?: A66HomeViewer | null }) {
  const [depositOpen, setDepositOpen] = useState(false);
  const isAuthenticated = Boolean(viewer);

  useEffect(() => {
    const syncDepositRoute = () => {
      setDepositOpen(new URLSearchParams(window.location.search).has("deposit"));
    };

    syncDepositRoute();
    window.addEventListener("popstate", syncDepositRoute);

    return () => window.removeEventListener("popstate", syncDepositRoute);
  }, []);

  const openDeposit = () => {
    setDepositOpen(true);
    const url = new URL(window.location.href);
    url.searchParams.set("deposit", "");
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const closeDeposit = () => {
    setDepositOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("deposit");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  return (
    <DrawerPrimitive.Root>
      <div className="a66-home relative text-white">
        <TopChrome viewer={viewer} onDeposit={openDeposit} />
        <main className="pb-[calc(76px+env(safe-area-inset-bottom))]">
          <HeroBlock />
          <NoticeStrip />
          <SportsPreview />
          <CategoryRail />
          <GameSection title="Popular" games={popularGames} />
          <ExpandLine />
          <GameSection title="Slots" icon="🎰" games={slotProviders} />
          <SportsSection />
          <FooterBlock />
        </main>
        <A66SideDrawer />
        <FloatingPromos />
        <HomeBottomNav authenticated={isAuthenticated} onDeposit={openDeposit} />
        <A66DepositDrawer
          open={depositOpen}
          balance={viewer?.balance ?? "0,00"}
          onClose={closeDeposit}
        />
      </div>
    </DrawerPrimitive.Root>
  );
}

function TopChrome({
  viewer,
  onDeposit,
}: {
  viewer?: A66HomeViewer | null;
  onDeposit: () => void;
}) {
  return (
    <div className="sticky top-0 z-40">
      <HomeHeader viewer={viewer} onDeposit={onDeposit} />
    </div>
  );
}

// function TopInstallBar() {
//   return (
//     <div className="flex h-[45px] items-center gap-2 bg-[#05070a] px-2">
//       <button className="grid size-8 shrink-0 place-items-center text-[#858c98] transition hover:text-white" aria-label="Fechar banner">
//         <X className="size-5" strokeWidth={1.7} />
//       </button>
//       <div className="relative h-[39px] min-w-0 flex-1">
//         <Image src="/a66/top-install.gif" alt="Baixe e ganhe R$ 5 grátis" fill priority className="object-contain object-left" />
//       </div>
//       <button className="h-8 w-[90px] shrink-0 rounded-[7px] bg-brand-gold px-1 text-[12px] text-[#1d222c] shadow-[inset_0_-2px_0_rgba(0,0,0,.08)] transition hover:brightness-105 min-[480px]:w-[96px]">
//         Baixar<span className="hidden min-[480px]:inline"> Agora</span>
//       </button>
//     </div>
//   );
// }

function HomeHeader({
  viewer,
  onDeposit,
}: {
  viewer?: A66HomeViewer | null;
  onDeposit: () => void;
}) {
  return (
    <header className="relative flex h-[62px] items-center border-b border-[#344868] bg-[#151b25] px-2">
      <DrawerPrimitive.Trigger asChild>
        <button
          className="mr-1 grid size-7 shrink-0 place-items-center text-[#8facd9] transition hover:text-white"
          aria-label="Abrir menu"
        >
          <PanelLeftClose className="size-6" strokeWidth={1.9} />
        </button>
      </DrawerPrimitive.Trigger>
      <Image
        src="/a66/logo-home.png"
        alt="A66BET"
        width={198}
        height={60}
        priority
        className="h-[39px] w-auto"
      />
      {viewer ? (
        <div className="ml-auto flex min-w-0 items-center gap-2">
          <BalancePill balance={viewer.balance} />
          <button
            type="button"
            onClick={onDeposit}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[8px] bg-brand-gold px-3 text-sm font-medium text-[#1d222c] shadow-[inset_0_-2px_0_rgba(0,0,0,.08)] transition hover:brightness-105"
          >
            Depósito
            <ChevronDown className="size-4" />
          </button>
        </div>
      ) : (
        <div className="ml-auto flex items-center gap-2">
          <Link
            href={routes.login}
            className="grid h-9 min-w-[76px] place-items-center rounded-[8px] bg-brand-gold px-2 text-sm text-[#1d222c] shadow-[inset_0_-2px_0_rgba(0,0,0,.08)] transition hover:brightness-105"
          >
            Login
          </Link>
          <Link
            href={routes.register}
            className="grid h-9 min-w-[84px] place-items-center rounded-[8px] border border-brand-gold px-2 text-sm text-brand-gold transition hover:bg-brand-gold/10"
          >
            Registro
          </Link>
        </div>
      )}
    </header>
  );
}

function A66SideDrawer() {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay className="a66-drawer-overlay fixed bottom-0 top-[62px] z-[31] w-[var(--app-max-width)] bg-black/35 backdrop-blur-[5px]" />
      <DrawerPrimitive.Content className="a66-side-drawer fixed bottom-0 top-[62px] z-[32] w-[238px] max-w-[70vw] overflow-y-auto bg-[#1d222c] px-3 py-3 text-[#8facd9] shadow-[12px_0_28px_rgba(0,0,0,.35)] outline-none">
        <DrawerPrimitive.Title className="sr-only">
          Menu de navegação
        </DrawerPrimitive.Title>
        <div className="mb-2 flex h-11 items-center gap-3 rounded-[7px] bg-[#2b3546] px-4 text-[15px] text-[#9fc0f4]">
          <Search className="size-5" />
          <span>Pesquisar</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {drawerCategories.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="grid h-[62px] place-items-center rounded-[7px] bg-[#2b3546] text-[14px] transition hover:bg-[#344052] hover:text-white"
            >
              <Icon className="mb-1 size-6 text-[#9fc0f4]" strokeWidth={2.1} />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className="mt-2 space-y-1.5">
          {drawerActions.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex h-11 w-full items-center gap-3 rounded-[7px] bg-[#2b3546] px-4 text-left text-[15px] transition hover:bg-[#344052] hover:text-white"
            >
              <Icon className="size-5 text-[#9fc0f4]" />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <section className="mt-2 rounded-[7px] bg-[#2b3546] p-1.5">
          <h2 className="mb-1.5 text-center text-sm text-[#6e8ab7]">Ofertas</h2>
          <div className="grid grid-cols-2 gap-1.5">
            {drawerOffers.map((offer) => (
              <Link
                key={offer.label}
                href={routes.promotions}
                className={`relative h-[54px] overflow-hidden rounded-[6px] bg-gradient-to-br ${offer.className} p-1.5 text-left text-[13px] leading-[14px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.22)]`}
              >
                <span className="whitespace-pre-line">{offer.label}</span>
                <span className="absolute bottom-1 right-1.5 text-[24px] drop-shadow">
                  {offer.icon}
                </span>
                {offer.badge ? (
                  <span className="absolute right-1 top-1 rounded-full bg-[#21d30f] px-1.5 text-[10px] font-bold text-white">
                    {offer.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        </section>
        <div className="mt-2 space-y-1">
          {drawerHelpLinks.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="flex h-9 items-center gap-3 rounded-[7px] px-2.5 text-sm transition hover:bg-[#2b3546] hover:text-white"
            >
              <Icon className="size-5 fill-[#9fc0f4] text-[#9fc0f4]" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
        <p className="mt-3 text-sm text-[#496592]">Login Rápido</p>
        <Link
          href={routes.login}
          className="mt-2 flex h-10 items-center gap-3 rounded-[7px] bg-[#2b3546] px-3 text-sm text-[#9fc0f4] transition hover:bg-[#344052]"
        >
          <Image
            src="/a66/google.avif"
            alt=""
            width={24}
            height={24}
            className="rounded-full"
          />
          Google Login
        </Link>
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
}

function HeroBlock() {
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

function NoticeStrip() {
  return (
    <div className="mt-3 flex h-11 items-center gap-2 overflow-visible px-4 text-[15px] font-bold tracking-wide">
      <Volume2 className="size-6 shrink-0 text-[#8facd9]" strokeWidth={2.3} />
      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="a66-notice-marquee whitespace-nowrap">
          <NoticeText />
          <NoticeText />
        </p>
      </div>
      <div className="relative z-10 shrink-0">
        <Mail className="size-7 rounded-[4px] bg-[#344868] p-[5px] text-[#8facd9]" />
        <span className="a66-mail-badge absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-[#ea4e3d] text-xs leading-none text-white">
          2
        </span>
      </div>
    </div>
  );
}

function NoticeText() {
  return (
    <span className="pr-8">
      <span className="mr-2 inline-grid h-[16px] w-[22px] place-items-center rounded-[2px] bg-[#d82d63] align-[-1px] text-[10px] leading-none">
        BR
      </span>
      CONVIDE E GANHE <span className="text-[#ffaa09]">R$120</span> ,
      COMPARTILHE LINK E RECEBA BÔNUS
    </span>
  );
}

function SportsPreview() {
  return (
    <section className="mt-3 px-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg">
          <span>⚽</span> Jogos de desporto
        </h2>
        <button className="flex items-center gap-1 text-sm text-brand-gold">
          Mais <ArrowRight className="size-4" />
        </button>
      </div>
      <div className="w-[68%] rounded-[8px] border border-[#344868] bg-[#263146] p-2 text-center shadow">
        <div className="flex items-center justify-between text-xs text-[#8facd9]">
          <span>Primeiro te...</span>
          <span className="text-brand-gold">839 ›</span>
        </div>
        <p className="mt-1 truncate text-sm font-bold">
          🏆 Copa do Mundo FIF...
        </p>
        <p className="text-lg font-black leading-none">0-0</p>
        <p className="text-xs text-[#6e8ab7]">Movimento da partida</p>
        <div className="mt-2 grid min-w-0 grid-cols-3 gap-1.5">
          {[
            ["House", "2.58"],
            ["Draw", "2.65"],
            ["Visitor", "3.72"],
          ].map(([label, value]) => (
            <button
              key={label}
              className="min-w-0 overflow-hidden rounded-[5px] border border-[#344868] bg-[#1d2635] px-1 py-1 text-center leading-tight"
            >
              <span className="block truncate text-[10px] text-[#8facd9]">
                {label}
              </span>
              <span className="block text-[12px] font-bold text-white">
                {value}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryRail() {
  return (
    <div className="mt-3 flex h-[72px] items-end justify-between px-4 text-[#6e8ab7]">
      {categories.map((item, index) => (
        <button
          key={item.label}
          className="flex min-w-0 flex-col items-center text-[13px]"
        >
          <span className="mb-1 grid h-8 place-items-center text-2xl font-black text-[#74a5d9]">
            {item.icon}
          </span>
          <span className={index === 0 ? "text-brand-gold" : ""}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

function GameSection({
  title,
  icon,
  games,
}: {
  title: string;
  icon?: string;
  games: string[][];
}) {
  return (
    <section className="mt-4 px-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[22px] font-medium">
          {icon ? <span className="text-xl">{icon}</span> : null}
          {title}
        </h2>
        <Link href={routes.games} className="text-sm text-[#6e8ab7]">
          Tudo
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {games.map(([name, brand, a, b, c, mark], index) => (
          <GameTile
            key={`${title}-${name}-${brand}-${index}`}
            name={name}
            brand={brand}
            colors={[a, b, c]}
            mark={mark ?? brand}
          />
        ))}
      </div>
    </section>
  );
}

function GameTile({
  name,
  brand,
  colors,
  mark,
}: {
  name: string;
  brand: string;
  colors: string[];
  mark: string;
}) {
  const style: CardStyle = {
    "--card-a": colors[0],
    "--card-b": colors[1],
    "--card-c": colors[2],
    "--mark": `"${mark}"`,
  };

  return (
    <article className="relative aspect-[156/205] overflow-hidden rounded-[13px] bg-[#2c3445] shadow-[0_8px_14px_rgba(0,0,0,.2)]">
      <div className="a66-game-art absolute inset-0" style={style} />
      <span className="absolute left-1 top-1 grid size-6 place-items-center rounded-full bg-[#ffaa09] text-sm">
        👍
      </span>
      <span className="absolute right-1 top-1 grid size-6 place-items-center rounded-full bg-white/35 text-brand-gold">
        ★
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-4 pt-10">
        <p className="truncate text-base font-black text-white drop-shadow">
          {name}
        </p>
        <p className="text-xs font-bold text-white/75">{brand}</p>
      </div>
    </article>
  );
}

function ExpandLine() {
  return (
    <div className="mt-3 flex justify-center gap-1 text-lg">
      <span className="text-[#496592]">Mais 40 jogos</span>
      <button className="text-brand-gold">Expandir</button>
    </div>
  );
}

function SportsSection() {
  return (
    <section className="mt-7 px-3">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[26px]">⚽ Esporte</h2>
        <button className="text-sm text-[#6e8ab7]">Tudo</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {sportCards.map(([name, brand, color]) => (
          <GameTile
            key={name}
            name={name}
            brand={brand}
            colors={[color, "#45e48b", "#0d7049"]}
            mark={brand}
          />
        ))}
      </div>
    </section>
  );
}

function FooterBlock() {
  return (
    <footer className="mt-5 border-t border-[#344868] px-4 pb-6 pt-7">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-[#344868] pb-7">
        <p className="text-lg text-[#6e8ab7]">Conformidade de licença</p>
        <div className="grid size-[58px] place-items-center rounded-full border-[4px] border-white bg-white shadow-[0_0_0_2px_#e8335b]">
          <span className="grid size-[46px] place-items-center rounded-full border-[3px] border-[#e8335b] text-[22px] font-black leading-none text-[#e8335b]">
            18+
          </span>
        </div>
        <span aria-hidden="true" />
      </div>
      <div className="border-b border-[#344868] py-6">
        <p className="mb-4 text-lg text-[#6e8ab7]">Contate-Nos</p>
        <div className="flex items-center gap-4">
          <span className="grid size-11 place-items-center rounded-full bg-[#28aeea] text-sm font-black text-white shadow">
            TG
          </span>
          <span className="grid size-11 place-items-center rounded-[10px] bg-[#22d64f] text-sm font-black text-white shadow">
            WA
          </span>
        </div>
      </div>
      <div className="mt-5 text-center">
        <Image
          src="/a66/logo-home.png"
          alt="A66BET"
          width={180}
          height={55}
          className="mx-auto h-12 w-auto"
        />
        <p className="mt-3 text-base leading-7 text-[#d6f0e3]">
          <b className="text-brand-gold">A66BET</b> O Grupo é a empresa
          operadora de jogos de azar on-line mais conhecida do mundo, oferecendo
          cassinos emocionantes e divertidos com crupiê ao vivo, cartas,
          loteria, esportes e outras categorias completas de jogos.
        </p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-base text-[#8facd9]">
        {footerLinks.map((column, columnIndex) => (
          <div key={`${column[0]}-${columnIndex}`} className="space-y-3">
            {column.map((item, index) => (
              <p
                key={`${item}-${index}`}
                className={index === 0 ? "text-white" : ""}
              >
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-sm text-[#8ccbb4]">
        A66BET.COM@Copyright 2003-2025
      </p>
    </footer>
  );
}

function FloatingPromos() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [showLeftPromos, setShowLeftPromos] = useState(true);
  const [showRightPromos, setShowRightPromos] = useState(true);

  useEffect(() => {
    let scrollEndTimer: number | undefined;

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollEndTimer) {
        window.clearTimeout(scrollEndTimer);
      }
      scrollEndTimer = window.setTimeout(() => setIsScrolling(false), 360);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollEndTimer) {
        window.clearTimeout(scrollEndTimer);
      }
    };
  }, []);

  return (
    <>
      <div className="a66-floating-layer pointer-events-none fixed inset-y-[62px] left-[var(--app-shell-left)] z-30 w-[var(--app-max-width)] overflow-hidden">
        {showLeftPromos ? (
          <div
            className="absolute bottom-[calc(64px+env(safe-area-inset-bottom))] left-0 flex flex-col items-start gap-2 transition-transform duration-300 ease-out"
            style={{
              transform: isScrolling ? "translateX(-42px)" : "translateX(0)",
            }}
          >
            <div className="relative grid size-16 place-items-center">
              <Image src="/a66/float-cup.gif" alt="" width={60} height={60} unoptimized className="size-[60px] object-contain" />
              <button
                type="button"
                onClick={() => setShowLeftPromos(false)}
                className="pointer-events-auto absolute -right-1 top-1 grid size-5 place-items-center rounded-full bg-black/80 text-[14px] font-bold leading-none text-white shadow"
                aria-label="Fechar promoções à esquerda"
              >
                ×
              </button>
            </div>
            <span className="grid size-16 place-items-center">
              <Image
                src="/a66/float-telegram.gif"
                alt=""
                width={60}
                height={60}
                unoptimized
                className="size-[60px] object-contain drop-shadow-[0_4px_5px_rgba(0,0,0,.35)]"
              />
            </span>
            <span className="grid size-16 place-items-center">
              <Image src="/a66/float-headset.gif" alt="" width={60} height={60} unoptimized className="size-[60px] object-contain" />
            </span>
          </div>
        ) : null}
        {showRightPromos ? (
          <div
            className="absolute bottom-[calc(64px+env(safe-area-inset-bottom))] right-0 flex flex-col items-end gap-2 transition-transform duration-300 ease-out"
            style={{
              transform: isScrolling ? "translateX(44px)" : "translateX(0)",
            }}
          >
            <div className="relative grid size-16 place-items-center">
              <Image src="/a66/float-wheel.gif" alt="" width={60} height={60} unoptimized className="size-[60px] object-contain" />
              <button
                type="button"
                onClick={() => setShowRightPromos(false)}
                className="pointer-events-auto absolute left-1 top-0 grid size-5 place-items-center rounded-full bg-black/80 text-[14px] font-bold leading-none text-white shadow"
                aria-label="Fechar promoções à direita"
              >
                ×
              </button>
            </div>
            <span className="grid size-16 place-items-center">
              <Image src="/a66/float-chest.gif" alt="" width={60} height={60} unoptimized className="size-[60px] object-contain" />
            </span>
            <span className="grid size-16 place-items-center">
              <Image
                src="/a66/float-redpacket.gif"
                alt=""
                width={60}
                height={60}
                unoptimized
                className="size-[60px] object-contain"
              />
            </span>
          </div>
        ) : null}
      </div>
      <button className="fixed bottom-[calc(86px+env(safe-area-inset-bottom))] right-[calc(var(--app-shell-left)+8px)] z-40 rounded-[8px] border border-[#344868] bg-[#263146] px-2 py-1.5 text-xs font-bold text-white">
        🧭 TOPO
      </button>
    </>
  );
}

function HomeBottomNav({
  authenticated,
  onDeposit,
}: {
  authenticated: boolean;
  onDeposit: () => void;
}) {
  const items = authenticated
    ? [
        {
          label: "Começar",
          icon: Home,
          href: routes.home,
          active: true,
        },
        { label: "Ofertas", icon: Gift, href: routes.promotions },
        { label: "Depósito", icon: WalletCards, action: onDeposit },
        { label: "Saques", icon: TicketPercent, href: routes.wallet },
        { label: "Perfil", icon: CircleUserRound, href: routes.profile },
      ]
    : [
        {
          label: "Começar",
          icon: Home,
          href: routes.home,
          active: true,
        },
        { label: "Ofertas", icon: Gift, href: routes.promotions },
        { label: "Login", icon: DoorOpen, href: routes.login },
        {
          label: "Registro",
          icon: CircleUserRound,
          href: routes.register,
        },
        { label: "Perfil", icon: Search, href: routes.profile },
      ];

  return (
    <nav className="a66-bottom-nav fixed bottom-0 left-1/2 z-50 h-[calc(76px+env(safe-area-inset-bottom))] w-[var(--app-max-width)] -translate-x-1/2 overflow-visible border-t border-[#344868] bg-[#2d3541] pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_20px_rgba(0,0,0,.18)]">
      <div className="relative z-10 grid h-[76px] grid-cols-5">
        {items.map(({ label, icon: Icon, active, ...item }) => {
          const className = `relative flex min-w-0 flex-col items-center justify-center gap-[4px] pt-1 text-[13px] transition hover:text-white ${active ? "text-brand-gold" : "text-[#8facd9]"}`;
          const content = (
            <>
              <span className="relative grid h-7 place-items-center">
                <Icon className="size-[22px]" strokeWidth={active ? 2 : 1.65} />
                {label === "Registro" ? (
                  <span className="absolute -right-2 top-1 text-xs font-bold text-brand-gold">
                    +
                  </span>
                ) : null}
              </span>
              <span className="relative text-[13px] leading-none">{label}</span>
            </>
          );

          if ("action" in item) {
            return (
              <button key={label} type="button" onClick={item.action} className={className}>
                {content}
              </button>
            );
          }

          return (
            <Link key={label} href={item.href} className={className}>
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
