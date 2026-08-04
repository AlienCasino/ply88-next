"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AtSign,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Edit3,
  KeyRound,
  Mail,
  ShieldCheck,
  Smartphone,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { routes } from "@/core/constants/routes";

const securityGroups = [
  [
    {
      label: "Username",
      value: "v88jumbx",
      icon: UserRound,
      tone: "text-[#5878ae]",
      copy: true,
    },
    {
      label: "Phone Number",
      value: "Not added",
      icon: Smartphone,
      tone: "text-brand-gold",
      alert: true,
    },
    {
      label: "Email",
      value: "Added (Not verified)",
      icon: Mail,
      tone: "text-[#5878ae]",
    },
    {
      label: "Google Authenticator",
      value: "Link",
      icon: AtSign,
      tone: "text-white",
      alert: true,
    },
  ],
  [
    {
      label: "Login Password",
      value: "",
      icon: KeyRound,
      tone: "text-[#13c71b]",
    },
    {
      label: "Withdrawal Password",
      value: "Not configured",
      icon: KeyRound,
      tone: "text-[#ff5347]",
      alert: true,
    },
    {
      label: "Security Question",
      value: "Not configured",
      icon: ShieldCheck,
      tone: "text-[#13c71b]",
      alert: true,
    },
  ],
  [
    {
      label: "Third-party Account Link",
      value: "Not configured",
      icon: UsersRound,
      tone: "text-brand-gold",
    },
  ],
];

