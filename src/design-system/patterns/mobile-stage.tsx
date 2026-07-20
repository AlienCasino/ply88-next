import { cn } from "@/shared/lib/utils";

export function MobileStage(props: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "relative mx-auto min-h-dvh w-full max-w-[var(--app-max-width)] overflow-x-hidden bg-app-stage shadow-2xl",
        props.className,
      )}
    />
  );
}
