import { Gift, Home, Trophy, UserRound, WalletCards } from "lucide-react";
import { routes } from "@/core/constants/routes";
import type { NavItem, Notice } from "@/data/types";

export const bottomNavigation: NavItem[] = [
  { id: "home", label: "Início", href: routes.home, screen: "home", icon: Home },
  { id: "promotions", label: "Promoção", href: routes.promotions, screen: "promotions", icon: Gift },
  { id: "sports", label: "Esporte", href: routes.sports, screen: "sports", icon: Trophy },
  { id: "wallet", label: "Carteira", href: routes.wallet, screen: "wallet", icon: WalletCards },
  { id: "profile", label: "Perfil", href: routes.profile, screen: "profile", icon: UserRound },
];

export const notices: Notice[] = [
  { id: "invite", text: "CONVIDE E GANHE R$120, compartilhe link do agente e pegue até 3.0% de lucro." },
  { id: "service", text: "Suporte 24/7 disponível para depósito, saque e verificação de conta." },
];
