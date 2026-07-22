import { Mail, Volume2 } from "lucide-react";

export function NoticeStrip() {
  return (
    <div className="mt-3 flex h-11 items-center gap-2 overflow-visible px-4 text-[15px] font-bold tracking-wide">
      <Volume2 className="size-6 shrink-0 text-[#8facd9]" strokeWidth={2.3} />
      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="a66-notice-marquee whitespace-nowrap">
          <NoticeText />
          <NoticeText />
        </p>
      </div>
      <div className="relative z-10 shrink-0">
        <Mail className="size-7 rounded-[4px] bg-[#344868] p-[5px] text-[#8facd9]" />
        <span className="a66-mail-badge absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-[#ea4e3d] text-xs leading-none text-white">
          2
        </span>
      </div>
    </div>
  );
}

function NoticeText() {
  return (
    <span className="pr-8">
      <span className="mr-2 inline-grid h-[16px] w-[22px] place-items-center rounded-[2px] bg-[#d82d63] align-[-1px] text-[10px] leading-none">
        BR
      </span>
      CONVIDE E GANHE <span className="text-[#ffaa09]">R$120</span> ,
      COMPARTILHE LINK E RECEBA BÔNUS
    </span>
  );
}
