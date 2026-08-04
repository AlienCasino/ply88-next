"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Boxes,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Gift,
  Medal,
  RefreshCw,
  Send,
  Share2,
} from "lucide-react";
import { routes } from "@/core/constants/routes";

export type PromoteTabKey =
  | "index"
  | "promoteShare"
  | "myData"
  | "performance"
  | "proportion"
  | "information";

type PromoteScreenProps = {
  activeTab: PromoteTabKey;
};

const promoteTabs: Array<{ key: PromoteTabKey; label: string; width: string }> = [
  { key: "index", label: "Start", width: "w-[76px]" },
  { key: "promoteShare", label: "Invite Link", width: "w-[122px]" },
  { key: "myData", label: "My Data", width: "w-[108px]" },
  { key: "performance", label: "Performance", width: "w-[122px]" },
  { key: "proportion", label: "Commission", width: "w-[118px]" },
  { key: "information", label: "Information", width: "w-[118px]" },
];

const tickerItems = [
  ["31****566", "3,346.51"],
  ["70****103", "97.36"],
  ["52****441", "281.09"],
  ["88****026", "1,027.55"],
];

const commissionRows = [
  ["100+", "0.3"],
  ["1,000,000+", "0.5"],
  ["3,000,000+", "0.6"],
  ["5,000,000+", "0.7"],
  ["10,000,000+", "1.0"],
  ["30,000,000+", "1.2"],
  ["50,000,000+", "1.5"],
  ["100,000,000+", "3.0"],
];

export function PromoteScreen({ activeTab }: PromoteScreenProps) {
  return (
    <main className="min-h-dvh bg-[#2b3342] text-white">
      <PromoteHeader activeTab={activeTab} />
      {activeTab === "index" ? <StartPanel /> : null}
      {activeTab === "promoteShare" ? <InvitePanel /> : null}
      {activeTab === "proportion" ? <CommissionPanel /> : null}
      {activeTab === "performance" ? <EmptyPanel filter label="No content yet" /> : null}
      {activeTab === "myData" ? <EmptyPanel label="No data found" /> : null}
      {activeTab === "information" ? <EmptyPanel label="No information found" /> : null}
    </main>
  );
}

