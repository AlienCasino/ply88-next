import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A66BET - Cassino online",
  description:
    "A66BET mobile casino interface with slots, promotions, wallet and account screens.",
  openGraph: {
    title: "A66BET - Cassino online",
    description:
      "Slots PG, promoções, bônus, carteira e suporte em uma experiência mobile.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="dark h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
