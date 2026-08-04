"use client";

import Link from "next/link";
import {
  Boxes,
  Check,
  ChevronLeft,
  RefreshCw,
  Send,
} from "lucide-react";
import { useState } from "react";
import { routes } from "@/core/constants/routes";

export type ClaimTabKey = "request" | "receive" | "rules";

const tabs: Array<{ key: ClaimTabKey; label: string; href: string }> = [
  { key: "request", label: "Claim Request", href: routes.claim },
  { key: "receive", label: "Receive Request", href: `${routes.claim}?active=1` },
  {
    key: "rules",
    label: "Guarantee & Claim Rules",
    href: `${routes.claim}?active=2`,
  },
];

const ruleBlocks = [
  {
    title: "1. Guarantee Rules",
    items: [
      {
        lead: "(1) Guarantee:",
        text:
          "This site supports a basic third-party guarantee service. The page URL is the only proof used to request compensation. Before using the service, confirm the URL carefully so future claims can be verified. URL verification can only be completed on the official guarantee site: no.com.",
      },
      {
        lead: "(2) Do not request compensation arbitrarily:",
        text:
          "Compensation is the final option. If a dispute appears, contact support first and try to resolve the issue through normal customer service channels. If the problem cannot be solved, you may submit a claim.",
      },
      {
        lead: "(3) Penalty for malicious requests:",
        text:
          "If a claim is submitted without a valid reason, does not meet the conditions, or is cancelled after submission, it may be marked as malicious. On the first occurrence, claim access can be suspended for 7 days. On repeated occurrences, claim access can be permanently suspended.",
      },
    ],
  },
  {
    title: "2. Compensation Types",
    items: [
      {
        lead: "(1) Violation report with principal refund:",
        text:
          "If your account has balance and you have completed the required betting targets, you may request compensation when deposits exceed withdrawals. Records, account status, and platform evidence will be reviewed before a decision is made.",
      },
      {
        lead: "(2) Balance recovery review:",
        text:
          "When balance is lost because of a platform-side issue, submit the claim with screenshots, timestamps, and the related game or order ID. The review team will compare the information with the system record.",
      },
      {
        lead: "(3) Service delay review:",
        text:
          "If a confirmed request is delayed beyond the normal service window, you can submit a review request. Duplicate requests for the same case may slow the process.",
      },
    ],
  },
  {
    title: "3. Review Notes",
    items: [
      {
        lead: "(1) Accurate information:",
        text:
          "The claimant must provide accurate account information, the affected amount, and a clear description of the issue. Missing information can cause the request to be returned.",
      },
      {
        lead: "(2) Processing time:",
        text:
          "Generic dummy requests are usually reviewed within 24 hours in this interface. Real processing time depends on verification complexity and platform response.",
      },
    ],
  },
];

export function ClaimScreen({ activeTab }: { activeTab: ClaimTabKey }) {
  const [accepted, setAccepted] = useState(false);

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
          <h1 className="text-[21px] font-medium tracking-0 text-white">
            Guarantee & Claims
          </h1>
        </div>
        <nav className="flex h-[47px] items-end overflow-x-auto border-t border-[#27384f] bg-[#1f2530] px-0 scrollbar-none">
          {tabs.map((tab) => {
            const active = tab.key === activeTab;

            return (
              <Link
                key={tab.key}
                href={tab.href}
                className={`relative grid h-full shrink-0 place-items-center px-5 text-[15px] font-medium ${
                  active ? "text-brand-gold" : "text-white"
                }`}
              >
                {tab.label}
                {active ? (
                  <span className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full bg-brand-gold" />
                ) : null}
              </Link>
            );
          })}
        </nav>
      </header>

      {activeTab === "receive" ? (
        <section className="grid min-h-0 flex-1 place-items-center bg-[#2b3444] px-4 pb-24">
          <EmptyState />
        </section>
      ) : (
        <section className="relative min-h-0 flex-1 overflow-y-auto bg-[#2b3444]">
          <div className="px-4 pb-28 pt-5">
            <RulesContent compact={activeTab === "request"} />
          </div>
          {activeTab === "request" ? (
            <div className="sticky bottom-0 border-t border-[#33445e] bg-[#1f2530] px-4 pb-5 pt-4 shadow-[0_-10px_22px_rgba(0,0,0,.18)]">
              <label className="flex items-start gap-3 text-[15px] leading-5 text-white">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                  className="peer sr-only"
                />
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[3px] border border-[#47658e] bg-[#202938] text-transparent peer-checked:border-brand-gold peer-checked:bg-brand-gold peer-checked:text-[#1d222c]">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span>
                  I have read and agree to the{" "}
                  <button type="button" className="text-brand-gold">
                    Receipt Terms
                  </button>
                  , and there are no malicious requests.
                </span>
              </label>
              <button
                type="button"
                disabled={!accepted}
                className={`mt-4 h-12 w-full rounded-[8px] text-[15px] font-medium transition ${
                  accepted
                    ? "bg-brand-gold text-[#1d222c]"
                    : "bg-[#5878ae] text-[#1d2531]"
                }`}
              >
                {accepted
                  ? "Submit Claim Request"
                  : "Read the rules carefully before requesting (54s)"}
              </button>
            </div>
          ) : null}
        </section>
      )}
    </main>
  );
}

function RulesContent({ compact }: { compact: boolean }) {
  return (
    <article className={`mx-auto max-w-[390px] ${compact ? "" : "pb-6"}`}>
      <h2 className="text-center text-[18px] font-bold text-white">
        Basic Guarantee Service Rules
      </h2>
      <div className="mt-2 space-y-7 text-[14px] font-medium leading-[1.78] text-[#9ab7e4]">
        {ruleBlocks.map((block) => (
          <section key={block.title}>
            <h3 className="mb-1 text-[15px] font-bold text-white">
              {block.title}
            </h3>
            <div className="space-y-2">
              {block.items.map((item) => (
                <p key={item.lead}>
                  <strong className="font-bold text-white">{item.lead}</strong>{" "}
                  {highlightRuleText(item.text)}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

function highlightRuleText(text: string) {
  const parts = text.split(/(page URL is the only proof|no\.com|7 days|24 hours)/g);

  return parts.map((part) => {
    if (part === "no.com" || part === "7 days" || part === "24 hours") {
      return (
        <span key={part} className="font-bold text-brand-gold">
          {part}
        </span>
      );
    }

    if (part === "page URL is the only proof") {
      return (
        <span key={part} className="font-bold text-white">
          {part}
        </span>
      );
    }

    return part;
  });
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[118px] w-[150px] opacity-35">
        <div className="absolute bottom-0 left-1/2 h-[70px] w-[112px] -translate-x-1/2 rounded-b-[7px] rounded-t-[3px] bg-gradient-to-b from-[#586274] to-[#4c5667]" />
        <Boxes className="absolute bottom-8 left-1/2 size-11 -translate-x-1/2 text-[#323b4b]" />
        <Send className="absolute right-7 top-0 size-14 -rotate-12 fill-[#586274] text-[#586274]" />
      </div>
      <p className="mt-5 text-center text-[15px] font-medium text-[#5878ae]">
        No content yet <RefreshCw className="inline size-5 text-brand-gold" />
      </p>
    </div>
  );
}
