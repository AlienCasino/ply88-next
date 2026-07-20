import type { WalletAction } from "@/data/types";

export const accountSummary = {
  username: "dowu9988",
  balance: "R$ 0,00",
  vipLevel: "VIP 1",
  phonePrefix: "+55",
};

export const walletActions: WalletAction[] = [
  { id: "deposit", label: "Depositar", description: "PIX instantâneo", amount: "R$ 20+" },
  { id: "withdraw", label: "Saque", description: "Retirada para conta bancária", amount: "R$ 50+" },
  { id: "bonus", label: "Bônus", description: "Cupons e giros disponíveis" },
  { id: "history", label: "Histórico", description: "Transações recentes" },
];

export const accountMenu = [
  "Informações pessoais",
  "Registro de apostas",
  "Minhas promoções",
  "Convide amigos",
  "Segurança",
  "Atendimento ao cliente",
] as const;