export function DataSettingsScreen() {
  const [displayName, setDisplayName] = useState("v88jumbx");
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [telegram, setTelegram] = useState("");
  const [birthDate, setBirthDate] = useState("");

  return (
    <SettingsFrame title="Data">
      <section className="px-4 pt-4">
        <div className="flex items-center gap-4">
          <div className="relative size-[66px] shrink-0 rounded-full bg-[#7d4bec] p-[2px]">
            <Image
              src="/a66/bottom-mascot-right.png"
              alt=""
              width={66}
              height={66}
              className="size-full rounded-full bg-[#27303d] object-cover"
            />
            <span className="absolute -right-1 -top-1 grid size-7 place-items-center rounded-full bg-brand-gold text-[#1d222c]">
              <Edit3 className="size-4" />
            </span>
            <span className="absolute -bottom-1 right-0 rounded-[4px] bg-[#12bf7b] px-1.5 text-[10px] font-bold italic leading-4 text-brand-gold">
              VIP 0
            </span>
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-2 text-[15px] text-[#5878ae]">
              <span>ID: 826261745</span>
              <Copy className="size-5 text-brand-gold" />
            </div>
            <div className="flex items-center gap-2 text-[15px] text-[#5878ae]">
              <span>Nickname: Enter a nickname</span>
              <Edit3 className="size-4 text-brand-gold" />
            </div>
          </div>
        </div>

        <h2 className="mt-5 text-[16px] font-medium text-white">
          Default display information
        </h2>

        <div className="mt-3 space-y-3">
          <FieldFrame icon={<UserRound className="size-8 fill-[#5878ae] text-[#5878ae]" />}>
            <select
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="h-full min-w-0 flex-1 appearance-none bg-transparent text-[15px] font-medium text-white outline-none"
            >
              <option value="v88jumbx">v88jumbx</option>
              <option value="A66 Player">A66 Player</option>
              <option value="Lucky Member">Lucky Member</option>
            </select>
            <ChevronDown className="size-5 shrink-0 text-[#5878ae]" />
          </FieldFrame>

          <label>
            <span className="mb-1 block text-[16px] font-medium text-white">
              Link Phone Number
            </span>
            <FieldFrame icon={<Smartphone className="size-8 text-[#5878ae]" />}>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Link your phone"
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] font-medium text-white outline-none placeholder:text-[#5878ae]"
              />
              <button type="button" className="shrink-0 text-[15px] font-medium text-brand-gold">
                Link
              </button>
            </FieldFrame>
          </label>

          <FieldFrame icon={<span className="grid size-8 place-items-center rounded-full bg-[#24d366] text-[18px] font-black text-white">W</span>}>
            <input
              value={whatsApp}
              onChange={(event) => setWhatsApp(event.target.value)}
              placeholder="Enter your WhatsApp ID"
              className="h-full min-w-0 flex-1 bg-transparent text-[15px] font-medium text-white outline-none placeholder:text-[#5878ae]"
            />
          </FieldFrame>

          <FieldFrame icon={<span className="grid size-8 place-items-center rounded-full bg-[#20a7e7] text-[17px] font-black text-white">T</span>}>
            <input
              value={telegram}
              onChange={(event) => setTelegram(event.target.value)}
              placeholder="Enter your Telegram account"
              className="h-full min-w-0 flex-1 bg-transparent text-[15px] font-medium text-white outline-none placeholder:text-[#5878ae]"
            />
          </FieldFrame>

          <label>
            <span className="mb-1 block text-[16px] font-medium text-white">
              Date of Birth{" "}
              <span className="text-[#5878ae]">
                (cannot be changed after setting)
              </span>
            </span>
            <FieldFrame>
              <select
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
                className="h-full min-w-0 flex-1 appearance-none bg-transparent text-[15px] font-medium text-[#5878ae] outline-none"
              >
                <option value="">Day Month Year</option>
                <option value="1996-08-04">04 Aug 1996</option>
                <option value="2000-01-16">16 Jan 2000</option>
                <option value="2004-05-22">22 May 2004</option>
              </select>
              <ChevronDown className="size-5 shrink-0 text-[#5878ae]" />
            </FieldFrame>
          </label>

          <p className="text-[15px] font-medium leading-5 text-[#ffaa09]">
            The system requires you to be over 18 years old, meaning born before
            04/08/2008.
          </p>
        </div>
      </section>

      <div className="mt-auto grid grid-cols-2 gap-3 border-t border-[#33445e] bg-[#1f2530] px-4 py-4">
        <Link
          href={routes.profile}
          className="grid h-11 place-items-center rounded-[8px] border border-brand-gold text-[16px] font-medium text-brand-gold"
        >
          Back
        </Link>
        <button
          type="button"
          className="h-11 rounded-[8px] bg-brand-gold text-[16px] font-medium text-[#1d222c]"
        >
          Save
        </button>
      </div>
    </SettingsFrame>
  );
}

export function SecuritySettingsScreen() {
  return (
    <SettingsFrame title="Security">
      <section className="space-y-3 px-4 pt-4">
        {securityGroups.map((group, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[8px] bg-[#1f2530] px-4"
          >
            {group.map((row, rowIndex) => (
              <button
                type="button"
                key={row.label}
                className={`flex min-h-[50px] w-full items-center gap-3 text-left ${
                  rowIndex > 0 ? "border-t border-[#33445e]" : ""
                }`}
              >
                <row.icon
                  className={`size-6 shrink-0 ${row.tone}`}
                  strokeWidth={2.1}
                />
                <span className="relative min-w-0 flex-1 text-[15px] font-medium leading-tight text-white">
                  {row.label}
                  {row.alert ? (
                    <span className="absolute -right-2 top-0 size-2 rounded-full bg-[#ff5347]" />
                  ) : null}
                </span>
                {row.value ? (
                  <span className="min-w-0 max-w-[188px] truncate text-right text-[15px] font-medium text-[#5878ae]">
                    {row.value.includes("(") ? (
                      <>
                        {row.value.split("(")[0]}
                        <span className="text-brand-gold">
                          ({row.value.split("(")[1]}
                        </span>
                      </>
                    ) : (
                      row.value
                    )}
                  </span>
                ) : null}
                {row.copy ? (
                  <Copy className="size-5 shrink-0 text-brand-gold" />
                ) : (
                  <ChevronRight className="size-5 shrink-0 text-[#5878ae]" />
                )}
              </button>
            ))}
          </div>
        ))}
      </section>
    </SettingsFrame>
  );
}

function SettingsFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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
          <h1 className="text-[21px] font-medium text-white">{title}</h1>
        </div>
      </header>
      {children}
    </main>
  );
}

function FieldFrame({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[48px] items-center gap-3 rounded-[8px] border border-[#47658e] bg-[#1f2530] px-4">
      {icon ? <span className="shrink-0">{icon}</span> : null}
      {children}
    </div>
  );
}
