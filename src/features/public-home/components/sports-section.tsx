import { GameTile } from "./game-section";
import type { HomeSportCard } from "../types";

export function SportsSection({ sports }: { sports: HomeSportCard[] }) {
  return (
    <section className="mt-7 px-3">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[26px]">⚽ Esporte</h2>
        <button className="text-sm text-[#6e8ab7]">Tudo</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {sports.map(([name, brand, color]) => (
          <GameTile
            key={name}
            name={name}
            brand={brand}
            colors={[color, "#45e48b", "#0d7049"]}
            mark={brand}
          />
        ))}
      </div>
    </section>
  );
}