function PromoteHeader({ activeTab }: { activeTab: PromoteTabKey }) {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    navRef.current
      ?.querySelector<HTMLElement>("[data-active='true']")
      ?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [activeTab]);

  return (
    <header className="sticky top-0 z-30 bg-[#1d232d]">
      <div className="grid h-[56px] grid-cols-[52px_1fr_116px] items-center border-b border-[#344868] px-1">
        <Link
          href={routes.profile}
          aria-label="Back to profile"
          className="grid h-full place-items-center text-[#9ab7e4]"
        >
          <ChevronLeft className="size-6" />
        </Link>
        <h1 className="text-center text-[22px] font-medium">Promotion</h1>
      </div>
      <nav
        ref={navRef}
        className="a66-hidden-scrollbar flex h-[43px] overflow-x-auto border-b border-[#344868]"
      >
        {promoteTabs.map((tab) => {
          const active = activeTab === tab.key;

          return (
            <Link
              key={tab.key}
              href={tabHref(tab.key)}
              data-active={active ? "true" : undefined}
              className={`relative grid h-full shrink-0 place-items-center px-2 text-[14px] font-medium ${
                tab.width
              } ${active ? "text-brand-gold" : "text-white"}`}
            >
              <span className="whitespace-nowrap">{tab.label}</span>
              {active ? (
                <span className="absolute bottom-0 h-[2px] w-[calc(100%-18px)] rounded-full bg-brand-gold" />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

function StartPanel() {
  return (
    <section className="px-3 pb-6">
      <TickerStrip />
      <div className="-mx-3 mb-3">
        <div className="a66-hidden-scrollbar flex snap-x gap-3 overflow-x-auto px-[54px] py-3">
          {["/a66/invite-banner.avif", "/a66/promo-1.png", "/a66/promo-4.png"].map(
            (src, index) => (
              <div
                key={src}
                className="relative aspect-[1020/300] w-[348px] shrink-0 snap-center overflow-hidden rounded-[5px] bg-[#12263a] shadow-[0_4px_10px_rgba(0,0,0,.25)] ring-1 ring-[#2f5278]"
              >
                <Image
                  src={src}
                  alt={`Promotion banner ${index + 1}`}
                  fill
                  sizes="348px"
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
            ),
          )}
        </div>
      </div>
      <AgentCard />
      <InviteCard />
      <CommissionSummary />
    </section>
  );
}

function InvitePanel() {
  return (
    <section className="px-3 pb-8 pt-3">
      <InviteCard />
      <h2 className="mb-8 mt-4 text-[19px] font-medium">Agent Tutorial</h2>
      <TutorialGraphic />
      <article className="mt-9 space-y-4 text-[15px] leading-7 text-[#9ab7e4]">
        <h3 className="font-bold text-brand-gold">1. Activity Content:</h3>
        <p>
          The A66BET agent system is here. Invite friends to register through
          your site, Facebook, TikTok, Telegram, WhatsApp and more. There is no
          limit. Become an agent and enjoy daily commission offers up to{" "}
          <span className="font-bold text-brand-gold">3%</span>.
        </p>
        <p>
          Betting commission rates for{" "}
          <span className="font-bold text-[#ff4c43]">Slot</span> and{" "}
          <span className="font-bold text-[#ff4c43]">Fishing</span>:
        </p>
        <CommissionTable />
      </article>
    </section>
  );
}

function CommissionPanel() {
  const [category, setCategory] = useState("Slots");

  return (
    <section className="grid grid-cols-[96px_1fr] gap-3 px-3 py-3">
      <div className="space-y-3">
        {["Slots", "Fishing", "Mini Games", "Cards", "Live", "Sports"].map(
          (item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`flex h-[64px] w-full flex-col items-center justify-center rounded-[7px] text-[12px] font-medium ${
                category === item
                  ? "bg-brand-gold text-[#1d222c]"
                  : "bg-[#1f2530] text-[#9ab7e4]"
              }`}
            >
              <span className="text-[18px]">777</span>
              {item}
            </button>
          ),
        )}
      </div>
      <div className="min-w-0">
        <div className="grid h-[50px] grid-cols-[74px_1fr_92px] rounded-[5px] border border-[#344868] bg-[#1f2530] text-center text-[14px]">
          <div className="grid place-items-center">Valid</div>
          <div className="grid place-items-center">
            Performance
            <span className="text-[11px] text-[#5878ae]">(Unit: piece)</span>
          </div>
          <div className="grid place-items-center">Commission Rate</div>
        </div>
        {commissionRows.map(([volume, rate], index) => (
          <div
            key={volume}
            className={`mt-2 grid h-[42px] grid-cols-[74px_1fr_92px] items-center rounded-[5px] text-center text-[14px] ${
              index % 2 ? "bg-[#1f2530]" : "bg-transparent"
            }`}
          >
            <span>0</span>
            <span>{volume}</span>
            <span className="text-brand-gold">{rate} %</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TickerStrip() {
  return (
    <div className="-mx-3 overflow-hidden bg-[#263146] py-2">
      <div className="flex w-max animate-[a66-marquee_18s_linear_infinite] gap-4">
        {[...tickerItems, ...tickerItems].map(([id, amount], index) => (
          <span
            key={`${id}-${index}`}
            className="inline-flex h-7 items-center gap-1 rounded-full bg-[#1f2530] px-3 text-[12px] text-[#5878ae]"
          >
            <Medal className="size-4 text-brand-gold" />
            Agent ID: {id} earned today:{" "}
            <span className="font-bold text-brand-gold">{amount}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function AgentCard() {
  return (
    <section className="rounded-[7px] bg-[#1f2530] p-3">
      <div className="grid grid-cols-[92px_1fr] gap-4 border-b border-[#344868] pb-3">
        <div className="text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-[12px] bg-[#f7c38b] text-[#bf542c] shadow-inner">
            <Medal className="size-10" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-[14px]">
          <InfoMetric label="Audited times" value="0.00" />
          <InfoMetric label="Settlement Date" value="04/08/2026" />
        </div>
      </div>
      <p className="mt-2 inline-flex rounded-r-full bg-[#ff5347] px-2 py-0.5 text-[12px] font-medium">
        Commission up to 3%, earn every month!
      </p>
      <div className="mt-1 grid grid-cols-[1fr_1fr_76px] gap-2 text-[14px]">
        <div className="col-span-2">
          <p className="text-white">Commission</p>
          <p className="text-[#5878ae]">(Time until next settlement 0 day(s) 08:41:02)</p>
        </div>
        <ChevronRight className="self-center justify-self-end text-[#5878ae]" />
        <InfoMetric label="Redeemed" value="0.00" />
        <InfoMetric label="Rewards" value="0.00" gold />
        <button className="self-center rounded-[5px] bg-[#5576ad] px-2 py-2 text-[12px]">
          Receive...
        </button>
        <InfoMetric label="Direct results yesterday" value="0.00" />
        <InfoMetric label="Historical total commission" value="0.00" />
      </div>
    </section>
  );
}

function InviteCard() {
  const [copied, setCopied] = useState(false);

  return (
    <section className="mt-3 rounded-[7px] bg-[#1f2530] p-3">
      <div className="flex items-center justify-between border-b border-[#344868] pb-3">
        <h2 className="text-[16px] font-medium">Invite friends</h2>
        <p className="text-[14px] text-[#5878ae]">
          My invitation code{" "}
          <span className="ml-1 text-white">826261745</span>
          <Copy className="ml-1 inline size-4 text-brand-gold" />
        </p>
      </div>
      <div className="mt-3 grid grid-cols-[82px_1fr] gap-4">
        <button className="overflow-hidden rounded-[6px] bg-white text-[#1d222c]">
          <QrPattern />
          <span className="block bg-brand-gold px-1 py-1.5 text-[13px] font-medium leading-tight">
            Save code...
          </span>
        </button>
        <div>
          <div className="flex h-11 items-center rounded-[7px] border border-[#344868] bg-[#202733] px-3 text-[13px] text-[#9ab7e4]">
            <span className="min-w-0 flex-1 truncate">
              https://www.a66bety.vip/?id=82...
            </span>
            <ChevronDown className="size-4" />
            <span className="mx-3 h-6 w-px bg-[#344868]" />
            <button type="button" onClick={() => setCopied(true)}>
              <Copy className="size-5 text-brand-gold" />
            </button>
          </div>
          {copied ? (
            <p className="mt-1 text-[11px] text-brand-gold">Copied dummy link.</p>
          ) : null}
          <div className="mt-3 grid grid-cols-4 gap-3 text-center text-[12px] text-[#9ab7e4]">
            <SocialButton icon={ExternalLink} label="Share" />
            <BrandSocialButton label="facebook" brand="blue" mark="f" />
            <BrandSocialButton label="Instagram" brand="pink" mark="◎" />
            <SocialButton icon={Send} label="Telegram" brand="sky" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CommissionSummary() {
  return (
    <section className="mt-3 rounded-[7px] bg-[#1f2530] p-3">
      <Link
        href={tabHref("proportion")}
        className="flex h-12 items-center justify-between rounded-[8px] bg-[#ffad10] px-3 text-[15px] font-medium text-white"
      >
        <span className="inline-flex items-center gap-2">
          <Gift className="size-5" />
          Commission Rate
        </span>
        <ChevronRight />
      </Link>
      <div className="mt-3 border-b border-[#344868] pb-3">
        <div className="flex items-center justify-between text-[15px]">
          <span className="max-w-[230px] text-[#5878ae]">
            Cumulative rewards for the event
          </span>
          <span className="text-brand-gold">0.00</span>
          <button className="rounded-[5px] bg-[#5576ad] px-3 py-2 text-[12px]">
            Receive...
          </button>
        </div>
      </div>
      <div className="mt-4 rounded-full bg-brand-gold px-4 py-2 text-center text-[14px] text-[#1d222c]">
        Invite friends to open the treasure chest
      </div>
      <div className="mt-4 grid grid-cols-[1fr_1fr_72px_20px] items-center gap-2 text-[13px] text-[#5878ae]">
        <span>Invite valid friends</span>
        <span>
          Rewards <span className="text-brand-gold">0.00</span>
        </span>
        <button className="rounded-[5px] bg-[#5576ad] px-2 py-2 text-[12px] text-white">
          Receive...
        </button>
        <ChevronRight />
      </div>
    </section>
  );
}

function TutorialGraphic() {
  return (
    <div className="rounded-[10px] bg-black p-3 text-white">
      <div className="mx-auto max-w-[330px] rounded-[10px] bg-[#151515] p-3">
        <div className="flex items-center gap-3">
          <div className="grid size-14 place-items-center rounded-full bg-[#d9d4ff] text-[30px]">
            A
          </div>
          <div className="text-[13px] font-bold leading-5">
            <p>
              Total performance <span className="text-[#e8ff00]">500000</span>
            </p>
            <p>
              Commission rate <span className="text-[#e8ff00]">0.5%</span>
            </p>
            <p>
              Total commission{" "}
              <span className="text-[#e8ff00]">500000*0.5%=2500</span>
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[11px]">
          {[
            ["B1", "50000", "250"],
            ["B2", "150000", "750"],
            ["B3", "300000", "1500"],
          ].map(([name, bet, commission]) => (
            <div key={name}>
              <div className="rounded-[5px] bg-[#222] p-1">
                Contributed {bet}*0.5%=
                <span className="text-[#e8ff00]">{commission}</span>
              </div>
              <div className="mx-auto mt-3 grid size-12 place-items-center rounded-full bg-[#1bb6ff]">
                {name}
              </div>
              <div className="mt-1 rounded-[5px] bg-[#181818] p-2">
                Bets <span className="text-[#e8ff00]">{bet}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 rounded-[8px] bg-black p-3 text-[13px] leading-5">
        <span className="font-bold text-[#e8ff00]">Example:</span> You have
        three subordinate members. The commission is calculated from their
        combined valid bets.
      </p>
    </div>
  );
}

function CommissionTable() {
  return (
    <table className="w-full border-collapse text-center text-[14px]">
      <thead className="text-brand-gold">
        <tr>
          <th className="border border-white/70 px-2 py-2">
            Daily valid subordinate bets (R$)
          </th>
          <th className="border border-white/70 px-2 py-2">
            Commission Percentage (%)
          </th>
        </tr>
      </thead>
      <tbody>
        {commissionRows.map(([volume, rate]) => (
          <tr key={volume}>
            <td className="border border-white/70 px-2 py-2">{volume}</td>
            <td className="border border-white/70 px-2 py-2">{rate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function EmptyPanel({ label, filter = false }: { label: string; filter?: boolean }) {
  const [date, setDate] = useState("Today");

  return (
    <section className="min-h-[calc(100dvh-100px)] px-4 py-3">
      {filter ? (
        <label className="relative block h-9 w-[92px]">
          <select
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="h-full w-full appearance-none rounded-full border border-[#3a5882] bg-[#222a36] pl-4 pr-8 text-[13px] text-[#5878ae] outline-none"
          >
            {["Today", "Yesterday", "7 days"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-2.5 size-4 text-[#5878ae]" />
        </label>
      ) : null}
      <div className="mt-[280px] flex flex-col items-center">
        <div className="relative h-[118px] w-[150px] opacity-35">
          <div className="absolute bottom-0 left-1/2 h-[70px] w-[112px] -translate-x-1/2 rounded-b-[7px] rounded-t-[3px] bg-gradient-to-b from-[#586274] to-[#4c5667]" />
          <Boxes className="absolute bottom-8 left-1/2 size-11 -translate-x-1/2 text-[#323b4b]" />
          <Send className="absolute right-7 top-0 size-14 -rotate-12 fill-[#586274] text-[#586274]" />
        </div>
        <p className="mt-5 text-[15px] text-[#5878ae]">
          {label} <RefreshCw className="inline size-5 text-brand-gold" />
        </p>
      </div>
    </section>
  );
}

function InfoMetric({
  label,
  value,
  gold = false,
}: {
  label: string;
  value: string;
  gold?: boolean;
}) {
  return (
    <div>
      <p className="text-[#5878ae]">{label}</p>
      <p className={gold ? "text-brand-gold" : "text-white"}>{value}</p>
    </div>
  );
}

function SocialButton({
  icon: Icon,
  label,
  brand,
}: {
  icon: typeof Share2;
  label: string;
  brand?: "blue" | "pink" | "sky";
}) {
  const color =
    brand === "blue"
      ? "bg-[#0f8cff] text-white"
      : brand === "pink"
        ? "bg-[radial-gradient(circle_at_30%_100%,#ffcf4d,#ff4a76_55%,#7f35ff)] text-white"
        : brand === "sky"
          ? "bg-[#2fb5ef] text-white"
          : "border border-brand-gold text-brand-gold";

  return (
    <button type="button" className="min-w-0">
      <span className={`mx-auto grid size-11 place-items-center rounded-full ${color}`}>
        <Icon className="size-6" />
      </span>
      <span className="mt-1 block truncate">{label}</span>
    </button>
  );
}

function BrandSocialButton({
  label,
  brand,
  mark,
}: {
  label: string;
  brand: "blue" | "pink";
  mark: string;
}) {
  const color =
    brand === "blue"
      ? "bg-[#0f8cff] text-white"
      : "bg-[radial-gradient(circle_at_30%_100%,#ffcf4d,#ff4a76_55%,#7f35ff)] text-white";

  return (
    <button type="button" className="min-w-0">
      <span className={`mx-auto grid size-11 place-items-center rounded-full ${color}`}>
        <span className="text-[30px] font-black leading-none">{mark}</span>
      </span>
      <span className="mt-1 block truncate">{label}</span>
    </button>
  );
}

function QrPattern() {
  return (
    <div className="grid size-[82px] grid-cols-7 grid-rows-7 gap-[3px] bg-white p-2">
      {Array.from({ length: 49 }).map((_, index) => (
        <span
          key={index}
          className={
            index % 2 === 0 || index % 5 === 0 || index === 16
              ? "bg-black"
              : "bg-transparent"
          }
        />
      ))}
    </div>
  );
}

function tabHref(tab: PromoteTabKey) {
  return tab === "index" ? routes.promote : `${routes.promote}?active=${tab}`;
}
