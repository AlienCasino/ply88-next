"use client";

import Link from "next/link";
import {
  Boxes,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Megaphone,
  MessageCircle,
  Plus,
  RefreshCw,
  Search,
  Send,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { routes } from "@/core/constants/routes";

export type ProfileFaqTabKey =
  | "support"
  | "news"
  | "notifications"
  | "rolling"
  | "suggestion";

const tabs: Array<{ key: ProfileFaqTabKey; label: string; href: string }> = [
  { key: "support", label: "Support", href: routes.profileFaq },
  { key: "news", label: "News", href: `${routes.profileFaq}?tab=news` },
  {
    key: "notifications",
    label: "Notifications",
    href: `${routes.profileFaq}?tab=notifications`,
  },
  {
    key: "rolling",
    label: "Rolling Panel",
    href: `${routes.profileFaq}?tab=rolling`,
  },
  {
    key: "suggestion",
    label: "Suggestion Bonus",
    href: `${routes.profileFaq}?tab=suggestion`,
  },
];

export function ProfileFaqScreen({
  activeTab,
}: {
  activeTab: ProfileFaqTabKey;
}) {
  const activeTabRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    activeTabRef.current?.scrollIntoView({
      behavior: "instant",
      block: "nearest",
      inline: "center",
    });
  }, [activeTab]);

  return (
    <main className="flex min-h-dvh flex-col bg-[#2b3444] text-white">
      <header className="shrink-0 border-b border-[#33445e] bg-[#1f2530]">
        <div className="relative flex h-[58px] items-center justify-center px-4">
          <Link
            href={routes.profile}
            aria-label="Back to profile"
            className="absolute left-3 grid size-9 place-items-center text-[#9ab7e4]"
          >
            <ChevronLeft className="size-6" />
          </Link>
          <h1 className="text-[21px] font-medium text-white">
            Message Center
          </h1>
        </div>
        <nav className="flex h-[47px] items-end overflow-x-auto border-t border-[#27384f] bg-[#1f2530] px-3 scrollbar-none">
          {tabs.map((tab) => {
            const active = tab.key === activeTab;

            return (
              <Link
                ref={active ? activeTabRef : undefined}
                key={tab.key}
                href={tab.href}
                className={`relative grid h-full shrink-0 place-items-center px-4 text-[15px] font-medium ${
                  active ? "text-brand-gold" : "text-white"
                }`}
              >
                {tab.label}
                {active ? (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-brand-gold" />
                ) : null}
              </Link>
            );
          })}
        </nav>
      </header>

      <section className="min-h-0 flex-1 overflow-y-auto bg-[#2b3444] px-4 pb-8 pt-3">
        {activeTab === "support" ? <SupportPanel /> : null}
        {activeTab === "news" ? <SearchableEmptyPanel /> : null}
        {activeTab === "notifications" ? <NotificationPanel /> : null}
        {activeTab === "rolling" ? <RollingPanel /> : null}
        {activeTab === "suggestion" ? <SuggestionPanel /> : null}
      </section>
    </main>
  );
}

function SupportPanel() {
  return (
    <div className="overflow-hidden rounded-[8px] bg-[#1f2530]">
      <div className="px-4 py-4">
        <h2 className="text-[18px] font-bold text-white">Online Support 24/7</h2>
        <p className="mt-2 max-w-[330px] text-[15px] font-medium leading-5 text-[#5878ae]">
          Talk with our professional customer support team online to solve your
          questions quickly.
        </p>
        <button
          type="button"
          className="mt-3 flex h-[42px] items-center gap-2 rounded-[7px] border border-brand-gold px-3 text-left text-[14px] font-bold leading-4 text-brand-gold"
        >
          <span className="grid size-8 place-items-center rounded-full bg-white text-[13px] text-[#1d222c]">
            CS
          </span>
          Customer service
        </button>
      </div>

      <div className="border-t border-[#33445e] px-4 pb-1 pt-4">
        <h3 className="flex items-center gap-2 border-b-2 border-brand-gold pb-2 text-[17px] font-medium text-brand-gold">
          <MessageCircle className="size-5 fill-[#2aa7ee] text-[#2aa7ee]" />
          Other Support
        </h3>
      </div>

      <SupportRow
        avatarClassName="bg-[#20a7e7]"
        avatar="T"
        name="Telegram"
        channel="A66BET Official Channel"
      />
      <SupportRow
        avatarClassName="bg-[#24d366]"
        avatar="W"
        name="WhatsApp"
        channel="WhatsApp"
      />
    </div>
  );
}

