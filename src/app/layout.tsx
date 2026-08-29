import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Parallax - Solana Event Risk Terminal",
    template: "%s | Parallax",
  },
  description:
    "Parallax maps Solana wallet exposure to prediction markets, agent forecasts, risk limits, and wallet-signature review.",
  keywords: [
    "Solana",
    "prediction markets",
    "event risk",
    "portfolio risk",
    "Jupiter",
    "Helius",
  ],
  openGraph: {
    title: "Parallax - Solana Event Risk Terminal",
    description:
      "A dark terminal for mapping wallet exposure to prediction markets and controlled event-risk actions.",
    url: "/",
    siteName: "Parallax",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parallax - Solana Event Risk Terminal",
    description:
      "Map Solana portfolio exposure to market events, agent forecasts, and signature-gated protection.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
