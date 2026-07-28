import { Loader2 } from "lucide-react";
import { Button } from "@/design-system/primitives/button";
import { cn } from "@/shared/lib/utils";

type LoadMoreButtonProps = {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  loadingLabel?: string;
  className?: string;
};

export function LoadMoreButton({
  onClick,
  loading = false,
  disabled = false,
  label = "Load more",
  loadingLabel = "Loading",
  className,
}: LoadMoreButtonProps) {
  return (
    <div className={cn("mt-5 flex justify-center", className)}>
      <Button
        type="button"
        onClick={onClick}
        disabled={disabled || loading}
        className="h-9 min-w-[132px] cursor-pointer rounded-full border border-brand-gold/70 bg-brand-gold px-5 text-[13px] font-semibold text-[#1d222c] shadow-[inset_0_-2px_0_rgba(0,0,0,.1),0_6px_14px_rgba(0,0,0,.18)] transition hover:bg-brand-gold hover:brightness-105 disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="size-3.5 animate-spin" />
            {loadingLabel}
          </span>
        ) : (
          label
        )}
      </Button>
    </div>
  );
}
