import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import { La_Belle_Aurore } from "next/font/google";
import { Calligraffitti } from "next/font/google";
import "./globals.css";
import { TechBackground } from "@/components/TechBackground";

const calligraffitti = Calligraffitti({
  variable: "--font-title",
  subsets: ["latin"],
  weight: "400",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const laBelleAurore = La_Belle_Aurore({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "ROMINA CASTAÑEDA",
  description: "Plataforma de talleres y videos de Romina Castañeda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${calligraffitti.variable} ${cinzel.variable} ${laBelleAurore.variable} font-hand antialiased`}
      >
        <TechBackground />
        {children}
      </body>
    </html>
  );
}
