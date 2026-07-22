import Link from "next/link";
import { routes } from "@/core/constants/routes";
import type { HomeGame, HomeGameCardStyle } from "../types";

export function GameSection({
  title,
  icon,
  games,
}: {
  title: string;
  icon?: string;
  games: HomeGame[];
}) {
  return (
    <section className="mt-4 px-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[22px] font-medium">
          {icon ? <span className="text-xl">{icon}</span> : null}
          {title}
        </h2>
        <Link href={routes.games} className="text-sm text-[#6e8ab7]">
          Tudo
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {games.map(([name, brand, a, b, c, mark], index) => (
          <GameTile
            key={`${title}-${name}-${brand}-${index}`}
            name={name}
            brand={brand}
            colors={[a, b, c]}
            mark={mark ?? brand}
          />
        ))}
      </div>
    </section>
  );
}

export function GameTile({
  name,
  brand,
  colors,
  mark,
}: {
  name: string;
  brand: string;
  colors: string[];
  mark: string;
}) {
  const style: HomeGameCardStyle = {
    "--card-a": colors[0],
    "--card-b": colors[1],
    "--card-c": colors[2],
    "--mark": `"${mark}"`,
  };

  return (
    <article className="relative aspect-[156/205] overflow-hidden rounded-[13px] bg-[#2c3445] shadow-[0_8px_14px_rgba(0,0,0,.2)]">
      <div className="a66-game-art absolute inset-0" style={style} />
      <span className="absolute left-1 top-1 grid size-6 place-items-center rounded-full bg-[#ffaa09] text-sm">
        👍
      </span>
      <span className="absolute right-1 top-1 grid size-6 place-items-center rounded-full bg-white/35 text-brand-gold">
        ★
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-4 pt-10">
        <p className="truncate text-base font-black text-white drop-shadow">
          {name}
        </p>
        <p className="text-xs font-bold text-white/75">{brand}</p>
      </div>
    </article>
  );
}

export function ExpandLine() {
  return (
    <div className="mt-3 flex justify-center gap-1 text-lg">
      <span className="text-[#496592]">Mais 40 jogos</span>
      <button className="text-brand-gold">Expandir</button>
    </div>
  );
}
