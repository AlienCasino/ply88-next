"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Dialog as DrawerPrimitive } from "radix-ui";
import { routes } from "@/core/constants/routes";
import type { HomeSidebarSliderContent } from "./types";

export type HomeDrawerCategory = {
  label: string;
  icon: LucideIcon;
};

export type HomeDrawerAction = {
  label: string;
  icon: LucideIcon;
};

export type HomeDrawerOffer = {
  label: string;
  icon: string;
  badge: string;
  className: string;
};

export function HomeSideDrawer({
  categories,
  actions,
  offers,
  sliderContent = { items: [] },
}: {
  categories: HomeDrawerCategory[];
  actions: HomeDrawerAction[];
  offers: HomeDrawerOffer[];
  sliderContent?: HomeSidebarSliderContent;
}) {
  const { items: sliderItems } = sliderContent;
  const shouldUseSliderItems = sliderItems.length > 0;

  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay className="a66-drawer-overlay fixed bottom-0 top-[62px] z-[31] w-[var(--app-max-width)] bg-black/35 backdrop-blur-[5px]" />
      <DrawerPrimitive.Content className="a66-side-drawer fixed bottom-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom))] top-[62px] z-[32] w-[238px] max-w-[70vw] overflow-y-auto bg-[#1d222c] px-3 py-3 text-[#8facd9] shadow-[12px_0_28px_rgba(0,0,0,.35)] outline-none">
        <DrawerPrimitive.Title className="sr-only">
          Menu de navegação
        </DrawerPrimitive.Title>
        <div className="grid grid-cols-2 gap-2">
          {shouldUseSliderItems
            ? sliderItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="grid h-[62px] place-items-center rounded-[7px] bg-[#2b3546] text-[14px] transition hover:bg-[#344052] hover:text-white"
                >
                  <span
                    className="mb-1 size-6 bg-contain bg-center bg-no-repeat text-[#9fc0f4]"
                    style={{
                      backgroundImage: item.iconUrl
                        ? `url("${item.iconUrl}")`
                        : undefined,
                    }}
                    aria-hidden="true"
                  />
                  <span className="max-w-full truncate px-1">{item.label}</span>
                </a>
              ))
            : categories.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  className="grid h-[62px] place-items-center rounded-[7px] bg-[#2b3546] text-[14px] transition hover:bg-[#344052] hover:text-white"
                >
                  <Icon
                    className="mb-1 size-6 text-[#9fc0f4]"
                    strokeWidth={2.1}
                  />
                  <span>{label}</span>
                </button>
              ))}
        </div>
        <div className="mt-2 space-y-1.5">
          {actions.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex h-11 w-full items-center gap-3 rounded-[7px] bg-[#2b3546] px-4 text-left text-[15px] transition hover:bg-[#344052] hover:text-white"
            >
              <Icon className="size-5 text-[#9fc0f4]" />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <section className="mt-2 rounded-[7px] bg-[#2b3546] p-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            {offers.map((offer) => (
              <Link
                key={offer.label}
                href={routes.promotions}
                className={`relative h-[54px] overflow-hidden rounded-[6px] bg-gradient-to-br ${offer.className} p-1.5 text-left text-[13px] leading-[14px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.22)]`}
              >
                <span className="whitespace-pre-line">{offer.label}</span>
                <span className="absolute bottom-1 right-1.5 text-[24px] drop-shadow">
                  {offer.icon}
                </span>
                {offer.badge ? (
                  <span className="absolute right-1 top-1 rounded-full bg-[#21d30f] px-1.5 text-[10px] font-bold text-white">
                    {offer.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        </section>
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
}
