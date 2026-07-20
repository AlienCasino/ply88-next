import Link from "next/link";
import Image from "next/image";
import { routes } from "@/core/constants/routes";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href={routes.home}
      className="inline-flex items-center"
      aria-label="A66BET home"
    >
      <Image
        src="/a66/logo.png"
        alt="A66BET"
        width={330}
        height={100}
        priority
        className={compact ? "h-8 w-auto min-[390px]:h-9" : "h-12 w-auto"}
      />
    </Link>
  );
}