function SupportRow({
  avatar,
  avatarClassName,
  name,
  channel,
}: {
  avatar: string;
  avatarClassName: string;
  name: string;
  channel: string;
}) {
  return (
    <div className="mx-4 grid min-h-[86px] grid-cols-[44px_minmax(0,1fr)_104px] items-center gap-2 border-t border-[#33445e] py-3">
      <span
        className={`grid size-11 place-items-center rounded-full text-[21px] font-black text-white ${avatarClassName}`}
      >
        {avatar}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-[#5878ae]">
          Nickname: <span className="font-bold text-white">{name}</span>
        </p>
        <p className="mt-0.5 flex items-center gap-1 truncate text-[13px] font-medium text-white">
          {channel} <Copy className="size-4 shrink-0 text-brand-gold" />
        </p>
        <p className="mt-0.5 truncate text-[12px] font-medium text-[#5878ae]">
          Online time: 00:00 - 23:59
        </p>
      </div>
      <button
        type="button"
        className="grid h-9 w-full place-items-center rounded-[7px] bg-brand-gold px-1 text-[12px] font-bold leading-none text-[#1d222c] whitespace-nowrap"
      >
        Contact now
      </button>
    </div>
  );
}

function SearchableEmptyPanel() {
  const [scope, setScope] = useState("All");
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");

  return (
    <>
      <FilterBar
        scope={scope}
        status={status}
        query={query}
        onScopeChange={setScope}
        onStatusChange={setStatus}
        onQueryChange={setQuery}
      />
      <EmptyState message="No messages" className="mt-[300px]" />
    </>
  );
}

function NotificationPanel() {
  const [scope, setScope] = useState("All");
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    return "Redeem today's code".toLowerCase().includes(query.toLowerCase());
  }, [query]);

  return (
    <>
      <FilterBar
        scope={scope}
        status={status}
        query={query}
        onScopeChange={setScope}
        onStatusChange={setStatus}
        onQueryChange={setQuery}
      />
      {visible ? (
        <MessageRow
          icon={<MessageCircle className="size-6 fill-[#5878ae] text-[#5878ae]" />}
          title="Redeem today's code"
          date="05/08/2026 11:41:00"
          status="Unread"
        />
      ) : (
        <EmptyState message="No messages" className="mt-[260px]" />
      )}
    </>
  );
}

function RollingPanel() {
  const [scope, setScope] = useState("All");
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <SelectPill value={scope} onChange={setScope} options={["All", "Unread", "Read"]} />
        <SearchPill value={query} onChange={setQuery} />
      </div>
      <MessageRow
        icon={<Megaphone className="size-6 fill-[#5878ae] text-[#5878ae]" />}
        title="Invite and earn R$120, share your link today"
        date="22/04/2026 00:00:00"
      />
    </>
  );
}

