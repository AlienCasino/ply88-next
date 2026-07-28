import AppShell from "@/design-system/components/app-shell";
import { BrandMark } from "@/design-system/components/brand-mark";
import { Button } from "@/design-system/primitives/button";
import { routes } from "@/core/constants/routes";
import {
  ArrowLeft,
  ChevronLeft,
  Clock3,
  Gamepad2,
  type LucideIcon,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function GameDetailPage() {
  return (
    <AppShell>
      <main className="min-h-dvh bg-[#1d222c] text-white">
        <header className="sticky top-0 z-30 border-b border-[#344868] bg-[#1d222c]">
          <div className="relative flex h-[62px] items-center justify-center px-3">
            <Link
              href={routes.home}
              className="absolute left-3 grid size-8 place-items-center rounded-full text-[#8facd9] outline-none ring-brand-gold/40 focus-visible:ring-2"
              aria-label="Voltar"
            >
              <ChevronLeft className="size-6" strokeWidth={1.8} />
            </Link>
            <BrandMark compact />
          </div>
        </header>

        <section className="px-3 pb-6 pt-4">
          <div className="relative overflow-hidden rounded-[14px] border border-[#344868] bg-[#121820] shadow-[0_18px_36px_rgba(0,0,0,.34)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_8%,rgba(244,199,83,.22),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(109,143,196,.18),transparent_30%)]" />
            <div className="relative grid aspect-[16/10] place-items-center px-7 text-center">
              <div>
                <div className="mx-auto grid size-16 place-items-center rounded-full border border-brand-gold/40 bg-brand-gold/10 text-brand-gold shadow-[0_0_26px_rgba(244,199,83,.16)]">
                  <Gamepad2 className="size-8" strokeWidth={1.8} />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">
                  Coming soon
                </p>
                <h1 className="mt-2 text-[22px] font-black leading-tight text-white">
                  This game is not available yet
                </h1>
                <p className="mt-2 text-sm leading-5 text-[#b7c7de]">
                  We are getting this title ready for you. Please explore another
                  game for now and check back again soon.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[12px] border border-[#344868] bg-[#263146]/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.04)]">
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-[#1d222c] text-brand-gold">
                <Clock3 className="size-5" strokeWidth={1.9} />
              </span>
              <div className="min-w-0">
                <h2 className="text-[15px] font-bold text-white">
                  Thanks for your patience
                </h2>
                <p className="mt-1 text-sm leading-5 text-[#8facd9]">
                  This game will appear here as soon as it is ready to play.
                  Until then, there are plenty of other games waiting.
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <InfoPill icon={ShieldCheck} label="Secure play area" />
              <InfoPill icon={Sparkles} label="More games ready" />
            </div>
          </div>

          <div className="mt-4 grid gap-2">
            <Button
              asChild
              className="h-11 rounded-[9px] border border-brand-gold/80 bg-brand-gold text-[#1d222c] hover:bg-brand-gold/90"
            >
              <Link href={routes.games}>
                <Search className="size-4" />
                Find another game
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-[9px] border-[#344868] bg-[#263146] text-[#8facd9] hover:bg-[#2d394d] hover:text-white"
            >
              <Link href={routes.home}>
                <ArrowLeft className="size-4" />
                Back to home
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function InfoPill({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex h-10 items-center justify-center gap-2 rounded-[8px] bg-[#1d222c] px-2 text-xs font-semibold text-[#9fc0f4]">
      <Icon className="size-4 text-brand-gold" strokeWidth={1.9} />
      <span className="truncate">{label}</span>
    </div>
  );
}
