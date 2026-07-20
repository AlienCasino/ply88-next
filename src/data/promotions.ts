import type { Promotion } from "@/data/types";

export const promotions: Promotion[] = [
  {
    id: "invite",
    slug: "invite",
    title: "Convide amigos válidos",
    description: "Compartilhe seu link do agente e pegue até 3.0% de lucro.",
    image: "/a66/invite-banner.avif",
    tag: "R$ 120",
  },
  {
    id: "monthly-pg",
    slug: "monthly-pg",
    title: "Torneio Mensal PG SLOT",
    description: "Ranking mensal com bônus progressivos para jogadores ativos.",
    image: "/a66/promo-1.png",
    tag: "PG",
  },
  {
    id: "treasure",
    slug: "treasure",
    title: "Baú do tesouro",
    description: "Indique amigos para abrir o baú e ganhar recompensas extras.",
    image: "/a66/promo-2.png",
    tag: "VIP",
  },
  {
    id: "red-envelope",
    slug: "red-envelope",
    title: "Envelope vermelho grátis",
    description: "Receba bônus relâmpago em horários especiais.",
    image: "/a66/promo-4.png",
    tag: "R$ 888",
  },
];
