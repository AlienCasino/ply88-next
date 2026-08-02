"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog } from "radix-ui";
import { Coins, HelpCircle, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/design-system/primitives/button";
import { cn } from "@/shared/lib/utils";
import type { DailySpinResult, DailySpinSlice } from "../types";

type WheelCanvas = HTMLCanvasElement & {
  drawWheelAngle?: (rotationAngle: number) => void;
};

const FULL_TURN_DEG = 360;
const TOP_POINTER_DEG = 270;
const SPIN_TURNS = 6;
const SPIN_DURATION_MS = 4200;

export function DailySpinWheel({ slices }: { slices: DailySpinSlice[] }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<DailySpinResult | null>(null);
  const [resultOpen, setResultOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentRotation = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (slices.length === 0 || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawWheel(context, rect.width, rect.height, slices, currentRotation.current);
    };

    draw();

    const customCanvas = canvas as WheelCanvas;
    customCanvas.drawWheelAngle = (rotationAngle: number) => {
      currentRotation.current = rotationAngle;
      const rect = canvas.getBoundingClientRect();
      drawWheel(context, rect.width, rect.height, slices, rotationAngle);
    };

    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(canvas);

    return () => resizeObserver.disconnect();
  }, [slices]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const spin = useCallback(() => {
    if (isSpinning || slices.length === 0) {
      return;
    }

    const winningIndex = pickWeightedSlice(slices);
    const outcome = slices[winningIndex];
    setResult(null);
    setResultOpen(false);
    setIsSpinning(true);

    const angleStep = FULL_TURN_DEG / slices.length;
    const targetSliceCenterDeg = winningIndex * angleStep + angleStep / 2;
    const targetRotationDeg = normalizeDeg(TOP_POINTER_DEG - targetSliceCenterDeg);
    const startDeg = radiansToDegrees(currentRotation.current);
    const finalDeg = SPIN_TURNS * FULL_TURN_DEG + targetRotationDeg;
    const deltaDeg = finalDeg - normalizeDeg(startDeg);
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / SPIN_DURATION_MS, 1);
      const currentDeg = startDeg + deltaDeg * easeOutQuart(progress);
      const currentRad = degreesToRadians(currentDeg);
      const canvas = canvasRef.current as WheelCanvas | null;

      currentRotation.current = currentRad;
      canvas?.drawWheelAngle?.(currentRad);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      setIsSpinning(false);
      setResult({
        name: outcome.name,
        displayName: outcome.displayName,
        amount: outcome.amount,
      });
      setResultOpen(true);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isSpinning, slices]);

  return (
    <>
      <section className="rounded-[16px] border border-[#344868] bg-[#202733] p-3 shadow-[0_16px_36px_rgba(0,0,0,.28)]">
        <div className="relative mx-auto aspect-square w-full max-w-[354px]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,207,84,.26),transparent_58%)] blur-xl" />
          <div className="absolute left-1/2 top-[-2px] z-20 -translate-x-1/2">
            <div className="h-0 w-0 border-x-[15px] border-t-[26px] border-x-transparent border-t-brand-gold drop-shadow-[0_4px_8px_rgba(0,0,0,.45)]" />
          </div>
          <div className="relative h-full overflow-hidden rounded-full border-[8px] border-[#ffaa09] bg-[#111722] shadow-[inset_0_0_30px_rgba(0,0,0,.45),0_0_0_5px_rgba(255,207,84,.16)]">
            <canvas ref={canvasRef} className="block size-full rounded-full" />
          </div>
          <button
            type="button"
            onClick={spin}
            disabled={isSpinning}
            className="absolute left-1/2 top-1/2 z-30 grid size-[92px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[6px] border-[#fff1a6] bg-brand-gold text-[#1d222c] shadow-[0_12px_22px_rgba(0,0,0,.35),inset_0_-5px_0_rgba(0,0,0,.14)] transition active:scale-95 disabled:cursor-wait"
          >
            {isSpinning ? (
              <Loader2 className="size-7 animate-spin" />
            ) : (
              <span className="text-[18px] font-black uppercase">Spin</span>
            )}
          </button>
        </div>
      </section>

      <section className="mt-4 rounded-[14px] border border-[#344868] bg-[#202733] p-4">
        <div className="flex items-center gap-2">
          <Coins className="size-5 text-brand-gold" />
          <h2 className="text-[17px] font-black text-white">Wheel Rewards</h2>
        </div>
        <p className="mt-1 text-[12px] leading-relaxed text-[#8facd9]">
          Spin daily and land on one of these rewards.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {slices.map((slice) => (
            <div
              key={slice.id}
              className={cn(
                "rounded-[9px] border border-[#344868] bg-[#263146] px-3 py-2",
                slice.amount > 0 && "border-brand-gold/35 bg-brand-gold/10",
              )}
            >
              <p className="truncate text-[12px] font-black text-white">
                {slice.displayName}
              </p>
              <p
                className={cn(
                  "mt-0.5 text-[11px] font-bold",
                  slice.amount > 0 ? "text-brand-gold" : "text-[#6e8ab7]",
                )}
              >
                {slice.amount > 0 ? `+${slice.amount} chips` : "Better luck"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Dialog.Root open={resultOpen} onOpenChange={setResultOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[81] w-[min(360px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-[16px] border border-[#344868] bg-[#202733] p-5 text-center text-white shadow-[0_24px_60px_rgba(0,0,0,.5)] outline-none">
            {result?.amount ? (
              <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full border border-brand-gold/35 bg-brand-gold/15 text-brand-gold">
                <Sparkles className="size-8" />
              </div>
            ) : (
              <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full border border-[#4a6694] bg-[#263146] text-[#8facd9]">
                <HelpCircle className="size-8" />
              </div>
            )}
            <Dialog.Title className="text-[22px] font-black">
              {result?.amount ? "Big Win!" : "Almost there"}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm leading-relaxed text-[#9fb8df]">
              {result?.amount
                ? `You landed on ${result.displayName} and won ${result.amount} chips.`
                : "Better luck next time. Come back tomorrow for another spin."}
            </Dialog.Description>
            <Dialog.Close asChild>
              <Button className="mt-5 h-10 w-full rounded-[9px] bg-brand-gold text-sm font-bold text-[#1d222c] hover:bg-brand-gold hover:brightness-105">
                Awesome
              </Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function drawWheel(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  slices: DailySpinSlice[],
  rotationAngle: number,
) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 6;
  const angleStep = (Math.PI * 2) / slices.length;

  context.clearRect(0, 0, width, height);
  context.save();
  context.translate(centerX, centerY);
  context.rotate(rotationAngle);

  slices.forEach((slice, index) => {
    const startAngle = index * angleStep;
    const endAngle = (index + 1) * angleStep;
    const gradient = context.createRadialGradient(0, 0, 20, 0, 0, radius);
    const color = getSliceColor(slice.amount, index);

    gradient.addColorStop(0, "#fff2a7");
    gradient.addColorStop(0.18, color.light);
    gradient.addColorStop(1, color.dark);

    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, radius, startAngle, endAngle);
    context.closePath();
    context.fillStyle = gradient;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = "rgba(255,255,255,.16)";
    context.stroke();

    context.save();
    context.rotate(startAngle + angleStep / 2);
    context.textAlign = "right";
    context.textBaseline = "middle";
    context.fillStyle = slice.amount > 0 ? "#ffffff" : "rgba(255,255,255,.62)";
    context.font = slice.amount >= 500 ? "900 12px sans-serif" : "800 11px sans-serif";
    context.fillText(slice.displayName.toUpperCase(), radius - 24, 0);
    context.restore();
  });

  context.beginPath();
  context.arc(0, 0, radius - 2, 0, Math.PI * 2);
  context.strokeStyle = "rgba(255, 221, 68, .45)";
  context.lineWidth = 3;
  context.stroke();
  context.restore();
}

function getSliceColor(amount: number, index: number) {
  if (amount >= 1000) {
    return { light: "#ffdf63", dark: "#b66d00" };
  }
  if (amount >= 500) {
    return { light: "#d37aff", dark: "#672fb0" };
  }
  if (amount >= 200) {
    return { light: "#ff77b7", dark: "#9b1c62" };
  }
  if (amount > 0) {
    return { light: "#4dc7ff", dark: "#1466a5" };
  }

  return index % 2 === 0
    ? { light: "#35425b", dark: "#141b29" }
    : { light: "#263146", dark: "#101620" };
}

function pickWeightedSlice(slices: DailySpinSlice[]) {
  const winningSlices = slices.filter((slice) => slice.amount > 0);
  const pool = winningSlices.length > 0 && Math.random() > 0.35 ? winningSlices : slices;
  const picked = pool[Math.floor(Math.random() * pool.length)] ?? slices[0];

  return Math.max(0, slices.findIndex((slice) => slice.id === picked.id));
}

function normalizeDeg(value: number) {
  return ((value % FULL_TURN_DEG) + FULL_TURN_DEG) % FULL_TURN_DEG;
}

function easeOutQuart(progress: number) {
  return 1 - Math.pow(1 - progress, 4);
}

function degreesToRadians(value: number) {
  return (value * Math.PI) / 180;
}

function radiansToDegrees(value: number) {
  return (value * 180) / Math.PI;
}
