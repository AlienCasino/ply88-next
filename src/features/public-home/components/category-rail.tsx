export type CategoryRailItem = {
  label: string;
  icon: string;
};

export function CategoryRail({ items }: { items: CategoryRailItem[] }) {
  return (
    <div className="mt-3 flex h-[72px] items-end justify-between px-4 text-[#6e8ab7]">
      {items.map((item, index) => (
        <button
          key={item.label}
          className="flex min-w-0 flex-col items-center text-[13px]"
        >
          <span className="mb-1 grid h-8 place-items-center text-2xl font-black text-[#74a5d9]">
            {item.icon}
          </span>
          <span className={index === 0 ? "text-brand-gold" : ""}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
