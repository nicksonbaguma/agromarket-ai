import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgroMarket AI - Uganda's Smart Farm Marketplace",
  description: "AI-powered agricultural marketplace connecting Uganda's smallholder farmers to buyers, market intelligence, and expert advisory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
