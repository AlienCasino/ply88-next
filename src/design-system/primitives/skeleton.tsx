import { cn } from "@/shared/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md bg-accent/40 backdrop-blur-[2px]",
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
