"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Boxes,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coins,
  Gift,
  Grid2X2,
  Handshake,
  MessageCircle,
  RefreshCw,
  Send,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/core/constants/routes";

export type OfferTabKey =
  | "events"
  | "mission"
  | "rewards"
  | "fund"
  | "history"
  | "vip"
  | "rebate"
  | "interest";

type OfferScreenProps = {
  activeTab: OfferTabKey;
};

const topTabs: Array<{ key: OfferTabKey; label: string; value: string; width: string }> = [
  { key: "events", label: "Eventos", value: "events", width: "w-[92px]" },
  { key: "mission", label: "Missão", value: "mission", width: "w-[90px]" },
  { key: "rewards", label: "Recompensas", value: "rewards", width: "w-[132px]" },
  { key: "fund", label: "Fundo", value: "fund", width: "w-[84px]" },
  { key: "history", label: "Histórico", value: "history", width: "w-[110px]" },
  { key: "vip", label: "VIP", value: "vip", width: "w-[70px]" },
  { key: "rebate", label: "Taxa de Rebate", value: "rebate", width: "w-[150px]" },
  { key: "interest", label: "Juros", value: "interest", width: "w-[86px]" },
];

const eventCategories: Array<{ key: string; label: string; icon: LucideIcon }> = [
  { key: "mixed", label: "Misto", icon: Grid2X2 },
  { key: "new", label: "Novo membro", icon: Gift },
  { key: "cooperate", label: "Cooperar", icon: Handshake },
  { key: "telegram", label: "Telegram", icon: Send },
  { key: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { key: "sport", label: "Esporte", icon: Target },
];

const promoBanners = [
  {
    id: "redeem",
    badge: "NEW",
    tone: "blue",
    figure: "/a66/bottom-mascot-left.png",
    title: "USE THE REDEEM CODE",
    subtitle: "RESCUE YOUR REWARD NOW",
    amount: "R$ 888",
    detail: "BONUS",
  },
  {
    id: "invite",
    badge: "Hot!",
    tone: "blue",
    figure: "/a66/float-chest.gif",
    title: "INVITE SOMEONE",
    subtitle: "EARN A BONUS UP TO",
    amount: "R$ 120.00",
    detail: "VALID REFERRAL",
  },
  {
    id: "partner",
    badge: "",
    tone: "green",
    figure: "/a66/home-small-partner.gif",
    title: "BRAND PARTNERSHIP",
    subtitle: "Creating a brand of excellence",
    amount: "",
    detail: "BRCBF.com",
  },
  {
    id: "tournament",
    badge: "",
    tone: "blue",
    figure: "/a66/float-cup.gif",
    title: "MONTHLY TOURNAMENT",
    subtitle: "First prize is",
    amount: "R$100.000",
    detail: "A66BET",
  },
  {
    id: "bonus",
    badge: "Hot!",
    tone: "teal",
    figure: "/a66/bottom-mascot-right.png",
    title: "12 TIMES A DAY",
    subtitle: "Maximum reward per pack",
    amount: "R$ 888",
    detail: "DAILY BONUS",
  },
  {
    id: "wheel",
    badge: "Hot!",
    tone: "purple",
    figure: "/a66/home-small-wheel.gif",
    title: "LUCKY WHEEL",
    subtitle: "Spin and unlock prizes",
    amount: "R$ 555",
    detail: "LUCKY DRAW",
  },
  {
    id: "app",
    badge: "",
    tone: "green",
    figure: "/a66/home-small-app.gif",
    title: "DOWNLOAD THE APP",
    subtitle: "Play anywhere and win",
    amount: "R$ 555",
    detail: "MOBILE BONUS",
  },
  {
    id: "worldcup",
    badge: "",
    tone: "blue",
    figure: "/a66/home-worldcup-banner.png",
    title: "SPORTS CHALLENGE",
    subtitle: "Bet on matches and collect",
    amount: "R$ 1.000",
    detail: "A66BET",
  },
];

const eventCategoryCardOrder: Record<string, string[]> = {
  mixed: ["redeem", "invite", "partner", "bonus", "tournament"],
  new: ["redeem", "app", "bonus", "wheel"],
  cooperate: ["partner", "invite", "worldcup", "tournament"],
  telegram: ["bonus", "wheel", "redeem", "invite"],
  whatsapp: ["invite", "app", "partner", "bonus"],
  sport: ["worldcup", "tournament", "partner", "invite"],
};

const rebateRows = [
  { label: "Slots", logo: "PG" },
  { label: "Pescaria", logo: "TADA" },
  { label: "Minijogos", logo: "JDB" },
  { label: "Cartas", logo: "WG" },
  { label: "Ao Vivo", logo: "EVO" },
  { label: "Esporte", logo: "FB" },
];

const vipRows = [
  { level: 0, amount: "0,00" },
  { level: 1, amount: "1,20" },
  { level: 2, amount: "3,50" },
  { level: 3, amount: "9,00" },
  { level: 4, amount: "17,00" },
  { level: 5, amount: "28,00" },
  { level: 6, amount: "45,00" },
];

export function OfferScreen({ activeTab }: OfferScreenProps) {
  return (
    <main className="min-h-dvh bg-[#2b3342] pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom))] text-white">
      <OfferTabs activeTab={activeTab} />
      {activeTab === "events" ? <EventsPanel /> : null}
      {activeTab === "mission" ? <MissionPanel /> : null}
      {activeTab === "rewards" ? <RewardsPanel /> : null}
      {activeTab === "fund" ? <FundPanel /> : null}
      {activeTab === "history" ? <HistoryPanel /> : null}
      {activeTab === "vip" ? <VipPanel /> : null}
      {activeTab === "rebate" ? <RebatePanel /> : null}
      {activeTab === "interest" ? <InterestPanel /> : null}
    </main>
  );
}

function OfferTabs({ activeTab }: { activeTab: OfferTabKey }) {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const activeElement = navRef.current?.querySelector<HTMLElement>(
      "[data-active='true']",
    );

    activeElement?.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  }, [activeTab]);

  return (
    <header className="sticky top-0 z-20 border-b border-[#3a4c68] bg-[#1d232d]">
      <div className="flex h-[56px] items-end">
        <Link
          href={routes.home}
          aria-label="Back to home"
          className="grid h-full w-12 shrink-0 place-items-center text-[#9ab7e4] transition hover:text-white"
        >
          <ChevronLeft className="size-6" />
        </Link>
        <nav
          ref={navRef}
          className="a66-hidden-scrollbar flex min-w-0 flex-1 overflow-x-auto overflow-y-hidden"
        >
          {topTabs.map((tab) => {
            const isActive = tab.key === activeTab;

            return (
              <Link
                key={tab.key}
                href={tabHref(tab.value)}
                className={`relative grid h-[56px] shrink-0 place-items-center px-2 text-center text-[15px] font-medium transition ${tab.width} ${
                  isActive ? "text-brand-gold" : "text-white"
                }`}
                aria-current={isActive ? "page" : undefined}
                data-active={isActive ? "true" : undefined}
              >
                <span className="whitespace-nowrap">{tab.label}</span>
                {isActive ? (
                  <span className="absolute bottom-0 h-[2px] w-[calc(100%-20px)] rounded-full bg-brand-gold" />
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function EventsPanel() {
  const [activeCategory, setActiveCategory] = useState("mixed");
  const [refreshCount, setRefreshCount] = useState(0);
  const activeLabel =
    eventCategories.find((item) => item.key === activeCategory)?.label ?? "Misto";
  const visibleBanners = getEventBanners(activeCategory, refreshCount);

  return (
    <section className="grid min-h-[calc(100dvh-130px)] grid-cols-[90px_minmax(0,1fr)] gap-2.5 px-3 py-3">
      <aside className="space-y-2.5">
        {eventCategories.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setActiveCategory(key);
              setRefreshCount((value) => value + 1);
            }}
            className={`grid h-[46px] w-full grid-cols-[20px_minmax(0,1fr)] items-center gap-1 rounded-[7px] px-1.5 text-left text-[11px] font-medium leading-none transition ${
              activeCategory === key
                ? "bg-brand-gold text-[#1d222c]"
                : "bg-[#1f2530] text-[#9ab7e4] shadow-[0_2px_8px_rgba(0,0,0,.16)] hover:bg-[#242c39]"
            }`}
          >
            <Icon className="size-[18px] justify-self-center" />
            <span className="block min-w-0 truncate whitespace-nowrap">
              {label}
            </span>
          </button>
        ))}
        <button className="h-9 w-full rounded-[7px] border border-brand-gold text-[13px] font-medium text-brand-gold">
          Histórico
        </button>
        <button
          type="button"
          onClick={() => setRefreshCount((value) => value + 1)}
          className="flex h-9 w-full items-center justify-center gap-1 rounded-[7px] border border-brand-gold text-[12px] font-medium text-brand-gold"
        >
          <RefreshCw
            className="size-4 transition-transform"
            style={{ transform: `rotate(${refreshCount * 180}deg)` }}
          />
          Atualizar
        </button>
        <button className="h-10 w-full truncate whitespace-nowrap rounded-[7px] bg-[#3d95ff] px-1.5 text-[11px] font-bold leading-none text-white">
          Código de...
        </button>
      </aside>
      <div className="min-w-0 space-y-3">
        <p className="sr-only">Showing {activeLabel} offers</p>
        {visibleBanners.map((banner, index) => (
          <EventPromoCard
            key={banner.id}
            banner={banner}
            activeLabel={activeLabel}
            priority={index < 2}
          />
        ))}
      </div>
    </section>
  );
}

function EventPromoCard({
  banner,
  activeLabel,
  priority,
}: {
  banner: (typeof promoBanners)[number];
  activeLabel: string;
  priority: boolean;
}) {
  return (
    <button
      type="button"
      className={`relative block aspect-[340/148] w-full overflow-hidden rounded-[5px] text-left shadow-[0_3px_8px_rgba(0,0,0,.25)] ring-1 ring-white/10 transition hover:brightness-105 ${getPromoToneClass(
        banner.tone,
      )}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(255,255,255,.16),transparent_24%),linear-gradient(90deg,rgba(0,0,0,.22),transparent_50%)]" />
      <span className="absolute right-2 top-2 z-20 rounded-full border-2 border-brand-gold px-2 py-0.5 text-[14px] font-black leading-none text-brand-gold shadow-[0_1px_0_rgba(0,0,0,.4)]">
        A66BET
      </span>
      {banner.badge ? (
        <span className="absolute left-0 top-0 z-20 rounded-br-[8px] bg-[#f73329] px-2.5 py-1 text-[14px] font-black italic leading-none text-white shadow">
          {banner.badge}
        </span>
      ) : null}
      <div className="absolute bottom-0 left-0 top-0 z-10 w-[43%]">
        <Image
          src={banner.figure}
          alt={`${activeLabel} promotion`}
          fill
          sizes="150px"
          className="object-contain object-bottom drop-shadow-[0_5px_5px_rgba(0,0,0,.45)]"
          priority={priority}
        />
      </div>
      <div className="absolute inset-y-0 right-2 z-10 flex w-[61%] flex-col items-center justify-center pl-6 text-center">
        <p className="text-[10px] font-black uppercase leading-none tracking-wide text-brand-gold/95">
          {banner.detail}
        </p>
        <h3 className="mt-1 max-w-full text-[19px] font-black uppercase leading-[20px] text-white [text-shadow:0_2px_0_rgba(0,0,0,.32)]">
          {banner.title}
        </h3>
        <p className="mt-1 text-[11px] font-black uppercase leading-[13px] text-white/95">
          {banner.subtitle}
        </p>
        {banner.amount ? (
          <p className="mt-1 text-[30px] font-black leading-none text-brand-gold [text-shadow:0_2px_0_#fff,0_4px_4px_rgba(0,0,0,.25)]">
            {banner.amount}
          </p>
        ) : null}
      </div>
      <span className="absolute bottom-0 right-0 h-7 w-7 border-b-[3px] border-r-[3px] border-[#1175d0]" />
    </button>
  );
}

function getPromoToneClass(tone: string) {
  if (tone === "green") {
    return "bg-[linear-gradient(135deg,#047a2d_0%,#10a844_48%,#026326_100%)]";
  }

  if (tone === "teal") {
    return "bg-[linear-gradient(135deg,#03656f_0%,#0485a0_46%,#053a89_100%)]";
  }

  if (tone === "purple") {
    return "bg-[linear-gradient(135deg,#4b2995_0%,#7b3bc2_48%,#173b92_100%)]";
  }

  return "bg-[linear-gradient(135deg,#075c83_0%,#006ca0_42%,#043b91_100%)]";
}

function getEventBanners(category: string, offset: number) {
  const order = eventCategoryCardOrder[category] ?? eventCategoryCardOrder.mixed;
  const rotatedOrder = rotate(order, offset % order.length);

  return rotatedOrder
    .map((id) => promoBanners.find((banner) => banner.id === id))
    .filter((banner): banner is (typeof promoBanners)[number] => Boolean(banner));
}

function rotate<T>(items: T[], offset: number) {
  if (items.length === 0) {
    return items;
  }

  return [...items.slice(offset), ...items.slice(0, offset)];
}

function MissionPanel() {
  const [task, setTask] = useState("Daily");

  return (
    <section className="px-4 py-4">
      <div className="rounded-[7px] bg-[#1f2530] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-medium text-brand-gold">Missão</h2>
          <FilterSelect
            value={task}
            onChange={setTask}
            options={["Daily", "Weekly", "Monthly"]}
            className="w-[118px]"
          />
        </div>
        <div className="mt-4 space-y-3">
          {["Make one deposit", "Play 10 slot rounds", "Invite one friend"].map(
            (title, index) => (
              <button
                key={title}
                type="button"
                className="flex min-h-[64px] w-full items-center justify-between rounded-[7px] bg-[#242c39] px-3 text-left"
              >
                <span>
                  <span className="block text-[14px] text-white">{title}</span>
                  <span className="mt-1 block text-[12px] text-[#5878ae]">
                    {task} dummy progress {index}/3
                  </span>
                </span>
                <span className="rounded-[6px] bg-brand-gold px-3 py-1 text-[12px] font-bold text-[#1d222c]">
                  Go
                </span>
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function RewardsPanel() {
  const [date, setDate] = useState("Hoje");
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="px-4 pt-4">
      <BalanceMini />
      <EmptyBox className="mt-[86px]" message="Ainda sem conteúdo" reload />
      <div className="mt-16 border-t border-[#344868] pt-5 text-center text-[18px]">
        A recompensa expirou
      </div>
      <div className="mt-6">
        <FilterSelect
          value={date}
          onChange={setDate}
          options={["Hoje", "Ontem", "7 dias", "Este mês"]}
          className="w-[100px]"
        />
      </div>
      <EmptyBox className="mt-20" message="Hoje Sem Registros,mas" onMore={() => setExpanded((value) => !value)} />
      {expanded ? (
        <p className="mt-2 text-center text-[12px] text-[#5878ae]">
          Nenhuma recompensa expirada encontrada para {date}.
        </p>
      ) : null}
    </section>
  );
}

function FundPanel() {
  const [subTab, setSubTab] = useState("records");
  const [date, setDate] = useState("Hoje");
  const [depositBoost, setDepositBoost] = useState(false);

  return (
    <section className="px-4 py-3">
      <div className="rounded-[7px] bg-[#1f2530] p-4">
        <div className="grid grid-cols-2 text-center">
          <div className="border-r border-[#344868]">
            <p className="text-[13px] text-[#5878ae]">Total de depósitos</p>
            <p className="mt-2 text-[24px] leading-none text-white">0,00</p>
            <button
              type="button"
              onClick={() => setDepositBoost(true)}
              className="relative mt-3 rounded-[8px] bg-[#ff9f11] px-4 py-2 text-[14px] font-bold text-white"
            >
              Depósito
              <span className="absolute -right-2 -top-3 rounded-full bg-[#1ac927] px-2 py-0.5 text-[11px]">
                +50%
              </span>
            </button>
          </div>
          <div>
            <p className="text-[13px] text-[#5878ae]">Fundo</p>
            <p className="mt-2 text-[24px] leading-none text-brand-gold">0,00</p>
            <button className="mt-3 rounded-[8px] bg-[#5576ad] px-5 py-2 text-[13px] text-[#1d222c]">
              Retira
            </button>
          </div>
        </div>
        <p className="mt-4 text-[12px] leading-4 text-[#5878ae]">
          Bônus Máximo <span className="font-bold text-white">Ilimitado</span>
          <br />
          Quantidade máxima <span className="font-bold text-white">Ilimitado</span>
        </p>
        {depositBoost ? (
          <p className="mt-2 text-[12px] text-brand-gold">Dummy deposit bonus selected.</p>
        ) : null}
      </div>
      <div className="mt-3 rounded-[7px] bg-[#1f2530]">
        <SubTabs
          tabs={[
            ["records", "Total de registros"],
            ["requirements", "Requisitos de apostas"],
            ["rules", "Regras"],
          ]}
          value={subTab}
          onChange={setSubTab}
        />
        <div className="min-h-[430px] border-t border-[#344868] p-4">
          {subTab === "records" ? (
            <>
              <div className="flex items-center justify-between">
                <FilterSelect
                  value={date}
                  onChange={setDate}
                  options={["Hoje", "Ontem", "7 dias", "Este mês"]}
                  className="w-[100px]"
                />
                <p className="text-[13px] text-[#5878ae]">
                  acumulação total <span className="text-brand-gold">0,00</span>
                </p>
              </div>
              <EmptyBox className="mt-36" message="Hoje Sem Registros,mas" />
            </>
          ) : (
            <RulesText
              text={
                subTab === "rules"
                  ? "1. Fund rewards are calculated from dummy deposits. 2. The displayed values are examples only. 3. All bonus rules can be edited later."
                  : "Minimum valid bets: 1,000.00. Qualified records will appear here with platform, amount and completion status."
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}

function HistoryPanel() {
  const [date, setDate] = useState("Hoje");
  const [status, setStatus] = useState("Todos os status");
  const [type, setType] = useState("Todos os Tipos");

  return (
    <section className="px-4 py-3">
      <div className="a66-hidden-scrollbar flex items-center gap-2 overflow-x-auto pb-2">
        <FilterSelect value={date} onChange={setDate} options={["Hoje", "Ontem", "7 dias", "Este mês"]} className="w-[90px]" />
        <FilterSelect value={status} onChange={setStatus} options={["Todos os status", "Pendente", "Concluído", "Expirado"]} className="w-[150px]" />
        <FilterSelect value={type} onChange={setType} options={["Todos os Tipos", "Bônus", "Fundos", "Rebate"]} className="w-[145px]" />
        <p className="shrink-0 text-[12px] text-[#5878ae]">
          Bônus <span className="text-brand-gold">0,00</span>
        </p>
      </div>
      <EmptyBox className="mt-[300px]" message="Hoje Sem Registros,mas" />
    </section>
  );
}

function VipPanel() {
  const [subTab, setSubTab] = useState("rewards");
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);

  return (
    <section>
      <div className="mx-4 mt-3 overflow-hidden rounded-[10px] bg-[#eaf3ff] px-3 py-2.5 text-[#5570a3]">
        <p className="text-[12px] leading-none">Nível Atual</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[34px] font-black italic leading-none">VIP 0</p>
            <div className="mt-1 h-1.5 w-[160px] rounded-full bg-[#d2deef]">
              <div className="h-full w-[4%] rounded-full bg-[#5376bb]" />
            </div>
            <p className="mt-3 text-[12px] font-medium">
              Deposite <b>100,00</b> e aposte <b>1.000,00</b> para apro...
            </p>
          </div>
          <div className="grid size-14 place-items-center rounded-[15px] bg-[#56d8cf] text-white shadow-inner">
            <ShieldCheck className="size-9" />
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-t-[10px] bg-[#1f2530] pt-3">
        <h2 className="text-center text-[19px] font-bold">
          <span className="text-[#5878ae]">♕</span> Lista de recompensas VIP{" "}
          <span className="text-[#5878ae]">♕</span>
        </h2>
        <SubTabs
          tabs={[
            ["rewards", "Recompensa VIP"],
            ["rules", "Regras"],
          ]}
          value={subTab}
          onChange={setSubTab}
        />
        {subTab === "rules" ? (
          <RulesText
            className="border-t border-[#344868] px-5 py-4 text-[15px] leading-8 text-white"
            text="1. Bônus de Upgrade VIP: Atenda aos requisitos da promoção VIP para ser promovido ao nível correspondente. 2. Bônus Diário: ao atender aos requisitos, você poderá receber o bônus diário correspondente. 3. O bônus será desativado imediatamente após expirar."
          />
        ) : (
          <div className="mx-4 mt-2 overflow-hidden rounded-[7px] border border-[#344868]">
            <div className="grid grid-cols-[64px_1fr] border-b border-[#344868] text-center text-[14px]">
              <div className="border-r border-[#344868] py-2.5">Nível</div>
              <div className="py-2.5">Recompensas/privilégios</div>
            </div>
            {vipRows.map((row) => (
              <button
                key={row.level}
                type="button"
                onClick={() =>
                  setExpandedLevel((current) => (current === row.level ? null : row.level))
                }
                className="block w-full border-b border-[#344868] text-left last:border-b-0"
              >
                <div className="grid min-h-[58px] grid-cols-[64px_1fr]">
                  <div className="grid place-items-center border-r border-[#344868] text-center text-[13px] font-bold">
                    <ShieldCheck className="size-5 text-[#55d7ce]" />
                    VIP {row.level}
                  </div>
                  <div className="flex items-center justify-between px-3 text-[15px]">
                    <span>
                      Bônus total{" "}
                      <span className="ml-2 font-bold text-brand-gold">
                        {row.amount}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-brand-gold">
                      Expandir <ChevronDown className="size-4 text-[#5878ae]" />
                    </span>
                  </div>
                </div>
                {expandedLevel === row.level ? (
                  <div className="bg-[#252d39] px-3 py-2 text-[12px] text-[#9ab7e4]">
                    Dummy VIP details: daily bonus, upgrade bonus and weekly gifts.
                  </div>
                ) : null}
              </button>
            ))}
          </div>
        )}
        <div className="h-5" />
      </div>
    </section>
  );
}

function RebatePanel() {
  const [category, setCategory] = useState("Slots");
  const [refreshed, setRefreshed] = useState(false);

  return (
    <section className="px-4 py-3">
      <div className="rounded-[8px] bg-[#fff2c5] p-3 text-[#333]">
        <p className="flex items-center gap-1 text-[15px]">
          <Coins className="size-5 text-[#ffaa09]" />
          Rebate estimado para hoje{" "}
          <span className="text-[20px] font-bold text-[#ff9f11]">0,00</span>
          <button type="button" onClick={() => setRefreshed(true)}>
            <RefreshCw className={`size-5 text-[#3386ff] ${refreshed ? "rotate-180" : ""}`} />
          </button>
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button className="rounded-[7px] bg-[#bdd7f5] px-3 py-1 text-left">
            <b className="block text-[18px]">0,00</b>
            <span className="text-[13px]">Apostas válidas de hoje</span>
          </button>
          <button className="rounded-[7px] bg-[#bdf2c2] px-3 py-1 text-left">
            <b className="block text-[18px]">0,00</b>
            <span className="text-[13px]">Resgatado hoje</span>
          </button>
        </div>
        <p className="mt-3 text-[13px] leading-4">
          Dados atualizados a cada 10 minutos. Se não sincronizar, clique acima
          para atualizar manualmente ou volte depois.
        </p>
      </div>
      <div className="mt-3 grid grid-cols-[96px_1fr] gap-3">
        <div className="space-y-3">
          {["Slots", "Pescaria", "Minijogos", "Cartas", "Ao Vivo", "Esporte"].map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`flex h-[44px] w-full items-center justify-center rounded-[7px] text-[13px] font-medium ${
                  category === item
                    ? "bg-brand-gold text-[#1d222c]"
                    : "bg-[#1f2530] text-[#9ab7e4]"
                }`}
              >
                {item}
              </button>
            ),
          )}
        </div>
        <div className="space-y-3">
          {rebateRows.map((row) => (
            <button
              key={row.label}
              type="button"
              className="flex min-h-[66px] w-full items-center justify-between rounded-[7px] bg-[#1f2530] px-3 text-left"
            >
              <span>
                <span className="mr-2 inline-grid h-5 min-w-8 place-items-center rounded bg-[#29384e] px-1 text-[11px] font-black text-brand-gold">
                  {row.logo}
                </span>
                <span className="text-[13px] text-[#5878ae]">
                  Apostas Válidas <span className="text-white">0,00</span>
                </span>
                <span className="mt-2 block text-[13px] text-[#5878ae]">
                  Taxa de Rebate <span className="text-white">0,10%</span>
                </span>
              </span>
              <span className="text-right text-[13px] text-[#5878ae]">
                Coletável <span className="text-brand-gold">0,00</span>
                <ChevronRight className="ml-auto mt-1 size-5" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function InterestPanel() {
  const [subTab, setSubTab] = useState("rules");
  const [status, setStatus] = useState("idle");

  return (
    <section>
      <div className="bg-[#1f2530] px-4 py-4">
        <div className="grid grid-cols-[1fr_96px] gap-3">
          <div className="space-y-4 text-[14px] text-[#5878ae]">
            <p>
              Depositado <span className="text-[20px] text-white">0,00</span>
              <span className="ml-2 rounded-[5px] bg-[#17c52c] px-2 py-1 text-[11px] font-bold text-white">
                Taxa de Juros Anual 100%
              </span>
            </p>
            <p>
              Período de liquidação{" "}
              <span className="text-white">1 Hora</span> (Máximo{" "}
              <span className="text-white">Ilimitado</span>)
            </p>
            <p>
              Recompensas{" "}
              <span className="text-[20px] font-bold text-brand-gold">
                0,000000
              </span>{" "}
              <span className="text-white">(Resgatado 0,00)</span>
              <RefreshCw className="ml-2 inline size-5 text-brand-gold" />
            </p>
          </div>
          <div className="space-y-3">
            <button onClick={() => setStatus("deposit")} className="h-9 w-full rounded-[7px] bg-[#ff9f11] text-[13px] font-bold">
              Depósito
            </button>
            <button onClick={() => setStatus("transfer")} className="h-9 w-full rounded-[7px] bg-[#5576ad] text-[13px]">
              Transferir
            </button>
            <button onClick={() => setStatus("receive")} className="h-9 w-full rounded-[7px] bg-[#5576ad] text-[13px]">
              Receber
            </button>
          </div>
        </div>
        {status !== "idle" ? (
          <p className="mt-2 text-[12px] text-brand-gold">Dummy action selected: {status}.</p>
        ) : null}
        <SubTabs
          tabs={[
            ["rules", "Regras de juros"],
            ["records", "Detalhes do registro"],
          ]}
          value={subTab}
          onChange={setSubTab}
        />
      </div>
      <div className="mx-4 mt-3 max-h-[430px] overflow-y-auto rounded-[7px] bg-[#1f2530] p-4 text-[15px] leading-7 text-[#5878ae]">
        {subTab === "rules" ? (
          <p>
            1. Introdução de ganhos: O valor depositado no Tesouro de Juros deve
            cumprir pelo menos um ciclo completo para gerar juros. Se for
            retirado antecipadamente, os ganhos desse ciclo não serão
            calculados. 2. Ciclo de liquidação: o ciclo atual é 1 hora. 3. Taxa
            de juros anual atual é 100%. 4. Fórmula de cálculo: valor depositado
            multiplicado pela taxa anual e ciclo de liquidação.
          </p>
        ) : (
          <p>No dummy interest records yet. Deposit and transfer actions will appear here.</p>
        )}
      </div>
    </section>
  );
}

function BalanceMini() {
  return (
    <span className="inline-flex h-7 items-center rounded-full border border-[#344868] bg-[#1a202a] px-1.5 text-sm font-medium text-brand-gold">
      <span className="mr-1 grid size-5 place-items-center rounded-full bg-[#2cab44] text-[12px] shadow-[inset_0_0_0_2px_#f0d04f]">
        BR
      </span>
      0,00
      <RefreshCw className="ml-1 size-4 fill-brand-gold text-[#1d222c]" />
    </span>
  );
}

function SubTabs({
  tabs,
  value,
  onChange,
}: {
  tabs: Array<[string, string]>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-4 flex">
      {tabs.map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`relative h-11 flex-1 text-[15px] font-medium ${
            value === key ? "text-brand-gold" : "text-white"
          }`}
        >
          {label}
          {value === key ? (
            <span className="absolute bottom-0 left-1/2 h-[2px] w-[70%] -translate-x-1/2 rounded-full bg-brand-gold" />
          ) : null}
        </button>
      ))}
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <label className={`relative block h-[34px] shrink-0 ${className}`}>
      <span className="sr-only">{value}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-full w-full appearance-none rounded-full border border-[#3a5882] bg-[#222a36] py-0 pl-4 pr-8 text-[13px] font-medium text-[#5878ae] outline-none focus:border-brand-gold"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#5878ae]" />
    </label>
  );
}

function EmptyBox({
  className = "",
  message,
  reload = false,
  onMore,
}: {
  className?: string;
  message: string;
  reload?: boolean;
  onMore?: () => void;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative h-[118px] w-[150px] opacity-35">
        <div className="absolute bottom-0 left-1/2 h-[70px] w-[112px] -translate-x-1/2 rounded-b-[7px] rounded-t-[3px] bg-gradient-to-b from-[#586274] to-[#4c5667]" />
        <Boxes className="absolute bottom-8 left-1/2 size-11 -translate-x-1/2 text-[#323b4b]" />
        <Send className="absolute right-7 top-0 size-14 -rotate-12 fill-[#586274] text-[#586274]" />
      </div>
      <p className="mt-5 text-center text-[15px] font-medium text-[#5878ae]">
        {message}{" "}
        {reload ? (
          <RefreshCw className="inline size-5 text-brand-gold" />
        ) : (
          <button type="button" onClick={onMore} className="text-brand-gold">
            Ver mais
          </button>
        )}
      </p>
    </div>
  );
}

function RulesText({ text, className = "p-4 text-[14px] leading-7 text-[#9ab7e4]" }: { text: string; className?: string }) {
  return <p className={className}>{text}</p>;
}

function tabHref(value: string) {
  return `/offer/${value}`;
}
