"use client";

import { ChevronLeft, Clock3, Headphones } from "lucide-react";
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
        "fixed inset-y-0 left-[var(--app-shell-left)] z-[70] flex w-[var(--app-max-width)] items-end bg-black/55 backdrop-blur-[5px] transition-[opacity,backdrop-filter] duration-300 ease-out",
        open ? "opacity-100" : "pointer-events-none opacity-0 backdrop-blur-0",
      )}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="a66-deposit-title"
        className={cn(
          "relative z-[71] max-h-[calc(100dvh-env(safe-area-inset-top)-38px)] min-h-[calc(100dvh-116px)] w-full overflow-y-auto rounded-t-[10px] bg-[#1d222c] px-3 pb-[calc(env(safe-area-inset-bottom)+18px)] pt-4 text-white shadow-[0_-16px_36px_rgba(0,0,0,.42)] transition-transform duration-300 ease-out will-change-transform",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="relative flex h-10 items-center justify-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute left-0 grid size-9 place-items-center rounded-full text-[#8facd9] outline-none ring-brand-gold/40 focus-visible:ring-2"
            aria-label="Fechar depósito"
          >
            <ChevronLeft className="size-6" strokeWidth={1.8} />
          </button>
          <h2 id="a66-deposit-title" className="text-[21px] font-medium">
            Depósito
          </h2>
          <div className="absolute right-0 flex items-center gap-3 text-brand-gold">
            <button type="button" className="grid size-8 place-items-center rounded-full outline-none ring-brand-gold/40 focus-visible:ring-2" aria-label="Suporte">
              <Headphones className="size-5" />
            </button>
            <button type="button" className="grid size-8 place-items-center rounded-full outline-none ring-brand-gold/40 focus-visible:ring-2" aria-label="Histórico">
              <Clock3 className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <h3 className="text-base font-bold">Método de Pagamento</h3>
          <BalancePill balance={balance} />
        </div>

        <button
          type="button"
          className="mt-8 flex h-[50px] w-[212px] items-center justify-center gap-7 rounded-[7px] border border-brand-gold bg-[#202632] text-base font-medium text-brand-gold"
        >
          <span className="grid size-8 place-items-center rounded-[4px] bg-[#ffb22c] text-white shadow-[inset_0_-2px_0_rgba(0,0,0,.16)]">
            ▤
          </span>
          PIX
        </button>

        <div className="mt-4 border-t border-[#344868] pt-4">
          <div className="grid grid-cols-3 gap-2.5">
            {channels.map((channel) => (
              <button
                key={channel.id}
                type="button"
                onClick={() => setChannelId(channel.id)}
                className={cn(
                  "min-h-[54px] min-w-0 overflow-hidden whitespace-pre-line break-words rounded-[7px] border px-1.5 text-center text-[13px] font-medium leading-[16px] outline-none ring-brand-gold/40 focus-visible:ring-2",
                  channelId === channel.id
                    ? "border-brand-gold text-brand-gold"
                    : "border-[#344868] text-white",
                )}
              >
                {channel.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 border-t border-[#344868] pt-4">
          <h3 className="text-base font-bold">Depósito</h3>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {presets.map((preset) => {
              const active = numericAmount === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setAmount(String(preset.value))}
                  className={cn(
                    "overflow-hidden rounded-[6px] bg-[#2c3548] text-center outline-none ring-brand-gold/40 focus-visible:ring-2",
                    active && "ring-2 ring-brand-gold",
                  )}
                >
                  <span className="block h-8 pt-1 text-base font-black text-white">
                    {formatDepositAmount(preset.value)}
                  </span>
                  <span className="block h-6 bg-[#4a3c2b] text-sm font-black text-[#ffaa09]">
                    {preset.bonus}
                  </span>
                </button>
              );
            })}
          </div>

          <label className="mt-4 flex h-[52px] min-w-0 items-center rounded-[7px] border border-[#ea4e3d] bg-[#2b2630] px-3 text-base focus-within:border-brand-gold">
            <span className="mr-3 shrink-0 text-white">R$</span>
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              inputMode="decimal"
              placeholder="Mínimo5~Máximo49.999"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#496592] min-[390px]:text-base"
            />
          </label>
        </div>

        <p className="mt-4 text-base leading-5 text-white">
          Lembrete:Digitalize o código QR ou copie o código PIX para pagar!
        </p>

        <label className="mt-4 flex items-center gap-2 text-base text-white">
          <input
            type="checkbox"
            checked={skipBonus}
            onChange={(event) => setSkipBonus(event.target.checked)}
            className="size-5 rounded border border-[#496592] bg-transparent accent-brand-gold"
          />
          <span>Não desejo o bônus de depósito</span>
        </label>

        <button
          type="button"
          onClick={() => onSubmit?.({ channelId, amount: numericAmount, skipBonus })}
          className={cn(
            "mt-6 h-12 w-full rounded-[8px] text-base font-medium text-[#1d222c] outline-none ring-brand-gold/40 focus-visible:ring-2",
            numericAmount
              ? "bg-brand-gold active:brightness-95"
              : "bg-[#5e80b7]",
          )}
        >
          Deposite agora
        </button>
      </section>
    </div>
  );
}

function formatDepositAmount(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 0,
  }).format(value);
}
