"use client";

import {
  CircleHelp,
  Clock3,
  Download,
  Fish,
  Flame,
  Gamepad2,
  Gem,
  Headphones,
  Info,
  Share2,
  Spade,
  Star,
  TicketPercent,
  Trophy,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { routes } from "@/core/constants/routes";
import type {
  HomeDrawerAction,
  HomeDrawerCategory,
  HomeDrawerLink,
  HomeDrawerOffer,
} from "@/shared/components/layout/home-side-drawer";

export const drawerCategories: HomeDrawerCategory[] = [
  { label: "Popular", icon: Flame },
  { label: "Slots", icon: TicketPercent },
  { label: "Pescaria", icon: Fish },
  { label: "Minijogos", icon: Gem },
  { label: "Cartas", icon: Spade },
  { label: "Ao Vivo", icon: UsersRound },
  { label: "Esporte", icon: Trophy },
  { label: "Demo", icon: Gamepad2 },
  { label: "Recente", icon: Clock3 },
  { label: "Favoritos", icon: Star },
];

export const drawerActions: HomeDrawerAction[] = [
  { label: "Apostas", icon: WalletCards },
  { label: "Partilhar", icon: Share2 },
  { label: "Promoção", icon: UsersRound },
];

export const drawerOffers: HomeDrawerOffer[] = [
  {
    label: "Eventos",
    icon: "🎡",
    badge: "",
    className: "from-[#4aa1ff] to-[#276df3]",
  },
  {
    label: "Missão",
    icon: "🗒️",
    badge: "",
    className: "from-[#21d352] to-[#08a938]",
  },
  {
    label: "Taxa de\nRebate",
    icon: "🪙",
    badge: "",
    className: "from-[#ffb31c] to-[#ff8200]",
  },
  {
    label: "Juros",
    icon: "🐷",
    badge: "100%",
    className: "from-[#246cff] to-[#0a42c9]",
  },
  {
    label: "VIP",
    icon: "👑",
    badge: "",
    className: "from-[#4aa1ff] to-[#246cff]",
  },
  {
    label: "Fundo",
    icon: "👛",
    badge: "50%",
    className: "from-[#ff3a9b] to-[#dd1671]",
  },
  {
    label: "Recomp\nensas",
    icon: "🎁",
    badge: "",
    className: "from-[#c347ff] to-[#9e1ee9]",
  },
  {
    label: "Histórico",
    icon: "🎁",
    badge: "",
    className: "from-[#ffb02e] to-[#ff8a00]",
  },
];

export const drawerHelpLinks: HomeDrawerLink[] = [
  { label: "Baixar App", icon: Download, href: routes.download },
  { label: "Suporte ao Cliente", icon: Headphones, href: routes.profile },
  { label: "FAQ", icon: CircleHelp, href: routes.profile },
  { label: "Sobrea66bet", icon: Info, href: routes.profile },
];
