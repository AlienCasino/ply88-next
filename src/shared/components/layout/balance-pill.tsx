import { RefreshCw } from "lucide-react";

export function BalancePill({ balance }: { balance: string }) {
  return (
    <span className="inline-flex h-7 items-center rounded-full border border-[#344868] bg-[#1a202a] px-1.5 text-sm font-medium text-brand-gold">
      <span className="mr-1 grid size-5 place-items-center rounded-full bg-[#2cab44] text-[12px] shadow-[inset_0_0_0_2px_#f0d04f]">
        🇧🇷
      </span>
      {balance}
      <RefreshCw className="ml-1 size-4 fill-brand-gold text-[#1d222c]" />
    </span>
  );
}
