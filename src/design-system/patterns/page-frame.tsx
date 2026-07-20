import { cn } from "@/shared/lib/cn";

export function PageFrame(props: React.ComponentProps<"main">) {
  return <main {...props} className={cn("mx-auto w-full px-3 py-3", props.className)} />;
}
