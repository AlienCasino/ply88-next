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
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" translate="no">
      <body className="dark flex min-h-full flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