function SuggestionPanel() {
  const [mode, setMode] = useState("create");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  if (mode === "mine") {
    return (
      <>
        <div className="mb-4 flex gap-3">
          <button
            type="button"
            onClick={() => setMode("create")}
            className="h-10 rounded-full border border-[#47658e] px-5 text-[15px] font-medium text-[#9ab7e4]"
          >
            Create feedback
          </button>
          <button
            type="button"
            className="h-10 rounded-full bg-brand-gold px-5 text-[15px] font-medium text-[#1d222c]"
          >
            My Feedback
          </button>
        </div>
        <EmptyState message="No feedback yet" className="mt-[260px]" />
      </>
    );
  }

  return (
    <div className="pb-16">
      <div className="mb-4 flex gap-3">
        <button
          type="button"
          className="h-10 rounded-full bg-brand-gold px-5 text-[15px] font-medium text-[#1d222c]"
        >
          Create feedback
        </button>
        <button
          type="button"
          onClick={() => setMode("mine")}
          className="h-10 rounded-full border border-[#47658e] px-5 text-[15px] font-medium text-[#9ab7e4]"
        >
          My Feedback
        </button>
      </div>

      <div className="rounded-[8px] bg-[#1f2530] px-4 py-4">
        <label className="block">
          <span className="text-[15px] font-medium text-white">
            Feedback Type<span className="text-[#ff5347]">*</span>
          </span>
          <div className="relative mt-3">
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="h-12 w-full appearance-none rounded-[7px] border border-[#47658e] bg-[#1f2530] px-4 text-[15px] font-medium text-[#5878ae] outline-none"
            >
              <option value="">Select feedback type</option>
              <option value="product">Product improvement</option>
              <option value="payment">Payment experience</option>
              <option value="game">Game suggestion</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#5878ae]" />
          </div>
        </label>

        <label className="mt-5 block">
          <span className="text-[15px] font-medium text-white">
            Feedback Content{" "}
            <span className="text-[#5878ae]">(suggestions for improvement)</span>
            <span className="text-[#ff5347]">*</span>
          </span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value.slice(0, 1000))}
            placeholder="Your opinions are valuable to us. Any useful suggestion may be reviewed, and adopted ideas can receive a cash reward."
            className="mt-3 h-[142px] w-full resize-none rounded-[7px] border border-[#47658e] bg-[#1f2530] px-4 py-4 text-[15px] font-medium leading-6 text-white outline-none placeholder:text-[#5878ae]"
          />
          <span className="mt-1 block text-right text-[13px] text-[#5878ae]">
            {content.length}/1000
          </span>
        </label>

        <div className="mt-4">
          <p className="text-[15px] font-medium text-white">
            Images do not lie{" "}
            <span className="text-[#5878ae]">(easier to accept)</span>
          </p>
          <button
            type="button"
            className="mt-3 grid size-[86px] place-items-center border border-[#47658e] bg-[#1f2530] text-[#5878ae]"
            aria-label="Add attachment"
          >
            <Plus className="size-10" strokeWidth={1.5} />
          </button>
          <p className="mt-3 text-[14px] font-medium leading-6 text-[#5878ae]">
            Supports photo and video uploads. Image size must not exceed 10 MB,
            and video size must not exceed 20 MB.
          </p>
        </div>

        <div className="mt-6 space-y-2 text-[14px] font-medium leading-6 text-[#5878ae]">
          <h3 className="text-[15px] text-white">Reward rules</h3>
          <p>
            We provide substantial dummy rewards for useful feedback that helps
            improve the product, customer service, or payment experience.
          </p>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 mt-4 bg-[#1f2530] px-4 py-4">
        <button
          type="button"
          className="h-12 w-full rounded-[8px] bg-brand-gold text-[16px] font-medium text-[#1d222c]"
        >
          Submit feedback
        </button>
      </div>
    </div>
  );
}

function FilterBar({
  scope,
  status,
  query,
  onScopeChange,
  onStatusChange,
  onQueryChange,
}: {
  scope: string;
  status: string;
  query: string;
  onScopeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onQueryChange: (value: string) => void;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <SelectPill value={scope} onChange={onScopeChange} options={["All", "System", "Promotion"]} />
      <SelectPill value={status} onChange={onStatusChange} options={["All", "Unread", "Read"]} />
      <SearchPill value={query} onChange={onQueryChange} />
    </div>
  );
}

function SelectPill({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="relative block h-9 shrink-0">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-full w-[92px] appearance-none rounded-full border border-[#47658e] bg-[#1f2530] px-4 pr-8 text-[14px] font-medium text-[#5878ae] outline-none"
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

function SearchPill({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative block h-9 min-w-0 flex-1">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search"
        className="h-full w-full rounded-full border border-[#47658e] bg-[#1f2530] px-4 pr-10 text-[14px] font-medium text-white outline-none placeholder:text-[#5878ae]"
      />
      <Search className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-brand-gold" />
    </label>
  );
}

function MessageRow({
  icon,
  title,
  date,
  status,
}: {
  icon: React.ReactNode;
  title: string;
  date: string;
  status?: string;
}) {
  return (
    <button
      type="button"
      className="flex min-h-[72px] w-full items-center gap-3 rounded-[8px] bg-[#1f2530] px-4 text-left"
    >
      <span className="shrink-0">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-bold text-white">
          {title}
        </span>
        <span className="mt-2 block text-[13px] font-medium text-[#5878ae]">
          {date}
        </span>
      </span>
      {status ? (
        <span className="shrink-0 max-w-[78px] truncate text-[14px] font-medium text-white">
          {status}
        </span>
      ) : null}
      <ChevronRight className="size-5 shrink-0 text-[#5878ae]" />
    </button>
  );
}

function EmptyState({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative h-[118px] w-[150px] opacity-35">
        <div className="absolute bottom-0 left-1/2 h-[70px] w-[112px] -translate-x-1/2 rounded-b-[7px] rounded-t-[3px] bg-gradient-to-b from-[#586274] to-[#4c5667]" />
        <Boxes className="absolute bottom-8 left-1/2 size-11 -translate-x-1/2 text-[#323b4b]" />
        <Send className="absolute right-7 top-0 size-14 -rotate-12 fill-[#586274] text-[#586274]" />
      </div>
      <p className="mt-5 text-center text-[15px] font-medium text-[#5878ae]">
        {message} <RefreshCw className="inline size-5 text-brand-gold" />
      </p>
    </div>
  );
}
