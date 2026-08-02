"use client";

import {
  Check,
  Clock3,
  Headphones,
  WalletCards,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { BalancePill } from "@/shared/components/layout/balance-pill";
import { cn } from "@/shared/lib/utils";

export type DepositSubmitPayload = {
  channelId: string;
  amount: number | null;
  skipBonus: boolean;
};

type DepositChannel = {
  id: string;
  label: string;
};

type DepositPreset = {
  value: number;
  bonus: string;
};

const channels: DepositChannel[] = [
  { id: "pix-g", label: "PIX\nR$5-50000\nG" },
  { id: "pix-unive", label: "PIX\nR$5-50000\nUnive" },
  { id: "pix-u", label: "PIX\nR$5-50000\nU" },
  { id: "pix-s", label: "PIX\nR$5-50000\nS" },
];

const presets: DepositPreset[] = [
  { value: 10, bonus: "+0,50" },
  { value: 30, bonus: "+1,00" },
  { value: 50, bonus: "+1,00" },
  { value: 100, bonus: "+3,00" },
  { value: 500, bonus: "+10,00" },
  { value: 1000, bonus: "+20,00" },
  { value: 5000, bonus: "+30,00" },
  { value: 20000, bonus: "+100,00" },
];

export function DepositDrawer({
  open,
  balance,
  onClose,
  onSubmit,
}: {
  open: boolean;
  balance: string;
  onClose: () => void;
  onSubmit?: (payload: DepositSubmitPayload) => void;
}) {
  const [channelId, setChannelId] = useState(channels[0]?.id ?? "");
  const [amount, setAmount] = useState("");
  const [skipBonus, setSkipBonus] = useState(false);

  const numericAmount = useMemo(() => {
    const normalized = amount.replace(/\./g, "").replace(",", ".");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }, [amount]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-y-0 left-[var(--app-shell-left)] z-[70] flex w-[var(--app-max-width)] items-center justify-center bg-black/55 px-3 py-4 backdrop-blur-[5px] transition-[opacity,backdrop-filter] duration-300 ease-out",
        open ? "opacity-100" : "pointer-events-none opacity-0 backdrop-blur-0",
      )}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="a66-deposit-title"
        className={cn(
          "relative z-[71] max-h-[calc(100dvh-env(safe-area-inset-top)-34px)] w-full overflow-hidden rounded-[18px] border border-[#344868] bg-[#1d222c] text-white shadow-[0_24px_60px_rgba(0,0,0,.48)] transition-[transform,opacity] duration-300 ease-out will-change-transform",
          open ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[.97] opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,207,84,.16),transparent_30%),radial-gradient(circle_at_92%_3%,rgba(143,172,217,.16),transparent_32%),linear-gradient(145deg,#202733_0%,#151b25_78%)]" />
        <div className="relative">
          <div className="flex h-[58px] items-center justify-between border-b border-[#344868]/80 px-3">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-[10px] border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
                <WalletCards className="size-5" />
              </span>
              <h2 id="a66-deposit-title" className="text-[19px] font-black">
                Deposit
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="grid size-8 place-items-center rounded-full text-brand-gold outline-none ring-brand-gold/40 transition hover:bg-brand-gold/10 focus-visible:ring-2"
                aria-label="Suporte"
              >
                <Headphones className="size-5" />
              </button>
              <button
                type="button"
                className="grid size-8 place-items-center rounded-full text-brand-gold outline-none ring-brand-gold/40 transition hover:bg-brand-gold/10 focus-visible:ring-2"
                aria-label="Histórico"
              >
                <Clock3 className="size-5" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="grid size-8 place-items-center rounded-full text-[#8facd9] outline-none ring-brand-gold/40 transition hover:bg-white/5 hover:text-white focus-visible:ring-2"
                aria-label="Fechar depósito"
              >
                <X className="size-5" strokeWidth={1.9} />
              </button>
            </div>
          </div>

          <div className="max-h-[calc(100dvh-env(safe-area-inset-top)-110px)] overflow-y-auto px-3 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-black uppercase tracking-[0.12em] text-brand-gold">
                  Payment Method
                </p>
                <h3 className="mt-1 text-base font-bold">PIX deposit</h3>
              </div>
              <BalancePill balance={balance} />
            </div>

            <button
              type="button"
              className="mt-4 flex h-12 w-full items-center justify-between rounded-[10px] border border-brand-gold/70 bg-[#202733] px-3 text-sm font-black text-brand-gold shadow-[inset_0_1px_0_rgba(255,255,255,.04)]"
            >
              <span className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-[8px] bg-brand-gold text-[#1d222c] shadow-[inset_0_-2px_0_rgba(0,0,0,.12)]">
                  <WalletCards className="size-[18px]" />
                </span>
                PIX
              </span>
              <Check className="size-5" />
            </button>

            <div className="mt-4 border-t border-[#344868] pt-4">
              <p className="mb-2 text-[12px] font-black uppercase tracking-[0.1em] text-[#8facd9]">
                Deposit route
              </p>
              <div className="grid grid-cols-2 gap-2">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => setChannelId(channel.id)}
                    className={cn(
                      "min-h-[48px] min-w-0 overflow-hidden whitespace-pre-line break-words rounded-[9px] border px-2 text-center text-[12px] font-bold leading-[14px] outline-none ring-brand-gold/40 transition focus-visible:ring-2",
                      channelId === channel.id
                        ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                        : "border-[#344868] bg-[#151b25]/70 text-[#dbe7fb]",
                    )}
                  >
                    {channel.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t border-[#344868] pt-4">
              <h3 className="text-base font-bold">Deposit amount</h3>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {presets.map((preset) => {
                  const active = numericAmount === preset.value;
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setAmount(String(preset.value))}
                      className={cn(
                        "overflow-hidden rounded-[8px] border bg-[#263146] text-center outline-none ring-brand-gold/40 transition focus-visible:ring-2",
                        active
                          ? "border-brand-gold shadow-[0_0_0_1px_rgba(255,207,84,.22)]"
                          : "border-[#344868]",
                      )}
                    >
                      <span className="block h-8 pt-1 text-base font-black text-white">
                        {formatDepositAmount(preset.value)}
                      </span>
                      <span className="block h-6 bg-brand-gold/12 text-[12px] font-black text-brand-gold">
                        {preset.bonus}
                      </span>
                    </button>
                  );
                })}
              </div>

              <label className="mt-4 flex h-12 min-w-0 items-center rounded-[9px] border border-[#344868] bg-[#151b25]/80 px-3 text-base focus-within:border-brand-gold">
                <span className="mr-3 shrink-0 font-bold text-white">R$</span>
                <input
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  inputMode="decimal"
                  placeholder="Minimum 5 ~ Maximum 49.999"
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#496592] min-[390px]:text-base"
                />
              </label>
            </div>

            <p className="mt-4 rounded-[9px] border border-[#344868] bg-[#151b25]/65 px-3 py-2 text-[12px] font-semibold leading-5 text-[#9fb8df]">
              After confirming, scan the QR code or copy the PIX code to complete your payment.
            </p>

            <label className="mt-4 flex items-center gap-2 text-sm font-semibold text-white">
              <input
                type="checkbox"
                checked={skipBonus}
                onChange={(event) => setSkipBonus(event.target.checked)}
                className="size-5 rounded border border-[#496592] bg-transparent accent-brand-gold"
              />
              <span>I do not want the deposit bonus</span>
            </label>

            <button
              type="button"
              onClick={() => onSubmit?.({ channelId, amount: numericAmount, skipBonus })}
              className={cn(
                "mt-5 h-12 w-full rounded-[10px] text-base font-black text-[#1d222c] outline-none ring-brand-gold/40 transition focus-visible:ring-2",
                numericAmount
                  ? "bg-brand-gold shadow-[inset_0_-2px_0_rgba(0,0,0,.1)] active:brightness-95"
                  : "bg-[#5f7190] text-[#1d222c]/70",
              )}
            >
              Deposit now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function formatDepositAmount(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 0,
  }).format(value);
}
