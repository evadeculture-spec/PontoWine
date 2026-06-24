import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { businessInfo } from "@/data/business-info";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${businessInfo.name} — ${businessInfo.tagline}`,
    template: `%s · ${businessInfo.shortName}`,
  },
  description:
    "Garrafeira, wine bar, restaurante e parceiro de confiança para restaurantes na Beira Baixa. Reserve, descubra vinhos portugueses e peça uma proposta B2B.",
  keywords: [
    "garrafeira",
    "vinhos",
    "Castelo Branco",
    "Beira Interior",
    "wine bar",
    "restaurante",
    "vinhos para restaurantes",
    "B2B vinhos",
  ],
  openGraph: {
    title: `${businessInfo.name}`,
    description:
      "O ponto de encontro entre vinhos, sabores e boas conversas, no centro de Castelo Branco.",
    locale: "pt_PT",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#120a0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
