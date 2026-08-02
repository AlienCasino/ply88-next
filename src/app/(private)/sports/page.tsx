import { Activity, ChevronRight, Clock3, Flame, Trophy } from "lucide-react";
import {
  drawerActions,
  drawerCategories,
  drawerOffers,
} from "@/features/public-home/data/home-drawer-content";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import { CasinoPageShell } from "@/shared/components/layout";
import { cn } from "@/shared/lib/utils";

const sportsViewer = {
  balance: "0,00",
};

const matches = [
  {
    id: "brasileirao-flamengo-palmeiras",
    league: "Brasil Serie A",
    time: "Hoje 21:00",
    home: "Flamengo",
    away: "Palmeiras",
    score: "0 - 0",
    live: true,
    trend: "+18 mercados",
    odds: [
      ["Casa", "2.16"],
      ["Empate", "3.10"],
      ["Fora", "2.80"],
    ],
  },
  {
    id: "copa-sao-paulo-santos",
    league: "Copa",
    time: "Amanhã 19:30",
    home: "São Paulo",
    away: "Santos",
    score: "Pré-jogo",
    live: false,
    trend: "+12 mercados",
    odds: [
      ["Casa", "1.92"],
      ["Empate", "3.25"],
      ["Fora", "3.40"],
    ],
  },
  {
    id: "virtual-a66-fortune",
    league: "Futebol Virtual",
    time: "Em 08 min",
    home: "Time A66",
    away: "Fortune FC",
    score: "Simulado",
    live: false,
    trend: "+9 mercados",
    odds: [
      ["Casa", "2.05"],
      ["Empate", "3.00"],
      ["Fora", "2.95"],
    ],
  },
];

export default async function SportsPage() {
  const sidebarContent = await getLeftSidebarSliders();

  return (
    <CasinoPageShell
      viewer={sportsViewer}
      categories={drawerCategories}
      actions={drawerActions}
      offers={drawerOffers}
      sidebarContent={sidebarContent}
    >
      <main className="px-3 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+22px)] pt-3">
        <section className="overflow-hidden rounded-[16px] border border-[#344868] bg-[#202733] shadow-[0_16px_36px_rgba(0,0,0,.24)]">
          <div className="relative min-h-[150px] overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(255,207,84,.28),transparent_26%),radial-gradient(circle_at_90%_8%,rgba(76,127,203,.35),transparent_28%),linear-gradient(145deg,#263146_0%,#1d222c_58%,#151a23_100%)] px-4 py-4">
            <div className="absolute -right-6 bottom-4 grid size-20 place-items-center rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold shadow-[inset_0_0_18px_rgba(255,207,84,.14)]">
              <Trophy className="size-10" strokeWidth={1.8} />
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-brand-gold">
                A66 Sports
              </p>
              <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-[#4a6694] bg-[#111722]/55 px-2.5 text-[11px] font-bold text-[#dfe8f5]">
                <Activity className="size-3.5 text-[#39d98a]" />
                Ao vivo
              </span>
            </div>
            <h1 className="relative z-10 mt-5 max-w-[245px] text-[25px] font-black leading-[1.05] text-white">
              Mercados esportivos em destaque
            </h1>
            <p className="relative z-10 mt-2 max-w-[255px] text-[12px] font-medium leading-relaxed text-[#9fb8df]">
              Jogos demonstrativos prontos para conexão com dados reais.
            </p>
          </div>
        </section>

        <div className="mt-4 flex items-center justify-between px-1">
          <div>
            <h2 className="text-[18px] font-black leading-tight text-white">
              Partidas populares
            </h2>
            <p className="text-[11px] font-medium text-[#8facd9]">
              Escolha um mercado para simular a aposta
            </p>
          </div>
          <span className="inline-flex h-8 items-center gap-1 rounded-full border border-[#344868] bg-[#263146] px-3 text-[12px] font-bold text-brand-gold">
            <Flame className="size-3.5" />
            Topo
          </span>
        </div>

        <section className="mt-3 space-y-3">
          {matches.map((match) => (
            <article
              key={match.id}
              className="overflow-hidden rounded-[12px] border border-[#344868] bg-[#263146] shadow-[0_10px_24px_rgba(0,0,0,.18)]"
            >
              <div className="flex items-center justify-between border-b border-[#344868]/80 px-3 py-2">
                <span className="inline-flex min-w-0 items-center gap-1.5 text-[11px] font-bold text-brand-gold">
                  {match.live ? (
                    <span className="size-1.5 rounded-full bg-[#39d98a] shadow-[0_0_8px_rgba(57,217,138,.8)]" />
                  ) : (
                    <Clock3 className="size-3.5 text-[#8facd9]" />
                  )}
                  <span className="truncate">{match.league}</span>
                </span>
                <span className="shrink-0 text-[11px] font-semibold text-[#8facd9]">
                  {match.time}
                </span>
              </div>
              <div className="px-3 pb-3 pt-3">
                <div className="grid grid-cols-[1fr_70px_1fr] items-center gap-2">
                  <TeamName name={match.home} />
                  <div className="grid h-[54px] place-items-center rounded-[10px] border border-[#40587f] bg-[#1d222c]">
                    <span className="text-[12px] font-black text-white">
                      {match.score}
                    </span>
                    <span className="text-[10px] font-semibold uppercase text-[#6e8ab7]">
                      VS
                    </span>
                  </div>
                  <TeamName name={match.away} alignRight />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {match.odds.map(([label, value]) => (
                    <button
                      key={label}
                      type="button"
                      className="min-w-0 cursor-pointer rounded-[9px] border border-[#344868] bg-[#1b212b] px-2 py-2 text-left transition hover:border-brand-gold/70 hover:bg-[#222a37]"
                    >
                      <span className="block truncate text-[10px] font-bold uppercase text-[#8facd9]">
                        {label}
                      </span>
                      <span className="mt-0.5 block text-center text-[15px] font-black leading-none text-brand-gold">
                        {value}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between rounded-[8px] bg-[#1d222c]/65 px-3 py-2">
                  <span className="text-[11px] font-semibold text-[#8facd9]">
                    {match.trend}
                  </span>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-bold text-brand-gold"
                  >
                    Ver mercados
                    <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </CasinoPageShell>
  );
}

function TeamName({ name, alignRight = false }: { name: string; alignRight?: boolean }) {
  return (
    <div className={cn("min-w-0", alignRight && "text-right")}>
      <div
        className={cn(
          "mb-1 inline-grid size-9 place-items-center rounded-full border border-[#40587f] bg-[#1d222c] text-[13px] font-black text-white",
          alignRight && "ml-auto",
        )}
      >
        {name.slice(0, 2).toUpperCase()}
      </div>
      <p className="truncate text-[13px] font-black leading-tight text-white">
        {name}
      </p>
    </div>
  );
}
