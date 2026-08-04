import Image from "next/image";
import Link from "next/link";
import { routes } from "@/core/constants/routes";
import type { HomeGameCardStyle } from "../types";

export function GameTile({
  name,
  brand,
  href = routes.games,
  imageUrl,
  colors,
  mark,
}: {
  name: string;
  brand: string;
  href?: string;
  imageUrl?: string | null;
  colors: [string, string, string];
  mark: string;
}) {
  const style: HomeGameCardStyle = {
    "--card-a": colors[0],
    "--card-b": colors[1],
    "--card-c": colors[2],
    "--mark": `"${mark}"`,
  };

  return (
    <Link
      href={href}
      className="relative block aspect-[156/205] overflow-hidden rounded-[13px] bg-[#2c3445] shadow-[0_8px_14px_rgba(0,0,0,.2)]"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 520px) 31vw, 148px"
          className="object-cover"
        />
      ) : (
        <div className="a66-game-art absolute inset-0" style={style} />
      )}
      <span className="absolute left-1 top-1 grid size-6 place-items-center rounded-full bg-[#ffaa09] text-sm">
        👍
      </span>
      <span className="absolute right-1 top-1 grid size-6 place-items-center rounded-full bg-white/35 text-brand-gold">
        ★
      </span>
    </Link>
  );
}
