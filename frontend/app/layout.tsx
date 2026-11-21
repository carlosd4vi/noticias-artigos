import { Suspense } from "react";
import type { Metadata } from "next";
import { Cinzel, Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header"; // 1. Importe aqui
import { Footer } from "@/components/Footer"; // 1. Importe aqui

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-logo",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Noticias e Artigos",
  description: "Opinião, Artigos e Análises sobre o Brasil e o mundo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${lora.variable} ${plusJakarta.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-amber-100 selection:text-amber-900">
        <Suspense fallback={<div className="h-[121px] bg-white border-b border-slate-200" />}>
        <Header />
        </Suspense>   {/* 2. Coloque antes do conteúdo */}
        {children}   {/* Aqui o Next.js injeta o page.tsx */}
        <Footer />   {/* 2. Coloque depois do conteúdo */}
      </body>
    </html>
  );
}