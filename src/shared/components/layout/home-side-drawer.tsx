"use client";

import Image from "next/image";
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

export type HomeDrawerLink = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export function HomeSideDrawer({
  categories,
  actions,
  offers,
  helpLinks,
  sliderContent = { featured: null, items: [] },
}: {
  categories: HomeDrawerCategory[];
  actions: HomeDrawerAction[];
  offers: HomeDrawerOffer[];
  helpLinks: HomeDrawerLink[];
  sliderContent?: HomeSidebarSliderContent;
}) {
  const { featured, items: sliderItems } = sliderContent;
  const shouldUseSliderItems = sliderItems.length > 0;

  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay className="a66-drawer-overlay fixed bottom-0 top-[62px] z-[31] w-[var(--app-max-width)] bg-black/35 backdrop-blur-[5px]" />
      <DrawerPrimitive.Content className="a66-side-drawer fixed bottom-0 top-[62px] z-[32] w-[238px] max-w-[70vw] overflow-y-auto bg-[#1d222c] px-3 py-3 text-[#8facd9] shadow-[12px_0_28px_rgba(0,0,0,.35)] outline-none">
        <DrawerPrimitive.Title className="sr-only">
          Menu de navegação
        </DrawerPrimitive.Title>
        {featured?.imageUrl ? (
          <a
            href={featured.href}
            className="group relative mb-2 block overflow-hidden rounded-[8px] border border-[#344868] bg-[#111821] shadow-[0_8px_16px_rgba(0,0,0,.22),inset_0_1px_0_rgba(255,255,255,.08)]"
          >
            <span
              role="img"
              aria-label={featured.alt}
              className="block aspect-[278/126] w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.025]"
              style={{ backgroundImage: `url("${featured.imageUrl}")` }}
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/35 to-transparent" />
          </a>
        ) : null}
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
        <div className="mt-2 space-y-1">
          {helpLinks.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="flex h-9 items-center gap-3 rounded-[7px] px-2.5 text-sm transition hover:bg-[#2b3546] hover:text-white"
            >
              <Icon className="size-5 fill-[#9fc0f4] text-[#9fc0f4]" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
        <p className="mt-3 text-sm text-[#496592]">Login Rápido</p>
        <Link
          href={routes.login}
          className="mt-2 flex h-10 items-center gap-3 rounded-[7px] bg-[#2b3546] px-3 text-sm text-[#9fc0f4] transition hover:bg-[#344052]"
        >
          <Image
            src="/a66/google.avif"
            alt=""
            width={24}
            height={24}
            className="rounded-full"
          />
          Google Login
        </Link>
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
}
