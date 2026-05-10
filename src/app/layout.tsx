import type { Metadata } from "next";
import { La_Belle_Aurore } from "next/font/google";
import { Caveat } from "next/font/google";
import "./globals.css";
import { TechBackground } from "@/components/TechBackground";

const caveat = Caveat({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="es">
      <body
        className={`${caveat.variable} ${laBelleAurore.variable} antialiased`}
      >
        <TechBackground />
        {children}
      </body>
    </html>
  );
}
