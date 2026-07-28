"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft, Loader2, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { routes } from "@/core/constants/routes";
import type { HomeCategoryRailItem } from "@/features/public-home/types";
import { LoadMoreButton } from "@/shared/components/load-more-button";
import { cn } from "@/shared/lib/utils";
import { loadGameProviders } from "../actions/provider-actions";
import {
  PROVIDERS_PAGE_LIMIT,
  type GameProvider,
  type GameProviderPage,
} from "../types";

type LibraryCategory = {
  id: string;
  label: string;
  href: string;
  iconUrl?: string | null;
  iconText?: string;
};

const fallbackCategories: LibraryCategory[] = [
  { id: "popular", label: "Popular", href: routes.providers, iconText: "🔥" },
  { id: "slots", label: "Slots", href: routes.providers, iconText: "777" },
  { id: "fishery", label: "Fishery", href: routes.providers, iconText: "🐬" },
  { id: "minigames", label: "Minigames", href: routes.providers, iconText: "💎" },
  { id: "letters", label: "Letters", href: routes.providers, iconText: "🃏" },
];

export function GameLibraryScreen({
  categoryItems,
  initialProviderPage,
}: {
  categoryItems?: HomeCategoryRailItem[];
  initialProviderPage: GameProviderPage;
}) {
  const menuItems = useMemo(() => mapCategoryItems(categoryItems), [categoryItems]);
  const [category, setCategory] = useState(menuItems[0] ?? fallbackCategories[0]);
  const [query, setQuery] = useState("");
  const [providerPage, setProviderPage] = useState(initialProviderPage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const requestSequence = useRef(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const requestId = requestSequence.current + 1;
      requestSequence.current = requestId;

      startTransition(async () => {
        const nextPage = await loadGameProviders({
          skip: 0,
          limit: PROVIDERS_PAGE_LIMIT,
          categoryName: resolveCategoryName(category),
          search: query.trim(),
        });

        if (requestSequence.current === requestId) {
          setProviderPage(nextPage);
        }
      });
    }, 320);

    return () => window.clearTimeout(timer);
  }, [category, query]);

  const loadMore = () => {
    if (isPending || !providerPage.hasMore) {
      return;
    }

    const requestId = requestSequence.current + 1;
    requestSequence.current = requestId;

    startTransition(async () => {
      const nextPage = await loadGameProviders({
        skip: providerPage.nextSkip,
        limit: PROVIDERS_PAGE_LIMIT,
        categoryName: resolveCategoryName(category),
        search: query.trim(),
      });

      if (requestSequence.current === requestId) {
        setProviderPage((current) => ({
          providers: [...current.providers, ...nextPage.providers],
          totalCount: nextPage.totalCount,
          nextSkip: nextPage.nextSkip,
          hasMore: nextPage.hasMore,
        }));
      }
    });
  };

  return (
    <div className="min-h-dvh bg-[#222832] text-white">
      <header className="sticky top-0 z-40 border-b border-[#344868] bg-[#1d222c]">
        <div className="relative flex h-[62px] items-center justify-center px-3">
          <Link
            href={routes.home}
            className="absolute left-3 grid size-8 place-items-center rounded-full text-[#8facd9] outline-none ring-brand-gold/40 focus-visible:ring-2"
            aria-label="Voltar"
          >
            <ChevronLeft className="size-6" strokeWidth={1.8} />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-[8px] px-4 text-[20px] font-medium text-white outline-none ring-brand-gold/40 focus-visible:ring-2"
          >
            {category.label}
            <ChevronDown
              className={cn(
                "size-5 text-[#6e8ab7] transition",
                menuOpen && "rotate-180",
              )}
            />
          </button>
        </div>
        {menuOpen ? (
          <div className="absolute inset-x-3 top-[54px] z-50 rounded-[8px] border border-[#344868] bg-[#263146] p-2 shadow-[0_12px_30px_rgba(0,0,0,.36)]">
            <div className="grid grid-cols-2 gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCategory(item);
                    setMenuOpen(false);
                  }}
                  className={cn(
                    "h-10 cursor-pointer rounded-[7px] text-sm font-medium outline-none ring-brand-gold/40 focus-visible:ring-2",
                    category.id === item.id
                      ? "bg-brand-gold text-[#1d222c]"
                      : "bg-[#1d222c] text-[#8facd9]",
                  )}
                >
                  <span className="flex min-w-0 items-center justify-center gap-2">
                    <CategoryMark item={item} active={category.id === item.id} />
                    <span className="truncate">{item.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main className="px-3 pb-6 pt-3">
        <label className="flex h-12 items-center gap-3 rounded-[14px] border border-[#496592] bg-[#263146] px-4 text-[#6e8ab7] focus-within:border-brand-gold">
          <span className="sr-only">Pesquisar provedores</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar"
            className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-[#496592]"
          />
          {isPending ? (
            <Loader2 className="size-5 shrink-0 animate-spin text-brand-gold" />
          ) : (
            <Search className="size-5 shrink-0 text-brand-gold" />
          )}
        </label>

        <section className="mt-4">
          <div className="mb-3 flex min-h-7 items-center justify-between">
            <h1 className="text-[19px] font-semibold text-white">Providers</h1>
            <span className="text-sm text-[#6e8ab7]">
              {providerPage.totalCount} total
            </span>
          </div>

          {providerPage.providers.length > 0 ? (
            <ProviderGrid providers={providerPage.providers} />
          ) : (
            <div className="grid min-h-48 place-items-center rounded-[10px] border border-dashed border-[#344868] bg-[#1d222c] px-4 text-center text-sm text-[#8facd9]">
              Nenhum provedor encontrado.
            </div>
          )}

          {providerPage.hasMore ? (
            <LoadMoreButton
              onClick={loadMore}
              loading={isPending}
              disabled={isPending}
            />
          ) : null}
        </section>
      </main>
    </div>
  );
}

function ProviderGrid({ providers }: { providers: GameProvider[] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}

function ProviderCard({ provider }: { provider: GameProvider }) {
  return (
    <Link
      href={`${routes.games}?providerName=${encodeURIComponent(provider.name)}`}
      className="group relative flex aspect-[156/205] min-w-0 flex-col justify-between overflow-hidden rounded-[11px] border border-white/[0.04] bg-[#2c3445] p-2.5 shadow-[0_7px_14px_rgba(0,0,0,.24)] transition hover:border-brand-gold/50 hover:brightness-105"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(255,255,255,.18),transparent_23%),linear-gradient(145deg,rgba(255,170,9,.22),rgba(90,115,170,.18)_45%,rgba(29,34,44,.72))]" />
      <div className="relative grid flex-1 place-items-center">
        {provider.imageUrl ? (
          <Image
            src={provider.imageUrl}
            alt={provider.name}
            width={94}
            height={94}
            sizes="94px"
            className="max-h-[82px] w-auto max-w-[86px] object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,.35)] transition group-hover:scale-[1.03]"
          />
        ) : (
          <span className="text-[38px] font-black leading-none text-white drop-shadow">
            {provider.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <div className="relative">
        <p className="truncate text-[13px] font-black leading-tight text-white drop-shadow">
          {provider.name}
        </p>
        <p className="mt-1 text-[11px] font-semibold leading-none text-brand-gold">
          {provider.totalGameCount} games
        </p>
      </div>
    </Link>
  );
}

function CategoryMark({
  item,
  active,
}: {
  item: LibraryCategory;
  active: boolean;
}) {
  if (item.iconUrl) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "size-5 shrink-0 bg-contain bg-center bg-no-repeat",
          active ? "drop-shadow-[0_1px_2px_rgba(29,34,44,.35)]" : "",
        )}
        style={{ backgroundImage: `url("${item.iconUrl}")` }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-5 shrink-0 place-items-center text-[16px] font-black leading-none",
        active ? "text-[#1d222c]" : "text-brand-gold",
      )}
    >
      {item.iconText ?? "•"}
    </span>
  );
}

function mapCategoryItems(
  items: HomeCategoryRailItem[] | undefined,
): LibraryCategory[] {
  if (!items?.length) {
    return fallbackCategories;
  }

  return items.map((item) => ({
    id: item.id,
    label: item.label,
    href: item.href,
    iconUrl: item.iconUrl,
    iconText: item.iconText,
  }));
}

function resolveCategoryName(category: LibraryCategory) {
  return category.label.toLowerCase() === "providers" ? "" : category.label;
}
