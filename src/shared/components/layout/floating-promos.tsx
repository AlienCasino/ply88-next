"use client";

import { ArrowUpToLine } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function FloatingPromos() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [showLeftPromos, setShowLeftPromos] = useState(true);
  const [showRightPromos, setShowRightPromos] = useState(true);
  const tuckedOffset = 30;

  useEffect(() => {
    let scrollEndTimer: number | undefined;

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollEndTimer) {
        window.clearTimeout(scrollEndTimer);
      }
      scrollEndTimer = window.setTimeout(() => setIsScrolling(false), 360);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollEndTimer) {
        window.clearTimeout(scrollEndTimer);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="a66-floating-layer pointer-events-none fixed inset-y-[62px] left-[var(--app-shell-left)] z-30 w-[var(--app-max-width)] overflow-hidden">
        {showLeftPromos ? (
          <div
            className="absolute bottom-[calc(64px+env(safe-area-inset-bottom))] left-0 flex flex-col items-start gap-2 transition-transform duration-300 ease-out"
            style={{
              transform: isScrolling
                ? `translateX(-${tuckedOffset}px)`
                : "translateX(0)",
            }}
          >
            <div className="relative grid size-16 place-items-center">
              <Image
                src="/a66/float-cup.gif"
                alt=""
                width={60}
                height={60}
                unoptimized
                className="size-[60px] object-contain"
              />
              <button
                type="button"
                onClick={() => setShowLeftPromos(false)}
                className="pointer-events-auto absolute -right-1 top-1 grid size-5 place-items-center rounded-full bg-black/80 text-[14px] font-bold leading-none text-white shadow"
                aria-label="Fechar promoções à esquerda"
              >
                x
              </button>
            </div>
            <span className="grid size-16 place-items-center">
              <Image
                src="/a66/telegram-gif.webp"
                alt=""
                width={60}
                height={60}
                unoptimized
                className="size-[60px] object-contain drop-shadow-[0_4px_5px_rgba(0,0,0,.35)]"
              />
            </span>
            <span className="grid size-16 place-items-center">
              <Image
                src="/a66/float-headset.gif"
                alt=""
                width={60}
                height={60}
                unoptimized
                className="size-[60px] object-contain"
              />
            </span>
          </div>
        ) : null}
        {showRightPromos ? (
          <div
            className="absolute bottom-[calc(64px+env(safe-area-inset-bottom))] right-0 flex flex-col items-end gap-2 transition-transform duration-300 ease-out"
            style={{
              transform: isScrolling
                ? `translateX(${tuckedOffset}px)`
                : "translateX(0)",
            }}
          >
            <div className="relative grid size-16 place-items-center">
              <Image
                src="/a66/float-wheel.gif"
                alt=""
                width={60}
                height={60}
                unoptimized
                className="size-[60px] object-contain"
              />
              <button
                type="button"
                onClick={() => setShowRightPromos(false)}
                className="pointer-events-auto absolute left-1 top-0 grid size-5 place-items-center rounded-full bg-black/80 text-[14px] font-bold leading-none text-white shadow"
                aria-label="Fechar promoções à direita"
              >
                x
              </button>
            </div>
            <span className="grid size-16 place-items-center">
              <Image
                src="/a66/float-chest.gif"
                alt=""
                width={60}
                height={60}
                unoptimized
                className="size-[60px] object-contain"
              />
            </span>
            <span className="grid size-16 place-items-center">
              <Image
                src="/a66/float-redpacket.gif"
                alt=""
                width={60}
                height={60}
                unoptimized
                className="size-[60px] object-contain"
              />
            </span>
          </div>
        ) : null}
      </div>
      <button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-[calc(86px+env(safe-area-inset-bottom))] right-[calc(var(--app-shell-left)+8px)] z-40 inline-flex items-center gap-1 rounded-[7px] border border-[#344868] bg-[#263146] px-1.5 py-1 text-[11px] font-bold leading-none text-white shadow-[0_5px_12px_rgba(0,0,0,.25)] transition hover:border-brand-gold hover:text-brand-gold"
        aria-label="Voltar ao topo"
      >
        <ArrowUpToLine className="size-3.5" strokeWidth={2.3} />
        TOPO
      </button>
    </>
  );
}
