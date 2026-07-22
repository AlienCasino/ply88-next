import { ArrowRight } from "lucide-react";

export function SportsPreview() {
  return (
    <section className="mt-3 px-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg">
          <span>⚽</span> Jogos de desporto
        </h2>
        <button className="flex items-center gap-1 text-sm text-brand-gold">
          Mais <ArrowRight className="size-4" />
        </button>
      </div>
      <div className="w-[68%] rounded-[8px] border border-[#344868] bg-[#263146] p-2 text-center shadow">
        <div className="flex items-center justify-between text-xs text-[#8facd9]">
          <span>Primeiro te...</span>
          <span className="text-brand-gold">839 ›</span>
        </div>
        <p className="mt-1 truncate text-sm font-bold">
          🏆 Copa do Mundo FIF...
        </p>
        <p className="text-lg font-black leading-none">0-0</p>
        <p className="text-xs text-[#6e8ab7]">Movimento da partida</p>
        <div className="mt-2 grid min-w-0 grid-cols-3 gap-1.5">
          {[
            ["House", "2.58"],
            ["Draw", "2.65"],
            ["Visitor", "3.72"],
          ].map(([label, value]) => (
            <button
              key={label}
              className="min-w-0 overflow-hidden rounded-[5px] border border-[#344868] bg-[#1d2635] px-1 py-1 text-center leading-tight"
            >
              <span className="block truncate text-[10px] text-[#8facd9]">
                {label}
              </span>
              <span className="block text-[12px] font-bold text-white">
                {value}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
