import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift, Sparkles } from "lucide-react";
import { routes } from "@/core/constants/routes";
import { Button } from "@/design-system/primitives/button";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import { cn } from "@/shared/lib/utils";
import { getPromotions } from "../services/promotions.service";
import type { PromotionCard, PromotionCategory } from "../types";
import { PromotionsChrome } from "./promotions-chrome";

type PromotionsPageProps = {
  category?: string;
};

const tabs: Array<{ label: string; value: PromotionCategory }> = [
  { label: "All", value: "" },
  { label: "Casino", value: "casino" },
  { label: "Sport", value: "sport" },
  { label: "Specials", value: "specials" },
];

export async function PromotionsPage({ category = "" }: PromotionsPageProps) {
  const activeCategory = normalizeCategory(category);
  const [promotions, sidebarContent] = await Promise.all([
    getPromotions({ category: activeCategory }),
    getLeftSidebarSliders(),
  ]);

  return (
    <PromotionsChrome sidebarContent={sidebarContent}>
      <main className="px-3 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+20px)] pt-3">
        <section className="overflow-hidden rounded-[14px] border border-[#344868] bg-[#202733] shadow-[0_12px_28px_rgba(0,0,0,.24)]">
          <div className="relative min-h-[118px] overflow-hidden bg-[radial-gradient(circle_at_12%_12%,rgba(255,207,84,.28),transparent_28%),radial-gradient(circle_at_92%_8%,rgba(49,146,255,.32),transparent_34%),linear-gradient(145deg,#263146_0%,#1d222c_62%,#141922_100%)] px-4 py-4">
            <div className="absolute right-3 top-3 grid size-20 place-items-center rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold/90">
              <Gift className="size-9" strokeWidth={1.7} />
            </div>
            <p className="relative z-10 inline-flex h-7 items-center gap-1.5 rounded-full border border-brand-gold/30 bg-[#111722]/45 px-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-gold">
              <Sparkles className="size-3.5" />
              Bonus Hub
            </p>
            <h1 className="relative z-10 mt-3 max-w-[250px] text-[25px] font-black leading-[1.06] text-white">
              Promoções feitas para jogar melhor
            </h1>
            <p className="relative z-10 mt-2 max-w-[245px] text-[12px] font-medium leading-relaxed text-[#9fb8df]">
              Escolha a oferta, confira as regras e aproveite os bônus ativos.
            </p>
          </div>
        </section>

        <nav className="mt-4 grid grid-cols-4 gap-2" aria-label="Promotion category">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={getCategoryHref(tab.value)}
              className={cn(
                "grid h-10 place-items-center rounded-[8px] border text-[13px] font-bold transition active:scale-[.98]",
                activeCategory === tab.value
                  ? "border-brand-gold bg-brand-gold text-[#1d222c] shadow-[0_8px_18px_rgba(255,207,84,.18)]"
                  : "border-[#344868] bg-[#263146] text-[#9fb8df] hover:border-brand-gold/70 hover:text-white",
              )}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <section className="mt-4">
          <div className="mb-3 flex min-h-7 items-center justify-between">
            <h2 className="text-[19px] font-semibold text-white">Ofertas</h2>
            <span className="rounded-full border border-[#344868] bg-[#263146] px-2.5 py-1 text-[11px] font-bold text-[#8facd9]">
              {promotions.length} total
            </span>
          </div>

          {promotions.length > 0 ? (
            <div className="space-y-3">
              {promotions.map((promotion, index) => (
                <PromotionListCard
                  key={promotion.id}
                  promotion={promotion}
                  priority={index === 0}
                />
              ))}
            </div>
          ) : (
            <div className="grid min-h-56 place-items-center rounded-[12px] border border-dashed border-[#344868] bg-[#202733] px-6 text-center">
              <div>
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-brand-gold/10 text-brand-gold">
                  <Gift className="size-6" />
                </div>
                <p className="mt-3 text-sm font-bold text-white">
                  Nenhuma promoção disponível
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#8facd9]">
                  Tente outra categoria ou volte em breve para novas ofertas.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </PromotionsChrome>
  );
}

function PromotionListCard({
  promotion,
  priority,
}: {
  promotion: PromotionCard;
  priority: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-[13px] border border-[#344868] bg-[#263146] shadow-[0_10px_24px_rgba(0,0,0,.2)] transition hover:border-brand-gold/50">
      <Link href={`${routes.promotions}/${encodeURIComponent(promotion.id)}`}>
        <div className="relative aspect-[358/150] overflow-hidden bg-[#1d222c]">
          {promotion.imageUrl ? (
            <Image
              src={promotion.imageUrl}
              alt={promotion.title}
              fill
              priority={priority}
              sizes="(max-width: 520px) 94vw, 440px"
              className="object-cover transition duration-500 hover:scale-[1.025]"
            />
          ) : (
            <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(255,207,84,.22),transparent_28%),linear-gradient(145deg,#344868,#1d222c)] text-brand-gold">
              <Gift className="size-12" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101620] via-[#101620]/20 to-transparent" />
          <span className="absolute right-2 top-2 rounded-[5px] bg-[#ffaa09] px-2 py-1 text-[10px] font-black uppercase leading-none text-white shadow">
            {promotion.badge}
          </span>
        </div>
      </Link>

      <div className="p-3">
        <p className="text-[11px] font-black uppercase text-brand-gold">
          {promotion.category}
        </p>
        <h3 className="mt-1 line-clamp-1 text-[16px] font-black leading-tight text-white">
          {promotion.title}
        </h3>
        <p className="mt-1 line-clamp-2 min-h-[32px] text-[12px] font-medium leading-4 text-[#9fb8df]">
          {promotion.subtitle}
        </p>
        <Button
          asChild
          className="mt-3 h-9 w-full rounded-[8px] bg-brand-gold text-[13px] font-bold text-[#1d222c] hover:bg-brand-gold hover:brightness-105"
        >
          <Link href={`${routes.promotions}/${encodeURIComponent(promotion.id)}`}>
            {promotion.ctaText}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

function getCategoryHref(category: PromotionCategory) {
  if (!category) {
    return routes.promotions;
  }

  return `${routes.promotions}?category=${category}`;
}

function normalizeCategory(category: string): PromotionCategory {
  if (category === "casino" || category === "sport" || category === "specials") {
    return category;
  }

  return "";
}
