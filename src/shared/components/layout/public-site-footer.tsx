import Image from "next/image";

export function PublicSiteFooter({ links }: { links: string[][] }) {
  return (
    <footer className="mt-5 border-t border-[#344868] px-4 pb-6 pt-7">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-[#344868] pb-7">
        <p className="text-lg text-[#6e8ab7]">Conformidade de licença</p>
        <div className="grid size-[58px] place-items-center rounded-full border-[4px] border-white bg-white shadow-[0_0_0_2px_#e8335b]">
          <span className="grid size-[46px] place-items-center rounded-full border-[3px] border-[#e8335b] text-[22px] font-black leading-none text-[#e8335b]">
            18+
          </span>
        </div>
        <span aria-hidden="true" />
      </div>
      <div className="border-b border-[#344868] py-6">
        <p className="mb-4 text-lg text-[#6e8ab7]">Contate-Nos</p>
        <div className="flex items-center gap-4">
          <span className="grid size-11 place-items-center rounded-full bg-[#28aeea] text-sm font-black text-white shadow">
            TG
          </span>
          <span className="grid size-11 place-items-center rounded-[10px] bg-[#22d64f] text-sm font-black text-white shadow">
            WA
          </span>
        </div>
      </div>
      <div className="mt-5 text-center">
        <Image
          src="/a66/logo-home.png"
          alt="A66BET"
          width={180}
          height={55}
          className="mx-auto h-12 w-auto"
        />
        <p className="mt-3 text-base leading-7 text-[#d6f0e3]">
          <b className="text-brand-gold">A66BET</b> O Grupo é a empresa
          operadora de jogos de azar on-line mais conhecida do mundo, oferecendo
          cassinos emocionantes e divertidos com crupiê ao vivo, cartas,
          loteria, esportes e outras categorias completas de jogos.
        </p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-base text-[#8facd9]">
        {links.map((column, columnIndex) => (
          <div key={`${column[0]}-${columnIndex}`} className="space-y-3">
            {column.map((item, index) => (
              <p
                key={`${item}-${index}`}
                className={index === 0 ? "text-white" : ""}
              >
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-sm text-[#8ccbb4]">
        A66BET.COM@Copyright 2003-2025
      </p>
    </footer>
  );
}
