import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, CalendarDays, CheckCircle2, Gift, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { routes } from "@/core/constants/routes";
import { Button } from "@/design-system/primitives/button";
import { getLeftSidebarSliders } from "@/features/public-home/services/sliders.service";
import { getPromotionById } from "../services/promotions.service";
import { PromotionsChrome } from "./promotions-chrome";

export async function PromotionDetailPage({
  promotionId,
}: {
  promotionId: string;
}) {
  const [promotion, sidebarContent] = await Promise.all([
    getPromotionById(promotionId),
    getLeftSidebarSliders(),
  ]);

  if (!promotion) {
    notFound();
  }

  return (
    <PromotionsChrome sidebarContent={sidebarContent}>
      <main className="pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom)+20px)]">
        <section className="relative overflow-hidden bg-[#1d222c]">
          <div className="relative aspect-[430/235] overflow-hidden bg-[#263146]">
            {promotion.imageUrl ? (
              <Image
                src={promotion.imageUrl}
                alt={promotion.title}
                fill
                priority
                sizes="(max-width: 520px) 100vw, 440px"
                className="object-cover"
              />
            ) : (
              <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(255,207,84,.22),transparent_28%),linear-gradient(145deg,#344868,#1d222c)] text-brand-gold">
                <Gift className="size-14" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d222c] via-[#1d222c]/35 to-transparent" />
            <Link
              href={routes.promotions}
              className="absolute left-3 top-3 grid size-9 place-items-center rounded-full border border-white/10 bg-black/35 text-white backdrop-blur transition hover:bg-black/50"
              aria-label="Voltar para promocoes"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <span className="absolute right-3 top-3 rounded-[6px] bg-[#ffaa09] px-2.5 py-1 text-[11px] font-black uppercase text-white">
              {promotion.badge}
            </span>
          </div>

          <div className="px-3 pb-4">
            <div className="-mt-8 rounded-[14px] border border-[#344868] bg-[#263146]/95 p-4 shadow-[0_14px_34px_rgba(0,0,0,.28)] backdrop-blur">
              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-brand-gold">
                {promotion.category}
              </p>
              <h1 className="mt-2 text-[24px] font-black leading-tight text-white">
                {promotion.title}
              </h1>
              <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#9fb8df]">
                {promotion.subtitle}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <InfoPill
                  icon={<ShieldCheck className="size-4" />}
                  label="Status"
                  value={promotion.status}
                />
                <InfoPill
                  icon={<CalendarDays className="size-4" />}
                  label="Atualizado"
                  value={formatDate(promotion.updatedAt)}
                />
              </div>
              <Button className="mt-4 h-10 w-full rounded-[9px] bg-brand-gold text-sm font-bold text-[#1d222c] hover:bg-brand-gold hover:brightness-105">
                {promotion.ctaText}
              </Button>
            </div>
          </div>
        </section>

        <div className="space-y-4 px-3">
          {promotion.sections.length > 0 ? (
            <section className="rounded-[12px] border border-[#344868] bg-[#263146] p-4">
              <h2 className="text-[17px] font-black text-white">Detalhes</h2>
              <div className="mt-3 space-y-3">
                {promotion.sections.map((section) => (
                  <div key={section.id}>
                    <p className="text-sm font-bold text-brand-gold">
                      {section.title}
                    </p>
                    {section.content ? (
                      <p className="mt-1 text-[13px] leading-relaxed text-[#c7d7ef]">
                        {section.content}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-[12px] border border-[#344868] bg-[#202733] p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[17px] font-black text-white">Termos</h2>
              <span className="rounded-full border border-[#344868] bg-[#1d222c] px-2.5 py-1 text-[11px] font-bold text-[#8facd9]">
                v{promotion.termsVersion}
              </span>
            </div>

            {promotion.rules.length > 0 ? (
              <div className="mt-3 space-y-2.5">
                {promotion.rules.map((rule) => (
                  <article
                    key={rule.title}
                    className="rounded-[10px] border border-[#344868]/80 bg-[#263146] p-3"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                      <div className="min-w-0">
                        <h3 className="text-[13px] font-black leading-tight text-white">
                          {rule.title}
                        </h3>
                        <p className="mt-1 text-[12px] leading-relaxed text-[#9fb8df]">
                          {rule.content}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-3 rounded-[10px] border border-dashed border-[#344868] bg-[#263146] p-4 text-center text-sm text-[#8facd9]">
                Os termos desta promoção serão exibidos em breve.
              </p>
            )}
          </section>
        </div>
      </main>
    </PromotionsChrome>
  );
}

function InfoPill({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-[9px] border border-[#344868] bg-[#1d222c] px-3 py-2">
      <span className="shrink-0 text-brand-gold">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase text-[#6e8ab7]">{label}</p>
        <p className="truncate text-[12px] font-black text-white">{value}</p>
      </div>
    </div>
  );
}

function formatDate(value: string | null) {
  if (!value) {
    return "Recente";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Recente";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
